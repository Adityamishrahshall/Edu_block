import React, { useState, useEffect } from 'react';
import { BookOpen, Award, TrendingUp, Users, Clock, Star, ChevronRight, Activity, Calendar, Zap } from 'lucide-react';

const DashboardOverview = () => {
  const [animateStats, setAnimateStats] = useState(false);
  
  // Mock user data - replace with your useWeb3 hook
  const user = {
    name: "Alex Chen",
    role: "student", // "educator", "recruiter", "student"
    totalSHM: 1250,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format"
  };

  useEffect(() => {
    setTimeout(() => setAnimateStats(true), 300);
  }, []);

  // Enhanced mock data with more realistic numbers
  const stats = {
    totalCourses: user?.role === 'educator' ? 12 : 8,
    completedCourses: user?.role === 'educator' ? 0 : 5,
    totalStudents: user?.role === 'educator' ? 1250 : 0,
    averageRating: user?.role === 'educator' ? 4.8 : 0,
    totalBadges: 15,
    weeklyProgress: 73,
    streakDays: 12,
    recentActivity: [
      { id: 1, type: 'course_completed', title: 'Blockchain Fundamentals', date: '2 hours ago', icon: BookOpen, color: 'emerald' },
      { id: 2, type: 'badge_earned', title: 'Smart Contract Expert', date: '1 day ago', icon: Award, color: 'amber' },
      { id: 3, type: 'certificate_issued', title: 'Web3 Development', date: '3 days ago', icon: Star, color: 'purple' },
      { id: 4, type: 'milestone_reached', title: '1000 SHM Earned', date: '1 week ago', icon: TrendingUp, color: 'blue' },
    ]
  };

  const getStatCards = () => {
    if (user?.role === 'educator') {
      return [
        { icon: BookOpen, label: 'Courses Created', value: stats.totalCourses, color: 'blue', trend: '+2 this month' },
        { icon: Users, label: 'Total Students', value: stats.totalStudents.toLocaleString(), color: 'emerald', trend: '+47 this week' },
        { icon: Star, label: 'Average Rating', value: stats.averageRating.toFixed(1), color: 'amber', trend: '+0.2 this month' },
        { icon: TrendingUp, label: 'Monthly Earnings', value: '245 SHM', color: 'purple', trend: '+12% vs last month' },
      ];
    } else if (user?.role === 'recruiter') {
      return [
        { icon: Users, label: 'Candidates Verified', value: '156', color: 'blue', trend: '+23 this week' },
        { icon: Award, label: 'Credentials Checked', value: '312', color: 'emerald', trend: '+45 this week' },
        { icon: TrendingUp, label: 'Hiring Success', value: '89%', color: 'amber', trend: '+5% this month' },
        { icon: Clock, label: 'Avg. Verification Time', value: '2.5 min', color: 'purple', trend: '-30s this month' },
      ];
    } else {
      return [
        { icon: BookOpen, label: 'Enrolled Courses', value: stats.totalCourses, color: 'blue', trend: '+1 this week' },
        { icon: Award, label: 'Completed Courses', value: stats.completedCourses, color: 'emerald', trend: '62% complete' },
        { icon: Zap, label: 'Current Streak', value: `${stats.streakDays} days`, color: 'amber', trend: 'Keep it up!' },
        { icon: TrendingUp, label: 'SHM Earned', value: user?.totalSHM?.toLocaleString() || 0, color: 'purple', trend: '+150 this week' },
      ];
    }
  };

  const statCards = getStatCards();

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'from-blue-500/10 to-blue-600/5',
        border: 'border-blue-500/20 hover:border-blue-400/40',
        text: 'text-blue-400',
        glow: 'hover:shadow-blue-500/10'
      },
      emerald: {
        bg: 'from-emerald-500/10 to-emerald-600/5',
        border: 'border-emerald-500/20 hover:border-emerald-400/40',
        text: 'text-emerald-400',
        glow: 'hover:shadow-emerald-500/10'
      },
      amber: {
        bg: 'from-amber-500/10 to-amber-600/5',
        border: 'border-amber-500/20 hover:border-amber-400/40',
        text: 'text-amber-400',
        glow: 'hover:shadow-amber-500/10'
      },
      purple: {
        bg: 'from-purple-500/10 to-purple-600/5',
        border: 'border-purple-500/20 hover:border-purple-400/40',
        text: 'text-purple-400',
        glow: 'hover:shadow-purple-500/10'
      },
    };
    return colors[color];
  };

  const getActivityColor = (color) => {
    const colors = {
      emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      amber: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    };
    return colors[color] || colors.purple;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative space-y-8 p-6 max-w-7xl mx-auto">
          {/* Header with enhanced styling */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <img 
                  src={user.avatar} 
                  alt="Profile" 
                  className="w-12 h-12 rounded-full border-2 border-purple-400/50 shadow-lg shadow-purple-500/20"
                />
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                    Welcome back, {user?.name}!
                  </h1>
                  <p className="text-slate-400 text-lg">
                    {user?.role === 'educator' 
                      ? 'Track your courses and student progress' 
                      : user?.role === 'recruiter'
                      ? 'Verify credentials and find qualified talent'
                      : 'Continue your learning journey'}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-700/50">
                <span className="text-sm text-slate-400">Today: </span>
                <span className="text-white font-semibold">{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
              </div>
            </div>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat, index) => {
              const Icon = stat.icon;
              const colorClasses = getColorClasses(stat.color);
              return (
                <div
                  key={index}
                  className={`group relative bg-gradient-to-br ${colorClasses.bg} backdrop-blur-sm rounded-2xl border ${colorClasses.border} p-6 transition-all duration-500 hover:scale-[1.02] ${colorClasses.glow} hover:shadow-2xl cursor-pointer ${animateStats ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                  style={{transitionDelay: `${index * 100}ms`}}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-bold text-white group-hover:scale-105 transition-transform origin-left">
                        {stat.value}
                      </p>
                      <p className={`text-xs ${colorClasses.text} opacity-80`}>
                        {stat.trend}
                      </p>
                    </div>
                    <div className={`${colorClasses.text} p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  
                  {/* Animated border effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Enhanced Recent Activity */}
            <div className="lg:col-span-2 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 hover:bg-slate-800/40 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg">
                    <Activity className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
                </div>
                <button className="text-slate-400 hover:text-white transition-colors text-sm flex items-center space-x-1">
                  <span>View all</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                {stats.recentActivity.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div 
                      key={activity.id} 
                      className="group flex items-center space-x-4 p-4 rounded-xl hover:bg-slate-700/30 transition-all duration-300 cursor-pointer"
                      style={{animationDelay: `${index * 100}ms`}}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${getActivityColor(activity.color)} group-hover:scale-110 transition-transform`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium group-hover:text-purple-300 transition-colors">
                          {activity.title}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-purple-400 capitalize bg-purple-500/10 px-2 py-1 rounded-full">
                            {activity.type.replace('_', ' ')}
                          </span>
                          <span className="text-xs text-slate-400">{activity.date}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Enhanced Progress Chart */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 hover:bg-slate-800/40 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {user?.role === 'educator' ? 'Course Performance' : 'Weekly Progress'}
                </h3>
              </div>
              
              <div className="space-y-6">
                {/* Progress Ring */}
                <div className="relative flex items-center justify-center">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-slate-700"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 54}`}
                      strokeDashoffset={`${2 * Math.PI * 54 * (1 - stats.weeklyProgress / 100)}`}
                      className="text-emerald-400 transition-all duration-1000 ease-out"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-white">{stats.weeklyProgress}%</span>
                    <span className="text-xs text-slate-400">This Week</span>
                  </div>
                </div>

                {/* Mini stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-slate-700/30 rounded-xl">
                    <div className="text-lg font-bold text-amber-400">{stats.streakDays}</div>
                    <div className="text-xs text-slate-400">Day Streak</div>
                  </div>
                  <div className="text-center p-3 bg-slate-700/30 rounded-xl">
                    <div className="text-lg font-bold text-blue-400">5</div>
                    <div className="text-xs text-slate-400">This Week</div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25">
                  View Detailed Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;