// 更新倒數日
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

mainCard.addEventListener("click", () => {
    // 主卡片翻轉
    mainCard.classList.add("flip");

    // 顯示小卡片
    setTimeout(() => {
        document.querySelectorAll(".mini-card").forEach((card, idx) => {
            setTimeout(() => {
                card.classList.add("show");
            }, idx * 300); // 每張小卡片間隔動畫
        });
    }, 800); // 等待翻轉動畫結束
});
