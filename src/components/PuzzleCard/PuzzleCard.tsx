import { useNavigate } from "react-router-dom";
import { PuzzleMetadata } from "../../data/types";
import snakeToText from "../../utils/snakeToText";
import StarRanking from "../StarRanking/StarRanking";
import "./PuzzleCard.css";
import rankToColor from "../../utils/rankToColor";
import { useEffect, useState } from "react";
import { isPuzzleCompleted } from "../../utils/isPuzzleCompleted";
import { Icon } from "@iconify/react/dist/iconify.js";

type PuzzleCardType = {
  puzzle: PuzzleMetadata;
};
const PuzzleCard = ({ puzzle }: PuzzleCardType) => {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setCompleted(isPuzzleCompleted(puzzle.file));
  }, [puzzle.file]);

  return (
    <div className={`puzzle-card${completed ? " completed" : ""}`} onClick={() => navigate(`/${puzzle.file}`)}>
      <div className="puzzle-card-header" style={{ background: rankToColor(puzzle.rank) }}>
        <div className="puzzle-card-id">{`#${puzzle.id + 1}`}</div>
        <div className="puzzle-card-title">{snakeToText(puzzle.file)}</div>
        <div className="puzzle-card-completed">{completed && <Icon className="puzzle-card-completed-icon" icon={"mdi:check-circle"} />}</div>
      </div>
      <div className="puzzle-card-bg-container">
        <img className="puzzle-card-bg" src={`puzzles/${puzzle.file}.png`} alt="" />
      </div>
      <StarRanking score={puzzle.rank} />
    </div>
  );
};

export default PuzzleCard;
