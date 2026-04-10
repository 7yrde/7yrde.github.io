(function () {
  const HASH = 'ed946f65d2c785d90e827c5ffd879ce3b49c68d4c88013074176a7e73bc58bcf';
  const KEY  = '7yr_auth';

  if (sessionStorage.getItem(KEY) === '1') return;

  // Overlay styles
  const style = document.createElement('style');
  style.textContent = `
    #auth-overlay {
      position: fixed; inset: 0; z-index: 9999;
      background: #0a0c10;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      gap: 0;
      font-family: 'Noto Sans KR', 'JetBrains Mono', monospace;
    }
    #auth-overlay .auth-moon {
      width: 52px; height: 52px; border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, #fdf6e3, #e8d5a3 40%, #c8aa70 70%, #8a7040);
      box-shadow: 0 0 24px rgba(232,213,163,0.25), inset -6px -6px 14px rgba(100,80,30,0.4);
      margin-bottom: 28px;
      animation: auth-float 6s ease-in-out infinite;
    }
    @keyframes auth-float {
      0%,100% { transform: translateY(0); }
      50%      { transform: translateY(-8px); }
    }
    #auth-overlay .auth-title {
      font-size: 22px; font-weight: 700;
      color: #e8edf5; margin-bottom: 4px; letter-spacing: 1px;
    }
    #auth-overlay .auth-sub {
      font-size: 12px; color: #5a6478;
      letter-spacing: 3px; text-transform: uppercase;
      margin-bottom: 36px;
    }
    #auth-overlay .auth-box {
      display: flex; flex-direction: column; align-items: center; gap: 12px;
      width: 100%; max-width: 300px; padding: 0 24px;
    }
    #auth-overlay input {
      width: 100%;
      background: #111318; border: 1px solid #1e2330;
      color: #e8edf5; font-size: 18px; letter-spacing: 8px;
      text-align: center; padding: 14px 16px;
      border-radius: 8px; outline: none;
      font-family: 'JetBrains Mono', monospace;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    #auth-overlay input:focus {
      border-color: #4c7cff;
      box-shadow: 0 0 0 3px rgba(76,124,255,0.12);
    }
    #auth-overlay input.shake {
      animation: auth-shake 0.35s ease;
      border-color: #f87171 !important;
    }
    @keyframes auth-shake {
      0%,100% { transform: translateX(0); }
      20%      { transform: translateX(-8px); }
      40%      { transform: translateX(8px); }
      60%      { transform: translateX(-5px); }
      80%      { transform: translateX(5px); }
    }
    #auth-overlay button {
      width: 100%;
      background: #4c7cff; border: none;
      color: #fff; font-size: 13px; letter-spacing: 2px;
      text-transform: uppercase; padding: 13px;
      border-radius: 8px; cursor: pointer;
      font-family: 'JetBrains Mono', monospace;
      transition: background 0.2s, opacity 0.2s;
    }
    #auth-overlay button:hover { background: #3a6be0; }
    #auth-overlay .auth-err {
      font-size: 12px; color: #f87171;
      height: 16px; text-align: center;
      font-family: 'JetBrains Mono', monospace;
    }
  `;
  document.head.appendChild(style);

  // Overlay HTML
  const overlay = document.createElement('div');
  overlay.id = 'auth-overlay';
  overlay.innerHTML = `
    <div class="auth-moon"></div>
    <div class="auth-title">7년의 밤</div>
    <div class="auth-sub">비밀번호를 입력하세요</div>
    <div class="auth-box">
      <input type="password" id="auth-input" maxlength="20"
             autocomplete="current-password" placeholder="••••" autofocus />
      <div class="auth-err" id="auth-err"></div>
      <button id="auth-btn">입장</button>
    </div>
  `;
  document.body.prepend(overlay);

  async function sha256(str) {
    const buf = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(str)
    );
    return Array.from(new Uint8Array(buf))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  async function attempt() {
    const val = document.getElementById('auth-input').value;
    const hash = await sha256(val);
    if (hash === HASH) {
      sessionStorage.setItem(KEY, '1');
      overlay.style.transition = 'opacity 0.4s';
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), 400);
    } else {
      const input = document.getElementById('auth-input');
      const err   = document.getElementById('auth-err');
      input.classList.remove('shake');
      void input.offsetWidth; // reflow
      input.classList.add('shake');
      err.textContent = '비밀번호가 틀렸습니다';
      input.value = '';
      setTimeout(() => { err.textContent = ''; }, 2000);
    }
  }

  document.getElementById('auth-btn').addEventListener('click', attempt);
  document.getElementById('auth-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') attempt();
  });
})();
