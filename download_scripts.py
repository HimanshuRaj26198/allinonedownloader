from pytube import YouTube
from moviepy.editor import *
from flask import send_from_directory, send_file
from pathlib import Path


def DownloadYTVideo(link):
    youtubeObject = YouTube(link)
    youtubeObject = youtubeObject.streams.get_highest_resolution()
    try:
        youtubeObject.download('VIDEO_DOWNLOADS')
        downloadFolder= str(os.path.join(Path.home(), "VIDEO_DOWNLOADS"))
        print(downloadFolder, "DOWNLOAD FOLDER")
        return youtubeObject.download(downloadFolder)
    except:
        print("An error has occurred")
    
    

def VideoToMp3(link):
    yt = YouTube(link)
    stream=yt.streams.get_highest_resolution()
    stream.download()
    video = VideoFileClip(stream.default_filename)
    audio=video.audio
    audio.write_audiofile('%s.mp3' % (stream.default_filename))
    os.remove(stream.default_filename)