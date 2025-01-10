import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { PuzzleMetadata } from "../../data/types";
import "./PuzzleToggle.css";

interface PuzzleToggleProps {
  puzzle: PuzzleMetadata; // Unique puzzle name
}

const PuzzleToggle: React.FC<PuzzleToggleProps> = ({ puzzle }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  // Load the completion state for this puzzle from local storage on mount
  useEffect(() => {
    const storedData = localStorage.getItem("completedPuzzles");
    if (storedData) {
      const completedPuzzles = JSON.parse(storedData);
      setIsCompleted(!!completedPuzzles[puzzle.file]);
    }
  }, [puzzle.file]);

  // Toggle the completion state and save to local storage
  const toggleCompletion = () => {
    setIsCompleted((prev) => {
      const newState = !prev;
      const storedData = localStorage.getItem("completedPuzzles");
      const completedPuzzles = storedData ? JSON.parse(storedData) : {};

      if (newState) {
        completedPuzzles[puzzle.file] = true;
      } else {
        delete completedPuzzles[puzzle.file];
      }

      localStorage.setItem("completedPuzzles", JSON.stringify(completedPuzzles));
      return newState;
    });
  };

  return (
    <button
      className="puzzle-toggle"
      onClick={toggleCompletion}
      aria-label={isCompleted ? `Mark ${puzzle} as incomplete` : `Mark ${puzzle} as completed`}
    >
      <Icon icon={isCompleted ? "mdi:check-circle" : "mdi:circle-outline"} color={isCompleted ? "#1da86b" : "gray"} width="24" height="24" />
    </button>
  );
};

export default PuzzleToggle;
