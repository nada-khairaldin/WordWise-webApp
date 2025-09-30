import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <div>
      <h1>Hello Router</h1>
      {/* elements that will be displayed in every route ( '⚠ Not Recommended !!! ) */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="*" element={<PageNotFound />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
