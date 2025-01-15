import "./favoritos.css";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Favoritos() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const minhaLista = localStorage.getItem("@cineClube");
    if (minhaLista) {
      const listaFilmes = JSON.parse(minhaLista);

      if (Array.isArray(listaFilmes)) {
        setFilmes(listaFilmes);
      } else {
        setFilmes([]);
      }
    }
  }, []); 

  return (
    <div className="meus-filmes">
      <h1>Meus Favoritos</h1>
      <ul>
        {filmes.map((filme) => (
          <li key={filme.id}>
            <span>{filme.title}</span>
            <div>
              <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
              <button>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favoritos;
