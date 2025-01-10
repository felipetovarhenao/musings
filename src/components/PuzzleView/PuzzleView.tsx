import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { PuzzleMetadata } from "../../data/types";
import snakeToText from "../../utils/snakeToText";
import AppLogo from "../AppLogo/AppLogo";
import StarRanking from "../StarRanking/StarRanking";
import { Icon } from "@iconify/react/dist/iconify.js";
import "./PuzzleView.css";
import eventTracker from "../../utils/eventTracker";
import PuzzleToggle from "../PuzzleToggle/PuzzleToggle";

type PuzzleViewType = {
  previous?: PuzzleMetadata;
  metadata: PuzzleMetadata;
  next?: PuzzleMetadata;
};

const PuzzleView = ({ next, metadata, previous }: PuzzleViewType) => {
  const title = snakeToText(metadata.file);
  const navigate = useNavigate();

  // Ref for the WaveSurfer instance
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const waveContainerRef = useRef<HTMLDivElement | null>(null);

  // Ref for the image element
  const imageRef = useRef<HTMLImageElement | null>(null);

  // State to store the size
  const [imageStyle, setImageStyle] = useState<React.CSSProperties>({});
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (waveSurferRef.current) {
      waveSurferRef.current.playPause();
      setIsPlaying(waveSurferRef.current.isPlaying()); // Update the playing state
    }
  };
  useEffect(() => {
    setIsPlaying(false);
    if (!waveContainerRef.current) return;

    // Initialize WaveSurfer instance
    waveSurferRef.current = WaveSurfer.create({
      container: waveContainerRef.current,
      waveColor: "#ddd",
      progressColor: "#66BAED",
      height: 60,
      normalize: true,
    });

    // Load the audio file when the component is mounted
    waveSurferRef.current.load(`puzzles/${metadata.file}.mp3`);

    // Handle scrolling of the image container based on audio progress
    const handleAudioProgress = () => {
      if (waveSurferRef.current && imageContainerRef.current && imageRef.current) {
        const duration = waveSurferRef.current.getDuration();
        const currentTime = waveSurferRef.current.getCurrentTime();
        const progress = currentTime / duration;

        // Calculate the new scroll position
        const imageWidth = imageRef.current.offsetWidth;
        const containerWidth = imageContainerRef.current.offsetWidth;
        const scrollableWidth = imageWidth - containerWidth;

        // Scroll to the calculated position
        imageContainerRef.current.scrollLeft = scrollableWidth * progress;
      }
    };

    waveSurferRef.current.on("audioprocess", handleAudioProgress);

    // Cleanup the WaveSurfer instance and remove event listeners on unmount
    return () => {
      waveSurferRef.current?.un("audioprocess", handleAudioProgress);
      waveSurferRef.current?.destroy();
      waveSurferRef.current = null;
    };
  }, [metadata.file]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        togglePlayPause();
      } else if (e.code == "ArrowLeft" && previous) {
        e.preventDefault();
        navigate(`/${previous.file}`);
      } else if (e.code == "ArrowRight" && next) {
        e.preventDefault();
        navigate(`/${next.file}`);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlayPause]);

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
  }, [metadata.file]);

  useEffect(() => {
    eventTracker("view_puzzle", metadata.file);
  }, [metadata.file]);

  return (
    <div className="puzzleview view">
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
          <PuzzleToggle puzzle={metadata} />
          <div>{`#${metadata.id + 1}`}</div>
          <h2>{title}</h2>
          {metadata.legend && <span className="puzzleview-banner-legend">{metadata.legend}</span>}
        </div>
        <StarRanking score={metadata.rank} />
      </div>

      <div className="puzzleview-player">
        <button className="puzzleview-wavesurfer-button" onClick={togglePlayPause}>
          {isPlaying ? <Icon icon="ic:baseline-pause" /> : <Icon icon="ic:baseline-play-arrow" />}
        </button>
        <div ref={waveContainerRef} className="puzzleview-wavesurfer"></div>
      </div>

      <div ref={imageContainerRef} className="puzzleview-score-container">
        <img className="puzzleview-player-score" src={`puzzles/${metadata.file}.png`} alt={`${metadata.file}`} ref={imageRef} style={imageStyle} />
      </div>
      {metadata.random && (
        <div className="puzzleview-notes">
          <Icon className="puzzleview-notes-icon" icon={"ri:dice-line"} />
          <p className="puzzleview-notes-text">This puzzle is non-deterministic and involves randomization.</p>
        </div>
      )}
    </div>
  );
};

export default PuzzleView;
