package com.cpuschedulercalculator.cpuschedulerbackend.algorthims;

import com.cpuschedulercalculator.cpuschedulerbackend.dto.GanttChartEntry;
import com.cpuschedulercalculator.cpuschedulerbackend.dto.ProcessDTO;
import com.cpuschedulercalculator.cpuschedulerbackend.dto.ScheduleResponse;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class FcfsAlgorithm implements AlgorithmStrategy {

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

            int start = currentTime;
            int wait = start - process.getArrivalTime();
            int end = start + process.getBurstTime();
            int turnaround = end - process.getArrivalTime();

            process.setWaitingTime(wait);
            process.setTurnaroundTime(turnaround);

            ganttChart.add(new GanttChartEntry(start, process.getPid(), end));

            currentTime = end;
            totalWait += wait;
            totalTurnAround += turnaround;
        }

        return new ScheduleResponse(
                processes,
                (double) totalWait / processes.size(),
                (double) totalTurnAround / processes.size(),
                ganttChart

        );
    }
}
