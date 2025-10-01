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
          <Route path = "/" element={<HomePage/>}/>
          <Route path="app" element={<AppLayout />} />
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
