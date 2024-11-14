from flask import Blueprint, request, jsonify, make_response
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_cors import cross_origin
from .functions.auth_functions import login, register, google_login, google_register  # Importa las funciones de autenticación
from .functions.users_functions import user_info, update_user_info  # Importa las funciones de usuario
from .models import db, Paciente, Administrador, Especialidad, Doctor, Cita  # Asegúrate de importar Cita
from .functions.patients_functions import add_paciente, update_paciente, delete_paciente, get_pacientes, get_paciente
from .functions.pdf_functions import generate_pdf  # Importa la función para generar PDF de pacientes
from .functions.generate_doctors_pdf import generate_doctors_pdf  # Importa la función para generar PDF de médicos
from .functions.generate_admins_pdf import generate_admins_pdf  # Importa la función para generar PDF de administradores
from .functions.medicos_functions import add_doctor, update_doctor, delete_doctor, get_doctors, get_doctor  # Importa las funciones de médicos
from .functions.admin_functions import add_admin, update_admin, delete_admin, get_admins, get_admin  # Importa las funciones de administradores
from .functions.agendar_functions import get_available_times, create_appointment  # Importa las funciones de agendar citas
from .functions.citas_functions import get_citas_con_medico  # Importa la función para obtener citas con información del médico
from .functions.email_functions import send_welcome_email, send_confirmation_email, send_login_notification_email  # Importa las funciones de correo electrónico
from .functions.upload_functions import upload_profile_picture as upload_profile_picture_function  # Importa la función de subida de imágenes
from .functions.citas_medicos_functions import get_citas_medico  # Importa la función para obtener citas del médico
from . import mail

from werkzeug.utils import secure_filename
import os

# Crea un Blueprint para las rutas
routes = Blueprint('routes', __name__)

# Configura el limitador de tasa para las solicitudes
limiter = Limiter(
    get_remote_address,
    app=None,
    default_limits=["200 per day", "50 per hour"]  # Límites por defecto: 200 por día, 50 por hora
)

# Definir la carpeta de subida y las extensiones permitidas
UPLOAD_FOLDER = 'uploads/profile_pictures'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# Asegúrate de que la carpeta de subida exista
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Ruta para el inicio de sesión
@routes.route('/login', methods=['POST'])
@limiter.limit("5 per minute")  # Limita a 5 solicitudes por minuto
def login_route():
    return login()  # Llama a la función de inicio de sesión

# Ruta para el registro de usuarios
@routes.route('/register', methods=['POST'])
@limiter.limit("5 per minute")  # Limita a 5 solicitudes por minuto
def register_route():
    return register()  # Llama a la función de registro

# Ruta para el inicio de sesión con Google
@routes.route('/google-login', methods=['POST'])
@limiter.limit("5 per minute")  # Limita a 5 solicitudes por minuto
def google_login_route():
    return google_login()  # Llama a la función de inicio de sesión con Google

# Ruta para el registro con Google
@routes.route('/google-register', methods=['POST'])
@limiter.limit("5 per minute")  # Limita a 5 solicitudes por minuto
def google_register_route():
    return google_register()  # Llama a la función de registro con Google

# Ruta protegida que requiere autenticación JWT
@routes.route('/protected', methods=['GET'])
@jwt_required()  # Requiere un token JWT válido
@limiter.limit("10 per minute")  # Limita a 10 solicitudes por minuto
def protected():
    current_user = get_jwt_identity()  # Obtiene la identidad del usuario actual desde el token JWT
    return jsonify(logged_in_as=current_user), 200  # Devuelve la identidad del usuario en la respuesta

# Ruta para obtener las especialidades
@routes.route('/specialties', methods=['GET'])
def get_specialties():
    specialties = Especialidad.query.all()
    specialties_list = [{'id': specialty.id, 'nombre': specialty.nombre} for specialty in specialties]
    return jsonify(specialties_list)

