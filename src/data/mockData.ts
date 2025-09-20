import { Course, NFTBadge, Certificate, User } from '../types/index';

// Mock users for educators
const mockEducators: User[] = [
  {
    id: 'edu-1',
    address: '0x1234567890123456789012345678901234567890',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@educhain.com',
    role: 'educator',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    reputation: 95,
    totalSHM: 1500,
    joinedAt: '2023-01-15T00:00:00Z'
  },
  {
    id: 'edu-2',
    address: '0x2345678901234567890123456789012345678901',
    name: 'Alex Chen',
    email: 'alex.chen@educhain.com',
    role: 'educator',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    reputation: 92,
    totalSHM: 1200,
    joinedAt: '2023-02-20T00:00:00Z'
  },
  {
    id: 'edu-3',
    address: '0x3456789012345678901234567890123456789012',
    name: 'Maria Rodriguez',
    email: 'maria.rodriguez@educhain.com',
    role: 'educator',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    reputation: 88,
    totalSHM: 980,
    joinedAt: '2023-03-10T00:00:00Z'
  }
];

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Blockchain',
    description: 'Learn the fundamentals of blockchain technology and how it works.',
    educator: mockEducators[0],
    price: 99,
    currency: 'SHM',
    duration: '4 weeks',
    level: 'beginner',
    category: 'Blockchain Fundamentals',
    thumbnail: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg',
    totalStudents: 1250,
    rating: 4.8,
    modules: [
      {
        id: '1-1',
        title: 'What is Blockchain?',
        description: 'Introduction to blockchain technology and its core concepts',
        content: 'Blockchain is a distributed ledger technology...',
        videoUrl: 'dQw4w9WgXcQ',
        duration: 30,
        order: 1,
        completed: false
      },
      {
        id: '1-2',
        title: 'How Blockchain Works',
        description: 'Deep dive into blockchain mechanics and consensus',
        content: 'Understanding how blocks are created and validated...',
        videoUrl: 'dQw4w9WgXcQ',
        duration: 45,
        order: 2,
        completed: false
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    onChainId: 'course_001'
  },
  {
    id: '2',
    title: 'Smart Contract Development',
    description: 'Master the art of creating smart contracts on Ethereum.',
    educator: mockEducators[1],
    price: 149,
    currency: 'SHM',
    duration: '6 weeks',
    level: 'intermediate',
    category: 'Smart Contracts',
    thumbnail: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg',
    totalStudents: 890,
    rating: 4.9,
    modules: [
      {
        id: '2-1',
        title: 'Solidity Basics',
        description: 'Learn the fundamentals of Solidity programming language',
        content: 'Solidity is a contract-oriented programming language...',
        videoUrl: 'dQw4w9WgXcQ',
        duration: 60,
        order: 1,
        completed: false
      },
      {
        id: '2-2',
        title: 'Writing Your First Contract',
        description: 'Create and deploy your first smart contract',
        content: 'Step by step guide to writing smart contracts...',
        videoUrl: 'dQw4w9WgXcQ',
        duration: 90,
        order: 2,
        completed: false
      }
    ],
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-25T00:00:00Z',
    onChainId: 'course_002'
  },
  {
    id: '3',
    title: 'DeFi Fundamentals',
    description: 'Understand decentralized finance protocols and applications.',
    educator: mockEducators[2],
    price: 199,
    currency: 'SHM',
    duration: '5 weeks',
    level: 'advanced',
    category: 'DeFi',
    thumbnail: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg',
    totalStudents: 567,
    rating: 4.7,
    modules: [
      {
        id: '3-1',
        title: 'DeFi Overview',
        description: 'Introduction to decentralized finance ecosystem',
        content: 'DeFi represents a shift from traditional finance...',
        videoUrl: 'dQw4w9WgXcQ',
        duration: 40,
        order: 1,
        completed: false
      },
      {
        id: '3-2',
        title: 'Liquidity Pools',
        description: 'Understanding automated market makers and liquidity provision',
        content: 'Liquidity pools are smart contracts that hold tokens...',
        videoUrl: 'dQw4w9WgXcQ',
        duration: 55,
        order: 2,
        completed: false
      }
    ],
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-02-05T00:00:00Z',
    onChainId: 'course_003'
  }
];

export const mockBadges: NFTBadge[] = [
  {
    id: '1',
    tokenId: 'badge_001',
    name: 'Blockchain Pioneer',
    description: 'Completed Introduction to Blockchain course',
    image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg',
    attributes: [
      { trait_type: 'Course', value: 'Introduction to Blockchain' },
      { trait_type: 'Level', value: 'Beginner' },
      { trait_type: 'Completion Date', value: '2024-01-15' }
    ],
    rarity: 'common',
    earnedAt: '2024-01-15T00:00:00Z',
    onChainId: 'badge_001'
  },
  {
    id: '2',
    tokenId: 'badge_002',
    name: 'Smart Contract Expert',
    description: 'Mastered Smart Contract Development',
    image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg',
    attributes: [
      { trait_type: 'Course', value: 'Smart Contract Development' },
      { trait_type: 'Level', value: 'Intermediate' },
      { trait_type: 'Skill', value: 'Solidity' }
    ],
    rarity: 'rare',
    earnedAt: '2024-02-20T00:00:00Z',
    onChainId: 'badge_002'
  },
  {
    id: '3',
    tokenId: 'badge_003',
    name: 'DeFi Specialist',
    description: 'Expert in Decentralized Finance',
    image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg',
    attributes: [
      { trait_type: 'Course', value: 'DeFi Fundamentals' },
      { trait_type: 'Level', value: 'Advanced' },
      { trait_type: 'Specialization', value: 'DeFi' }
    ],
    rarity: 'epic',
    earnedAt: '2024-03-10T00:00:00Z',
    onChainId: 'badge_003'
  }
];

export const mockCertificates: Certificate[] = [
  {
    id: '1',
    courseId: '1',
    studentId: 'student_001',
    courseName: 'Introduction to Blockchain',
    studentName: 'John Doe',
    completionDate: '2024-01-15T00:00:00Z',
    onChainHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
    verified: true
  },
  {
    id: '2',
    courseId: '2',
    studentId: 'student_002',
    courseName: 'Smart Contract Development',
    studentName: 'Jane Smith',
    completionDate: '2024-02-20T00:00:00Z',
    onChainHash: '0x2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890ab',
    verified: true
  }
];