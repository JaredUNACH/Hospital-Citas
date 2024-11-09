from ..models import db, Doctor, Especialidad

def add_doctor(data):
    especialidad = Especialidad.query.get(data['especialidad_id'])
    if not especialidad:
        return {'message': 'Especialidad no encontrada'}, 404

    nuevo_doctor = Doctor(
        nombre=data['nombre'],
        apellido_paterno=data.get('apellido_paterno'),
        apellido_materno=data.get('apellido_materno'),
        email=data['email'],
        especialidad_id=data['especialidad_id'],
        curp=data.get('curp'),
        sexo=data.get('sexo'),
        tipo_sangre=data.get('tipo_sangre'),
        telefono=data.get('telefono'),
        fecha_nacimiento=data.get('fecha_nacimiento'),
        alergia_medicamentos=data.get('alergia_medicamentos'),
        profile_picture=data.get('profile_picture')
    )
    nuevo_doctor.set_password(data['password'])
    db.session.add(nuevo_doctor)
    db.session.commit()
    return {'message': 'Doctor agregado exitosamente'}, 201

def update_doctor(id, data):
    doctor = Doctor.query.get(id)
    if not doctor:
        return {'message': 'Doctor no encontrado'}, 404

    if 'especialidad_id' in data:
        especialidad = Especialidad.query.get(data['especialidad_id'])
        if not especialidad:
            return {'message': 'Especialidad no encontrada'}, 404
        doctor.especialidad_id = data['especialidad_id']

    doctor.nombre = data.get('nombre', doctor.nombre)
    doctor.apellido_paterno = data.get('apellido_paterno', doctor.apellido_paterno)
    doctor.apellido_materno = data.get('apellido_materno', doctor.apellido_materno)
    doctor.email = data.get('email', doctor.email)
    doctor.curp = data.get('curp', doctor.curp)
    doctor.sexo = data.get('sexo', doctor.sexo)
    doctor.tipo_sangre = data.get('tipo_sangre', doctor.tipo_sangre)
    doctor.telefono = data.get('telefono', doctor.telefono)
    doctor.fecha_nacimiento = data.get('fecha_nacimiento', doctor.fecha_nacimiento)
    doctor.alergia_medicamentos = data.get('alergia_medicamentos', doctor.alergia_medicamentos)
    doctor.profile_picture = data.get('profile_picture', doctor.profile_picture)

    if 'password' in data:
        doctor.set_password(data['password'])

    db.session.commit()
    return {'message': 'Doctor actualizado exitosamente'}, 200

def delete_doctor(id):
    doctor = Doctor.query.get(id)
    if not doctor:
        return {'message': 'Doctor no encontrado'}, 404

    db.session.delete(doctor)
    db.session.commit()
    return {'message': 'Doctor eliminado exitosamente'}, 200

def get_doctors():
    doctors = Doctor.query.all()
    return [{
        'id': doctor.id,
        'nombre': doctor.nombre,
        'apellido_paterno': doctor.apellido_paterno,
        'apellido_materno': doctor.apellido_materno,
        'curp': doctor.curp,
        'sexo': doctor.sexo,
        'tipo_sangre': doctor.tipo_sangre,
        'email': doctor.email,
        'telefono': doctor.telefono,
        'fecha_nacimiento': doctor.fecha_nacimiento,
        'alergia_medicamentos': doctor.alergia_medicamentos,
        'especialidad': doctor.especialidad.nombre,
        'profile_picture': doctor.profile_picture
    } for doctor in doctors], 200

def get_doctor(id):
    doctor = Doctor.query.get(id)
    if not doctor:
        return {'message': 'Doctor no encontrado'}, 404

    return {
        'id': doctor.id,
        'nombre': doctor.nombre,
        'apellido_paterno': doctor.apellido_paterno,
        'apellido_materno': doctor.apellido_materno,
        'curp': doctor.curp,
        'sexo': doctor.sexo,
        'tipo_sangre': doctor.tipo_sangre,
        'email': doctor.email,
        'telefono': doctor.telefono,
        'fecha_nacimiento': doctor.fecha_nacimiento,
        'alergia_medicamentos': doctor.alergia_medicamentos,
        'especialidad': doctor.especialidad.nombre,
        'profile_picture': doctor.profile_picture
    }, 200