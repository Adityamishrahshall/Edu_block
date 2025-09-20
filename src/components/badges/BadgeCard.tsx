import React from 'react';
import { Trophy, Calendar, Star } from 'lucide-react';
import { NFTBadge } from '../../types';

interface BadgeCardProps {
  badge: NFTBadge;
  onClick?: () => void;
}

const BadgeCard: React.FC<BadgeCardProps> = ({ badge, onClick }) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'rare':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'epic':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'legendary':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'rare':
        return 'hover:shadow-blue-200';
      case 'epic':
        return 'hover:shadow-purple-200';
      case 'legendary':
        return 'hover:shadow-yellow-200';
      default:
        return 'hover:shadow-gray-200';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`bg-dark-secondary rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300 cursor-pointer group glass transform hover:scale-105 ${getRarityColor(badge.rarity)} ${getRarityGlow(badge.rarity)}`}
    >
      <div className="p-6">
        <div className="relative mb-4">
          <img
            src={badge.image}
            alt={badge.name}
            className="w-full h-32 object-contain mx-auto group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getRarityColor(badge.rarity)}`}>
              {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-white mb-2 text-center">
          {badge.name}
        </h3>

        <p className="text-gray-300 text-sm mb-4 text-center line-clamp-2">
          {badge.description}
        </p>

        <div className="space-y-2 mb-4">
          {badge.attributes.slice(0, 3).map((attr, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-xs text-gray-400">{attr.trait_type}:</span>
              <span className="text-xs font-medium text-white">{attr.value}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-1">
            <Trophy className="w-3 h-3 text-yellow-400" />
            <span>#{badge.tokenId}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3 text-purple-400" />
            <span>{new Date(badge.earnedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeCard;