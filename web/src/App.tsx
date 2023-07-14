import './globalStyle/global.scss'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Auth } from "./pages/Auth/Auth"
import { useAppSelector } from "./store/store"
import { useAuth } from './utils/checkAuth'
import { Home } from './pages/Home/Home'
import { PlayMusic } from './components/PlayMusic/PlayMusic'
import { Navbar } from './components/Navbar/Navbar'
import { MusicCreate } from './pages/MusicCreate/MusicCreate'
import { Playlists } from './pages/Playlists/Playlists'
import { Playlist } from './pages/Playlist/Playlist'
import { Profile } from './pages/Profile/Profile'
export const pathImages = 'http://localhost:3000/uploads/images'

function App() {

  const { music } = useAppSelector(state => state.music)
  const { auth, loading: loadingAuth } = useAuth()
  const { error } = useAppSelector(state => state.auth)

  if(loadingAuth) {
    return <p>Carregando...</p>
  }

  return (
    <div>
      
      <BrowserRouter>

        {auth && <Navbar />}

        <Routes>
          <Route path='/' element={ auth ? <Home /> : <Navigate to='/auth' /> } />
          <Route path='/auth' element={ auth ? <Navigate to='/' /> : <Auth /> } />
          <Route path='/music' element={ auth ? <MusicCreate /> : <Navigate to='/auth' /> } />
          <Route path='/playlists' element={ auth ? <Playlists /> : <Navigate to='/' /> } />
          <Route path='/playlists/:id' element={ auth ? <Playlist /> : <Navigate to='/' />} />
          <Route path='/profile' element={ auth ? <Profile /> : <Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
