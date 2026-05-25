/* ═══════════════════════════════════════════════════════════════
   Release Banner — auto-expiring announcement of latest version
   ═══════════════════════════════════════════════════════════════
   Como atualizar:
   1. Mude `version`, `link`, `expires` no objeto RELEASE abaixo
   2. Salve. Os usuários verão o banner até a data `expires`
   3. Após `expires`, o banner não renderiza mais (zero manutenção)
   4. Pra trocar antes do prazo: edite `expires` ou remova esse arquivo

   Como dispensar (do lado do usuário):
   - Click no × → salva flag por versão no localStorage
   - Próxima visita: banner não aparece (mesmo dentro do prazo)
*/
(function() {
  const RELEASE = {
    version: 'v3.1.1',
    link: 'release-notes.html',
    expires: '2026-06-24',  // 30 dias após lançamento (25/05/2026)
    messagePT: 'Novidades da v3.1.1 — alertas em OBs históricos',
    messageEN: 'What\'s new in v3.1.1 — historical OB alerts'
  };

  // Auto-expira (zero manutenção)
  if (new Date() >= new Date(RELEASE.expires + 'T23:59:59')) return;

  // Já dispensado pelo usuário
  const dismissKey = 'smc-release-dismissed-' + RELEASE.version;
  if (localStorage.getItem(dismissKey)) return;

  // Espera o body existir
  function inject() {
    if (!document.body) { setTimeout(inject, 50); return; }

    const lang = (localStorage.getItem('smc-lang') === 'en') ? 'en' : 'pt';
    const msg = (lang === 'en') ? RELEASE.messageEN : RELEASE.messagePT;

    const banner = document.createElement('div');
    banner.id = 'smc-release-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Release announcement');
    banner.style.cssText = [
      'position:fixed',
      'bottom:20px',
      'left:20px',
      'z-index:200',
      'max-width:340px',
      'background:linear-gradient(135deg, #12121e, #181828)',
      'border:1px solid #00cc6a',
      'border-radius:12px',
      'box-shadow:0 8px 32px rgba(0,255,136,0.18), 0 2px 8px rgba(0,0,0,0.4)',
      'padding:14px 16px',
      'font-family:DM Sans, sans-serif',
      'color:#e8e8f0',
      'display:flex',
      'flex-direction:column',
      'gap:8px',
      'animation:smcReleaseSlide 0.45s ease-out',
      'opacity:1',
      'transition:opacity 0.3s, transform 0.3s'
    ].join(';');

    banner.innerHTML = `
      <style>
        @keyframes smcReleaseSlide {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        #smc-release-banner .smc-rb-version {
          display:inline-block;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #00ff88;
          background: rgba(0,255,136,0.12);
          border: 1px solid #00cc6a;
          padding: 3px 9px;
          border-radius: 12px;
          font-weight: 700;
        }
        #smc-release-banner .smc-rb-msg {
          font-size: 14px;
          color: #e8e8f0;
          line-height: 1.4;
        }
        #smc-release-banner .smc-rb-link {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          color: #00ff88;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 0;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
          font-weight: 600;
        }
        #smc-release-banner .smc-rb-link:hover {
          border-bottom-color: #00ff88;
        }
        #smc-release-banner .smc-rb-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        #smc-release-banner .smc-rb-close {
          background: transparent;
          border: none;
          color: #8888a0;
          font-size: 18px;
          line-height: 1;
          cursor: pointer;
          padding: 2px 6px;
          border-radius: 4px;
          transition: color 0.2s, background 0.2s;
          flex-shrink: 0;
        }
        #smc-release-banner .smc-rb-close:hover {
          color: #e8e8f0;
          background: rgba(255,255,255,0.05);
        }
        @media (max-width: 600px) {
          #smc-release-banner {
            bottom: 80px !important;
            left: 12px !important;
            right: 12px !important;
            max-width: none !important;
          }
        }
      </style>
      <div class="smc-rb-top">
        <span class="smc-rb-version">${RELEASE.version}</span>
        <button class="smc-rb-close" aria-label="Fechar" title="Fechar">×</button>
      </div>
      <span class="smc-rb-msg">${msg}</span>
      <a class="smc-rb-link" href="${RELEASE.link}" target="_blank" rel="noopener">
        ${lang === 'en' ? 'Read more' : 'Ler mais'} &rarr;
      </a>
    `;

    document.body.appendChild(banner);

    // Dismiss handler
    banner.querySelector('.smc-rb-close').addEventListener('click', function() {
      banner.style.opacity = '0';
      banner.style.transform = 'translateY(20px)';
      setTimeout(function() {
        banner.remove();
        localStorage.setItem(dismissKey, '1');
      }, 300);
    });

    // Re-render se idioma mudar (mesma sessão)
    window.addEventListener('storage', function(e) {
      if (e.key === 'smc-lang') {
        const newLang = (e.newValue === 'en') ? 'en' : 'pt';
        const newMsg = (newLang === 'en') ? RELEASE.messageEN : RELEASE.messagePT;
        const linkText = newLang === 'en' ? 'Read more' : 'Ler mais';
        const msgEl = banner.querySelector('.smc-rb-msg');
        const linkEl = banner.querySelector('.smc-rb-link');
        if (msgEl) msgEl.textContent = newMsg;
        if (linkEl) linkEl.innerHTML = linkText + ' &rarr;';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
