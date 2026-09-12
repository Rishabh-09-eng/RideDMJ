from datetime import time

BUS_SCHEDULE = [
    # =========================
    # WEEKDAYS — INSTITUTE → SADAR
    # =========================

    {
        "bus_id": 2,
        "time": time(15, 0),
        "direction": "INSTITUTE_TO_SADAR",
        "day_type": 0
    },
    {
        "bus_id": 1,
        "time": time(15, 40),
        "direction": "INSTITUTE_TO_SADAR",
        "day_type": 0
    },
    {
        "bus_id": 1,
        "time": time(17, 15),
        "direction": "INSTITUTE_TO_SADAR",
        "day_type": 0
    },
    {
        "bus_id": 2,
        "time": time(18, 0),
        "direction": "INSTITUTE_TO_SADAR",
        "day_type": 0
    },
    {
        "bus_id": 1,
        "time": time(19, 0),
        "direction": "INSTITUTE_TO_SADAR",
        "day_type": 0
    },
    {
        "bus_id": 1,
        "time": time(20, 20),
        "direction": "INSTITUTE_TO_SADAR",
        "day_type": 0
    },
    {
        "bus_id": 2,
        "time": time(20, 50),
        "direction": "INSTITUTE_TO_SADAR",
        "day_type": 0
    },


    # =========================
    # WEEKDAYS — SADAR → INSTITUTE
    # =========================

    {
        "bus_id": 2,
        "time": time(15, 45),
        "direction": "SADAR_TO_INSTITUTE",
        "day_type": 0
    },
    {
        "bus_id": 1,
        "time": time(16, 30),
        "direction": "SADAR_TO_INSTITUTE",
        "day_type": 0
    },
    {
        "bus_id": 2,
        "time": time(18, 30),
        "direction": "SADAR_TO_INSTITUTE",
        "day_type": 0
    },
    {
        "bus_id": 1,
        "time": time(19, 40),
        "direction": "SADAR_TO_INSTITUTE",
        "day_type": 0
    },
    {
        "bus_id": 1,
        "time": time(21, 0),
        "direction": "SADAR_TO_INSTITUTE",
        "day_type": 0
    },
    {
        "bus_id": 2,
        "time": time(21, 30),
        "direction": "SADAR_TO_INSTITUTE",
        "day_type": 0
    },


    # =========================
    # WEEKENDS — INSTITUTE → SADAR
    # =========================

    {
        "bus_id": 2,
        "time": time(15, 0),
        "direction": "INSTITUTE_TO_SADAR",
        "day_type": 1
    },
    {
        "bus_id": 1,
        "time": time(15, 30),
        "direction": "INSTITUTE_TO_SADAR",
        "day_type": 1
    },
    {
        "bus_id": 2,
        "time": time(17, 30),
        "direction": "INSTITUTE_TO_SADAR",
        "day_type": 1
    },
    {
        "bus_id": 1,
        "time": time(18, 0),
        "direction": "INSTITUTE_TO_SADAR",
        "day_type": 1
    },
    {
        "bus_id": 1,
        "time": time(19, 0),
        "direction": "INSTITUTE_TO_SADAR",
        "day_type": 1
    },
    {
        "bus_id": 2,
        "time": time(20, 50),
        "direction": "INSTITUTE_TO_SADAR",
        "day_type": 1
    },


    # =========================
    # WEEKENDS — SADAR → INSTITUTE
    # =========================

    {
        "bus_id": 2,
        "time": time(16, 30),
        "direction": "SADAR_TO_INSTITUTE",
        "day_type": 1
    },
    {
        "bus_id": 1,
        "time": time(17, 20),
        "direction": "SADAR_TO_INSTITUTE",
        "day_type": 1
    },
    {
        "bus_id": 1,
        "time": time(18, 30),
        "direction": "SADAR_TO_INSTITUTE",
        "day_type": 1
    },
    {
        "bus_id": 2,
        "time": time(19, 30),
        "direction": "SADAR_TO_INSTITUTE",
        "day_type": 1
    },
    {
        "bus_id": 1,
        "time": time(21, 15),
        "direction": "SADAR_TO_INSTITUTE",
        "day_type": 1
    },
    {
        "bus_id": 2,
        "time": time(21, 30),
        "direction": "SADAR_TO_INSTITUTE",
        "day_type": 1
    }
]