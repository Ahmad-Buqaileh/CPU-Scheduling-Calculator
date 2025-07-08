package com.cpuschedulercalculator.cpuschedulerbackend.algorthims;

import com.cpuschedulercalculator.cpuschedulerbackend.dto.GanttChartEntry;
import com.cpuschedulercalculator.cpuschedulerbackend.dto.ProcessDTO;
import com.cpuschedulercalculator.cpuschedulerbackend.dto.ScheduleResponse;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class SjfAlgorithm implements AlgorithmStrategy {

    @Override
    public ScheduleResponse calculate(List<ProcessDTO> processes, Integer quantum) {

        int currentTime = 0;
        int totalWait = 0;
        int totalTurnAround = 0;

        List<GanttChartEntry> ganttChart = new ArrayList<>();
        List<ProcessDTO> temp = new ArrayList<>(processes);
        List<ProcessDTO> completed = new ArrayList<>();

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

            int start = Math.max(currentTime, process.getArrivalTime());
            int wait = start - process.getArrivalTime();
            int end = start + process.getBurstTime();
            int turnaround = end - process.getArrivalTime();

            process.setWaitingTime(wait);
            process.setTurnaroundTime(turnaround);

            ganttChart.add(new GanttChartEntry(start, process.getPid(), end));

            currentTime = end;
            totalWait += wait;
            totalTurnAround += turnaround;

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
