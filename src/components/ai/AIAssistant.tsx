import React, { useState, useEffect } from 'react';
import { UserPerformance, summarizePerformance } from '../../utils/performanceSummary';
import ChatBot from '../chat/ChatBot';

const AIAssistant: React.FC = () => {
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
    const getSummary = async () => {
      const result = await summarizePerformance(performance);
      setSummary(result);
    };

    if (performance.coursesCompleted > 0) {
      getSummary();
    }
  }, [performance]);

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
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">AI Learning Assistant</h2>
        <ChatBot />
      </div>
    </div>
  );
};

export default AIAssistant;