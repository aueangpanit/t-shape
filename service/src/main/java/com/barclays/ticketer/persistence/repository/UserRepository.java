package com.barclays.ticketer.persistence.repository;

import java.util.Optional;

import com.barclays.ticketer.persistence.domain.User;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {
  Optional<User> findByEmail(String email);
}
