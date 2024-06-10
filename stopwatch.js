let startTime;
let updatedTime;
let difference;
let timerInterval;
let isRunning = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

function startStop() {
    if (!isRunning) {
        isRunning = true;
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateTime, 1000 / 60);
        startStopBtn.textContent = 'Stop';
    } else {
        isRunning = false;
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
    }
}

function reset() {
    clearInterval(timerInterval);
    isRunning = false;
    difference = 0;
    display.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    lapsList.innerHTML = '';
    lapCounter = 0;
}

function lap() {
    if (isRunning) {
        lapCounter++;
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${lapCounter}: ${display.textContent}`;
        lapsList.appendChild(lapTime);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(unit) {
    return unit < 10 ? '0' + unit : unit;
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
