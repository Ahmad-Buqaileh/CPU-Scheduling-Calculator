package com.cpuschedulercalculator.cpuschedulerbackend.controller;

import com.cpuschedulercalculator.cpuschedulerbackend.dto.ScheduleRequest;
import com.cpuschedulercalculator.cpuschedulerbackend.dto.ScheduleResponse;
import com.cpuschedulercalculator.cpuschedulerbackend.service.SchedulingServiceImpl;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ScheduleController {

    private SchedulingServiceImpl schedulingService;

    public ScheduleController(SchedulingServiceImpl schedulingService) {
        this.schedulingService = schedulingService;
    }

    @PostMapping("/schedule")

    public ResponseEntity<ScheduleResponse> schedule(@Valid @RequestBody ScheduleRequest request){
        ScheduleResponse response = schedulingService.calculateSchedule(request);
        return ResponseEntity.ok(response);
    }
}
