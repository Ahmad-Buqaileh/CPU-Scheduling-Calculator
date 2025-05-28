package com.cpuschedulercalculator.cpuschedulerbackend.service;

import com.cpuschedulercalculator.cpuschedulerbackend.dto.ScheduleRequest;
import com.cpuschedulercalculator.cpuschedulerbackend.dto.ScheduleResponse;

public interface SchedulingService {
    ScheduleResponse calculateSchedule(ScheduleRequest request);
}
