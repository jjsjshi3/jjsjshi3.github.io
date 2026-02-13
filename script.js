// 1. 設置在一起的初始日期 (2025/10/04)
const targetDate = new Date(2025, 9, 4, 0, 0, 0);

function updateTime() {
    const resultElement = document.getElementById("result");
    if (!resultElement) return;

    const now = new Date();
    const diff = now - targetDate;

    if (diff < 0) {
        resultElement.innerHTML = "期待相遇的那一天 💕";
        return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);

    resultElement.innerHTML = `在一起 ${days} 天 ${hours} 小時 ${minutes} 分鐘 ♥️`;
}

updateTime();
setInterval(updateTime, 1000);

// 2. 點擊主卡片事件
const mainCard = document.getElementById("mainCard");
const cardsContainer = document.getElementById("cardsContainer");

mainCard.addEventListener("click", () => {
    mainCard.classList.add("flip");

    // 清空舊的，生成新的小卡片
    cardsContainer.innerHTML = '';

    events.forEach((event, idx) => {
        const card = document.createElement("div");
        card.classList.add("mini-card");

        // 自動分配 ID 匹配 CSS (card100, cardValentine...)
        // 如果是第三張卡片(520)，我們給它一個通用的粉色背景樣式
        if (idx === 0) card.id = "card100";
        else if (idx === 1) card.id = "cardValentine";
        else card.style.background = "linear-gradient(135deg, #667eea, #764ba2)";

        const eventDate = new Date(event.date);
        const now = new Date();
        
        // 標題與日期
        let content = `<strong style="font-size:1.1em;">${event.title}</strong><br><span style="font-size:0.85em; opacity:0.8;">${event.date}</span><br>`;

        // 核心修正：不論過去未來，只要有 text 就顯示
        if (event.text) {
            content += `<div style="margin: 8px 0; font-style: italic;">"${event.text}"</div>`;
        }

        if (event.type === "past") {
            content += `<span style="color: #ffdae0;">✨ 回憶滿滿</span>`;
        } else {
            // 計算倒計時 (使用 Math.ceil 避免出現 0 天)
            const diffMs = eventDate - now;
            const totalDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
            
            if (totalDays <= 0) {
                content += `❤️ 就在今天！`;
            } else {
                const months = Math.floor(totalDays / 30);
                const days = totalDays % 30;
                content += months > 0 
                    ? `距離還有 ${months} 個月 ${days} 天` 
                    : `距離還有 ${days} 天`;
            }
        }

        card.innerHTML = content;
        cardsContainer.appendChild(card);

        // 觸發動畫
        setTimeout(() => {
            card.classList.add("show");
        }, 500 + (idx * 250));
    });
});