# Nueva ruta para obtener la información del usuario logueado
@routes.route('/user-info', methods=['GET'])
@jwt_required()  # Requiere un token JWT válido
def user_info_route():
    return user_info()  # Llama a la función user_info

# Ruta para actualizar la información del usuario
@routes.route('/update-user-info', methods=['PUT'])
@jwt_required()  # Requiere un token JWT válido
def update_user_info_route():
    return update_user_info()  # Llama a la función update_user_info

#------------------------------------ Rutas de pacientes ------------------------------------#
# Ruta para insertar un nuevo paciente
@routes.route('/pacientes', methods=['POST'])
def add_paciente_route():
    data = request.json
    return jsonify(add_paciente(data))

# Ruta para actualizar un paciente existente
@routes.route('/pacientes/<int:id>', methods=['PUT'])
def update_paciente_route(id):
    data = request.json
    return jsonify(update_paciente(id, data))

# Ruta para eliminar un paciente
@routes.route('/pacientes/<int:id>', methods=['DELETE'])
def delete_paciente_route(id):
    return jsonify(delete_paciente(id))

# Ruta para obtener todos los pacientes
@routes.route('/pacientes', methods=['GET'])
def get_pacientes_route():
    return jsonify(get_pacientes())

# Ruta para obtener un paciente por ID
@routes.route('/pacientes/<int:id>', methods=['GET'])
def get_paciente_route(id):
    return jsonify(get_paciente(id))

#------------------------------------ Rutas de médicos ------------------------------------#
# Ruta para insertar un nuevo médico
@routes.route('/medicos', methods=['POST'])
def add_doctor_route():
    data = request.json
    return jsonify(add_doctor(data))

# Ruta para actualizar un médico existente
@routes.route('/medicos/<int:id>', methods=['PUT'])
def update_doctor_route(id):
    data = request.json
    return jsonify(update_doctor(id, data))

# Ruta para eliminar un médico
@routes.route('/medicos/<int:id>', methods=['DELETE'])
def delete_doctor_route(id):
    return jsonify(delete_doctor(id))

# Ruta para obtener todos los médicos
@routes.route('/medicos', methods=['GET'])
def get_doctors_route():
    doctors, status_code = get_doctors()
    return jsonify(doctors), status_code

# Ruta para obtener un médico por ID
@routes.route('/medicos/<int:id>', methods=['GET'])
def get_doctor_route(id):
    doctor, status_code = get_doctor(id)
    return jsonify(doctor), status_code

# Ruta para obtener los doctores por especialidad
@routes.route('/doctors', methods=['GET'])
def get_doctors_by_specialty():
    specialty = request.args.get('specialty')
    if (specialty):
        doctors = Doctor.query.filter(Doctor.especialidad.has(nombre=specialty)).all()
    else:
        doctors = Doctor.query.all()
    
    doctors_list = [{
        'id': doctor.id,
        'nombre': doctor.nombre,
        'apellido_paterno': doctor.apellido_paterno,
        'especialidad': doctor.especialidad.nombre,
        'email': doctor.email,
        'sexo': doctor.sexo,
        'telefono': doctor.telefono,
        'profile_picture': doctor.profile_picture  # Incluir la ruta de la imagen de perfil
    } for doctor in doctors]
    return jsonify(doctors_list)

#------------------------------------ Rutas de administradores ------------------------------------#
# Ruta para insertar un nuevo administrador
@routes.route('/administradores', methods=['POST'])
def add_admin_route():
    data = request.json
    return jsonify(add_admin(data))

# Ruta para actualizar un administrador existente
@routes.route('/administradores/<int:id>', methods=['PUT'])
def update_admin_route(id):
    data = request.json
    return jsonify(update_admin(id, data))

# Ruta para eliminar un administrador
@routes.route('/administradores/<int:id>', methods=['DELETE'])
def delete_admin_route(id):
    return jsonify(delete_admin(id))

# Ruta para obtener todos los administradores
@routes.route('/administradores', methods=['GET'])
def get_admins_route():
    admins, status_code = get_admins()
    return jsonify(admins), status_code

