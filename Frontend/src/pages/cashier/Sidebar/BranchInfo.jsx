
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

const BranchInfo = () => {
  const { branch, loading, error } = useSelector((state) => state.branch);


  if (loading) {
    return (
      <div className="mt-4 p-3 rounded-lg text-sm bg-black/20 border border-white/10 flex items-center justify-center h-24">
        <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="mt-4 p-3 rounded-lg text-sm bg-red-900/30 border border-red-500/50 text-red-300">
        <p>Error loading branch info.</p>
      </div>
    );
  }
  return (
    <div className="mt-4 p-3 rounded-lg text-sm bg-black/20 border border-white/10 backdrop-blur-sm">
      <h3 className="font-semibold mb-2 text-white">Branch Info</h3>
      <p className="text-gray-300"><strong className="text-gray-400">Name:</strong> {branch.name}</p>
      <p className="text-gray-300"><strong className="text-gray-400">Address:</strong> {branch.address}</p>
    </div>
  );
};

export default BranchInfo;
