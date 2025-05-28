package com.cpuschedulercalculator.cpuschedulerbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleResponse {
    private List<ProcessDTO> processes;
    private Double avgWaitTime;
    private Double avgTurnAroundTime;
    private List<GanttChartEntry> ganttChart;
}
