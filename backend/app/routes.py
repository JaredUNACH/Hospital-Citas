from flask import Blueprint, request, jsonify, make_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from .functions.auth_functions import login, register, google_login, google_register  # Importa las funciones de autenticación
from .models import db, Paciente, Especialidad
from .functions.patients_functions import add_paciente, update_paciente, delete_paciente, get_pacientes, get_paciente

# Crea un Blueprint para las rutas
routes = Blueprint('routes', __name__)

# Configura el limitador de tasa para las solicitudes
limiter = Limiter(
    get_remote_address,
    app=None,
    default_limits=["200 per day", "50 per hour"]  # Límites por defecto: 200 por día, 50 por hora
)

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
def user_info():
    current_user = get_jwt_identity()  # Obtiene la identidad del usuario actual desde el token JWT
    user = Paciente.query.filter_by(email=current_user['email']).first()  # Busca el usuario en la base de datos
    if user:
        return jsonify(name=user.nombre, email=user.email), 200  # Devuelve el nombre y el email del usuario
    return jsonify(message="User not found"), 404  # Devuelve un mensaje de error si el usuario no se encuentra

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

# Ruta para actualizar la información del usuario
@routes.route('/update-user-info', methods=['PUT'])
@jwt_required()  # Requiere un token JWT válido
def update_user_info():
    current_user = get_jwt_identity()  # Obtiene la identidad del usuario actual desde el token JWT
    user = Paciente.query.filter_by(email=current_user['email']).first()  # Busca el usuario en la base de datos
    if not user:
        return jsonify({'message': 'User not found'}), 404

    data = request.json
    user.apellido_paterno = data.get('apellido_paterno', user.apellido_paterno)
    user.apellido_materno = data.get('apellido_materno', user.apellido_materno)
    user.curp = data.get('curp', user.curp)
    user.sexo = data.get('sexo', user.sexo)
    user.tipo_sangre = data.get('tipo_sangre', user.tipo_sangre)
    user.email = data.get('email', user.email)
    user.telefono = data.get('telefono', user.telefono)
    user.fecha_nacimiento = data.get('fecha_nacimiento', user.fecha_nacimiento)
    user.alergia_medicamentos = data.get('alergia_medicamentos', user.alergia_medicamentos)

    db.session.commit()
    return jsonify({'message': 'User info updated successfully'}), 200