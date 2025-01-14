import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import './Home.css';

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null); 

  useEffect(() => {
    async function loadFilmes() {
      try {
        const response = await api.get("movie/now_playing", {
          params: {
            api_key: "c03709d98388e2d196322d97b94b651c", // <--- SUA CHAVE DA API VAI AQUI
            language: "pt-BR",
            page: 1,
          },
        });

        setFilmes(response.data.results.slice(0, 20));
      } catch (error) {
        console.error("Error fetching movies:", error);
        setErrorMessage("Ops! Ocorreu um erro ao carregar os filmes."); 
      } finally {
        setLoading(false);
      }
    }

    loadFilmes();
  }, []);

  return (
    <div className="container">
      {loading ? (
        <div className="loading">
          <h2>Carregando Filmes...</h2>
        </div>
      ) : errorMessage ? (
        <div className="error-message">{errorMessage}</div>
      ) : (
        <div className="lista-filmes">
          {filmes.map((filme) => (
            <article key={filme.id}>
              <strong>{filme.title}</strong>
              <img
                src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                alt={filme.title}
              />
              <Link to={`/filme/${filme.id}`}>Acessar</Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
