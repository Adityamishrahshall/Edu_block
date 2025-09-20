import React, { useState } from 'react';
import { Search, Filter, Star, Clock, Users, TrendingUp, Award, BookOpen } from 'lucide-react';
import CourseCard from '../courses/CourseCard';
import { mockCourses } from '../../data/mockData';

const ExplorePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const categories = [
    'all', 'Blockchain', 'Web Development', 'Data Science', 'AI/ML', 
    'Cybersecurity', 'Mobile Development', 'DevOps', 'UI/UX Design'
  ];

  const levels = ['all', 'beginner', 'intermediate', 'advanced'];

  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' }
  ];

  const featuredCourses = mockCourses.slice(0, 3);
  const trendingTopics = [
    { name: 'DeFi Development', count: 45, growth: '+12%' },
    { name: 'NFT Marketplaces', count: 32, growth: '+8%' },
    { name: 'Smart Contract Security', count: 28, growth: '+15%' },
    { name: 'Web3 Integration', count: 38, growth: '+10%' }
  ];

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white glow-purple animate-gradient">
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Web3 Education
          </h1>
          <p className="text-lg text-purple-100 mb-6">
            Discover cutting-edge courses in blockchain, DeFi, NFTs, and more. 
            Learn from industry experts and earn verified credentials.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses, skills, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-md text-white placeholder-gray-300 focus:ring-2 focus:ring-white focus:ring-opacity-50 outline-none border border-white/20"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-dark-secondary rounded-xl p-6 text-center shadow-lg border border-gray-700 glass glow-purple hover:scale-105 transition-transform">
          <BookOpen className="w-8 h-8 text-purple-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white">1,200+</div>
          <div className="text-sm text-gray-400">Courses Available</div>
        </div>
        <div className="bg-dark-secondary rounded-xl p-6 text-center shadow-lg border border-gray-700 glass glow-blue hover:scale-105 transition-transform">
          <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white">50K+</div>
          <div className="text-sm text-gray-400">Active Learners</div>
        </div>
        <div className="bg-dark-secondary rounded-xl p-6 text-center shadow-lg border border-gray-700 glass hover:scale-105 transition-transform">
          <Award className="w-8 h-8 text-green-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white">25K+</div>
          <div className="text-sm text-gray-400">Certificates Issued</div>
        </div>
        <div className="bg-dark-secondary rounded-xl p-6 text-center shadow-lg border border-gray-700 glass hover:scale-105 transition-transform">
          <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white">4.8</div>
          <div className="text-sm text-gray-400">Average Rating</div>
        </div>
      </div>

      {/* Featured Courses */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEnroll={(courseId) => console.log('Enrolling in:', courseId)}
              enrolled={Math.random() > 0.7}
              progress={Math.random() * 100}
            />
          ))}
        </div>
      </div>

      {/* Trending Topics */}
      <div className="bg-dark-secondary rounded-xl shadow-lg border border-gray-700 p-6 glass">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
          Trending Topics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingTopics.map((topic, index) => (
            <div key={index} className="p-4 bg-dark-tertiary rounded-lg hover:bg-gray-600/20 transition-all cursor-pointer border border-gray-600 hover:scale-105">
              <div className="font-medium text-white">{topic.name}</div>
              <div className="text-sm text-gray-400">{topic.count} courses</div>
              <div className="text-sm text-green-600 font-medium">{topic.growth}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters and Course Grid */}
      <div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <h2 className="text-2xl font-bold text-white mb-4 lg:mb-0">All Courses</h2>
          
          <div className="flex flex-wrap items-center gap-4">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-dark-tertiary border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>

            {/* Level Filter */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2 bg-dark-tertiary border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white"
            >
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-dark-tertiary border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEnroll={(courseId) => console.log('Enrolling in:', courseId)}
              enrolled={Math.random() > 0.6}
              progress={Math.random() * 100}
            />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No courses found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;