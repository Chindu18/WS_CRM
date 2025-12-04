// import { useState } from "react";
// import { X, Paperclip, Send, User, FileText } from "lucide-react";
// import Popup from "../../../../commonpopup/popup"; // ✅ change path as per your project

// export default function EmailModal({ isOpen, onClose }) {
//   const [formData, setFormData] = useState({
//     template: "",
//     to: "",
//     subject: "",
//     message: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [isSending, setIsSending] = useState(false);

//   // ✅ Popup state
//   const [popup, setPopup] = useState({
//     open: false,
//     type: "success",
//     title: "",
//     message: "",
//   });

//   const openPopup = (type, title, message) =>
//     setPopup({ open: true, type, title, message });

//   const closePopup = () =>
//     setPopup((p) => ({ ...p, open: false }));

//   if (!isOpen) return null;

//   const validate = () => {
//     const newErrors = {};

//     if (!formData.to.trim()) newErrors.to = "Recipient email is required";
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.to))
//       newErrors.to = "Invalid email format";

//     if (!formData.subject.trim()) newErrors.subject = "Subject is required";
//     if (!formData.message.trim()) newErrors.message = "Message cannot be empty";

//     setErrors(newErrors);

//     // ✅ if validation fails show popup
//     if (Object.keys(newErrors).length > 0) {
//       openPopup(
//         "failure",
//         "Validation Error",
//         "Please fix the highlighted fields before sending."
//       );
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setIsSending(true);

//     // ✅ waiting popup while sending
//     openPopup("waiting", "Please wait...", "Sending your email...");

//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 1500));

//     setIsSending(false);

//     // ✅ success popup after send
//     openPopup(
//       "success",
//       "Email Sent!",
//       "Your email was sent successfully."
//     );

//     // close modal after a short delay
//     setTimeout(() => {
//       closePopup();
//       onClose();
//       setFormData({ template: "", to: "", subject: "", message: "" });
//       setErrors({});
//     }, 800);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//     // Clear error when user starts typing
//     if (errors[e.target.name]) {
//       setErrors({ ...errors, [e.target.name]: "" });
//     }
//   };

//   return (
//     <>
//       {/* ✅ Reusable Popup */}
//       <Popup
//         open={popup.open}
//         type={popup.type}
//         title={popup.title}
//         message={popup.message}
//         onClose={closePopup}
//       />

//       <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
//         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-100">
//           {/* Enhanced Header */}
//           <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
//             <div className="flex justify-between items-center">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
//                   <Send className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-bold text-white">
//                     Compose Email
//                   </h2>
//                   <p className="text-blue-100 text-sm">
//                     Send a new email message
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={onClose}
//                 className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
//               >
//                 <X className="w-5 h-5 text-white hover:text-gray-200" />
//               </button>
//             </div>
//           </div>

//           <div className="p-6 max-h-[70vh] overflow-y-auto">
//             <form className="space-y-6" onSubmit={handleSubmit}>
//               {/* Template Selector */}
//               <div className="group">
//                 <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
//                   <FileText className="w-4 h-4 text-blue-500" />
//                   Email Template
//                 </label>
//                 <select
//                   name="template"
//                   value={formData.template}
//                   onChange={handleChange}
//                   className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white group-hover:border-gray-300"
//                 >
//                   <option value="">Choose a template (optional)</option>
//                   <option value="welcome">🎉 Welcome Template</option>
//                   <option value="followup">📧 Follow-Up Template</option>
//                   <option value="newsletter">📰 Newsletter Template</option>
//                 </select>
//               </div>

//               {/* Recipient Field */}
//               <div className="group">
//                 <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
//                   <User className="w-4 h-4 text-green-500" />
//                   To <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   name="to"
//                   value={formData.to}
//                   onChange={handleChange}
//                   placeholder="recipient@example.com"
//                   className={`w-full p-3 rounded-xl border-2 transition-all duration-200 bg-gray-50 hover:bg-white group-hover:border-gray-300
//                     ${
//                       errors.to
//                         ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
//                         : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
//                     }`}
//                 />
//                 {errors.to && (
//                   <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
//                     ⚠️ {errors.to}
//                   </p>
//                 )}
//               </div>

//               {/* Subject Field */}
//               <div className="group">
//                 <label className="text-sm font-semibold text-gray-700 mb-2 block">
//                   Subject <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   placeholder="Enter email subject..."
//                   className={`w-full p-3 rounded-xl border-2 transition-all duration-200 bg-gray-50 hover:bg-white group-hover:border-gray-300
//                     ${
//                       errors.subject
//                         ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
//                         : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
//                     }`}
//                 />
//                 {errors.subject && (
//                   <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
//                     ⚠️ {errors.subject}
//                   </p>
//                 )}
//               </div>

