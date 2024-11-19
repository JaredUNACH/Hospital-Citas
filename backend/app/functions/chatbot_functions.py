import pandas as pd
import joblib

# Cargar el modelo y el codificador de etiquetas
model = joblib.load('C:/Users/CYBORG/OneDrive/Sexto Semestre/SISTEMAS DE INFORMACION/Rama main/Hospital-Citas/ai/training/specialist_recommender.pkl')
label_encoder = joblib.load('C:/Users/CYBORG/OneDrive/Sexto Semestre/SISTEMAS DE INFORMACION/Rama main/Hospital-Citas/ai/training/label_encoder.pkl')

def predict_specialist(symptoms):
    new_data = pd.DataFrame({'symptoms': [symptoms]})
    predictions = model.predict(new_data['symptoms'])
    predicted_specialist = label_encoder.inverse_transform(predictions)
    return predicted_specialist[0]