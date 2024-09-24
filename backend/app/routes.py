from flask import Blueprint, request, jsonify, make_response
from google.oauth2 import id_token
from google.auth.transport import requests
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .models import db, Paciente

routes = Blueprint('routes', __name__)

CLIENT_ID = "312226628197-vuug8kd54rhent80sea8naghsj50crd4.apps.googleusercontent.com"  # Client ID de Google

@routes.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    paciente = Paciente.query.filter_by(email=email).first()
    if paciente and paciente.check_password(password):
        access_token = create_access_token(identity={"id": paciente.id, "email": paciente.email})
        response_data = {"message": "Inicio de sesión exitoso", "token": access_token}
        print('Login response:', response_data)  # Verifica la respuesta del servidor
        response = make_response(jsonify(response_data), 200)
        response.set_cookie('token', access_token, httponly=True, secure=True, samesite='Strict')
        return response
    else:
        return jsonify({"message": "Inicio de sesión fallido. Por favor, verifica tu correo y contraseña"}), 401

@routes.route('/register', methods=['POST'])
def register():
    name = request.json.get('name')
    email = request.json.get('email')
    password = request.json.get('password')

    print(f"Registering user: {name}, {email}")

    # Verifica si el usuario ya existe
    user = Paciente.query.filter_by(email=email).first()
    if user:
        print("User already registered")
        return jsonify({'message': 'Usuario ya registrado'}), 400

    # Crear un nuevo usuario
    new_user = Paciente(
        nombre=name,
        apellido_paterno='',
        apellido_materno='',
        email=email,
        fecha_nacimiento='2000-01-01'  
    )
    new_user.set_password(password)  
    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity={"id": new_user.id, "email": new_user.email})
    response_data = {'message': 'Registro exitoso', 'email': email, 'name': name, 'token': access_token}
    print('Register response:', response_data)  # Verifica la respuesta del servidor
    response = make_response(jsonify(response_data), 200)
    response.set_cookie('token', access_token, httponly=True, secure=True, samesite='Strict')
    return response

@routes.route('/google-login', methods=['POST'])
def google_login():
    token = request.json.get('credential')
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

        # Crear un token de acceso
        access_token = create_access_token(identity={"id": user.id, "email": user.email})
        response_data = {'message': 'Inicio de sesión exitoso', 'email': email, 'name': name, 'token': access_token}
        print('Google login response:', response_data)  # Verifica la respuesta del servidor
        response = make_response(jsonify(response_data), 200)
        response.set_cookie('token', access_token, httponly=True, secure=True, samesite='Strict')
        return response
    except ValueError:
        # Token inválido
        return jsonify({'message': 'Error en el inicio de sesión'}), 400

@routes.route('/google-register', methods=['POST'])
def google_register():
    token = request.json.get('credential')
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

        # Crea un nuevo usuario
        new_user = Paciente(
            nombre=name,
            apellido_paterno='',
            apellido_materno='',
            email=email,
            google_id=google_id,
            fecha_nacimiento='2000-01-01'  
        )
        db.session.add(new_user)
        db.session.commit()

        # Crea un token de acceso
        access_token = create_access_token(identity={"id": new_user.id, "email": new_user.email})
        response_data = {'message': 'Registro exitoso', 'email': email, 'name': name, 'token': access_token}
        print('Google register response:', response_data)  # Verifica la respuesta del servidor
        response = make_response(jsonify(response_data), 200)
        response.set_cookie('token', access_token, httponly=True, secure=True, samesite='Strict')
        return response
    except ValueError:
        # Token inválido
        return jsonify({'message': 'Error en el registro'}), 400

@routes.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200