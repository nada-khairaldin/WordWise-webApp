import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import HomePage from "./pages/Homepage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<p>LIST</p>} />
            <Route path="cities" element={<p> List of cities</p>} />
            <Route path="countries" element={<p> countries</p>} />
            <Route path="form" element={<p>Form</p>} />
          </Route>
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} /> {/*fallback route*/}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
