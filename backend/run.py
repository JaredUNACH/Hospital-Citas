from flask import Flask, send_from_directory
from app import create_app, socketio
from dotenv import load_dotenv
import os

load_dotenv()  # Cargar variables de entorno desde el archivo .env

app = create_app()

# Ruta para servir los archivos estáticos de React
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists("frontend/build/" + path):
        return send_from_directory('frontend/build', path)
    else:
        return send_from_directory('frontend/build', 'index.html')

if __name__ == '__main__':
    socketio.run(app, debug=True)