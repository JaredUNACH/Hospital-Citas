from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity
from ..models import db, Paciente, Administrador, Doctor

def user_info():
    current_user = get_jwt_identity()  # Obtiene la identidad del usuario actual desde el token JWT
    email = current_user['email']  # Extrae el email del diccionario current_user
    user = Paciente.query.filter_by(email=email).first()  # Busca el usuario en la base de datos
    admin = Administrador.query.filter_by(email=email).first()  # Busca el administrador en la base de datos
    doctor = Doctor.query.filter_by(email=email).first()  # Busca el doctor en la base de datos
    
    if user:
        return jsonify({
            'name': user.nombre,
            'apellido_paterno': user.apellido_paterno,
            'apellido_materno': user.apellido_materno,
            'curp': user.curp,
            'sexo': user.sexo,
            'tipo_sangre': user.tipo_sangre,
            'email': user.email,
            'telefono': user.telefono,
            'fecha_nacimiento': user.fecha_nacimiento,
            'alergia_medicamentos': user.alergia_medicamentos,
            'profile_picture': user.profile_picture  # Añadir la imagen de perfil
        }), 200  # Devuelve la información del usuario
    elif admin:
        return jsonify({
            'name': admin.nombre,
            'apellido_paterno': admin.apellido_paterno,
            'apellido_materno': admin.apellido_materno,
            'curp': admin.curp,
            'sexo': admin.sexo,
            'tipo_sangre': admin.tipo_sangre,
            'email': admin.email,
            'telefono': admin.telefono,
            'fecha_nacimiento': admin.fecha_nacimiento,
            'alergia_medicamentos': admin.alergia_medicamentos,
            'rol': admin.rol,
            'profile_picture': admin.profile_picture  # Añadir la imagen de perfil
        }), 200  # Devuelve la información del administrador
    elif doctor:
        return jsonify({
            'name': doctor.nombre,
            'apellido_paterno': doctor.apellido_paterno,
            'apellido_materno': doctor.apellido_materno,
            'curp': doctor.curp,
            'sexo': doctor.sexo,
            'tipo_sangre': doctor.tipo_sangre,
            'email': doctor.email,
            'telefono': doctor.telefono,
            'fecha_nacimiento': doctor.fecha_nacimiento,
            'alergia_medicamentos': doctor.alergia_medicamentos,
            'rol': doctor.rol,
            'especialidad': doctor.especialidad.nombre,
            'profile_picture': doctor.profile_picture  # Añadir la imagen de perfil
        }), 200  # Devuelve la información del doctor
    return jsonify(message="User not found"), 404  # Devuelve un mensaje de error si el usuario no se encuentra

def update_user_info():
    current_user = get_jwt_identity()  # Obtiene la identidad del usuario actual desde el token JWT
    email = current_user['email']  # Extrae el email del diccionario current_user
    user = Paciente.query.filter_by(email=email).first()  # Busca el usuario en la base de datos
    admin = Administrador.query.filter_by(email=email).first()  # Busca el administrador en la base de datos
    doctor = Doctor.query.filter_by(email=email).first()  # Busca el doctor en la base de datos

    if user:
        data = request.json
        user.apellido_paterno = data.get('apellido_paterno') or None
        user.apellido_materno = data.get('apellido_materno') or None
        user.curp = data.get('curp') or None
        user.sexo = data.get('sexo') or None
        user.tipo_sangre = data.get('tipo_sangre') or None
        user.email = data.get('email') or None
        user.telefono = data.get('telefono') or None
        user.fecha_nacimiento = data.get('fecha_nacimiento') or None
        user.alergia_medicamentos = data.get('alergia_medicamentos') or None
        user.profile_picture = data.get('profile_picture') or user.profile_picture  # Actualizar la imagen de perfil si se proporciona
        db.session.commit()
        return jsonify({'message': 'User info updated successfully'}), 200

    elif admin:
        data = request.json
        admin.apellido_paterno = data.get('apellido_paterno') or None
        admin.apellido_materno = data.get('apellido_materno') or None
        admin.curp = data.get('curp') or None
        admin.sexo = data.get('sexo') or None
        admin.tipo_sangre = data.get('tipo_sangre') or None
        admin.email = data.get('email') or None
        admin.telefono = data.get('telefono') or None
        admin.fecha_nacimiento = data.get('fecha_nacimiento') or None
        admin.alergia_medicamentos = data.get('alergia_medicamentos') or None
        admin.profile_picture = data.get('profile_picture') or admin.profile_picture  # Actualizar la imagen de perfil si se proporciona
        db.session.commit()
        return jsonify({'message': 'Admin info updated successfully'}), 200

    elif doctor:
        data = request.json
        doctor.apellido_paterno = data.get('apellido_paterno') or None
        doctor.apellido_materno = data.get('apellido_materno') or None
        doctor.curp = data.get('curp') or None
        doctor.sexo = data.get('sexo') or None
        doctor.tipo_sangre = data.get('tipo_sangre') or None
        doctor.email = data.get('email') or None
        doctor.telefono = data.get('telefono') or None
        doctor.fecha_nacimiento = data.get('fecha_nacimiento') or None
        doctor.alergia_medicamentos = data.get('alergia_medicamentos') or None
        doctor.profile_picture = data.get('profile_picture') or doctor.profile_picture  # Actualizar la imagen de perfil si se proporciona
        db.session.commit()
        return jsonify({'message': 'Doctor info updated successfully'}), 200

    return jsonify({'message': 'User not found'}), 404