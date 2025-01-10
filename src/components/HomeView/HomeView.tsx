import { useEffect, useState } from "react";
import puzzles from "../../assets/puzzles.json";
import AppLogo from "../AppLogo/AppLogo";
import PuzzleCard from "../PuzzleCard/PuzzleCard";
import SearchBar from "../SearchBar/SearchBar";
import "./HomeView.css";
import eventTracker from "../../utils/eventTracker";

const HomeView = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter puzzles based on search query
  const filteredPuzzles = puzzles.filter((puzzle) => puzzle.file.toLowerCase().includes(searchQuery.toLowerCase()));

  useEffect(() => {
    eventTracker("home_page");
  }, []);

  return (
    <div className="homeview view">
      <AppLogo />
      <h3 className="homeview-about">about</h3>
      <p className="homeview-about-text">
        This website is a collection of algorithmic music puzzles with varying degrees of difficulty. Each puzzle consists of a desired musical
        output, in the form of a score in Western music notation and an audio rendition of it. The goal for each puzzle is to come up with some
        algorithm that generates the musical output, in whichever programming environment you choose (
        <a href="https://cycling74.com/downloads">Max</a>/<a href="https://www.bachproject.net/">bach</a>,{" "}
        <a href="https://www.python.org/">Python</a>, <a href="https://openmusic-project.github.io/">OpenMusic</a>,{" "}
        <a href="https://github.com/felipetovarhenao/bellplay/releases/latest/">bellplay~</a>, etc.). While there are multiple solutions to each
        puzzle, the more elegant and efficient your algorithm is, the better. Broadly speaking, solving these puzzles requires two types of skills:
      </p>
      <ul className="homeview-about-text">
        <li>
          <b>Analytical:</b> your ability to understand and identify the underlying pattern or logic behind each puzzle.
        </li>
        <li>
          <b>Technical:</b> your ability to implement the algorithm to generate the desired musical output.
        </li>
      </ul>
      <p className="homeview-about-text">
        While the puzzles are intended to increase in complexity, this is somewhat subjective and can largely vary based on the programming
        environment you choose to work with.
      </p>
      <p className="homeview-about-text">Happy coding!</p>
      <div className="homeview-puzzle-header">
        <h3 className="homeview-about">puzzles</h3>
        <SearchBar query={searchQuery} onSearch={setSearchQuery} />
      </div>
      <div className="homeview-puzzle-grid">
        {filteredPuzzles.length > 0 ? (
          filteredPuzzles.map((puzzle, i) => <PuzzleCard key={i} id={i} puzzle={puzzle} />)
        ) : (
          <div>No puzzles match "{searchQuery}".</div>
        )}
      </div>
    </div>
  );
};

export default HomeView;
