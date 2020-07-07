package com.project.task1.serviceUser;

import lombok.Data;
import org.springframework.stereotype.Component;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
@Component
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO, generator = "users")
    private int id;
    private String email;
    private String login;
    private String password;
}
