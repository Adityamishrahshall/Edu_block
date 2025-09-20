import React, { useState, useEffect } from 'react';
import NewChatBot from '../chat/NewChatBot';
import { GEMINI_API_KEY } from '../../config/gemini.config';

interface UserPerformance {
  coursesCompleted: number;
  averageScore: number;
  badgesEarned: number;
  certificatesIssued: number;
  timeSpent: number;
}

const AIAssistant = () => {
  const [performance, setPerformance] = useState<UserPerformance>({
    coursesCompleted: 0,
    averageScore: 0,
    badgesEarned: 0,
    certificatesIssued: 0,
    timeSpent: 0
  });

  const [summary, setSummary] = useState<string>('');

  useEffect(() => {
    // Mock data - replace with actual user performance data
    const mockPerformance: UserPerformance = {
      coursesCompleted: 5,
      averageScore: 85,
      badgesEarned: 3,
      certificatesIssued: 2,
      timeSpent: 25
    };
    setPerformance(mockPerformance);
  }, []);

  useEffect(() => {
    const generateSummary = async () => {
      if (performance.coursesCompleted > 0) {
        try {
          const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${GEMINI_API_KEY}`
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `Please provide an encouraging summary of the following learning performance:
                    - Completed ${performance.coursesCompleted} courses
                    - Average score: ${performance.averageScore}%
                    - Earned ${performance.badgesEarned} badges
                    - Received ${performance.certificatesIssued} certificates
                    - Spent ${performance.timeSpent} hours learning
                  `
                }]
              }]
            })
          });

          const data = await response.json();
          if (data.candidates && data.candidates[0].content) {
            setSummary(data.candidates[0].content.parts[0].text);
          }
        } catch (error) {
          console.error('Error generating summary:', error);
          setSummary('Unable to generate performance summary at this time.');
        }
      }
    };

    generateSummary();
  }, [performance]);

  const handleVoiceSummary = () => {
    if (!summary) return;
    const utterance = new SpeechSynthesisUtterance(summary);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Your Learning Progress</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Performance Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{performance.coursesCompleted}</div>
              <div className="text-gray-600">Courses Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{performance.averageScore}%</div>
              <div className="text-gray-600">Average Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{performance.badgesEarned}</div>
              <div className="text-gray-600">Badges Earned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">{performance.certificatesIssued}</div>
              <div className="text-gray-600">Certificates</div>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">{summary}</p>
            <button 
              onClick={handleVoiceSummary}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              🔊 Listen to Summary
            </button>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">AI Learning Assistant</h2>
        <NewChatBot />
      </div>
    </div>
  );
};

export default AIAssistant;