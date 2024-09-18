import psycopg2  # Biblioteca para conectar y manejar bases de datos PostgreSQL desde Python
import pandas as pd  # Biblioteca para la manipulación y análisis de datos
from sklearn.model_selection import train_test_split  # Función para dividir un conjunto de datos en entrenamiento y prueba
from sklearn.tree import DecisionTreeClassifier  # Clase para crear y entrenar un modelo de árbol de decisión
from sklearn.metrics import accuracy_score  # Función para calcular la precisión de un modelo de clasificación
import joblib  # Biblioteca para serializar y deserializar objetos de Python, especialmente modelos de scikit-learn
import os  # Biblioteca estándar de Python para funcionalidades dependientes del sistema operativo

from config import Config  # Importar la configuración desde el archivo config.py en la carpeta ai

# Conectar a la base de datos PostgreSQL
def connect_db():
    try:
        conn = psycopg2.connect(Config.SQLALCHEMY_DATABASE_URI)
        return conn
    except Exception as e:
        print(f"Error al conectar a la base de datos: {e}")
        return None

# Extraer datos de la tabla horarios_disponibilidad
def fetch_data(conn):
    query = """
    SELECT medico_id, dia_semana, hora_inicio, hora_fin
    FROM public.horarios_disponibilidad
    """
    try:
        df = pd.read_sql_query(query, conn)
        return df
    except Exception as e:
        print(f"Error al extraer datos: {e}")
        return None

# Preprocesar los datos
def preprocess_data(df):
    # Convertir las horas a minutos desde medianoche
    df['hora_inicio'] = df['hora_inicio'].apply(lambda x: x.hour * 60 + x.minute)
    df['hora_fin'] = df['hora_fin'].apply(lambda x: x.hour * 60 + x.minute)
    
    # Codificar la variable categórica 'dia_semana'
    df = pd.get_dummies(df, columns=['dia_semana'], drop_first=True)
    
    return df

# Entrenar el modelo
def train_model(df):
    X = df.drop(columns=['hora_fin'])
    y = df['hora_fin']
    
    # Dividir los datos en conjuntos de entrenamiento y prueba
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Crear y entrenar el modelo de árbol de decisión
    model = DecisionTreeClassifier()
    model.fit(X_train, y_train)
    
    # Predecir y evaluar la precisión del modelo
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Precisión del modelo: {accuracy}")
    
    return model

# Guardar el modelo entrenado
def save_model(model, filename='models/modelo_disponibilidad.pkl'):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    joblib.dump(model, filename)
    print(f"Modelo guardado como {filename}")

# Función principal
def main():
    conn = connect_db()
    if conn:
        df = fetch_data(conn)
        if df is not None:
            df = preprocess_data(df)
            model = train_model(df)
            save_model(model)
        conn.close()

if __name__ == "__main__":
    main()