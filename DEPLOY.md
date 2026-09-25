# Kalıcı Ücretsiz Site Kurulumu (Railway)

Bu adımlarla siten **silinmez, kapanmaz**, herkesle paylaşabileceğin bir linke sahip olur.

## 1. GitHub hesabı (yoksa ücretsiz aç)
https://github.com → Sign up

## 2. Yeni repository oluştur
- GitHub’da **New repository**
- İsim: `bursa-balik-raporu` (veya istediğin)
- Public seç
- Create repository

## 3. Dosyaları yükle
Bilgisayarında `balik-raporu` klasöründeyken:

```bash
git init
git add .
git commit -m "FishFleb Bursa LRF rapor"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADIN/bursa-balik-raporu.git
git push -u origin main
```

(KULLANICI_ADIN yerine kendi GitHub kullanıcı adını yaz)

## 4. Railway’e bağla (ücretsiz)
1. https://railway.app → **Login with GitHub**
2. **New Project** → **Deploy from GitHub repo**
3. `bursa-balik-raporu` reposunu seç
4. Deploy başlar (otomatik `node server.js` çalışır)
5. Birkaç dakika sonra **Settings → Networking → Generate Domain**
6. Sana `https://bursa-balik-raporu-production-xxxx.up.railway.app` gibi bir link verir.

Bu link kalıcıdır. İstediğin zaman paylaş.

## Yönetim
Site linkinin en altında **Yönetici Girişi**:
- Kullanıcı: FishFleb
- Şifre: BursaLRF2026

Değişiklikler sunucuya kaydolur.

## Not
Railway ücretsiz planında proje bir süre kullanılmazsa uyuyabilir, ilk istekte 10-20 sn uyanır. Sürekli açık tutmak istersen ücretli plana geçebilirsin (çok ucuz).
