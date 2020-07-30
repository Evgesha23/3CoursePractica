package com.project.task1.controllers;

import com.project.task1.hibernate.TaskRepository;
import com.project.task1.hibernate.UserRepository;
import com.project.task1.serviceTask.Task;
import com.project.task1.serviceUser.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MainController {

    private static String[] methods =
    { "GET", "PUT", "POST", "PATCH", "DELETE", "HEAD", "TRACE" };

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;

    //-------------tasks-------------

    @GetMapping(value = { "/tasks"}) // get list tasks +
    public @ResponseBody Iterable<Task> getAllTasks(){
        return taskRepository.findAll();
    }

    @GetMapping({"/tasks/{id}"}) // get task by id +
    public @ResponseBody Optional<Task> getTaskByID(@PathVariable("id") int id){
        System.out.println(taskRepository.findById(id).toString());
        return taskRepository.findById(id);
    }


    @PostMapping(value = { "/createTask"})
    @ResponseStatus(HttpStatus.CREATED)
    public void createTask(@RequestBody Task t){
        taskRepository.save(t);
    }

    @PutMapping(value = { "/putTask"})
    @ResponseStatus(HttpStatus.OK)
    public void putTask(@RequestBody Task t){
        taskRepository.save(t);
    }

    @RequestMapping(value = {"/deleteTask/{id}"}, method = RequestMethod.DELETE) // delete task by id +-
    @ResponseStatus(HttpStatus.OK)
    public void deleteTaskByID(@PathVariable("id") int id){
        System.out.println(taskRepository.findById(id).toString());
        taskRepository.deleteById(id);
    }

    //-------------users-------------

    @GetMapping(value = { "/users"}) // get list users +
    public @ResponseBody Iterable<User> getAllUsers(){
        return userRepository.findAll();
    }

    @GetMapping({"/users/{id}"}) // get user by id +
    public @ResponseBody Optional<User> getUserByID(@PathVariable("id") int id){
        System.out.println(userRepository.findById(id).toString());
        return userRepository.findById(id);
    }

    @RequestMapping(value = {"/createUser"}, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void createUser(@RequestBody User u){
        userRepository.save(u);
    }

    @RequestMapping(value = { "/deleteUser/{id}"}, method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void deleteUserByID(@PathVariable("id") int id){
        userRepository.deleteById(id);
    }

    @RequestMapping(value = { "/putUser"}, method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void putAdmin(@RequestBody User u){
        userRepository.save(u);
    }
}