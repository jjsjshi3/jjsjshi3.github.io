// script.js
// 倒數主卡片
const targetDate = new Date(2025, 9, 4, 0, 0, 0);
function updateTime() {
    const now = new Date();
    const diff = now - targetDate;

    if (diff < 0) {
        document.getElementById("result").innerHTML = "還沒到這一天 💕";
        return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);

    document.getElementById("result").innerHTML =
        `在一起 ${days} 天 ${hours} 小時 ${minutes} 分鐘 ♥️`;
}

updateTime();
setInterval(updateTime, 1000);

// 點擊主卡片事件
const mainCard = document.getElementById("mainCard");
const cardsContainer = document.getElementById("cardsContainer");

// 引入事件列表
// 假設 events.js 已經在 index.html 先被加載
function createMiniCards() {
    events.forEach(event => {
        const card = document.createElement("div");
        card.classList.add("mini-card");

        const eventDate = new Date(event.date);
        const now = new Date();
        let content = `<strong>${event.title}</strong><br>${event.date}<br>`;

        if (event.type === "past") {
            // 顯示文本
            content += event.text ? event.text : "";
        } else {
            // 計算剩餘天數、月數
            let diffMs = eventDate - now;
            if(diffMs < 0) diffMs = 0; // 過期就顯示 0
            const diffDays = Math.floor(diffMs / (1000*60*60*24));
            const diffMonths = Math.floor(diffDays / 30);
            const remainingDays = diffDays % 30;

            content += `距離 ${event.title} 還有 ${diffMonths} 月 ${remainingDays} 天`;
        }

        card.innerHTML = content;
        cardsContainer.appendChild(card);
    });
}

// 等主卡片翻轉後顯示小卡片
mainCard.addEventListener("click", () => {
    mainCard.classList.add("flip");

    // 先生成小卡片
    createMiniCards();

    // 顯示動畫
    const miniCards = document.querySelectorAll(".mini-card");
    miniCards.forEach((card, idx) => {
        setTimeout(() => {
            card.classList.add("show");
        }, 500 + idx * 200);
    });
});
