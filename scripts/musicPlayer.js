import { addZero } from './supScript.js';

export const musicPlayerInit = () => {
    // элементы блока music и плеера
    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioTimeTotal = document.querySelector('.audio-time__total');
    const audioVolume = document.querySelector('.audio-volume');
    const audioVolumeDown = document.querySelector('.audio-volume-down');
    const audioVolumeUp = document.querySelector('.audio-volume-up');

    const playlist = ['hello', 'flow', 'speed'];
    let trackIndex = 0;

    // открытие трека
    const loadTrack = () => {
        const isPlayed = audioPlayer.paused;
        const track = playlist[trackIndex];

        audioImg.src = `./audio/${track}.jpg`;
        audioHeader.textContent = track.toLowerCase();
        audioPlayer.src = `./audio/${track}.mp3`;

        if (isPlayed) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
    }

    const nextTrack = () => {
        if (trackIndex === playlist.length - 1) {
            trackIndex = 0;
        } else {
            trackIndex++;
        }
        loadTrack();
    };

    const prevTrack = () => {
        if (trackIndex !== 0) {
            trackIndex--;
        } else {
            trackIndex = playlist.length - 1;
        }
        loadTrack();
    };

    // клики по play, prev и next
    audioNavigation.addEventListener('click', event => {
        const target = event.target;

        if (target.classList.contains('audio-button__play')) {
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');

            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }

            const track = playlist[trackIndex];
            audioHeader.textContent = track.toLowerCase();
        }

        if (target.classList.contains('audio-button__prev')) {
            prevTrack();
        }

        if (target.classList.contains('audio-button__next')) {
            nextTrack();
        }
    });

    // автозапуск нового трека по завершении предыдущего
    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
    });

    // тайминг
    audioPlayer.addEventListener('timeupdate', () => {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;
        const progress = (currentTime / duration) * 100;

        audioProgressTiming.style.width = progress + '%';

        const minutesPassed = Math.floor(currentTime / 60) || 0;
        const secondsPassed = Math.floor(currentTime % 60) || 0;
        const minutesTotal = Math.floor(duration / 60) || 0;
        const secondsTotal = Math.floor(duration % 60) || 0;

        audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
    });

    // переключение по progressbar
    audioProgress.addEventListener('click', event => {
        const x = event.offsetX;
        const allWidth = audioProgress.clientWidth;
        const progress = (x / allWidth) * audioPlayer.duration;
        audioPlayer.currentTime = progress;
    });

    // звук
    audioVolume.addEventListener('input', () => {
        audioPlayer.volume = audioVolume.value / 100;
        audioVolumeDown.style.color = '';
        audioVolumeUp.style.color = '';
        if (audioVolume.value == 0) {
            audioVolumeDown.style.color = 'red';
        }
        if (audioVolume.value == 100) {
            audioVolumeUp.style.color = 'red';
        }
    });

    audioVolumeDown.addEventListener('click', () => {
        audioPlayer.volume = 0;
        audioVolume.value = 0;
        audioVolumeDown.style.color = 'red';
        audioVolumeUp.style.color = '';
    });

    audioVolumeUp.addEventListener('click', () => {
        audioPlayer.volume = 1;
        audioVolume.value = 100;
        audioVolumeUp.style.color = 'red';
        audioVolumeDown.style.color = '';
    });

    // остановка плеера (сработает при переключении на др. вкладку)
    musicPlayerInit.stop = () => {
        if (!audioPlayer.paused) {
            audioPlayer.pause();
            audio.classList.remove('play');
            audioButtonPlay.classList.remove('fa-pause');
            audioButtonPlay.classList.add('fa-play');
        }
    }

};