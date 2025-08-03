// Alternar entre login e cadastro
const loginContainer = document.getElementById("login-container");
const registerContainer = document.getElementById("register-container");
document.getElementById("go-register").addEventListener("click", (e) => {
    e.preventDefault();
    loginContainer.classList.add("hidden");
    registerContainer.classList.remove("hidden");
});
document.getElementById("go-login").addEventListener("click", (e) => {
    e.preventDefault();
    registerContainer.classList.add("hidden");
    loginContainer.classList.remove("hidden");
});

// Validação de senha no cadastro
const senhaInput = document.getElementById("senha");
const lowerCase = document.getElementById("lower");
const upperCase = document.getElementById("upper");
const number = document.getElementById("number");
const specialChar = document.getElementById("special");
const lengthRule = document.getElementById("length");

senhaInput.addEventListener("input", () => {
    const senha = senhaInput.value;

    // Verificar regras
    if (/[a-z]/.test(senha)) lowerCase.classList.add("valid"); else lowerCase.classList.remove("valid");
    if (/[A-Z]/.test(senha)) upperCase.classList.add("valid"); else upperCase.classList.remove("valid");
    if (/[0-9]/.test(senha)) number.classList.add("valid"); else number.classList.remove("valid");
    if (/[^A-Za-z0-9]/.test(senha)) specialChar.classList.add("valid"); else specialChar.classList.remove("valid");
    if (senha.length >= 8) lengthRule.classList.add("valid"); else lengthRule.classList.remove("valid");
});

// Validação e redirecionamento do login
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email-login").value.trim();
    const senha = document.getElementById("senha-login").value.trim();

    if (email === "" || senha === "") {
        alert("Por favor, preencha todos os campos de login.");
        return;
    }

  
      window.location.href = "../inicio-page/inicio.html";
   


});
