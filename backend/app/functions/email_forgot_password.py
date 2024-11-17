from flask_mail import Message
from ..models import Paciente
from .. import mail, db
from datetime import datetime, timedelta
import random
import string

def generate_verification_code(length=6):
    """Genera un código de verificación aleatorio de la longitud especificada."""
    return ''.join(random.choices(string.digits, k=length))

def send_forgot_password_email(email):
    # Obtener la información del paciente
    paciente = Paciente.query.filter_by(email=email).first()

    if not paciente:
        return {'error': 'Paciente no encontrado'}, 404

    # Generar un código de verificación
    verification_code = generate_verification_code()

    # Guardar el código de verificación en la base de datos
    paciente.verification_code = verification_code
    paciente.verification_code_sent_at = datetime.now()
    db.session.commit()

    # Crear el mensaje de correo electrónico
    msg = Message('Código de Verificación para Recuperar Contraseña',
                  sender='jared.salazar65@unach.mx',
                  recipients=[paciente.email])
    msg.body = f'Hola {paciente.nombre},\n\nTu código de verificación para recuperar tu contraseña es: {verification_code}\n\nGracias,\nMedical Care'

    try:
        mail.send(msg)
        return {'message': 'Correo de verificación enviado'}, 200
    except Exception as e:
        return {'error': str(e)}, 500

def verify_code(email, verification_code):
    # Obtener la información del paciente
    paciente = Paciente.query.filter_by(email=email).first()

    if not paciente:
        return {'error': 'Paciente no encontrado'}, 404

    # Verificar el código de verificación y su validez
    if paciente.verification_code != verification_code:
        return {'error': 'Código de verificación incorrecto'}, 400

    # Verificar si el código ha expirado (por ejemplo, 10 minutos de validez)
    if datetime.now() > paciente.verification_code_sent_at + timedelta(minutes=10):
        return {'error': 'Código de verificación expirado'}, 400

    return {'message': 'Código de verificación correcto'}, 200

def reset_password(email, new_password):
    # Obtener la información del paciente
    paciente = Paciente.query.filter_by(email=email).first()

    if not paciente:
        return {'error': 'Paciente no encontrado'}, 404

    # Restablecer la contraseña del paciente
    paciente.set_password(new_password)  # Utiliza el método set_password para hashear la contraseña
    paciente.verification_code = None  # Limpiar el código de verificación
    paciente.verification_code_sent_at = None  # Limpiar la fecha de envío del código
    db.session.commit()

    return {'message': 'Contraseña restablecida correctamente'}, 200