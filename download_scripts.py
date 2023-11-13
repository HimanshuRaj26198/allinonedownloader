from pytube import YouTube
from moviepy.editor import *
from flask import send_from_directory, send_file, abort
from pathlib import Path
from io import BytesIO


def get_all_video_resolutions(link):
    try:
        youtubeObject = YouTube(link)
        video_resols=youtubeObject.streams.filter()
        return {"Resolutions" : str(video_resols), "title": youtubeObject.streams[0].title}
    except Exception as e:
        abort(204)

def DownloadYTVideo(link):
    youtubeObject = YouTube(link)
    youtubeObject = youtubeObject.streams.get_highest_resolution()
    try:
        youtubeObject.download('VIDEO_DOWNLOADS')
        # downloadFolder= str(os.path.join(Path.home(), "VIDEO_DOWNLOADS"))
        print("DOWNLOADED")
        file_path= "./VIDEO_DOWNLOADS/" + youtubeObject.default_filename
        print(file_path)
        return send_file(file_path, as_attachment=True)
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
