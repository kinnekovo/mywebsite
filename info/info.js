// 整理数据（完整复制data.csv中所有条目，处理空值和日期格式）
const rawData = [
    {
        "name": "拾光凝意",
        "rank": "SSS",
        "attribute": "共情",
        "chapter": "挚爱篇",
        "method": "「归心之所」活动女神之影",
        "date": "2023.07.20"
    },
    {
        "name": "此春离离",
        "rank": "SSS",
        "attribute": "直觉",
        "chapter": "挚爱篇",
        "method": "「此春离离」活动女神之影",
        "date": "2024.03.22"
    },
    {
        "name": "雪语时新",
        "rank": "SSS",
        "attribute": "逻辑",
        "chapter": "挚爱篇",
        "method": "「愿予四季·冬雪篇」活动女神之影",
        "date": "[18]2025.02.20"
    },
    {
        "name": "最佳拍档",
        "rank": "SSR",
        "attribute": "逻辑",
        "chapter": "旖慕篇",
        "method": "常驻女神之影",
        "date": "2020.07.30"
    },
    {
        "name": "微醺视线",
        "rank": "SSR",
        "attribute": "共情",
        "chapter": "旖慕篇",
        "method": "无",
        "date": "无"
    },
    {
        "name": "千灯如昼",
        "rank": "SSR",
        "attribute": "直觉",
        "chapter": "旖慕篇",
        "method": "「璀璨深夏」活动女神之影",
        "date": "2020.08.19"
    },
    {
        "name": "虹色心跳",
        "rank": "SSR",
        "attribute": "共情",
        "chapter": "旖慕篇",
        "method": "「探迷寻心」活动女神之影",
        "date": "2020.09.30"
    },
    {
        "name": "温馥予怀",
        "rank": "SSR",
        "attribute": "逻辑",
        "chapter": "旖慕篇",
        "method": "「四季如夏」活动女神之影",
        "date": "2020.11.27"
    },
    {
        "name": "荧荧眸光",
        "rank": "SSR",
        "attribute": "直觉",
        "chapter": "旖慕篇",
        "method": "「致斯卡提的情诗」活动女神之影",
        "date": "2021.01.29"
    },
    {
        "name": "此心安处",
        "rank": "SSR",
        "attribute": "共情",
        "chapter": "旖慕篇",
        "method": "「异乡行歌·上篇」活动女神之影",
        "date": "2021.03.25"
    },
    {
        "name": "腾霄",
        "rank": "SSR",
        "attribute": "直觉",
        "chapter": "旖慕篇",
        "method": "「燃动潮流夜」活动女神之影",
        "date": "2021.05.21"
    },
    {
        "name": "夜落星河",
        "rank": "SSR",
        "attribute": "逻辑",
        "chapter": "甜蜜篇",
        "method": "「绯色之吻」活动女神之影",
        "date": "2021.07.15"
    },
    {
        "name": "妄夜之魇",
        "rank": "SSR",
        "attribute": "逻辑",
        "chapter": "甜蜜篇",
        "method": "「妄夜之魇」活动女神之影",
        "date": "2021.09.07"
    },
    {
        "name": "昼夜余想",
        "rank": "SSR",
        "attribute": "逻辑",
        "chapter": "异世篇",
        "method": "「狂沙的呼唤」活动女神之影",
        "date": "2021.09.29"
    },
    {
        "name": "暗漪",
        "rank": "SSR",
        "attribute": "共情",
        "chapter": "甜蜜篇",
        "method": "「灼年情记」活动女神之影",
        "date": "2021.11.27"
    },
    {
        "name": "瑰色余温",
        "rank": "SSR",
        "attribute": "直觉",
        "chapter": "甜蜜篇",
        "method": "「雪色弥境」活动女神之影",
        "date": "2021.12.21"
    },
    {
        "name": "戏影入梦",
        "rank": "SSR",
        "attribute": "共情",
        "chapter": "异世篇",
        "method": "「飞雪落红尘」活动女神之影",
        "date": "2022.01.20"
    },
    {
        "name": "执愿",
        "rank": "SSR",
        "attribute": "直觉",
        "chapter": "甜蜜篇",
        "method": "「童梦畅游」活动女神之影",
        "date": "2022.03.01"
    },
    {
        "name": "繁荫浮岁",
        "rank": "SSR",
        "attribute": "共情",
        "chapter": "甜蜜篇",
        "method": "「煦风恋旅·下篇」活动女神之影",
        "date": "2022.05.11"
    },
    {
        "name": "犬梦留晞",
        "rank": "SSR",
        "attribute": "直觉",
        "chapter": "甜蜜篇",
        "method": "「甜宠萌心·上篇」活动女神之影",
        "date": "2022.06.23"
    },
    {
        "name": "蜜橙淆心",
        "rank": "SSR",
        "attribute": "逻辑",
        "chapter": "约定篇",
        "method": "「约定之日」活动女神之影",
        "date": "2022.07.21"
    },
    {
        "name": "岁夜流踪",
        "rank": "SSR",
        "attribute": "共情",
        "chapter": "约定篇",
        "method": "「岁夜流踪」活动女神之影",
        "date": "2022.08.11"
    },
    {
        "name": "恋恋雾城",
        "rank": "SSR",
        "attribute": "直觉",
        "chapter": "异世篇",
        "method": "「情迷贝克伦」活动女神之影",
        "date": "2022.09.29"
    },
    {
        "name": "抵此情深",
        "rank": "SSR",
        "attribute": "逻辑",
        "chapter": "约定篇",
        "method": "「情迷贝克伦」限时累充",
        "date": "无"
    },
    {
        "name": "旧忆灼心",
        "rank": "SSR",
        "attribute": "直觉",
        "chapter": "约定篇",
        "method": "「恋满韶荫」活动女神之影",
        "date": "2022.11.27"
    },
    {
        "name": "空烬",
        "rank": "SSR",
        "attribute": "逻辑",
        "chapter": "异世篇",
        "method": "「故城黎明的回响」活动女神之影",
        "date": "2023.01.12"
    },
    {
        "name": "赴心同炽",
        "rank": "SSR",
        "attribute": "共情",
        "chapter": "约定篇",
        "method": "「逆火逐夏」活动女神之影",
        "date": "2023.01.30"
    },
    {
        "name": "逸日偕心",
        "rank": "SSR",
        "attribute": "逻辑",
        "chapter": "约定篇",
        "method": "「逸日偕心」活动女神之影",
        "date": "2023.05.25"
    },
    {
        "name": "芜音藏迹",
        "rank": "SSR",
        "attribute": "直觉",
        "chapter": "挚爱篇",
        "method": "「迢迢铃音」活动女神之影",
        "date": "2023.08.23"
    },
    {
        "name": "落愿余梦",
        "rank": "SSR",
        "attribute": "共情",
        "chapter": "异世篇",
        "method": "「最后的龙息」活动女神之影",
        "date": "2023.09.28"
    },
    {
        "name": "逾漪留夏",
        "rank": "SSR",
        "attribute": "逻辑",
        "chapter": "挚爱篇",
        "method": "「蟹邀觅趣」活动女神之影",
        "date": "2023.10.17"
    },
    {
        "name": "殊途之外",
        "rank": "SSR",
        "attribute": "直觉",
        "chapter": "挚爱篇",
        "method": "「雪照夏时」活动女神之影",
        "date": "2023.11.26"
    },
    {
        "name": "一醉三千春",
        "rank": "SSR",
        "attribute": "逻辑",
        "chapter": "异世篇",
        "method": "「红尘共长生」活动女神之影",
        "date": "2024.02.01"
    },
    {
        "name": "猎妄",
        "rank": "SSR",
        "attribute": "共情",
        "chapter": "挚爱篇",
        "method": "「红尘共长生」限时累充",
        "date": "无"
    },
    {
        "name": "心动所向",
        "rank": "SSR",
        "attribute": "直觉",
        "chapter": "异世篇",
        "method": "「少年如你」活动女神之影",
        "date": "2024.04.28"
    },
    {
        "name": "此夜曲中",
        "rank": "SSR",
        "attribute": "共情",
        "chapter": "挚爱篇",
        "method": "「鼓悦鸣音」活动女神之影",
        "date": "2024.05.16"
    },
    {
        "name": "谜抵少时",
        "rank": "SSR",
        "attribute": "逻辑",
        "chapter": "挚爱篇",
        "method": "「爱如初见」限时累充",
        "date": "2024.07.12"
    },
    {
        "name": "终应心期",
        "rank": "SSR",
        "attribute": "共情",
        "chapter": "挚爱篇",
        "method": "「爱如初见」活动女神之影",
        "date": "2024.07.18"
    },
    {
        "name": "舞跃今宵",
        "rank": "SSR",
        "attribute": "直觉",
        "chapter": "挚爱篇",
        "method": "「喜乐闲饮」活动女神之影",
        "date": "2024.08.22"
    },
    {
        "name": "真心予谁",
        "rank": "SSR",
        "attribute": "逻辑",
        "chapter": "未定篇",
        "method": "「NXX-海岛疑云」活动女神之影",
        "date": "2024.09.29"
    },
    {
        "name": "情惘",
        "rank": "SSR",
        "attribute": "共情",
        "chapter": "旖慕篇",
        "method": "「旧梦新生」活动女神之影",
        "date": "2024.10.17"
    },
    {
        "name": "以期将时",
        "rank": "SSR",
        "attribute": "直觉",
        "chapter": "挚爱篇",
        "method": "「岁岁长夏」活动女神之影",
        "date": "2024.11.27"
    },
    {
        "name": "归路沿风",
        "rank": "SSR",
        "attribute": "逻辑",
        "chapter": "挚爱篇",
        "method": "「今愿良宵」活动女神之影",
        "date": "2024.12.19"
    },
    {
        "name": "绎尘",
        "rank": "SSR",
        "attribute": "共情",
        "chapter": "异世篇",
        "method": "「万灵局·妖闻簿」活动女神之影",
        "date": "2025.01.21"
    },
    {
        "name": "弥念成思",
        "rank": "SSR",
        "attribute": "直觉",
        "chapter": "异世篇",
        "method": "「少年如你之心动魔咒」活动女神之影",
        "date": "2025.04.30"
    },
    {
        "name": "落落光阴",
        "rank": "SSR",
        "attribute": "逻辑",
        "chapter": "挚爱篇",
        "method": "「少年如你之心动魔咒」限时累充",
        "date": "无"
    },
    {
        "name": "致夏阳",
        "rank": "SSR",
        "attribute": "共情",
        "chapter": "挚爱篇",
        "method": "「恋时旅纪」活动女神之影",
        "date": "2025.06.05"
    },
    {
        "name": "惊心一刻",
        "rank": "SR",
        "attribute": "共情",
        "chapter": "旖慕篇",
        "method": "常驻女神之影；首充自选",
        "date": "2020.07.30"
    },
    {
        "name": "斑斓光影",
        "rank": "SR",
        "attribute": "直觉",
        "chapter": "旖慕篇",
        "method": "常驻女神之影",
        "date": "无"
    },
    {
        "name": "倾落心扉",
        "rank": "SR",
        "attribute": "共情",
        "chapter": "旖慕篇",
        "method": "无",
        "date": "无"
    },
    {
        "name": "完美营救",
        "rank": "SR",
        "attribute": "逻辑",
        "chapter": "旖慕篇",
        "method": "无",
        "date": "无"
    },
    {
        "name": "碧蓝之间",
        "rank": "SR",
        "attribute": "直觉",
        "chapter": "旖慕篇",
        "method": "无",
        "date": "无"
    },
    {
        "name": "彼时少年",
        "rank": "SR",
        "attribute": "逻辑",
        "chapter": "未定篇",
        "method": "常驻女神之影；异常1-8、1-16、3-11、5-4、17-8",
        "date": "无"
    },
    {
        "name": "与子偕行",
        "rank": "SR",
        "attribute": "逻辑",
        "chapter": "未定篇",
        "method": "常驻女神之影；异常5-8、5-12、5-24、7-4",
        "date": "无"
    },
    {
        "name": "忆中人",
        "rank": "SR",
        "attribute": "直觉",
        "chapter": "旖慕篇",
        "method": "「午夜华章」活动女神之影",
        "date": "2020.11.12"
    },
    {
        "name": "掌中流光",
        "rank": "SR",
        "attribute": "共情",
        "chapter": "旖慕篇",
        "method": "「缤纷乐游会」限时任务获取",
        "date": "2020.11.16"
    },
    {
        "name": "纸间情眷",
        "rank": "SR",
        "attribute": "共情",
        "chapter": "甜蜜篇",
        "method": "「青葱巡礼」活动女神之影",
        "date": "2021.11.02"
    },
    {
        "name": "刻心",
        "rank": "SR",
        "attribute": "直觉",
        "chapter": "未定篇",
        "method": "常驻女神之影；异常9-4、9-8、9-12、14-8",
        "date": "2022.07.05"
    },
    {
        "name": "蜜秘",
        "rank": "SR",
        "attribute": "逻辑",
        "chapter": "约定篇",
        "method": "「冬恋晴歌」活动翻牌获取",
        "date": "2022.12.22"
    },
    {
        "name": "柠风星夏",
        "rank": "SR",
        "attribute": "直觉",
        "chapter": "约定篇",
        "method": "「澄夏海语」活动翻牌获取",
        "date": "2023.04.28"
    },
    {
        "name": "灼光 [13]",
        "rank": "SR",
        "attribute": "共情",
        "chapter": "未定篇",
        "method": "常驻女神之影；异常13-4、13-8、13-12、15-12",
        "date": "2023.06.30"
    },
    {
        "name": "绵雨晴心 [10]",
        "rank": "SR",
        "attribute": "逻辑",
        "chapter": "挚爱篇",
        "method": "「索牌逐悦」活动翻牌获取",
        "date": "2024.01.10"
    },
    {
        "name": "陪伴",
        "rank": "MR",
        "attribute": "逻辑",
        "chapter": "旖慕篇",
        "method": "「花遇惠风」活动",
        "date": "2021.03.04"
    },
    {
        "name": "寄意",
        "rank": "MR",
        "attribute": "直觉",
        "chapter": "甜蜜篇",
        "method": "「花间密语」活动",
        "date": "2021.08.05"
    },
    {
        "name": "明熹",
        "rank": "MR",
        "attribute": "逻辑",
        "chapter": "甜蜜篇",
        "method": "「专项咨询」活动",
        "date": "2021.08.27"
    },
    {
        "name": "囚月",
        "rank": "MR",
        "attribute": "共情",
        "chapter": "异世篇",
        "method": "「幻夜呓语」活动",
        "date": "2021.10.22"
    },
    {
        "name": "挚切",
        "rank": "MR",
        "attribute": "共情",
        "chapter": "甜蜜篇",
        "method": "「浓情浅吻」活动",
        "date": "2022.02.10"
    },
    {
        "name": "晴絮",
        "rank": "MR",
        "attribute": "共情",
        "chapter": "甜蜜篇",
        "method": "「偷心机密」活动",
        "date": "2022.04.28"
    },
    {
        "name": "涎涟",
        "rank": "MR",
        "attribute": "直觉",
        "chapter": "约定篇",
        "method": "「百味盈欢」活动",
        "date": "2022.09.06"
    },
    {
        "name": "幻诱",
        "rank": "MR",
        "attribute": "逻辑",
        "chapter": "异世篇",
        "method": "「漫想夜话」活动",
        "date": "2022.10.27"
    },
    {
        "name": "沉溺",
        "rank": "MR",
        "attribute": "直觉",
        "chapter": "约定篇",
        "method": "「情沐秘邀」活动",
        "date": "2023.02.10"
    },
    {
        "name": "缠恋",
        "rank": "MR",
        "attribute": "共情",
        "chapter": "甜蜜篇",
        "method": "「专项咨询」活动",
        "date": "2023.03.02"
    },
    {
        "name": "拥怀",
        "rank": "MR",
        "attribute": "直觉",
        "chapter": "约定篇",
        "method": "「祈慕誓吻」活动",
        "date": "2023.05.16"
    },
    {
        "name": "鸣琴 [16]",
        "rank": "MR",
        "attribute": "逻辑",
        "chapter": "挚爱篇",
        "method": "「与君聆珍意」活动",
        "date": "2023.08.17"
    },
    {
        "name": "孤注 [14]",
        "rank": "MR",
        "attribute": "直觉",
        "chapter": "挚爱篇",
        "method": "「绮梦之夜」活动",
        "date": "2023.10.26"
    },
    {
        "name": "向暖 [11]",
        "rank": "MR",
        "attribute": "共情",
        "chapter": "挚爱篇",
        "method": "「蜜夜诞礼」活动",
        "date": "2023.12.21"
    },
    {
        "name": "跃动 [8]",
        "rank": "MR",
        "attribute": "直觉",
        "chapter": "挚爱篇",
        "method": "「恣意腾跃」活动",
        "date": "2024.02.22"
    },
    {
        "name": "掌慕 [7]",
        "rank": "MR",
        "attribute": "逻辑",
        "chapter": "异世篇",
        "method": "「巧心梦与掌中诗」活动",
        "date": "2024.03.14"
    },
    {
        "name": "凯旋",
        "rank": "MR",
        "attribute": "直觉",
        "chapter": "挚爱篇",
        "method": "「山雪长念」活动",
        "date": "2024.08.05"
    },
    {
        "name": "惊寐",
        "rank": "MR",
        "attribute": "共情",
        "chapter": "挚爱篇",
        "method": "「未名夜惊魂」活动",
        "date": "2024.10.25"
    },
    {
        "name": "雪幕",
        "rank": "MR",
        "attribute": "逻辑",
        "chapter": "挚爱篇",
        "method": "「霜鸿捕珍」活动",
        "date": "2025.01.10"
    },
    {
        "name": "丝迹",
        "rank": "MR",
        "attribute": "共情",
        "chapter": "挚爱篇",
        "method": "「鸣沙踏歌」活动",
        "date": "2025.02.13"
    },
    {
        "name": "赴焰",
        "rank": "MR",
        "attribute": "逻辑",
        "chapter": "挚爱篇",
        "method": "「绮念信笺兑换所」兑换",
        "date": "2025.04.03"
    },
    {
        "name": "执刃",
        "rank": "MR",
        "attribute": "直觉",
        "chapter": "挚爱篇",
        "method": "「守愿拾辉」活动",
        "date": "2025.06.24"
    },
    {
        "name": "搭档",
        "rank": "R",
        "attribute": "共情",
        "chapter": "旖慕篇",
        "method": "常驻女神之影",
        "date": "2020.07.30"
    },
    {
        "name": "等你",
        "rank": "R",
        "attribute": "共情",
        "chapter": "旖慕篇",
        "method": "无",
        "date": "无"
    },
    {
        "name": "贴心服务",
        "rank": "R",
        "attribute": "共情",
        "chapter": "旖慕篇",
        "method": "无",
        "date": "无"
    },
    {
        "name": "打招呼",
        "rank": "R",
        "attribute": "直觉",
        "chapter": "旖慕篇",
        "method": "无",
        "date": "无"
    },
    {
        "name": "热身",
        "rank": "R",
        "attribute": "直觉",
        "chapter": "旖慕篇",
        "method": "无",
        "date": "无"
    },
    {
        "name": "倦意",
        "rank": "R",
        "attribute": "直觉",
        "chapter": "旖慕篇",
        "method": "无",
        "date": "无"
    },
    {
        "name": "秘密",
        "rank": "R",
        "attribute": "逻辑",
        "chapter": "旖慕篇",
        "method": "无",
        "date": "无"
    },
    {
        "name": "美味一刻",
        "rank": "R",
        "attribute": "逻辑",
        "chapter": "旖慕篇",
        "method": "无",
        "date": "无"
    },
    {
        "name": "准备就绪",
        "rank": "R",
        "attribute": "逻辑",
        "chapter": "旖慕篇",
        "method": "活动「消失的黄金」",
        "date": "2020.09.30"
    },
    {
        "name": "静候",
        "rank": "R",
        "attribute": "直觉",
        "chapter": "旖慕篇",
        "method": "活动「四季如夏」",
        "date": "2020.11.27"
    },
    {
        "name": "温馨小屋",
        "rank": "R",
        "attribute": "共情",
        "chapter": "旖慕篇",
        "method": "活动「致斯卡提的情诗」",
        "date": "2021.01.29"
    },
    {
        "name": "相伴",
        "rank": "R",
        "attribute": "逻辑",
        "chapter": "旖慕篇",
        "method": "活动「温暖闹元宵」",
        "date": "2021.02.20"
    },
    {
        "name": "注视",
        "rank": "R",
        "attribute": "直觉",
        "chapter": "旖慕篇",
        "method": "活动「异乡行歌·上篇」",
        "date": "2021.03.25"
    },
    {
        "name": "羞赧",
        "rank": "R",
        "attribute": "共情",
        "chapter": "甜蜜篇",
        "method": "活动「未名盛典」",
        "date": "2021.07.15"
    },
    {
        "name": "重逢",
        "rank": "R",
        "attribute": "直觉",
        "chapter": "甜蜜篇",
        "method": "活动「佳期鹊桥会」",
        "date": "2021.08.05"
    },
    {
        "name": "少年意气",
        "rank": "R",
        "attribute": "直觉",
        "chapter": "异世篇",
        "method": "活动「狂沙的呼唤」",
        "date": "2021.09.29"
    },
    {
        "name": "角逐",
        "rank": "R",
        "attribute": "逻辑",
        "chapter": "甜蜜篇",
        "method": "活动「灼年情记」",
        "date": "2021.11.27"
    },
    {
        "name": "侠客行",
        "rank": "R",
        "attribute": "逻辑",
        "chapter": "异世篇",
        "method": "活动「飞雪落红尘」",
        "date": "2022.01.20"
    },
    {
        "name": "循风",
        "rank": "R",
        "attribute": "共情",
        "chapter": "甜蜜篇",
        "method": "活动「煦风恋旅·下篇」",
        "date": "2022.05.11"
    },
    {
        "name": "蜜意",
        "rank": "R",
        "attribute": "逻辑",
        "chapter": "约定篇",
        "method": "活动「共赴月朝」",
        "date": "2022.07.21"
    },
    {
        "name": "潜思",
        "rank": "R",
        "attribute": "共情",
        "chapter": "异世篇",
        "method": "活动「情迷贝克伦」",
        "date": "2022.09.29"
    },
    {
        "name": "念想",
        "rank": "R",
        "attribute": "逻辑",
        "chapter": "约定篇",
        "method": "活动「恋满韶荫」",
        "date": "2022.11.27"
    },
    {
        "name": "无畏",
        "rank": "R",
        "attribute": "共情",
        "chapter": "异世篇",
        "method": "活动「故城黎明的回响」",
        "date": "2023.01.12"
    },
    {
        "name": "稚心所获",
        "rank": "R",
        "attribute": "直觉",
        "chapter": "约定篇",
        "method": "活动「HoHo好运」",
        "date": "2023.03.09"
    },
    {
        "name": "驰然 [17]",
        "rank": "R",
        "attribute": "逻辑",
        "chapter": "挚爱篇",
        "method": "活动「归心之所」",
        "date": "2023.07.20"
    },
    {
        "name": "花誓 [15]",
        "rank": "R",
        "attribute": "共情",
        "chapter": "异世篇",
        "method": "活动「最后的龙息」",
        "date": "2023.09.28"
    },
    {
        "name": "相邀 [12]",
        "rank": "R",
        "attribute": "逻辑",
        "chapter": "挚爱篇",
        "method": "活动「雪照夏时」",
        "date": "2023.11.26"
    },
    {
        "name": "千秋岁 [9]",
        "rank": "R",
        "attribute": "直觉",
        "chapter": "异世篇",
        "method": "活动「红尘共长生」",
        "date": "2024.02.01"
    },
    {
        "name": "心动秩序",
        "rank": "R",
        "attribute": "共情",
        "chapter": "异世篇",
        "method": "活动「少年如你」",
        "date": "2024.04.28"
    },
    {
        "name": "一较高下",
        "rank": "R",
        "attribute": "直觉",
        "chapter": "挚爱篇",
        "method": "活动「爱如初见」",
        "date": "2024.07.18"
    },
    {
        "name": "潜行",
        "rank": "R",
        "attribute": "直觉",
        "chapter": "未定篇",
        "method": "活动「NXX-海岛疑云」",
        "date": "2024.09.28"
    },
    {
        "name": "坚守",
        "rank": "R",
        "attribute": "共情",
        "chapter": "挚爱篇",
        "method": "活动「岁岁长夏」",
        "date": "2024.11.27"
    },
    {
        "name": "定愿",
        "rank": "R",
        "attribute": "逻辑",
        "chapter": "异世篇",
        "method": "活动「万灵局·妖闻簿」",
        "date": "2025.01.21"
    },
    {
        "name": "妙信传音",
        "rank": "R",
        "attribute": "直觉",
        "chapter": "异世篇",
        "method": "活动「少年如你之心动魔咒」",
        "date": "2025.04.30"
    }
];

