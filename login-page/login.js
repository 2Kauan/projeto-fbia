const totalDots = 37;
const trail = [];
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let mouseMoving = true;
let idleTimer = null;
let cursorInside = true;
const sound = document.getElementById ("energy-sound");

// cria trail
for (let i = 0; i < totalDots; i++) {
  const dot = document.createElement("div");
  dot.classList.add("trail-dot");
  document.body.appendChild(dot);
  trail.push({ el: dot, x: mouseX, y: mouseY, angle: 0 });
}

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (!mouseMoving) {
    mouseMoving = true;
    removeFloat();
  }
  resetIdle();
});

document.addEventListener("mouseleave", () => {
  cursorInside = false;
  triggerDisperse();
});

document.addEventListener("mouseenter", () => {
  cursorInside = true;
  mouseMoving = true;
  removeFloat();
});

function animateTrail() {
  let x = mouseX;
  let y = mouseY;

  for (let i = 0; i < trail.length; i++) {
    const dot = trail[i];
    if (mouseMoving) {
      dot.x += (x - dot.x) * 0.3;
      dot.y += (y - dot.y) * 0.3;

      const dx = x - dot.x;
      const dy = y - dot.y;
      dot.angle = Math.atan2(dy, dx) * 180 / Math.PI;

      dot.el.style.left = `${dot.x}px`;
      dot.el.style.top = `${dot.y}px`;
      dot.el.style.transform = `translate(-50%, -50%) rotate(${dot.angle}deg)`;
    }
    x = dot.x;
    y = dot.y;
  }

  requestAnimationFrame(animateTrail);
}
animateTrail();

function resetIdle() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    if (cursorInside) triggerDisperse();
  }, 500);
}

function triggerDisperse() {
  mouseMoving = false;
  for (let dot of trail) {
    const randX = Math.random() * window.innerWidth;
    const randY = Math.random() * window.innerHeight;

    dot.x = randX;
    dot.y = randY;
    dot.el.style.left = `${randX}px`;
    dot.el.style.top = `${randY}px`;
    dot.el.style.animation = `float ${2 + Math.random()}s ease-in-out infinite`;
  }

  explodeParticles(mouseX, mouseY, 30);
}

function removeFloat() {
  for (let dot of trail) {
    dot.el.style.animation = "";
  }
}

function explodeParticles(cx, cy, total) {
  for (let i = 0; i < total; i++) {
    const p = document.createElement("div");
    p.classList.add("particle");

    const size = Math.random() * 6 + 4;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${cx}px`;
    p.style.top = `${cy}px`;

    document.body.appendChild(p);
    setTimeout(() => p.remove(), 600);
  }

  sound.currentTime = 0;
  sound.play();
}