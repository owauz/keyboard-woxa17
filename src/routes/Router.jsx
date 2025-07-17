import { Routes, Route } from "react-router";

import Login from "../pages/Login/Login";
import Main from '../pages/Home/Home'

import ROUTE_PATHS from "../enums/routes";
import PrivateRoute from "./PrivateRoute";

export default function Router () {
    return <Routes>
        <Route path={ROUTE_PATHS.MAIN} element={<PrivateRoute><Main/></PrivateRoute>} />
        <Route path={ROUTE_PATHS.LOGIN} element={<Login/>} />
    </Routes>
}