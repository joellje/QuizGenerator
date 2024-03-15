import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const QuizPage = () => {
    let location = useLocation();
    const quizData = location.state.quizData;

    // State to keep track of which question's answer is shown
    const [shownAnswerIndex, setShownAnswerIndex] = useState(null);

    return (
        <div style={{ paddingLeft: '20px' }}>
            <h2>Quiz Questions</h2>
            {quizData.map((item, index) => (
                <div key={index}>
                    <h3>
                        {index + 1}. {item.question}
                    </h3>
                    <p>Choices</p>
                    <ul>
                        {item.responses.map((response, i) => (
                            <li key={i}>{response}</li>
                        ))}
                    </ul>
                    <button onClick={() => setShownAnswerIndex(index)}>Show Answer</button>
                    {shownAnswerIndex === index && <p>Answer: {item.correct}</p>}
                </div>
            ))}
        </div>
    );
};

export default QuizPage;