# Ruta para obtener un administrador por ID
@routes.route('/administradores/<int:id>', methods=['GET'])
def get_admin_route(id):
    admin, status_code = get_admin(id)
    return jsonify(admin), status_code

#------------------------------------ Rutas de agendar citas ------------------------------------#
# Ruta para obtener los horarios disponibles
@routes.route('/horarios_disponibilidad', methods=['GET'])
@jwt_required()
def get_available_times_route():
    medico_id = request.args.get('medico_id')
    fecha = request.args.get('fecha')
    if not medico_id or not fecha:
        return jsonify({'message': 'medico_id y fecha son requeridos'}), 400
    available_times = get_available_times(medico_id, fecha)
    return jsonify(available_times), 200

# Ruta para crear una nueva cita
@routes.route('/citas', methods=['POST'])
@jwt_required()
def create_appointment_route():
    data = request.json
    result, status_code = create_appointment(data)
    return jsonify(result), status_code

# Ruta para obtener las citas de un paciente con información del médico
@routes.route('/citas', methods=['GET'])
@jwt_required()
def obtener_citas_route():
    paciente_id = request.args.get('paciente_id')
    if not paciente_id:
        return jsonify({'error': 'Paciente ID es requerido'}), 400

    citas = get_citas_con_medico(paciente_id)
    return jsonify(citas), 200

# Ruta para obtener las citas de un médico para hoy y mañana
@routes.route('/citas-medico', methods=['GET'])
@jwt_required()
def obtener_citas_medico_route():
    medico_id = request.args.get('medico_id')
    if not medico_id:
        return jsonify({'error': 'Medico ID es requerido'}), 400

    citas = get_citas_medico(medico_id)
    return jsonify(citas), 200

# Ruta para enviar el correo electrónico de confirmación
@routes.route('/send-confirmation-email', methods=['POST'])
@jwt_required()
def send_confirmation_email_route():
    data = request.json
    paciente_id = data.get('paciente_id')
    medico_id = data.get('medico_id')
    fecha = data.get('fecha')
    hora = data.get('hora')

    result, status_code = send_confirmation_email(paciente_id, medico_id, fecha, hora)
    return jsonify(result), status_code

# Ruta para enviar el correo electrónico de bienvenida
@routes.route('/send-welcome-email', methods=['POST'])
@jwt_required()
def send_welcome_email_route():
    data = request.json
    paciente_id = data.get('paciente_id')

    result, status_code = send_welcome_email(paciente_id)
    return jsonify(result), status_code

# Ruta para enviar el correo electrónico de notificación de inicio de sesión
@routes.route('/send-login-notification-email', methods=['POST'])
@jwt_required()
def send_login_notification_email_route():
    data = request.json
    user_id = data.get('user_id')
    role = data.get('role')

    result, status_code = send_login_notification_email(user_id, role)
    return jsonify(result), status_code

# Subida de imágenes de perfil
@routes.route('/upload-profile-picture', methods=['POST'])
@jwt_required()
def upload_profile_picture_route():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    user_id = get_jwt_identity()['id']
    result, status_code = upload_profile_picture_function(file, user_id)
    return jsonify(result), status_code

# Ruta para generar pdf
@routes.route('/generate-pdf', methods=['GET'])
@jwt_required()
@cross_origin()  # Habilita CORS para esta ruta específica
def generate_pdf_route():
    return generate_pdf()

# Ruta para generar pdf de médicos
@routes.route('/generate-doctors-pdf', methods=['GET'])
@jwt_required()
@cross_origin()  # Habilita CORS para esta ruta específica
def generate_doctors_pdf_route():
    return generate_doctors_pdf()

# Ruta para generar pdf de administradores
@routes.route('/generate-admins-pdf', methods=['GET'])
@jwt_required()
@cross_origin()  # Habilita CORS para esta ruta específica
def generate_admins_pdf_route():
    return generate_admins_pdf()