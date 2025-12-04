import React, { useState, useRef, useEffect } from 'react';
import { X, Key, User, Mail, Shield, UserPlus, Eye, EyeOff, Phone, Building, Check, ChevronUp, ChevronDown } from 'lucide-react';

const AddUserForm = ({ onClose, onAddUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'Sales Executive',
    status: 'active'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);

  const formContainerRef = useRef(null);
  const sectionsRef = useRef([]);

  const scrollToSection = (index) => {
    if (sectionsRef.current[index]) {
      sectionsRef.current[index].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      setCurrentSection(index);
    }
  };

  const scrollToTop = () => {
    if (formContainerRef.current) {
      formContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToBottom = () => {
    if (formContainerRef.current) {
      formContainerRef.current.scrollTo({ 
        top: formContainerRef.current.scrollHeight, 
        behavior: 'smooth' 
      });
    }
  };

  const handleScroll = () => {
    if (!formContainerRef.current) return;

    const container = formContainerRef.current;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;

    // Show/hide scroll to top button
    setShowScrollTop(scrollTop > 100);

    // Show/hide scroll to bottom button
    setShowScrollBottom(scrollTop + clientHeight < scrollHeight - 100);

    // Update current section based on scroll position
    const sectionElements = sectionsRef.current;
    let current = 0;
    
    for (let i = 0; i < sectionElements.length; i++) {
      const element = sectionElements[i];
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 150) {
          current = i;
        }
      }
    }
    setCurrentSection(current);
  };

  useEffect(() => {
    const container = formContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.phone && !/^[\d\s\-\+\(\)]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      await addUser(formData);
      onAddUser(formData);
      setFormData({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: 'Sales Executive',
        status: 'active'
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const sections = [
    { id: 'personal', title: 'Personal Info', icon: User },
    { id: 'account', title: 'Account Info', icon: Shield },
    { id: 'role', title: 'Role & Status', icon: Building },
  ];

  const roles = [
    { value: 'Sales Executive', label: 'Sales Executive', color: 'bg-blue-100 text-blue-700' },
    { value: 'Team Lead', label: 'Team Lead', color: 'bg-purple-100 text-purple-700' },
    { value: 'Manager', label: 'Manager', color: 'bg-green-100 text-green-700' },
  ];

  const statuses = [
    { value: 'active', label: 'Active', color: 'text-green-600' },
    { value: 'inactive', label: 'Inactive', color: 'text-gray-600' },
  ];

  const addUser = async (userData) => {
  try {
    const res = await fetch("http://localhost:5000/api/users/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    console.log(data);

    if (data.success) {
      alert("User added successfully!");
    } else {
      alert("Failed to add user");
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};


  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl flex overflow-hidden max-h-[90vh]">
        {/* Sidebar Navigation */}
        <div className="w-64 border-r border-gray-100 bg-gray-50 p-6 flex flex-col">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Add New User</h3>
                <p className="text-sm text-gray-500">Complete all sections</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full mt-4 px-4 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-all duration-200"
            >
              Cancel
            </button>
          </div>

          {/* Progress Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Form Sections</h4>
            {sections.map((section, index) => {
              const Icon = section.icon;
              const isActive = currentSection === index;
              const isCompleted = index < currentSection;
              
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(index)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-white border border-blue-200 shadow-sm'
                      : isCompleted
                      ? 'bg-white/50 hover:bg-white'
                      : 'hover:bg-white'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isActive 
                      ? 'bg-blue-100 text-blue-600' 
                      : isCompleted
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${
                        isActive ? 'text-blue-700' : isCompleted ? 'text-green-700' : 'text-gray-600'
                      }`}>
                        {section.title}
                      </span>
                      {isCompleted && (
                        <Check className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-300 ${
                            isActive 
                              ? 'w-8/12 bg-blue-500'
                              : isCompleted
                              ? 'w-full bg-green-500'
                              : 'w-4/12 bg-gray-300'
                          }`}
                        />
                      </div>
                      <span className="text-xs text-gray-500">
                        {isActive ? 'In progress' : isCompleted ? 'Completed' : 'Not started'}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Scroll Controls */}
          <div className="mt-auto pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-gray-700">Scroll Navigation</span>
              <div className="flex gap-1">
                <button
                  onClick={scrollToTop}
                  className={`p-2 text-gray-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all duration-200 ${
                    !showScrollTop && 'opacity-50 cursor-not-allowed'
                  }`}
                  disabled={!showScrollTop}
                  title="Scroll to top"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  onClick={scrollToBottom}
                  className={`p-2 text-gray-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all duration-200 ${
                    !showScrollBottom && 'opacity-50 cursor-not-allowed'
                  }`}
                  disabled={!showScrollBottom}
                  title="Scroll to bottom"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              form="addUserForm"
              disabled={!formData.name || !formData.email || !formData.password}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              Create User
            </button>
          </div>
        </div>

        {/* Main Form Content */}
        <div className="flex-1 flex flex-col">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">New User Details</h3>
              <p className="text-sm text-gray-500 mt-1">Fill in all required fields (*)</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-xl transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <form 
            id="addUserForm"
            onSubmit={handleSubmit} 
            className="flex-1 overflow-hidden"
          >
            <div 
              ref={formContainerRef}
              className="h-full overflow-y-auto p-6 scroll-smooth"
            >
              <div className="space-y-8">
                {/* Section 1: Personal Information */}
                <div 
                  ref={el => sectionsRef.current[0] = el}
                  id="personal-section"
                  className="scroll-mt-6"
                >
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">Personal Information</h4>
                    </div>
                    
                    <div className="space-y-5">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                          {formData.name && !errors.name && formData.name.length >= 2 && (
                            <Check className="w-4 h-4 text-green-500 ml-auto" />
                          )}
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 pl-12 border ${
                              errors.name ? 'border-red-300' : 'border-gray-300'
                            } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                            placeholder="John Doe"
                          />
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                        {errors.name && (
                          <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                          {formData.email && !errors.email && (
                            <Check className="w-4 h-4 text-green-500 ml-auto" />
                          )}
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 pl-12 border ${
                              errors.email ? 'border-red-300' : 'border-gray-300'
                            } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                            placeholder="john@company.com"
                          />
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                        {errors.email && (
                          <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 pl-12 border ${
                              errors.phone ? 'border-red-300' : 'border-gray-300'
                            } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                            placeholder="+91 98765 43210"
                          />
                          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                        {errors.phone && (
                          <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Account Information */}
                <div 
                  ref={el => sectionsRef.current[1] = el}
                  id="account-section"
                  className="scroll-mt-6"
                >
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-purple-600" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">Account Information</h4>
                    </div>
                    
                    <div className="space-y-5">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          Password *
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 pl-12 pr-12 border ${
                              errors.password ? 'border-red-300' : 'border-gray-300'
                            } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                            placeholder="••••••••"
                          />
                          <Key className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                        )}
                        
                        {/* Password Strength Meter */}
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-600">Password strength:</span>
                            <span className={`text-xs font-medium ${
                              formData.password.length === 0 
                                ? 'text-gray-500'
                                : formData.password.length < 6
                                ? 'text-red-500'
                                : formData.password.length < 8
                                ? 'text-yellow-500'
                                : 'text-green-500'
                            }`}>
                              {formData.password.length === 0 ? 'None' :
                               formData.password.length < 6 ? 'Weak' :
                               formData.password.length < 8 ? 'Medium' : 'Strong'}
                            </span>
                          </div>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4].map((i) => (
                              <div
                                key={i}
                                className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                                  formData.password.length >= i * 2
                                    ? formData.password.length < 6
                                      ? 'bg-red-400'
                                      : formData.password.length < 8
                                      ? 'bg-yellow-400'
                                      : 'bg-green-500'
                                    : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          Department
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            placeholder="Sales / Marketing / Support"
                          />
                          <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>

                {/* Section 3: Role & Status */}
                <div 
                  ref={el => sectionsRef.current[2] = el}
                  id="role-section"
                  className="scroll-mt-6"
                >
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                        <Building className="w-4 h-4 text-green-600" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">Role & Permissions</h4>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-4">
                          User Role *
                        </label>
                        <div className="space-y-3">
                          {roles.map((role) => (
                            <label
                              key={role.value}
                              className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                                formData.role === role.value
                                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              <input
                                type="radio"
                                name="role"
                                value={role.value}
                                checked={formData.role === role.value}
                                onChange={handleChange}
                                className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                              />
                              <div className="flex-1">
                                <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${role.color}`}>
                                  {role.label}
                                </span>
                                <p className="text-xs text-gray-500 mt-2">
                                  {role.value === 'Sales Executive' && 'Can manage leads and contacts'}
                                  {role.value === 'Team Lead' && 'Can manage team and view reports'}
                                  {role.value === 'Manager' && 'Full access to all features'}
                                  {role.value === 'Admin' && 'Full system access and settings'}
                                </p>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-4">
                          Account Status *
                        </label>
                        <div className="space-y-3">
                          {statuses.map((status) => (
                            <label
                              key={status.value}
                              className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                                formData.status === status.value
                                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              <input
                                type="radio"
                                name="status"
                                value={status.value}
                                checked={formData.status === status.value}
                                onChange={handleChange}
                                className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <div className={`w-3 h-3 rounded-full ${
                                    status.value === 'active' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                                  }`} />
                                  <span className={`text-sm font-medium ${status.color}`}>
                                    {status.label}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                  {status.value === 'active' && 'User can login and access the system'}
                                  {status.value === 'inactive' && 'User cannot login to the system'}
                                </p>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Save Button */}
                <div className="sticky bottom-0 bg-white py-4 border-t border-gray-100">
                  <button
                    type="submit"
                    disabled={!formData.name || !formData.email || !formData.password}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <UserPlus className="w-5 h-5" />
                    Create User Account
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .scroll-smooth {
          scroll-behavior: smooth;
        }
        
        .scroll-smooth::-webkit-scrollbar {
          width: 8px;
        }
        
        .scroll-smooth::-webkit-scrollbar-track {
          background: #f8fafc;
          border-radius: 4px;
        }
        
        .scroll-smooth::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        
        .scroll-smooth::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        
        .sticky {
          position: sticky;
          backdrop-filter: blur(8px);
          background: rgba(255, 255, 255, 0.95);
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AddUserForm;