import { Routes, Route } from "react-router-dom";
import "./App.css";
import Container from "./components/Container";
import Practice from "./components/Practice";
import RatedQuestions from "./components/RatedQuestions";
import NavLinks from "./components/NavLinks";
import { Divider } from "@chakra-ui/react";
function App() {
  return (
    <>
      <NavLinks />
      <Divider />

      <Routes>
        <Route path="/" element={<Container />}></Route>
        <Route path="/practice" element={<Practice />}></Route>
        <Route path="/Ratedquestions" element={<RatedQuestions />}></Route>
      </Routes>
    </>
  );
}

export default App;
