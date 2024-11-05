from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import UserMixin

db = SQLAlchemy()
bcrypt = Bcrypt()

class Paciente(db.Model, UserMixin):
    __tablename__ = 'pacientes'
    
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    apellido_paterno = db.Column(db.String(100), nullable=False)
    apellido_materno = db.Column(db.String(100), nullable=False)
    curp = db.Column(db.String(18), nullable=True)
    sexo = db.Column(db.String(1), nullable=True)
    tipo_sangre = db.Column(db.String(3), nullable=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    telefono = db.Column(db.String(15), nullable=True)
    fecha_nacimiento = db.Column(db.Date, nullable=False)
    alergia_medicamentos = db.Column(db.Text, nullable=True)
    password = db.Column(db.String(100), nullable=True)  # Puede ser nulo para usuarios de Google
    google_id = db.Column(db.String(100), unique=True, nullable=True)  # ID de Google
    fecha_registro = db.Column(db.DateTime, default=db.func.current_timestamp())
    rol = db.Column(db.String(50), default='usuario', nullable=False)
    historial_medico = db.Column(db.Text, nullable=True)

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def __repr__(self):
        return f'<Paciente {self.nombre} {self.apellido_paterno} {self.apellido_materno}>'

class Administrador(db.Model, UserMixin):
    __tablename__ = 'administradores'
    
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    apellido_paterno = db.Column(db.String(100), nullable=False)
    apellido_materno = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    fecha_registro = db.Column(db.DateTime, default=db.func.current_timestamp())
    rol = db.Column(db.String(50), default='administrador', nullable=False)
    curp = db.Column(db.String(18), nullable=True)
    sexo = db.Column(db.String(1), nullable=True)
    tipo_sangre = db.Column(db.String(3), nullable=True)
    telefono = db.Column(db.String(15), nullable=True)
    fecha_nacimiento = db.Column(db.Date, nullable=True)
    alergia_medicamentos = db.Column(db.Text, nullable=True)

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def __repr__(self):
        return f'<Administrador {self.nombre} {self.apellido_paterno} {self.apellido_materno}>'

class Especialidad(db.Model):
    __tablename__ = 'especialidades'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), unique=True, nullable=False)

    def __repr__(self):
        return f'<Especialidad {self.nombre}>'

class Doctor(db.Model, UserMixin):
    __tablename__ = 'medicos'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    apellido_paterno = db.Column(db.String(100), nullable=False)
    apellido_materno = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    especialidad_id = db.Column(db.Integer, db.ForeignKey('especialidades.id'), nullable=False)
    fecha_registro = db.Column(db.DateTime, default=db.func.current_timestamp())
    rol = db.Column(db.String(50), default='medico', nullable=False)
    curp = db.Column(db.String(18), nullable=True)
    sexo = db.Column(db.String(1), nullable=True)
    tipo_sangre = db.Column(db.String(3), nullable=True)
    telefono = db.Column(db.String(15), nullable=True)
    fecha_nacimiento = db.Column(db.Date, nullable=True)
    alergia_medicamentos = db.Column(db.Text, nullable=True)

    especialidad = db.relationship('Especialidad', backref=db.backref('doctores', lazy=True))

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def __repr__(self):
        return f'<Doctor {self.nombre} {self.apellido_paterno} {self.apellido_materno}>'