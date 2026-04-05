const UserEventCard = ({ event, onClick }) => {
  return (
    <div onClick={onClick} className="relative flex rounded-xl bg-white shadow-sm overflow-clip cursor-pointer">
      <div className="relative w-1/2 h-50">
        {/* Image */}
        <div className="w-full h-full bg-gray-200" />

        <div className="absolute bottom-0 left-0 w-full h-full bg-linear-to-tr from-[#364153] from-0% to-90% to-[#FFFFFF00]">
          <div className="absolute bottom-6 left-6">
            <p className="text-sm text-white">
              {`${event.date.split('T')[0]} • ${event.time}` || "Event Time Unavailable"}
            </p>
            <h3 className="text-2xl font-semibold text-white h-fit w-fit">
              {event.title || "Event Name"}
            </h3>
          </div>
        </div>
      </div>

      <div className="w-1/2 h-full p-4 bg-white flex flex-col justify-between">
        <p className="text-sm text-gray-500">
          {event.description || "Event Description unavailable"}
        </p>
        <div className="flex items-center text-blue-500 w-fit ">
          <span className="text-sm font-medium">More info →</span>
        </div>
      </div>
    </div>
  );
};

export default UserEventCard;