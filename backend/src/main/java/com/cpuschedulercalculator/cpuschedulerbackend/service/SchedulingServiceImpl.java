package com.cpuschedulercalculator.cpuschedulerbackend.service;

import com.cpuschedulercalculator.cpuschedulerbackend.dto.ScheduleRequest;
import com.cpuschedulercalculator.cpuschedulerbackend.dto.ScheduleResponse;
import com.cpuschedulercalculator.cpuschedulerbackend.service.algorthims.*;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class SchedulingServiceImpl implements SchedulingService {

    private final Map<String, AlgorithmStrategy> strategies = Map.of(
            "FCFS", new FirstComeFirstServeAlgorithm(),
            "SJF", new ShortestJobFirstAlgorithm(),
            "SRTF", new ShortestRemainingTimeFirstAlgorithm(),
            "PRIORITYSCHEDULING", new PrioritySchedulingAlgorithm(),
            "PRIORITYSCHEDULINGPREEMPTIVE", new PrioritySchedulingPreemptiveAlgorithm(),
            "RR", new RoundRobinAlgorithm()
    );

    @Override
    public ScheduleResponse calculateSchedule(ScheduleRequest request) {
        String algorithm = request.getAlgorithm().toUpperCase();

        AlgorithmStrategy strategy = strategies.get(algorithm);

        return strategy.calculate(request.getProcesses(), request.getQuantum());
    }

}


