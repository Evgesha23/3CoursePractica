package com.project.task1.hibernate;

import com.project.task1.serviceUser.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {
}
