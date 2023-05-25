import './globalStyle/global.scss'
import { Auth } from "./pages/Auth/Auth"
import { RootState, useAppDispatch, useAppSelector } from "./store/store"
import { login } from "./store/slices/auth/authSlice"

function App() {

  const { datasStorage, error, loading } = useAppSelector((state: RootState) => state.auth)
  const dispatch = useAppDispatch()
  console.log('err:', error)
  return (
    <div>
      <Auth />
    </div>
  )
}

export default App
