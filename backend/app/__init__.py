from flask import Flask
from config import Config
from .models import db, bcrypt
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from datetime import timedelta
import os
from dotenv import load_dotenv

def create_app():
    load_dotenv()  # Cargar variables de entorno desde el archivo .env

    app = Flask(__name__)
    app.config.from_object(Config)

    # Configuración de JWT
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'af03f15da847ebb6e355fdcdc397fc4794b30b4b5f3045f4')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
    jwt = JWTManager(app)

    db.init_app(app)
    bcrypt.init_app(app)
    migrate = Migrate(app, db)
    login_manager = LoginManager(app)
    login_manager.login_view = 'main.login'
    
    # Habilitar CORS con credenciales
    CORS(app, supports_credentials=True)

    from .routes import routes  # Importar las rutas
    app.register_blueprint(routes)  # Registrar el blueprint de las rutas

    return app