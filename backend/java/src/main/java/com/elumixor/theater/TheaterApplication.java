package com.elumixor.theater;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.net.URISyntaxException;

@SpringBootApplication
@EnableJpaAuditing
@ComponentScan({"com.elumixor.theater.controllers", "com.elumixor.theater.config"})
public class TheaterApplication {

    public static void main(String[] args) {
        ApplicationContext applicationContext = SpringApplication.run(TheaterApplication.class, args);
    }
}
