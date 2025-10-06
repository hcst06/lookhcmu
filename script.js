// 时间显示
function updateTime() {
    const now = new Date();
    document.getElementById('current-time').textContent = now.toLocaleString();
}
setInterval(updateTime,1000);
updateTime();

// 天气显示
async function updateWeather() {
    try {
        const ipRes = await fetch('https://ipapi.co/json/');
        const ipData = await ipRes.json();
        const city = ipData.city || '未知城市';

        const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric&lang=zh_cn`);
        const weatherData = await weatherRes.json();

        if(weatherData.main){
            document.getElementById('weather').textContent =
                `${city}：${weatherData.weather[0].description}，温度 ${weatherData.main.temp}°C`;
        } else {
            document.getElementById('weather').textContent = '天气数据获取失败';
        }
    } catch (e) {
        document.getElementById('weather').textContent = '天气加载失败';
        console.error(e);
    }
}
updateWeather();

// Steam 状态显示（30秒刷新）
async function updateSteamStatus() {
    try {
        const steamAPIKey = 'YOUR_STEAM_API_KEY';
        const steamID = 'YOUR_STEAM_ID';
        const res = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${steamAPIKey}&steamids=${steamID}`);
        const data = await res.json();
        const player = data.response.players[0];
        let statusText = '离线';
        switch(player.personastate){
            case 0: statusText='离线'; break;
            case 1: statusText='在线'; break;
            case 2: statusText='忙碌'; break;
            case 3: statusText='离开'; break;
            case 4: statusText='请勿打扰'; break;
            case 5: statusText='想玩游戏'; break;
            case 6: statusText='游戏中'; break;
        }
        document.getElementById('steam-status').textContent = statusText + (player.gameextrainfo ? ` - 🎮 ${player.gameextrainfo}` : '');
    } catch(e){
        document.getElementById('steam-status').textContent='Steam状态加载失败';
        console.error(e);
    }
}
updateSteamStatus();
setInterval(updateSteamStatus, 30000); // 每30秒刷新一次
