import React from "react";
import { Icon } from "@iconify/react";
import starFilled from "@iconify-icons/mdi/star";
import starHalf from "@iconify-icons/mdi/star-half-full";
import starOutline from "@iconify-icons/mdi/star-outline";

interface StarRankingProps {
  score: number; // Score can now be a float between 0 and 10
}

const StarRanking: React.FC<StarRankingProps> = ({ score }) => {
  const maxScore = 10;

  // Generate an array of star icons based on the score
  const renderStars = () => {
    return Array.from({ length: maxScore }, (_, index) => {
      const position = index + 1; // Star index starts from 1
      if (score >= position) {
        // Full star
        return <Icon key={index} icon={starFilled} style={{ color: "var(--accent-color)", fontSize: "24px" }} />;
      } else if (score > position - 1 && score < position) {
        // Half star
        return <Icon key={index} icon={starHalf} style={{ color: "var(--accent-color)", fontSize: "24px" }} />;
      } else {
        // Empty star
        return <Icon key={index} icon={starOutline} style={{ color: "var(--accent-color)", fontSize: "24px" }} />;
      }
    });
  };

  return <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>{renderStars()}</div>;
};

export default StarRanking;
