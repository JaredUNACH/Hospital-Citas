from flask import Flask, send_from_directory
from config import Config
from .models import db, bcrypt
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO
from datetime import timedelta
import os
from dotenv import load_dotenv

# Inicializar Flask-SocketIO
socketio = SocketIO()

def create_app():
    load_dotenv()  # Cargar variables de entorno desde el archivo .env

    app = Flask(__name__)
    app.config.from_object(Config)

    # Configuración de JWT
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'af03f15da847ebb6e355fdcdc397fc4794304b5f3045f4')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
    jwt = JWTManager(app)

    # Inicializar extensiones
    db.init_app(app)
    bcrypt.init_app(app)
    migrate = Migrate(app, db)
    login_manager = LoginManager(app)
    login_manager.login_view = 'main.login'
    
    # Habilita CORS con credenciales
    CORS(app, supports_credentials=True)

    # Configurar cookies seguras
    app.config['SESSION_COOKIE_SECURE'] = True  # Asegura que las cookies solo se envíen a través de HTTPS
    app.config['REMEMBER_COOKIE_SECURE'] = True  # Asegura que las cookies de "remember me" solo se envíen a través de HTTPS

    # Configurar Content Security Policy (CSP)
    @app.after_request
    def add_security_headers(response):
        csp = app.config.get('CSP', {})
        csp_header = "; ".join([f"{k} {v}" for k, v in csp.items()])
        response.headers['Content-Security-Policy'] = csp_header
        return response

    # Inicializar Flask-SocketIO
    socketio.init_app(app, cors_allowed_origins="*")

    # Importar y registrar las rutas
    from .routes import routes
    app.register_blueprint(routes)

    # Configurar la ruta para servir archivos estáticos
    @app.route('/uploads/profile_pictures/<path:filename>')
    def uploaded_file(filename):
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

    return app

# Importar los eventos de WebSocket
from .functions import home