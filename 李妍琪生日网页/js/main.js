console.log("main.js loaded");

let stage = 0;
const actionButton = document.getElementById('actionButton');
const lights = document.getElementById('lights');
const table = document.getElementById('table');
const cake = document.getElementById('cake');
const homeContainer = document.getElementById('home');
const birthdaySong = document.getElementById('birthdaySong');

const happy = document.querySelector("#happy");
const plate = document.querySelector("#tp_plate");
const tp_cake = document.querySelector("#tp_cake");
const candle = document.querySelector("#tp_candle");

let particleInterval;
let fireworks = [];
let textParticles = [];

function resetHomePage() {
    stage = 0;
    homeContainer.style.backgroundColor = '#1A1A1A';
    lights.style.opacity = '0.2';
    table.style.opacity = '0';
    table.style.transform = 'scale(0)';
    cake.style.opacity = '0';
    cake.style.transform = 'scale(0)';
    actionButton.style.display = 'block';
    actionButton.textContent = '开始喽';
    birthdaySong.pause();
    birthdaySong.currentTime = 0;
    clearInterval(particleInterval);
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = '-10px';
    particle.style.backgroundColor = ['#FFD700', '#FF6347', '#4169E1', '#32CD32', '#FF69B4'][Math.floor(Math.random() * 5)];
    homeContainer.appendChild(particle);

    let position = -10;
    const interval = setInterval(() => {
        position += 1;
        particle.style.top = position + 'px';
        if (position > homeContainer.clientHeight) {
            clearInterval(interval);
            homeContainer.removeChild(particle);
        }
    }, 20);
}

function createFirework(x, y, color) {
    return {
        x: x,
        y: y,
        color: color,
        radius: Math.random() * 3 + 1,
        velocity: {
            x: Math.random() * 6 - 3,
            y: Math.random() * 6 - 3
        },
        alpha: 1
    };
}

function drawFireworks() {
    console.log("Drawing fireworks");
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((fw, index) => {
        ctx.beginPath();
        ctx.arc(fw.x, fw.y, fw.radius, 0, Math.PI * 2);
        ctx.fillStyle = fw.color;
        ctx.globalAlpha = fw.alpha;
        ctx.fill();

        fw.x += fw.velocity.x;
        fw.y += fw.velocity.y;
        fw.velocity.y += 0.05;
        fw.alpha -= 0.01;

        if (fw.alpha <= 0) {
            fireworks.splice(index, 1);
        }
    });

    textParticles.forEach((particle) => {
        ctx.fillStyle = particle.color;
        ctx.fillRect(particle.x, particle.y, 2, 2); // 增大粒子尺寸
    });

    requestAnimationFrame(drawFireworks);
}

function launchFireworks() {
    console.log("Launching fireworks");
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
    let fireworksLaunched = 0;

    function launchSingleFirework() {
        if (fireworksLaunched < 25) {
            const x = Math.random() * (window.innerWidth / 2);
            const y = window.innerHeight;
            const color = colors[Math.floor(Math.random() * colors.length)];

            for (let j = 0; j < 50; j++) {
                fireworks.push(createFirework(x, y, color));
            }

            fireworksLaunched++;
            setTimeout(launchSingleFirework, 200);
        } else {
            setTimeout(createTextParticles, 2500); // 现在是2.5秒
        }
    }

    launchSingleFirework();
    requestAnimationFrame(drawFireworks);
}

function createTextParticles() {
    console.log("Creating text particles");
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 使用更漂亮的字体
    ctx.font = 'bold 64px "华文行楷", "楷体", "宋体", sans-serif';

    // 创建渐变色
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "#FF69B4"); // 粉红色
    gradient.addColorStop(0.5, "#FFD700"); // 金色
    gradient.addColorStop(1, "#FF69B4"); // 粉红色

    ctx.fillStyle = gradient;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    // 在画布中央绘制文字
    ctx.fillText('李妍琪生日快乐', canvas.width / 2, canvas.height / 2);

    // 添加简单的阴影效果
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    textParticles = []; // 清空之前的文字粒子

    for (let y = 0; y < canvas.height; y += 2) { // 减小步长以增加粒子密度
        for (let x = 0; x < canvas.width; x += 2) {
            const i = (y * canvas.width + x) * 4;
            if (data[i + 3] > 128) {
                textParticles.push({
                    x: x,
                    y: y,
                    color: `rgb(${data[i]}, ${data[i + 1]}, ${data[i + 2]})`
                });
            }
        }
    }

    console.log(`Created ${textParticles.length} text particles`);
}

actionButton.addEventListener('click', () => {
    console.log("Button clicked, stage:", stage);
    stage++;
    switch (stage) {
        case 1:
            console.log("Stage 1");
            homeContainer.style.backgroundColor = '#FFF5E6';
            // lights.style.opacity = '1';
            actionButton.textContent = '添点什么吧';
            // particleInterval = setInterval(createParticle, 200);
            // birthdaySong.play();
            break;
        case 2:
            console.log("Stage 2");
            // table.style.opacity = '1';
            // table.style.transform = 'scale(1)';
            actionButton.textContent = '蛋糕？';
            break;
        case 3:
            console.log("Stage 3");
            // cake.style.opacity = '1';
            // cake.style.transform = 'scale(1)';
            actionButton.style.display = 'none';

            happy.style.display = 'block';
            plate.style.display = 'block';
            tp_cake.style.display = 'block';
            candle.style.display = 'block';
            // setTimeout(() => {
            //     console.log("Calling launchFireworks");
            //     launchFireworks();
            // }, 1000);
            break;
    }
});

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    if (pageId !== 'home') {
        birthdaySong.pause(); // 当切换到其他页面时暂停音乐
        birthdaySong.currentTime = 0; // 重置音乐播放位置
    }
}

// 留言板功能
const messageForm = document.getElementById('messageForm');
const messagesContainer = document.getElementById('messages');

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<strong>${name}:</strong> ${message}`;

    messagesContainer.prepend(messageElement);

    messageForm.reset();
});

// 添加窗口大小变化事件监听器
window.addEventListener('resize', () => {
    const canvas = document.getElementById('fireworks');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// 添加事件监听器到所有链接
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // 阻止默认的链接跳转

        const targetPage = this.getAttribute('href'); // 获取目标��面的链接

        // 添加闪烁效果
        document.body.classList.add('fade-out');

        // 等待动画结束后跳转
        setTimeout(() => {
            window.location.href = targetPage; // 跳转到目标页面
        }, 500); // 500毫秒与CSS动画持续时间一致
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // 为每个页面的内容添加淡入效果
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        const content = page.querySelector('.content'); // 获取每个页面的内容
        if (content) {
            content.classList.add('fade-in'); // 添加淡入类
        }
    });

    // 确保在这里添加事件监听器
    const messageForm = document.getElementById('messageForm');
    if (messageForm) {
        messageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const message = document.getElementById('message').value;

            const messageElement = document.createElement('div');
            messageElement.classList.add('message');
            messageElement.innerHTML = `<strong>${name}:</strong> ${message}`;

            const messagesContainer = document.getElementById('messages');
            messagesContainer.prepend(messageElement);

            messageForm.reset();
        });
    }
});