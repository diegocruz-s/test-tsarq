import { Auth } from "./pages/Auth/Auth"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "./store/store"

function App() {

  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <div>
      Texto
      <div>
        {user && (
          <p>{user.name} - Bios: {user.bios} - Username: {user.username}</p>
        )}
      </div>
      <Auth />
    </div>
  )
}

export default App
