import os
import sys
from gevent import monkey

# Hacer el monkey-patching antes de cualquier otra importación
monkey.patch_all()

from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
from app import create_app
from dotenv import load_dotenv

# Cargar variables de entorno desde el archivo .env
load_dotenv()

# Añadir el directorio 'backend' al sys.path para que las importaciones funcionen correctamente
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), 'app')))

app = create_app()

# Configurar CORS para permitir solicitudes desde tu frontend
CORS(app, resources={r"/*": {"origins": "https://hospital-citas-frontend.onrender.com"}})
socketio = SocketIO(app, cors_allowed_origins="https://hospital-citas-frontend.onrender.com", async_mode='gevent')

if __name__ == '__main__':
    socketio.run(app, debug=True)