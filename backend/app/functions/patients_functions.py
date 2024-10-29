from ..models import db, Paciente

def add_paciente(data):
    nuevo_paciente = Paciente(
        nombre=data['nombre'],
        apellido_paterno=data.get('apellido_paterno'),
        apellido_materno=data.get('apellido_materno'),
        curp=data.get('curp'),
        sexo=data.get('sexo'),
        tipo_sangre=data.get('tipo_sangre'),
        email=data['email'],
        telefono=data.get('telefono'),
        fecha_nacimiento=data.get('fecha_nacimiento'),
        alergia_medicamentos=data.get('alergia_medicamentos'),
        password=data['password'],
        rol=data['rol'],
        google_id=data.get('google_id'),
        historial_medico=data.get('historial_medico')
    )
    db.session.add(nuevo_paciente)
    db.session.commit()
    return {'message': 'Paciente agregado exitosamente'}, 201

def update_paciente(id, data):
    paciente = Paciente.query.get(id)
    if not paciente:
        return {'message': 'Paciente no encontrado'}, 404

    paciente.nombre = data.get('nombre', paciente.nombre)
    paciente.apellido_paterno = data.get('apellido_paterno', paciente.apellido_paterno)
    paciente.apellido_materno = data.get('apellido_materno', paciente.apellido_materno)
    paciente.curp = data.get('curp', paciente.curp)
    paciente.sexo = data.get('sexo', paciente.sexo)
    paciente.tipo_sangre = data.get('tipo_sangre', paciente.tipo_sangre)
    paciente.email = data.get('email', paciente.email)
    paciente.telefono = data.get('telefono', paciente.telefono)
    paciente.fecha_nacimiento = data.get('fecha_nacimiento', paciente.fecha_nacimiento)
    paciente.alergia_medicamentos = data.get('alergia_medicamentos', paciente.alergia_medicamentos)
    paciente.password = data.get('password', paciente.password)
    paciente.rol = data.get('rol', paciente.rol)
    paciente.google_id = data.get('google_id', paciente.google_id)
    paciente.historial_medico = data.get('historial_medico', paciente.historial_medico)

    db.session.commit()
    return {'message': 'Paciente actualizado exitosamente'}, 200

def delete_paciente(id):
    paciente = Paciente.query.get(id)
    if not paciente:
        return {'message': 'Paciente no encontrado'}, 404

    db.session.delete(paciente)
    db.session.commit()
    return {'message': 'Paciente eliminado exitosamente'}, 200

def get_pacientes():
    pacientes = Paciente.query.all()
    return [{
        'id': paciente.id,
        'nombre': paciente.nombre,
        'apellido_paterno': paciente.apellido_paterno,
        'apellido_materno': paciente.apellido_materno,
        'curp': paciente.curp,
        'sexo': paciente.sexo,
        'tipo_sangre': paciente.tipo_sangre,
        'email': paciente.email,
        'telefono': paciente.telefono,
        'fecha_nacimiento': paciente.fecha_nacimiento,
        'alergia_medicamentos': paciente.alergia_medicamentos,
        'fecha_registro': paciente.fecha_registro,
        'rol': paciente.rol,
        'google_id': paciente.google_id,
        'historial_medico': paciente.historial_medico
    } for paciente in pacientes], 200

def get_paciente(id):
    paciente = Paciente.query.get(id)
    if not paciente:
        return {'message': 'Paciente no encontrado'}, 404

    return {
        'id': paciente.id,
        'nombre': paciente.nombre,
        'apellido_paterno': paciente.apellido_paterno,
        'apellido_materno': paciente.apellido_materno,
        'curp': paciente.curp,
        'sexo': paciente.sexo,
        'tipo_sangre': paciente.tipo_sangre,
        'email': paciente.email,
        'telefono': paciente.telefono,
        'fecha_nacimiento': paciente.fecha_nacimiento,
        'alergia_medicamentos': paciente.alergia_medicamentos,
        'fecha_registro': paciente.fecha_registro,
        'rol': paciente.rol,
        'google_id': paciente.google_id,
        'historial_medico': paciente.historial_medico
    }, 200