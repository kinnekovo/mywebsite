        // 封装QQ人组件
        function createXiaoyanCharacter(imageSrc = '../image/tianshi.PNG') {
            // 创建容器元素
            const container = document.createElement('div');
            container.id = 'character-container';
            container.className = 'fixed bottom-8 right-8 z-50 character-transition cursor-pointer';
            
            // 设置HTML内容
            container.innerHTML = `
                <div id="character" class="relative character-shadow bubble-animation hover:scale-105 active:scale-95">
                    <!-- 夏彦Q版形象 -->
                    <img src="${imageSrc}" alt="夏彦Q版形象" class="w-60 h-auto rounded-lg">
                    
                    <!-- 语音气泡 -->
                    <div id="speech-bubble" class="hidden absolute bottom-full right-0 mb-4 mr-2 bg-white p-3 rounded-lg shadow-lg max-w-xs bubble-animation border border-slate-200">
                        <div class="text-slate-800 text-sm" id="speech-text">欢迎来到我的小天地～</div>
                        <div class="absolute -bottom-3 right-4 w-6 h-6 bg-white rotate-45 border-l border-b border-slate-200"></div>
                        <button id="close-bubble" class="absolute top-1 right-1 text-slate-400 hover:text-slate-600">
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                    
                    <!-- 控制按钮 -->
                    <div class="absolute top-0 right-0 flex space-x-1">
                        <button id="minimize-character" class="bg-slate-100 hover:bg-slate-200 p-1 rounded-full text-slate-500 text-xs transition-all">
                            <i class="fa fa-minus"></i>
                        </button>
                    </div>
                </div>
                
                <!-- 最小化后的按钮 -->
                <div id="minimized-button" class="hidden fixed bottom-8 right-8 bg-[#ffc038] hover:bg-[#e6a82d] text-white p-3 rounded-full shadow-lg cursor-pointer transition-all">
                    <i class="fa fa-comment"></i>
                </div>
            `;
            
            // 添加到页面
            document.body.appendChild(container);
            
            // 获取元素引用
            const character = container.querySelector('#character');
            const speechBubble = container.querySelector('#speech-bubble');
            const speechText = container.querySelector('#speech-text');
            const closeBubble = container.querySelector('#close-bubble');
            const minimizeCharacter = container.querySelector('#minimize-character');
            const minimizedButton = container.querySelector('#minimized-button');
            
            // 基于时间段的语音库
            const timeBasedVoiceLines = {
                morning: [
                    "早上好！今天又是充满活力的一天～",
                    "早起的鸟儿有虫吃，你今天有什么计划吗？",
                    "早安～要不要一起去晨跑？",
                    "太阳公公出来了，该起床啦！",
                    "早餐吃什么好呢？有推荐吗？"
                ],
                afternoon: [
                    "下午好！工作或学习还顺利吗？",
                    "午后的阳光总是让人感到惬意～",
                    "喝杯下午茶休息一下吧！",
                    "今天的天气很适合出门拍照呢",
                    "下午是效率最高的时候，加油哦！"
                ],
                evening: [
                    "晚上好！今天过得怎么样？",
                    "夜幕降临，准备好迎接夜晚的宁静了吗？",
                    "晚餐想吃什么？我推荐那家新开的餐厅～",
                    "夜晚是思考的好时机，你最近有什么想法吗？",
                    "晚安前记得看看星星哦～"
                ],
                night: [
                    "夜深了，早点休息吧～",
                    "月亮出来了，该说晚安了～",
                    "熬夜对身体不好哦，记得早点睡！",
                    "希望你做个甜甜的梦～",
                    "晚安，明天又是新的一天！"
                ]
            };
            
            // 根据时间获取对应的语音分组
            function getTimeGroup() {
                const hour = new Date().getHours();
                
                if (hour >= 5 && hour < 12) {
                    return 'morning';
                } else if (hour >= 12 && hour < 18) {
                    return 'afternoon';
                } else if (hour >= 18 && hour < 22) {
                    return 'evening';
                } else {
                    return 'night';
                }
            }
            
            // 随机语音功能
            function getRandomVoiceLine() {
                const timeGroup = getTimeGroup();
                const voiceLines = timeBasedVoiceLines[timeGroup];
                const randomIndex = Math.floor(Math.random() * voiceLines.length);
                return voiceLines[randomIndex];
            }
            
            function showRandomVoice() {
                const voiceLine = getRandomVoiceLine();
                speechText.textContent = voiceLine;
                speechBubble.classList.remove('hidden');
                
                // 添加语音气泡出现动画
                speechBubble.style.opacity = '0';
                speechBubble.style.transform = 'translateY(10px)';
                speechBubble.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                
                setTimeout(() => {
                    speechBubble.style.opacity = '1';
                    speechBubble.style.transform = 'translateY(0)';
                }, 10);
                
                // 10秒后自动隐藏气泡
                setTimeout(hideSpeechBubble, 10000);
            }
            
            function hideSpeechBubble() {
                speechBubble.style.opacity = '0';
                speechBubble.style.transform = 'translateY(10px)';
                
                setTimeout(() => {
                    speechBubble.classList.add('hidden');
                }, 300);
            }
            
            // 角色最小化/最大化功能
            function toggleMinimize() {
                if (character.classList.contains('hidden')) {
                    // 最大化
                    character.classList.remove('hidden');
                    minimizedButton.classList.add('hidden');
                    container.style.right = '8px';
                } else {
                    // 最小化
                    hideSpeechBubble();
                    character.classList.add('hidden');
                    minimizedButton.classList.remove('hidden');
                    container.style.right = '24px';
                }
            }
            
            // 拖拽功能
            let isDragging = false;
            let offsetX, offsetY;
            
            function startDrag(e) {
                isDragging = true;
                const rect = container.getBoundingClientRect();
                offsetX = e.clientX - rect.left;
                offsetY = e.clientY - rect.top;
                
                // 提高拖拽时的层级
                container.style.zIndex = '100';
                
                // 改变光标样式
                document.body.style.cursor = 'grabbing';
            }
            
            function drag(e) {
                if (!isDragging) return;
                
                // 计算新位置
                let newX = e.clientX - offsetX;
                let newY = e.clientY - offsetY;
                
                // 限制在视口内
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;
                const containerWidth = container.offsetWidth;
                const containerHeight = container.offsetHeight;
                
                newX = Math.max(0, Math.min(newX, viewportWidth - containerWidth));
                newY = Math.max(0, Math.min(newY, viewportHeight - containerHeight));
                
                // 应用新位置
                container.style.left = `${newX}px`;
                container.style.top = `${newY}px`;
                container.style.right = 'auto';
                container.style.bottom = 'auto';
            }
            
            function stopDrag() {
                isDragging = false;
                document.body.style.cursor = 'default';
                // 恢复默认层级
                setTimeout(() => {
                    container.style.zIndex = '50';
                }, 300);
            }
            
            // 事件监听
            character.addEventListener('click', showRandomVoice);
            closeBubble.addEventListener('click', hideSpeechBubble);
            minimizeCharacter.addEventListener('click', toggleMinimize);
            minimizedButton.addEventListener('click', toggleMinimize);
            
            // 拖拽事件
            character.addEventListener('mousedown', startDrag);
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', stopDrag);
            
            // 移动设备触摸支持
            character.addEventListener('touchstart', (e) => {
                if (e.touches.length === 1) {
                    startDrag(e.touches[0]);
                    e.preventDefault(); // 防止滚动
                }
            });
            
            document.addEventListener('touchmove', (e) => {
                if (isDragging && e.touches.length === 1) {
                    drag(e.touches[0]);
                    e.preventDefault(); // 防止滚动
                }
            });
            
            document.addEventListener('touchend', stopDrag);
            
            // 页面加载时随机显示一条语音
            setTimeout(showRandomVoice, 3000);
            
            // 返回组件引用，方便后续操作
            return {
                container,
                character,
                showRandomVoice,
                toggleMinimize
            };
        }
        
        // 页面加载完成后创建QQ人组件
        window.addEventListener('load', () => {
            // 可以传入自定义图片路径
            createXiaoyanCharacter();
            // 如果需要更换图片，可以这样调用：
            // createXiaoyanCharacter('path/to/your/image.png');
        });