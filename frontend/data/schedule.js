const schedules = [
  // Monday to Friday
  {
    id: "bus2-weekday-1",
    bus: "Bus 2",
    time: "3:00 PM",
    backend_time: "15:00",
    operatingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  {
    id: "bus1-weekday-1",
    bus: "Bus 1",
    time: "3:40 PM",
    backend_time: "15:00",
    operatingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  {
    id: "bus1-weekday-2",
    bus: "Bus 1",
    time: "5:15 PM",
    operatingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  {
    id: "bus2-weekday-2",
    bus: "Bus 2",
    time: "6:00 PM",
    operatingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  {
    id: "bus1-weekday-3",
    bus: "Bus 1",
    time: "7:00 PM",
    operatingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  {
    id: "bus1-weekday-4",
    bus: "Bus 1",
    time: "8:20 PM",
    operatingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  {
    id: "bus2-weekday-3",
    bus: "Bus 2",
    time: "8:50 PM",
    operatingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },

  // Saturday and Sunday
  {
    id: "bus2-weekend-1",
    bus: "Bus 2",
    time: "3:00 PM",
    backend_time: "15:00",
    operatingDays: ["Saturday", "Sunday"],
  },
  {
    id: "bus1-weekend-1",
    bus: "Bus 1",
    time: "3:30 PM",
    operatingDays: ["Saturday", "Sunday"],
  },
  {
    id: "bus1-weekend-2",
    bus: "Bus 1",
    time: "6:00 PM",
    operatingDays: ["Saturday", "Sunday"],
  },
  {
    id: "bus2-weekend-2",
    bus: "Bus 2",
    time: "5:30 PM",
    operatingDays: ["Saturday", "Sunday"],
  },
  {
    id: "bus1-weekend-3",
    bus: "Bus 1",
    time: "7:00 PM",
    operatingDays: ["Saturday", "Sunday"],
  },
  {
    id: "bus2-weekend-3",
    bus: "Bus 2",
    time: "8:50 PM",
    operatingDays: ["Saturday", "Sunday"],
  },
];

export default schedules;