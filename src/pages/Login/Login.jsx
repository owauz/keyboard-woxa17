import { useNavigate } from "react-router"
import "./Login.scss"

import { useState } from "react"

export default function Login () {

    const [username, setUsername] = useState("emilys")
    const [password, setPassword] = useState("emilyspass")

    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault()

        if (username && password) {
            fetch(`https://dummyjson.com/auth/login`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }).then(res => res.json())
            .then(data => {
                navigate("/")
                localStorage.setItem("accessToken", data.accessToken)
                console.log(data)
            })
        }
    }

    return (
        <div className="loginPage">
            <div className="loginContent">
                <h2>Kirish </h2>
                <p>Ma'lumotlarni kiriting </p>
                <form id="form" onSubmit={onSubmit}>
                    <div className="form-field">
                        <div className="label">Username</div>
                        <input onChange={(e) => {
                            setUsername(e.target.value)
                        }} value={username} type="text" placeholder="Enter an username..."/>
                    </div>
                    <div className="form-field">
                        <div className="label">Password</div>
                        <input value={password} onChange={(e) => {
                            setPassword(e.target.value)
                        }} type="password" placeholder="Enter a password..."/>
                    </div>
                    <button className="btn">Kirish </button>
                </form>
            </div>
        </div>
    )
}