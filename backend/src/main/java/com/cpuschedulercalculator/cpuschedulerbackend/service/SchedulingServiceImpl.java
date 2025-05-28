package com.cpuschedulercalculator.cpuschedulerbackend.service;

import com.cpuschedulercalculator.cpuschedulerbackend.algorthims.*;
import com.cpuschedulercalculator.cpuschedulerbackend.dto.ScheduleRequest;
import com.cpuschedulercalculator.cpuschedulerbackend.dto.ScheduleResponse;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class SchedulingServiceImpl implements SchedulingService {

    private final Map<String, AlgorithmStrategy> strategies = Map.of(
            "FCFS", new FcfsAlgorithm(),
            "SJF", new SjfAlgorithm(),
            "SRTF", new SrtfAlgorithm(),
            "PRIORITYSCHEDULING", new PrioritySchedulingAlgorithm(),
            "PRIORITYSCHEDULINGPREEMPTIVE", new PrioritySchedulingPreemptiveAlgorithm(),
            "RR", new RrAlgorithm()
    );

    @Override
    public ScheduleResponse calculateSchedule(ScheduleRequest request) {
        String algorithm = request.getAlgorithm().toUpperCase();

        AlgorithmStrategy strategy = strategies.get(algorithm);

        return strategy.calculate(request.getProcesses(), request.getQuantum());
    }

}


