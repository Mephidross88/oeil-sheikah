@echo off
rem Relais d'auto-tracking de L'Oeil Sheikah (tools/soh-link/relay.mjs) : double-cliquer pour le lancer pendant qu'on
rem joue, fermer la fenetre pour l'arreter. Arguments transmis au relais (ex. --dump pour enregistrer les paquets).
chcp 65001 >nul
title Relais L'Oeil Sheikah
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js est introuvable : installez-le depuis https://nodejs.org puis relancez ce fichier.
  pause
  exit /b 1
)
node tools\soh-link\relay.mjs %*
echo.
echo Le relais s'est arrete.
pause
