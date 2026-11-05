/* =========================================================
   Jannah — Pembantu Maya InapDesaJannah
   Chatbot berasaskan peraturan (tiada pelayan diperlukan).
   Setiap jawapan boleh disambung terus ke WhatsApp Haziq
   dengan kod kata kunci unik.
   ========================================================= */
(function () {
  'use strict';
  const C = window.JANNAH || {}, J = window.JNH;
  const panel = document.getElementById('chat');
  if (!panel || !J) return;
  const body = panel.querySelector('.chat-body');
  const chipsEl = panel.querySelector('.chips');
  const form = panel.querySelector('.chat-input');
  const input = form.querySelector('input');
  const fab = document.getElementById('botFab');
  let opened = false, flow = null;

  const MAIN_CHIPS = ['📅 Tempah sekarang', '💰 Harga', '🛏️ Bilik & fasiliti', '📍 Lokasi', '🎓 UNITEN / Konvo', '🕒 Check-in', '🏠 Sewa bulanan', '👀 Nak tengok unit', '💬 Cakap dengan Haziq'];

  const waBtn = (kod, label, tajuk, nota, rows) =>
    `<a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="${J.waLink(J.buildMsg(kod, tajuk, rows || [], nota))}">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2z"/></svg>
      ${label}</a>`;

  // ---------- Pangkalan pengetahuan ----------
  const KB = [
    {
      id: 'harga', k: ['harga', 'rate', 'kadar', 'berapa', 'price', 'rm', 'bayar', 'kos', 'mahal', 'murah', 'diskaun', 'promo'],
      a: () => C.hargaSemalam
        ? `Kadar semasa bermula <b>RM ${C.hargaSemalam} semalam</b> untuk <b>seluruh unit</b> (4 bilik, 4 bilik air). 🌿\n\nUntuk penginapan lebih lama atau tarikh perayaan, Haziq boleh beri tawaran khas.` + waBtn('harga', 'Tanya tawaran terkini', 'Pertanyaan Harga', 'Boleh kongsi kadar & tawaran terkini?')
        : `Kadar sewaan bergantung pada tarikh (hujung minggu, cuti umum & musim konvokesyen). 💬\n\nYang pasti — anda sewa <b>seluruh unit</b>: 4 bilik tidur, setiap satu dengan bilik air sendiri. Tekan butang di bawah, Haziq akan beri kadar terkini.` + waBtn('harga', 'Dapatkan harga di WhatsApp', 'Pertanyaan Harga', 'Boleh saya tahu kadar semalam untuk tarikh pilihan saya?')
    },
    {
      id: 'bilik', k: ['bilik', 'room', 'katil', 'bed', 'tidur', 'muat', 'berapa orang', 'kapasiti', 'pax', 'orang', 'en-suite', 'ensuite', 'toilet', 'tandas', 'bilik air', 'privasi'],
      a: () => `Unit ini ada <b>4 bilik tidur</b> dan <b>4 bilik air</b> — setiap bilik ada bilik air tersendiri (en-suite). 🛏️🚿\n\nDalam unit:\n• Penghawa dingin\n• Pemanas air\n• Dapur lengkap & peti sejuk\n• Mesin basuh\n• Privasi untuk setiap bilik\n\nBilangan tetamu maksimum akan disahkan oleh Haziq semasa tempahan.` + `<a class="btn btn-ghost btn-sm" href="rooms.html">Lihat Ruang & Fasiliti →</a>`
    },
    {
      id: 'fasiliti', k: ['kolam', 'pool', 'renang', 'gym', 'gim', 'surau', 'solat', 'badminton', 'futsal', 'fasiliti', 'facility', 'kemudahan', 'security', 'keselamatan', 'guard', 'kedai', 'runcit'],
      a: () => `Fasiliti Unipark Condominium yang boleh anda nikmati: 🏊\n\n• Kolam renang\n• Gimnasium\n• Surau\n• Gelanggang badminton\n• Gelanggang futsal\n• Kawalan keselamatan\n• Restoran & kedai runcit dalam kawasan\n\nSemuanya di depan pintu — tak perlu keluar jauh.`
    },
    {
      id: 'lokasi', k: ['lokasi', 'location', 'mana', 'alamat', 'address', 'map', 'peta', 'waze', 'jalan', 'kajang', 'arah', 'dekat', 'jauh', 'de centrum'],
      a: () => `📍 <b>${C.alamat}</b>\n\nKawasan De Centrum — kira-kira 5 minit ke UNITEN, dengan restoran & kedai serbaneka berdekatan.` + `<a class="btn btn-ghost btn-sm" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=Unipark+Condominium+Kajang">Buka di Google Maps</a>` + `<a class="btn btn-ghost btn-sm" target="_blank" rel="noopener" href="https://waze.com/ul?q=Unipark%20Condominium%20Kajang">Buka di Waze</a>`
    },
    {
      id: 'uniten', k: ['uniten', 'iukl', 'konvo', 'konvokesyen', 'graduasi', 'grad', 'universiti', 'anak', 'pelajar', 'student', 'shuttle', 'bas', 'daftar', 'pendaftaran'],
      a: () => `🎓 Lokasi ini sangat sesuai untuk keluarga pelajar UNITEN / IUKL:\n\n• Lebih kurang 5 minit ke UNITEN\n• Perkhidmatan shuttle UNITEN tersedia\n• Seluruh unit untuk satu keluarga — 4 bilik, setiap satu dengan bilik air sendiri\n\nMusim konvokesyen & pendaftaran cepat penuh. Kunci tarikh anda awal!` + waBtn('konvo', 'Semak tarikh konvo', 'Tempahan Konvokesyen / Ibu Bapa Pelajar', 'Saya datang untuk urusan UNITEN / IUKL. Boleh semak kekosongan?')
    },
    {
      id: 'checkin', k: ['check in', 'check-in', 'checkin', 'check out', 'check-out', 'checkout', 'masuk', 'keluar', 'kunci', 'key', 'waktu', 'pukul', 'jam'],
      a: () => (C.checkIn && C.checkOut)
        ? `🕒 Check-in: <b>${C.checkIn}</b>\n🕒 Check-out: <b>${C.checkOut}</b>\n\nPerlukan masuk awal / keluar lewat? Tanya Haziq — tertakluk kepada kekosongan.` + waBtn('soalan', 'Minta early check-in', 'Permintaan Waktu Check-in / Check-out', 'Boleh saya minta early check-in / late check-out?')
        : `🕒 Waktu check-in & check-out serta cara serahan kunci akan disahkan terus oleh Haziq selepas tempahan. Ada permintaan masuk awal? Beritahu sekarang.` + waBtn('soalan', 'Tanya waktu check-in', 'Pertanyaan Waktu Check-in / Check-out', 'Boleh kongsi waktu check-in, check-out dan cara serahan kunci?')
    },
    {
      id: 'bulanan', k: ['bulanan', 'monthly', 'jangka panjang', 'long term', 'sewa bulan', 'semester', 'sebulan', 'mingguan', 'weekly'],
      a: () => `🏠 Berminat dengan sewaan jangka panjang (mingguan / bulanan)? Hantar kod khas ini kepada Haziq untuk maklumat dan kadar.` + waBtn('bulanan', 'Tanya sewa jangka panjang', 'Sewa Jangka Panjang', 'Saya berminat dengan sewaan bulanan / jangka panjang. Boleh kongsi maklumat?')
    },
    {
      id: 'lawat', k: ['tengok', 'lawat', 'view', 'viewing', 'video', 'gambar', 'photo', 'foto', 'real'],
      a: () => `👀 Nak lihat unit dahulu? Boleh minta video ringkas atau janji temu melihat unit terus dengan Haziq.` + waBtn('lawat', 'Minta video / lawatan', 'Mohon Lihat Unit', 'Saya ingin melihat unit / dapatkan video unit sebelum membuat tempahan.') + `<a class="btn btn-ghost btn-sm" href="gallery.html">Lihat Galeri</a>`
    },
    {
      id: 'makan', k: ['makan', 'food', 'restoran', 'sate', 'satay', 'kedai makan', 'masak', 'dapur', 'kitchen', 'grab', 'foodpanda'],
      a: () => `🍢 Kajang terkenal dengan sate! Restoran dan kedai serbaneka juga ada di sekitar De Centrum.\n\nNak masak sendiri? Unit dilengkapi dapur lengkap dan peti sejuk.` + `<a class="btn btn-ghost btn-sm" href="experience.html">Terokai Sekitar →</a>`
    },
    {
      id: 'parking', k: ['parking', 'parkir', 'letak kereta', 'kereta', 'car', 'motor'],
      a: () => `🚗 Maklumat parkir (bilangan petak & akses pelawat) akan disahkan oleh Haziq mengikut tempahan anda.` + waBtn('soalan', 'Tanya tentang parkir', 'Pertanyaan Parkir', 'Boleh kongsi maklumat parkir untuk tetamu?')
    },
    {
      id: 'wifi', k: ['wifi', 'wi-fi', 'internet', 'tv', 'astro', 'netflix', 'iron', 'seterika', 'tuala', 'towel', 'toiletries', 'sabun', 'syampu'],
      a: () => `Senarai kelengkapan tambahan (Wi-Fi, TV, tuala, toiletries, seterika) akan disahkan terus oleh Haziq supaya maklumat sentiasa tepat. ✅` + waBtn('soalan', 'Tanya kelengkapan', 'Pertanyaan Kelengkapan', 'Boleh kongsi senarai kelengkapan unit (Wi-Fi, TV, tuala, dll)?')
    },
    {
      id: 'peraturan', k: ['peraturan', 'rules', 'deposit', 'cagaran', 'batal', 'cancel', 'refund', 'pulang', 'haiwan', 'kucing', 'pet', 'rokok', 'smoking', 'majlis', 'party'],
      a: () => `📋 Polisi deposit, pembatalan dan peraturan rumah akan dikongsi oleh Haziq semasa pengesahan tempahan.` + waBtn('soalan', 'Tanya polisi', 'Pertanyaan Polisi', 'Boleh kongsi polisi deposit, pembatalan & peraturan rumah?')
    },
    {
      id: 'salam', k: ['assalamualaikum', 'salam', 'hai', 'hi', 'hello', 'helo', 'hey', 'selamat'],
      a: () => `Waalaikumussalam & selamat datang! 😊 Saya Jannah, pembantu maya ${C.nama}. Pilih topik di bawah atau taip soalan anda.`
    },
    {
      id: 'terima', k: ['terima kasih', 'thanks', 'thank', 'tq', 'ok', 'okay', 'baik'],
      a: () => `Sama-sama! 🌿 Jika ada apa-apa lagi, saya di sini. Atau terus hubungi Haziq bila-bila masa.` + waBtn('soalan', 'WhatsApp Haziq', 'Soalan Umum', 'Saya ada beberapa soalan tentang homestay ini.')
    },
    {
      id: 'haziq', k: ['haziq', 'manusia', 'agent', 'ejen', 'whatsapp', 'call', 'telefon', 'hubungi', 'contact', 'cakap'],
      a: () => `Boleh! Haziq Hakimie (pengurus) sedia membantu di ${C.telefonPaparan}. Tekan butang di bawah — mesej anda sudah siap dengan kod rujukan.` + waBtn('soalan', 'Sambung ke WhatsApp Haziq', 'Soalan Umum', 'Saya ada beberapa soalan tentang homestay ini.')
    }
  ];

  // ---------- UI ----------
  function add(html, who = 'bot') {
    const m = document.createElement('div'); m.className = 'msg ' + who; m.innerHTML = html;
    body.appendChild(m); body.scrollTop = body.scrollHeight; return m;
  }
  function typing() { const t = add('<div class="typing"><i></i><i></i><i></i></div>'); t.style.padding = '0'; return t; }
  function say(html, delay = 650) {
    return new Promise(res => { const t = typing(); setTimeout(() => { t.remove(); res(add(html)); }, delay); });
  }
  function chips(list) {
    chipsEl.innerHTML = '';
    list.forEach(c => { const b = document.createElement('button'); b.type = 'button'; b.textContent = c; b.onclick = () => handle(c); chipsEl.appendChild(b); });
  }
  const escape = s => s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

  function open() {
    panel.classList.add('open'); fab.setAttribute('aria-expanded', 'true');
    const dot = fab.querySelector('.dot'); if (dot) dot.remove();
    if (!opened) {
      opened = true;
      say(`Assalamualaikum! 👋 Saya <b>Jannah</b>, pembantu maya <b>${C.nama}</b>.`, 400)
        .then(() => say('Saya boleh bantu semak kekosongan, harga, bilik, lokasi & banyak lagi. Apa yang anda perlukan hari ini?', 700))
        .then(() => chips(MAIN_CHIPS));
    }
    setTimeout(() => input.focus(), 300);
  }
  function close() { panel.classList.remove('open'); fab.setAttribute('aria-expanded', 'false'); }
  fab.addEventListener('click', () => panel.classList.contains('open') ? close() : open());
  panel.querySelector('.x').addEventListener('click', close);
  document.querySelectorAll('[data-open-chat]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); open(); }));

  form.addEventListener('submit', e => { e.preventDefault(); const v = input.value.trim(); if (!v) return; input.value = ''; handle(v); });

  // ---------- Aliran tempahan dalam chat ----------
  function startBooking() {
    flow = { step: 'in', d: {} };
    say('Hebat! Mari semak kekosongan. 📅 <b>Bila tarikh check-in?</b>' +
      `<input type="date" id="cIn" min="${J.isoToday()}" value="${J.isoToday(7)}"><button class="btn btn-primary btn-sm" id="cInOk">Seterusnya</button>`)
      .then(m => {
        m.querySelector('#cInOk').onclick = () => {
          const v = m.querySelector('#cIn').value; if (!v) return;
          flow.d.in = v; m.querySelector('#cInOk').remove(); add(J.fmtDate(v), 'user'); askOut();
        };
      });
    chips(['❌ Batal']);
  }
  function askOut() {
    const d = new Date(flow.d.in); d.setDate(d.getDate() + 2);
    say('<b>Tarikh check-out?</b>' + `<input type="date" id="cOut" min="${flow.d.in}" value="${d.toISOString().slice(0, 10)}"><button class="btn btn-primary btn-sm" id="cOutOk">Seterusnya</button>`)
      .then(m => {
        m.querySelector('#cOutOk').onclick = () => {
          const v = m.querySelector('#cOut').value;
          if (J.nights(flow.d.in, v) < 1) { J.toast('Check-out mesti selepas check-in'); return; }
          flow.d.out = v; m.querySelector('#cOutOk').remove(); add(J.fmtDate(v), 'user'); askGuests();
        };
      });
  }
  function askGuests() {
    flow.step = 'guests';
    say('<b>Berapa orang tetamu?</b> Taip nombor atau pilih di bawah.');
    chips(['2', '4', '6', '8', '10+', '❌ Batal']);
  }
  function askPurpose() {
    flow.step = 'purpose';
    say('<b>Tujuan penginapan?</b>');
    chips(['Percutian keluarga', 'Konvokesyen / UNITEN', 'Kerja / outstation', 'Majlis keluarga', 'Lain-lain', '❌ Batal']);
  }
  function finishBooking() {
    const d = flow.d, n = J.nights(d.in, d.out);
    const rows = [['📅 Check-in', J.fmtDate(d.in)], ['📅 Check-out', J.fmtDate(d.out)], ['🌙 Tempoh', `${n} malam`], ['👥 Tetamu', d.guests], ['🎯 Tujuan', d.purpose]];
    if (C.hargaSemalam) rows.push(['💰 Anggaran', `RM ${(C.hargaSemalam * n).toLocaleString('ms-MY')}`]);
    const sum = rows.map(r => `${r[0]}: <b>${escape(String(r[1]))}</b>`).join('\n');
    say(`Ringkasan tempahan anda ✨\n\n${sum}\n\nTekan butang untuk hantar terus kepada Haziq. Mesej sudah lengkap dengan kod <span class="ref-code">${C.kod.bot}</span>.` +
      waBtn('bot', 'Hantar ke WhatsApp', 'Permohonan Tempahan (Chatbot)', 'Mohon sahkan kekosongan & kadar. Terima kasih.', rows), 900);
    flow = null; chips(MAIN_CHIPS);
  }

  // ---------- Pemadanan niat ----------
  function norm(s) { return s.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, ' ').replace(/\s+/g, ' ').trim(); }
  function match(text) {
    const t = ' ' + norm(text) + ' ';
    let best = null, score = 0;
    KB.forEach(item => {
      let s = 0; item.k.forEach(k => { if (t.includes(' ' + k + ' ') || (k.length > 4 && t.includes(k))) s += k.length > 5 ? 2 : 1; });
      if (s > score) { score = s; best = item; }
    });
    return best;
  }

  function handle(text) {
    add(escape(text), 'user');
    const t = norm(text);
    if (t.includes('batal')) { flow = null; say('Baik, dibatalkan. Ada apa-apa lagi saya boleh bantu?'); chips(MAIN_CHIPS); return; }
    if (flow && flow.step === 'guests') {
      const n = t.match(/\d+\+?/); if (!n) { say('Sila taip bilangan tetamu dalam nombor, contoh: 6'); return; }
      flow.d.guests = n[0] + ' orang'; askPurpose(); return;
    }
    if (flow && flow.step === 'purpose') { flow.d.purpose = text; finishBooking(); return; }
    if (/tempah|book|kosong|available|reserve|sewa sekarang|nak sewa|nak duduk/.test(t)) { startBooking(); return; }
    const m = match(text);
    if (m) { say(m.a()); chips(MAIN_CHIPS); return; }
    say(`Maaf, saya belum pasti tentang itu. 🙏 Haziq boleh jawab terus — soalan anda akan disertakan dalam mesej.` +
      waBtn('soalan', 'Tanya Haziq', 'Soalan Umum', `Soalan saya: "${text}"`));
    chips(MAIN_CHIPS);
  }

  // Sapaan automatik selepas beberapa saat (sekali sahaja per sesi)
  if (!J.store.get('jnh-bot-hello', true)) {
    setTimeout(() => {
      if (opened) return;
      const tip = fab.querySelector('.fab-tip'); if (tip) { tip.textContent = 'Ada soalan? Tanya Jannah 👋'; tip.style.opacity = 1; setTimeout(() => tip.style.opacity = '', 5000); }
      J.store.set('jnh-bot-hello', '1', true);
    }, 9000);
  }
})();
