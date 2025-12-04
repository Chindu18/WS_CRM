// import React, { useState, useEffect } from "react";
// import { X, User, Phone, Mail, Globe, Users, Star } from "lucide-react";

// const LeadForm = ({
//   isOpen,
//   onClose,
//   onSave,
//   editLead = null,
//   title = "Add New Lead",
//   description = "Enter the lead details below",
// }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     source: "",
//     priority: "",
//     assignedTo: "Unassigned",
//     tl: "Unassigned",
//   });
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     if (editLead) {
//       setFormData(editLead);
//     } else {
//       setFormData({
//         name: "",
//         phone: "",
//         email: "",
//         source: "",
//         priority: "",
//         assignedTo: "Unassigned",
//         tl: "Unassigned",
//       });
//     }
//     setErrors({});
//   }, [editLead, isOpen]);

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.name.trim()) newErrors.name = "Name is required";

//     if (!formData.phone.trim()) {
//       newErrors.phone = "Phone number is required";
//     } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
//       newErrors.phone = "Please enter a valid phone number";
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Please enter a valid email address";
//     }

//     if (!formData.source) newErrors.source = "Source is required";
//     if (!formData.priority) newErrors.priority = "Priority is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setIsSubmitting(true);
//     await new Promise((resolve) => setTimeout(resolve, 800));

//     const leadData = {
//       ...formData,
//       status:
//         formData.priority.charAt(0).toUpperCase() +
//         formData.priority.slice(1),
//       lastContact: "Just now",
//     };

//     if (editLead) leadData.id = editLead.id;

