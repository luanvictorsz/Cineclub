import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./filme-info.css"
import api from '../../services/api';

function Filmes() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme() {
            try {
                const response = await api.get(`/movie/${id}`, {
                    params: {
                        api_key: "", 
                        language: "pt-BR",
                    },
                });
                setFilme(response.data);
                setLoading(false);
            } catch (error) {
                console.log("Filme não encontrado", error);
                navigate("/", { replace: true })
                return
            }
        }

        loadFilme();
    }, [navigate, id]); 

    function SalvarFilme() {
        const minhaLista = localStorage.getItem("@cineClube");
    
        let filmesSalvos = JSON.parse(minhaLista) || [];
    
        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);
    
        if (hasFilme) {
            alert("Filme já existe na lista");
            return;
        }
    
        filmesSalvos.push(filme);
    
        localStorage.setItem("@cineClube", JSON.stringify(filmesSalvos));
        alert("Filme salvo com sucesso")
    }
    

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
                <button onClick={SalvarFilme}>Salvar</button>
                <button>
                    <a href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
                </button>
            </div>
        </div>
    );
}

export default Filmes;
