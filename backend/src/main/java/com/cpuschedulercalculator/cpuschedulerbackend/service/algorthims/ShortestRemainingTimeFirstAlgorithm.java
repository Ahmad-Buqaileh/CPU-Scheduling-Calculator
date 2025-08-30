package com.cpuschedulercalculator.cpuschedulerbackend.service.algorthims;

import com.cpuschedulercalculator.cpuschedulerbackend.dto.GanttChartEntry;
import com.cpuschedulercalculator.cpuschedulerbackend.dto.ProcessDTO;
import com.cpuschedulercalculator.cpuschedulerbackend.dto.ScheduleResponse;

import java.util.*;

public class ShortestRemainingTimeFirstAlgorithm implements AlgorithmStrategy {

    @Override
    public ScheduleResponse calculate(List<ProcessDTO> processes, Integer quantum) {

        int currentTime = 0;
        Integer previousPid = null;

        List<ProcessDTO> completed = new ArrayList<>();
        List<GanttChartEntry> ganttChart = new ArrayList<>();
        Map<Integer, Integer> remaining = new HashMap<>();


        for (ProcessDTO process : processes) {
            remaining.put(process.getPid(), process.getBurstTime());
        }

        while (processes.size() > completed.size()) {
            int finalCurrentTime = currentTime;
            List<ProcessDTO> arrivedProcesses = processes.stream()
                    .filter(process -> process.getArrivalTime() <= finalCurrentTime && remaining.get(process.getPid()) > 0)
                    .sorted(Comparator.comparingInt(process -> remaining.get(process.getPid())))
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
            int pid = process.getPid();

            if (!Objects.equals(pid, previousPid)) {
                ganttChart.add(new GanttChartEntry(currentTime, pid, currentTime + 1));
            } else {
                GanttChartEntry previousChart = ganttChart.removeLast();
                ganttChart.add(new GanttChartEntry(previousChart.getStart(), pid, currentTime + 1));
            }

            remaining.put(pid, remaining.get(pid) - 1);
            currentTime++;
            previousPid = pid;

            if (remaining.get(pid) == 0) {
                int turnAround = currentTime - process.getArrivalTime();
                int wait = turnAround - process.getBurstTime();
                process.setWaitingTime(wait);
                process.setTurnaroundTime(turnAround);
                completed.add(process);
            }

        }

        int totalWait = completed.stream().mapToInt(ProcessDTO::getWaitingTime).sum();
        int totalTurnaround = completed.stream().mapToInt(ProcessDTO::getTurnaroundTime).sum();

        return new ScheduleResponse(
                completed,
                (double) totalWait / completed.size(),
                (double) totalTurnaround / completed.size(),
                ganttChart
        );

    }
}
