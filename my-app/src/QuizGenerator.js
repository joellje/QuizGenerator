// QuizGenerator.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizGenerator = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // Loading state
    const [formData, setFormData] = useState({
        topic: '',
        num_q: '',
        diff: '',
        lang: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading state to true
        const quiz_url = 'https://quiz-generator-ajmth4s4gq-uc.a.run.app';
        const url = `${quiz_url}/?authuser=0&topic=${encodeURIComponent(formData.topic)}&num_q=${formData.num_q}&diff=${formData.diff}&lang=${formData.lang}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json(); // Parse the JSON response
            console.log('Data: ', data.text);
            const trimmedJsonString = data.text.trim().replace(/^`*json|`+$/g, '');
            const jsonObject = JSON.parse(trimmedJsonString);
            navigate('/quiz', { state: { quizData: jsonObject } });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false); // Set loading state back to false after submission
        }
    };

    return (
        <div style={{ paddingLeft: '20px' }}>
            <h2>Quiz Generator</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Topic:
                    <input type='text' name='topic' value={formData.topic} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Number of Questions:
                    <select type='number' name='num_q' value={formData.num_q} onChange={handleChange}>
                        <option value=''>Select</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                        <option value='8'>8</option>
                    </select>
                </label>
                <br />
                <label>
                    Difficulty:
                    <select name='diff' value={formData.diff} onChange={handleChange}>
                        <option value=''>Select</option>
                        <option value='easy'>Easy</option>
                        <option value='intermediate'>Intermediate</option>
                        <option value='hard'>Hard</option>
                    </select>
                </label>
                <br />
                <label>
                    Language:
                    <select name='lang' value={formData.lang} onChange={handleChange}>
                        <option value=''>Select</option>
                        <option value='english'>English</option>
                    </select>
                </label>
                <br />
                <button type='submit' disabled={loading}>
                    {loading ? 'Generating Quiz...' : 'Generate Quiz'}
                </button>
            </form>
        </div>
    );
};

export default QuizGenerator;
