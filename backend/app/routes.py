from flask import Blueprint, request, jsonify
from .models import db, Paciente
from flask_login import login_user

main = Blueprint('main', __name__)

@main.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    paciente = Paciente.query.filter_by(email=email).first()
    if paciente and paciente.check_password(password):
        login_user(paciente)
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Login unsuccessful. Please check email and password"}), 401