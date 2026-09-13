// frontend/data/schedule.js

// ==========================================
// Monday to Friday Schedule
// ==========================================

export const weekdaySchedule = [
  // Institute → Sadar
  {
    bus: "Bus 2",
    from: "Institute",
    to: "Sadar",
    time: "03:00 PM",
    backend_time: "15:00",
    purpose: "Staff/Student",
  },
  {
    bus: "Bus 1",
    from: "Institute",
    to: "Sadar",
    time: "03:40 PM",
    backend_time: "15:40",
    purpose: "Staff/Student",
  },
  {
    bus: "Bus 1",
    from: "Institute",
    to: "Sadar",
    time: "05:15 PM",
    backend_time: "17:15",
    purpose: "Staff/Student",
  },
  {
    bus: "Bus 2",
    from: "Institute",
    to: "Sadar",
    time: "06:00 PM",
    backend_time: "18:00",
    purpose: "Staff/Student",
  },
  {
    bus: "Bus 1",
    from: "Institute",
    to: "Sadar",
    time: "07:00 PM",
    backend_time: "19:00",
    purpose: "Staff/Student",
  },
  {
    bus: "Bus 1",
    from: "Institute",
    to: "Sadar",
    time: "08:20 PM",
    backend_time: "20:20",
    purpose: "Staff/Student",
  },
  {
    bus: "Bus 2",
    from: "Institute",
    to: "Sadar",
    time: "08:50 PM",
    backend_time: "20:50",
    purpose: "Staff/Student",
  },

  // Institute → Kakartala-Gadheri
  {
    bus: "Bus 2",
    from: "Institute",
    to: "Kakartala-Gadheri",
    time: "04:30–05:40 PM",
    backend_time: null,
    purpose: "Jagriti",
  },
  {
    bus: "Bus 2",
    from: "Institute",
    to: "Kakartala-Gadheri",
    time: "07:10–08:10 PM",
    backend_time: null,
    purpose: "Jagriti",
  },

  // Sadar → Institute
  {
    bus: "Bus 2",
    from: "Sadar",
    to: "Institute",
    time: "03:45 PM",
    backend_time: "15:45",
    purpose: "Staff/Student",
  },
  {
    bus: "Bus 1",
    from: "Sadar",
    to: "Institute",
    time: "04:30 PM",
    backend_time: "16:30",
    purpose: "Staff/Student",
  },
  {
    bus: "Bus 1",
    from: "Sadar",
    to: "Institute",
    time: "06:00 PM",
    backend_time: "18:00",
    purpose: "Staff/Student",
  },
  {
    bus: "Bus 2",
    from: "Sadar",
    to: "Institute",
    time: "06:30 PM",
    backend_time: "18:30",
    purpose: "Staff/Student",
  },
  {
    bus: "Bus 1",
    from: "Sadar",
    to: "Institute",
    time: "07:40 PM",
    backend_time: "19:40",
    purpose: "Staff/Student",
  },
  {
    bus: "Bus 1",
    from: "Sadar",
    to: "Institute",
    time: "09:00 PM",
    backend_time: "21:00",
    purpose: "Last Bus 1",
  },
  {
    bus: "Bus 2",
    from: "Sadar",
    to: "Institute",
    time: "09:30 PM",
    backend_time: "21:30",
    purpose: "Last Bus 2",
  },

  // Kakartala-Gadheri → Institute
  {
    bus: "Bus 2",
    from: "Kakartala-Gadheri",
    to: "Institute",
    time: "04:30–05:40 PM",
    backend_time: null,
    purpose: "Jagriti",
  },
  {
    bus: "Bus 2",
    from: "Kakartala-Gadheri",
    to: "Institute",
    time: "07:10–08:10 PM",
    backend_time: null,
    purpose: "Jagriti",
  },
];

// ==========================================
// Saturday and Sunday Schedule
// ==========================================

export const weekendSchedule = [
  // Institute → Sadar
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

// ==========================================
// Bookable Slots for Book-Ticket Page
// Only Institute → Sadar trips are included.
// ==========================================

const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const WEEKENDS = ["Saturday", "Sunday"];

const weekdayBookableSlots = weekdaySchedule
  .filter(
    (item) =>
      item.from === "Institute" &&
      item.to === "Sadar" &&
      item.backend_time
  )
  .map((item, index) => ({
    id: `weekday-${index + 1}`,
    bus: item.bus,
    from: item.from,
    to: item.to,
    time: item.time,
    backend_time: item.backend_time,
    operatingDays: WEEKDAYS,
    purpose: item.purpose || "Staff/Student",
  }));

const weekendBookableSlots = weekendSchedule
  .filter(
    (item) =>
      item.from === "Institute" &&
      item.to === "Sadar" &&
      item.backend_time
  )
  .map((item, index) => ({
    id: `weekend-${index + 1}`,
    bus: item.bus,
    from: item.from,
    to: item.to,
    time: item.time,
    backend_time: item.backend_time,
    operatingDays: WEEKENDS,
    purpose: item.purpose || "Staff/Student",
  }));

const allBookableSlots = [
  ...weekdayBookableSlots,
  ...weekendBookableSlots,
];

export default allBookableSlots;