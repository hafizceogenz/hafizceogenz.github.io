# InapDesaJannah — Laman Web Homestay Eksklusif

Homestay 4 bilik, 4 bilik air en-suite · Unipark Condominium, Jalan Ikram–UNITEN, Kajang
Pengurus: **Haziq Hakimie** (+6010-863 0706) · Rekaan oleh **ZARC Works@Home**

---

## 1. Rangka Konsep 6 Halaman

Strategi keseluruhan: **setiap halaman ada satu tugas, dan setiap tugas berakhir di WhatsApp** dengan kod kata kunci unik supaya Haziq tahu dari mana pertanyaan datang.

| # | Halaman | Tugas utama | Kandungan & interaksi |
|---|---------|-------------|------------------------|
| 01 | **Utama** (`index.html`) | Memikat dalam 5 saat | Animasi pembuka "InapDesaJannah", hero foto penuh dengan teks berputar (keluarga / konvokesyen / rombongan), borang **Semak Kekosongan** pantas → WhatsApp, statistik (4 bilik · 4 bilik air · ~5 min UNITEN), 4 kelebihan utama, galeri bergerak, ulasan tetamu, CTA |
| 02 | **Ruang & Fasiliti** (`rooms.html`) | Yakinkan tentang keselesaan | Tab interaktif Bilik 1–4 + Ruang Bersama (klik untuk tukar gambar), toggle "Dalam Unit" vs "Fasiliti Unipark", perbandingan **Seluruh Unit vs Bilik Hotel** |
| 03 | **Sekitar** (`experience.html`) | Jual lokasi | Kad tempat (UNITEN, sate Kajang, De Centrum, kolam, gim), tab **Persona** (Konvokesyen / Keluarga / Kerja / Jangka Panjang) dengan jadual contoh & butang WhatsApp khusus, peta Google + Waze |
| 04 | **Galeri** (`gallery.html`) | Bina keinginan | Galeri masonry dengan penapis kategori, lightbox penuh skrin (anak panah papan kekunci + leret di telefon) |
| 05 | **Tempahan** (`booking.html`) | Tukar pelawat → tempahan | Borang lengkap, ringkasan langsung, **pratonton mesej WhatsApp**, nombor rujukan unik, 4 langkah proses, FAQ, ulasan |
| 06 | **Hubungi** (`contact.html`) | Buang semua halangan | Kad hubungan, 6 butang **WhatsApp berkata kunci**, peta |

### Ciri di semua halaman
- **Dynamic Island** — pil hitam di atas skrin: paparkan halaman semasa + maklumat bergilir; klik untuk kembang menjadi menu (6 halaman, WhatsApp, chatbot, muzik, tema) dengan bar kemajuan skrol; notifikasi (tema, muzik, WhatsApp) "mengembang" dari pil ini.
- **Mod gelap / terang** (disimpan dalam pelayar).
- **Chatbot "Jannah"** — jawab soalan harga, bilik, fasiliti, lokasi, UNITEN, check-in, sewa bulanan, parkir, polisi; ada **aliran tempahan dalam chat** (pilih tarikh → tetamu → tujuan → hantar ke WhatsApp).
- **Muzik latar tenang** — dijana terus oleh pelayar (Web Audio): pad lembut + loceng + bayu. Tiada fail audio, tiada isu hak cipta. Pelayar hanya benarkan bunyi selepas pengguna tekan butang.
- **Butang WhatsApp terapung** + animasi skrol + kesan kursor.

### Kod kata kunci WhatsApp
| Kod | Sumber |
|-----|--------|
| `#JNH-TEMPAH` | Borang tempahan / semak kekosongan |
| `#JNH-BOT` | Tempahan melalui chatbot |
| `#JNH-HARGA` | Tanya harga |
| `#JNH-KONVO` | Konvokesyen / ibu bapa pelajar UNITEN |
| `#JNH-LAWAT` | Minta video / lawat unit |
| `#JNH-BULANAN` | Sewa jangka panjang |
| `#JNH-SOALAN` | Soalan umum |
| `#JNH-ULASAN` | Tetamu nak beri ulasan |

