import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import './index.css';

function App() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen flex flex-col">
      <header className="w-full py-6 bg-blue-600 text-white text-center text-3xl font-extrabold shadow-md">
        Quiz App 🚀
      </header>
      <main className="flex-1 flex justify-center items-center p-6">
        <div className="w-full max-w-2xl">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/result" element={<Result />} />
            </Routes>
          </BrowserRouter>
        </div>
      </main>
      <footer className="py-4 text-center text-sm text-gray-500">
        © 2025 Quiz App. Built with ❤️ and Tailwind CSS.
      </footer>
    </div>
  );
}

export default App;
