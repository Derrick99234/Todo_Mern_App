import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";

export interface UserData {
  fullname: string;
}

type NavBarProps = {
  userData?: UserData;
};

const NavBar = ({ userData }: NavBarProps) => {
  const navigate = useNavigate();
  const onLogout = () => {
    navigate("/login");
    localStorage.clear();
  };

  return (
    <div className="bg-white  flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">
        <span className="text-blue-400 font-[cursive] text-3xl font-semibold">
          Dev
        </span>
        Todo
      </h2>
      {userData && (
        <>
          <ProfileInfo onLogout={onLogout} userData={userData} />
        </>
      )}
    </div>
  );
};

export default NavBar;
