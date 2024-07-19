package tn.esprit.benromdhaneahmed.services;


import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.benromdhaneahmed.entities.Feedback;
import tn.esprit.benromdhaneahmed.repositories.FeedbackRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class FeedbackService implements IFeedbackService {
    private FeedbackRepository feedbackRepository;


    @Override
    public Feedback ajouterFeedback(Feedback f) {
        return feedbackRepository.save(f) ;
    }


    @Override
    public Feedback updateFeedback(Feedback f) {
        return feedbackRepository.save(f);
    }
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }

    @Override
    public Feedback getAbById(  int idFeed) {
        return feedbackRepository.findById(idFeed).orElse(null);
    }


    @Override
    public void deleteFeedback(int idFeedback) {
        feedbackRepository.deleteById(idFeedback);
    }


}

