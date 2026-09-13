from datetime import time

BUS_SCHEDULE = [
    # =========================
    # WEEKDAYS — INSTITUTE → SADAR
    # =========================

    {
        "bus_id": 2,
        "backend_time": time(15, 0),
        "direction": "INSTITUTE_TO_SADAR",
        "day_type": 0
    },
    {
        "bus_id": 1,
        "backend_time": time(15, 40),
        "direction": "INSTITUTE_TO_SADAR",
        "day_type": 0
    },
    {
        "bus_id": 1,
        "backend_time": time(17, 15),
        "direction": "INSTITUTE_TO_SADAR",
        "day_type": 0
    },
    {
        "bus_id": 2,
        "backend_time": time(18, 0),
        "direction": "INSTITUTE_TO_SADAR",
        "day_type": 0
    },
    {
        "bus_id": 1,
        "backend_time": time(19, 0),
        "direction": "INSTITUTE_TO_SADAR",
        "day_type": 0
    },
    {
        "bus_id": 1,
        "backend_time": time(20, 20),
        "direction": "INSTITUTE_TO_SADAR",
        "day_type": 0
    },
    {
        "bus_id": 2,
        "backend_time": time(20, 50),
        "direction": "INSTITUTE_TO_SADAR",
        "day_type": 0
    },

    # =========================
    # WEEKENDS — INSTITUTE → SADAR
    # =========================

    {
        "bus_id": 2,
        "backend_time": time(15, 0),
        "direction": "INSTITUTE_TO_SADAR",
        "day_type": 1
    },
    {
        "bus_id": 1,
        "backend_time": time(15, 30),
        "direction": "INSTITUTE_TO_SADAR",
        "day_type": 1
    },
    {
        "bus_id": 2,
        "backend_time": time(17, 30),
        "direction": "INSTITUTE_TO_SADAR",
        "day_type": 1
    },
    {
        "bus_id": 1,
        "backend_time": time(18, 0),
        "direction": "INSTITUTE_TO_SADAR",
        "day_type": 1
    },
    {
        "bus_id": 1,
        "backend_time": time(19, 0),
        "direction": "INSTITUTE_TO_SADAR",
        "day_type": 1
    },
    {
        "bus_id": 2,
        "backend_time": time(20, 50),
        "direction": "INSTITUTE_TO_SADAR",
        "day_type": 1
    }
]