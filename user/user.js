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