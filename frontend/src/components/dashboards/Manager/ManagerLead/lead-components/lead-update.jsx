import React, { useState, useEffect } from "react";
import {
  X,
  TrendingUp,
  User,
  Calendar,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Popup from "../../../../commonpopup/popup";

export default function UpdateLead({ isOpen, onClose, lead, onUpdate }) {
  const [newStatus, setNewStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    status: true,
    priority: true,
    notes: true,
  });

  // ✅ popup state
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState("success"); // success | failure | waiting
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setNewStatus("");
      setPriority("");
      setNotes("");
      setErrors({});
      setIsUpdating(false);
      setPopupOpen(false);
      setPopupType("success");
      setPopupTitle("");
      setPopupMessage("");
    }
  }, [isOpen, lead]);

  // ✅ IMPORTANT FIX:
  // If modal is closed but popup is open, DON'T unmount the component.
  if (!isOpen && !popupOpen) return null;

  const validateForm = () => {
    const newErrors = {};
    if (!newStatus) newErrors.newStatus = "Please select a new status";
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

    // ✅ close modal after success popup only
    if (popupType === "success") {
      onClose?.();
    }
  };

  const handleRetry = () => {
    setPopupOpen(false);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsUpdating(true);

    // ✅ waiting popup
    openPopup("waiting", "Please wait...", "Updating lead status...");

    const payload = {
      id: lead?.id,
      lead: lead?.name,
      newStatus,
      priority,
      notes,
    };

    try {
      if (onUpdate) {
        await Promise.resolve(onUpdate(payload));
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }

      setIsUpdating(false);

      // ✅ success popup
      openPopup(
        "success",
        "Lead Updated!",
        `${lead?.name || "Lead"} status updated to "${newStatus}".`
      );
    } catch (err) {
      console.error(err);
      setIsUpdating(false);

      // ✅ failure popup
      openPopup(
        "failure",
        "Update Failed",
        "Something went wrong while updating. Please try again."
      );
    }
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const statusOptions = [
    { value: "Interested", label: "Interested" },
    { value: "Follow-up", label: "Follow-up" },
    { value: "Converted", label: "Converted" },
    { value: "Not Interested", label: "Not Interested" },
  ];

  const priorityOptions = [
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
  ];

  return (
    <>
      {/* ✅ Popup overlay (ensure Popup.jsx uses z-[9999] or similar) */}
      <Popup
        open={popupOpen}
        type={popupType}
        onClose={closePopup}
        title={popupTitle}
        message={popupMessage}
        showRetry={popupType === "failure"}
        onRetry={handleRetry}
      />

      {/* ✅ Modal only when isOpen is true */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-t-2xl flex-shrink-0">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Update Lead Status
                    </h2>
                    <p className="text-blue-100 text-sm mt-1">
                      Track progress and update lead information
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-white hover:text-gray-200" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Lead Info */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {lead?.name || "Lead Name"}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Today
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          lead?.status === "New"
                            ? "bg-green-100 text-green-800"
                            : lead?.status === "Follow-up"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        Current: {lead?.status || "New"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-4">
                {/* Status Section */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleSection("status")}
                    className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <span className="w-2 h-2 bg-blue-500 rounded-full" />
                      New Status <span className="text-red-500">*</span>
                    </div>
                    {expandedSections.status ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </button>

                  {expandedSections.status && (
                    <div className="p-4 space-y-3">
                      <select
                        className={`w-full p-3 rounded-lg border-2 transition-all duration-200 bg-white ${
                          errors.newStatus
                            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        }`}
                        value={newStatus}
                        onChange={(e) => {
                          setNewStatus(e.target.value);
                          if (errors.newStatus) {
                            setErrors((prev) => ({
                              ...prev,
                              newStatus: "",
                            }));
                          }
                        }}
                      >
                        <option value="">Select new status</option>
                        {statusOptions.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>

                      {errors.newStatus && (
                        <p className="text-red-500 text-sm">
                          ⚠️ {errors.newStatus}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Priority Section */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleSection("priority")}
                    className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <span className="w-2 h-2 bg-orange-500 rounded-full" />
                      Priority Level
                    </div>
                    {expandedSections.priority ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </button>

                  {expandedSections.priority && (
                    <div className="p-4 space-y-3">
                      <select
                        className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                      >
                        <option value="">Select priority (optional)</option>
                        {priorityOptions.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label} Priority
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Notes Section */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleSection("notes")}
                    className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                      Update Notes
                    </div>
                    {expandedSections.notes ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </button>

                  {expandedSections.notes && (
                    <div className="p-4 space-y-3">
                      <textarea
                        className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white resize-none"
                        placeholder="Add reason for status change, next steps, or important notes..."
                        rows="4"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        maxLength={500}
                      />
                      <div className="text-xs text-gray-400 text-right">
                        {notes.length}/500
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 border-t border-gray-200 p-6 bg-white rounded-b-2xl">
              <div className="flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 active:scale-95 transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isUpdating || !newStatus}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 active:scale-95 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUpdating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-4 h-4" />
                      Update Status
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
