package org.example.backend_folders.services;


import org.example.backend_folders.pokemonEntities.MoveLong;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CacheService {

    @Cacheable(value = "moves", key = "#url")
    public MoveLong getMoveInfo(RestTemplate restTemplate, String url){
        ResponseEntity<MoveLong> forEntity = restTemplate.getForEntity(url, MoveLong.class);
        return forEntity.getBody();
    }



}
