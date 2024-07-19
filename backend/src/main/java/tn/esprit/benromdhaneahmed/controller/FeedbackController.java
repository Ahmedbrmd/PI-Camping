package tn.esprit.benromdhaneahmed.controller;





import org.springframework.web.bind.annotation.*;
import tn.esprit.benromdhaneahmed.entities.Feedback;
import tn.esprit.benromdhaneahmed.services.IFeedbackService;

import java.util.List;


@RestController
@RequestMapping("/feedback")
public class FeedbackController {
    private IFeedbackService feedbackService;

    public FeedbackController(IFeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }
    @PostMapping()
    public Feedback ajouterFeedback(@RequestBody Feedback f) {
        return  feedbackService.ajouterFeedback(f);
    }


    @PutMapping("/{idFeedback}")
    public Feedback updateFe(@PathVariable int idFeedback, @RequestBody Feedback f) {
        f.setIdFeedback(idFeedback); // Set the ID from path variable in the feedback object
        return feedbackService.updateFeedback(f);
    }
    @GetMapping()

    public List<Feedback> getAllFeedbacks(){
        return feedbackService.getAllFeedbacks();
    }

    @GetMapping("/getAbById/{idFeedback}")

    public Feedback getAbById(@PathVariable int idFeedback){
        return feedbackService.getAbById(idFeedback);
    }
    @DeleteMapping("/{idFeedback}") // Corrected path variable name
    public void deleteFe(@PathVariable int idFeedback) {
        feedbackService.deleteFeedback(idFeedback);
    }

}

