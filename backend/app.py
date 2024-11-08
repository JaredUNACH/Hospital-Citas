from flask import Flask
from flask_cors import CORS
from app.routes import routes
from .config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app, resources=Config.CORS_RESOURCES)  # Habilita CORS para todas las rutas

    # Registra el Blueprint de las rutas
    app.register_blueprint(routes)

    return app