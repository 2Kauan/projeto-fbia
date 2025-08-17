// AOS - Inicializa a biblioteca de animação de rolagem
window.addEventListener('load', () => {
    AOS.init({
        duration: 1000,
        once: true,
    });
});

// MENU HAMBÚRGUER
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Fecha o menu ao clicar em um link
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// ROLAGEM SUAVE (SMOOTH SCROLL)
document.querySelectorAll('a.smooth-scroll').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Ajuste o valor para a altura do seu header fixo
                behavior: 'smooth'
            });
        }
    });
});

// VALIDAÇÃO DO FORMULÁRIO DE CONTATO
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

contactForm.addEventListener('submit', (e) => {
    let isValid = true;

    // Validação do Nome
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'name-error');
        isValid = false;
    } else {
        hideError(nameInput, 'name-error');
    }

    // Validação do Email
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'email-error');
        isValid = false;
    } else {
        hideError(emailInput, 'email-error');
    }

    // Validação da Mensagem
    if (messageInput.value.trim() === '') {
        showError(messageInput, 'message-error');
        isValid = false;
    } else {
        hideError(messageInput, 'message-error');
    }

    if (!isValid) {
        e.preventDefault(); // Impede o envio do formulário se houver erros
    } else {
        // Se o formulário for válido, você pode enviar os dados para um backend
        // Por enquanto, apenas exibimos um alerta e resetamos o formulário
        alert('Mensagem enviada com sucesso! Obrigado pelo contato.');
        contactForm.reset();
        e.preventDefault();
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function showError(inputElement, errorElementId) {
    inputElement.classList.add('border-red-500');
    document.getElementById(errorElementId).classList.remove('hidden');
}

function hideError(inputElement, errorElementId) {
    inputElement.classList.remove('border-red-500');
    document.getElementById(errorElementId).classList.add('hidden');
}