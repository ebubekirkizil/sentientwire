@echo off
title SENTIENT WIRE - AI HIZLI YAYINLA
color 0B
cd /d "%~dp0"

:: Python kontrolü
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [HATA] Python yuklu degil!
    pause
    exit /b
)

:: Kütüphane kontrolü
python -c "import requests" >nul 2>&1
if %errorlevel% neq 0 (
    echo [BILGI] 'requests' yukleniyor...
    pip install requests
)

:: GUI Uygulamasını başlat (Terminal penceresi arka planda kalsın diye pythonw yerine python kullanıyoruz hata görmek için)
start /b pythonw sentient_publish_gui.py
exit
