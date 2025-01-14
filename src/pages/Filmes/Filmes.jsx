import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./filme-info.css"
import api from '../../services/api';

function Filmes() {
    const { id } = useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme() {
            try {
                const response = await api.get(`/movie/${id}`, {
                    params: {
                        api_key: "c03709d98388e2d196322d97b94b651c", 
                        language: "pt-BR",
                    },
                });
                setFilme(response.data);
                setLoading(false);
            } catch (error) {
                console.log("Filme não encontrado", error);
            }
        }

        loadFilme();
    }, [id]); // Agora 'id' é uma dependência

    if (loading) {
        return (
            <div className="filme-info">
                <h1>Carregando Detalhes...</h1>
            </div>
        );
    }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img 
                src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} 
                alt={filme.title}
            />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className='area-buttons'>
                <button>Salvar</button>
                <button>
                    <a href=''>Trailer</a>
                </button>
            </div>
        </div>
    );
}

export default Filmes;
