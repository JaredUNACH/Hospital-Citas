from ..models import db, Cita, Paciente, Doctor, Especialidad
from datetime import datetime, timedelta

def get_citas_medico(medico_id):
    today = datetime.now().date()
    tomorrow = today + timedelta(days=1)

    citas = db.session.query(
        Cita.id,
        Cita.fecha,
        Cita.hora,
        Cita.estado,
        Cita.hora_inicio,
        Cita.hora_fin,
        Paciente.nombre.label('paciente_nombre'),
        Paciente.apellido_paterno.label('paciente_apellido_paterno'),
        Especialidad.nombre.label('especialidad_nombre')
    ).join(Paciente, Cita.paciente_id == Paciente.id
    ).join(Doctor, Cita.medico_id == Doctor.id
    ).join(Especialidad, Doctor.especialidad_id == Especialidad.id
    ).filter(Cita.medico_id == medico_id
    ).filter(Cita.fecha >= today, Cita.fecha <= tomorrow
    ).all()

    citas_medico = []
    for cita in citas:
        citas_medico.append({
            'id': cita.id,
            'fecha': cita.fecha.isoformat(),
            'hora': cita.hora.strftime('%H:%M:%S'),
            'estado': cita.estado,
            'hora_inicio': cita.hora_inicio.strftime('%H:%M:%S'),
            'hora_fin': cita.hora_fin.strftime('%H:%M:%S'),
            'paciente_nombre': cita.paciente_nombre,
            'paciente_apellido_paterno': cita.paciente_apellido_paterno,
            'especialidad_nombre': cita.especialidad_nombre
        })

    return citas_medico