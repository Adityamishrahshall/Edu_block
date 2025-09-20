import React, { useState } from 'react';
import { Plus, X, Upload, Save } from 'lucide-react';
import { Course, Module } from '../../types';

const CourseCreation: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    currency: 'SHM',
    level: 'beginner',
    category: '',
    duration: '',
    thumbnail: ''
  });

  const [modules, setModules] = useState<Partial<Module>[]>([
    { title: '', description: '', content: '', duration: 0, order: 1 }
  ]);

  const categories = [
    'Blockchain', 'Web Development', 'Data Science', 'AI/ML', 'Cybersecurity',
    'Mobile Development', 'DevOps', 'UI/UX Design', 'Business', 'Marketing'
  ];

  const addModule = () => {
    setModules([
      ...modules,
      { title: '', description: '', content: '', duration: 0, order: modules.length + 1 }
    ]);
  };

  const removeModule = (index: number) => {
    if (modules.length > 1) {
      setModules(modules.filter((_, i) => i !== index));
    }
  };

  const updateModule = (index: number, field: string, value: any) => {
    const updatedModules = modules.map((module, i) => 
      i === index ? { ...module, [field]: value } : module
    );
    setModules(updatedModules);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would interact with smart contracts
    console.log('Creating course:', { ...formData, modules });
    alert('Course created successfully! (Mock implementation)');
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="bg-dark-secondary rounded-xl shadow-lg border border-gray-700 p-6 glass glow-purple">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Plus className="w-6 h-6 mr-2 text-purple-400" />
          Create New Course
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Course Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 bg-dark-tertiary border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400"
                placeholder="e.g., Complete Web3 Development Course"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 bg-dark-tertiary border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Level
              </label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="w-full px-4 py-2 bg-dark-tertiary border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Duration
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-2 bg-dark-tertiary border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400"
                placeholder="e.g., 8 weeks, 20 hours"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Price
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  className="flex-1 px-4 py-2 bg-dark-tertiary border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400"
                  placeholder="0"
                />
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="px-4 py-2 bg-dark-tertiary border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white"
                >
                  <option value="SHM">SHM</option>
                  <option value="ETH">ETH</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Course Thumbnail
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="url"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="flex-1 px-4 py-2 bg-dark-tertiary border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400"
                  placeholder="Image URL"
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-dark-tertiary border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-600/50 transition-colors flex items-center space-x-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload</span>
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Course Description *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 bg-dark-tertiary border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400"
              placeholder="Describe what students will learn in this course..."
            />
          </div>

          {/* Modules */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Course Modules</h3>
              <button
                type="button"
                onClick={addModule}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 glow-purple transform hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>Add Module</span>
              </button>
            </div>

            <div className="space-y-4">
              {modules.map((module, index) => (
                <div key={index} className="border border-gray-600 rounded-lg p-4 bg-dark-tertiary">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-white">Module {index + 1}</h4>
                    {modules.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeModule(index)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Module Title"
                      value={module.title || ''}
                      onChange={(e) => updateModule(index, 'title', e.target.value)}
                      className="px-4 py-2 bg-dark-primary border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400"
                    />
                    <input
                      type="number"
                      placeholder="Duration (minutes)"
                      value={module.duration || ''}
                      onChange={(e) => updateModule(index, 'duration', parseInt(e.target.value) || 0)}
                      className="px-4 py-2 bg-dark-primary border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400"
                    />
                  </div>

                  <textarea
                    rows={2}
                    placeholder="Module Description"
                    value={module.description || ''}
                    onChange={(e) => updateModule(index, 'description', e.target.value)}
                    className="w-full px-4 py-2 bg-dark-primary border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400 mb-4"
                  />

                  <textarea
                    rows={4}
                    placeholder="Module Content"
                    value={module.content || ''}
                    onChange={(e) => updateModule(index, 'content', e.target.value)}
                    className="w-full px-4 py-2 bg-dark-primary border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="YouTube Video ID (e.g., M7lc1UVf-VE)"
                    value={module.videoUrl || ''}
                    onChange={(e) => updateModule(index, 'videoUrl', e.target.value)}
                    className="w-full px-4 py-2 bg-dark-primary border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400 mt-4"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-600/20 transition-colors"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center space-x-2 glow-purple transform hover:scale-105"
            >
              <Save className="w-4 h-4" />
              <span>Create & Mint Course</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseCreation;