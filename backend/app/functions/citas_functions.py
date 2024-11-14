from ..models import db, Cita, Doctor, Especialidad

def get_citas_con_medico(paciente_id):
    citas = db.session.query(
        Cita.id,
        Cita.fecha,
        Cita.hora,
        Cita.estado,
        Cita.hora_inicio,
        Cita.hora_fin,
        Doctor.nombre.label('doctor_nombre'),
        Doctor.apellido_paterno.label('doctor_apellido_paterno'),
        Especialidad.nombre.label('especialidad_nombre')
    ).join(Doctor, Cita.medico_id == Doctor.id
    ).join(Especialidad, Doctor.especialidad_id == Especialidad.id
    ).filter(Cita.paciente_id == paciente_id
    ).all()

    citas_con_medico = []
    for cita in citas:
        citas_con_medico.append({
            'id': cita.id,
            'fecha': cita.fecha.isoformat(),
            'hora': cita.hora.strftime('%H:%M:%S'),
            'estado': cita.estado,
            'hora_inicio': cita.hora_inicio.strftime('%H:%M:%S'),
            'hora_fin': cita.hora_fin.strftime('%H:%M:%S'),
            'doctor_nombre': cita.doctor_nombre,
            'doctor_apellido_paterno': cita.doctor_apellido_paterno,
            'especialidad_nombre': cita.especialidad_nombre
        })

    return citas_con_medico