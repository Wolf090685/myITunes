export const videoPlayerInit = () => {  
    // Элементы управления плеером
    const videoPlayer = document.querySelector('.video-player'),
          videoButtonPlay = document.querySelector('.video-button__play'),
          videoButtonStop = document.querySelector('.video-button__stop'),
          videoTimePassed = document.querySelector('.video-time__passed'),
          videoTimeTotal = document.querySelector('.video-time__total'),
          videoProgress = document.querySelector('.video-progress');

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

    const addZero = num => num < 10 ? '0'+ num : num;

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

        videoProgress.value = (currentTime/duration) * 100;

        let minutePassed = Math.floor(currentTime/60);
        let secondsPassed = Math.floor(currentTime%60);

        let minuteTotal = Math.floor(duration/60);
        let secondsTotal = Math.floor(duration%60);

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
        videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;       
    });      

        // переключение range
    videoProgress.addEventListener('change', () => {
        const value = videoProgress.value;
        const duration = videoPlayer.duration;

        videoPlayer.currentTime = (value * duration) / 100;
    });

};