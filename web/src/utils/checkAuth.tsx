import { useEffect, useState } from "react"
import { useAppSelector } from "../store/store"
import { api } from "./api"

export const useAuth = () => {
    const { datasStorage } = useAppSelector(state => state.auth)
    const [auth, setAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        if (datasStorage?.user) {
            setAuth(true)
            api.defaults.headers.authorization = `Bearer ${datasStorage.token}`
        } else {
            setAuth(false)
        }

        setLoading(false);
    }, [datasStorage?.user])


    return { auth, loading }
}