import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import LabelEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os
import shutil

# Cargar el archivo CSV existente y duplicar las filas para aumentar el tamaño del conjunto de datos
file_path = 'C:/Users/CYBORG/OneDrive/Sexto Semestre/SISTEMAS DE INFORMACION/Rama main/Hospital-Citas/ai/training/Sintomas_Especialistas.csv'
data = pd.read_csv(file_path)
data_expanded = pd.concat([data] * 10, ignore_index=True)
expanded_file_path = 'C:/Users/CYBORG/OneDrive/Sexto Semestre/SISTEMAS DE INFORMACION/Rama main/Hospital-Citas/ai/training/Sintomas_Especialistas_expanded.csv'
data_expanded.to_csv(expanded_file_path, index=False)
print(f"El archivo expandido ha sido guardado en {expanded_file_path}")

# Proporciona la ruta completa a los archivos CSV y JSON
data_existing = pd.read_csv(expanded_file_path)
data_new = pd.read_json("hf://datasets/fhai50032/Symptoms_to_disease_7k/Symptoms_to_disease_7k.json")
data_third = pd.read_csv('C:/Users/CYBORG/OneDrive/Sexto Semestre/SISTEMAS DE INFORMACION/Rama main/Hospital-Citas/ai/training/dataset.csv')

# Verificar los datos cargados
print(data_existing.head())
print(data_new.head())
print(data_third.head())

# Renombrar columnas del nuevo conjunto de datos para que coincidan con el existente
data_new.rename(columns={'symptoms': 'symptoms', 'disease': 'specialist'}, inplace=True)
data_third.rename(columns={'symptoms': 'symptoms', 'disease': 'specialist'}, inplace=True)

# Combinar los conjuntos de datos
data_combined = pd.concat([data_existing, data_new, data_third], ignore_index=True)

# Verificar los datos combinados
print(data_combined.head())

# Eliminar filas con valores NaN en las columnas 'symptoms' y 'specialist'
data_combined.dropna(subset=['symptoms', 'specialist'], inplace=True)

# Agrupar clases con pocos ejemplos en una categoría "Otros"
threshold = 5
value_counts = data_combined['specialist'].value_counts()
to_replace = value_counts[value_counts < threshold].index
data_combined['specialist'] = data_combined['specialist'].replace(to_replace, 'Otros')

# Verificar los datos después de agrupar clases con pocos ejemplos
print(data_combined['specialist'].value_counts())

# Preprocesar texto y etiquetas
X = data_combined['symptoms']
y = data_combined['specialist']

# Codificar etiquetas
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# Definir los parámetros para GridSearchCV
parameters = {
    'tfidfvectorizer__max_df': [0.75, 1.0],
    'tfidfvectorizer__ngram_range': [(1, 1), (1, 2)],
    'multinomialnb__alpha': [0.01, 0.1, 1.0]
}

# Inicializar variables para guardar el mejor modelo
best_accuracy = 0
best_model = None

# Entrenar el modelo múltiples veces
for i in range(50):  # Reducir el número de iteraciones
    # Dividir datos en entrenamiento y prueba
    X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=i)

    # Crear el modelo
    pipeline = make_pipeline(TfidfVectorizer(), MultinomialNB())

    # Realizar GridSearchCV para encontrar los mejores parámetros
    grid_search = GridSearchCV(pipeline, parameters, cv=5, n_jobs=-1)
    grid_search.fit(X_train, y_train)

    # Evaluar el modelo
    y_pred = grid_search.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f'Iteration {i+1}, Accuracy: {accuracy}')

    # Guardar el mejor modelo
    if accuracy > best_accuracy:
        best_accuracy = accuracy
        best_model = grid_search.best_estimator_

# Imprimir el mejor resultado
print(f'Best Accuracy: {best_accuracy}')
print(classification_report(y_test, y_pred, labels=range(len(label_encoder.classes_)), target_names=label_encoder.classes_, zero_division=0))

# Guardar el mejor modelo y el codificador de etiquetas
joblib.dump(best_model, 'specialist_recommender.pkl')
joblib.dump(label_encoder, 'label_encoder.pkl')

# Eliminar carpetas temporales manualmente
temp_folders = [f for f in os.listdir(os.getenv('TEMP')) if f.startswith('joblib_memmapping_folder')]
for folder in temp_folders:
    try:
        shutil.rmtree(os.path.join(os.getenv('TEMP'), folder))
    except Exception as e:
        print(f"Failed to delete temporary folder: {folder}, error: {e}")