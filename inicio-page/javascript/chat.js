const STORAGE_KEY = 'chatData';

const btnMenu = document.getElementById('btnMenu');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const chatWindow = document.getElementById('chatWindow');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatList = document.getElementById('chatList');
const btnNewConversation = document.getElementById('btnNewConversation');

let chatData = {
  conversations: []
};
let currentConversationId = null;

// Gera ID simples
function generateId(){
  return 'conv_' + Math.random().toString(36).substr(2,9);
}

// Carrega do localStorage
function loadChatData(){
  const saved = localStorage.getItem(STORAGE_KEY);
  if(saved){
    chatData = JSON.parse(saved);
  } 
  if(!chatData.conversations.length){
    const newConv = {
      id: generateId(),
      name: "Nova conversa",
      messages: []
    };
    chatData.conversations.push(newConv);
  }
  currentConversationId = chatData.conversations[0].id;
}

// Salva no localStorage
function saveChatData(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chatData));
}

// Renderiza a lista de conversas no menu lateral com botão 3 pontos
function renderConversationList(){
  chatList.innerHTML = '';

  chatData.conversations.forEach(conv => {
    const div = document.createElement('div');
    div.className = 'chat-item';
    div.dataset.id = conv.id;
    div.style.position = 'relative';

    // Nome da conversa clicável
    const nomeDiv = document.createElement('div');
    nomeDiv.textContent = conv.name;
    nomeDiv.style.flexGrow = '1';
    nomeDiv.style.cursor = 'pointer';
    nomeDiv.style.display = 'inline-block';
    nomeDiv.style.paddingRight = '30px';

    nomeDiv.addEventListener('click', () => {
      selectConversation(conv.id);
      toggleSidebar();
      closeAllMenus();
    });

    // Botão três pontos
    const btnMais = document.createElement('div');
    btnMais.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';
    btnMais.style.position = 'absolute';
    btnMais.style.top = '12px';
    btnMais.style.right = '12px';
    btnMais.style.cursor = 'pointer';
    btnMais.style.color = 'rgba(255,255,255,0.6)';
    btnMais.style.fontSize = '18px';
    btnMais.style.userSelect = 'none';

    // Menu dropdown
    const menu = document.createElement('div');
    menu.style.position = 'absolute';
    menu.style.top = '36px';
    menu.style.right = '12px';
    menu.style.background = '#121212';
    menu.style.border = '1px solid rgba(255,255,255,0.1)';
    menu.style.borderRadius = '8px';
    menu.style.padding = '6px 0';
    menu.style.minWidth = '140px';
    menu.style.boxShadow = '0 2px 10px rgba(0,0,0,0.6)';
    menu.style.display = 'none';
    menu.style.zIndex = '100';

    // Botão apagar conversa
    const btnApagar = document.createElement('button');
    btnApagar.textContent = 'Apagar conversa';
    btnApagar.style.background = 'none';
    btnApagar.style.border = 'none';
    btnApagar.style.color = 'white';
    btnApagar.style.width = '100%';
    btnApagar.style.padding = '10px 20px';
    btnApagar.style.cursor = 'pointer';
    btnApagar.style.fontSize = '14px';
    btnApagar.style.textAlign = 'left';
    btnApagar.style.userSelect = 'none';
    btnApagar.style.transition = 'background 0.2s ease';

    btnApagar.addEventListener('mouseenter', () => {
      btnApagar.style.background = 'rgba(255,255,255,0.1)';
    });
    btnApagar.addEventListener('mouseleave', () => {
      btnApagar.style.background = 'none';
    });

    btnApagar.addEventListener('click', () => {
      if(confirm(`Deseja apagar a conversa "${conv.name}"?`)){
        apagarConversa(conv.id);
        closeAllMenus();
      }
    });

    menu.appendChild(btnApagar);

    btnMais.addEventListener('click', (e) => {
      e.stopPropagation();
      const aberto = menu.style.display === 'block';
      closeAllMenus();
      menu.style.display = aberto ? 'none' : 'block';
    });

    // Fecha todos menus
    function closeAllMenus(){
      document.querySelectorAll('.chat-item div[style*="position: absolute"]')
        .forEach(m => m.style.display = 'none');
    }

    // Fecha menus ao clicar fora
    document.addEventListener('click', closeAllMenus);

    div.appendChild(nomeDiv);
    div.appendChild(btnMais);
    div.appendChild(menu);

    if(conv.id === currentConversationId){
      div.classList.add('active');
    }

    chatList.appendChild(div);
  });
}

// Apaga conversa
function apagarConversa(id) {
  const index = chatData.conversations.findIndex(c => c.id === id);
  if(index !== -1){
    chatData.conversations.splice(index, 1);

    if(currentConversationId === id){
      if(chatData.conversations.length){
        currentConversationId = chatData.conversations[0].id;
      } else {
        createNewConversation();
        return;
      }
    }

    saveChatData();
    renderConversationList();
    selectConversation(currentConversationId);
  }
}

// Seleciona conversa atual e renderiza mensagens
function selectConversation(id){
  currentConversationId = id;
  renderConversationList();
  renderMessages();
}

// Renderiza mensagens da conversa atual
function renderMessages(){
  chatWindow.innerHTML = '';
  const conv = chatData.conversations.find(c => c.id === currentConversationId);
  if(!conv) return;

  conv.messages.forEach(msg => {
    const div = document.createElement('div');
    div.classList.add('message', msg.sender);
    div.textContent = msg.text;
    chatWindow.appendChild(div);
  });
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Adiciona mensagem na conversa atual, salva e atualiza chat
function addMessageToCurrent(sender, text){
  const conv = chatData.conversations.find(c => c.id === currentConversationId);
  if(!conv) return;
  conv.messages.push({sender, text});
  saveChatData();
  renderMessages();
}

// Cria nova conversa vazia e seleciona ela
function createNewConversation(){
  const newConv = {
    id: generateId(),
    name: `Conversa ${chatData.conversations.length + 1}`,
    messages: []
  };
  chatData.conversations.push(newConv);
  saveChatData();
  renderConversationList();
  selectConversation(newConv.id);
  toggleSidebar();
}

// Controla abrir/fechar sidebar
function toggleSidebar() {
  const isOpen = sidebar.classList.contains('open');
  if(isOpen){
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  } else {
    sidebar.classList.add('open');
    overlay.classList.add('active');
  }
}

btnMenu.addEventListener('click', () => {
  toggleSidebar();
});

overlay.addEventListener('click', () => {
  toggleSidebar();
});

window.addEventListener('keydown', e => {
  if(e.key === 'Escape' && sidebar.classList.contains('open')){
    toggleSidebar();
  }
});

btnNewConversation.addEventListener('click', () => {
  createNewConversation();
});

// Simula resposta do bot
function botReply(userText) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Assistente: Você disse -> " + userText);
    }, 1000);
  });
}

// Inicializa app
loadChatData();
renderConversationList();
selectConversation(currentConversationId);

// Envio de mensagem
chatForm.addEventListener('submit', async e => {
  e.preventDefault();
  const userText = chatInput.value.trim();
  if(!userText) return;

  addMessageToCurrent('user', userText);
  chatInput.value = '';
  chatInput.disabled = true;

  const reply = await botReply(userText);
  addMessageToCurrent('bot', reply);

  chatInput.disabled = false;
  chatInput.focus();
});

const btnVoltar = document.getElementById('btnVoltar');
btnVoltar.addEventListener('click', () => {
  window.history.back();
});
