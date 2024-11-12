from ..models import db, Administrador

def add_admin(data):
    nuevo_admin = Administrador(
        nombre=data['nombre'],
        apellido_paterno=data.get('apellido_paterno'),
        apellido_materno=data.get('apellido_materno'),
        email=data['email'],
        curp=data.get('curp'),
        sexo=data.get('sexo'),
        tipo_sangre=data.get('tipo_sangre'),
        telefono=data.get('telefono'),
        fecha_nacimiento=data.get('fecha_nacimiento'),
        alergia_medicamentos=data.get('alergia_medicamentos'),
        profile_picture=data.get('profile_picture')
    )
    nuevo_admin.set_password(data['password'])
    db.session.add(nuevo_admin)
    db.session.commit()
    return {'message': 'Administrador agregado exitosamente'}, 201

def update_admin(id, data):
    admin = Administrador.query.get(id)
    if not admin:
        return {'message': 'Administrador no encontrado'}, 404

    admin.nombre = data.get('nombre', admin.nombre)
    admin.apellido_paterno = data.get('apellido_paterno', admin.apellido_paterno)
    admin.apellido_materno = data.get('apellido_materno', admin.apellido_materno)
    admin.email = data.get('email', admin.email)
    admin.curp = data.get('curp', admin.curp)
    admin.sexo = data.get('sexo', admin.sexo)
    admin.tipo_sangre = data.get('tipo_sangre', admin.tipo_sangre)
    admin.telefono = data.get('telefono', admin.telefono)
    admin.fecha_nacimiento = data.get('fecha_nacimiento', admin.fecha_nacimiento)
    admin.alergia_medicamentos = data.get('alergia_medicamentos', admin.alergia_medicamentos)
    admin.profile_picture = data.get('profile_picture', admin.profile_picture)

    if 'password' in data:
        admin.set_password(data['password'])

    db.session.commit()
    return {'message': 'Administrador actualizado exitosamente'}, 200

def delete_admin(id):
    admin = Administrador.query.get(id)
    if not admin:
        return {'message': 'Administrador no encontrado'}, 404

    db.session.delete(admin)
    db.session.commit()
    return {'message': 'Administrador eliminado exitosamente'}, 200

def get_admins():
    admins = Administrador.query.all()
    return [{
        'id': admin.id,
        'nombre': admin.nombre,
        'apellido_paterno': admin.apellido_paterno,
        'apellido_materno': admin.apellido_materno,
        'curp': admin.curp,
        'sexo': admin.sexo,
        'tipo_sangre': admin.tipo_sangre,
        'email': admin.email,
        'telefono': admin.telefono,
        'fecha_nacimiento': admin.fecha_nacimiento,
        'alergia_medicamentos': admin.alergia_medicamentos,
        'profile_picture': admin.profile_picture
    } for admin in admins], 200

def get_admin(id):
    admin = Administrador.query.get(id)
    if not admin:
        return {'message': 'Administrador no encontrado'}, 404

    return {
        'id': admin.id,
        'nombre': admin.nombre,
        'apellido_paterno': admin.apellido_paterno,
        'apellido_materno': admin.apellido_materno,
        'curp': admin.curp,
        'sexo': admin.sexo,
        'tipo_sangre': admin.tipo_sangre,
        'email': admin.email,
        'telefono': admin.telefono,
        'fecha_nacimiento': admin.fecha_nacimiento,
        'alergia_medicamentos': admin.alergia_medicamentos,
        'profile_picture': admin.profile_picture
    }, 200