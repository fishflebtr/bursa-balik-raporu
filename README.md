# Bursa LRF & Spin Balık Raporu — FishFleb

Gerçek sunuculu, yönetilebilir balıkçılık raporu.

## Özellikler

### Bölgeler & Meralar
**Gemlik**
- Gemlik Sahili / İskele
- Manastır
- Kurşunlu
- Narlı
- Kumyaka
- Karacaali
- Kumla

**Mudanya**
- Mudanya İskele / Liman
- Güzelyalı
- Trilye
- Budo Civarı
- **Kumsaz**

**Armutlu**
- Armutlu Liman
- Fıstıklı

+ Diğer noktalar

- Canlı hava + deniz verisi (Open-Meteo)
- Saatlik balık aktivitesi
- LRF & Spin önerileri
- **Gerçek sunucu yönetim paneli** (değişiklikler herkese görünür)

## Yönetici

- **Kullanıcı:** FishFleb  
- **Şifre:** BursaLRF2026  

## Çalıştırma (hiçbir paket yüklemeden)

```bash
cd balik-raporu
node server.js
```

Tarayıcı: **http://localhost:3000**

iPhone / Android Safari veya Chrome ile de açılır.

## Canlıya alma (ücretsiz)

1. Bu klasörü GitHub’a yükle
2. [Railway.app](https://railway.app) veya [Render.com](https://render.com) → New Project → GitHub repo seç
3. Start command: `node server.js`
4. Domain alırsın, herkes kullanır

## Dosya yapısı

```
balik-raporu/
├── server.js           ← Saf Node.js sunucu (express yok, ekstra paket yok)
├── data/
│   ├── content.json    ← Yorum, tavsiye, LRF metinleri (admin kaydeder)
│   └── locations.json  ← Bölgeler + meraslar
└── public/
    └── index.html      ← Frontend
```

## Admin nasıl kullanılır?

1. Siteyi aç
2. En altta **Yönetici Girişi**
3. FishFleb / BursaLRF2026
4. Genel Yorum, Tavsiye, En Verimli Saatler, LRF listesini düzenle
5. **Kaydet** → sunucuya yazılır, herkes görür

Geliştirici: **FishFleb**
