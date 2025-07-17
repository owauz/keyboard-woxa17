import { Navigate, useNavigate } from "react-router"
import ROUTE_PATHS from "../enums/routes"
import { useEffect, useState } from "react"

export default function PrivateRoute (props) {
    const { children } = props

    const [isValid, setIsValid] = useState(true)

    const navigate = useNavigate()

    const accessToken = localStorage.getItem("accessToken")

    useEffect(() => {

        fetch('https://dummyjson.com/auth/me', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => res.json()).then(data => {
            if (data.message !== 'Invalid/Expired Token!') {
                setIsValid(true)
                navigate("/")
            }else {
                setIsValid(false)
            }
            console.log(data)
        })
    }, [])

    if (!isValid) {
        return <Navigate to={ROUTE_PATHS.LOGIN} />
    }
    
    return children 
}