from flask import jsonify, make_response
from flask_jwt_extended import get_jwt_identity
from ..models import Paciente, Administrador
import pdfkit

def generate_pdf():
    current_user = get_jwt_identity()
    email = current_user['email']
    admin = Administrador.query.filter_by(email=email).first()

    if not admin:
        return jsonify({'message': 'Unauthorized'}), 403

    pacientes = Paciente.query.all()
    html = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reporte de Pacientes</title>
        <style>
            table {
                width: 100%;
                border-collapse: collapse;
            }
            th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: left;
            }
            th {
                background-color: #f2f2f2;
            }
        </style>
    </head>
    <body>
        <h1>Reporte de Pacientes</h1>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido Paterno</th>
                    <th>Apellido Materno</th>
                    <th>CURP</th>
                    <th>Sexo</th>
                    <th>Tipo de Sangre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Fecha de Nacimiento</th>
                    <th>Alergia a Medicamentos</th>
                </tr>
            </thead>
            <tbody>
    """
    for paciente in pacientes:
        html += f"""
                <tr>
                    <td>{paciente.nombre}</td>
                    <td>{paciente.apellido_paterno}</td>
                    <td>{paciente.apellido_materno}</td>
                    <td>{paciente.curp}</td>
                    <td>{paciente.sexo}</td>
                    <td>{paciente.tipo_sangre}</td>
                    <td>{paciente.email}</td>
                    <td>{paciente.telefono}</td>
                    <td>{paciente.fecha_nacimiento}</td>
                    <td>{paciente.alergia_medicamentos}</td>
                </tr>
        """
    html += """
            </tbody>
        </table>
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
    response.headers['Content-Disposition'] = 'attachment; filename=report.pdf'

    return response