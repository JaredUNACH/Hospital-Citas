from flask_mail import Message
from ..models import Paciente, Doctor, Administrador
from .. import mail
from datetime import datetime
from datetime import timedelta

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

    # Crear el enlace para agregar la cita al calendario
    start_time = datetime.strptime(f"{fecha} {hora}", '%Y-%m-%d %H:%M').isoformat()
    end_time = (datetime.strptime(f"{fecha} {hora}", '%Y-%m-%d %H:%M') + timedelta(hours=1)).isoformat()
    calendar_url = f"https://www.google.com/calendar/render?action=TEMPLATE&text=Cita+con+Dr.+{medico.nombre}+{medico.apellido_paterno}&dates={start_time.replace('-', '').replace(':', '')}/{end_time.replace('-', '').replace(':', '')}&details=Tu+cita+con+el+Dr.+{medico.nombre}+{medico.apellido_paterno}+ha+sido+confirmada.&location=Hospital&sf=true&output=xml"

    # Crear el mensaje de correo electrónico
    msg = Message('Confirmación de Cita Médica',
                  sender='jared.salazar65@unach.mx',
                  recipients=[paciente.email])
    msg.body = f'Hola {paciente.nombre},\n\nTu cita con el Dr. {medico.nombre} {medico.apellido_paterno} ha sido confirmada para el {fecha} a las {hora}.\n\nPuedes agregar esta cita a tu calendario haciendo clic en el siguiente enlace:\n{calendar_url}\n\nGracias,\nHospital'

    try:
        mail.send(msg)
        return {'message': 'Correo de confirmación enviado'}, 200
    except Exception as e:
        return {'error': str(e)}, 500

def send_login_notification_email(user_id, role):
    # Obtener la información del usuario según su rol
    if role == 'usuario':
        user = Paciente.query.get(user_id)
    elif role == 'medico':
        user = Doctor.query.get(user_id)
    elif role == 'administrador':
        user = Administrador.query.get(user_id)
    else:
        return {'error': 'Rol no válido'}, 400

    if not user:
        return {'error': 'Usuario no encontrado'}, 404

    # Obtener la hora actual
    login_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # Crear el mensaje de correo electrónico
    msg = Message('Notificación de Inicio de Sesión',
                  sender='jared.salazar65@unach.mx',
                  recipients=[user.email])
    msg.body = f'Hola {user.nombre},\n\nHas iniciado sesión en Medical Care el {login_time}.\n\nGracias,\nMedical Care'

    try:
        mail.send(msg)
        return {'message': 'Correo de notificación de inicio de sesión enviado'}, 200
    except Exception as e:
        return {'error': str(e)}, 500