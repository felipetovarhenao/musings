import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./applogo.css";

const AppLogo = () => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/")} className="applogo">
      <img className="applogo-img" src={logo} alt="app-logo" />
      <h1>musings</h1>
      <span>a collection of algorithmic music puzzles</span>
    </div>
  );
};
export default AppLogo;
