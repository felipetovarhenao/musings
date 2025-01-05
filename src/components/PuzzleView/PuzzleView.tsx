import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { PuzzleMetadata } from "../../data/types";
import snakeToText from "../../utils/snakeToText";
import AppLogo from "../AppLogo/AppLogo";

type PuzzleViewType = {
  previous?: PuzzleMetadata;
  metadata: PuzzleMetadata;
  next?: PuzzleMetadata;
};

const PuzzleView = ({ next, metadata, previous }: PuzzleViewType) => {
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

  return (
    <div className="puzzle-view">
      <div className="banner">
        <AppLogo />
        <nav className="nav-bar">
          {previous && <Link to={`/${previous.file}`}>previous: {snakeToText(previous.file)}</Link>}
          {next && <Link to={`/${next.file}`}>next puzzle: {snakeToText(next.file)}</Link>}
        </nav>
        <h2>{title}</h2>
      </div>

      <audio className="puzzle-player" controls ref={audioRef}>
        <source src={`puzzles/${metadata.file}.mp3`} type="audio/mpeg" />
      </audio>

      {metadata.random && (
        <div className="puzzle-note">
          <p>This puzzle is non-deterministic and involves randomization</p>
        </div>
      )}
      <div className="puzzle-score-roll-container">
        <img className="puzzle-score-roll" src={`puzzles/${metadata.file}.png`} alt={`${metadata.file}`} ref={imageRef} style={imageStyle} />
      </div>
    </div>
  );
};

export default PuzzleView;
