import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Camera, Save, X, Edit3, Mail, Phone, MapPin, Building, GraduationCap,
  Briefcase, Globe, Github, Linkedin, FileText, ChevronRight, Shield,
  User, Star, Calendar, CheckCircle, AlertCircle, LogOut, Settings
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

type ActiveSection = 'personal' | 'education' | 'skills' | 'social' | 'settings';

export default function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeSection, setActiveSection] = useState<ActiveSection>('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
    company: user?.company || '',
    experience: user?.experience || '',
    college: user?.college || '',
    education: user?.education || '',
    graduation_year: user?.graduation_year || '',
    skills: user?.skills?.join(', ') || '',
    linkedin: user?.linkedin || '',
    github: user?.github || '',
    portfolio: user?.portfolio || '',
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Not Logged In</h2>
          <p className="text-gray-600 mb-4">Please sign in to view your profile.</p>
          <Link to="/auth" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    setSaving(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await updateProfile({
        full_name: formData.full_name,
        phone: formData.phone,
        location: formData.location,
        bio: formData.bio,
        company: formData.company,
        experience: formData.experience,
        college: formData.college,
        education: formData.education,
        graduation_year: formData.graduation_year,
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        linkedin: formData.linkedin,
        github: formData.github,
        portfolio: formData.portfolio,
      });

      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      full_name: user?.full_name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      location: user?.location || '',
      bio: user?.bio || '',
      company: user?.company || '',
      experience: user?.experience || '',
      college: user?.college || '',
      education: user?.education || '',
      graduation_year: user?.graduation_year || '',
      skills: user?.skills?.join(', ') || '',
      linkedin: user?.linkedin || '',
      github: user?.github || '',
      portfolio: user?.portfolio || '',
    });
    setIsEditing(false);
    setErrorMessage('');
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert to base64 data URL for local preview
    const reader = new FileReader();
    reader.onloadend = async () => {
      const dataUrl = reader.result as string;
      try {
        await updateProfile({ avatar_url: dataUrl });
        setSuccessMessage('Profile picture updated!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        setErrorMessage('Failed to update profile picture.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const profileCompletion = (() => {
    let completed = 0;
    const total = 10;
    if (user.full_name) completed++;
    if (user.email) completed++;
    if (user.phone) completed++;
    if (user.location) completed++;
    if (user.bio) completed++;
    if (user.skills && user.skills.length > 0) completed++;
    if (user.college || user.company) completed++;
    if (user.education) completed++;
    if (user.linkedin || user.github) completed++;
    if (user.avatar_url && !user.avatar_url.includes('dicebear')) completed++;
    return Math.round((completed / total) * 100);
  })();

  const getRoleBadge = () => {
    switch (user.role) {
      case 'recruiter': return { label: 'Recruiter', color: 'bg-purple-100 text-purple-700', icon: Briefcase };
      case 'student': return { label: 'Student', color: 'bg-green-100 text-green-700', icon: GraduationCap };
      case 'employee': return { label: 'Employee', color: 'bg-blue-100 text-blue-700', icon: Briefcase };
      default: return { label: 'User', color: 'bg-gray-100 text-gray-700', icon: User };
    }
  };

  const roleBadge = getRoleBadge();
  const RoleIcon = roleBadge.icon;

  const sidebarItems: { id: ActiveSection; label: string; icon: any }[] = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'education', label: 'Education & Work', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Star },
    { id: 'social', label: 'Social Links', icon: Globe },
    { id: 'settings', label: 'Account Settings', icon: Settings },
  ];

  const renderField = (label: string, field: keyof typeof formData, placeholder: string, icon: React.ReactNode, type: string = 'text', disabled: boolean = false) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
        <input
          type={type}
          value={formData[field]}
          onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
          disabled={!isEditing || disabled}
          placeholder={placeholder}
          className={'w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 ' +
            (isEditing && !disabled
              ? 'border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              : 'border-gray-200 bg-gray-50 text-gray-700 cursor-default')
          }
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Profile Header / Cover */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-20 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
              {/* Avatar */}
              <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                <img
                  src={user.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.email)}`}
                  alt="Profile"
                  className="w-36 h-36 rounded-2xl border-4 border-white shadow-xl object-cover bg-white"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.email)}`;
                  }}
                />
                <div className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Camera className="w-6 h-6 mx-auto mb-1" />
                    <span className="text-xs font-medium">Change Photo</span>
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>

              {/* Name & Role */}
              <div className="mt-4 sm:mt-0 flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-white drop-shadow-sm">{user.full_name}</h1>
                    <p className="text-gray-500 font-medium mt-1">{user.email}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <span className={'inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium rounded-full shadow-sm ' + roleBadge.color}>
                        <RoleIcon className="w-3.5 h-3.5" />
                        {roleBadge.label}
                      </span>
                      {user.location && (
                        <span className="inline-flex items-center text-sm text-gray-500 font-medium">
                          <MapPin className="w-3.5 h-3.5 mr-1" /> {user.location}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleCancel}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors duration-200"
                        >
                          <X className="w-4 h-4 mr-1.5" /> Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          disabled={saving}
                          className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
                        >
                          {saving ? (
                            <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" /> Saving...</>
                          ) : (
                            <><Save className="w-4 h-4 mr-1.5" /> Save Changes</>
                          )}
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        <Edit3 className="w-4 h-4 mr-1.5" /> Edit Profile
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success / Error Messages */}
      {successMessage && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 animate-fade-in">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">{successMessage}</span>
          </div>
        </div>
      )}
      {errorMessage && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">{errorMessage}</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Profile Completion */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Profile Strength</h3>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-500">Completion</span>
                <span className={'font-bold ' + (profileCompletion >= 80 ? 'text-green-600' : profileCompletion >= 50 ? 'text-yellow-600' : 'text-red-500')}>
                  {profileCompletion}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={'h-2.5 rounded-full transition-all duration-700 ' +
                    (profileCompletion >= 80 ? 'bg-green-500' : profileCompletion >= 50 ? 'bg-yellow-500' : 'bg-red-500')
                  }
                  style={{ width: profileCompletion + '%' }}
                ></div>
              </div>
              {profileCompletion < 100 && (
                <p className="text-xs text-gray-500 mt-2">Complete your profile to get better visibility.</p>
              )}
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={'w-full flex items-center justify-between px-5 py-3.5 text-left transition-all duration-200 border-l-4 ' +
                      (activeSection === item.id
                        ? 'bg-blue-50 border-blue-600 text-blue-700'
                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900')
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4.5 h-4.5" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>
                    <ChevronRight className={'w-4 h-4 transition-transform ' + (activeSection === item.id ? 'text-blue-500' : 'text-gray-400')} />
                  </button>
                );
              })}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Account Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> Joined</span>
                  <span className="text-gray-900 font-medium">
                    {user.created_at ? new Date(user.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : 'Recently'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 flex items-center gap-2"><Shield className="w-3.5 h-3.5" /> Account</span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

              {/* Personal Info */}
              {activeSection === 'personal' && (
                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage your personal details and contact information.</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    {renderField('Full Name', 'full_name', 'Your full name', <User className="w-4 h-4" />)}
                    {renderField('Email Address', 'email', 'you@example.com', <Mail className="w-4 h-4" />, 'email', true)}
                    {renderField('Phone Number', 'phone', '+91 98765 43210', <Phone className="w-4 h-4" />, 'tel')}
                    {renderField('Location', 'location', 'Mumbai, India', <MapPin className="w-4 h-4" />)}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">About Me</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Tell recruiters about yourself — your passions, goals, and achievements..."
                      rows={4}
                      className={'w-full px-4 py-3 rounded-xl border transition-all duration-200 resize-none ' +
                        (isEditing
                          ? 'border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                          : 'border-gray-200 bg-gray-50 text-gray-700 cursor-default')
                      }
                    />
                  </div>
                </div>
              )}

              {/* Education & Work */}
              {activeSection === 'education' && (
                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h2 className="text-xl font-bold text-gray-900">Education & Work Experience</h2>
                    <p className="text-sm text-gray-500 mt-1">Add your educational background and work experience.</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-blue-600" /> Education
                    </h3>
                    <div className="grid md:grid-cols-2 gap-5">
                      {renderField('College / University', 'college', 'e.g. IIT Bombay', <GraduationCap className="w-4 h-4" />)}
                      {renderField('Degree / Course', 'education', 'e.g. B.Tech Computer Science', <FileText className="w-4 h-4" />)}
                      {renderField('Graduation Year', 'graduation_year', 'e.g. 2025', <Calendar className="w-4 h-4" />)}
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-6">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-purple-600" /> Work Experience
                    </h3>
                    <div className="grid md:grid-cols-2 gap-5">
                      {renderField('Current Company', 'company', 'e.g. Google', <Building className="w-4 h-4" />)}
                      {renderField('Experience', 'experience', 'e.g. 2 years', <Briefcase className="w-4 h-4" />)}
                    </div>
                  </div>
                </div>
              )}

              {/* Skills */}
              {activeSection === 'skills' && (
                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h2 className="text-xl font-bold text-gray-900">Skills</h2>
                    <p className="text-sm text-gray-500 mt-1">Add your skills to help recruiters find you based on expertise.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Skills</label>
                    <p className="text-xs text-gray-400 mb-2">Separate skills with commas (e.g. React, Python, UI Design)</p>
                    <textarea
                      value={formData.skills}
                      onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                      disabled={!isEditing}
                      placeholder="React, TypeScript, Node.js, Python, Figma..."
                      rows={3}
                      className={'w-full px-4 py-3 rounded-xl border transition-all duration-200 resize-none ' +
                        (isEditing
                          ? 'border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                          : 'border-gray-200 bg-gray-50 text-gray-700 cursor-default')
                      }
                    />
                  </div>

                  {/* Skills Display */}
                  {user.skills && user.skills.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Added Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {user.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-xl text-sm font-medium border border-blue-100"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {(!user.skills || user.skills.length === 0) && !isEditing && (
                    <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl">
                      <Star className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 mb-3">No skills added yet.</p>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-blue-600 font-medium hover:underline text-sm"
                      >
                        + Add your skills
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Social Links */}
              {activeSection === 'social' && (
                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h2 className="text-xl font-bold text-gray-900">Social & Professional Links</h2>
                    <p className="text-sm text-gray-500 mt-1">Connect your profiles to boost your visibility.</p>
                  </div>

                  <div className="space-y-5">
                    {renderField('LinkedIn Profile', 'linkedin', 'https://linkedin.com/in/yourname', <Linkedin className="w-4 h-4" />)}
                    {renderField('GitHub Profile', 'github', 'https://github.com/yourname', <Github className="w-4 h-4" />)}
                    {renderField('Portfolio Website', 'portfolio', 'https://yourportfolio.com', <Globe className="w-4 h-4" />)}
                  </div>

                  {/* Resume Section */}
                  <div className="border-t border-gray-100 pt-6">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-green-600" /> Resume
                    </h3>
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-blue-300 hover:bg-blue-50/30 transition-all duration-200 cursor-pointer">
                      <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-600 font-medium mb-1">Upload your Resume</p>
                      <p className="text-sm text-gray-400">PDF, DOC up to 5MB</p>
                      <button className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        Choose File
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Account Settings */}
              {activeSection === 'settings' && (
                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage your account preferences and security.</p>
                  </div>

                  {/* Account Info */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Mail className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Email Address</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">Verified</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Shield className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Account Type</p>
                          <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Calendar className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Member Since</p>
                          <p className="text-sm text-gray-500">
                            {user.created_at ? new Date(user.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Recently'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="border-t border-gray-100 pt-6 space-y-3">
                    <Link
                      to="/pricing"
                      className="w-full flex items-center justify-between p-4 border border-blue-200 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-200 group"
                    >
                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-blue-900">Upgrade to Premium</p>
                          <p className="text-sm text-blue-600">Unlock all features and boost your profile</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 p-4 border border-red-200 bg-red-50 rounded-xl hover:bg-red-100 transition-colors duration-200 text-red-700"
                    >
                      <LogOut className="w-5 h-5" />
                      <div className="text-left">
                        <p className="font-medium">Sign Out</p>
                        <p className="text-sm text-red-500">Log out of your account</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}