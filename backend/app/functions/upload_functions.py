from werkzeug.utils import secure_filename
from flask import jsonify
from ..models import Paciente, Administrador, Doctor, db
import os

UPLOAD_FOLDER = 'uploads/profile_pictures'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def upload_profile_picture(file, user_id):
    if file.filename == '':
        return {'error': 'No selected file'}, 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, f"{user_id}_{filename}")
        file.save(filepath)
        
        # Actualizar la ruta de la imagen en la base de datos
        user = Paciente.query.get(user_id) or Administrador.query.get(user_id) or Doctor.query.get(user_id)
        if user:
            user.profile_picture = filepath
            db.session.commit()
        
        return {'message': 'File uploaded successfully', 'filepath': filepath}, 200
    return {'error': 'File type not allowed'}, 400