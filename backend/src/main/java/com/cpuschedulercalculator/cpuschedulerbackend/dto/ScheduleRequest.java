package com.cpuschedulercalculator.cpuschedulerbackend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleRequest {
    @NotBlank
    private String algorithm;
    private Integer quantum;
    @NotEmpty
    private List<ProcessDTO> processes;
}
