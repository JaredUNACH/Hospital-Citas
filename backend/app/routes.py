from flask import Blueprint, request, jsonify
from google.oauth2 import id_token
from google.auth.transport import requests
from flask_login import login_user
from .models import db, Paciente

routes = Blueprint('routes', __name__)

CLIENT_ID = "312226628197-vuug8kd54rhent80sea8naghsj50crd4.apps.googleusercontent.com"  # Client ID de Google

@routes.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    paciente = Paciente.query.filter_by(email=email).first()
    if paciente and paciente.check_password(password):
        login_user(paciente)
        return jsonify({"message": "Inicio de sesión exitoso"}), 200
    else:
        return jsonify({"message": "Inicio de sesión fallido. Por favor, verifica tu correo y contraseña"}), 401

@routes.route('/google-login', methods=['POST'])
def google_login():
    token = request.json.get('tokenId')
    try:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)

        # El token de ID es válido. Obtener el ID de la cuenta de Google del usuario desde el token decodificado.
        google_id = idinfo['sub']
        email = idinfo['email']
        name = idinfo['name']

        # Buscar al usuario en la base de datos
        user = Paciente.query.filter_by(email=email).first()
        if user is None:
            return jsonify({'message': 'Usuario no registrado'}), 400

        # Aquí puedes manejar la lógica de inicio de sesión, como crear una sesión para el usuario.
        login_user(user)

        return jsonify({'message': 'Inicio de sesión exitoso', 'email': email, 'name': name}), 200
    except ValueError:
        # Token inválido
        return jsonify({'message': 'Error en el inicio de sesión'}), 400

@routes.route('/google-register', methods=['POST'])
def google_register():
    token = request.json.get('tokenId')
    try:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)

        # El token de ID es válido. Obtener el ID de la cuenta de Google del usuario desde el token decodificado.
        google_id = idinfo['sub']
        email = idinfo['email']
        name = idinfo['name']

        # Verificar si el usuario ya existe
        user = Paciente.query.filter_by(email=email).first()
        if user:
            return jsonify({'message': 'Usuario ya registrado'}), 400

        # Crear un nuevo usuario
        new_user = Paciente(
            nombre=name,
            apellido_paterno='',
            apellido_materno='',
            email=email,
            google_id=google_id,
            fecha_nacimiento='2000-01-01'  # Puedes ajustar esto según tus necesidades
        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'Registro exitoso', 'email': email, 'name': name}), 200
    except ValueError:
        # Token inválido
        return jsonify({'message': 'Error en el registro'}), 400