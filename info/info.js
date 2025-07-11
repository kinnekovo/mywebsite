// 整理数据（完整复制data.csv中所有条目，处理空值和日期格式）
const rawData = [
    { name:"拾光凝意",rank: "SSS", attribute: "共情", chapter: "挚爱篇", method: "「归心之所」活动女神之影", date: "2023.07.20" },
    { name:"此春离离",rank: "SSS", attribute: "直觉", chapter: "挚爱篇", method: "「此春离离」活动女神之影", date: "2024.03.22" },
    { name:"雪语时新",rank: "SSS", attribute: "逻辑", chapter: "挚爱篇", method: "「愿予四季·冬雪篇」活动女神之影", date: "2025.02.20" }, // 移除[18]
    { name:"最佳拍档",rank: "SSR", attribute: "逻辑", chapter: "旖慕篇", method: "常驻女神之影", date: "2020.07.30" },
    { name:"微醺视线",rank: "SSR", attribute: "共情", chapter: "旖慕篇", method: "无", date: "无" }, // 处理空值
    // ... 此处省略其他数据，需将csv中所有条目补充完整 ...
    { name:"妙信传音",rank: "R", attribute: "直觉", chapter: "异世篇", method: "活动「少年如你之心动魔咒」", date: "2025.04.30" }
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