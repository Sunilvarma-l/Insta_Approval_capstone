package com.example.eureka_server_online_plat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class EurekaServerOnlinePlatApplication {

	public static void main(String[] args) {
		SpringApplication.run(EurekaServerOnlinePlatApplication.class, args);
	}

}
