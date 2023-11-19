from pytube import YouTube
from moviepy.editor import *
from flask import send_file, abort, render_template
from tqdm import tqdm, trange
from io import BytesIO

# from pytube.cli import on_progress



def get_all_video_resolutions(link):
    try:
        youtubeObject = YouTube(link)
        video_resols=youtubeObject.streams.filter()
        return {"Resolutions" : str(video_resols), "title": youtubeObject.streams[0].title}
    except Exception as e:
        abort(204)

def percent(self, tem, total):
        perc = (float(tem) / float(total)) * float(100)
        return perc

def progress_function(self,stream, chunk,file_handle, bytes_remaining):
    size = stream.filesize
    p = 0
    while p <= 100:
        progress = p
        print(str(p)+'%')
        p = percent(bytes_remaining, size)
        print(p, "PROGRESS P")
        print("PROGRESS", progress)

def on_progress(stream, chunk, bytes_remaining):
    total_size=stream.filesize
    bytes_download=total_size  - bytes_remaining
    percentage_of_completion=bytes_download / total_size * 100
    per=str(int(percentage_of_completion))
    print(per)
    return {"per" : per}

def DownloadYTVideo(link):
    buffer=BytesIO()
    youtubeObject = YouTube(link, on_progress_callback=on_progress)
    youtubeObject = youtubeObject.streams.get_highest_resolution()
    try:
        youtubeObject.stream_to_buffer(buffer)
        buffer.seek(0)
        # downloadFolder= str(os.path.join(Path.home(), "VIDEO_DOWNLOADS"))
        print("DOWNLOADING", "(:")
        print("DOWNLOADED")
        file_path= "./VIDEO_DOWNLOADS/" + youtubeObject.default_filename
        print(youtubeObject.mime_type)
        return send_file(buffer, as_attachment=True, download_name=youtubeObject.default_filename, mimetype=youtubeObject.mime_type)
    except Exception as e:
        print("An error has occurred", e)
    
def return_yt_by_itag(link, itag):
    yt = YouTube(link)
    try:
        stream = yt.streams.get_by_itag(itag)
        stream.download('VIDEO_DOWNLOADS')
        # downloadFolder= str(os.path.join(Path.home(), "VIDEO_DOWNLOADS"))
        file_path= "./VIDEO_DOWNLOADS/" + stream.default_filename
        print("DOWNLOADED")
        print("FILE PATH",file_path)
        return send_file(file_path, as_attachment=True)
    except Exception as e:
        print("An error has occurred", e)
    

def VideoToMp3(link):
    yt = YouTube(link)
    stream=yt.streams.get_highest_resolution()
    stream.download()
    video = VideoFileClip(stream.default_filename)
    audio=video.audio
    audio.write_audiofile('%s.mp3' % (stream.default_filename))
    os.remove(stream.default_filename)
