@echo off
title SENTIENT WIRE - HIZLI HABER YAYINLA
color 0B
cd /d "%~dp0"

echo.
echo ======================================================
echo    SENTIENT WIRE AI OTOMASYON TERMINALI
echo ======================================================
echo.

:: Python yüklü mü kontrol et
python --version >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo [HATA] Python sisteminizde yuklu degil!
    echo Lutfen Python yukleyin ve PATH'e ekleyin.
    pause
    exit /b
)

:: Requests kütüphanesi yüklü mü kontrol et
python -c "import requests" >nul 2>&1
if %errorlevel% neq 0 (
    echo [BILGI] 'requests' kütüphanesi yukleniyor...
    pip install requests
)

:: Scripti çalıştır
python quick-publish.py

pause
