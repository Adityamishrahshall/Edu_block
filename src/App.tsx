import React, { useState } from 'react';
import { Web3Provider, useWeb3 } from './context/Web3Context';
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import LandingPage from './components/pages/LandingPage';
import CoursePage from './components/pages/CoursePage';
import ProfilePage from './components/pages/ProfilePage';
import ExplorePage from './components/pages/ExplorePage';
import DashboardOverview from './components/dashboard/DashboardOverview';
import CourseCard from './components/courses/CourseCard';
import AILearningAssistant from './components/ai/AILearningAssistant';
import BadgeCard from './components/badges/BadgeCard';
import CertificateViewer from './components/certificates/CertificateViewer';
import CourseCreation from './components/courses/CourseCreation';
import { mockCourses, mockBadges, mockCertificates } from './data/mockData';
import { BookOpen, Award, Users, Search, Shield, TrendingUp, ExternalLink } from 'lucide-react';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const { isConnected, user } = useWeb3();

  if (!isConnected) {
    return <LandingPage onGetStarted={() => {}} />;
  }

  // Show course detail page
  if (selectedCourse) {
    return (
      <CoursePage
        course={selectedCourse}
        enrolled={Math.random() > 0.5}
        progress={Math.random() * 100}
        onEnroll={() => console.log('Enrolling in course')}
        onBack={() => setSelectedCourse(null)}
      />
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <DashboardOverview />
            <AILearningAssistant />
          </div>
        );
        
      case 'courses':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-bold text-gray-900">Course Marketplace</h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
                  />
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>All Categories</option>
                  <option>Blockchain</option>
                  <option>Web Development</option>
                  <option>Cybersecurity</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onEnroll={(courseId) => setSelectedCourse(course)}
                  enrolled={Math.random() > 0.5}
                  progress={Math.random() * 100}
                />
              ))}
            </div>
          </div>
        );
        
      case 'achievements':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Your Achievements</h2>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">NFT Badges</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mockBadges.map((badge) => (
                  <BadgeCard
                    key={badge.id}
                    badge={badge}
                    onClick={() => console.log('Badge details:', badge)}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificates</h3>
              <div className="space-y-6">
                {mockCertificates.map((certificate) => (
                  <CertificateViewer key={certificate.id} certificate={certificate} />
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'profile':
        return <ProfilePage />;
        
      case 'create-course':
        return <CourseCreation />;
        
      case 'verify':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="w-6 h-6 mr-2 text-blue-600" />
                Verify Credentials
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certificate Hash or Student Address
                  </label>
                  <input
                    type="text"
                    placeholder="0x... or certificate hash"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Verify on Blockchain</span>
                </button>
              </div>

              <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Verification Result
                </h4>
                <p className="text-green-700 text-sm mb-1">
                  ✅ Certificate verified on blockchain
                </p>
                <p className="text-green-700 text-sm mb-1">
                  Student: John Doe | Course: Complete Web3 Development
                </p>
                <p className="text-green-700 text-sm mb-2">
                  Completion Date: February 15, 2024
                </p>
                <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1 transition-colors">
                  <span>View on Explorer</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        );
        
      case 'talent':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Users className="w-6 h-6 mr-2 text-blue-600" />
              Find Qualified Talent
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={`https://images.unsplash.com/photo-147209968${i}-5658abf4ff4e?w=64&h=64&fit=crop&crop=face&auto=format`}
                      alt="Candidate"
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">Candidate {i}</h3>
                      <p className="text-gray-600">Full Stack Web3 Developer</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Award className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-gray-500">8 verified certificates</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Blockchain Skills</span>
                      <span className="text-sm font-medium text-gray-900">95%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Smart Contracts</span>
                      <span className="text-sm font-medium text-gray-900">90%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">DeFi Protocols</span>
                      <span className="text-sm font-medium text-gray-900">88%</span>
                    </div>
                  </div>

                  <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    View Full Profile
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
        
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-4 lg:p-6">
          <div className="lg:hidden mb-6">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="dashboard">Dashboard</option>
              <option value="courses">Courses</option>
              <option value="achievements">Achievements</option>
              <option value="profile">Profile</option>
              {user?.role === 'educator' && <option value="create-course">Create Course</option>}
              {user?.role === 'recruiter' && (
                <>
                  <option value="verify">Verify</option>
                  <option value="talent">Find Talent</option>
                </>
              )}
            </select>
          </div>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Web3Provider>
      <AppContent />
    </Web3Provider>
  );
};

export default App;