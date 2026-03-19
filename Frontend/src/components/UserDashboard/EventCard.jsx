const EventCard = ({ event }) => {
  return (
    <div className="flex rounded-xl bg-white p-4 shadow-sm">
      {/* Image */}
      <div className="w-1/3 rounded-lg bg-gray-200" />

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {event?.name || "Event Name"}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {event?.desc || "Event Description"}
          </p>
        </div>

        <div className="mt-4 flex items-center text-blue-500">
          <span className="text-sm font-medium">More info</span>
          <span className="ml-2">→</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;