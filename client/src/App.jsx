import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route ,NavLink} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Container from "./components/Container";
import About from "./components/About";
import RatedQuestions from "./components/RatedQuestions";
function App() {
  return (
    <>
      <Header />
     
      <Routes>
        <Route path="/" element={<Container />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route path="/Ratedquestions" element={<RatedQuestions />}></Route>
      </Routes>

      
    </>
  );
}
