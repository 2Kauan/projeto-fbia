const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

window.addEventListener("scroll", function () {
  const scrollY = window.scrollY;
  const section2 = document.getElementById("section2");

  if (scrollY >= window.innerHeight / 2) {
    document.body.style.background = section2.style.background;
  } else {
    document.body.style.background = document.getElementById("section1").style.background;
  }
});

// Define o background inicial
document.body.style.background = document.getElementById("section1").style.background;
