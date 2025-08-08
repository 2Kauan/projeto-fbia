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
      // Cria conversa padrão se vazio
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

  // Renderiza a lista de conversas no menu lateral
  function renderConversationList(){
    chatList.innerHTML = '';
    chatData.conversations.forEach(conv => {
      const div = document.createElement('div');
      div.className = 'chat-item';
      div.textContent = conv.name;
      div.dataset.id = conv.id;
      if(conv.id === currentConversationId){
        div.classList.add('active');
      }
      div.addEventListener('click', () => {
        selectConversation(conv.id);
        toggleSidebar();
      });
      chatList.appendChild(div);
    });
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

  // Função simulada de resposta do bot
  function botReply(userText) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("Assistente: Você disse -> " + userText);
      }, 1000);
    });
  }

  // Inicializa app carregando dados e renderizando
  loadChatData();
  renderConversationList();
  selectConversation(currentConversationId);

  // Evento de envio de mensagem
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
