import {Routes, Route, BrowserRouter} from 'react-router-dom'

//paginas
import Erro from './pages/Error/Index'
import Filme from './pages/Filmes/Filmes'
import Home from './pages/Home/Home'

//cabecalho
import Header from './components/Header'

function RouterApp(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/filme/:id' element={<Filme/>}></Route>
                <Route path='*' element={<Erro/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RouterApp