import React from 'react';
import { Clock, Star, Users, Award } from 'lucide-react';
import { Course } from '../../types';

interface CourseCardProps {
  course: Course;
  onEnroll?: (courseId: string) => void;
  enrolled?: boolean;
  progress?: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onEnroll, enrolled, progress }) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEnroll = () => {
    if (onEnroll) {
      onEnroll(course.id);
    }
  };

  return (
    <div className="bg-dark-secondary rounded-xl shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-300 overflow-hidden group glass glow-purple hover:scale-105">
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(course.level)}`}>
            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
          </span>
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-black bg-opacity-70 text-white px-2 py-1 text-xs rounded">
            {course.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {course.description}
        </p>

        <div className="flex items-center space-x-1 mb-4">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{course.rating.toFixed(1)}</span>
          </div>
          <span className="text-gray-300">•</span>
          <div className="flex items-center space-x-1 text-gray-400">
            <Users className="w-4 h-4" />
            <span className="text-sm">{course.totalStudents}</span>
          </div>
          <span className="text-gray-300">•</span>
          <div className="flex items-center space-x-1 text-gray-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{course.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <img
              src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face&auto=format`}
              alt={course.educator.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-gray-600">{course.educator.name}</span>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-purple-400">
              {course.price === 0 ? 'Free' : `${course.price} ${course.currency}`}
            </div>
          </div>
        </div>

        {enrolled && typeof progress === 'number' && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-400">Progress</span>
              <span className="font-medium text-white">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300 glow-purple"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        <button
          onClick={handleEnroll}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 ${
            enrolled
              ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30 border border-green-600/50 glow-blue'
              : course.price === 0
              ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 glow-blue'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 glow-purple'
          }`}
        >
          {enrolled ? (
            <>
              <Award className="w-4 h-4" />
              <span>Continue Learning</span>
            </>
          ) : (
            <span>{course.price === 0 ? 'Enroll Free' : 'Enroll Now'}</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;