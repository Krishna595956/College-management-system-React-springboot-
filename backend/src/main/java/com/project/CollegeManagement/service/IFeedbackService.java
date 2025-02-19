package com.project.CollegeManagement.service;

import com.project.CollegeManagement.entity.Feedback;

import java.util.List;

public interface IFeedbackService
{
    void addFeedbacks(Feedback feedback);

    List<Feedback> getAllFeedbacks();

    List<Feedback> getTeacherFeedbacks(Long teacherId);

    Feedback getFeedbackById(Long id);

    void deleteFeedbackById(Long id);
}
