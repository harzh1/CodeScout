import { Routes, Route } from "react-router-dom";
import "./App.css";
import Container from "./components/Container";
import About from "./components/About";
import RatedQuestions from "./components/RatedQuestions";
import NavLinks from "./components/NavLinks";
function App() {
  return (
    <>
      <NavLinks />

      <Routes>
        <Route path="/" element={<Container />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route path="/Ratedquestions" element={<RatedQuestions />}></Route>
      </Routes>
    </>
  );
}

export default App;