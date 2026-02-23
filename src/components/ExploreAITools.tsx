import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wand2, ArrowRight, Star, Users, Zap, TrendingUp } from 'lucide-react';
import { useSound } from '../lib/soundUtils';

interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  rating: number;
  users: string;
  price: string;
  features: string[];
}

const aiTools: AITool[] = [
  {
    id: '1',
    name: 'ChatGPT',
    description: 'Advanced language model for conversation, writing, and problem-solving.',
    category: 'Language & Writing',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&q=80',
    rating: 4.8,
    users: '100M+',
    price: 'Free/Pro',
    features: ['Conversation', 'Writing', 'Coding', 'Analysis']
  },
  {
    id: '2',
    name: 'Midjourney',
    description: 'AI-powered image generation from text descriptions.',
    category: 'Image Generation',
    image: 'https://images.unsplash.com/photo-1686191128892-3b1c0b5b0b5b?auto=format&fit=crop&w=400&q=80',
    rating: 4.7,
    users: '15M+',
    price: '$10/month',
    features: ['Art Creation', 'Design', 'Marketing', 'Concept Art']
  },
  {
    id: '3',
    name: 'AutoTranslate',
    description: 'Real-time translation and language learning platform.',
    category: 'Language & Translation',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80',
    rating: 4.6,
    users: '50M+',
    price: 'Free/Premium',
    features: ['Translation', 'Learning', 'Voice', 'Documents']
  },
  {
    id: '4',
    name: 'CodeWhisperer',
    description: 'AI-powered code completion and generation for developers.',
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
    rating: 4.5,
    users: '2M+',
    price: '$20/month',
    features: ['Code Generation', 'Debugging', 'Documentation', 'Testing']
  },
  {
    id: '5',
    name: 'DataInsight',
    description: 'AI-driven data analysis and business intelligence platform.',
    category: 'Analytics',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80',
    rating: 4.4,
    users: '500K+',
    price: '$50/month',
    features: ['Data Analysis', 'Visualization', 'Predictions', 'Reports']
  },
  {
    id: '6',
    name: 'VideoCreator',
    description: 'AI-powered video creation and editing platform.',
    category: 'Video & Media',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=400&q=80',
    rating: 4.3,
    users: '1M+',
    price: '$15/month',
    features: ['Video Editing', 'Animation', 'Effects', 'Templates']
  },
  {
    id: '7',
    name: 'VoiceSynthesizer',
    description: 'Advanced text-to-speech with natural voice generation.',
    category: 'Audio & Voice',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
    rating: 4.2,
    users: '750K+',
    price: '$25/month',
    features: ['Voice Generation', 'Podcasts', 'Audiobooks', 'Accessibility']
  },
  {
    id: '8',
    name: 'DesignMaster',
    description: 'AI-powered design tool for graphics, logos, and branding.',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=400&q=80',
    rating: 4.1,
    users: '300K+',
    price: '$30/month',
    features: ['Logo Design', 'Branding', 'Graphics', 'Templates']
  }
];

const categories = ['All', 'Language & Writing', 'Image Generation', 'Language & Translation', 'Development', 'Analytics', 'Video & Media', 'Audio & Voice', 'Design'];

export default function ExploreAITools() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { playClick } = useSound();

  const filteredTools = selectedCategory === 'All' 
    ? aiTools 
    : aiTools.filter(tool => tool.category === selectedCategory);

  const handleCategoryClick = (category: string) => {
    playClick();
    setSelectedCategory(category);
  };

  const handleToolClick = () => {
    playClick();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mr-4 animate-bounce-slow">
                <Wand2 className="w-8 h-8 text-purple-300" />
              </div>
              <h1 className="text-5xl font-bold">
                Explore <span className="text-purple-300">AI Tools</span>
              </h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Discover powerful AI tools that can transform your workflow. From content creation to development, 
              find the perfect AI assistant for your needs.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Filter by Category</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md hover:shadow-lg'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTools.map((tool, index) => (
            <div
              key={tool.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ai-card cursor-pointer overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={handleToolClick}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={tool.image}
                  alt={tool.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                    {tool.price}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700">{tool.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                    {tool.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {tool.name}
                </h3>
                
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {tool.description}
                </p>

                {/* Stats */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>Users</span>
                    </div>
                    <span className="font-semibold text-blue-600">{tool.users}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Zap className="w-4 h-4" />
                      <span>Features</span>
                    </div>
                    <span className="font-semibold text-purple-600">{tool.features.length}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {tool.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                    {tool.features.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        +{tool.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playClick();
                  }}
                  className="w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Supercharge Your Workflow?</h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Choose the AI tools that best fit your needs and start creating amazing content, 
              building better products, and growing your business.
            </p>
            <Link
              to="/explore-ideas"
              onClick={() => playClick()}
              className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-bold text-lg rounded-2xl hover:bg-purple-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <TrendingUp className="w-5 h-5 mr-3" />
              Explore AI Ideas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
