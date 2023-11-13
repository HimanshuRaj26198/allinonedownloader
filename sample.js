function createResolutionsOptions(arr, title){
    let optionBox = document.createElement("ul");
    let labelBox = document.createElement("li");
    let labelTextBox = document.createElement("span");
    let labelTitleText = document.createElement("p");
    let labelMimeText = document.createElement("p");
    let labelResText = document.createElement("p");
    let labelDownloadText = document.createElement("p");
    labelTitleText.innerHTML = "Video Title";
    labelMimeText.innerHTML = "Video Format";
    labelResText.innerHTML = "Resolution";
    labelDownloadText.innerHTML = "Download";
    labelTextBox.appendChild(labelTitleText);
    labelTextBox.appendChild(labelResText);
    labelTextBox.appendChild(labelMimeText);
    labelBox.appendChild(labelTextBox);
    labelBox.appendChild(labelDownloadText);
    optionBox.appendChild(labelBox);
    arr.splice(0, 4).forEach((a)=>{
     let option = document.createElement("li");
     let titleBox = document.createElement("span");
     let titleText = document.createElement("p");
     let mimeText = document.createElement("p");
     let resText = document.createElement("p");
     let downloadButton = document.createElement("a");
     titleText.innerHTML = title;
     mimeText.innerHTML = a['mime_type'];
     resText.innerHTML = a['res'];
     downloadButton.href = a['itag'];
     downloadButton.innerHTML = "Download Now";
     titleBox.appendChild(titleText);
     titleBox.appendChild(resText);
     titleBox.appendChild(mimeText);
     downloadButton.classList.add("btn");
     downloadButton.classList.add("btn-info");
     option.appendChild(titleBox);
     option.appendChild(downloadButton);
     optionBox.appendChild(option);
    });
    document.getElementById("resolutions_box").appendChild(optionBox);
  }



  function renderJSON(arr, title){
    let container = document.createElement("div");
    container.id = "resolutions_box";
    container.classList.add("options_container");
    arr.forEach(a=>{
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
    displayTitle.innerHTML = title;
    resItem1.appendChild(displayTitle);
    let resItem2 = document.createElement("div");
    resItem2.classList.add("col-md-4");
    resItem2.classList.add("res_item");
    let displayRes = document.createElement("p");
    displayRes.innerHTML = a['res'];
    resItem2.appendChild(displayRes);
    let resItem3 = documen.createElement("div"); 
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
    let downloadBtn = document.createElement("a");
    downloadBtn.classList.add("btn");
    downloadBtn.classList.add("btn-info");
    downloadBtn.classList.add("res_download_btn");
    downloadBtn.innerHTML = "Download";
    videoResoItem.appendChild(videoResItemCol2);
    container.appendChild(videoResoItem);
    })
  }

  <div id="resolutions_box"  class="options_container" >
        
  {% for resolution in streamArr%}
    <div class="row video_reso_item" >
        <div class="col-md-10 col-ms-12 ">
          <div class="row reso_row" >
            <div class="col-md-4 res_item " >
              <p> {{streamTitle}} </p>
            </div>
            <div class="col-md-4 res_item " >
              <p>{{resolution['res'] + 'x'}}</p>
            </div>
            <div class="col-md-4 res_item" >
              <p> {{resolution['mime_type']}} </p>
            </div>
          </div>
        </div>
        <div class="col-md-2 col-ms-12 res_download_btn_container"> 
        <a class="btn btn-info res_download_btn" > Download  </a>
        </div>
    </div>
  {% endfor %}
</div>



downloadBtn.addEventListener("click", function(){
  downloadSelectedRes(document.getElementById("yt_url").value, parseInt(a['itag']))
})