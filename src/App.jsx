import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import HomePage from "./pages/Homepage";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContext";


function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<CityList />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            {/*we could use params with nested and top level routers sure!*/}
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} /> {/*fallback route*/}
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
