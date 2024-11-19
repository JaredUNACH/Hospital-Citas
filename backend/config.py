import os

class Config:
    # Configuración de la base de datos
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://postgres:Neymar18@localhost/citas_hospital')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Clave secreta para sesiones y JWT
    SECRET_KEY = os.getenv('SECRET_KEY', 'Neymar18')
    
    # Configuración de cookies seguras
    SESSION_COOKIE_SECURE = True  # Asegura que las cookies solo se envíen a través de HTTPS
    REMEMBER_COOKIE_SECURE = True  # Asegura que las cookies de "remember me" solo se envíen a través de HTTPS
    
    # Configuración de Content Security Policy (CSP)
    CSP = {
        'default-src': "'self'",
        'script-src': "'self' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/",
        'style-src': "'self' 'unsafe-inline'",
        'img-src': "'self' data:",
        'connect-src': "'self'",
        'font-src': "'self'",
        'object-src': "'none'",
        'frame-src': "'self' https://www.google.com/recaptcha/",
    }

    # Configuración de la carpeta de subida
    UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads/profile_pictures')
    
    # Configuración de CORS
    CORS_HEADERS = 'Content-Type'
    CORS_RESOURCES = {r"/*": {"origins": "*"}}
    