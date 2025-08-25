package com.cpuschedulercalculator.cpuschedulerbackend.utility;

import com.cpuschedulercalculator.cpuschedulerbackend.dto.GanttChartEntry;
import com.cpuschedulercalculator.cpuschedulerbackend.dto.ProcessDTO;

import java.util.List;

public class SchedulingUtils {

    public static int calculateProcessInfo(ProcessDTO process, int currentTime, List<GanttChartEntry> ganttChart) {
        int start = Math.max(process.getArrivalTime(), currentTime);
        int wait = start - process.getArrivalTime();
        int end = start + process.getBurstTime();
        int turnaround = end - process.getArrivalTime();

        process.setWaitingTime(wait);
        process.setTurnaroundTime(turnaround);

        ganttChart.add(new GanttChartEntry(start, process.getPid(), end));

        return end;
    }
}
