import './globalStyle/global.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Auth } from "./pages/Auth/Auth"
import { RootState, useAppDispatch, useAppSelector } from "./store/store"
import { useAuth } from './utils/checkAuth'
import { Home } from './pages/Home/Home'

function App() {

  const { auth } = useAuth()
  const { datasStorage, error, loading } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  console.log('err:', error)
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={ auth ? (<Home />) : (<Auth />) }></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
