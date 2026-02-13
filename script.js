/**
 * 1. 目标日期设置
 * 这里的月份 (9) 代表 10月，因为 JavaScript 的月份是从 0 开始计算的 (0-11)
 */
const targetDate = new Date(2025, 9, 4, 0, 0, 0);

/**
 * 2. 更新主卡片的倒计时逻辑
 */
function updateTime() {
    const resultElement = document.getElementById("result");
    if (!resultElement) return;

    const now = new Date();
    const diff = now - targetDate;

    if (diff < 0) {
        resultElement.innerHTML = "期待那一天 💕";
        return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);

    resultElement.innerHTML = `在一起 ${days} 天 ${hours} 小時 ${minutes} 分鐘 ♥️`;
}

// 初始化执行一次，随后每秒更新
updateTime();
setInterval(updateTime, 1000);

/**
 * 3. 模拟事件列表 (如果你的 events.js 加载失败，这里提供备用数据)
 */
const defaultEvents = [
    { id: "card100", title: "💌 100天紀念日", date: "2026-01-12", type: "past", text: "第一個百天快樂！" },
    { id: "cardValentine", title: "❤️ 情人節", date: "2026-02-14", type: "future" }
];

// 优先使用 events.js 定义的变量，如果没有则使用默认值
const myEvents = (typeof events !== 'undefined') ? events : defaultEvents;

/**
 * 4. 核心逻辑：点击主卡片并弹出小卡片
 */
const mainCard = document.getElementById("mainCard");
const cardsContainer = document.getElementById("cardsContainer");

if (mainCard && cardsContainer) {
    mainCard.addEventListener("click", () => {
        // 让主卡片翻转消失
        mainCard.classList.add("flip");

        // 清空容器（防止重复点击生成多份）
        cardsContainer.innerHTML = '';

        // 动态生成小卡片
        myEvents.forEach((event, idx) => {
            const card = document.createElement("div");
            card.classList.add("mini-card");
            
            // 关键：必须给 ID，否则你的 CSS 动画位置 (transform) 无法生效
            // 如果 event 对象里有 id 就用 id，没有就按顺序分配
            if (event.id) {
                card.id = event.id;
            } else if (idx === 0) {
                card.id = "card100";
            } else if (idx === 1) {
                card.id = "cardValentine";
            }

            const eventDate = new Date(event.date);
            const now = new Date();
            let content = `<strong>${event.title}</strong><br>${event.date}<br>`;

            if (event.type === "past") {
                content += event.text ? event.text : "美好的回憶";
            } else {
                // 计算倒计时
             // ... 之前的代码 ...

} else {
    // 计算倒计时
    let diffMs = eventDate - now;
    
    if (diffMs <= 0) {
        content += "❤️ 就在今天！";
    } else {
        // 使用 Math.ceil 确保哪怕只有几小时也算 1 天
        const totalDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
        
        const diffMonths = Math.floor(totalDays / 30);
        const remainingDays = totalDays % 30;

        // 优化显示文字
        if (diffMonths > 0) {
            content += `距離還有 ${diffMonths} 月 ${remainingDays} 天`;
        } else {
            content += `距離還有 ${remainingDays} 天`;
        }
    }
}

            card.innerHTML = content;
            cardsContainer.appendChild(card);

            // 使用 setTimeout 错开动画时间，形成交替弹出的效果
            setTimeout(() => {
                card.classList.add("show");
            }, 400 + (idx * 250)); // 400ms 是等待主卡片翻转一半的时间
        });
    });
}