//               {/* Message Field */}
//               <div className="group">
//                 <label className="text-sm font-semibold text-gray-700 mb-2 block">
//                   Message <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   placeholder="Type your email message here..."
//                   rows="6"
//                   className={`w-full p-3 rounded-xl border-2 transition-all duration-200 bg-gray-50 hover:bg-white group-hover:border-gray-300 resize-none
//                     ${
//                       errors.message
//                         ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
//                         : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
//                     }`}
//                 />
//                 {errors.message && (
//                   <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
//                     ⚠️ {errors.message}
//                   </p>
//                 )}
//                 <div className="flex justify-between items-center mt-2">
//                   <span className="text-xs text-gray-500">
//                     {formData.message.length} characters
//                   </span>
//                   <span className="text-xs text-gray-500">
//                     ⚡ Write with clarity and purpose
//                   </span>
//                 </div>
//               </div>

//               {/* Attachment Section */}
//               <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-blue-400 transition-colors duration-200">
//                 <button
//                   type="button"
//                   className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors duration-200 w-full justify-center group"
//                 >
//                   <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors duration-200">
//                     <Paperclip className="w-5 h-5 text-blue-500" />
//                   </div>
//                   <span className="font-medium">Add Attachment</span>
//                   <span className="text-gray-400 text-sm">(Max 25MB)</span>
//                 </button>
//                 <p className="text-center text-xs text-gray-500 mt-2">
//                   Supported formats: PDF, DOC, JPG, PNG
//                 </p>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 active:scale-95 transition-all duration-200 font-medium"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   disabled={isSending}
//                   className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 active:scale-95 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
//                 >
//                   {isSending ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       Sending...
//                     </>
//                   ) : (
//                     <>
//                       <Send className="w-4 h-4" />
//                       Send Email
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


import { useState, useEffect } from "react";
import { X, Paperclip, Send, User, FileText, Search, Sparkles } from "lucide-react";

