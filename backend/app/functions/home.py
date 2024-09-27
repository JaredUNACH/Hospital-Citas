from flask import Flask
from flask_socketio import SocketIO, emit
from flask_migrate import Migrate
from ..models import db, Especialidad
from ..routes import routes
import os
from dotenv import load_dotenv

load_dotenv()  # Cargar variables de entorno desde el archivo .env

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI', 'postgresql://postgres:your_password@localhost/your_database_name')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)
socketio = SocketIO(app, cors_allowed_origins="*")

app.register_blueprint(routes)

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('request_specialties')
def handle_request_specialties():
    specialties = Especialidad.query.all()
    specialties_list = [{'id': specialty.id, 'nombre': specialty.nombre} for specialty in specialties]
    emit('specialties_data', specialties_list)

if __name__ == '__main__':
    socketio.run(app, debug=True)