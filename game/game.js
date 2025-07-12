// 图片数据（可补充标题和描述）
const images = [
    {
        src: "../image/2048.png",
        title: "2048", // 可添加标题
        desc: "通过上下左右滑动操作，使得相同数字的方块在碰撞时相加，目标是组合出数字2048",  // 可添加描述
        url: "2048/2048.html" // 假设的网址
    },
    {
        src: "../image/shouna.png",
        title: "收纳小游戏",
        desc: "和夏彦一起整理我们的家吧！",
        url: "https://example.com/shouna"
    },
    {
        src: "../image/huarongdao.png",
        title: "华容道",
        desc: "通过移动各个图片，将乱序的图片恢复成完整的图案",
        url: "https://example.com/huarongdao"
    },
    {
        src: "../image/jingyin.jpg",
        title: "经营小游戏",
        desc: "和夏彦一起经营一家早茶店吧！",
        url: "https://example.com/jingyin"
    },
];

let currentIndex = 0;

// 初始化图片展示
function initGallery() {
    updateGallery();
}

// 更新图库显示
function updateGallery() {
    const mainImg = document.getElementById('main-img');
    const prevImg = document.getElementById('prev-img');
    const nextImg = document.getElementById('next-img');
    const imageTitle = document.getElementById('image-title');
    const imageDesc = document.getElementById('image-desc');
    
    // 为主图添加过渡类
    mainImg.classList.add('image-transition');
    
    // 隐藏主图，准备切换
    mainImg.style.opacity = '0';
    mainImg.style.transform = 'scale(0.95)';
    
    // 添加加载状态
    mainImg.classList.add('image-loading');
    
    // 延迟更新图片源，等待过渡效果完成
    setTimeout(() => {
        // 更新主图
        mainImg.src = images[currentIndex].src;
        imageTitle.textContent = images[currentIndex].title || "";
        imageDesc.textContent = images[currentIndex].desc || "";
        
        // 移除加载状态，显示新图片
        mainImg.classList.remove('image-loading');
        mainImg.style.opacity = '1';
        mainImg.style.transform = 'scale(1.8)';
        
        // 设置前一张图片
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        prevImg.src = images[prevIndex].src;
        
        // 设置后一张图片
        const nextIndex = (currentIndex + 1) % images.length;
        nextImg.src = images[nextIndex].src;
        
        // 图片加载完成后移除过渡类
        mainImg.onload = () => {
            setTimeout(() => {
                mainImg.classList.remove('image-transition');
            }, 600);
        };
    }, 300);
}

// 下一张图片
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateGallery();
}

// 上一张图片
function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateGallery();
}

// 前往当前图片对应网址
function goToUrl() {
    window.location.href = images[currentIndex].url;
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initGallery);