import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, ArrowRight, TrendingUp, Clock, Star } from 'lucide-react';
import { useSound } from '../lib/soundUtils';

interface Idea {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedEarnings: string;
  timeToComplete: string;
  rating: number;
}

const ideas: Idea[] = [
  {
    id: '1',
    title: 'AI-Powered Content Creation Platform',
    description: 'Build a platform that uses AI to generate high-quality content for businesses, bloggers, and marketers.',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80',
    difficulty: 'Hard',
    estimatedEarnings: '$5,000 - $15,000/month',
    timeToComplete: '6-12 months',
    rating: 4.8
  },
  {
    id: '2',
    title: 'Sustainable Fashion Marketplace',
    description: 'Create an online marketplace connecting eco-conscious consumers with sustainable fashion brands.',
    category: 'E-commerce',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80',
    difficulty: 'Medium',
    estimatedEarnings: '$3,000 - $8,000/month',
    timeToComplete: '4-8 months',
    rating: 4.6
  },
  {
    id: '3',
    title: 'Personal Finance AI Assistant',
    description: 'Develop an AI-powered app that helps users manage budgets, track expenses, and make smart financial decisions.',
    category: 'Finance',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&q=80',
    difficulty: 'Medium',
    estimatedEarnings: '$2,500 - $7,000/month',
    timeToComplete: '3-6 months',
    rating: 4.7
  },
  {
    id: '4',
    title: 'Virtual Event Platform',
    description: 'Build a comprehensive platform for hosting virtual conferences, workshops, and networking events.',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=400&q=80',
    difficulty: 'Hard',
    estimatedEarnings: '$8,000 - $20,000/month',
    timeToComplete: '8-15 months',
    rating: 4.9
  },
  {
    id: '5',
    title: 'Health & Wellness Tracking App',
    description: 'Create a comprehensive app for tracking fitness, nutrition, mental health, and overall wellness goals.',
    category: 'Health',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80',
    difficulty: 'Medium',
    estimatedEarnings: '$4,000 - $10,000/month',
    timeToComplete: '5-9 months',
    rating: 4.5
  },
  {
    id: '6',
    title: 'Local Business Discovery Platform',
    description: 'Build a platform that helps users discover and support local businesses in their area.',
    category: 'Local Business',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=400&q=80',
    difficulty: 'Easy',
    estimatedEarnings: '$1,500 - $4,000/month',
    timeToComplete: '2-4 months',
    rating: 4.3
  },
  {
    id: '7',
    title: 'Educational Gaming Platform',
    description: 'Create an interactive platform that makes learning fun through gamified educational content.',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80',
    difficulty: 'Hard',
    estimatedEarnings: '$6,000 - $15,000/month',
    timeToComplete: '7-12 months',
    rating: 4.8
  },
  {
    id: '8',
    title: 'Pet Care Services Marketplace',
    description: 'Develop a platform connecting pet owners with trusted pet sitters, walkers, and groomers.',
    category: 'Pet Care',
    image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=400&q=80',
    difficulty: 'Medium',
    estimatedEarnings: '$2,000 - $6,000/month',
    timeToComplete: '3-6 months',
    rating: 4.4
  }
];

const categories = ['All', 'Technology', 'E-commerce', 'Finance', 'Events', 'Health', 'Local Business', 'Education', 'Pet Care'];

export default function ExploreIdeas() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { playClick } = useSound();

  const filteredIdeas = selectedCategory === 'All' 
    ? ideas 
    : ideas.filter(idea => idea.category === selectedCategory);

  const handleCategoryClick = (category: string) => {
    playClick();
    setSelectedCategory(category);
  };

  const handleIdeaClick = () => {
    playClick();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mr-4 animate-bounce-slow">
                <Lightbulb className="w-8 h-8 text-yellow-300" />
              </div>
              <h1 className="text-5xl font-bold">
                Explore <span className="text-yellow-300">AI Ideas</span>
              </h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Discover innovative business ideas generated by AI. From tech startups to local businesses, 
              find your next profitable venture with our curated collection of opportunities.
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

        {/* Ideas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredIdeas.map((idea, index) => (
            <div
              key={idea.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 idea-card cursor-pointer overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={handleIdeaClick}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={idea.image}
                  alt={idea.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(idea.difficulty)}`}>
                    {idea.difficulty}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700">{idea.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    {idea.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {idea.title}
                </h3>
                
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {idea.description}
                </p>

                {/* Stats */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <TrendingUp className="w-4 h-4" />
                      <span>Earnings</span>
                    </div>
                    <span className="font-semibold text-green-600">{idea.estimatedEarnings}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Duration</span>
                    </div>
                    <span className="font-semibold text-blue-600">{idea.timeToComplete}</span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playClick();
                  }}
                  className="w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Choose an idea that excites you and start building your future. 
              Every successful business started with a great idea.
            </p>
            <Link
              to="/explore-ai-tools"
              onClick={() => playClick()}
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-2xl hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Lightbulb className="w-5 h-5 mr-3" />
              Explore AI Tools
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
