import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import None from "./pages/None";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<None />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
