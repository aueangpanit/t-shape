package com.barclays.ticketer;

import com.barclays.ticketer.persistence.repository.UserRepository;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackageClasses = UserRepository.class)
public class TicketerApplication {

	public static void main(String[] args) {
		SpringApplication.run(TicketerApplication.class, args);
	}
}
