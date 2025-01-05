import { useNavigate } from "react-router-dom";
import puzzles from "../../assets/puzzles.json";
import snakeToText from "../../utils/snakeToText";
import AppLogo from "../AppLogo/AppLogo";
import StarRanking from "../StarRanking/StarRanking";

const HomeView = () => {
  const navigate = useNavigate();
  return (
    <div className="home-view">
      <AppLogo />
      <p className="subheader">A collection of algorithmic music puzzles</p>
      <h3 className="about">About</h3>
      <p className="about-text">
        Each puzzle consists of a musical output in the form of a score in Western notation and an audio rendition of it. The goal is to come up with
        some algorithm that generates the musical output as closely as possible.
      </p>
      <div className="puzzle-grid">
        {puzzles.map((puzzle, i) => (
          <div className="puzzle-card" key={i} onClick={() => navigate(`/${puzzle.file}`)}>
            <img className="puzzle-card-bg" src={`puzzles/${puzzle.file}.png`} alt="" />
            <span className="puzzle-card-id">{`Puzzle ${i}`}</span>
            <h5 className="puzzle-card-title">{snakeToText(puzzle.file)}</h5>
            <StarRanking score={puzzle.rank} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeView;
