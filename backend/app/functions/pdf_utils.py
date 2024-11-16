from flask import jsonify, make_response, url_for
from flask_jwt_extended import get_jwt_identity
from ..models import Paciente, Doctor
import pdfkit
from datetime import datetime

def generate_receta_pdf(receta_data):
    current_user = get_jwt_identity()
    email = current_user['email']
    doctor = Doctor.query.filter_by(email=email).first()

    if not doctor:
        return jsonify({'message': 'Unauthorized'}), 403

    # Verificar que todos los campos necesarios estén presentes en receta_data
    required_fields = ['paciente_nombre', 'paciente_apellido_paterno', 'medicamento', 'dosis', 'frecuencia', 'duracion']
    for field in required_fields:
        if field not in receta_data:
            return jsonify({'message': f'Missing field: {field}'}), 400

    # Ruta local del logo del hospital
    hospital_logo_url = url_for('static', filename='/backend/static/img/logo.png', _external=True)
    hospital_name = "Hospital Medical Care"
    hospital_address = "29000 Calle Central, Tuxtla Gutiérrez, Chiapas"
    hospital_phone = "(29000) 52+9614568712"
    fecha_emision = datetime.now().strftime("%d/%m/%Y")

    html = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Receta Médica</title>
        <style>
            body {{
                font-family: Arial, sans-serif;
                margin: 20px;
                padding: 0;
                box-sizing: border-box;
            }}
            .header {{
                text-align: center;
                margin-bottom: 20px;
            }}
            .header img {{
                width: 100px;
                height: auto;
            }}
            .header h1 {{
                margin: 0;
                font-size: 24px;
                color: #333;
            }}
            .header p {{
                margin: 5px 0;
                font-size: 14px;
                color: #666;
            }}
            .content {{
                margin: 20px 0;
            }}
            .content p {{
                font-size: 16px;
                margin: 5px 0;
            }}
            table {{
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
            }}
            th, td {{
                border: 1px solid black;
                padding: 8px;
                text-align: left;
            }}
            th {{
                background-color: #f2f2f2;
            }}
            .footer {{
                margin-top: 40px;
                text-align: center;
            }}
            .footer p {{
                font-size: 14px;
                color: #666;
            }}
            .signature {{
                margin-top: 60px;
                text-align: right;
                padding-right: 20px;
            }}
            .signature p {{
                font-size: 16px;
                color: #333;
            }}
        </style>
    </head>
    <body>
        <div class="header">
            <img src="{hospital_logo_url}" alt="Hospital Logo">
            <h1>{hospital_name}</h1>
            <p>{hospital_address}</p>
            <p>Tel: {hospital_phone}</p>
        </div>
        <div class="content">
            <h2>Receta Médica</h2>
            <p><strong>Fecha de Emisión:</strong> {fecha_emision}</p>
            <p><strong>Doctor:</strong> {doctor.nombre} {doctor.apellido_paterno} {doctor.apellido_materno}</p>
            <p><strong>Paciente:</strong> {receta_data['paciente_nombre']} {receta_data['paciente_apellido_paterno']}</p>
            <table>
                <thead>
                    <tr>
                        <th>Medicamento</th>
                        <th>Dosis</th>
                        <th>Frecuencia</th>
                        <th>Duración</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{receta_data['medicamento']}</td>
                        <td>{receta_data['dosis']}</td>
                        <td>{receta_data['frecuencia']}</td>
                        <td>{receta_data['duracion']}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="signature">
            <p>__________________________</p>
            <p>Firma del Doctor</p>
        </div>
        <div class="footer">
            <p>Esta receta es válida por 30 días a partir de la fecha de emisión.</p>
        </div>
    </body>
    </html>
    """

    try:
        # Especifica la ruta al ejecutable wkhtmltopdf
        config = pdfkit.configuration(wkhtmltopdf=r'C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe')
        pdf = pdfkit.from_string(html, False, configuration=config)
    except Exception as e:
        return jsonify({'message': 'Error generating PDF', 'error': str(e)}), 500

    response = make_response(pdf)
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = 'attachment; filename=receta_medica.pdf'

    return response