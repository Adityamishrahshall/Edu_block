import React from 'react';
import { BookOpen, Award, TrendingUp, Users, Clock, Star } from 'lucide-react';
import { useWeb3 } from '../../context/Web3Context';

const DashboardOverview: React.FC = () => {
  const { user } = useWeb3();

  // Mock data - in production, fetch from your backend
  const stats = {
    totalCourses: user?.role === 'educator' ? 12 : 8,
    completedCourses: user?.role === 'educator' ? 0 : 5,
    totalStudents: user?.role === 'educator' ? 1250 : 0,
    averageRating: user?.role === 'educator' ? 4.8 : 0,
    totalBadges: 15,
    recentActivity: [
      { id: 1, type: 'course_completed', title: 'Blockchain Fundamentals', date: '2 days ago' },
      { id: 2, type: 'badge_earned', title: 'Smart Contract Expert', date: '1 week ago' },
      { id: 3, type: 'certificate_issued', title: 'Web3 Development', date: '2 weeks ago' },
    ]
  };

  const getStatCards = () => {
    if (user?.role === 'educator') {
      return [
        { icon: BookOpen, label: 'Courses Created', value: stats.totalCourses, color: 'blue' },
        { icon: Users, label: 'Total Students', value: stats.totalStudents, color: 'green' },
        { icon: Star, label: 'Average Rating', value: stats.averageRating.toFixed(1), color: 'yellow' },
        { icon: TrendingUp, label: 'Monthly Earnings', value: '245 SHM', color: 'purple' },
      ];
    } else if (user?.role === 'recruiter') {
      return [
        { icon: Users, label: 'Candidates Verified', value: '156', color: 'blue' },
        { icon: Award, label: 'Credentials Checked', value: '312', color: 'green' },
        { icon: TrendingUp, label: 'Hiring Success', value: '89%', color: 'yellow' },
        { icon: Clock, label: 'Avg. Verification Time', value: '2.5 min', color: 'purple' },
      ];
    } else {
      return [
        { icon: BookOpen, label: 'Enrolled Courses', value: stats.totalCourses, color: 'blue' },
        { icon: Award, label: 'Completed Courses', value: stats.completedCourses, color: 'green' },
        { icon: Award, label: 'NFT Badges', value: stats.totalBadges, color: 'yellow' },
        { icon: TrendingUp, label: 'SHM Earned', value: user?.totalSHM || 0, color: 'purple' },
      ];
    }
  };

  const statCards = getStatCards();

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200',
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-400">
          {user?.role === 'educator' 
            ? 'Track your courses and student progress' 
            : user?.role === 'recruiter'
            ? 'Verify credentials and find qualified talent'
            : 'Continue your learning journey'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`bg-dark-secondary rounded-xl border-2 p-6 glass glow-purple transition-all duration-300 hover:scale-105 ${getColorClasses(stat.color)}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <Icon className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-dark-secondary rounded-xl shadow-lg border border-gray-700 p-6 glass">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {stats.recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-dark-tertiary transition-colors">
              <div className="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center glow-purple">
                <BookOpen className="w-5 h-5 text-purple-400" />
                <p className="text-sm font-medium text-white">{activity.title}</p>
                <p className="text-xs text-gray-400">{activity.date}</p>
              </div>
              <span className="text-xs text-purple-400 capitalize">
                {activity.type.replace('_', ' ')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Chart Placeholder */}
      <div className="bg-dark-secondary rounded-xl shadow-lg border border-gray-700 p-6 glass">
        <h3 className="text-lg font-semibold text-white mb-4">
          {user?.role === 'educator' ? 'Course Performance' : 'Learning Progress'}
        </h3>
        <div className="h-64 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-lg flex items-center justify-center border border-gray-600">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-3 animate-pulse" />
            <p className="text-gray-400">Interactive charts coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;