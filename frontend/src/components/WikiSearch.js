import React, { useState } from 'react';
import axios from 'axios';

const WikiSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://es.wikipedia.org/w/api.php`, {
        params: {
          action: 'query',
          list: 'search',
          srsearch: searchTerm,
          format: 'json',
          origin: '*'
        }
      });
      setResults(response.data.query.search);
    } catch (error) {
      console.error('Error al obtener los resultados de búsqueda:', error);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSearchSubmit} style={styles.form}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar información médica..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Buscar</button>
      </form>
      <div style={styles.results}>
        {results.map((result) => (
          <div key={result.pageid} style={styles.result}>
            <h3 style={styles.title}>{result.title}</h3>
            <p style={styles.snippet} dangerouslySetInnerHTML={{ __html: result.snippet }}></p>
            <a href={`https://es.wikipedia.org/?curid=${result.pageid}`} target="_blank" rel="noopener noreferrer" style={styles.link}>
              Leer más
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    margin: '0 auto',
  },
  form: {
    display: 'flex',
    marginBottom: '20px',
  },
  input: {
    flex: '1',
    padding: '10px',
    borderRadius: '4px 0 0 4px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '0 4px 4px 0',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
  },
  results: {
    marginTop: '20px',
  },
  result: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  title: {
    fontSize: '18px',
    margin: '0 0 10px 0',
  },
  snippet: {
    fontSize: '14px',
    color: '#555',
  },
  link: {
    display: 'inline-block',
    marginTop: '10px',
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default WikiSearch;