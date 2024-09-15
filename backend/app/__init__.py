from flask import Flask
from config import Config
from .models import db, bcrypt
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_cors import CORS  # Importar CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    bcrypt.init_app(app)
    migrate = Migrate(app, db)
    login_manager = LoginManager(app)
    login_manager.login_view = 'main.login'
    
    CORS(app)  # Habilitar CORS

    from .routes import main
    app.register_blueprint(main)

    return app