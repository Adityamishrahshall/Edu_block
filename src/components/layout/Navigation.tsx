import React from 'react';
import { Home, BookOpen, Award, User, TrendingUp, Users, Shield } from 'lucide-react';
import { useWeb3 } from '../../context/Web3Context';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const { user } = useWeb3();

  const getNavigationItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'courses', label: 'Courses', icon: BookOpen },
      { id: 'achievements', label: 'Achievements', icon: Award },
      { id: 'profile', label: 'Profile', icon: User },
    ];

    if (user?.role === 'educator') {
      baseItems.push(
        { id: 'create-course', label: 'Create Course', icon: TrendingUp }
      );
    }

    if (user?.role === 'recruiter') {
      baseItems.push(
        { id: 'verify', label: 'Verify', icon: Shield },
        { id: 'talent', label: 'Find Talent', icon: Users }
      );
    }

    return baseItems;
  };

  const navigationItems = getNavigationItems();

  return (
    <nav className="bg-white shadow-sm border-r border-gray-200 w-64 min-h-screen hidden lg:block">
      <div className="p-4">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>

        {user && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{user.reputation}</div>
              <div className="text-sm text-gray-500">Reputation Points</div>
              <div className="mt-2">
                <div className="text-lg font-semibold text-gray-900">{user.totalSHM} SHM</div>
                <div className="text-xs text-gray-500">Total Earned</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;