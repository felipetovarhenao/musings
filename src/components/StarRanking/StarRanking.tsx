import React from "react";
import { Icon } from "@iconify/react";
import starFilled from "@iconify-icons/mdi/star";
import starHalf from "@iconify-icons/mdi/star-half-full";
import starOutline from "@iconify-icons/mdi/star-outline";
import "./StarRanking.css";

interface StarRankingProps {
  score: number; // Score can now be a float between 0 and 10
  className?: string;
}

const StarRanking: React.FC<StarRankingProps> = ({ score, className }) => {
  const maxScore = 10;

  // Generate an array of star icons based on the score
  const renderStars = () => {
    return Array.from({ length: maxScore }, (_, index) => {
      const position = index + 1; // Star index starts from 1
      let icon;
      let type = "filled";
      if (score >= position) {
        // Full star
        icon = starFilled;
      } else if (score > position - 1 && score < position) {
        icon = starHalf;
      } else {
        // Empty star
        icon = starOutline;
        type = "empty";
      }
      return <Icon icon={icon} key={index} className={`starranking-icon ${type} ${className || ""}`} />;
    });
  };

  return <div className="starranking">{renderStars()}</div>;
};

export default StarRanking;
