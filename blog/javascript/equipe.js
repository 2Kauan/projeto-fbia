const turbulence = document.getElementById("turbulence");

let animationFrame;
let freq = 0.05;

document.querySelectorAll(".image-container").forEach(container => {
  container.addEventListener("mousemove", () => {
    cancelAnimationFrame(animationFrame);
    animateWater();
  });

  container.addEventListener("mouseleave", () => {
    cancelAnimationFrame(animationFrame);
    turbulence.setAttribute("baseFrequency", 0.05);
  });

  function animateWater() {
    freq += 0.002;
    if (freq >= 0.1) freq = 0.05;
    turbulence.setAttribute("baseFrequency", freq);
    animationFrame = requestAnimationFrame(animateWater);
  }
});