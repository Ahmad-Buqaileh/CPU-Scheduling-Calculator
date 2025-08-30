package com.cpuschedulercalculator.cpuschedulerbackend.service.algorthims;

import com.cpuschedulercalculator.cpuschedulerbackend.dto.GanttChartEntry;
import com.cpuschedulercalculator.cpuschedulerbackend.dto.ProcessDTO;
import com.cpuschedulercalculator.cpuschedulerbackend.dto.ScheduleResponse;
import com.cpuschedulercalculator.cpuschedulerbackend.utility.SchedulingUtils;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class ShortestJobFirstAlgorithm implements AlgorithmStrategy {

    @Override
    public ScheduleResponse calculate(List<ProcessDTO> processes, Integer quantum) {

        int currentTime = 0;
        int totalWait = 0;
        int totalTurnAround = 0;

        List<ProcessDTO> temp = new ArrayList<>(processes);
        List<ProcessDTO> completed = new ArrayList<>();
        List<GanttChartEntry> ganttChart = new ArrayList<>();

        while (!temp.isEmpty()) {
            int finalCurrentTime = currentTime;
            List<ProcessDTO> arrivedProcesses = temp.stream()
                    .filter(process -> process.getArrivalTime() <= finalCurrentTime)
                    .sorted(Comparator.comparing(ProcessDTO::getBurstTime))
                    .toList();

            if (arrivedProcesses.isEmpty()) {
                if (!ganttChart.isEmpty() && ganttChart.getLast().getPid() == 0) {
                    GanttChartEntry previousGanttChart = ganttChart.removeLast();
                    ganttChart.add(new GanttChartEntry(previousGanttChart.getStart(), 0, currentTime + 1));
                } else {
                    ganttChart.add(new GanttChartEntry(currentTime, 0, currentTime + 1));
                }
                currentTime++;
                continue;
            }
            ProcessDTO process = arrivedProcesses.getFirst();

            currentTime = SchedulingUtils.calculateProcessInfo(process, currentTime, ganttChart);
            totalWait += process.getWaitingTime();
            totalTurnAround += process.getTurnaroundTime();

            completed.add(process);
            temp.remove(process);
        }

        return new ScheduleResponse(
                completed,
                (double) totalWait / completed.size(),
                (double) totalTurnAround / completed.size(),
                ganttChart
        );
    }
}
