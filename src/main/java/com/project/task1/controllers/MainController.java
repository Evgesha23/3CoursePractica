package com.project.task1.controllers;

import com.project.task1.hibernate.TaskRepository;
import com.project.task1.hibernate.UserRepository;
import com.project.task1.serviceTask.Task;
import com.project.task1.serviceUser.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MainController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;

    @RequestMapping(value = { "/users"}, method = { RequestMethod.GET} )
    public @ResponseBody Iterable<User> getAllUsers(){
        return userRepository.findAll();
    }

    @RequestMapping(value = { "/createTask"}, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void createTask(@RequestBody Task t){
        taskRepository.save(t);
    }

    @RequestMapping(value = { "/tasks"}, method = { RequestMethod.GET} )
    public @ResponseBody Iterable<Task> getAllTasks(){
        return taskRepository.findAll();
    }
}