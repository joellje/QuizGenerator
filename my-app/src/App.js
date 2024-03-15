import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QuizGenerator from './QuizGenerator'; // Import your QuizGenerator component
import QuizPage from './QuizPage'; // Import the new component for rendering quiz questions and answers
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<QuizGenerator />} />
                <Route path='/quiz' element={<QuizPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
