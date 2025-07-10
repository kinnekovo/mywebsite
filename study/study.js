// DOM元素
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const timeDisplay = document.getElementById('timeDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const backgroundGallery = document.getElementById('backgroundGallery');
const notification = document.getElementById('notification');
const closeNotification = document.getElementById('closeNotification');
const appBody = document.getElementById('appBody');
const globalSoundToggle = document.getElementById('globalSoundToggle'); // 新的全局音量按钮
const backgroundSound = document.getElementById('backgroundSound');
const mainTitle = document.getElementById('mainTitle');
const timeInputs = document.getElementById('timeInputs');
const settingsPanel = document.getElementById('settingsPanel');
const controlButtons = document.getElementById('controlButtons');
const body = document.body;
const container = document.querySelector('.container');
const mainNav = document.getElementById('mainNav'); // 导航栏

// 变量
let totalSeconds = 0;
let remainingSeconds = 0;
let countdownInterval;
let soundEnabled = true;
let isPaused = false;

// 更新时间显示
function updateDisplay() {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // 最后10秒变红
    if (remainingSeconds <= 10) {
        timeDisplay.style.color = '#e74c3c';
    } else {
        timeDisplay.style.color = '#333';
    }
}

// 进入专注模式
function enterFocusMode() {
    body.classList.add('focus-mode');
}

// 退出专注模式
function exitFocusMode() {
    body.classList.remove('focus-mode');
    timeDisplay.style.color = '#333';
}

// 开始/继续倒计时
function startCountdown() {
    if (!isPaused) {
        // 新开始
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;
        
        if (minutes === 0 && seconds === 0) {
            alert('请设置有效时间');
            return;
        }
        
        totalSeconds = minutes * 60 + seconds;
        remainingSeconds = totalSeconds;
        updateDisplay();
        
        // 进入专注模式
        enterFocusMode();
        
        // 禁用输入
        minutesInput.disabled = true;
        secondsInput.disabled = true;
    } else {
        // 从暂停恢复
        isPaused = false;
    }
    
    // 切换按钮显示
    startBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
    
    // 开始播放背景音
    if (soundEnabled) {
        playBackgroundSound();
    }
    
    // 开始计时
    countdownInterval = setInterval(() => {
        if (remainingSeconds <= 0) {
            clearInterval(countdownInterval);
            stopBackgroundSound();
            showNotification();
            exitFocusMode();
            return;
        }
        remainingSeconds--;
        updateDisplay();
    }, 1000);
}

// 暂停倒计时
function pauseCountdown() {
    clearInterval(countdownInterval);
    startBtn.style.display = 'inline-block';
    startBtn.textContent = '继续';
    pauseBtn.style.display = 'none';
    
    // 暂停背景音
    stopBackgroundSound();
    
    // 标记为已暂停
    isPaused = true;
}

// 重置倒计时
function resetCountdown() {
    clearInterval(countdownInterval);
    minutesInput.disabled = false;
    secondsInput.disabled = false;
    startBtn.style.display = 'inline-block';
    startBtn.textContent = '开始专注';
    pauseBtn.style.display = 'none';
    
    // 重置时间显示
    remainingSeconds = totalSeconds;
    updateDisplay();
    
    // 退出专注模式
    exitFocusMode();
    
    // 停止背景音
    stopBackgroundSound();
    
    // 重置暂停状态
    isPaused = false;
}

// 显示通知
function showNotification() {
    notification.style.display = 'flex';
}

// 隐藏通知
function hideNotification() {
    notification.style.display = 'none';
    resetCountdown();
}

// 播放背景音
function playBackgroundSound() {
    if (soundEnabled) {
        backgroundSound.volume = 0.7;
        backgroundSound.play().catch(e => console.log('Audio play failed:', e));
    }
}

// 停止背景音
function stopBackgroundSound() {
    backgroundSound.pause();
    backgroundSound.currentTime = 0;
}

// 切换声音
function toggleSound() {
    soundEnabled = !soundEnabled;
    
    if (soundEnabled) {
        globalSoundToggle.innerHTML = '<i class="fa fa-volume-up"></i>';
        if (countdownInterval && !isPaused) { // 如果正在倒计时且未暂停
            playBackgroundSound();
        }
    } else {
        globalSoundToggle.innerHTML = '<i class="fa fa-volume-off"></i>';
        stopBackgroundSound();
    }
}

// 事件监听
startBtn.addEventListener('click', startCountdown);
pauseBtn.addEventListener('click', pauseCountdown);
resetBtn.addEventListener('click', resetCountdown);
closeNotification.addEventListener('click', hideNotification);
globalSoundToggle.addEventListener('click', toggleSound); // 绑定全局音量按钮

// 背景图片选择
document.querySelectorAll('.image-option').forEach(option => {
    option.addEventListener('click', () => {
        // 移除所有选中状态
        document.querySelectorAll('.image-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // 添加选中状态
        option.classList.add('selected');
        
        // 更改背景
        appBody.style.backgroundImage = `url(${option.dataset.bg})`;
    });
});

// 初始化
updateDisplay();