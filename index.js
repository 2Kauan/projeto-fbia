  
function irParaLogin() {
    const btn = document.getElementById("startBtn");

    btn.disabled = true;
    btn.style.cursor = "not-allowed";
    btn.classList.add("loading");
    btn.innerHTML = `<div class="loading-spinner"></div> Carregando...`;

  

    setTimeout(() => {
        window.location.href = "../../login.html";
    }, 1500);
}

// --- Rede Neural com partículas brilhantes ---
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");
let particlesArray;
let mouse = { x: null, y: null, radius: 100 };

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

class Particle {
    constructor(x, y, dirX, dirY, size, color) {
        this.x = x;
        this.y = y;
        this.dirX = dirX;
        this.dirY = dirY;
        this.size = size;
        this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) this.dirX *= -1;
        if (this.y > canvas.height || this.y < 0) this.dirY *= -1;
        this.x += this.dirX;
        this.y += this.dirY;

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < mouse.radius) {
            this.x -= dx / distance;
            this.y -= dy / distance;
        }
        this.draw();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.width * canvas.height) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 2 + 1;
        let x = Math.random() * (window.innerWidth - size * 2);
        let y = Math.random() * (window.innerHeight - size * 2);
        let dirX = (Math.random() - 0.5) * 0.7;
        let dirY = (Math.random() - 0.5) * 0.7;
        let color = Math.random() > 0.5 ? "rgba(86, 77, 255, 0.9)" : "rgba(51, 0, 255, 0.8)";
        particlesArray.push(new Particle(x, y, dirX, dirY, size, color));
    }
}

function connect() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) ** 2) +
                           ((particlesArray[a].y - particlesArray[b].y) ** 2);
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                let opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = `rgba(77,184,255,${opacityValue})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
    requestAnimationFrame(animate);
}

init();
animate();