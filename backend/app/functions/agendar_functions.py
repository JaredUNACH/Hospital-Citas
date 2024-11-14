from ..models import db, Cita, Doctor, Paciente
from datetime import datetime, time, timedelta

def get_available_times(medico_id, fecha):
    # Convertir la fecha a un objeto datetime
    fecha_obj = datetime.strptime(fecha, '%Y-%m-%d').date()

    # Obtener las citas ya agendadas para el médico en la fecha especificada
    citas = Cita.query.filter_by(medico_id=medico_id, fecha=fecha_obj).all()
    citas_horas = [(cita.hora_inicio, cita.hora_fin) for cita in citas]

    available_times = []
    hora_inicio = time(8, 0)  # Inicio del horario de trabajo
    hora_fin = time(18, 0)  # Fin del horario de trabajo

    while hora_inicio < hora_fin:
        hora_fin_cita = (datetime.combine(datetime.today(), hora_inicio) + timedelta(minutes=30)).time()
        if not any(hora_inicio <= cita_inicio < hora_fin_cita or cita_inicio <= hora_inicio < cita_fin for cita_inicio, cita_fin in citas_horas):
            available_times.append(hora_inicio.strftime('%H:%M'))
        hora_inicio = (datetime.combine(datetime.today(), hora_inicio) + timedelta(minutes=40)).time()  # 30 minutes appointment + 10 minutes break

    return available_times

def create_appointment(data):
    paciente_id = data.get('paciente_id')
    medico_id = data.get('medico_id')
    fecha = data.get('fecha')
    hora = data.get('hora')
    estado = data.get('estado', 'pendiente')

    # Verificar que el paciente y el médico existan
    paciente = Paciente.query.get(paciente_id)
    medico = Doctor.query.get(medico_id)
    if not paciente or not medico:
        return {'message': 'Paciente o médico no encontrado'}, 404

    # Verificar que el horario esté disponible
    fecha_obj = datetime.strptime(fecha, '%Y-%m-%d').date()
    hora_obj = datetime.strptime(hora, '%H:%M').time()
    hora_fin_obj = (datetime.combine(datetime.today(), hora_obj) + timedelta(minutes=30)).time()
    cita_existente = Cita.query.filter_by(medico_id=medico_id, fecha=fecha_obj).filter(
        (Cita.hora_inicio <= hora_obj) & (hora_obj < Cita.hora_fin) |
        (hora_obj <= Cita.hora_inicio) & (Cita.hora_inicio < hora_fin_obj)
    ).first()
    if cita_existente:
        return {'message': 'El horario ya está ocupado'}, 400

    # Crear la nueva cita
    nueva_cita = Cita(
        paciente_id=paciente_id,
        medico_id=medico_id,
        fecha=fecha_obj,
        hora=hora_obj,
        estado=estado,
        hora_inicio=hora_obj,
        hora_fin=hora_fin_obj
    )
    db.session.add(nueva_cita)
    db.session.commit()
    return {'message': 'Cita creada exitosamente'}, 201