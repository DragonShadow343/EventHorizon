const EventCard = ({ event }) => {
  return (
    <div class="flex bg-white rounded-lg shadow p-4">
      {/* image placeholder */}
      <div class="relative w-1/3">
        <div class="bg-gray-200 h-full" />
        <div class="absolute inset-0 flex items-center justify-center">
        </div>
      </div>

      {/* content */}
      <div class="flex-1 p-4 flex flex-col justify-between">
        <div class="text-lg font-bold">
          {event && event.name ? event.name : "Event Name"}
        </div>

        <div class="text-gray-600">
          {event && event.desc ? event.desc : "Event Description"}
        </div>

        <div class="flex items-center text-blue-500">
          <span class="font-medium">More info</span>
          <span class="ml-2">→</span>
        </div>
      </div>
    </div>
  );
};