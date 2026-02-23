import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowLeft, Send, ThumbsUp, MessageCircle, Heart, Users, Award } from 'lucide-react';
import { useSound } from '../lib/soundUtils';

interface BotRating {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

const mockBotRatings: BotRating[] = [
  {
    id: '1',
    name: 'AI Assistant Bot',
    avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    comment: 'StartEarn helped me find the perfect remote job! The AI-powered matching is incredible.',
    date: '2 days ago',
    helpful: 24
  },
  {
    id: '2',
    name: 'JobFinder Pro',
    avatar: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=100&q=80',
    rating: 4,
    comment: 'Great platform for both job seekers and recruiters. The real-time notifications are a game-changer.',
    date: '1 week ago',
    helpful: 18
  },
  {
    id: '3',
    name: 'CareerBot',
    avatar: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    comment: 'Found my dream job within 2 weeks! The interface is intuitive and the job recommendations are spot-on.',
    date: '3 days ago',
    helpful: 31
  },
  {
    id: '4',
    name: 'Talent Scout AI',
    avatar: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=100&q=80',
    rating: 4,
    comment: 'As a recruiter, I love how easy it is to find qualified candidates. The AI filtering saves so much time.',
    date: '5 days ago',
    helpful: 15
  },
  {
    id: '5',
    name: 'WorkMatch Bot',
    avatar: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    comment: 'The best job platform I\'ve used. Clean design, fast loading, and excellent customer support.',
    date: '1 day ago',
    helpful: 27
  }
];

export default function RatingPage() {
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { playClick, playSuccess } = useSound();

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userRating === 0) return;
    
    // Play success sound and simulate rating submission
    playSuccess();
    console.log('Rating submitted:', { rating: userRating, comment });
    setSubmitted(true);
  };

  const handleStarClick = (star: number) => {
    playClick();
    setUserRating(star);
  };

  const handleBackClick = () => {
    playClick();
  };

  const handleSubmitAnotherClick = () => {
    playClick();
    setSubmitted(false);
    setUserRating(0);
    setComment('');
  };

  const handleRateNowClick = () => {
    playClick();
    setSubmitted(false);
    setUserRating(0);
    setComment('');
    document.getElementById('comment')?.focus();
  };

  const renderStars = (rating: number, interactive = false, onStarClick?: (star: number) => void, onStarHover?: (star: number) => void) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? 'button' : undefined}
            onClick={interactive ? () => onStarClick?.(star) : undefined}
            onMouseEnter={interactive ? () => onStarHover?.(star) : undefined}
            onMouseLeave={interactive ? () => onStarHover?.(0) : undefined}
            className={`transition-all duration-200 ${
              interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
            }`}
            disabled={!interactive}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
          >
            <Star
              className={`w-6 h-6 ${
                star <= (interactive ? hoverRating || userRating : rating)
                  ? 'text-yellow-400 fill-current drop-shadow-sm'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const averageRating = mockBotRatings.reduce((acc, rating) => acc + rating.rating, 0) / mockBotRatings.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section with Full Width */}
      <div className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mr-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold">
                Rate <span className="text-yellow-300">StartEarn</span>
              </h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Share your experience and help us improve our platform. Your feedback drives our innovation!
            </p>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-center mb-3">
                  <Star className="w-8 h-8 text-yellow-300" />
                </div>
                <div className="text-3xl font-bold">{averageRating.toFixed(1)}</div>
                <div className="text-blue-100">Average Rating</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-center mb-3">
                  <Users className="w-8 h-8 text-blue-200" />
                </div>
                <div className="text-3xl font-bold">{mockBotRatings.length}</div>
                <div className="text-blue-100">Total Reviews</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-center mb-3">
                  <Award className="w-8 h-8 text-purple-200" />
                </div>
                <div className="text-3xl font-bold">98%</div>
                <div className="text-blue-100">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            to="/"
            onClick={handleBackClick}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Rating Form - Left Column */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Share Your Experience</h2>
                <p className="text-gray-600">Help us improve by sharing your thoughts</p>
              </div>
              
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ThumbsUp className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">Thank You!</h3>
                  <p className="text-gray-600 mb-6 text-lg">Your rating has been recorded successfully.</p>
                  <button
                    onClick={handleSubmitAnotherClick}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Submit Another Rating
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRatingSubmit} className="space-y-8">
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-4 text-center">
                      Rate your experience
                    </label>
                    <div className="flex items-center justify-center space-x-4">
                      {renderStars(
                        userRating,
                        true,
                        handleStarClick,
                        setHoverRating
                      )}
                      <span className="text-lg text-gray-600 font-medium">
                        {userRating > 0 && `${userRating} star${userRating > 1 ? 's' : ''}`}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="comment" className="block text-lg font-semibold text-gray-700 mb-4">
                      Tell us more (optional)
                    </label>
                    <textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={6}
                      className="w-full border-2 border-gray-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 resize-none text-lg"
                      placeholder="Share your thoughts about StartEarn, what you loved, and what we can improve..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={userRating === 0}
                    className="w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold text-lg rounded-2xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <Send className="w-5 h-5 mr-3" />
                    Submit Rating
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Reviews Section - Right Column */}
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What Others Are Saying</h2>
              <p className="text-gray-600 text-lg">Real feedback from our community</p>
            </div>
            
            <div className="space-y-6">
              {mockBotRatings.map((rating, index) => (
                <div 
                  key={rating.id} 
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={rating.avatar}
                      alt={rating.name}
                      className="w-14 h-14 rounded-full object-cover border-4 border-blue-100 shadow-md"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold text-gray-900">{rating.name}</h3>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {rating.date}
                        </span>
                      </div>
                      
                      <div className="mb-4">
                        {renderStars(rating.rating)}
                      </div>
                      
                      <p className="text-gray-700 mb-4 text-lg leading-relaxed">{rating.comment}</p>
                      
                      <div className="flex items-center space-x-6 text-sm">
                        <button 
                          onClick={() => playClick()}
                          className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors duration-200 font-medium"
                        >
                          <ThumbsUp className="w-4 h-4" />
                          <span>Helpful ({rating.helpful})</span>
                        </button>
                        <button 
                          onClick={() => playClick()}
                          className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors duration-200 font-medium"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Reply</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Share Your Experience?</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Your feedback helps us create better experiences for everyone in our community.
          </p>
          <button
            onClick={handleRateNowClick}
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-2xl hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Heart className="w-5 h-5 mr-3" />
            Rate StartEarn Now
          </button>
        </div>
      </div>
    </div>
  );
}

