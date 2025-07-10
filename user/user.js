// 读取用户信息
let currentAccount = localStorage.getItem('focus_current_account');
let users = JSON.parse(localStorage.getItem('user_profiles') || '[]');
let user = users.find(user => user.account === currentAccount);

if (user) {
    document.getElementById('ucAccount').value = user.account || '';
    document.getElementById('ucPassword').value = user.password || '';
    document.getElementById('ucNickname').value = user.nickname || '';
    document.getElementById('ucBirthday').value = user.birthday || '';
}

// 检查登录状态
function checkLogin() {
    try {
        // 获取登录状态标记
        const isLoggedIn = localStorage.getItem('is_logged_in') === 'true';
        const loginModal = document.getElementById('loginModal');
        if (!isLoggedIn && loginModal) {
            document.body.classList.add('login-active');
            loginModal.style.display = 'flex';
        } else if (loginModal) {
            document.body.classList.remove('login-active');
            loginModal.style.display = 'none';
        }
    } catch (error) {
        console.error('检查登录状态时出错:', error);
        alert('无法验证登录状态，请刷新页面');
    }
}
checkLogin();

document.getElementById('saveProfile').onclick = function() {
    if (user) {
        user.password = document.getElementById('ucPassword').value;
        user.nickname = document.getElementById('ucNickname').value;
        user.birthday = document.getElementById('ucBirthday').value;
        let updatedUsers = users.map(u => u.account === currentAccount ? user : u);
        localStorage.setItem('user_profiles', JSON.stringify(updatedUsers));
        alert('保存成功！');
    }
};

document.getElementById('logoutBtn').onclick = function() {
    // 设置登录状态标记为 false
    localStorage.setItem('is_logged_in', 'false');
    location.href = '../study/study.html';
};

document.getElementById('dismissBtn').onclick = function() {
    let currentAccount = localStorage.getItem('focus_current_account');
    let users = JSON.parse(localStorage.getItem('user_profiles') || '[]');
    // 过滤掉要注销的账号
    let updatedUsers = users.filter(user => user.account !== currentAccount);
    localStorage.setItem('user_profiles', JSON.stringify(updatedUsers));

    localStorage.removeItem('focus_current_account');
    localStorage.setItem('is_logged_in', 'false');
    location.href = '../study/study.html';
};

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