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

  function ExcluirFilme(id){
    let filtroFilmes = filmes.filter((item) => {
        return(item.id !== id)
    })

    setFilmes(filtroFilmes)
    localStorage.setItem('@cineClube', JSON.stringify(filtroFilmes))

  }

  return (
    <div className="meus-filmes">
      <h1>Meus Favoritos</h1>
      {filmes.length === 0 && <span>Você não possui filmes salvos</span>}
      <ul>
        {filmes.map((filme) => (
          <li key={filme.id}>
            <span>{filme.title}</span>
            <div>
              <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
              <button onClick={() => ExcluirFilme(filme.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favoritos;
