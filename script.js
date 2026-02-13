// 1. 在一起的时间计算
const targetDate = new Date(2025, 9, 4, 0, 0, 0);

function updateTime() {
    const resultElement = document.getElementById("result");
    if (!resultElement) return;
    const now = new Date();
    const diff = now - targetDate;
    if (diff < 0) {
        resultElement.innerHTML = "期待相遇 💕";
        return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    resultElement.innerHTML = `在一起 ${days} 天 ${hours} 小時 ${minutes} 分鐘 ♥️`;
}
updateTime();
setInterval(updateTime, 1000);

// 2. 核心：点击主卡片生成小卡片
const mainCard = document.getElementById("mainCard");
const cardsContainer = document.getElementById("cardsContainer");

if (mainCard && cardsContainer) {
    mainCard.addEventListener("click", () => {
        mainCard.classList.add("flip");
        cardsContainer.innerHTML = '';

        // 确保优先读取你在 events.js 里定义的数据
        const displayEvents = (typeof events !== 'undefined') ? events : [
            { title: "100天紀念日", date: "2026/01/12", type: "past", text: "第一份驚喜" },
            { title: "情人節", date: "2026/02/14", type: "future", text: "期待這一天" }
        ];

        displayEvents.forEach((event, idx) => {
            const card = document.createElement("div");
            card.classList.add("mini-card");
            
            // 强制赋予 ID 以匹配你的 CSS 位置
            if (idx === 0) card.id = "card100";
            if (idx === 1) card.id = "cardValentine";

            // --- 日期处理修复：兼容 '-' 和 '/' 格式 ---
            const eventDate = new Date(event.date.replace(/-/g, '/'));
            const now = new Date();
            
            // 基础标题和时间
            let content = `<strong>${event.title}</strong><br><small>${event.date}</small><br>`;

            // --- 文本修复：只要有文本就显示 ---
            if (event.text) {
                content += `<div style="margin:8px 0; font-size:15px; color:#fff;">${event.text}</div>`;
            }

            // --- 倒计时修复 ---
            if (event.type === "past") {
                content += `<span style="font-size:12px; opacity:0.8;">✨ 美好回憶</span>`;
            } else {
                // 计算天数差值（向上取整，避免出现0月0天）
                const diffMs = eventDate - now;
                const totalDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
                
                if (totalDays <= 0) {
                    content += `<span style="color:#fff; font-weight:bold;">❤️ 就在今天！</span>`;
                } else if (totalDays >= 30) {
                    const months = Math.floor(totalDays / 30);
                    const days = totalDays % 30;
                    content += `<span style="font-size:13px;">還有 ${months} 月 ${days} 天</span>`;
                } else {
                    content += `<span style="font-size:13px;">還有 ${totalDays} 天</span>`;
                }
            }

            card.innerHTML = content;
            cardsContainer.appendChild(card);

            // 触发动画
            setTimeout(() => {
                card.classList.add("show");
            }, 400 + (idx * 250));
        });
    });
}
