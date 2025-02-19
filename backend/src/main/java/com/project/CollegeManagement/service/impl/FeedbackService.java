package com.project.CollegeManagement.service.impl;

import com.project.CollegeManagement.entity.Feedback;
import com.project.CollegeManagement.repository.IFeedbackRepository;
import com.project.CollegeManagement.service.IFeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService implements IFeedbackService
{
    @Autowired
    private IFeedbackRepository repository;

    @Override
    public void addFeedbacks(Feedback feedback) {
        repository.save(feedback);
    }

    @Override
    public List<Feedback> getAllFeedbacks() {
        return repository.findAll();
    }

    @Override
    public List<Feedback> getTeacherFeedbacks(Long teacherId) {
        return repository.findByTeacherId(teacherId);
    }

    @Override
    public Feedback getFeedbackById(Long id) {
        return repository.findById(id).get();
    }

    @Override
    public void deleteFeedbackById(Long id) {
        repository.deleteById(id);
    }
}
