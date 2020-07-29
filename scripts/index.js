// Импортирование модулей

import { radioPlayerInit } from './radioPlayer.js';
import { musicPlayerInit } from './musicPlayer.js';
import { videoPlayerInit } from './videoPlayer.js';

// Объявление переменных

const playerBtn = document.querySelectorAll('.player-btn'),
      playerBlock = document.querySelectorAll('.player-block'),
      temp = document.querySelector('.temp');     

// Деактивация плееров

const deactivationPlayer = () => {
    temp.style.display = 'none';    
    playerBtn.forEach(item => {
        item.classList.remove('active');
    });
    playerBlock.forEach(item => {
        item.classList.remove('active');
    });
}

// Tabs

playerBtn.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        deactivationPlayer();
        btn.classList.add('active');
        playerBlock[i].classList.add('active');
    });
});

// Вызов модулей   

radioPlayerInit();
musicPlayerInit();
videoPlayerInit();