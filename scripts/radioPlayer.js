export const radioPlayerInit = () => {

    // переменные блока radio    
    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioStop = document.querySelector('.radio-stop');
    const radioVolume = document.querySelector('.radio-volume');
    const radioVolumeDown = document.querySelector('.radio-volume-down');
    const radioVolumeUp = document.querySelector('.radio-volume-up');

    // создаем новый объект аудио на основе конструктора
    const audio = new Audio();
    audio.type = 'audio/aac';
    // деактивируем кнопку play\stop
    radioStop.disabled = true;

    // изменение внешнего вида кнопки вкл\выкл
    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.remove('fa-stop');
            radioStop.classList.add('fa-play');
        } else {
            radio.classList.add('play');
            radioStop.classList.remove('fa-play');
            radioStop.classList.add('fa-stop');
        }
    };

    // добавление обводки к item

    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    };

    // выбор радиостанции и оформление
    radioNavigation.addEventListener('change', event => {
        const target = event.target;
        const parent = target.closest('.radio-item');

        selectItem(parent);

        const title = parent.querySelector('.radio-name').textContent;
        radioHeaderBig.textContent = title;

        const srcImg = parent.querySelector('.radio-img').src;
        radioCoverImg.src = srcImg;

        radioStop.disabled = false;
        audio.src = target.dataset.radioStantion;
        audio.play();
        changeIconPlay();
    });

    // вкл\выкл радио
    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            radio.classList.add('play');
        } else {
            audio.pause();
            radio.classList.remove('play');
        }
        changeIconPlay();
    });

    // звук 

    radioVolume.addEventListener('input', () => {
        audio.volume = radioVolume.value / 100;
        radioVolumeDown.style.color = '';
        radioVolumeUp.style.color = '';
    });

    radioVolumeDown.addEventListener('click', () => {
        audio.volume = 0;
        radioVolume.value = 0;
        radioVolumeDown.style.color = 'red';
        radioVolumeUp.style.color = '';
    });

    radioVolumeUp.addEventListener('click', () => {
        audio.volume = 1;
        radioVolume.value = 100;
        radioVolumeUp.style.color = 'red';
        radioVolumeDown.style.color = '';
    });

};