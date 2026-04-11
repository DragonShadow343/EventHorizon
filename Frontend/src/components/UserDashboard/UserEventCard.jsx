const UserEventCard = ({ event, onClick }) => {
  const dateLine =
    event?.date && event?.time
      ? `${String(event.date).split("T")[0]} • ${event.time}`
      : event?.date
        ? String(event.date).split("T")[0]
        : "Event Time Unavailable";

  return (
    <div
      onClick={onClick}
      className="relative flex cursor-pointer flex-col overflow-clip rounded-xl bg-white shadow-sm sm:flex-row"
    >
      <div className="relative h-48 w-full sm:h-auto sm:min-h-50 sm:w-1/2">
        <img
          src={`http://localhost:4000/uploads/${event.photos?.[0]}`}
          alt={event.title}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-tr from-[#364153] from-0% to-90% to-[#FFFFFF00]">
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto">
            <p className="text-xs text-white sm:text-sm">{dateLine}</p>
            <h3 className="mt-1 line-clamp-2 text-lg font-semibold text-white sm:text-2xl">
              {event.title || "Event Name"}
            </h3>
          </div>
        </div>
      </div>

      <div className="flex h-full w-full flex-col justify-between gap-3 bg-gray-50 p-4 sm:w-1/2">
        <p className="line-clamp-4 text-sm text-gray-500">
          {event.description || "Event Description unavailable"}
        </p>
        <div className="flex w-fit items-center text-blue-500">
          <span className="text-sm font-medium">More info →</span>
        </div>
      </div>
    </div>
  );
};

export default UserEventCard;