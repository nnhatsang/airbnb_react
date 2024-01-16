import { Route, Routes } from "react-router-dom";
import UserTemplate from "./Template/UserTemplate/UserTemplate";
import "animate.css";
import HomePage from "./Pages/Home/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserTemplate />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
