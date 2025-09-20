import { GEMINI_API_KEY } from '../../config/gemini.config';

export interface UserPerformance {
  coursesCompleted: number;
  averageScore: number;
  badgesEarned: number;
  certificatesIssued: number;
  timeSpent: number; // in hours
}

export const summarizePerformance = async (performance: UserPerformance): Promise<string> => {
  try {
    const prompt = `
      Summarize the following user performance metrics:
      - Completed ${performance.coursesCompleted} courses
      - Average score: ${performance.averageScore}%
      - Earned ${performance.badgesEarned} badges
      - Received ${performance.certificatesIssued} certificates
      - Spent ${performance.timeSpent} hours learning
      
      Please provide a concise and encouraging summary of the user's progress.
    `;

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GEMINI_API_KEY}`
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    const data = await response.json();
    
    if (data.candidates && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    }
    
    return 'Unable to generate performance summary at this time.';
  } catch (error) {
    console.error('Error generating performance summary:', error);
    return 'Error generating performance summary. Please try again later.';
  }
};