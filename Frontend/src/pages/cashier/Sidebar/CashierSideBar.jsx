import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getBranchById } from "../../../Redux Toolkit/features/branch/branchThunks";
import { Button } from "../../../components/ui/button";
import { LogOutIcon, ShoppingCart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { logout } from "../../../Redux Toolkit/features/user/userThunks";
import BranchInfo from "./BranchInfo";

const CashierSideBar = ({ navItems, onClose }) => {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.user);
  const { branch, loading, error } = useSelector((state) => state.branch);
  const navigate=useNavigate();

  useEffect(() => {
    if (userProfile && userProfile.branchId) {
      dispatch(
        getBranchById({
          id: userProfile.branchId,
          jwt: localStorage.getItem("jwt"),
        })
      );
      
    }
  }, [dispatch, userProfile]);

  const handleLogout = () => {
    dispatch(logout())
    navigate("/") 
  };

  return (
    <div className="w-64 border-r border-white/10 bg-black/20 backdrop-blur-lg p-4 flex flex-col h-full relative">
      <Button
        className="absolute top-2 right-2 rounded lg:hidden bg-transparent text-gray-400 hover:bg-white/10 hover:text-white"
        onClick={onClose}
        aria-label="Close sidebar"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </Button>
      <div className="flex items-center gap-2 p-2 mb-6">
        <div className="p-2 bg-emerald-500/20 rounded-lg">
          <ShoppingCart className="w-6 h-6 text-emerald-400" />
        </div>
        <h1 className="text-xl font-bold text-white">POS Pro</h1>
      </div>

      <nav className="space-y-2 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
              location.pathname === item.path
                ? "bg-emerald-500/20 text-emerald-300"
                : "text-gray-300 hover:bg-white/5 hover:text-white"
            }`}
            onClick={() => {
              if (onClose) onClose();
            }}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span>{item.label}</span>
            </div>
        
          </Link>
        ))}
      </nav>

      {branch && <BranchInfo />}
      <Separator className="my-4 bg-white/10" />

      <div className="space-y-2">
        <Button
          variant="outline"
          className="w-full justify-center bg-transparent border-red-500/50 text-red-400 hover:bg-red-500/20 hover:text-red-300"
          onClick={handleLogout}
        >
          <LogOutIcon className="mr-2 h-4 w-4" />
          End Shift & Logout
        </Button>
      </div>
    </div>
  );
};

export default CashierSideBar;
