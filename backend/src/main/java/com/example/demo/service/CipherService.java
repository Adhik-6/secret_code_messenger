package com.example.demo.service;

import org.springframework.stereotype.Service;
import java.util.Base64;

@Service
public class CipherService {
    public String encode(String text) {
        return Base64.getEncoder().encodeToString(text.getBytes());
    }

    public String decode(String encoded) {
        return new String(Base64.getDecoder().decode(encoded));
    }
}