const targetDate = new Date("2025-04-10T00:00:00");

function updateTime() {
    const now = new Date();
    const diff = now - targetDate;

    if (diff < 0) {
        document.getElementById("result").innerHTML = "還沒到這一天 💕";
        return;
    }

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    const remainHours = hours % 24;
    const remainMinutes = minutes % 60;

    document.getElementById("result").innerHTML =
        `已經 ${days} 天 ${remainHours} 小時 ${remainMinutes} 分鐘 ✨`;
}

updateTime();
setInterval(updateTime, 60000);
