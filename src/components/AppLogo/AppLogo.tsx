import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./applogo.css";

const AppLogo = () => {
  const navigate = useNavigate();
  const colors = [
    "#F64F4F",
    "#703775",
    "#66BAED",
    // "#FFE151"
  ];

  return (
    <div onClick={() => navigate("/")} className="applogo">
      <img className="applogo-img" src={logo} alt="app-logo" />
      <h1 className="applogo-header">
        {Array.from("replay").map((letter, index) => (
          <span key={index} style={{ color: colors[index % colors.length] }}>
            {letter}
          </span>
        ))}
      </h1>
      <span>a collection of algorithmic music puzzles</span>
    </div>
  );
};

export default AppLogo;
