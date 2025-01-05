import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { PuzzleMetadata } from "../../data/types";
import snakeToText from "../../utils/snakeToText";
import AppLogo from "../AppLogo/AppLogo";
import StarRanking from "../StarRanking/StarRanking";
import "./puzzleview.css";
import { Icon } from "@iconify/react/dist/iconify.js";

type PuzzleViewType = {
  id: number;
  previous?: PuzzleMetadata;
  metadata: PuzzleMetadata;
  next?: PuzzleMetadata;
};

const PuzzleView = ({ next, metadata, previous, id }: PuzzleViewType) => {
  const title = snakeToText(metadata.file);

  // Ref for the audio element
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Ref for the image element
  const imageRef = useRef<HTMLImageElement | null>(null);

  // State to store the size
  const [imageStyle, setImageStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    // Reset the audio source when metadata.file changes
    if (audioRef.current) {
      audioRef.current.load(); // Ensures the audio element reloads the new source
    }
  }, [metadata.file]);

  useEffect(() => {
    if (imageRef.current) {
      const image = imageRef.current;

      // Wait for the image to load to get its dimensions
      const handleImageLoad = () => {
        const originalWidth = image.naturalWidth;
        const originalHeight = image.naturalHeight;

        // Set the size to 50% of the original
        setImageStyle({
          width: `${originalWidth * 0.66}px`,
          height: `${originalHeight * 0.66}px`,
        });
      };

      if (image.complete) {
        handleImageLoad();
      } else {
        image.addEventListener("load", handleImageLoad);
        return () => {
          image.removeEventListener("load", handleImageLoad);
        };
      }
    }
  }, [metadata.file]);

  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll the container to the left whenever the image changes
    if (imageContainerRef.current) {
      imageContainerRef.current.scrollTo({ left: 0, behavior: "smooth" }); // Scroll to the beginning
    }
  }, [metadata.file]); // Dependency ensures effect runs when the imageUrl changes

  return (
    <div className="puzzleview">
      <div className="puzzleview-banner">
        <AppLogo />
        <nav className="puzzleview-banner-navbar">
          {previous ? (
            <Link className="puzzleview-banner-navbar-link" to={`/${previous.file}`}>
              <Icon icon="material-symbols:arrow-back-ios-rounded" /> {snakeToText(previous.file)}
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link className="puzzleview-banner-navbar-link" to={`/${next.file}`}>
              {snakeToText(next.file)}
              <Icon icon="material-symbols:arrow-forward-ios-rounded" />
            </Link>
          ) : (
            <div />
          )}
        </nav>
        <div className="puzzleview-banner-title">
          <span>{`#${id + 1}`}</span>
          <h2>{title}</h2>
        </div>
        <StarRanking score={metadata.rank} />
      </div>
      <audio className="puzzleview-player" controls ref={audioRef}>
        <source src={`puzzles/${metadata.file}.mp3`} type="audio/mpeg" />
      </audio>

      <div ref={imageContainerRef} className="puzzleview-score-container">
        <img className="puzzleview-player-score" src={`puzzles/${metadata.file}.png`} alt={`${metadata.file}`} ref={imageRef} style={imageStyle} />
      </div>
      {metadata.random && (
        <div className="puzzleview-notes">
          <p>This puzzle is non-deterministic and involves randomization</p>
        </div>
      )}
    </div>
  );
};

export default PuzzleView;
