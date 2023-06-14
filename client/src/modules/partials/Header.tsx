import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-custom-red">
        <div className="container w-full mx-auto">
          <span className="mt-5 mb-3 ml-3 mr-8 inline-block">
            <img
              srcSet="/images/f1_logo.svg 2x"
              alt=""
              onClick={() => navigate("/season")}
              style={{ cursor: "pointer" }}
            />
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
