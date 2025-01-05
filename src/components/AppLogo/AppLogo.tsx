import { useNavigate } from "react-router-dom";

const AppLogo = () => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/")} className="app-logo">
      <h1>Musical Puzzles</h1>
    </div>
  );
};
export default AppLogo;
