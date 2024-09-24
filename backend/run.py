from app import create_app

app = create_app()

if __name__ == '__main__':
    # Ejecutar la aplicación con HTTPS
    app.run(ssl_context=('cert.pem', 'key.pem'), debug=True)