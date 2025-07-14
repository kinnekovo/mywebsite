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
const globalSoundToggle = document.getElementById('globalSoundToggle');
const backgroundSound = document.getElementById('backgroundSound');
const mainTitle = document.getElementById('mainTitle');
const timeInputs = document.getElementById('timeInputs');
const settingsPanel = document.getElementById('settingsPanel');
const controlButtons = document.getElementById('controlButtons');
const body = document.body;
const container = document.querySelector('.container');
const mainNav = document.getElementById('mainNav');
const currentAccountSpan = document.getElementById('currentAccount');
const statsChartCanvas = document.getElementById('statsChart');

let totalSeconds = 0;
let remainingSeconds = 0;
let countdownInterval;
let soundEnabled = true;
let isPaused = false;
let chart = null;

// 账号管理
let currentAccount = localStorage.getItem('focus_current_account') || '默认账号';

// 渲染当前账号
function renderCurrentAccount() {
    currentAccountSpan.textContent = `当前账号：${currentAccount}`;
}
renderCurrentAccount();

// 更新时间显示
function updateDisplay() {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;
        if (minutes === 0 && seconds === 0) {
            alert('请设置有效时间');
            return;
        }
        totalSeconds = minutes * 60 + seconds;
        remainingSeconds = totalSeconds;
        updateDisplay();
        enterFocusMode();
        minutesInput.disabled = true;
        secondsInput.disabled = true;
    } else {
        isPaused = false;
    }
    startBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
    if (soundEnabled) playBackgroundSound();
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
    stopBackgroundSound();
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
    remainingSeconds = totalSeconds;
    updateDisplay();
    exitFocusMode();
    stopBackgroundSound();
    isPaused = false;
}

// 显示通知
function showNotification() {
    saveFocusSession(totalSeconds);
    renderFocusStats();
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
        backgroundSound.play().catch(e => {});
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
        if (countdownInterval && !isPaused) playBackgroundSound();
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
globalSoundToggle.addEventListener('click', toggleSound);

// 背景图片选择
document.querySelectorAll('.image-option').forEach(option => {
    option.addEventListener('click', () => {
        document.querySelectorAll('.image-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        option.classList.add('selected');
        appBody.style.backgroundImage = `url(${option.dataset.bg})`;
    });
});

// 初始化
updateDisplay();

// 统计专注时长（账号隔离）
function getStatsKey() {
    return `focusStats_${currentAccount}`;
}
function saveFocusSession(seconds) {
    const today = new Date().toISOString().slice(0,10);
    let stats = JSON.parse(localStorage.getItem(getStatsKey()) || '{}');
    stats[today] = (stats[today] || 0) + seconds;
    localStorage.setItem(getStatsKey(), JSON.stringify(stats));
}

// 渲染统计（柱状图）
function renderFocusStats() {
    let stats = JSON.parse(localStorage.getItem(getStatsKey()) || '{}');
    let labels = [];
    let data = [];
    for(let i=6;i>=0;i--) {
        let d = new Date();
        d.setDate(d.getDate()-i);
        let key = d.toISOString().slice(0,10);
        labels.push(key.slice(5));
        data.push(Math.floor((stats[key]||0)/60));
    }
    if (chart) chart.destroy();
    chart = new Chart(statsChartCanvas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '专注分钟',
                data: data,
                backgroundColor: '#ffc038'
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true, precision:0 }
            }
        }
    });
}

// DOM元素加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const showRegisterBtn = document.getElementById('showRegisterBtn');
    const cancelRegisterBtn = document.getElementById('cancelRegisterBtn');
    const doRegisterBtn = document.getElementById('doRegisterBtn');
    const loginBtn = document.getElementById('loginBtn');

    // 检查元素是否存在
    if (!loginModal || !registerModal || !showRegisterBtn || 
        !cancelRegisterBtn || !doRegisterBtn || !loginBtn) {
        console.error('无法找到所有必需的DOM元素');
        return;
    }

    // 检查登录状态
    function checkLogin() {
        try {
            // 获取登录状态标记
            const isLoggedIn = localStorage.getItem('is_logged_in') === 'true';
            if (!isLoggedIn) {
                document.body.classList.add('login-active');
                loginModal.style.display = 'flex';
            } else {
                document.body.classList.remove('login-active');
                loginModal.style.display = 'none';
            }
        } catch (error) {
            console.error('检查登录状态时出错:', error);
            alert('无法验证登录状态，请刷新页面');
        }
    }
    checkLogin();

    // 渲染统计图表
    renderFocusStats();

    // 登录
    loginBtn.onclick = function() {
        try {
            const account = document.getElementById('loginAccount').value.trim();
            const password = document.getElementById('loginPassword').value.trim();
            if (!account || !password) {
                alert('请输入账号和密码');
                return;
            }
            // 获取所有用户信息
            let users = JSON.parse(localStorage.getItem('user_profiles') || '[]');
            const user = users.find(user => user.account === account && user.password === password);
            if (!user) {
                alert('账号或密码错误');
                return;
            }
            localStorage.setItem('focus_current_account', account);
            // 设置登录状态标记为 true
            localStorage.setItem('is_logged_in', 'true');
            document.body.classList.remove('login-active');
            loginModal.style.display = 'none';
            location.reload();
        } catch (error) {
            console.error('登录时出错:', error);
            alert('登录过程中发生错误');
        }
    };

    // 显示注册弹窗
    showRegisterBtn.onclick = function() {
        loginModal.style.display = 'none';
        document.body.classList.remove('login-active');
        document.body.classList.add('register-active');
        registerModal.style.display = 'flex';
    };

    // 取消注册
    cancelRegisterBtn.onclick = function() {
        registerModal.style.display = 'none';
        document.body.classList.remove('register-active');
        document.body.classList.add('login-active');
        loginModal.style.display = 'flex';
    };

    // 注册
    doRegisterBtn.onclick = function() {
        try {
            const account = document.getElementById('regAccount').value.trim();
            const password = document.getElementById('regPassword').value.trim();
            const nickname = document.getElementById('regNickname').value.trim();
            const birthday = document.getElementById('regBirthday').value;
            if (!account || !password) {
                alert('账号和密码必填');
                return;
            }
            // 获取所有用户信息
            let users = JSON.parse(localStorage.getItem('user_profiles') || '[]');
            // 检查账号是否已存在
            const existingUser = users.find(user => user.account === account);
            if (existingUser) {
                alert('该账号已存在，请更换账号');
                return;
            }
            const newUser = { account, password, nickname, birthday };
            users.push(newUser);
            localStorage.setItem('user_profiles', JSON.stringify(users));
            alert('注册成功，请登录');
            // 注册后默认未登录，需手动登录
            localStorage.setItem('is_logged_in', 'false');
            registerModal.style.display = 'none';
            document.body.classList.remove('register-active');
            document.body.classList.add('login-active');
            loginModal.style.display = 'flex';
        } catch (error) {
            console.error('注册时出错:', error);
            alert('注册过程中发生错误');
        }
    };
});