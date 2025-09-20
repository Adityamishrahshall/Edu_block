export interface User {
  id: string;
  address: string;
  name: string;
  email: string;
  role: 'learner' | 'educator' | 'recruiter';
  avatar?: string;
  reputation: number;
  totalSHM: number;
  joinedAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  educator: User;
  price: number;
  currency: 'SHM' | 'ETH';
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  thumbnail: string;
  totalStudents: number;
  rating: number;
  modules: Module[];
  createdAt: string;
  updatedAt: string;
  onChainId: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  content: string;
  videoUrl?: string; // YouTube video ID
  duration: number;
  order: number;
  completed?: boolean;
}

export interface NFTBadge {
  id: string;
  tokenId: string;
  name: string;
  description: string;
  image: string;
  attributes: BadgeAttribute[];
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt: string;
  onChainId: string;
}

export interface BadgeAttribute {
  trait_type: string;
  value: string | number;
}

export interface Certificate {
  id: string;
  courseId: string;
  studentId: string;
  courseName: string;
  studentName: string;
  completionDate: string;
  onChainHash: string;
  verified: boolean;
}

export interface Enrollment {
  id: string;
  courseId: string;
  studentId: string;
  progress: number;
  completedModules: string[];
  startedAt: string;
  completedAt?: string;
}