export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const geminiConfig = {
  apiKey: GEMINI_API_KEY,
  options: {
    maxOutputTokens: 2048,
    temperature: 0.7,
    topP: 0.8,
    topK: 40,
  }
};

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  id: string;
}

export interface PerformanceMetrics {
  coursesCompleted: number;
  averageScore: number;
  badgesEarned: number;
  certificatesIssued: number;
  timeSpent: number;
  lastActive: Date;
  learningStreak: number;
  completionRate: number;
}

export const generateChatPrompt = (message: string, context: string = ''): string => {
  return `
Context: You are an AI learning assistant helping with blockchain and web3 education.
${context ? `Additional context: ${context}\n` : ''}
User message: ${message}

Please provide a helpful, informative, and engaging response.`;
};

export const generatePerformancePrompt = (metrics: PerformanceMetrics): string => {
  return `
Please analyze the following learning performance metrics and provide an encouraging summary:

- Courses Completed: ${metrics.coursesCompleted}
- Average Score: ${metrics.averageScore}%
- Badges Earned: ${metrics.badgesEarned}
- Certificates Issued: ${metrics.certificatesIssued}
- Time Spent Learning: ${metrics.timeSpent} hours
- Learning Streak: ${metrics.learningStreak} days
- Course Completion Rate: ${metrics.completionRate}%
- Last Active: ${metrics.lastActive.toLocaleDateString()}

Focus on:
1. Progress and achievements
2. Areas of strength
3. Encouragement for continued learning
4. Suggestions for next steps
`;
};