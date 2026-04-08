const EventCard2 = ({ event, onClick }) => {
    return (
        <div
          onClick={onClick}
          className="flex cursor-pointer flex-col gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow sm:flex-row sm:items-stretch"
        >
            {/* image placeholder */}
            <div className="relative w-full sm:w-56">
                <img src={event.imageURL} alt={event.name} className="h-36 w-full rounded object-cover sm:h-full" />
                <div className="absolute inset-0 flex items-center justify-start">
                </div>
            </div>

            {/* content */}
            <div className="flex flex-1 flex-col justify-between gap-3 sm:p-2">
                <div className="text-lg font-bold sm:text-xl">
                    {event && event.name ? event.name : "Event Name"}
                </div>

                <div className="line-clamp-3 text-gray-600">
                    {event && event.desc ? event.desc : "Event Description"}
                </div>

                <div className="flex items-center text-blue-500">
                    <span className="font-medium">More info</span>
                    <span className="ml-2">→</span>
                </div>
            </div>
        </div>
    );
}

export default EventCard2
