import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home'; // Import Home component
import ROUTE_PATHS from '../Utils/enums/routes';

function Router() {
  return (
    <Routes>
      <Route path={ROUTE_PATHS.LOGIN} element={<Login />} />
      <Route path="/" element={<Home />} /> {/* Default route */}
    </Routes>
  );
}

export default Router;