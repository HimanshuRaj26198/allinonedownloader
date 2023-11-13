function getResols(){
    document.getElementById("error_container").style.display = "none";
    document.getElementById("form_download_btn").setAttribute("disabled", "true");
    if(document.getElementById("yt_url").value == ""){
      document.getElementById("download_options").style.display = "none";
      document.getElementById("error_container").style.display = "none";
    }else{
      document.getElementById("loader_container").style.display = "flex";
      
    fetch("/get_resolutions", {
      headers:{
        'Content-type' : 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({'video_url': document.getElementById("yt_url").value})
    }).then(function (response){
      response.json().then(function (json){
        let eachStream = [];
        let nStream=[];
        json.Resolutions.replace(/<Stream: /g, '').replace(/\[/g, '').replace(/>/g, '').replace(/\]/, '').replaceAll("'", '').replaceAll('"', '').split(",").forEach((a, i)=>{a = a.split(" "); if(i!=0){ a.shift() } eachStream.push(a)});
        eachStream.forEach(a=>{ let obj={}; a.forEach((b, i)=>{ b=b.split("=");  if(i==0){ let key = b[0]; let value = b[1]; obj[key]=value; }else{ let key = b[0]; let value = b[1]; obj[key]=value; }});nStream.push(obj) });
        if(!document.getElementById("resolutions_box")){
          document.getElementById("loader_container").style.display = "none";
          document.getElementById("download_options").style.display = "block";
          document.getElementById("form_download_btn").removeAttribute("disabled");
          renderJSON(nStream, json.title);
        }else{
          document.getElementById("resolutions_box").remove();
          document.getElementById("loader_container").style.display = "none";
          document.getElementById("download_options").style.display = "block";
          document.getElementById("form_download_btn").removeAttribute("disabled");
          renderJSON(nStream, json.title);
        }
      }).catch(function (err){
        document.getElementById("loader_container").style.display = "none";
        document.getElementById("error_container").style.display = "block";
      })
    }).catch(function (error){
      document.getElementById("loader_container").style.display = "none";
      document.getElementById("error_container").style.display = "block";
    })
    }
    
  }

  function renderJSON(arr, title){
    document.getElementById("loader_container").style.display = "none"
    let currentTitle = title;
    let container = document.createElement("div");
    container.id = "resolutions_box";
    container.classList.add("options_container");
    arr.splice(0,4).forEach(a=>{
    let videoResoItem = document.createElement("div");
    videoResoItem.classList.add("row");
    videoResoItem.classList.add("video_reso_item");
    let vidoeResItemCol1 = document.createElement("div");
    vidoeResItemCol1.classList.add("col-md-10");
    vidoeResItemCol1.classList.add("col-ms-12");
    let resoRow = document.createElement("div");
    resoRow.classList.add("row");
    resoRow.classList.add("reso_row");
    let resItem1 = document.createElement("div");
    resItem1.classList.add("col-md-4");
    resItem1.classList.add("res_item");
    let displayTitle = document.createElement("p");
    displayTitle.innerHTML = title.substring(0, 15);
    let youTubeImg = document.createElement("img");
    youTubeImg.classList.add("youtubeImg");
    resItem1.appendChild(youTubeImg);
    resItem1.appendChild(displayTitle);
    youTubeImg.src = `{{url_for("static", filename="/images/youtube.png")}}`
    let resItem2 = document.createElement("div");
    resItem2.classList.add("col-md-4");
    resItem2.classList.add("res_item");
    let displayRes = document.createElement("p");
    displayRes.innerHTML = a['res'];
    resItem2.appendChild(displayRes);
    let resItem3 = document.createElement("div"); 
    resItem3.classList.add("col-md-4");
    resItem3.classList.add("res_item");
    let displayFormat = document.createElement("p");
    displayFormat.innerHTML = a['mime_type'];
    resItem3.appendChild(displayFormat);
    resoRow.appendChild(resItem1);
    resoRow.appendChild(resItem2);
    resoRow.appendChild(resItem3);
    vidoeResItemCol1.appendChild(resoRow);
    videoResoItem.appendChild(vidoeResItemCol1);
    let videoResItemCol2 = document.createElement("div");
    videoResItemCol2.classList.add("col-md-2");
    videoResItemCol2.classList.add("col-ms-12");
    videoResItemCol2.classList.add("res_download_btn_container");
    let downloadForm = document.createElement('form');
    downloadForm.action = "/downloadbyitag";
    downloadForm.method="POST"
    let resValueInput = document.createElement("input");
    resValueInput.type = "hidden";
    resValueInput.name = "url";
    resValueInput.value = document.getElementById("yt_url").value;
    let itagValueInput = document.createElement("input");
    itagValueInput.name = "itag";
    itagValueInput.type = "hidden";
    itagValueInput.value = a['itag'];
    itagValueInput.style.display = "none";
    let downloadBtn = document.createElement("input");
    downloadBtn.type = "submit";
    downloadBtn.classList.add("btn");
    downloadBtn.classList.add("btn-info");
    downloadBtn.classList.add("res_download_btn");
    downloadBtn.value = "Download";
    downloadForm.appendChild(resValueInput);
    downloadForm.appendChild(itagValueInput);
    downloadForm.appendChild(downloadBtn);
    videoResItemCol2.appendChild(downloadForm);
    videoResoItem.appendChild(videoResItemCol2);  
    container.appendChild(videoResoItem);      
    });
    
    document.getElementById("download_options").appendChild(container);
  }



  function downloadSelectedRes(url, itag){
    let obj = JSON.stringify({ "url": url, "itag" : itag });
    console.log(obj)
    fetch("/downloadbyitag", {
      headers : {
        'Content-type' : "application/json"
      }, method : 'POST',
      body: obj
    }).then(function(response){
      console.log(response)
    }).catch(function (e){
      console.log(e);
    })
  }