@echo off
setlocal

:: PROJE ADI
set PROJECT_NAME=SentientWire

echo.
echo [1/3] Değişiklikler taranıyor...
git add .

echo [2/3] Paketleme yapılıyor (Auto-Commit)...
set commit_msg="Update SentientWire: %date% %time%"
git commit -m %commit_msg%

echo [3/3] Buluta gönderiliyor (Push)...
git push

:: Eğer işlem başarılıysa ekranı yeşil yap (2: Yeşil Arkaplan, F: Beyaz Yazı)
if %ERRORLEVEL% EQU 0 (
    color 2F
    echo.
    echo ======================================================
    echo  BAŞARILI: Kodlar GitHub'a gönderildi!
    echo  Vercel şimdi otomatik olarak yayına alıyor.
    echo  Birkaç dakika içinde canlı adreste görebilirsin.
    echo ======================================================
    echo.
) else (
    color 4F
    echo.
    echo ======================================================
    echo  HATA: Bir sorun oluştu! İnternet bağlantını veya
    echo  GitHub yetkilerini kontrol et.
    echo ======================================================
    echo.
)

pause
