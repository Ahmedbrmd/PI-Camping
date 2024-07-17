package tn.esprit.benromdhaneahmed.services;


import tn.esprit.benromdhaneahmed.entities.Feedback;

import java.util.List;

public interface IFeedbackService {
    public Feedback ajouterFeedback(Feedback f);
    public Feedback updateFeedback(Feedback f);

    public List<Feedback> getAllFeedbacks();

    public Feedback getAbById (int idFeed);
    public void deleteFeedback (int idFeedback);








}








