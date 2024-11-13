from ..models import db, HorarioDisponibilidad, Cita, Doctor, Paciente
from datetime import datetime, time, timedelta

def get_available_times(medico_id, fecha):
    # Convertir la fecha a un objeto datetime
    fecha_obj = datetime.strptime(fecha, '%Y-%m-%d').date()
    dia_semana = fecha_obj.strftime('%A').lower()  # Obtener el día de la semana en minúsculas

    # Obtener los horarios de disponibilidad del médico para el día de la semana
    horarios = HorarioDisponibilidad.query.filter_by(medico_id=medico_id, dia_semana=dia_semana).all()

    # Obtener las citas ya agendadas para el médico en la fecha especificada
    citas = Cita.query.filter_by(medico_id=medico_id, fecha=fecha_obj).all()
    citas_horas = [cita.hora for cita in citas]

    available_times = []
    for horario in horarios:
        hora_inicio = horario.hora_inicio
        while hora_inicio < horario.hora_fin:
            if hora_inicio not in citas_horas:
                available_times.append(hora_inicio.strftime('%H:%M'))
            hora_inicio = (datetime.combine(datetime.today(), hora_inicio) + timedelta(minutes=30)).time()

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
    cita_existente = Cita.query.filter_by(medico_id=medico_id, fecha=fecha_obj, hora=hora_obj).first()
    if cita_existente:
        return {'message': 'El horario ya está ocupado'}, 400

    # Crear la nueva cita
    nueva_cita = Cita(
        paciente_id=paciente_id,
        medico_id=medico_id,
        fecha=fecha_obj,
        hora=hora_obj,
        estado=estado
    )
    db.session.add(nueva_cita)
    db.session.commit()
    return {'message': 'Cita creada exitosamente'}, 201