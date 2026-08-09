#!/bin/bash

# Jalankan backend FastAPI di background port 8000
echo "Starting FastAPI Backend..."
cd /app/server
/usr/local/bin/uv run uvicorn app.main:app --host 127.0.0.1 --port 8000 &
BACKEND_PID=$!

# Tunggu sebentar untuk memastikan backend sudah siap
sleep 3

# Jalankan frontend Next.js menggunakan PORT yang diberikan oleh Render
echo "Starting Next.js Frontend on port $PORT..."
cd /app/frontend
# Next.js menggunakan variable $PORT secara otomatis saat npm start
npm start &
FRONTEND_PID=$!

# Menjaga container tetap berjalan jika kedua proses masih hidup
wait -n $BACKEND_PID $FRONTEND_PID

# Jika salah satu proses mati, hentikan semuanya dan keluar
echo "One of the processes exited. Shutting down..."
kill -TERM $BACKEND_PID
kill -TERM $FRONTEND_PID
wait $BACKEND_PID
wait $FRONTEND_PID
exit 1
