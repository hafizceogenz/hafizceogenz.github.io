/* =========================================================
   InapDesaJannah — main.js
   Tema, animasi, muzik latar, WhatsApp berkata kunci,
   tempahan, galeri & ulasan. Rekaan oleh ZARC Works@Home
   ========================================================= */
(function () {
  'use strict';
  const C = window.JANNAH || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------- Storan selamat ---------- */
  const store = {
    get(k, s) { try { return (s ? sessionStorage : localStorage).getItem(k); } catch (e) { return null; } },
    set(k, v, s) { try { (s ? sessionStorage : localStorage).setItem(k, v); } catch (e) { } }
  };

  /* ---------- Tarikh (Bahasa Melayu) ---------- */
  const BULAN = ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogo', 'Sep', 'Okt', 'Nov', 'Dis'];
  const HARI = ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'];
  function parseDate(v) { if (!v) return null; const [y, m, d] = v.split('-').map(Number); return new Date(y, m - 1, d); }
  function fmtDate(v) { const d = parseDate(v); return d ? `${HARI[d.getDay()]}, ${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()}` : '-'; }
  function nights(a, b) { const x = parseDate(a), y = parseDate(b); if (!x || !y) return 0; return Math.round((y - x) / 86400000); }
  function isoToday(add = 0) { const d = new Date(); d.setDate(d.getDate() + add); return d.toISOString().slice(0, 10); }

  /* ---------- WhatsApp berkata kunci ---------- */
  function refNo() {
    const d = new Date();
    const p = n => String(n).padStart(2, '0');
    return `JNH-${String(d.getFullYear()).slice(2)}${p(d.getMonth() + 1)}${p(d.getDate())}-${Math.floor(1000 + Math.random() * 9000)}`;
  }
  function buildMsg(kodKey, tajuk, rows, nota) {
    const kod = (C.kod && C.kod[kodKey]) || '#JNH';
    const L = [
      'Assalamualaikum Haziq 👋',
      `Saya berminat dengan ${C.nama || 'InapDesaJannah'} (dari laman web).`,
      '',
      `🔑 Kod: ${kod}`,
      `🧾 Rujukan: ${refNo()}`
    ];
    if (tajuk) L.push('', `*${tajuk}*`);
    (rows || []).forEach(([k, v]) => { if (v) L.push(`${k}: ${v}`); });
    if (nota) L.push('', nota);
    L.push('', 'Terima kasih! 🌿');
    return L.join('\n');
  }
  function waLink(msg) { return `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(msg)}`; }
  function openWA(msg) { window.open(waLink(msg), '_blank', 'noopener'); }

  const PRESET = {
    harga: ['Pertanyaan Harga', [], 'Boleh saya tahu kadar sewaan semalam dan jika ada pakej untuk tempoh lebih lama?'],
    lawat: ['Mohon Lihat Unit', [], 'Saya ingin melihat unit / dapatkan video unit sebelum membuat tempahan.'],
    konvo: ['Tempahan Konvokesyen / Ibu Bapa Pelajar', [], 'Saya datang untuk urusan UNITEN / IUKL (konvokesyen / hantar anak). Boleh semak kekosongan?'],
    bulanan: ['Sewa Jangka Panjang', [], 'Saya berminat dengan sewaan bulanan / jangka panjang. Boleh kongsi maklumat?'],
    soalan: ['Soalan Umum', [], 'Saya ada beberapa soalan tentang homestay ini.'],
    ulasan: ['Ulasan Tetamu', [], 'Saya pernah menginap dan ingin berkongsi ulasan pengalaman saya.'],
    tempah: ['Semak Kekosongan', [], 'Saya ingin menyemak kekosongan untuk tarikh pilihan saya.']
  };
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-wa]');
    if (!el) return;
    e.preventDefault();
    const p = PRESET[el.dataset.wa] || PRESET.soalan;
    openWA(buildMsg(el.dataset.wa, p[0], p[1], p[2]));
    toast(`Membuka WhatsApp · kod <b>${(C.kod && C.kod[el.dataset.wa]) || '#JNH'}</b>`, '💬');
  });

  window.JNH = { buildMsg, waLink, openWA, fmtDate, nights, isoToday, store, toast };

  /* ---------- Dynamic Island ---------- */
  const Island = (function () {
    const el = $('#island');
    if (!el) return null;
    const L = { compact: $('.i-compact', el), alert: $('.i-alert', el), expanded: $('.i-expanded', el) };
    const scrim = document.createElement('div'); scrim.className = 'island-scrim'; document.body.appendChild(scrim);
    let base = 'compact', timer = null;
    function size(state) {
      const layer = L[state];
      el.style.width = layer.offsetWidth + 'px';
      el.style.height = layer.offsetHeight + 'px';
    }
    function set(state) {
      el.dataset.state = state; size(state);
      const open = state === 'expanded';
      L.compact.setAttribute('aria-expanded', open);
      scrim.classList.toggle('on', open);
    }
    function open() { base = 'expanded'; clearTimeout(timer); set('expanded'); }
    function close() { base = 'compact'; set('compact'); }
    function alert(text, ico, ms = 2800) {
      const m = String(text).match(/^(\p{Extended_Pictographic}️?)\s*/u);
      $('.i-ico', el).textContent = ico || (m ? m[1] : '✨');
      $('.i-txt', el).innerHTML = m && !ico ? String(text).slice(m[0].length) : text;
      clearTimeout(timer); set('alert');
      timer = setTimeout(() => set(base), ms);
    }
    L.compact.addEventListener('click', open);
    $('.i-close', el).addEventListener('click', close);
    scrim.addEventListener('click', close);
    $$('.i-tile, [data-open-chat], .i-act.wa', el).forEach(a => a.addEventListener('click', () => setTimeout(close, 80)));
    addEventListener('keydown', e => { if (e.key === 'Escape' && el.dataset.state === 'expanded') close(); });
    addEventListener('resize', () => size(el.dataset.state));

    // Ticker maklumat langsung
    const tick = $('.i-ticker', el);
    const facts = ['4 bilik · 4 bilik air', '~5 min ke UNITEN', 'Seluruh unit untuk anda', 'Kolam · Gim · Surau', 'Tempah via WhatsApp'];
    let fi = 0;
    function nextFact() {
      if (el.dataset.state !== 'compact') return;
      tick.classList.add('fade');
      setTimeout(() => { tick.textContent = facts[fi++ % facts.length]; tick.classList.remove('fade'); size('compact'); }, 300);
    }
    if (matchMedia('(min-width: 641px)').matches) { nextFact(); setInterval(nextFact, 4200); }

    // Bar kemajuan skrol
    const bar = $('.i-progress i', el);
    addEventListener('scroll', () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + '%';
    }, { passive: true });

    requestAnimationFrame(() => size('compact'));
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => size(el.dataset.state));
    return { open, close, alert, el, size };
  })();

  function toast(t, ico) {
    if (Island) { Island.alert(t, ico); return; }
  }

  /* ---------- Tema gelap / terang ---------- */
  const root = document.documentElement;
  const saved = store.get('jnh-theme');
  const prefersDark = window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches;
  root.setAttribute('data-theme', saved || (prefersDark ? 'dark' : 'light'));
  $$('.theme-toggle').forEach(b => b.addEventListener('click', () => {
    const t = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', t); store.set('jnh-theme', t);
    toast(t === 'dark' ? '🌙 Mod gelap diaktifkan' : '☀️ Mod terang diaktifkan');
  }));

  /* ---------- Intro animasi ---------- */
  const intro = $('#intro');
  if (intro) {
    const seen = store.get('jnh-intro', true);
    const done = () => { intro.classList.add('is-done'); document.body.classList.remove('no-scroll'); setTimeout(() => intro.remove(), 1200); };
    if (seen) { intro.remove(); }
    else {
      document.body.classList.add('no-scroll');
      store.set('jnh-intro', '1', true);
      const t = setTimeout(done, 2900);
      $('.intro-skip', intro).addEventListener('click', () => { clearTimeout(t); done(); });
    }
  }

  /* ---------- Navbar ---------- */
  const nav = $('.nav');
  const onScroll = () => nav && nav.classList.toggle('is-scrolled', scrollY > 40);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const menu = $('.mobile-menu');
  if (menu) {
    $$('.burger').forEach(b => b.addEventListener('click', () => { menu.classList.add('open'); document.body.classList.add('no-scroll'); }));
    $$('.m-close, .mobile-menu a').forEach(b => b.addEventListener('click', () => { menu.classList.remove('open'); document.body.classList.remove('no-scroll'); }));
  }

  /* ---------- Reveal ---------- */
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { threshold: .14, rootMargin: '0px 0px -40px 0px' }) : null;
  $$('.reveal, .img-reveal').forEach(el => io ? io.observe(el) : el.classList.add('in'));

  /* ---------- Kaunter nombor ---------- */
  const cio = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target, to = +el.dataset.count; let n = 0; const step = Math.max(1, Math.ceil(to / 30));
    const tick = () => { n = Math.min(to, n + step); el.textContent = n; if (n < to) requestAnimationFrame(tick); };
    tick(); cio.unobserve(el);
  }), { threshold: .6 }) : null;
  $$('[data-count]').forEach(el => cio && cio.observe(el));

  /* ---------- Hero rotator ---------- */
  $$('.rotator').forEach(r => {
    const s = $$('span', r); if (!s.length) return; let i = 0; s[0].classList.add('on');
    setInterval(() => {
      s[i].classList.remove('on'); s[i].classList.add('out');
      const prev = s[i]; setTimeout(() => prev.classList.remove('out'), 800);
      i = (i + 1) % s.length; s[i].classList.add('on');
    }, 2600);
  });

  /* ---------- Gambar gagal dimuat → latar gradien ---------- */
  document.addEventListener('error', e => {
    const img = e.target;
    if (img.tagName !== 'IMG' || img.dataset.failed) return;
    img.dataset.failed = '1';
    const p = img.parentElement; if (!p) return;
    p.classList.add('img-fallback'); p.setAttribute('data-fallback', img.alt || 'InapDesaJannah');
  }, true);

  /* ---------- Cahaya kursor ---------- */
  if (matchMedia('(pointer:fine)').matches) {
    const g = document.createElement('div'); g.className = 'cursor-glow'; document.body.appendChild(g);
    addEventListener('pointermove', e => { g.style.left = e.clientX + 'px'; g.style.top = e.clientY + 'px'; g.style.opacity = 1; }, { passive: true });
  }

  /* ---------- Tarikh minimum ---------- */
  $$('input[type=date]').forEach(i => { i.min = isoToday(); });

  /* ---------- Tempahan pantas (hero) ---------- */
  const qb = $('#quickBook');
  if (qb) {
    const ci = $('#qbIn', qb), co = $('#qbOut', qb);
    ci.value = isoToday(7); co.value = isoToday(9);
    ci.addEventListener('change', () => { co.min = ci.value; if (co.value <= ci.value) { const d = parseDate(ci.value); d.setDate(d.getDate() + 1); co.value = d.toISOString().slice(0, 10); } });
    qb.addEventListener('submit', e => {
      e.preventDefault();
      const n = nights(ci.value, co.value);
      if (n < 1) { toast('Tarikh check-out mesti selepas check-in'); return; }
      toast('Membuka WhatsApp · kod <b>#JNH-TEMPAH</b>', '💬');
      openWA(buildMsg('tempah', 'Semak Kekosongan', [
        ['📅 Check-in', fmtDate(ci.value)], ['📅 Check-out', fmtDate(co.value)],
        ['🌙 Tempoh', `${n} malam`], ['👥 Tetamu', $('#qbGuests', qb).value]
      ], 'Mohon sahkan kekosongan & kadar. Terima kasih.'));
    });
  }

  /* ---------- Borang tempahan penuh ---------- */
  const bf = $('#bookForm');
  if (bf) {
    const f = id => $('#' + id, bf);
    const ci = f('bIn'), co = f('bOut');
    ci.value = isoToday(7); co.value = isoToday(9);
    const money = n => 'RM ' + n.toLocaleString('ms-MY');
    function data() {
      const purpose = ($('input[name=tujuan]:checked', bf) || {}).value || '';
      return {
        nama: f('bName').value.trim(), tel: f('bPhone').value.trim(), in: ci.value, out: co.value,
        n: nights(ci.value, co.value), tetamu: f('bGuests').value, jenis: f('bType').value,
        tujuan: purpose, nota: f('bNote').value.trim()
      };
    }
    function msg(d) {
      return buildMsg('tempah', 'Permohonan Tempahan', [
        ['👤 Nama', d.nama], ['📞 Telefon', d.tel],
        ['📅 Check-in', fmtDate(d.in)], ['📅 Check-out', fmtDate(d.out)],
        ['🌙 Tempoh', d.n > 0 ? `${d.n} malam` : ''], ['👥 Bilangan tetamu', d.tetamu],
        ['🏠 Jenis sewaan', d.jenis], ['🎯 Tujuan', d.tujuan],
        ['💰 Anggaran', C.hargaSemalam && d.n > 0 ? `${money(C.hargaSemalam * d.n)} (${d.n} × ${money(C.hargaSemalam)})` : '']
      ], d.nota ? `📝 Nota: ${d.nota}` : 'Mohon sahkan kekosongan & langkah seterusnya.');
    }
    function update() {
      if (co.value <= ci.value) { const d = parseDate(ci.value); if (d) { d.setDate(d.getDate() + 1); co.value = d.toISOString().slice(0, 10); } }
      co.min = ci.value;
      const d = data();
      $('#sIn').textContent = fmtDate(d.in);
      $('#sOut').textContent = fmtDate(d.out);
      $('#sNights').textContent = d.n > 0 ? `${d.n} malam` : '-';
      $('#sGuests').textContent = d.tetamu ? `${d.tetamu} orang` : '-';
      $('#sPurpose').textContent = d.tujuan || '-';
      $('#sTotal').textContent = C.hargaSemalam && d.n > 0 ? money(C.hargaSemalam * d.n) : 'Melalui WhatsApp';
      $('#sRate').textContent = C.hargaSemalam ? `${money(C.hargaSemalam)} / malam · seluruh unit` : 'Kadar terkini disahkan oleh Haziq';
      $('#waPreview').textContent = msg(d);
    }
    bf.addEventListener('input', update); bf.addEventListener('change', update); update();
    bf.addEventListener('submit', e => {
      e.preventDefault();
      const d = data(), err = $('#formError');
      if (!d.nama) { err.textContent = 'Sila isi nama anda.'; f('bName').focus(); return; }
      if (d.n < 1) { err.textContent = 'Tarikh check-out mesti sekurang-kurangnya 1 malam selepas check-in.'; return; }
      err.textContent = '';
      openWA(msg(d)); toast('Tempahan dihantar ke WhatsApp · kod <b>#JNH-TEMPAH</b>', '✅');
    });
  }

  /* ---------- Tab bilik ---------- */
  $$('.room-btn').forEach(b => b.addEventListener('click', () => {
    $$('.room-btn').forEach(x => x.classList.toggle('active', x === b));
    $$('.room-panel').forEach(p => p.classList.toggle('active', p.id === b.dataset.room));
  }));

  /* ---------- Toggle kemudahan ---------- */
  $$('.amen-toggle button').forEach(b => b.addEventListener('click', () => {
    $$('.amen-toggle button').forEach(x => x.classList.toggle('active', x === b));
    $$('.amen-grid').forEach(g => g.hidden = g.id !== b.dataset.target);
  }));

  /* ---------- Persona ---------- */
  $$('.persona-tabs button').forEach(b => b.addEventListener('click', () => {
    $$('.persona-tabs button').forEach(x => x.classList.toggle('active', x === b));
    $$('.persona').forEach(p => p.classList.toggle('active', p.id === b.dataset.p));
  }));

  /* ---------- Penapis galeri ---------- */
  $$('.filters button').forEach(b => b.addEventListener('click', () => {
    $$('.filters button').forEach(x => x.classList.toggle('active', x === b));
    const f = b.dataset.filter;
    $$('.m-item').forEach(it => it.classList.toggle('hide', f !== 'all' && it.dataset.cat !== f));
  }));

  /* ---------- Lightbox ---------- */
  const lb = $('#lightbox');
  if (lb) {
    const img = $('img', lb), cap = $('.lb-cap', lb);
    let list = [], idx = 0;
    const show = i => { idx = (i + list.length) % list.length; const el = list[idx]; img.src = el.dataset.full || el.src; img.alt = el.alt; cap.textContent = el.alt; };
    document.addEventListener('click', e => {
      const t = e.target.closest('[data-lb]');
      if (!t) return;
      const im = t.tagName === 'IMG' ? t : $('img', t);
      list = $$('[data-lb]').filter(x => !x.closest('.hide')).map(x => x.tagName === 'IMG' ? x : $('img', x));
      lb.classList.add('open'); document.body.classList.add('no-scroll'); show(list.indexOf(im));
    });
    const close = () => { lb.classList.remove('open'); document.body.classList.remove('no-scroll'); };
    $('.lb-close', lb).addEventListener('click', close);
    $('.lb-prev', lb).addEventListener('click', () => show(idx - 1));
    $('.lb-next', lb).addEventListener('click', () => show(idx + 1));
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    addEventListener('keydown', e => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') show(idx + 1); if (e.key === 'ArrowLeft') show(idx - 1);
    });
    let sx = 0;
    lb.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1)); });
  }

  /* ---------- Ulasan ---------- */
  const star = on => `<svg viewBox="0 0 24 24" fill="currentColor" class="${on ? '' : 'off'}"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>`;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const rv = $('#reviewsTrack');
  if (rv) {
    const real = (C.ulasan || []).length > 0;
    const items = real ? C.ulasan : [
      { nama: 'Nama Tetamu', sumber: 'Platform', bintang: 5, tarikh: '—', teks: '[Contoh ulasan] Ruang di sini dikhaskan untuk ulasan tetamu sebenar anda — contohnya tentang kebersihan unit dan bilik air dalam setiap bilik.' },
      { nama: 'Nama Tetamu', sumber: 'Platform', bintang: 5, tarikh: '—', teks: '[Contoh ulasan] Salin ulasan sebenar dari Google, Booking.com atau Airbnb ke dalam fail config.js.' },
      { nama: 'Nama Tetamu', sumber: 'Platform', bintang: 5, tarikh: '—', teks: '[Contoh ulasan] Label "Contoh" akan hilang secara automatik sebaik sahaja ulasan sebenar dimasukkan.' }
    ];
    rv.innerHTML = items.map((r, i) => `
      <article class="review reveal ${i % 3 ? 'reveal-d' + (i % 3) : ''}">
        ${real ? '' : '<span class="sample-tag">Contoh</span>'}
        <div class="stars">${[1, 2, 3, 4, 5].map(n => star(n <= r.bintang)).join('')}</div>
        <blockquote>${esc(r.teks)}</blockquote>
        <div class="who"><div class="avatar">${esc(r.nama.charAt(0))}</div>
          <div><strong>${esc(r.nama)}</strong><small>${esc(r.sumber)} · ${esc(r.tarikh)}</small></div></div>
      </article>`).join('');
    $$('.reveal', rv).forEach(el => io ? io.observe(el) : el.classList.add('in'));
  }
  const pf = $('#platforms');
  if (pf) {
    const P = [['google', 'Google'], ['booking', 'Booking.com'], ['airbnb', 'Airbnb']];
    pf.innerHTML = P.map(([k, n]) => {
      const r = (C.rating || {})[k];
      const inner = `<div><div class="pname">${n}</div><div class="stars" style="margin-top:6px">${[1, 2, 3, 4, 5].map(i => star(r ? i <= Math.round(r.skor) : false)).join('')}</div></div>
        <div class="pscore">${r ? `${r.skor}<small>${r.jumlah} ulasan</small>` : 'Akan datang'}</div>`;
      return r && r.url ? `<a class="platform" href="${esc(r.url)}" target="_blank" rel="noopener">${inner}</a>` : `<div class="platform ${r ? '' : 'pending'}">${inner}</div>`;
    }).join('');
  }

  /* ---------- Muzik latar (dijana secara langsung, tanpa fail audio) ---------- */
  const Music = {
    ctx: null, master: null, wet: null, timer: null, playing: false, step: 0,
    chords: [
      [146.83, 220.00, 293.66, 369.99, 440.00],
      [123.47, 185.00, 246.94, 293.66, 369.99],
      [98.00, 146.83, 196.00, 246.94, 293.66],
      [110.00, 164.81, 220.00, 277.18, 329.63]
    ],
    bells: [587.33, 659.25, 739.99, 880.00, 987.77, 1174.66, 1318.51],
    init() {
      const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return false;
      const c = this.ctx = new AC();
      this.master = c.createGain(); this.master.gain.value = 0;
      const comp = c.createDynamicsCompressor();
      this.master.connect(comp); comp.connect(c.destination);
      const rev = c.createConvolver(); rev.buffer = this.impulse(5, 2.6);
      this.wet = c.createGain(); this.wet.gain.value = .75; rev.connect(this.wet); this.wet.connect(this.master);
      this.rev = rev;
      this.dry = c.createGain(); this.dry.gain.value = .45; this.dry.connect(this.master);
      // bayu lembut (hingar ditapis)
      const len = c.sampleRate * 4, nb = c.createBuffer(1, len, c.sampleRate), d = nb.getChannelData(0);
      let last = 0; for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; last = (last + .02 * w) / 1.02; d[i] = last * 3.5; }
      const ns = c.createBufferSource(); ns.buffer = nb; ns.loop = true;
      const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 420;
      const ng = c.createGain(); ng.gain.value = .05;
      const lfo = c.createOscillator(), lg = c.createGain(); lfo.frequency.value = .07; lg.gain.value = .03; lfo.connect(lg); lg.connect(ng.gain); lfo.start();
      ns.connect(lp); lp.connect(ng); ng.connect(this.master); ns.start();
      return true;
    },
    impulse(sec, decay) {
      const c = this.ctx, len = c.sampleRate * sec, b = c.createBuffer(2, len, c.sampleRate);
      for (let ch = 0; ch < 2; ch++) { const d = b.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay); }
      return b;
    },
    pad(freqs, t, dur) {
      const c = this.ctx;
      const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.setValueAtTime(700, t); lp.frequency.linearRampToValueAtTime(1300, t + dur / 2); lp.frequency.linearRampToValueAtTime(700, t + dur);
      const g = c.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.07, t + 3.5); g.gain.setValueAtTime(.07, t + dur - 4); g.gain.linearRampToValueAtTime(0, t + dur);
      lp.connect(g); g.connect(this.rev); g.connect(this.dry);
      freqs.forEach((f, i) => {
        ['sine', 'triangle'].forEach((type, j) => {
          const o = c.createOscillator(); o.type = type; o.frequency.value = f; o.detune.value = (j ? 7 : -5) + i;
          const og = c.createGain(); og.gain.value = (type === 'sine' ? .22 : .08) / (1 + i * .25);
          o.connect(og); og.connect(lp); o.start(t); o.stop(t + dur + .1);
        });
      });
    },
    bell(f, t) {
      const c = this.ctx, o = c.createOscillator(), o2 = c.createOscillator(), g = c.createGain();
      o.type = 'sine'; o.frequency.value = f; o2.type = 'sine'; o2.frequency.value = f * 2.01;
      const g2 = c.createGain(); g2.gain.value = .25;
      g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.05, t + .02); g.gain.exponentialRampToValueAtTime(.0001, t + 4);
      o.connect(g); o2.connect(g2); g2.connect(g); g.connect(this.rev);
      const gd = c.createGain(); gd.gain.value = .3; g.connect(gd); gd.connect(this.dry);
      o.start(t); o2.start(t); o.stop(t + 4.2); o2.stop(t + 4.2);
    },
    bar() {
      const t = this.ctx.currentTime + .05, ch = this.chords[this.step % this.chords.length];
      this.pad(ch, t, 11);
      const n = 1 + Math.floor(Math.random() * 3);
      for (let i = 0; i < n; i++) this.bell(this.bells[Math.floor(Math.random() * this.bells.length)], t + 1 + Math.random() * 6);
      this.step++;
    },
    start() {
      if (!this.ctx && !this.init()) { toast('Pelayar ini tidak menyokong audio'); return; }
      this.ctx.resume();
      const now = this.ctx.currentTime;
      this.master.gain.cancelScheduledValues(now); this.master.gain.setValueAtTime(this.master.gain.value, now);
      this.master.gain.linearRampToValueAtTime(.55, now + 2.5);
      this.bar(); clearInterval(this.timer); this.timer = setInterval(() => this.bar(), 8000);
      this.playing = true; store.set('jnh-music', 'on', true); this.ui();
      toast('Muzik tenang sedang dimainkan', '🎵');
    },
    stop() {
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      this.master.gain.cancelScheduledValues(now); this.master.gain.setValueAtTime(this.master.gain.value, now);
      this.master.gain.linearRampToValueAtTime(0, now + 1.2);
      clearInterval(this.timer); this.playing = false; store.set('jnh-music', 'off', true); this.ui();
      toast('Muzik dimatikan', '🔇');
      setTimeout(() => { if (!this.playing) this.ctx.suspend(); }, 1400);
    },
    ui() {
      if (Island) { Island.el.classList.toggle('is-playing', this.playing); Island.size(Island.el.dataset.state); }
      $$('.music-toggle').forEach(b => { b.classList.toggle('playing', this.playing); const l = $('.lbl2', b); if (l) l.textContent = this.playing ? 'Muzik: Hidup' : 'Muzik'; });
      $$('.music-btn').forEach(b => {
        b.classList.toggle('playing', this.playing); b.classList.remove('nudge');
        const l = $('.lbl', b); if (l) l.textContent = this.playing ? 'Muzik: Hidup' : 'Muzik Tenang';
        b.setAttribute('aria-pressed', this.playing);
      });
    }
  };
  $$('.music-btn, .music-toggle').forEach(b => b.addEventListener('click', () => Music.playing ? Music.stop() : Music.start()));
  if (store.get('jnh-music', true) === 'on') {
    // Pelayar perlukan sentuhan pengguna — sambung muzik pada interaksi pertama
    const resume = e => { if (e.target.closest && e.target.closest('.music-btn, .music-toggle')) return; Music.start(); removeEventListener('pointerdown', resume); };
    addEventListener('pointerdown', resume);
    $$('.music-btn .lbl').forEach(l => l.textContent = 'Sentuh untuk sambung');
  } else {
    setTimeout(() => $$('.music-btn').forEach(b => b.classList.add('nudge')), 4000);
  }

  /* ---------- Sapaan island (sekali setiap sesi) ---------- */
  if (Island && !store.get('jnh-welcome', true)) {
    store.set('jnh-welcome', '1', true);
    setTimeout(() => Island.alert('Selamat datang! Tekan <b>pil ini</b> untuk menu', '👋', 3400), $('#intro') ? 3300 : 900);
  }

  /* ---------- Tahun footer ---------- */
  $$('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();
