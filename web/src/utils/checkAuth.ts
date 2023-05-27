import { useEffect, useState } from "react"
import { useAppSelector } from "../store/store"

export const useAuth = () => {
    const { datasStorage } = useAppSelector(state => state.auth)
    const [auth, setAuth] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        if (datasStorage?.user) {
            setAuth(true)
        } else {
            setAuth(false)
        }
        setLoading(false)
    }, [datasStorage?.user])


    return { auth, loadingCheckAuth: loading }
}