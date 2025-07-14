// 获取所有卡片元素
const cards = document.querySelectorAll('.card');

// 为每个卡片添加鼠标悬停事件监听器
cards.forEach(card => {
    const cardImg = card.querySelector('.card-img');
    const cardVideo = card.querySelector('.card-video');

    card.addEventListener('mouseenter', () => {
        cardImg.style.display = 'none';
        cardVideo.style.display = 'block';
        cardVideo.play();
    });

    card.addEventListener('mouseleave', () => {
        cardImg.style.display = 'block';
        cardVideo.style.display = 'none';
        cardVideo.pause();
        cardVideo.currentTime = 0;
    });
});