package com.fasoo.wrapsody.commandserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
public class CommandServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(CommandServerApplication.class, args);
    }
}
