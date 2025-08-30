package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "messages")
public class Message {
    @Id
    private String id;
    private String encoded;
    private String decoded;

    public Message() {}

    public Message(String encoded, String decoded) {
        this.encoded = encoded;
        this.decoded = decoded;
    }

    public String getId() { return id; }
    public String getEncoded() { return encoded; }
    public String getDecoded() { return decoded; }

    public void setEncoded(String encoded) { this.encoded = encoded; }
    public void setDecoded(String decoded) { this.decoded = decoded; }
}