//     onSave(leadData, !!editLead);
//     setIsSubmitting(false);
//   };

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     if (errors[field]) {
//       setErrors((prev) => ({ ...prev, [field]: "" }));
//     }
//   };

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case "hot":
//         return "text-red-500 bg-red-50 border-red-200";
//       case "warm":
//         return "text-orange-500 bg-orange-50 border-orange-200";
//       case "cold":
//         return "text-blue-500 bg-blue-50 border-blue-200";
//       default:
//         return "text-gray-500 bg-gray-50 border-gray-200";
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn">
//       {/* ✅ Responsive modal sizing */}
//       <div className="bg-white rounded-2xl shadow-2xl w-[95vw] sm:max-w-md max-h-[90vh] overflow-y-auto transform animate-slideUp">
//         {/* Header */}
//         <div className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-2xl">
//           <div className="flex items-start justify-between gap-3">
//             <div className="flex items-start space-x-3">
//               <div className="p-2 bg-white rounded-xl shadow-sm shrink-0">
//                 <User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
//               </div>
//               <div>
//                 <h2 className="text-lg sm:text-xl font-bold text-gray-900">
//                   {title}
//                 </h2>
//                 <p className="text-gray-600 text-xs sm:text-sm mt-1">
//                   {description}
//                 </p>
//               </div>
//             </div>

//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-white rounded-xl transition-all duration-200 hover:scale-110"
//             >
//               <X className="w-5 h-5 text-gray-500" />
//             </button>
//           </div>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} noValidate>
//           <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
//             {/* Name */}
//             <div className="space-y-2">
//               <label className="flex items-center text-sm font-semibold text-gray-700">
//                 <User className="w-4 h-4 mr-2 text-blue-500" />
//                 Full Name *
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter full name"
//                 value={formData.name}
//                 onChange={(e) => handleChange("name", e.target.value)}
//                 className={`w-full p-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-sm sm:text-base ${
//                   errors.name
//                     ? "border-red-300 bg-red-50"
//                     : "border-gray-200 hover:border-gray-300"
//                 }`}
//               />
//               {errors.name && (
//                 <p className="text-red-500 text-xs mt-1">⚠️ {errors.name}</p>
//               )}
//             </div>

//             {/* Phone */}
//             <div className="space-y-2">
//               <label className="flex items-center text-sm font-semibold text-gray-700">
//                 <Phone className="w-4 h-4 mr-2 text-green-500" />
//                 Phone Number *
//               </label>
//               <input
//                 type="tel"
//                 placeholder="+91 98765 43210"
//                 value={formData.phone}
//                 onChange={(e) => handleChange("phone", e.target.value)}
//                 className={`w-full p-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-sm sm:text-base ${
//                   errors.phone
//                     ? "border-red-300 bg-red-50"
//                     : "border-gray-200 hover:border-gray-300"
//                 }`}
//               />
//               {errors.phone && (
//                 <p className="text-red-500 text-xs mt-1">⚠️ {errors.phone}</p>
//               )}
//             </div>

//             {/* Email */}
//             <div className="space-y-2">
//               <label className="flex items-center text-sm font-semibold text-gray-700">
//                 <Mail className="w-4 h-4 mr-2 text-purple-500" />
//                 Email Address *
//               </label>
//               <input
//                 type="email"
//                 placeholder="email@example.com"
//                 value={formData.email}
//                 onChange={(e) => handleChange("email", e.target.value)}
//                 className={`w-full p-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-sm sm:text-base ${
//                   errors.email
//                     ? "border-red-300 bg-red-50"
//                     : "border-gray-200 hover:border-gray-300"
//                 }`}
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-xs mt-1">⚠️ {errors.email}</p>
//               )}
//             </div>

//             {/* Source */}
//             <div className="space-y-2">
//               <label className="flex items-center text-sm font-semibold text-gray-700">
//                 <Globe className="w-4 h-4 mr-2 text-orange-500" />
//                 Lead Source *
//               </label>
//               <select
//                 value={formData.source}
//                 onChange={(e) => handleChange("source", e.target.value)}
//                 className={`w-full p-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 appearance-none bg-white text-sm sm:text-base ${
//                   errors.source
//                     ? "border-red-300 bg-red-50"
//                     : "border-gray-200 hover:border-gray-300"
//                 }`}
//               >
//                 <option value="">Select source</option>
//                 <option value="Meta Ads">📱 Meta Ads</option>
//                 <option value="LinkedIn">💼 LinkedIn</option>
//                 <option value="Website">🌐 Website</option>
//                 <option value="Referral">👥 Referral</option>
//                 <option value="Cold Call">📞 Cold Call</option>
//               </select>
//               {errors.source && (
//                 <p className="text-red-500 text-xs mt-1">⚠️ {errors.source}</p>
//               )}
//             </div>

//             {/* Priority */}
//             <div className="space-y-2">
//               <label className="flex items-center text-sm font-semibold text-gray-700">
//                 <Star className="w-4 h-4 mr-2 text-yellow-500" />
//                 Priority Level *
//               </label>

//               <div className="grid grid-cols-3 gap-2 sm:gap-3">
//                 {["hot", "warm", "cold"].map((priority) => (
//                   <button
//                     key={priority}
//                     type="button"
//                     onClick={() => handleChange("priority", priority)}
//                     className={`p-2 sm:p-3 border-2 rounded-xl text-center transition-all duration-200 font-medium text-xs sm:text-sm ${
//                       formData.priority === priority
//                         ? getPriorityColor(priority) +
//                           " border-current scale-95 shadow-inner"
//                         : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
//                     }`}
//                   >
//                     <div className="flex flex-col items-center space-y-1">
//                       <span className="capitalize">{priority}</span>
//                       {priority === "hot" && (
//                         <div className="w-2 h-2 bg-red-500 rounded-full" />
//                       )}
//                       {priority === "warm" && (
//                         <div className="w-2 h-2 bg-orange-500 rounded-full" />
//                       )}
//                       {priority === "cold" && (
//                         <div className="w-2 h-2 bg-blue-500 rounded-full" />
//                       )}
//                     </div>
//                   </button>
//                 ))}
//               </div>

//               {errors.priority && (
//                 <p className="text-red-500 text-xs mt-1">
//                   ⚠️ {errors.priority}
//                 </p>
//               )}
//             </div>

//             {/* Assignment Fields ✅ stack on mobile */}
//             {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <label className="flex items-center text-sm font-semibold text-gray-700">
//                   <Users className="w-4 h-4 mr-2 text-green-500" />
//                   Assign To
//                 </label>
//                 <select
//                   value={formData.assignedTo}
//                   onChange={(e) => handleChange("assignedTo", e.target.value)}
//                   className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 appearance-none bg-white hover:border-gray-300 text-sm sm:text-base"
//                 >
//                   <option value="Unassigned">👤 Unassigned</option>
//                   <option value="Karthik">👨‍💼 Karthik</option>
//                   <option value="Priya">👩‍💼 Priya</option>
//                   <option value="Arjun">👨‍💻 Arjun</option>
//                 </select>
//               </div>

//               <div className="space-y-2">
//                 <label className="flex items-center text-sm font-semibold text-gray-700">
//                   <Users className="w-4 h-4 mr-2 text-purple-500" />
//                   Team Lead
//                 </label>
//                 <select
//                   value={formData.tl}
//                   onChange={(e) => handleChange("tl", e.target.value)}
//                   className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 appearance-none bg-white hover:border-gray-300 text-sm sm:text-base"
//                 >
//                   <option value="Unassigned">👥 Unassigned</option>
//                   <option value="Arun">👨‍💼 Arun</option>
//                   <option value="Meena">👩‍💼 Meena</option>
//                 </select>
//               </div>
//             </div> */}
//           </div>

//           {/* Footer ✅ buttons full width on mobile */}
//           <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
//             <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 disabled={isSubmitting}
//                 className="w-full sm:w-auto px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-white hover:border-gray-400 transition-all duration-200 font-medium disabled:opacity-50"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     <span>Processing...</span>
//                   </>
//                 ) : (
//                   <>
//                     <User className="w-4 h-4" />
//                     <span>{editLead ? "Update Lead" : "Add Lead"}</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>

//       {/* Animations */}
//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }
//         @keyframes slideUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px) scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0) scale(1);
//           }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }
//         .animate-slideUp {
//           animation: slideUp 0.4s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LeadForm;


import React, { useState, useEffect } from "react";
import { X, User, Phone, Mail, Globe, Star } from "lucide-react";
import Popup from "../../../../commonpopup/popup"; // ✅ adjust path if needed

const SalesLeadForm = ({
  isOpen,
  onClose,
  onSave,
  editLead = null,
  title = "Add New Lead",
  description = "Enter the lead details below",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    source: "",
    priority: "",
    assignedTo: "Unassigned",
    tl: "Unassigned",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ popup state
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState("success");
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    if (editLead) {
      setFormData(editLead);
    } else {
      setFormData({
        name: "",
        phone: "",
        email: "",
        source: "",
        priority: "",
        assignedTo: "Unassigned",
        tl: "Unassigned",
      });
    }
    setErrors({});
    setIsSubmitting(false);
    // close popup when form opens/closes or edit changes
    setPopupOpen(false);
  }, [editLead, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.source) newErrors.source = "Source is required";
    if (!formData.priority) newErrors.priority = "Priority is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const openPopup = (type, t, m) => {
    setPopupType(type);
    setPopupTitle(t || "");
    setPopupMessage(m || "");
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);

    // ✅ if success, also close form + reset
    if (popupType === "success") {
      onClose?.();
      setFormData({
        name: "",
        phone: "",
        email: "",
        source: "",
        priority: "",
        assignedTo: "Unassigned",
        tl: "Unassigned",
      });
      setErrors({});
    }
  };

  const handleRetry = () => {
    setPopupOpen(false);
    // user can fix fields and submit again
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // ✅ show waiting popup immediately
    openPopup("waiting", "Please wait...", "Saving lead details...");

    try {
      // simulate API delay (remove when real API is used)
      await new Promise((resolve) => setTimeout(resolve, 800));

      const leadData = {
        ...formData,
        status:
          formData.priority.charAt(0).toUpperCase() +
          formData.priority.slice(1),
        lastContact: "Just now",
      };

      if (editLead) leadData.id = editLead.id;

      // onSave might be sync or async; handle both
      await Promise.resolve(onSave(leadData, !!editLead));

      setIsSubmitting(false);

      // ✅ success popup
      openPopup(
        "success",
        editLead ? "Lead Updated!" : "Lead Added!",
        editLead
          ? "Your lead details were updated successfully."
          : "New lead has been added successfully."
      );
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);

      // ✅ failure popup
      openPopup(
        "failure",
        "Unable to Save Lead",
        "Something went wrong while saving. Please try again."
      );
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "hot":
        return "text-red-500 bg-red-50 border-red-200";
      case "warm":
        return "text-orange-500 bg-orange-50 border-orange-200";
      case "cold":
        return "text-blue-500 bg-blue-50 border-blue-200";
      default:
        return "text-gray-500 bg-gray-50 border-gray-200";
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* ✅ Popup mounted at top-level so it overlays modal */}
      <Popup
        open={popupOpen}
        type={popupType}
        onClose={closePopup}
        title={popupTitle}
        message={popupMessage}
        showRetry={popupType === "failure"}
        onRetry={handleRetry}
      />

      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn">
        <div className="bg-white rounded-2xl shadow-2xl w-[95vw] sm:max-w-md max-h-[90vh] overflow-y-auto transform animate-slideUp">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-2xl">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-white rounded-xl shadow-sm shrink-0">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    {title}
                  </h2>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1">
                    {description}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 hover:bg-white rounded-xl transition-all duration-200 hover:scale-110"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <User className="w-4 h-4 mr-2 text-blue-500" />
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={`w-full p-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-sm sm:text-base ${
                    errors.name
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">⚠️ {errors.name}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <Phone className="w-4 h-4 mr-2 text-green-500" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className={`w-full p-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-sm sm:text-base ${
                    errors.phone
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">⚠️ {errors.phone}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <Mail className="w-4 h-4 mr-2 text-purple-500" />
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={`w-full p-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-sm sm:text-base ${
                    errors.email
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">⚠️ {errors.email}</p>
                )}
              </div>

              {/* Source */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <Globe className="w-4 h-4 mr-2 text-orange-500" />
                  Lead Source *
                </label>
                <select
                  value={formData.source}
                  onChange={(e) => handleChange("source", e.target.value)}
                  className={`w-full p-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 appearance-none bg-white text-sm sm:text-base ${
                    errors.source
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <option value="">Select source</option>
                  <option value="Meta Ads">📱 Meta Ads</option>
                  <option value="LinkedIn">💼 LinkedIn</option>
                  <option value="Website">🌐 Website</option>
                  <option value="Referral">👥 Referral</option>
                  <option value="Cold Call">📞 Cold Call</option>
                </select>
                {errors.source && (
                  <p className="text-red-500 text-xs mt-1">⚠️ {errors.source}</p>
                )}
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <Star className="w-4 h-4 mr-2 text-yellow-500" />
                  Priority Level *
                </label>

                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {["hot", "warm", "cold"].map((priority) => (
                    <button
                      key={priority}
                      type="button"
                      onClick={() => handleChange("priority", priority)}
                      className={`p-2 sm:p-3 border-2 rounded-xl text-center transition-all duration-200 font-medium text-xs sm:text-sm ${
                        formData.priority === priority
                          ? getPriorityColor(priority) +
                            " border-current scale-95 shadow-inner"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-1">
                        <span className="capitalize">{priority}</span>
                        {priority === "hot" && (
                          <div className="w-2 h-2 bg-red-500 rounded-full" />
                        )}
                        {priority === "warm" && (
                          <div className="w-2 h-2 bg-orange-500 rounded-full" />
                        )}
                        {priority === "cold" && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {errors.priority && (
                  <p className="text-red-500 text-xs mt-1">
                    ⚠️ {errors.priority}
                  </p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-white hover:border-gray-400 transition-all duration-200 font-medium disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <User className="w-4 h-4" />
                      <span>{editLead ? "Update Lead" : "Add Lead"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Animations */}
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
          .animate-slideUp {
            animation: slideUp 0.4s ease-out;
          }
        `}</style>
      </div>
    </>
  );
};

export default SalesLeadForm;