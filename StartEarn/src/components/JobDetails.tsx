import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, DollarSign, Building, Users, Share2, Bookmark, MessageCircle } from 'lucide-react';

export default function JobDetails() {
  const { id } = useParams();

  // Mock job data - in real app, this would be fetched based on the ID
  const job = {
    id: id,
    title: 'Senior React Developer',
    company: 'TechCorp India',
    location: 'Mumbai, Maharashtra',
    type: 'Full-time',
    salary: '₹8,00,000 - ₹12,00,000',
    postedTime: '2 hours ago',
    description: `We are looking for a Senior React Developer to join our dynamic team. You will be responsible for developing and maintaining web applications using React.js and related technologies.

Key Responsibilities:
• Develop new user-facing features using React.js
• Build reusable components and front-end libraries
• Translate designs and wireframes into high-quality code
• Optimize components for maximum performance
• Collaborate with team members and stakeholders

Requirements:
• 3+ years of experience with React.js
• Strong proficiency in JavaScript, HTML, CSS
• Experience with Redux or similar state management
• Knowledge of modern build tools and workflows
• Excellent problem-solving skills`,
    skills: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Redux', 'JavaScript'],
    logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100',
    companySize: '50-100 employees',
    industry: 'Technology',
    benefits: ['Health Insurance', 'Flexible Hours', 'Remote Work', 'Learning Budget'],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Link>
          
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <img
                src={job.logo}
                alt={job.company}
                className="w-16 h-16 rounded-lg object-cover border border-gray-200"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                <p className="text-xl text-gray-600 font-medium mb-4">{job.company}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {job.salary}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {job.postedTime}
                  </div>
                  <div className="flex items-center">
                    <Building className="w-4 h-4 mr-1" />
                    {job.type}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200" aria-label="Share job">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200" aria-label="Save job">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
              <div className="prose prose-gray max-w-none">
                <p className="whitespace-pre-line text-gray-600 leading-relaxed">
                  {job.description}
                </p>
              </div>
            </div>

            {/* Required Skills */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-3">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits & Perks</h2>
              <div className="grid grid-cols-2 gap-4">
                {job.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-6">
              <div className="space-y-4">
                <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 shadow-md hover:shadow-lg">
                  Apply Now
                </button>
                
                <button className="w-full py-3 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message Recruiter
                </button>
                
                <button className="w-full py-3 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save Job
                </button>
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">About {job.company}</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Industry</span>
                  <span className="font-medium text-gray-900">{job.industry}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Company Size</span>
                  <span className="font-medium text-gray-900">{job.companySize}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium text-gray-900">{job.location}</span>
                </div>
              </div>
            </div>

            {/* Similar Jobs */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Similar Jobs</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                  <h4 className="font-semibold text-gray-900 mb-1">Frontend Developer</h4>
                  <p className="text-sm text-gray-600 mb-2">WebTech Solutions</p>
                  <p className="text-sm text-blue-600 font-medium">₹6,00,000 - ₹9,00,000</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                  <h4 className="font-semibold text-gray-900 mb-1">React Native Developer</h4>
                  <p className="text-sm text-gray-600 mb-2">MobileFirst Inc</p>
                  <p className="text-sm text-blue-600 font-medium">₹7,00,000 - ₹11,00,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}