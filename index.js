window.onload = () => {
  const descricao = document.getElementById("descricao");
  const botao = document.getElementById("btn-comecar");

  // Mostrar descrição após 3 segundos
  setTimeout(() => {
    descricao.classList.remove("oculto");
    descricao.classList.add("visivel");
  }, 3000);

  // Mostrar botão após 4 segundos
  setTimeout(() => {
    botao.classList.remove("oculto");
    botao.classList.add("visivel");
  }, 4000);

  // Redirecionar ao clicar no botão
  botao.addEventListener("click", () => {
    window.location.href = "login.html";
  });
};