export default function EmailModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    template: "",
    to: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [showContactList, setShowContactList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [previousTemplate, setPreviousTemplate] = useState("");

  // Mock contact database
  const mockContacts = [
    {
      id: 1,
      email: 'john.doe@example.com',
      name: 'John Doe',
      company: 'TechCorp Inc.',
    },
    {
      id: 2,
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      company: 'DesignStudio LLC',
    },
    {
      id: 3,
      email: 'alex.wong@example.com',
      name: 'Alex Wong',
      company: 'FinancePro Ltd',
    },
    {
      id: 4,
      email: 'sarah.miller@example.com',
      name: 'Sarah Miller',
      company: 'HealthPlus Corp',
    },
  ];

  // Email templates
  const emailTemplates = {
    welcome: {
      subject: "Welcome to Our Platform! 🎉",
      message: `Dear [Name],\n\nThank you for signing up with NovaTrack CRM. We're excited to help you manage leads, automate tasks, and grow your business faster.
      \n\n      
      Login to your dashboard:
👉 https://novatrackcrm.com/login
If you need any support, feel free to reach out.
Warm regards,
Aadhira
NovaTrack CRM`
    },
    followup: {
      subject: "Following Up on Our Conversation 📧",
      message: "Hi [Name],\n\nI wanted to follow up on our conversation.\n\nLooking forward to hearing from you!\n\nBest regards,\n[Your Name]"
    },
    newsletter: {
      subject: "Monthly Newsletter - [Month] 📰",
      message: "Dear [Name],\n\nHere's your monthly update.\n\nBest regards,\n[Your Name]"
    }
  };

  if (!isOpen) return null;

  // Filter contacts based on search
  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

 const validate = () => {
  const newErrors = {};

  // Email validation
  if (!formData.to.trim()) {
    newErrors.to = "Recipient email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.to)) {
    newErrors.to = "Invalid email format";
  } else if (formData.to !== formData.to.toLowerCase()) {
    newErrors.to = "Email must be in lowercase only";
  }
  
  // Subject validation
  if (!formData.subject.trim()) {
    newErrors.subject = "Subject is required";
  }
  
  // Message validation
  if (!formData.message.trim()) {
    newErrors.message = "Message cannot be empty";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  setIsSending(true);
  await new Promise(resolve => setTimeout(resolve, 1500));
  setIsSending(false);
  console.log(formData);
  onClose();
  setFormData({
    template: "",
    to: "",
    subject: "",
    message: "",
  });  // Fixed: removed extra closing brace
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }

    // Show contact list when typing in "to" field
    if (name === 'to' && value.length > 0) {
      setShowContactList(true);
      setSearchQuery(value);
    }
  };

  const handleTemplateChange = (e) => {
    const newTemplate = e.target.value;

    // If selecting a new template (not empty)
    if (newTemplate) {
      const { subject, message } = emailTemplates[newTemplate];

      // Replace [Name] placeholder with contact name if available
      let personalizedMessage = message;
      if (selectedContact) {
        personalizedMessage = message.replace(/\[Name\]/g, selectedContact.name);
      }

      setFormData(prev => ({
        ...prev,
        template: newTemplate,
        subject: subject,
        message: personalizedMessage
      }));
    } else {
      // If clearing template selection
      setFormData(prev => ({
        ...prev,
        template: "",
        // Keep user's custom subject and message
      }));
    }

    setPreviousTemplate(newTemplate);
  };

  const handleContactSelect = (contact) => {
    let personalizedMessage = formData.message || "";

    // If using a template, replace [Name] placeholder
    if (formData.template && emailTemplates[formData.template]) {
      personalizedMessage = emailTemplates[formData.template].message.replace(/\[Name\]/g, contact.name);
    } else if (!formData.message) {
      // Default message if no template selected
      personalizedMessage = `Dear ${contact.name},\n\n\n\nBest regards,\n[Your Name]`;
    } else {
      // Replace any [Name] placeholders in existing message
      personalizedMessage = formData.message.replace(/\[Name\]/g, contact.name);
    }

    setFormData({
      template: formData.template,
      to: contact.email,
      subject: formData.subject || `Email for ${contact.name}`,
      message: personalizedMessage
    });
    setSelectedContact(contact);
    setShowContactList(false);
    setSearchQuery("");
  };

  // Clear contact selection and reset message if needed
  const clearContactSelection = () => {
    setSelectedContact(null);

    // If using a template, reset message to original template
    if (formData.template && emailTemplates[formData.template]) {
      setFormData(prev => ({
        ...prev,
        message: emailTemplates[formData.template].message
      }));
    }
  };


  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Send className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Compose Email</h2>
                <p className="text-blue-100 text-sm">Send a new email message</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5 text-white hover:text-gray-200" />
            </button>
          </div>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <form className="space-y-6" autoComplete="on" onSubmit={handleSubmit}>
            {/* Template Selector */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-4 h-4 text-blue-500" />
                Email Template
              </label>
              <div className="flex items-center gap-2">
                <select
                  name="template"
                  value={formData.template}
                  onChange={handleTemplateChange}
                  className="flex-1 p-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white group-hover:border-gray-300"
                >
                  <option value="">Choose a template (optional)</option>
                  <option value="welcome">🎉 Welcome Template</option>
                  <option value="followup">📧 Follow-Up Template</option>
                  <option value="newsletter">📰 Newsletter Template</option>
                </select>
                {formData.template && (
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, template: "" }));
                    }}
                    className="p-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Clear template"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Selected Contact Badge */}
            {selectedContact && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-xl border border-blue-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-blue-300">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{selectedContact.name}</p>
                      <p className="text-sm text-gray-600">{selectedContact.email}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={clearContactSelection}
                    className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-200 rounded-full transition-colors"
                    title="Clear contact"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Recipient Field with Auto-fill */}
            <div className="group relative contact-list-container">
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <User className="w-4 h-4 text-green-500" />
                  To <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowContactList(!showContactList)}
                  className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  {showContactList ? 'Hide Contacts' : 'Auto-fill'}
                </button>
              </div>
              <input
                name="to"
                value={formData.to}
                onChange={handleChange}
                placeholder="recipient@example.com"
                className={`w-full p-3 rounded-xl border-2 transition-all duration-200 bg-gray-50 hover:bg-white group-hover:border-gray-300
                  ${errors.to ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"}`}
              />

              {showContactList && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
                  {/* Search within contacts */}
                  <div className="p-3 border-b border-gray-100">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search contacts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Contact list */}
                  <div className="p-2">
                    {filteredContacts.length > 0 ? (
                      filteredContacts.map(contact => (
                        <button
                          key={contact.id}
                          type="button"
                          onClick={() => handleContactSelect(contact)}
                          className={`w-full p-3 rounded-lg text-left hover:bg-blue-50 transition-colors flex items-center justify-between ${selectedContact?.id === contact.id ? 'bg-blue-50 border border-blue-200' : ''
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{contact.name}</p>
                              <p className="text-sm text-gray-600">{contact.email}</p>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {contact.company}
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        No contacts found
                      </div>
                    )}
                  </div>
                </div>
              )}

              {errors.to && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  ⚠️ {errors.to}
                </p>
              )}
            </div>

            {/* Subject Field */}
            <div className="group">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter email subject..."
                className={`w-full p-3 rounded-xl border-2 transition-all duration-200 bg-gray-50 hover:bg-white group-hover:border-gray-300
                  ${errors.subject ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"}`}
              />
              {errors.subject && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  ⚠️ {errors.subject}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div className="group">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your email message here..."
                rows="6"
                className={`w-full p-3 rounded-xl border-2 transition-all duration-200 bg-gray-50 hover:bg-white group-hover:border-gray-300 resize-none
                  ${errors.message ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"}`}
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  ⚠️ {errors.message}
                </p>
              )}
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">
                  {formData.message.length} characters
                </span>
                <span className="text-xs text-gray-500">
                  Using template: {formData.template ? formData.template : 'None'}
                </span>
              </div>
            </div>

            {/* Attachment Section */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-blue-400 transition-colors duration-200">
              <button
                type="button"
                className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors duration-200 w-full justify-center group"
              >
                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors duration-200">
                  <Paperclip className="w-5 h-5 text-blue-500" />
                </div>
                <span className="font-medium">Add Attachment</span>
                <span className="text-gray-400 text-sm">(Max 25MB)</span>
              </button>
              <p className="text-center text-xs text-gray-500 mt-2">
                Supported formats: PDF, DOC, JPG, PNG
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 active:scale-95 transition-all duration-200 font-medium"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSending}
                className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 active:scale-95 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Email
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}