import os
from dotenv import load_dotenv

# Cargar variables de entorno desde el archivo .env
load_dotenv()

class Config:
    # Configuración de la base de datos
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://jared:zb8WfYa0iqDpopW4dVh865FQK45O8g9k@dpg-crs8kuogph6c738qude0-a.oregon-postgres.render.com/care_gzry')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Clave secreta para sesiones y JWT
    SECRET_KEY = os.getenv('SECRET_KEY', 'af03f15da847ebb6e355fdcdc397fc4794b30b4b5f3045f4')
    
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