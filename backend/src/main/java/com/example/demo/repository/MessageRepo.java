package com.example.demo.repository;

import com.example.demo.model.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MessageRepo extends MongoRepository<Message, String> {
}