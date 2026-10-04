@echo off
rem Capture de la position des checks en jouant (tools/soh-maps/capture_positions.mjs) : a lancer A LA PLACE du relais
rem habituel (meme port). Chaque check ramasse est note dans tools/soh-maps/positions.json. Fermer la fenetre pour arreter.
chcp 65001 >nul
title Capture des positions - L'Oeil Sheikah
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js est introuvable : installez-le depuis https://nodejs.org puis relancez ce fichier.
  pause
  exit /b 1
)
node tools\soh-maps\capture_positions.mjs %*
echo.
echo La capture s'est arretee.
pause
