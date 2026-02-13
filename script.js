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
        `已經 ${days} 天 ${hours} 小時 ${minutes} 分鐘 ✨`;
}

updateTime();
setInterval(updateTime, 1000);
