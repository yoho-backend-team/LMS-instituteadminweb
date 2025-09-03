
import Icon from "../../../assets/moneyicon.png";
import Icon2 from "../../../assets/moneyicon2.png";
import Icon3 from "../../../assets/moneyicon3.png";
import Icon4 from "../../../assets/moneyicon4.png";

const dummyStats = [
  {
    icon: Icon,
    title: "Total Users",
    count: "0",
    color: "#FBE3DF",
  },
  {
    icon: Icon2,
    title: "Total Groups",
    count: "0",
    color: "#E0DDF9",
  },
  {
    icon: Icon3,
    title: "Active Users",
    count: "0",
    color: "#D7F6F5",
  },
  {
    icon: Icon4,
    title: "Blocked Users",
    count: "0",
    color: "#DEF6D7",
  },
];

function StatsCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {dummyStats.map((card, idx) => (
        <div
          key={idx}
          className="shadow-md rounded-xl p-4 flex flex-col justify-between h-32 relative"
          style={{ backgroundColor: card.color }}
        >
          {/* Icon and Title */}
          <div className="flex items-center gap-3">
            <div className="w-15 h-15 bg-white rounded-lg shadow-[0_0_15px_rgba(255,255,255,010)] flex items-center justify-center">
              <img src={card.icon} alt="icon" className="w-10 h-10" />
            </div>

            <p className="text-xl font-medium text-[#716F6F]">{card.title}</p>
          </div>

          {/* Count at Bottom Right */}
          <p className="text-3xl font-semibold text-[#716F6F] absolute bottom-4 right-4">
            {card.count}
          </p>
        </div>
      ))}
    </div>
  );
}

export default StatsCard;
