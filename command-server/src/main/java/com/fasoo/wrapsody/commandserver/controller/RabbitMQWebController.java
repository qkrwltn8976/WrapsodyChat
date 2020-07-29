package com.fasoo.wrapsody.commandserver.controller;
import com.fasoo.wrapsody.commandserver.service.RabbitMQSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/wrapsody-rabbitmq/")
public class RabbitMQWebController {
    @Autowired
    RabbitMQSender rabbitMQSender;


    @GetMapping(value = "/producer")
    public String producer() {
//        Employee emp = new Employee();
//        emp.setEmpId(empId);
//        emp.setEmpName(empName);
        rabbitMQSender.send("안녕");
        return "Message sent to the RabbitMQ JavaInUse Successfully";
    }

}