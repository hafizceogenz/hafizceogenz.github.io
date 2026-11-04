<!DOCTYPE html>
<html lang="ms" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jelajah Pulau Pinang - Destinasi Menarik</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        brand: { 50: '#eff6ff', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8' }
                    }
                }
            }
        }
    </script>
    <!-- Google Fonts & Lucide Icons -->
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
    </style>
</head>
<body class="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">

    <!-- Header & Navbar -->
    <header class="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <div class="flex items-center space-x-3">
                <div class="bg-brand-600 text-white p-2.5 rounded-xl shadow-lg shadow-brand-500/30">
                    <i data-lucide="compass" class="w-6 h-6"></i>
                </div>
                <div>
                    <span class="text-xl font-extrabold tracking-tight">Penang<span class="text-brand-600">Explorer</span></span>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Mutiara Timur</p>
                </div>
            </div>
            
            <div class="flex items-center space-x-4">
                <!-- Theme Toggle Button -->
                <button id="theme-toggle" class="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                    <i id="theme-icon" data-lucide="moon" class="w-5 h-5"></i>
                </button>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-brand-50/50 to-transparent dark:from-gray-800/50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span class="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full text-xs font-semibold bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 mb-6 border border-brand-200 dark:border-brand-800">
                <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> Terokai Keindahan Pulau Pinang
            </span>
            <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight mb-6">
                Temui Destinasi Paling <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">Menarik & Best</span> di Penang
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
                Dari warisan bersejarah Georgetown hingga keindahan pantai Batu Ferringhi dan syurga makanan jalanan bertaraf dunia.
            </p>
            <div class="flex flex-wrap justify-center gap-4">
                <a href="#destinasi" class="px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-2xl shadow-xl shadow-brand-500/25 transition transform hover:-translate-y-0.5">
                    Mula Teroka Sekarang
                </a>
            </div>
        </div>
    </section>

    <!-- Main Content & Filter Section -->
    <main id="destinasi" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <!-- Filter Buttons -->
        <div class="flex flex-wrap justify-center gap-3 mb-12" id="filter-container">
            <button onclick="filterDestinations('all')" class="filter-btn active px-6 py-2.5 rounded-xl font-medium text-sm transition bg-brand-600 text-white shadow-md shadow-brand-500/20">Semua</button>
            <button onclick="filterDestinations('pantai')" class="filter-btn px-6 py-2.5 rounded-xl font-medium text-sm transition bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700">Pantai & Alam</button>
            <button onclick="filterDestinations('sejarah')" class="filter-btn px-6 py-2.5 rounded-xl font-medium text-sm transition bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700">Warisan & Sejarah</button>
            <button onclick="filterDestinations('makanan')" class="filter-btn px-6 py-2.5 rounded-xl font-medium text-sm transition bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700">Makanan & Budaya</button>
        </div>

        <!-- Cards Grid -->
        <div id="cards-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- JavaScript akan suntik kad di sini secara dinamik -->
        </div>
    </main>

    <!-- Modal Popup untuk Info Lanjut -->
    <div id="detail-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm hidden">
        <div class="bg-white dark:bg-gray-800 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl transform transition-all scale-95 opacity-0 duration-300" id="modal-content-box">
            <div class="relative h-64">
                <img id="modal-img" src="" alt="Destinasi" class="w-full h-full object-cover">
                <button onclick="closeModal()" class="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </div>
            <div class="p-6 sm:p-8">
                <span id="modal-category" class="text-xs font-semibold px-3 py-1 bg-brand-50 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400 rounded-full uppercase tracking-wider"></span>
                <h3 id="modal-title" class="text-2xl font-bold mt-2 mb-4"></h3>
                <p id="modal-desc" class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6"></p>
                <div class="flex justify-end">
                    <button onclick="closeModal()" class="px-6 py-2.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 font-medium text-sm rounded-xl transition">Tutup</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12 mt-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p class="text-sm text-gray-500 dark:text-gray-400">
                Dihasilkan dengan ❤️ oleh <span class="font-bold text-brand-600">Hafiz Ziqri</span> untuk GitHub Pages.
            </p>
        </div>
    </footer>

    <!-- JavaScript Interaktif -->
    <script>
        // Data Destinasi Pulau Pinang
        const destinations = [
            {
                id: 1,
                title: "Batu Ferringhi",
                category: "pantai",
                image: "https://images.unsplash.com/photo-1596401057630-3652a353b3b4?auto=format&fit=crop&w=800&q=80",
                shortDesc: "Syurga pantai popular dengan aktiviti sukan air yang meriah dan pasar malam yang sibuk.",
                fullDesc: "Batu Ferringhi terkenal dengan bentangan pantai pasir putih yang panjang dan pelbagai aktiviti rekreasi air seperti jet ski, parasailing, dan menaiki bot pisang. Apabila malam tiba, kawasan ini hidup dengan pasar malam yang menjual pelbagai cenderahati, pakaian, dan makanan tempatan."
            },
            {
                id: 2,
                title: "Georgetown UNESCO Heritage",
                category: "sejarah",
                image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80",
                shortDesc: "Bandar warisan dunia dengan seni bina kolonial unik dan lukisan dinding (street art) ikonik.",
                fullDesc: "Georgetown diiktiraf sebagai Tapak Warisan Dunia UNESCO. Ia menawarkan gabungan seni bina era British, rumah kedai Cina tradisional, masjid bersejarah, dan mural jalanan interaktif yang menjadi kegemaran pelancong untuk merakamkan gambar kenangan."
            },
            {
                id: 3,
                title: "Penang Hill (Bukit Bendera)",
                category: "pantai",
                image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
                shortDesc: "Nikmati pemandangan panorama seluruh pulau dari puncak bukit tertua menggunakan kereta api kabel.",
                fullDesc: "Bukit Bendera menawarkan udara yang dingin dan segar jauh daripada kesibukan bandar. Anda boleh menaiki kereta api funikular moden ke puncak untuk melihat pemandangan indah Georgetown serta Selat Melaka."
            },
            {
                id: 4,
                title: "Kek Lok Si Temple",
                category: "sejarah",
                image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
                shortDesc: "Kuil Buddha terbesar di Malaysia yang tersergam indah dengan Pagoda 10,000 Buddha.",
                fullDesc: "Kek Lok Si terletak di Ayer Itam dan terkenal dengan seni bina megah, patung Dewi Kuan Yin gergasi, serta taman-taman yang dihiasi lampu warna-warni terutamanya ketika sambutan Tahun Baru Cina."
            },
            {
                id: 5,
                title: "Gurney Drive Street Food",
                category: "makanan",
                image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
                shortDesc: "Medan selera ikonik yang menghimpunkan Char Kuey Teow, Pasembur, dan Laksa Penang terbaik.",
                fullDesc: "Pulau Pinang diiktiraf sebagai syurga makanan Malaysia. Gurney Drive adalah lokasi wajib singgah untuk merasai pelbagai hidangan jalanan autentik yang memukau selera dalam suasana terbuka tepi laut."
            },
            {
                id: 6,
                title: "Penang Bridge & Lebuhraya",
                category: "sejarah",
                image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80",
                shortDesc: "Jambatan ikonik menghubungkan tanah besar Semenanjung dengan Pulau Mutiara.",
                fullDesc: "Jambatan Pulau Pinang adalah mercu tanda kejuruteraan kebanggaan negara. Pemandangan matahari terbenam atau terbit dari atas jambatan ini amat menakjubkan bagi sesiapa yang memandu melaluinya."
            }
        ];

        // Paparkan kad ke HTML
        function renderCards(filteredData) {
            const grid = document.getElementById('cards-grid');
            grid.innerHTML = '';

            filteredData.forEach(item => {
                const card = document.createElement('div');
                card.className = "bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition duration-300 flex flex-col justify-between group";
                card.innerHTML = `
                    <div class="relative h-52 overflow-hidden">
                        <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                        <span class="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">${item.category}</span>
                    </div>
                    <div class="p-6 flex flex-col flex-grow">
                        <h3 class="text-xl font-bold mb-2 group-hover:text-brand-600 transition">${item.title}</h3>
                        <p class="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow">${item.shortDesc}</p>
                        <button onclick="openModal(${item.id})" class="w-full py-3 bg-brand-50 dark:bg-brand-900/40 hover:bg-brand-600 hover:text-white text-brand-600 dark:text-brand-400 font-semibold text-sm rounded-xl transition flex items-center justify-center gap-2">
                            Ketahui Lebih Lanjut <i data-lucide="arrow-right" class="w-4 h-4"></i>
                        </button>
                    </div>
                `;
                grid.appendChild(card);
            });
            lucide.createIcons();
        }

        // Fungsi Filter Kategori
        function filterDestinations(category) {
            // Update butang aktif
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.className = "filter-btn px-6 py-2.5 rounded-xl font-medium text-sm transition bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700";
            });
            event.target.className = "filter-btn px-6 py-2.5 rounded-xl font-medium text-sm transition bg-brand-600 text-white shadow-md shadow-brand-500/20";

            if(category === 'all') {
                renderCards(destinations);
            } else {
                const filtered = destinations.filter(item => item.category === category);
                renderCards(filtered);
            }
        }

        // Modal Handler
        function openModal(id) {
            const item = destinations.find(d => d.id === id);
            document.getElementById('modal-img').src = item.image;
            document.getElementById('modal-category').innerText = item.category;
            document.getElementById('modal-title').innerText = item.title;
            document.getElementById('modal-desc').innerText = item.fullDesc;

            const modal = document.getElementById('detail-modal');
            const box = document.getElementById('modal-content-box');
            modal.classList.remove('hidden');
            setTimeout(() => {
                box.classList.remove('scale-95', 'opacity-0');
                box.classList.add('scale-100', 'opacity-100');
            }, 10);
        }

        function closeModal() {
            const modal = document.getElementById('detail-modal');
            const box = document.getElementById('modal-content-box');
            box.classList.remove('scale-100', 'opacity-100');
            box.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 200);
        }

        // Dark/Light Mode Toggle Script
        const themeToggleBtn = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        const htmlElement = document.documentElement;

        // Semak tetapan lepas
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            htmlElement.classList.add('dark');
            themeIcon.setAttribute('data-lucide', 'sun');
        } else {
            htmlElement.classList.remove('dark');
            themeIcon.setAttribute('data-lucide', 'moon');
        }
        lucide.createIcons();

        themeToggleBtn.addEventListener('click', () => {
            if (htmlElement.classList.contains('dark')) {
                htmlElement.classList.remove('dark');
                localStorage.theme = 'light';
                themeIcon.setAttribute('data-lucide', 'moon');
            } else {
                htmlElement.classList.add('dark');
                localStorage.theme = 'dark';
                themeIcon.setAttribute('data-lucide', 'sun');
            }
            lucide.createIcons();
        });

        // Paparkan senarai asal semasa mula load
        renderCards(destinations);
    </script>
</body>
</html>
