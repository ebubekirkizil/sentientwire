@echo off
setlocal

:: PROJE ADI
set PROJECT_NAME=SentientWire

echo [1/3] Değişiklikler taranıyor...
git add .

echo [2/3] Paketleme yapılıyor (Auto-Commit)...
set commit_msg="Update SentientWire: %date% %time%"
git commit -m %commit_msg%

echo [3/3] Buluta gönderiliyor (Push)...
git push

echo.
echo ======================================================
echo  BAŞARILI: Kodlar GitHub'a gönderildi!
echo  Vercel şimdi otomatik olarak yayına alıyor.
echo  Birkaç dakika içinde canlı adreste görebilirsin.
echo ======================================================
echo.
pause
