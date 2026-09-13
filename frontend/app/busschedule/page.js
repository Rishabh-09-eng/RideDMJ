import { weekdaySchedule, weekendSchedule } from "@/data/schedule";


function ScheduleTable({ title, rows }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-md">
      <h3 className="mb-4 text-xl font-bold text-gray-800">{title}</h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2 text-left">
                Bus
              </th>
              <th className="border border-gray-300 p-2 text-left">
                Out Time
              </th>
              <th className="border border-gray-300 p-2 text-left">
                Purpose
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2 font-medium">
                  {row.bus}
                </td>
                <td className="border border-gray-300 p-2">
                  {row.time}
                </td>
                <td className="border border-gray-300 p-2">
                  {row.purpose || "Staff/Student"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ScheduleSection({ title, schedule }) {
  const instituteToSadar = schedule.filter(
    (item) => item.from === "Institute" && item.to === "Sadar"
  );

  const instituteToKakartala = schedule.filter(
    (item) =>
      item.from === "Institute" && item.to === "Kakartala-Gadheri"
  );

  const sadarToInstitute = schedule.filter(
    (item) => item.from === "Sadar" && item.to === "Institute"
  );

  const kakartalaToInstitute = schedule.filter(
    (item) =>
      item.from === "Kakartala-Gadheri" && item.to === "Institute"
  );

  return (
    <section className="mb-12">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
        {title}
      </h2>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <ScheduleTable
            title="Institute → Sadar"
            rows={instituteToSadar}
          />

          {instituteToKakartala.length > 0 && (
            <ScheduleTable
              title="Institute → Kakartala-Gadheri"
              rows={instituteToKakartala}
            />
          )}
        </div>

        <div className="space-y-6">
          <ScheduleTable
            title="Sadar → Institute"
            rows={sadarToInstitute}
          />

          {kakartalaToInstitute.length > 0 && (
            <ScheduleTable
              title="Kakartala-Gadheri → Institute"
              rows={kakartalaToInstitute}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default function BusSchedulePage() {
  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 sm:px-6 lg:px-10">
      <h1 className="mb-10 text-center text-3xl font-bold text-gray-800">
        IIITDMJ Bus Schedule
      </h1>

      <ScheduleSection
        title="Monday–Friday"
        schedule={weekdaySchedule}
      />

      <ScheduleSection
        title="Saturday–Sunday"
        schedule={weekendSchedule}
      />
    </main>
  );
}