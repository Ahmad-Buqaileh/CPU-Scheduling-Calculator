package com.cpuschedulercalculator.cpuschedulerbackend.algorthims;

import com.cpuschedulercalculator.cpuschedulerbackend.dto.GanttChartEntry;
import com.cpuschedulercalculator.cpuschedulerbackend.dto.ProcessDTO;
import com.cpuschedulercalculator.cpuschedulerbackend.dto.ScheduleResponse;

import java.util.*;


public class PrioritySchedulingPreemptiveAlgorithm implements AlgorithmStrategy {

    @Override
    public ScheduleResponse calculate(List<ProcessDTO> processes, Integer quantum) {
        int currentTime = 0;
        int totalWait = 0;
        int totalTurnaround = 0;
        Integer previousPid = null;

        List<ProcessDTO> completed = new ArrayList<>();
        List<GanttChartEntry> ganttChart = new ArrayList<>();
        Map<Integer, Integer> remaining = new HashMap<>();
        Map<Integer, Integer> priority = new HashMap<>();

        for (ProcessDTO process : processes) {
            remaining.put(process.getPid(), process.getBurstTime());
            priority.put(process.getPid(), process.getPriority());
        }

        while (processes.size() > completed.size()) {
            Integer finalPreviousPid = previousPid;
            int finalCurrentTime = currentTime;
            List<ProcessDTO> arrivedProcesses = processes.stream()
                    .filter(process -> process.getArrivalTime() <= finalCurrentTime && remaining.get(process.getPid()) > 0)
                    .sorted((p1, p2) -> {
                        int priorityCompare = Integer.compare(priority.get(p1.getPid()), priority.get(p2.getPid()));
                        if (priorityCompare != 0) return priorityCompare;

                        if (Objects.equals(p1.getPid(), finalPreviousPid)) return -1;
                        if (Objects.equals(p2.getPid(), finalPreviousPid)) return 1;

                        return Integer.compare(p1.getArrivalTime(), p2.getArrivalTime());
                    })

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
            ProcessDTO process = arrivedProcesses.get(0);
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
                totalTurnaround += turnAround;
                totalWait += wait;
                process.setTurnaroundTime(turnAround);
                process.setWaitingTime(wait);
                completed.add(process);
            }

        }

        return new ScheduleResponse(
                completed,
                (double) totalWait / completed.size(),
                (double) totalTurnaround / completed.size(),
                ganttChart
        );
    }
}
