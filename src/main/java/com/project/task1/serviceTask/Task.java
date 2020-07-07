package com.project.task1.serviceTask;

import lombok.Data;
import org.springframework.stereotype.Component;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
@Component
public class Task {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO, generator = "task")
    private int id;
    private String taskName;
    private String taskLink;
    private String place;
    private int hours;
    private int amountErrors;
    private int mark;
}
