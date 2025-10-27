package com.example.demo.controller;
// mvn spring-boot:run
import com.example.demo.model.Message;
import com.example.demo.repository.MessageRepo;
import com.example.demo.service.CipherService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // allow frontend
public class MessageController {

    private final CipherService cipherService;
    private final MessageRepo repo;

    public MessageController(CipherService cipherService, MessageRepo repo) {
        this.cipherService = cipherService;
        this.repo = repo;
    }

    @PostMapping("/encode")
    public Message encode(@RequestBody String text) {
        String encoded = cipherService.encode(text);
        Message msg = new Message(encoded, text);
        return repo.save(msg);
    }

    @PostMapping("/decode")
    public String decode(@RequestBody String encoded) {
        return cipherService.decode(encoded);
    }

    @GetMapping("/message/{id}")
    public Optional<Message> getMessage(@PathVariable String id) {
        return repo.findById(id);
    }
}