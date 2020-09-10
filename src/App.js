import React, { useEffect, useState } from "react";
import { uuid } from 'uuidv4';
import api from './services/api';

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    async function getRepos() {
      const response = await api.get('repositories');
      setRepos(response.data);
    }

    getRepos();
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      id: uuid(),
      url: "https://github.com/barbosabruno",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });

    setRepos([...repos, response.data]);
  }

  async function handleRemoveRepository(id) {
    setRepos(repos.filter(repo => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(repo => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
