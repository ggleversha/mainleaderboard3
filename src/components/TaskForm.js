// TaskForm.js
import React, { useState, useEffect } from 'react';

const TaskForm = ({ userId, storeTask, daysCompleted, taskSubmitted }) => {
    const [name, setName] = useState('');
    const [questions, setQuestions] = useState({
        q1: false,
        q2: false,
        q3: false,
        q4: false,
        q5: false,
        q6: false,
        q7: false,
        q8: false,
        q9: false,
        q10: false,
        q11: false,
        q12: false,
        q13: false,
        q14: false,
        q15: false
    });

    useEffect(() => {
        if (!taskSubmitted) {
            setName('');
            setQuestions({
                q1: false,
                q2: false,
                q3: false,
                q4: false,
                q5: false,
                q6: false,
                q7: false,
                q8: false,
                q9: false,
                q10: false,
                q11: false,
                q12: false,
                q13: false,
                q14: false,
                q15: false
            });
        }
    }, [taskSubmitted]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const allQuestionsAnsweredYes = Object.values(questions).every(answer => answer === true);
        if (name && allQuestionsAnsweredYes) {
            const task = { name, daysCompleted: 1, ...questions };
            storeTask(task);
        }
    };

    const handleQuestionChange = (e) => {
        const { name, checked } = e.target;
        setQuestions((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    };

    return (
        <div className="task-form">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required disabled={taskSubmitted} />
                </div>
                <div>
                    <label>Days Completed:</label>
                    <input type="number" value={daysCompleted} readOnly />
                </div>
                <h3>Daily Questions</h3>
                <div className="questions">
                    {[...Array(15)].map((_, index) => (
                        <div key={`q${index + 1}`} className="question">
                            <label>{`${index + 1}. ${questionsList[index]}`}</label>
                            <input
                                type="checkbox"
                                name={`q${index + 1}`}
                                checked={questions[`q${index + 1}`]}
                                onChange={handleQuestionChange}
                                required
                                disabled={taskSubmitted}
                            />
                        </div>
                    ))}
                </div>
                <button type="submit" disabled={taskSubmitted}>Submit</button>
            </form>
        </div>
    );
};

const questionsList = [
    "Did you wake up at 4:44 am, earlier, or at an agreed time with Papps Mastery Staff?",
    "Did you adhere to your written Nutrition Plan (including weighing all your food)?",
    "Did you follow your written Workout Plan?",
    "Are you free from all the following vices: Alcohol, Drugs, Smoking, Vaping, Porn, Masturbation, Gambling, Lying, Cheating, Stealing?",
    "Did you listen to at least 30 minutes of positive inspirational information?",
    "Did you post something inspirational on your Facebook or Instagram?",
    "Did you demand that you feel powerful after successfully completing each task today?",
    "Did you read your Life Statement at least three times throughout the day?",
    "Did you do your visualization twice today, with one session just before sleep?",
    "Did you complete your diary/journal entry?",
    "Did you do your AUM meditation or prayer?",
    "Did you wake up and go to the gym this morning, or complete 50 burpees, or 100 bodyweight squats?",
    "Did you plan your day (written plan, ideally using software like Google Calendar or Outlook for appointments and Google Tasks or Asana for tasks)?",
    "Did you prioritize your tasks, identifying 'PRIORITY TASKS' that must be completed today with no excuses?",
    "Did you complete all high-priority tasks for the day?"
];

export default TaskForm;
