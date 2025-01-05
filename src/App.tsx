import { Route, HashRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import HomeView from "./components/HomeView/HomeView";

import puzzles from "./assets/puzzles.json";
import PuzzleView from "./components/PuzzleView/PuzzleView";
import { PuzzleMetadata } from "./data/types";

function App() {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<HomeView />} />
        {puzzles
          .sort((a, b) => (a.rank > b.rank ? 1 : -1))
          .map((puzzle: PuzzleMetadata, i: number) => {
            return (
              <Route
                key={puzzle.file}
                path={`/${puzzle.file}`}
                element={
                  <PuzzleView
                    previous={i > 0 ? puzzles[i - 1] : undefined}
                    next={i < puzzles.length - 1 ? puzzles[i + 1] : undefined}
                    metadata={puzzle}
                  />
                }
              />
            );
          })}
      </Routes>
    </Router>
  );
}

export default App;
