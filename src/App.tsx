import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import "./styles/main.css";
import CountriesListPage from './pages/CountriesListPage';
import CountryDetailsPage from './pages/CountryDetailsPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CountriesListPage />} />
          <Route path={process.env.REACT_APP_URL_COUNTRY_DETAILS_PAGE} element={<CountryDetailsPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
