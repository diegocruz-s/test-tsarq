import { Auth } from "./pages/Auth/Auth"
import { RootState, useAppDispatch, useAppSelector } from "./store/store"
import { login } from "./store/slices/auth/authSlice"

function App() {

  const { datasStorage } = useAppSelector((state: RootState) => state.auth)
  const dispatch = useAppDispatch()

  return (
    <div>
      Texto
      <div>
        {datasStorage?.user && (
          <p>{datasStorage.user.name} - Bios: {datasStorage.user.bios} - Username: {datasStorage.user.username}</p>
        )}
      </div>
      <Auth />
      <button onClick={() => dispatch(login({ email: 'diego@gmail.com', password: 'Diego@123' }))}>Test redux</button>
    </div>
  )
}

export default App
