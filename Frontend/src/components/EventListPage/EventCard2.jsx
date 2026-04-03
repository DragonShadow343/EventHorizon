const EventCard2 = ({ event, onClick }) => {
    return (
        <div onClick={onClick} className="flex bg-white rounded-lg shadow border border-gray-100 p-4 w-full h-40 cursor-pointer">
            {/* image placeholder */}
            <div className="relative w-1/4">
                <img src={event.imageURL} alt={event.name} className="h-full w-80 rounded" />
                <div className="absolute inset-0 flex items-center justify-start">
                </div>
            </div>

            {/* content */}
            <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="text-lg font-bold">
                    {event && event.name ? event.name : "Event Name"}
                </div>

                <div className="text-gray-600">
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
