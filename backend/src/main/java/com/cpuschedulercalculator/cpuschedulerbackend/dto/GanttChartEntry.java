package com.cpuschedulercalculator.cpuschedulerbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GanttChartEntry {
    private Integer start;
    private Integer pid;
    private Integer end;
}
