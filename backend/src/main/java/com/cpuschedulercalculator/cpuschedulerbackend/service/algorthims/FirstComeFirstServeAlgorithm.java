package com.cpuschedulercalculator.cpuschedulerbackend.service.algorthims;

import com.cpuschedulercalculator.cpuschedulerbackend.dto.GanttChartEntry;
import com.cpuschedulercalculator.cpuschedulerbackend.dto.ProcessDTO;
import com.cpuschedulercalculator.cpuschedulerbackend.dto.ScheduleResponse;
import com.cpuschedulercalculator.cpuschedulerbackend.utility.SchedulingUtils;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class FirstComeFirstServeAlgorithm implements AlgorithmStrategy {

    @Override
    public ScheduleResponse calculate(List<ProcessDTO> processes, Integer quantum) {

        processes.sort(Comparator.comparingInt(ProcessDTO::getArrivalTime));

        int currentTime = 0;
        int totalWait = 0;
        int totalTurnAround = 0;
        List<GanttChartEntry> ganttChart = new ArrayList<>();

        for (ProcessDTO process : processes) {
            if (process.getArrivalTime() > currentTime) {
                int idleStart = currentTime;
                int idleEnd = process.getArrivalTime();
                ganttChart.add(new GanttChartEntry(idleStart, 0, idleEnd));
                currentTime = idleEnd;
            }

            currentTime = SchedulingUtils.calculateProcessInfo(process,currentTime,ganttChart);
            totalWait += process.getWaitingTime();
            totalTurnAround += process.getTurnaroundTime();
        }

        return new ScheduleResponse(
                processes,
                (double) totalWait / processes.size(),
                (double) totalTurnAround / processes.size(),
                ganttChart

        );
    }
}