// 全局状态
let currentData = rawData; // 当前显示的数据（受筛选/排序影响）
let sortField = null; // 当前排序的字段
let sortDirection = "asc"; // 排序方向（asc/desc）
let isCollapsed = true; // 是否收起（默认收起）
const visibleRows = 5; // 收起时显示的行数

// DOM元素
const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("searchInput");
const rankFilter = document.getElementById("rankFilter");
const attributeFilter = document.getElementById("attributeFilter");
const chapterFilter = document.getElementById("chapterFilter");
const toggleBtn = document.getElementById("toggleBtn");
const tableHeaders = document.querySelectorAll("#dataTable th");

// 渲染表格
function renderTable() {
    tableBody.innerHTML = "";
    let displayData = [...currentData];

    // 处理收起状态：只显示前N行
    if (isCollapsed) {
        displayData = displayData.slice(0, visibleRows);
    }

    // 生成表格行
    displayData.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.rank}</td>
            <td>${item.attribute}</td>
            <td>${item.chapter}</td>
            <td>${item.method}</td>
            <td>${item.date}</td>
        `;
        tableBody.appendChild(row);
    });
}

// 排序功能（点击表头触发）
function sortData(field) {
    // 切换排序方向（同一字段再次点击则反向）
    if (sortField === field) {
        sortDirection = sortDirection === "asc" ? "desc" : "asc";
    } else {
        sortField = field;
        sortDirection = "asc";
    }

    // 等级排序权重（SSS > SSR > MR > SR > R）
    const rankPriority = { SSS: 5, SSR: 4, MR: 3, SR: 2, R: 1 };

    // 执行排序
    currentData.sort((a, b) => {
        let valueA, valueB;
        switch (field) {
            case "rank":
                valueA = rankPriority[a.rank];
                valueB = rankPriority[b.rank];
                break;
            case "date":
                // 日期格式统一为可比较的字符串（空值放最后）
                valueA = a.date === "无" ? "0000.00.00" : a.date;
                valueB = b.date === "无" ? "0000.00.00" : b.date;
                break;
            default:
                // 其他字段按字符串排序
                valueA = a[field].toLowerCase();
                valueB = b[field].toLowerCase();
        }

        // 比较并返回排序结果
        if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
        if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
        return 0;
    });

    // 更新表头排序指示
    tableHeaders.forEach(th => th.classList.remove("asc", "desc"));
    document.querySelector(`th[data-sort="${field}"]`).classList.add(sortDirection);

    renderTable();
}

// 筛选功能（根据条件过滤数据）
function filterData() {
    const rank = rankFilter.value;
    const attribute = attributeFilter.value;
    const chapter = chapterFilter.value;
    const searchTerm = searchInput.value.toLowerCase();

    // 过滤逻辑
    currentData = rawData.filter(item => {
        const matchRank = !rank || item.rank === rank;
        const matchAttr = !attribute || item.attribute === attribute;
        const matchChapter = !chapter || item.chapter === chapter;
        const matchSearch = !searchTerm || 
            item.name.toLowerCase().includes(searchTerm) || // 添加对思绪名的搜索
            item.rank.toLowerCase().includes(searchTerm) ||
            item.attribute.toLowerCase().includes(searchTerm) ||
            item.chapter.toLowerCase().includes(searchTerm) ||
            item.method.toLowerCase().includes(searchTerm) ||
            item.date.toLowerCase().includes(searchTerm);

        return matchRank && matchAttr && matchChapter && matchSearch;
    });

    // 保持排序状态
    if (sortField) sortData(sortField);
    else renderTable();
}

// 切换收起/展开
function toggleCollapse() {
    isCollapsed = !isCollapsed;
    toggleBtn.textContent = isCollapsed ? "展开" : "收起";
    renderTable();
}

// 绑定事件
tableHeaders.forEach(th => th.addEventListener("click", () => sortData(th.dataset.sort)));
searchInput.addEventListener("input", filterData);
rankFilter.addEventListener("change", filterData);
attributeFilter.addEventListener("change", filterData);
chapterFilter.addEventListener("change", filterData);
toggleBtn.addEventListener("click", toggleCollapse);

// 初始化表格
renderTable();