import { Auth } from "./pages/Auth/Auth"
import { RootState, useAppDispatch, useAppSelector } from "./store/store"
import { login } from "./store/slices/auth/authSlice"

function App() {

  const { datasStorage, error, loading } = useAppSelector((state: RootState) => state.auth)
  const dispatch = useAppDispatch()
  console.log('err:', error)
  return (
    <div>
      Texto
      <div>
        {datasStorage?.user && (
          <p>{datasStorage.user.name} - Bios: {datasStorage.user.bios} - Username: {datasStorage.user.username}</p>
        )}
      </div>
      <Auth />
        
      {loading ? (
          <button 
            disabled  
          >
              Aguarde...
          </button>
        ) : (
          <button 
            onClick={
                () => dispatch(login({ email: 'diego@gmail.com', password: 'Diego@123' }))
            }>
              Test redux
          </button>      
      )}
      
      {error ? (
        <p>{error[0]}</p>
      ) : (
        <p>Sem erro</p>
      )}
    </div>
  )
}

export default App
