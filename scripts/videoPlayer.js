import { addZero } from './supScript.js';

export const videoPlayerInit = () => {
    // Элементы управления плеером
    const videoPlayer = document.querySelector('.video-player'),
        videoButtonPlay = document.querySelector('.video-button__play'),
        videoButtonStop = document.querySelector('.video-button__stop'),
        videoTimePassed = document.querySelector('.video-time__passed'),
        videoTimeTotal = document.querySelector('.video-time__total'),
        videoFullscreen = document.querySelector('.video-fullscreen'),
        videoVolume = document.querySelector('.video-volume'),
        videoProgress = document.querySelector('.video-progress'),
        volumeDown = document.querySelector('.fa-volume-down'),
        volumeUp = document.querySelector('.fa-volume-up');

    // Функции
    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        }
    };

    const togglePlay = () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    };

    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    };

    // Прослушивание событий        
    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);
    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);
    videoButtonStop.addEventListener('click', stopPlay);

    // отображение времени проигрывания клипа
    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;

        videoProgress.value = (currentTime / duration) * 100;

        let minutePassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);

        let minuteTotal = Math.floor(duration / 60);
        let secondsTotal = Math.floor(duration % 60);

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
        videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
    });

    // переключение range
    videoProgress.addEventListener('change', () => {
        const value = videoProgress.value;
        const duration = videoPlayer.duration;

        videoPlayer.currentTime = (value * duration) / 100;
    });

    // videoFullscreen
    videoFullscreen.addEventListener('click', () => {
        videoPlayer.webkitEnterFullscreen();
    });

    // звук
    videoVolume.addEventListener('input', () => {
        videoPlayer.volume = videoVolume.value / 100;
        volumeDown.style.color = '';
        volumeUp.style.color = '';
    });

    volumeDown.addEventListener('click', () => {
        videoPlayer.volume = 0;
        videoVolume.value = 0;
        volumeDown.style.color = 'red';
        volumeUp.style.color = '';
    });

    volumeUp.addEventListener('click', () => {
        videoPlayer.volume = 1;
        videoVolume.value = 100;
        volumeUp.style.color = 'red';
        volumeDown.style.color = '';
    });

    // остановка плеера (сработает при переключении на др. вкладку)
    videoPlayerInit.stop = () => {
        if (!videoPlayer.paused) {
            stopPlay();
        }
    };

};