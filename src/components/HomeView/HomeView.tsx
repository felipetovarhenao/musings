import puzzles from "../../assets/puzzles.json";
import AppLogo from "../AppLogo/AppLogo";
import PuzzleCard from "../PuzzleCard/PuzzleCard";
import "./homeview.css";

const HomeView = () => {
  return (
    <div className="homeview">
      <AppLogo />
      <h3 className="homeview-about">about</h3>
      <p className="homeview-about-text">
        This website is a collection of algorithmic music puzzles with varying degrees of difficulty. Each puzzle consists of a desired musical
        output, in the form of a score in Western music notation and an audio rendition of it. The goal of each puzzle is to come up with some
        algorithm that generates the musical output, in whichever programming environment you choose (Max, Python, OpenMusic, bellplay~, etc.). While
        there are multiple solutions to each puzzle, the more elegant and efficient your algorithm is, the better. Broadly speaking, solving these
        puzzles require two types of skills:
      </p>
      <ul className="homeview-about-text">
        <li>
          <b>Analytical:</b> your ability to understand and identify the underlying pattern or logic behind each puzzle.
        </li>
        <li>
          <b>Technical:</b> your ability to implement the algorithm to generate the desired musical output.
        </li>
      </ul>
      <p className="homeview-about-text">Happy coding!</p>
      <div className="homeview-puzzle-grid">
        {puzzles.map((puzzle, i) => (
          <PuzzleCard key={i} id={i} puzzle={puzzle} />
        ))}
      </div>
    </div>
  );
};

export default HomeView;
