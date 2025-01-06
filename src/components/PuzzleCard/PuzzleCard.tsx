import { useNavigate } from "react-router-dom";
import { PuzzleMetadata } from "../../data/types";
import snakeToText from "../../utils/snakeToText";
import StarRanking from "../StarRanking/StarRanking";
import "./PuzzleCard.css";
import rankToColor from "../../utils/rankToColor";

type PuzzleCardType = {
  id: number;
  puzzle: PuzzleMetadata;
};
const PuzzleCard = ({ id, puzzle }: PuzzleCardType) => {
  const navigate = useNavigate();

  return (
    <div className="puzzle-card" key={id} onClick={() => navigate(`/${puzzle.file}`)}>
      <div className="puzzle-card-header" style={{ background: rankToColor(puzzle.rank) }}>
        <div className="puzzle-card-id">{`#${id + 1}`}</div>
        <div className="puzzle-card-title">{snakeToText(puzzle.file)}</div>
        <div />
      </div>
      <div className="puzzle-card-bg-container">
        <img className="puzzle-card-bg" src={`puzzles/${puzzle.file}.png`} alt="" />
      </div>
      <StarRanking score={puzzle.rank} />
    </div>
  );
};

export default PuzzleCard;
