package com.cpuschedulercalculator.cpuschedulerbackend.algorthims;

import com.cpuschedulercalculator.cpuschedulerbackend.dto.ProcessDTO;
import com.cpuschedulercalculator.cpuschedulerbackend.dto.ScheduleResponse;
import io.micrometer.common.lang.Nullable;

import java.util.List;

public interface AlgorithmStrategy {
    ScheduleResponse calculate(List<ProcessDTO> processes, @Nullable Integer quantum);

}
