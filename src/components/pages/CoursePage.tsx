import React, { useState } from 'react';
import { Play, Clock, Users, Star, Award, CheckCircle, Lock, BookOpen } from 'lucide-react';
import { Course, Module } from '../../types';
import YouTubePlayer from '../courses/YouTubePlayer';

interface CoursePageProps {
  course: Course;
  enrolled: boolean;
  progress: number;
  onEnroll: () => void;
  onBack: () => void;
}

const CoursePage: React.FC<CoursePageProps> = ({ course, enrolled, progress, onEnroll, onBack }) => {
  const [activeModule, setActiveModule] = useState<number>(0);
  const [completedModules, setCompletedModules] = useState<Set<number>>(new Set([0]));

  const mockModules: Module[] = [
    {
      id: '1',
      title: 'Introduction to Blockchain Technology',
      description: 'Learn the fundamentals of blockchain, distributed ledgers, and consensus mechanisms.',
      content: 'In this module, we\'ll explore the revolutionary technology that powers cryptocurrencies and decentralized applications. You\'ll understand how blocks are created, linked, and validated across a distributed network.',
      videoUrl: 'dQw4w9WgXcQ', // YouTube video ID
      duration: 45,
      order: 1
    },
    {
      id: '2',
      title: 'Smart Contracts Fundamentals',
      description: 'Understanding smart contracts, their use cases, and basic implementation concepts.',
      content: 'Smart contracts are self-executing contracts with terms directly written into code. Learn how they work, their benefits, and real-world applications.',
      videoUrl: 'dQw4w9WgXcQ', // YouTube video ID
      duration: 60,
      order: 2
    },
    {
      id: '3',
      title: 'Solidity Programming Basics',
      description: 'Introduction to Solidity programming language for Ethereum smart contracts.',
      content: 'Solidity is the primary language for writing smart contracts on Ethereum. We\'ll cover syntax, data types, and basic contract structure.',
      videoUrl: 'dQw4w9WgXcQ', // YouTube video ID
      duration: 90,
      order: 3
    },
    {
      id: '4',
      title: 'Building Your First DApp',
      description: 'Create a complete decentralized application from smart contract to frontend.',
      content: 'Put everything together by building a real decentralized application. Learn how to connect smart contracts with web interfaces.',
      videoUrl: 'dQw4w9WgXcQ', // YouTube video ID
      duration: 120,
      order: 4
    }
  ];

  const handleModuleComplete = (moduleIndex: number) => {
    const newCompleted = new Set(completedModules);
    newCompleted.add(moduleIndex);
    setCompletedModules(newCompleted);
    
    // Unlock next module
    if (moduleIndex + 1 < mockModules.length) {
      newCompleted.add(moduleIndex + 1);
      setCompletedModules(newCompleted);
    }
  };

  const isModuleUnlocked = (moduleIndex: number) => {
    return completedModules.has(moduleIndex) || moduleIndex === 0;
  };

  const isModuleCompleted = (moduleIndex: number) => {
    return completedModules.has(moduleIndex) && moduleIndex !== activeModule;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="text-purple-600 hover:text-purple-800 font-medium mb-4"
          >
            ← Back to Courses
          </button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {course.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{course.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{course.totalStudents} students</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
              </div>
            </div>
            
            <div className="lg:ml-8">
              {!enrolled ? (
                <button
                  onClick={onEnroll}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium"
                >
                  {course.price === 0 ? 'Enroll Free' : `Enroll for ${course.price} ${course.currency}`}
                </button>
              ) : (
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">Progress</div>
                  <div className="text-2xl font-bold text-purple-600">{Math.round(progress)}%</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Content */}
          <div className="lg:col-span-2">
            {enrolled ? (
              <div className="bg-white rounded-xl shadow-sm border">
                {/* YouTube Video Player */}
                <YouTubePlayer
                  videoId={mockModules[activeModule]?.videoUrl || ''}
                  title={mockModules[activeModule]?.title || ''}
                  onProgress={(progress) => {
                    // Track video progress for completion tracking
                    console.log('Video progress:', progress);
                  }}
                  onStateChange={(state) => {
                    // Handle video state changes (playing, paused, ended, etc.)
                    console.log('Video state changed:', state);
                  }}
                  className="rounded-t-xl"
                />

                {/* Module Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    {mockModules[activeModule]?.title}
                  </h2>
                  <p className="text-gray-700 mb-6">
                    {mockModules[activeModule]?.content}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        disabled={activeModule === 0}
                        onClick={() => setActiveModule(Math.max(0, activeModule - 1))}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <button
                        disabled={activeModule === mockModules.length - 1}
                        onClick={() => setActiveModule(Math.min(mockModules.length - 1, activeModule + 1))}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                    
                    <button
                      onClick={() => handleModuleComplete(activeModule)}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Mark Complete
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
                <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Enroll to Access Course Content
                </h3>
                <p className="text-gray-600 mb-6">
                  Join thousands of students learning {course.title}
                </p>
                <button
                  onClick={onEnroll}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                >
                  {course.price === 0 ? 'Enroll Free' : `Enroll for ${course.price} ${course.currency}`}
                </button>
              </div>
            )}

            {/* Course Description */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About This Course</h3>
              <p className="text-gray-700 mb-6">{course.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">What You'll Learn</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Blockchain fundamentals and architecture</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Smart contract development with Solidity</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>DApp development and deployment</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Web3 integration with React</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Prerequisites</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Basic programming knowledge</li>
                    <li>• Familiarity with JavaScript</li>
                    <li>• Understanding of web development</li>
                    <li>• No blockchain experience required</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Modules */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Modules</h3>
              <div className="space-y-3">
                {mockModules.map((module, index) => (
                  <div
                    key={module.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      activeModule === index
                        ? 'border-purple-500 bg-purple-50'
                        : isModuleCompleted(index)
                        ? 'border-green-200 bg-green-50'
                        : isModuleUnlocked(index)
                        ? 'border-gray-200 hover:border-gray-300'
                        : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-60'
                    }`}
                    onClick={() => {
                      if (enrolled && isModuleUnlocked(index)) {
                        setActiveModule(index);
                      }
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {isModuleCompleted(index) ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : isModuleUnlocked(index) ? (
                          <BookOpen className="w-5 h-5 text-purple-500" />
                        ) : (
                          <Lock className="w-5 h-5 text-gray-400" />
                        )}
                        <div>
                          <div className="font-medium text-sm text-gray-900">
                            {module.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            {module.duration} minutes
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Instructor</h3>
              <div className="flex items-center space-x-4">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face&auto=format"
                  alt={course.educator.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <div className="font-semibold text-gray-900">{course.educator.name}</div>
                  <div className="text-sm text-gray-600">Blockchain Expert</div>
                  <div className="flex items-center space-x-1 mt-1">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">{course.educator.reputation} reputation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Stats */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Students Enrolled</span>
                  <span className="font-medium">{course.totalStudents}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Rating</span>
                  <span className="font-medium">{course.rating}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Course Level</span>
                  <span className="font-medium capitalize">{course.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="font-medium">
                    {new Date(course.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;