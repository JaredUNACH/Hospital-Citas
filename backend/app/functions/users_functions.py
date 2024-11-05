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
            'alergia_medicamentos': user.alergia_medicamentos
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
            'rol': admin.rol
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
            'especialidad': doctor.especialidad.nombre
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
        user.apellido_paterno = data.get('apellido_paterno', user.apellido_paterno)
        user.apellido_materno = data.get('apellido_materno', user.apellido_materno)
        user.curp = data.get('curp', user.curp)
        user.sexo = data.get('sexo', user.sexo)
        user.tipo_sangre = data.get('tipo_sangre', user.tipo_sangre)
        user.email = data.get('email', user.email)
        user.telefono = data.get('telefono', user.telefono)
        user.fecha_nacimiento = data.get('fecha_nacimiento', user.fecha_nacimiento)
        user.alergia_medicamentos = data.get('alergia_medicamentos', user.alergia_medicamentos)
        db.session.commit()
        return jsonify({'message': 'User info updated successfully'}), 200

    elif admin:
        data = request.json
        admin.apellido_paterno = data.get('apellido_paterno', admin.apellido_paterno)
        admin.apellido_materno = data.get('apellido_materno', admin.apellido_materno)
        admin.curp = data.get('curp', admin.curp)
        admin.sexo = data.get('sexo', admin.sexo)
        admin.tipo_sangre = data.get('tipo_sangre', admin.tipo_sangre)
        admin.email = data.get('email', admin.email)
        admin.telefono = data.get('telefono', admin.telefono)
        admin.fecha_nacimiento = data.get('fecha_nacimiento', admin.fecha_nacimiento)
        admin.alergia_medicamentos = data.get('alergia_medicamentos', admin.alergia_medicamentos)
        db.session.commit()
        return jsonify({'message': 'Admin info updated successfully'}), 200

    elif doctor:
        data = request.json
        doctor.apellido_paterno = data.get('apellido_paterno', doctor.apellido_paterno)
        doctor.apellido_materno = data.get('apellido_materno', doctor.apellido_materno)
        doctor.curp = data.get('curp', doctor.curp)
        doctor.sexo = data.get('sexo', doctor.sexo)
        doctor.tipo_sangre = data.get('tipo_sangre', doctor.tipo_sangre)
        doctor.email = data.get('email', doctor.email)
        doctor.telefono = data.get('telefono', doctor.telefono)
        doctor.fecha_nacimiento = data.get('fecha_nacimiento', doctor.fecha_nacimiento)
        doctor.alergia_medicamentos = data.get('alergia_medicamentos', doctor.alergia_medicamentos)
        db.session.commit()
        return jsonify({'message': 'Doctor info updated successfully'}), 200

    return jsonify({'message': 'User not found'}), 404