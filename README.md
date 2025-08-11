# CareerFlow - Job Board App

CareerFlow, Vue 3 ile geliştirilmiş basit ve işlevsel bir iş ilanı platformudur.  
Kullanıcılar iş ilanlarını listeleyebilir, filtreleyebilir ve detay sayfasına ulaşabilir.  
Ek olarak **Tema Modu (Dark/Light)** ve **Çok Dilli Destek (Türkçe/İngilizce)** özellikleri eklenmiştir.

---

## 📌 Özellikler

### Temel Özellikler

- Ana sayfada iş ilanlarının listelenmesi
- Filtreleme:
  - İş başlığı veya anahtar kelime
  - Konum
  - Kategori (Örn: Tasarım, Yazılım, Pazarlama)
- İş detayı sayfası
- Dinamik routing ile ilan detay sayfaları

### Ek Özellikler

- **Tema Modu** (Dark / Light)
- **Çok Dilli Destek** (Türkçe & İngilizce)
- Tamamen **responsive** tasarım (Tailwind CSS)
- Bileşenlerin modüler ve tekrar kullanılabilir yapıda olması
- Mock API üzerinden veri çekme (static JSON)

---

## 🛠 Kullanılan Teknolojiler

- [Vue 3](https://vuejs.org/) (Composition API)
- [Vue Router](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/) - State Management
- [Tailwind CSS](https://tailwindcss.com/) - Responsive tasarım
- [Axios](https://axios-http.com/) - API istekleri
- [TypeScript](https://www.typescriptlang.org/)
- [i18n](https://vue-i18n.intlify.dev/) - Çoklu dil desteği

---

## 📂 Proje Yapısı

```plaintext
src
 ├─ components/          # UI bileşenleri
 ├─ composables/         # Reusable composition fonksiyonları
 ├─ config/              # Konfigürasyon dosyaları (i18n vb.)
 ├─ hooks/               # Özel hook'lar
 ├─ layouts/             # Sayfa layout'ları
 ├─ locales/             # Dil dosyaları (en.json, tr.json)
 ├─ mock/                # Mock veri dosyaları
 ├─ router/              # Vue Router ayarları
 ├─ stores/              # Pinia store'lar
 ├─ types/               # TypeScript tip tanımları
 ├─ utils/               # Yardımcı fonksiyonlar
 ├─ views/               # Sayfalar (Jobs, JobDetail, About)
 ├─ App.vue
 ├─ main.ts
```

---

### 🚀 Kurulum ve Çalıştırma

Depoyu klonlayın:

```bash
git clone https://github.com/DavutDurgun/career-flow
cd careerflow
```

Bağımlılıkları yükleyin:

```bash
bun install
# veya
npm install
```

Geliştirme ortamında çalıştırın:

```bash
bun dev
# veya
npm run dev
```

---

### 🌐 Çoklu Dil Kullanımı

- Proje, **`vue-i18n`** ile Türkçe ve İngilizce dil desteğine sahiptir.
- **`LanguageSwitcher`** bileşeni ile diller arasında geçiş yapılabilir.
- Dil dosyaları: **`src/locales/en.json`** ve **`src/locales/tr.json`**

---

### 🎨 Tema Modu

- Tema bilgisi **Pinia store (`useThemeStore`)** ile yönetilir.
- Dark/Light geçişi, kullanıcı tercihini **`localStorage`**'da saklar.
- Tailwind CSS'in **`dark:`** sınıfları kullanılmıştır.
