// 1. 设置在一起的日期 (2025/10/04)
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

// 2. 核心逻辑：点击主卡片弹出小卡片
const mainCard = document.getElementById("mainCard");
const cardsContainer = document.getElementById("cardsContainer");

mainCard.addEventListener("click", () => {
    // 主卡片翻转消失
    mainCard.classList.add("flip");

    // 清空容器，防止重复生成
    cardsContainer.innerHTML = '';

    // 只处理 events 中的前两个（100天和情人节）
    events.slice(0, 2).forEach((event, idx) => {
        const card = document.createElement("div");
        card.classList.add("mini-card");

        // --- 关键修复：强制匹配你的 CSS ID ---
        if (idx === 0) {
            card.id = "card100";      // 对应 CSS 中的 #card100
        } else if (idx === 1) {
            card.id = "cardValentine"; // 对应 CSS 中的 #cardValentine
        }

        const eventDate = new Date(event.date);
        const now = new Date();
        
        // 标题与日期
        let content = `<strong style="font-size:1.1em;">${event.title}</strong><br><span style="font-size:0.85em; opacity:0.8;">${event.date}</span><br>`;

        // 显示文本（events.js 里的 text）
        if (event.text) {
            content += `<div style="margin: 10px 0; font-style: italic;">"${event.text}"</div>`;
        }

        // 判断过去还是未来
        if (event.type === "past") {
            content += `<span style="font-size:12px; color:#ffdae0;">✨ 甜蜜的回忆</span>`;
        } else {
            // 计算倒计时
            const diffMs = eventDate - now;
            const totalDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
            
            if (totalDays <= 0) {
                content += `❤️ 就在今天！`;
            } else {
                content += `<span style="font-size:12px;">距離還有 ${totalDays} 天</span>`;
            }
        }

        card.innerHTML = content;
        cardsContainer.appendChild(card);

        // 触发动画：稍微延迟确保 DOM 已经渲染
        setTimeout(() => {
            card.classList.add("show");
        }, 300 + (idx * 200));
    });
});
