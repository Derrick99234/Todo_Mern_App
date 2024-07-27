import { getInitails } from "../../utils/helper";

interface UserData {
  fullname: string;
}

type ProfileInfoProps = {
  onLogout: () => void;
  userData: UserData;
};

const ProfileInfo = ({ onLogout, userData }: ProfileInfoProps) => {
  return (
    <div className="flex items-center gap-3">
      <p className="text-sm font-medium">{userData?.fullname}</p>
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
        {getInitails(userData?.fullname)}
      </div>
      <div>
        <button className="text-sm text-slate-700 underline" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
