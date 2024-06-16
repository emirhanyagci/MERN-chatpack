import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
function App() {
  return (
    <Routes>
      <Route path="/login"></Route>
      <Route path="/signup"></Route>
      <Route element={<ProtectedRoutes />}></Route>
    </Routes>
  );
}

export default App;
