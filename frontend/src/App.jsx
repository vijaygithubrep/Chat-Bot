import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chatapp from '../Component/Chatapp';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/chatbot" element={<Chatapp />} />
            </Routes>
        </Router>
    );
}

export default App;