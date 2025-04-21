
import { CalendarClock } from "lucide-react";

const EventSchedule = () => (
  <div className="md:col-span-2 bg-blue-50 p-8 rounded-xl shadow-md border border-blue-200">
    <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
      <CalendarClock className="h-5 w-5 text-blue-600" />
      Competition Schedule
    </h3>
    <div className="space-y-4">
      <div className="bg-white p-3 rounded-lg border border-blue-100">
        <h4 className="font-semibold text-blue-700">Registration Deadline</h4>
        <p className="text-sm text-blue-500">May 15, 2025</p>
      </div>
      <div className="bg-white p-3 rounded-lg border border-blue-100">
        <h4 className="font-semibold text-blue-700">Preliminary Round</h4>
        <p className="text-sm text-blue-500">May 20-25, 2025</p>
      </div>
      <div className="bg-white p-3 rounded-lg border border-blue-100">
        <h4 className="font-semibold text-blue-700">Championship Finals</h4>
        <p className="text-sm text-blue-500">June 5, 2025</p>
      </div>
    </div>
  </div>
);

export default EventSchedule;
