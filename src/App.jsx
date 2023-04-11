import { Route, Routes } from "react-router-dom";
import Flow from "./components/Flow";
import List from "./components/List";

function App() {
  return (
    <div className=" h-screen">
      <Routes>
        <Route exact path="/" element={<List />} />
        <Route path="/:name" element={<Flow />} />
      </Routes>
    </div>
  );
}

export default App;
