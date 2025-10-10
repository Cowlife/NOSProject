package org.example.backend_folders.controllers;

import org.example.backend_folders.remainderEntities.Trainer;
import org.example.backend_folders.services.TrainerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/trainers")
public class TrainerController {

    private final TrainerService trainerService;

    public TrainerController(TrainerService trainerService) {
        this.trainerService = trainerService;
    }

    @GetMapping
    public List<Trainer> getAllTrainers() {
        return trainerService.getAllTrainers();
    }

    @GetMapping("/excludes/{email}")
    public List<Trainer> getAllTrainersExceptOne(@PathVariable String email) {
        return trainerService.getAllTrainersExcludeOne(email);
    }

    @GetMapping("/{id}")
    public Optional<Trainer> getTrainerById(@PathVariable UUID id) {
        return trainerService.getPersonById(id);
    }

    @GetMapping("/search/{email}")
    public Trainer searchTrainerEmail(@PathVariable String email) {
        return this.trainerService.findByEmail(email);
    }

    @PostMapping
    public Trainer createTrainer(@RequestBody Trainer trainer) {
        return trainerService.saveTrainer(trainer);
    }

    @DeleteMapping("/{id}")
    public void deleteTrainer(@PathVariable UUID id) {
        trainerService.deleteTrainer(id);
    }

}
