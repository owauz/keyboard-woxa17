import { Link } from "react-router"
import "./NotFound.scss"

export default function NotFound () {
    return (
        <div className="notFound">
            <div className="notFoundContent">
                <h1>Hech Narsa topilmadi !</h1>
                <Link to={"/"}>
                    <button className="backToHome">Ortga Qaytish !</button>
                </Link>
            </div>
        </div>
    )
}