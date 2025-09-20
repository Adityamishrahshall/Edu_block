import React from 'react';
import { BookOpen, Award, Shield, TrendingUp, Users, Zap, ArrowRight, Star } from 'lucide-react';
import { useWeb3 } from '../../context/Web3Context';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const { connect, isLoading, error } = useWeb3();

  const features = [
    {
      icon: Award,
      title: 'Verified Certificates',
      description: 'Earn blockchain-verified certificates that prove your expertise'
    },
    {
      icon: Shield,
      title: 'Secure Credentials',
      description: 'Your achievements are permanently stored on the blockchain'
    },
    {
      icon: TrendingUp,
      title: 'Earn Rewards',
      description: 'Get rewarded with tokens for completing courses'
    },
    {
      icon: Users,
      title: 'Global Community',
      description: 'Connect with learners and educators worldwide'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Learners' },
    { number: '500+', label: 'Expert Educators' },
    { number: '1.2K+', label: 'Courses Available' },
    { number: '50K+', label: 'Certificates Issued' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="flex items-center justify-center mb-8">
            <img
              src="/WhatsApp Image 2025-09-20 at 13.03.27_16565658.jpg"
              alt="EduChain Logo"
              className="w-16 h-16 rounded-2xl mr-4"
            />
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
              EduChain
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Learn, earn, and verify your skills on the blockchain. 
            The future of education is decentralized.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={connect}
              disabled={isLoading}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <span>Connect Wallet & Start</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors">
              Explore Courses
            </button>
          </div>

          {error && (
            <div className="max-w-md mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
              {error.includes('MetaMask') && (
                <button
                  onClick={() => window.open('https://metamask.io/download/', '_blank')}
                  className="mt-2 text-blue-600 hover:text-blue-800 underline text-sm"
                >
                  Install MetaMask
                </button>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose EduChain?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the next generation of education with blockchain-powered learning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in just a few simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Connect Wallet</h3>
              <p className="text-gray-600">
                Connect your MetaMask wallet to get started with blockchain learning
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Courses</h3>
              <p className="text-gray-600">
                Browse our marketplace and enroll in courses that match your interests
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Earn Credentials</h3>
              <p className="text-gray-600">
                Complete courses and earn verified certificates and badges
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Community Says
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Web3 Developer",
                content: "EduChain Academy transformed my career. The blockchain certificates helped me land my dream job!",
                rating: 5
              },
              {
                name: "Marcus Rodriguez",
                role: "Blockchain Educator",
                content: "As an educator, I love how easy it is to create and monetize courses while helping students learn.",
                rating: 5
              },
              {
                name: "Emily Johnson",
                role: "Tech Recruiter",
                content: "Verifying candidates' skills is now instant and trustworthy. This platform is a game-changer!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img
                    src={`https://images.unsplash.com/photo-147209968${index + 1}-5658abf4ff4e?w=48&h=48&fit=crop&crop=face&auto=format`}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of learners earning blockchain-verified credentials
          </p>
          <button
            onClick={connect}
            disabled={isLoading}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center space-x-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <span>Connect Wallet & Start Learning</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;