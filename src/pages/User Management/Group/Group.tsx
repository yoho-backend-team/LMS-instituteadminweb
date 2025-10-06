import { useNavigate } from "react-router-dom";
import StatsCard from "../../../components/Usermanagement/Group/StatsCard";

function Group() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-2xl font-semibold">Group</p>
        <button
          onClick={() => navigate("/group/add")}
          className="px-6 py-2 bg-[#10CFC9] text-white rounded-md hover:bg-[#0db5bb] transition text-sm font-semibold"
        >
          + Add New Group
        </button>
      </div>

      <div className="mt-6">
        <StatsCard />
      </div>
    </>
  );
}

export default Group;
