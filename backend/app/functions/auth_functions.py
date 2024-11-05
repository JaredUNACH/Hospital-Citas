import re
from flask import jsonify, make_response, request
from flask_jwt_extended import create_access_token
from ..models import db, Paciente, Administrador
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

CLIENT_ID = "577245318494-v9611dklsktb7gn5re00kce0msqh06l4.apps.googleusercontent.com"

def validate_email(email):
    email_regex = re.compile(r'^[^\s@]+@[^\s@]+\.[^\s@]+$')
    return email_regex.match(email)

def login():
    email = request.json.get('email')
    password = request.json.get('password')

    if not validate_email(email):
        return jsonify({"message": "Correo electrónico inválido"}), 400

    paciente = Paciente.query.filter_by(email=email).first()
    admin = Administrador.query.filter_by(email=email).first()

    if paciente and paciente.check_password(password):
        access_token = create_access_token(identity={"id": paciente.id, "email": paciente.email, "rol": paciente.rol})
        response_data = {"message": "Inicio de sesión exitoso", "access_token": access_token}
        print('Login response:', response_data)
        response = make_response(jsonify(response_data), 200)
        response.set_cookie('token', access_token, httponly=True, secure=True, samesite='Strict')
        return response
    elif admin and admin.check_password(password):
        access_token = create_access_token(identity={"id": admin.id, "email": admin.email, "rol": admin.rol})
        response_data = {"message": "Inicio de sesión exitoso", "access_token": access_token}
        print('Login response:', response_data)
        response = make_response(jsonify(response_data), 200)
        response.set_cookie('token', access_token, httponly=True, secure=True, samesite='Strict')
        return response
    else:
        return jsonify({"message": "Inicio de sesión fallido. Por favor, verifica tu correo y contraseña"}), 401

def register():
    name = request.json.get('name')
    email = request.json.get('email')
    password = request.json.get('password')

    if not validate_email(email):
        return jsonify({"message": "Correo electrónico inválido"}), 400

    print(f"Registering user: {name}, {email}")

    user = Paciente.query.filter_by(email=email).first()
    if user:
        print("User already registered")
        return jsonify({'message': 'Usuario ya registrado'}), 400

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

    access_token = create_access_token(identity={"id": new_user.id, "email": new_user.email, "rol": new_user.rol})
    response_data = {'message': 'Registro exitoso', 'email': email, 'name': name, 'access_token': access_token}
    print('Register response:', response_data)
    response = make_response(jsonify(response_data), 200)
    response.set_cookie('token', access_token, httponly=True, secure=True, samesite='Strict')
    return response

def google_login():
    token = request.json.get('credential')
    try:
        idinfo = id_token.verify_oauth2_token(token, google_requests.Request(), CLIENT_ID)

        google_id = idinfo['sub']
        email = idinfo['email']
        name = idinfo['name']

        if not validate_email(email):
            return jsonify({"message": "Correo electrónico inválido"}), 400

        user = Paciente.query.filter_by(email=email).first()
        if user is None:
            return jsonify({'message': 'Usuario no registrado'}), 400

        access_token = create_access_token(identity={"id": user.id, "email": user.email, "rol": user.rol})
        response_data = {'message': 'Inicio de sesión exitoso', 'email': email, 'name': name, 'access_token': access_token}
        print('Google login response:', response_data)
        response = make_response(jsonify(response_data), 200)
        response.set_cookie('token', access_token, httponly=True, secure=True, samesite='Strict')
        return response
    except ValueError:
        return jsonify({'message': 'Error en el inicio de sesión'}), 400

def google_register():
    token = request.json.get('credential')
    if not token:
        print("Token is missing")
        return jsonify({"message": "Token is missing"}), 400

    try:
        print('Received token:', token)
        idinfo = id_token.verify_oauth2_token(token, google_requests.Request(), CLIENT_ID)
        print('Decoded token info:', idinfo)

        google_id = idinfo['sub']
        email = idinfo['email']
        name = idinfo['name']

        if not validate_email(email):
            print("Correo electrónico inválido")
            return jsonify({"message": "Correo electrónico inválido"}), 400

        user = Paciente.query.filter_by(email=email).first()
        if user:
            print(f"Usuario ya registrado con el correo: {email}")
            return jsonify({'message': 'Usuario ya registrado'}), 400

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

        access_token = create_access_token(identity={"id": new_user.id, "email": new_user.email, "rol": new_user.rol})
        response_data = {'message': 'Registro exitoso', 'email': email, 'name': name, 'access_token': access_token}
        print('Google register response:', response_data)
        response = make_response(jsonify(response_data), 200)
        response.set_cookie('token', access_token, httponly=True, secure=True, samesite='Strict')
        return response
    except ValueError as e:
        print('Token verification failed:', e)
        return jsonify({'message': 'Error en el registro'}), 400
    except Exception as e:
        print('Error en el registro:', e)
        return jsonify({'message': 'Error en el registro'}), 500