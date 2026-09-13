// Centralized Bus Schedule Data (Single Source of Truth for Frontend)

export const weekdaySchedule = [
  // Institute → Sadar (Bookable)
  { bus: "Bus 2", from: "Institute", to: "Sadar", time: "03:00 PM", backend_time: "15:00" },
  { bus: "Bus 1", from: "Institute", to: "Sadar", time: "03:40 PM", backend_time: "15:40" },
  { bus: "Bus 1", from: "Institute", to: "Sadar", time: "05:15 PM", backend_time: "17:15" },
  { bus: "Bus 2", from: "Institute", to: "Sadar", time: "06:00 PM", backend_time: "18:00" },
  { bus: "Bus 1", from: "Institute", to: "Sadar", time: "07:00 PM", backend_time: "19:00" },
  { bus: "Bus 1", from: "Institute", to: "Sadar", time: "08:20 PM", backend_time: "20:20" },
  { bus: "Bus 2", from: "Institute", to: "Sadar", time: "08:50 PM", backend_time: "20:50" },

  // Institute → Kakartala-Gadheri
  {
    bus: "Bus 2",
    from: "Institute",
    to: "Kakartala-Gadheri",
    time: "04:30–05:40 PM",
  },
  {
    bus: "Bus 2",
    from: "Institute",
    to: "Kakartala-Gadheri",
    time: "07:10–08:10 PM",
  },

  // Sadar → Institute
  { bus: "Bus 2", from: "Sadar", to: "Institute", time: "03:45 PM", backend_time: "15:45" },
  { bus: "Bus 1", from: "Sadar", to: "Institute", time: "04:30 PM", backend_time: "16:30" },
  { bus: "Bus 1", from: "Sadar", to: "Institute", time: "06:00 PM" },
  { bus: "Bus 2", from: "Sadar", to: "Institute", time: "06:30 PM", backend_time: "18:30" },
  { bus: "Bus 1", from: "Sadar", to: "Institute", time: "07:40 PM", backend_time: "19:40" },
  { bus: "Bus 1", from: "Sadar", to: "Institute", time: "09:00 PM", backend_time: "21:00" },
  { bus: "Bus 2", from: "Sadar", to: "Institute", time: "09:30 PM", backend_time: "21:30" },

  // Kakartala-Gadheri → Institute
  {
    bus: "Bus 2",
    from: "Kakartala-Gadheri",
    to: "Institute",
    time: "04:30–05:40 PM",
  },
  {
    bus: "Bus 2",
    from: "Kakartala-Gadheri",
    to: "Institute",
    time: "07:10–08:10 PM",
  },
];

export const weekendSchedule = [
  // Institute → Sadar (Bookable)
  {
    bus: "Bus 2",
    from: "Institute",
    to: "Sadar",
    time: "03:00 PM",
    backend_time: "15:00",
    purpose: "Via Russel Chowk",
  },
  {
    bus: "Bus 1",
    from: "Institute",
    to: "Sadar",
    time: "03:30 PM",
    backend_time: "15:30",
    purpose: "Via Russel Chowk",
  },
  {
    bus: "Bus 2",
    from: "Institute",
    to: "Sadar",
    time: "05:30 PM",
    backend_time: "17:30",
  },
  {
    bus: "Bus 1",
    from: "Institute",
    to: "Sadar",
    time: "06:00 PM",
    backend_time: "18:00",
  },
  {
    bus: "Bus 1",
    from: "Institute",
    to: "Sadar",
    time: "07:00 PM",
    backend_time: "19:00",
  },
  {
    bus: "Bus 2",
    from: "Institute",
    to: "Sadar",
    time: "08:50 PM",
    backend_time: "20:50",
  },

  // Sadar → Institute
  {
    bus: "Bus 2",
    from: "Sadar",
    to: "Institute",
    time: "04:30 PM",
    backend_time: "16:30",
  },
  {
    bus: "Bus 1",
    from: "Sadar",
    to: "Institute",
    time: "05:20 PM",
    backend_time: "17:20",
  },
  {
    bus: "Bus 1",
    from: "Sadar",
    to: "Institute",
    time: "06:30 PM",
    backend_time: "18:30",
  },
  {
    bus: "Bus 2",
    from: "Sadar",
    to: "Institute",
    time: "07:30 PM",
    backend_time: "19:30",
    purpose: "Via Russel Chowk",
  },
  {
    bus: "Bus 1",
    from: "Sadar",
    to: "Institute",
    time: "09:15 PM",
    backend_time: "21:15",
    purpose: "Via Russel Chowk - Last Bus 1",
  },
  {
    bus: "Bus 2",
    from: "Sadar",
    to: "Institute",
    time: "09:30 PM",
    backend_time: "21:30",
    purpose: "Last Bus 2",
  },
];

// Bookable slots automatically extracted for book-ticket page (Institute to Sadar)
const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const WEEKENDS = ["Saturday", "Sunday"];

const weekdayBookableSlots = weekdaySchedule
  .filter((item) => item.from === "Institute" && item.to === "Sadar" && item.backend_time)
  .map((item, index) => ({
    id: `weekday-${index + 1}`,
    bus: item.bus,
    time: item.time,
    backend_time: item.backend_time,
    operatingDays: WEEKDAYS,
  }));

const weekendBookableSlots = weekendSchedule
  .filter((item) => item.from === "Institute" && item.to === "Sadar" && item.backend_time)
  .map((item, index) => ({
    id: `weekend-${index + 1}`,
    bus: item.bus,
    time: item.time,
    backend_time: item.backend_time,
    operatingDays: WEEKENDS,
  }));

const allBookableSlots = [...weekdayBookableSlots, ...weekendBookableSlots];

export default allBookableSlots;