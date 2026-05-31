@echo off
title SENTIENT WIRE - TUM SISTEMI SIFIRLA VE BASLAT
color 0B
cd /d "%~dp0"

echo ======================================================
echo    SENTIENT WIRE - SISTEM TEMIZLENIYOR VE BASLATILIYOR...
echo ======================================================
echo.

:: 1. Eski calisan sunuculari temizle
echo [1/3] Eski sunucu islemleri temizleniyor...
taskkill /IM node.exe /F >nul 2>&1
taskkill /IM python.exe /F >nul 2>&1
taskkill /IM pythonw.exe /F >nul 2>&1
timeout /t 2 /nobreak >nul

:: 2. Next.js Sunucusunu Yeni Pencerede Baslat
echo [2/3] Web Sunucusu (Next.js) baslatiliyor...
start "SentientWire Server" cmd /c "npm run dev"

:: Sunucunun hazır olması için bekle
echo [BILGI] Sunucunun hazirlanmasi icin 15 saniye bekleniyor...
timeout /t 15 /nobreak >nul

:: 3. GUI Arayuzunu Baslat
echo [3/3] AI Hizli Yayin Arayuzu baslatiliyor...
:: Python penceresini acik birakiyoruz ki hata varsa gorelim
start "SentientWire AI GUI" cmd /c "python sentient_publish_gui.py"

echo.
echo ======================================================
echo    ISLEM TAMAM!
echo    Siyah pencereleri kapatmayin, onlar sistemin beynidir.
echo    Eger hala hata aliyorsaniz siyah pencerelerdeki yazilari bana soyleyin.
echo ======================================================
echo.

timeout /t 5
exit