Setiap mesej juga ada **No. Rujukan** (cth `JNH-261105-4821`). Tip: simpan kod ini sebagai *Quick Replies* / label dalam WhatsApp Business.

---

## 2. Perkara yang PERLU anda kemas kini (fail `assets/js/config.js`)

1. **`hargaSemalam`** — masukkan harga (cth `380`). Jika `null`, laman paparkan "Melalui WhatsApp".
2. **`checkIn` / `checkOut`** — waktu masuk & keluar.
3. **`ulasan`** — masukkan ulasan SEBENAR tetamu. Selagi kosong, laman papar kad berlabel **"Contoh"**.
4. **`rating`** — skor sebenar Google / Booking.com / Airbnb bila sudah ada.

> Ulasan & rating mesti datang dari tetamu sebenar. Ulasan rekaan boleh melanggar polisi platform dan undang-undang perlindungan pengguna.

---

## 3. Gambar

Gambar sekarang ialah **foto Unsplash** (lesen percuma untuk kegunaan komersial) sebagai ilustrasi suasana. Ia dipautkan terus dari Unsplash, jadi perlukan internet.

**Sangat disyorkan:** ganti dengan foto sebenar unit anda — tetamu lebih percaya, dan kurang aduan "tak sama macam gambar".

Cara ganti:
1. Letak foto dalam `assets/img/` (cth `ruang-tamu.jpg`, saiz ~1600px lebar, < 400KB).
2. Dalam fail HTML, cari pautan `https://unsplash.com/photos/<ID>/download?...` dan tukar kepada `assets/img/ruang-tamu.jpg`.

| ID Unsplash | Kegunaan |
|-------------|----------|
| Qe8eMrwTW5g | Hero utama |
| xVZYJePklnk, z9xJE03D988, Hnec2oEbbxk, VF6KDO-Kmss | Ruang tamu |
| kE6Luqa4bBQ | Dapur |
| ZD6cS5qLSQw, yOs9Zc5JvTw, ePpt1W2cTjs, OZIdKtn8pKs, aH_EykwSvFk, A0-Gkbema_w | Bilik tidur |
| ZGUtbYmOGZE, 29IpcQdFwI4, M8ikiivUAOM | Bilik air |
| iXX990Ife50, h1_ILkb9tLo | Kolam renang |
| TEbVwp3WC0E, 20jX9b35r_M | Gimnasium |
| rjWfNR_AC5g | Badminton |
| IfXEnQfCOsI, rIn8gLasFUY, kWUBGDYP1Ac | Pemandangan / bangunan |
| aaf3xxKPuqU, 6P5wShC1sDI | Sate |

Jika mana-mana gambar gagal dimuat, laman akan paparkan latar gradien hijau-emas secara automatik.

---

## 4. Muat naik ke GitHub Pages

1. Log masuk GitHub → **New repository** → nama: `inapdesajannah` (Public).
2. **Add file → Upload files** → seret SEMUA fail & folder dari zip ini (pastikan `index.html` berada di akar, bukan dalam subfolder).
3. **Commit changes**.
4. **Settings → Pages** → *Source*: `Deploy from a branch` → Branch: `main` / `(root)` → **Save**.
5. Tunggu 1–2 minit. Laman anda: `https://<username>.github.io/inapdesajannah/`

Fail `.nojekyll` sudah disertakan. Mahu domain sendiri (cth `inapdesajannah.com`)? Tambah di **Settings → Pages → Custom domain**.

---

## 5. Struktur fail

```
index.html · rooms.html · experience.html · gallery.html · booking.html · contact.html · 404.html
assets/css/style.css      — reka bentuk, tema gelap/terang, Dynamic Island
assets/js/config.js       — TETAPAN (harga, waktu, ulasan, kod WhatsApp)
assets/js/main.js         — island, animasi, muzik, tempahan, galeri, ulasan
assets/js/chatbot.js      — chatbot Jannah
assets/img/favicon.svg
```

© InapDesaJannah · Pengurusan Haziq Hakimie · Rekaan oleh ZARC Works@Home
