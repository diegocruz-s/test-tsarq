import './globalStyle/global.scss'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Auth } from "./pages/Auth/Auth"
import { RootState, useAppDispatch, useAppSelector } from "./store/store"
import { useAuth } from './utils/checkAuth'
import { Home } from './pages/Home/Home'
import { PlayMusic } from './components/PlayMusic/PlayMusic'
import { Navbar } from './components/Navbar/Navbar'
import { MusicCreate } from './pages/MusicCreate/MusicCreate'

function App() {

  const { auth, loading: loadingAuth } = useAuth()
  const { error } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  console.log('err:', error)
  console.log('auth:', auth)

  if(loadingAuth) {
    return <p>Carregando...</p>
  }

  return (
    <div>
      
      <BrowserRouter>

        {auth && <Navbar />}

        <a href="/musics">Musics</a>
        <Routes>
          <Route path='/' element={ auth ? <Home /> : <Navigate to='/auth' /> }></Route>
          <Route path='/auth' element={ auth ? <Navigate to='/' /> : <Auth /> }></Route>
          <Route path='/music' element={ auth ? <MusicCreate /> : <Navigate to='/auth' /> }></Route>
          <Route path='/music/:id' element={ auth ? <PlayMusic /> : <Navigate to='/' /> } />
          <Route path='/musicsabc' element={ auth ? (
            <p>Funcionou!!!</p>
          ) : <Navigate to='/' /> } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
