import { Route, Routes } from "react-router-dom";
import HomePAge from "./pages/HomePAge";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/home' element={<HomePAge />} />
    </Routes>
  );
}

export default App;
