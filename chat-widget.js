/**
 * SMC Engine AI Assistant — Chat Widget
 * Add to any page: <script src="chat-widget.js"></script>
 */
(function () {
  const WORKER_URL = 'https://smc-engine-chat.abdallacrypto.workers.dev';
  const MAX_HISTORY = 6;

  // Detect language
  const lang = (localStorage.getItem('lt_lang') || localStorage.getItem('lang') || 'pt');

  const t = {
    pt: {
      title: 'Engine AI',
      subtitle: 'Tire suas duvidas sobre o indicador',
      placeholder: 'Digite sua pergunta...',
      send: 'Enviar',
      thinking: 'Pensando...',
      error: 'Erro ao responder. Tente novamente.',
      greeting: 'Oi! Sou o assistente do SMC Engine PRO. Pode me perguntar sobre perfis, alertas, configuracao, Order Blocks, Fibonacci... como posso ajudar?',
    },
    en: {
      title: 'Engine AI',
      subtitle: 'Ask anything about the indicator',
      placeholder: 'Type your question...',
      send: 'Send',
      thinking: 'Thinking...',
      error: 'Error responding. Try again.',
      greeting: 'Hi! I\'m the SMC Engine PRO assistant. Ask me about profiles, alerts, setup, Order Blocks, Fibonacci... how can I help?',
    },
  };
  const L = t[lang] || t.pt;

  // Inject CSS
  const style = document.createElement('style');
  style.textContent = `
    #smc-chat-btn{position:fixed;bottom:24px;right:24px;width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#a78bfa,#8b5cf6);border:none;cursor:pointer;box-shadow:0 4px 20px rgba(139,92,246,.4);z-index:99999;display:flex;align-items:center;justify-content:center;transition:transform .2s}
    #smc-chat-btn:hover{transform:scale(1.1)}
    #smc-chat-btn svg{width:28px;height:28px;fill:#fff}
    #smc-chat-box{position:fixed;bottom:92px;right:24px;width:380px;max-width:calc(100vw - 32px);height:520px;max-height:calc(100vh - 120px);background:#0f0f1a;border:1px solid #1e1e3a;border-radius:16px;box-shadow:0 8px 40px rgba(0,0,0,.6);z-index:99999;display:none;flex-direction:column;font-family:'IBM Plex Mono',monospace;overflow:hidden}
    #smc-chat-box.open{display:flex}
    .smc-chat-hdr{padding:16px;background:#16162a;border-bottom:1px solid #1e1e3a;display:flex;justify-content:space-between;align-items:center}
    .smc-chat-hdr h3{margin:0;font-size:15px;color:#a78bfa;font-weight:700}
    .smc-chat-hdr span{font-size:12px;color:#666;display:block;margin-top:2px}
    .smc-chat-close{background:none;border:none;color:#666;font-size:20px;cursor:pointer;padding:4px 8px}
    .smc-chat-close:hover{color:#fff}
    .smc-chat-msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px}
    .smc-chat-msgs::-webkit-scrollbar{width:4px}
    .smc-chat-msgs::-webkit-scrollbar-thumb{background:#333;border-radius:4px}
    .smc-msg{max-width:85%;padding:10px 14px;border-radius:12px;font-size:13px;line-height:1.6;word-wrap:break-word}
    .smc-msg.user{align-self:flex-end;background:#2a2a4a;color:#e8e8f0}
    .smc-msg.ai{align-self:flex-start;background:#1a1a2e;color:#ccc;border:1px solid #1e1e3a}
    .smc-msg.ai strong{color:#a78bfa}
    .smc-msg.thinking{color:#666;font-style:italic}
    .smc-chat-input{display:flex;padding:12px;border-top:1px solid #1e1e3a;gap:8px}
    .smc-chat-input input{flex:1;background:#1a1a2e;border:1px solid #1e1e3a;border-radius:8px;padding:10px 12px;color:#e8e8f0;font-size:13px;font-family:inherit;outline:none}
    .smc-chat-input input:focus{border-color:#a78bfa}
    .smc-chat-input button{background:#a78bfa;color:#fff;border:none;border-radius:8px;padding:10px 16px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit}
    .smc-chat-input button:hover{background:#8b5cf6}
    .smc-chat-input button:disabled{opacity:.5;cursor:not-allowed}
    @media(max-width:480px){#smc-chat-box{bottom:0;right:0;width:100vw;max-width:100vw;height:100vh;max-height:100vh;border-radius:0}}
  `;
  document.head.appendChild(style);

  // Chat button
  const btn = document.createElement('button');
  btn.id = 'smc-chat-btn';
  btn.title = L.title;
  btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>';
  document.body.appendChild(btn);

  // Chat box
  const box = document.createElement('div');
  box.id = 'smc-chat-box';
  box.innerHTML = `
    <div class="smc-chat-hdr">
      <div><h3>${L.title}</h3><span>${L.subtitle}</span></div>
      <button class="smc-chat-close">&times;</button>
    </div>
    <div class="smc-chat-msgs" id="smc-msgs"></div>
    <div class="smc-chat-input">
      <input type="text" id="smc-input" placeholder="${L.placeholder}" autocomplete="off">
      <button id="smc-send">${L.send}</button>
    </div>
  `;
  document.body.appendChild(box);

  const msgs = document.getElementById('smc-msgs');
  const input = document.getElementById('smc-input');
  const sendBtn = document.getElementById('smc-send');
  const closeBtn = box.querySelector('.smc-chat-close');

  let history = [];
  let open = false;

  function toggle() {
    open = !open;
    box.classList.toggle('open', open);
    if (open && msgs.children.length === 0) {
      addMsg('ai', L.greeting);
    }
    if (open) input.focus();
  }

  btn.onclick = toggle;
  closeBtn.onclick = toggle;

  function addMsg(role, text) {
    const div = document.createElement('div');
    div.className = 'smc-msg ' + (role === 'user' ? 'user' : 'ai');
    // Simple markdown: **bold**
    div.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    return div;
  }

  async function send() {
    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    addMsg('user', text);
    sendBtn.disabled = true;

    const thinkDiv = addMsg('ai', L.thinking);
    thinkDiv.classList.add('thinking');

    try {
      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });

      const data = await res.json();

      thinkDiv.remove();

      if (data.reply) {
        addMsg('ai', data.reply);
        history.push({ role: 'user', content: text });
        history.push({ role: 'assistant', content: data.reply });
        if (history.length > MAX_HISTORY * 2) {
          history = history.slice(-MAX_HISTORY * 2);
        }
      } else {
        addMsg('ai', L.error);
      }
    } catch (e) {
      thinkDiv.remove();
      addMsg('ai', L.error);
    }

    sendBtn.disabled = false;
    input.focus();
  }

  sendBtn.onclick = send;
  input.onkeydown = function (e) {
    if (e.key === 'Enter') send();
  };
})();
