import React, { useState } from 'react';
import { User, Award, BookOpen, Calendar, MapPin, Mail, Edit3, Save, X } from 'lucide-react';
import { useWeb3 } from '../../context/Web3Context';
import BadgeCard from '../badges/BadgeCard';
import { mockBadges, mockCertificates } from '../../data/mockData';

const ProfilePage: React.FC = () => {
  const { user, address, balance } = useWeb3();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Passionate Web3 developer and blockchain enthusiast. Always learning and building the future of decentralized applications.',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    twitter: '@johndoe_web3'
  });

  const handleSave = () => {
    // In production, this would update the user profile
    console.log('Saving profile:', editedProfile);
    setIsEditing(false);
  };

  const learningStats = {
    coursesCompleted: 12,
    coursesInProgress: 3,
    totalHours: 156,
    badgesEarned: mockBadges.length,
    certificatesEarned: mockCertificates.length,
    shmEarned: user?.totalSHM || 0
  };

  const recentActivity = [
    { type: 'course_completed', title: 'Smart Contract Security', date: '2 days ago', icon: BookOpen },
    { type: 'badge_earned', title: 'DeFi Expert Badge', date: '1 week ago', icon: Award },
    { type: 'course_started', title: 'Advanced Solidity', date: '2 weeks ago', icon: BookOpen },
    { type: 'certificate_earned', title: 'Web3 Development Certificate', date: '3 weeks ago', icon: Award }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face&auto=format"
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-purple-100"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                    className="text-2xl font-bold bg-transparent border-b-2 border-purple-300 focus:border-purple-500 outline-none"
                  />
                  <input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                    className="text-gray-600 bg-transparent border-b border-gray-300 focus:border-purple-500 outline-none"
                  />
                  <textarea
                    value={editedProfile.bio}
                    onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                    rows={3}
                    className="w-full text-gray-700 bg-transparent border border-gray-300 rounded-lg p-2 focus:border-purple-500 outline-none resize-none"
                  />
                </div>
              ) : (
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{editedProfile.name}</h1>
                  <p className="text-gray-600 mb-2">{editedProfile.email}</p>
                  <p className="text-gray-700 mb-4">{editedProfile.bio}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{editedProfile.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {new Date(user?.joinedAt || '').toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span className="capitalize">{user?.role}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        {/* Wallet Info */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-sm text-purple-600 font-medium">Wallet Address</div>
              <div className="text-sm text-gray-700 font-mono">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-sm text-blue-600 font-medium">SHM Balance</div>
              <div className="text-lg font-bold text-gray-900">{balance} SHM</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-sm text-green-600 font-medium">Reputation</div>
              <div className="text-lg font-bold text-gray-900">{user?.reputation}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Stats */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Learning Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{learningStats.coursesCompleted}</div>
            <div className="text-sm text-gray-600">Courses Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{learningStats.coursesInProgress}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{learningStats.totalHours}</div>
            <div className="text-sm text-gray-600">Hours Learned</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{learningStats.badgesEarned}</div>
            <div className="text-sm text-gray-600">Badges Earned</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">{learningStats.certificatesEarned}</div>
            <div className="text-sm text-gray-600">Certificates</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{learningStats.shmEarned}</div>
            <div className="text-sm text-gray-600">SHM Earned</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{activity.title}</div>
                    <div className="text-sm text-gray-500">{activity.date}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Latest Badges */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest Badges</h3>
          <div className="grid grid-cols-2 gap-4">
            {mockBadges.slice(0, 4).map((badge) => (
              <div key={badge.id} className="text-center">
                <img
                  src={badge.image}
                  alt={badge.name}
                  className="w-16 h-16 mx-auto mb-2 rounded-lg"
                />
                <div className="text-sm font-medium text-gray-900">{badge.name}</div>
                <div className="text-xs text-gray-500 capitalize">{badge.rarity}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;