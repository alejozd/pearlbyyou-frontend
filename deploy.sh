#!/bin/bash

# Script de despliegue para Pearl by You - Frontend

echo "🚀 Iniciando despliegue..."

# Navega a la carpeta del frontend
cd /var/www/pearlbyyou/frontend || { echo "❌ No se pudo acceder a la carpeta"; exit 1; }

# Detiene ejecución si hay un error
set -e

# 1. Actualiza el código desde GitHub
echo "📥 git pull..."
git pull origin main  # Cambia 'main' por 'master' si tu rama es master

# 2. Instala dependencias (si hay cambios en package.json)
echo "📦 npm install..."
npm install

# 3. Construye el frontend
echo "🔨 npm run build..."
npm run build

# 4. Elimina el build anterior y mueve el nuevo
echo "🗂️  Moviendo dist a build..."
rm -rf build
mv dist build

# 5. Reinicia Apache para limpiar caché (opcional)
echo "🔄 Reiniciando Apache..."
sudo systemctl reload apache2

echo "✅ Despliegue completado con éxito!"