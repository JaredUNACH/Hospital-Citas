from flask_mail import Message
from ..models import Paciente, Doctor
from .. import mail
from datetime import datetime

def send_welcome_email(paciente_id):
    # Obtener la información del paciente
    paciente = Paciente.query.get(paciente_id)

    if not paciente:
        return {'error': 'Paciente no encontrado'}, 404

    # Crear el mensaje de correo electrónico
    msg = Message('Bienvenido a Medical Care',
                  sender='jared.salazar65@unach.mx',
                  recipients=[paciente.email])
    msg.body = f'Hola {paciente.nombre},\n\nBienvenido a Medical Care. Estamos encantados de tenerte con nosotros.\n\nGracias,\nMedical Care'

    try:
        mail.send(msg)
        return {'message': 'Correo de bienvenida enviado'}, 200
    except Exception as e:
        return {'error': str(e)}, 500

def send_confirmation_email(paciente_id, medico_id, fecha, hora):
    # Obtener la información del paciente y del médico
    paciente = Paciente.query.get(paciente_id)
    medico = Doctor.query.get(medico_id)

    if not paciente or not medico:
        return {'error': 'Paciente o médico no encontrado'}, 404

    # Crear el mensaje de correo electrónico
    msg = Message('Confirmación de Cita Médica',
                  sender='jared.salazar65@unach.mx',
                  recipients=[paciente.email])
    msg.body = f'Hola {paciente.nombre},\n\nTu cita con el Dr. {medico.nombre} {medico.apellido_paterno} ha sido confirmada para el {fecha} a las {hora}.\n\nGracias,\nHospital'

    try:
        mail.send(msg)
        return {'message': 'Correo de confirmación enviado'}, 200
    except Exception as e:
        return {'error': str(e)}, 500

def send_login_notification_email(paciente_id):
    # Obtener la información del paciente
    paciente = Paciente.query.get(paciente_id)

    if not paciente:
        return {'error': 'Paciente no encontrado'}, 404

    # Obtener la hora actual
    login_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # Crear el mensaje de correo electrónico
    msg = Message('Notificación de Inicio de Sesión',
                  sender='jared.salazar65@unach.mx',
                  recipients=[paciente.email])
    msg.body = f'Hola {paciente.nombre},\n\nHas iniciado sesión en Medical Care el {login_time}.\n\nGracias,\nMedical Care'

    try:
        mail.send(msg)
        return {'message': 'Correo de notificación de inicio de sesión enviado'}, 200
    except Exception as e:
        return {'error': str(e)}, 500