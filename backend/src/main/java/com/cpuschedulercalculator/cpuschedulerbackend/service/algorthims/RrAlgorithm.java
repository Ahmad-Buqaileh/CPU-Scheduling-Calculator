package com.cpuschedulercalculator.cpuschedulerbackend.service.algorthims;

import com.cpuschedulercalculator.cpuschedulerbackend.dto.GanttChartEntry;
import com.cpuschedulercalculator.cpuschedulerbackend.dto.ProcessDTO;
import com.cpuschedulercalculator.cpuschedulerbackend.dto.ScheduleResponse;

import java.util.*;

public class RrAlgorithm implements AlgorithmStrategy {

    @Override
    public ScheduleResponse calculate(List<ProcessDTO> processes, Integer quantum) {

        int currentTime = 0;
        int totalWait = 0;
        int totalTurnAround = 0;

        Queue<ProcessDTO> ready = new LinkedList<>();
        List<ProcessDTO> temp = new ArrayList<>(processes);
        List<ProcessDTO> completed = new ArrayList<>();
        List<GanttChartEntry> ganttChart = new ArrayList<>();
        Map<Integer, Integer> remainingBurst = new HashMap<>();

        for (ProcessDTO process : temp) {
            remainingBurst.put(process.getPid(), process.getBurstTime());
        }

        while (!temp.isEmpty() || !ready.isEmpty()) {
            Iterator<ProcessDTO> iterator = temp.iterator();
            while (iterator.hasNext()) {
                ProcessDTO process = iterator.next();
                if (process.getArrivalTime() <= currentTime) {
                    ready.offer(process);
                    iterator.remove();
                }
            }

            if (ready.isEmpty()) {
                if (!ganttChart.isEmpty() && ganttChart.getLast().getPid() == 0) {
                    GanttChartEntry previousGanttChart = ganttChart.removeLast();
                    ganttChart.add(new GanttChartEntry(previousGanttChart.getStart(), 0, currentTime + 1));
                } else {
                    ganttChart.add(new GanttChartEntry(currentTime, 0, currentTime + 1));
                }
                currentTime++;
                continue;
            }

            ProcessDTO process = ready.poll();
            int pid = process.getPid();
            int burstTime = remainingBurst.get(pid);

            int execution = Math.min(burstTime, quantum);
            int start = currentTime;
            int end = start + execution;

            ganttChart.add(new GanttChartEntry(start, process.getPid(), end));

            currentTime = end;
            burstTime = burstTime - execution;

            remainingBurst.put(pid, burstTime);

            iterator = temp.iterator();
            while (iterator.hasNext()) {
                ProcessDTO newProcess = iterator.next();
                if (newProcess.getArrivalTime() <= currentTime) {
                    ready.offer(newProcess);
                    iterator.remove();
                }
            }

            if (burstTime == 0) {
                int turnAround = currentTime - process.getArrivalTime();
                int wait = turnAround - process.getBurstTime();
                process.setTurnaroundTime(turnAround);
                process.setWaitingTime(wait);

                totalTurnAround += turnAround;
                totalWait += wait;

                completed.add(process);
                remainingBurst.remove(pid);
            } else {
                ready.offer(process);
            }
        }

        return new ScheduleResponse(
                completed,
                (double) totalWait / completed.size(),
                (double) totalTurnAround / completed.size(),
                ganttChart
        );
    }

}
