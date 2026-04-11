const EventCard2 = ({ event, onClick }) => {
    return (
        <div
          onClick={onClick}
          className="flex cursor-pointer flex-col gap-4 rounded-lg border border-gray-100 bg-gray-100 p-4 shadow sm:flex-row sm:items-stretch"
        >
            {/* image placeholder */}
            <div className="relative rounded-lg overflow-clip w-full bg-white max-h-40 sm:w-80">
                <img src={event.imageURL} alt={event.name} className="h-36 sm:min-h-40 w-full object-cover sm:h-full" />
                <div className="absolute inset-0 flex items-center justify-start">
                </div>
            </div>

            {/* content */}
            <div className="flex flex-1 flex-col justify-start gap-3 sm:p-2">
                <div className="text-lg font-bold sm:text-xl">
                    {event && event.name ? event.name : "Event Name"}
                </div>

                <div className="line-clamp-3 text-gray-600">
                    {event && event.desc ? event.desc : "Event Description"}
                </div>
            </div>

            <div className="flex items-end text-blue-500">
                <span className="font-medium">More info</span>
                <span className="ml-2">→</span>
            </div>
        </div>
    );
}

export default EventCard2
