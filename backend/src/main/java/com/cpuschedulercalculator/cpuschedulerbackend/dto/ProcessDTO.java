package com.cpuschedulercalculator.cpuschedulerbackend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProcessDTO {

    private Integer pid;
    @NotNull
    @Min(0)
    private Integer arrivalTime;
    @NotNull
    @Min(1)
    private Integer burstTime;
    private Integer priority;
    private Integer waitingTime;
    private Integer turnaroundTime;

}
