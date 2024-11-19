import pandas as pd
import joblib

# Cargar el modelo y el codificador de etiquetas
model = joblib.load('specialist_recommender.pkl')
label_encoder = joblib.load('label_encoder.pkl')

# Nuevos datos para predecir
new_data = pd.DataFrame({
    'symptoms': [
        "Dolor de cabeza",
        "Dolor de espalda",
        "Dolor muscular o articular",
        "Fracturas o lesiones",
        "Lesión deportiva"
    ]
})

# Predecir las especialidades para los nuevos datos
predictions = model.predict(new_data['symptoms'])
predicted_specialists = label_encoder.inverse_transform(predictions)

# Mostrar los resultados
new_data['predicted_specialist'] = predicted_specialists
print(new_data)