import React, { useState, useEffect } from 'react';

export default function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(async () =>{
    const response = await fetch('https://api.github.com/users/vitorrubim1/repos');
    const data = await response.json();

    setRepositories(data);
  }, []);

  useEffect(() => {
    const filtered = repositories.filter(repo => repo.favorite); //buscando so os que tiverem favoritados

    document.title = `Você tem ${filtered.length} favoritos`; //title
  }, [repositories]);

  function handleFavorite (id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo; //!repo.favorite = se tiver como true vai pra false, vice versa
    }); 

    setRepositories(newRepositories);
  }

  return (
    <ul>
      {repositories.map(repo => (
        <li key={repo.id}>
          {repo.name}
          {repo.favorite && <span><strong>Favorito</strong></span>}
          <button onClick={() => handleFavorite(repo.id)}>
            { repo.favorite === true ? 'Desfavoritar' : 'Favoritar' }
          </button>
        </li>
      ))}
    </ul>
  );
}