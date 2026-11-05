/* =========================================================
   TETAPAN UTAMA — InapDesaJannah
   Ubah maklumat di fail ini sahaja. Semua halaman, chatbot
   dan mesej WhatsApp akan ikut tetapan ini secara automatik.
   ========================================================= */

window.JANNAH = {
  nama: 'InapDesaJannah',
  pengurus: 'Haziq Hakimie',
  whatsapp: '60108630706',           // tanpa '+' dan tanpa sengkang
  telefonPaparan: '+6010-863 0706',
  alamat: 'Unipark Condominium, Jalan Ikram–UNITEN (Jalan US1/off), Kajang, Selangor Darul Ehsan',

  // Harga semalam (RM). Biarkan null jika mahu harga diberi melalui WhatsApp sahaja.
  // Contoh: hargaSemalam: 380,
  hargaSemalam: null,

  // Waktu check-in / check-out. Biarkan null jika belum ditetapkan
  // (chatbot akan minta tetamu sahkan dengan Haziq).
  checkIn: null,   // contoh: '3:00 petang'
  checkOut: null,  // contoh: '12:00 tengah hari'

  // Kod kata kunci WhatsApp — setiap butang hantar kod unik supaya
  // anda tahu dari mana pertanyaan datang (laman web / chatbot / tujuan).
  kod: {
    tempah:  '#JNH-TEMPAH',   // borang tempahan laman web
    bot:     '#JNH-BOT',      // tempahan melalui chatbot
    harga:   '#JNH-HARGA',    // tanya harga
    lawat:   '#JNH-LAWAT',    // nak tengok unit
    konvo:   '#JNH-KONVO',    // konvokesyen / ibu bapa pelajar UNITEN
    bulanan: '#JNH-BULANAN',  // sewa jangka panjang
    soalan:  '#JNH-SOALAN',   // soalan umum
    ulasan:  '#JNH-ULASAN'    // tetamu nak beri ulasan
  },

  /* ---------------------------------------------------------
     ULASAN TETAMU
     Masukkan ulasan SEBENAR tetamu anda di bawah (salin dari
     Google, Booking.com, Airbnb atau mesej WhatsApp dengan izin).
     Selagi senarai kosong, laman akan paparkan kad contoh yang
     DILABEL "Contoh" supaya reka letak boleh dilihat.
     Format:
       { nama: 'Aisyah R.', sumber: 'Google', bintang: 5,
         tarikh: 'Okt 2026', teks: 'Unit sangat bersih...' }
     --------------------------------------------------------- */
  ulasan: [],

  // Rating sebenar di platform. null = belum dipaparkan.
  // Contoh: google: { skor: 4.9, jumlah: 37, url: 'https://g.page/...' }
  rating: {
    google: null,
    booking: null,
    airbnb: null
  }
};
