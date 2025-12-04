import React, { useState } from "react";
import { X, FileText, Tag, Clock, Zap, User } from "lucide-react";

const categories = [
  { name: "General", icon: "📝", color: "bg-gray-100 text-gray-700" },
  { name: "Follow-up", icon: "🔄", color: "bg-blue-100 text-blue-700" },
  { name: "Reminder", icon: "⏰", color: "bg-orange-100 text-orange-700" },
  { name: "Approval", icon: "✅", color: "bg-green-100 text-green-700" },
  { name: "Meeting", icon: "👥", color: "bg-purple-100 text-purple-700" },
];

const quickNotes = [
  "Customer is interested in our premium plan",
  "Needs more information about pricing",
  "Budget approved for Q4 project",
  "Decision pending from management team",
  "Follow up next week with demo",
  "Very responsive and engaged",
  "Requested case studies",
  "Interested in enterprise features",
];

export default function AddNoteModal({
  isOpen,
  onClose,
  leadName = "Priya Sharma",
}) {
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!note.trim()) {
      setError("Please enter a note before saving");
      return;
    }

    setIsSubmitting(true);
    setError("");

    const payload = {
      category,
      note,
      timestamp: new Date().toISOString(),
      leadName,
    };

    console.log("Saving note:", payload);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    onClose();
  };

  const handleQuickNoteClick = (quickNote) => {
    setNote(quickNote);
    setError("");
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 animate-fade-in">
      {/* ✅ Responsive modal width + height */}
      <div className="bg-white rounded-2xl shadow-2xl w-[95vw] sm:max-w-2xl max-h-[92vh] sm:max-h-[90vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 sm:p-6 rounded-t-2xl flex-shrink-0">
          <div className="flex justify-between items-start gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm shrink-0">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Add New Note
                </h2>
                <p className="text-blue-100 text-xs sm:text-sm mt-1">
                  Document important information and updates
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
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Lead Info */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-3 sm:p-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center shrink-0">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">
                  {leadName}
                </h3>
                <span className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 mt-1">
                  <Clock className="w-4 h-4" />
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Category Selection */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Tag className="w-4 h-4 text-blue-500" />
              Note Category
              <span className="text-gray-400 text-xs font-normal">
                (optional)
              </span>
            </label>

            {/* ✅ Better responsive grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setCategory(cat.name)}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 text-left text-sm ${
                    category === cat.name
                      ? "border-blue-500 bg-blue-50 scale-[0.97]"
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-25 hover:scale-[1.02]"
                  } active:scale-95`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{cat.icon}</span>
                    <span className="font-medium truncate">{cat.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Notes */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Zap className="w-4 h-4 text-yellow-500" />
              Quick Notes
            </label>

            {/* ✅ 1 col mobile, 2 col desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quickNotes.map((qn, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickNoteClick(qn)}
                  className="p-3 text-left rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 text-sm text-gray-700 hover:text-gray-900"
                >
                  {qn}
                </button>
              ))}
            </div>
          </div>

          {/* Note Input */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FileText className="w-4 h-4 text-green-500" />
              Your Note <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <textarea
                rows={4}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-200 resize-none bg-gray-50 hover:bg-white focus:bg-white text-sm sm:text-base
                  ${
                    error
                      ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
                placeholder={`Type your detailed note here...
• What was discussed?
• What are the next steps?
• Any important decisions or insights?`}
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                  setError("");
                }}
                maxLength={1000}
              />

              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {note.length}/1000
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-2">⚠️ {error}</p>
            )}
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-green-800 mb-2">
              💡 Note Writing Tips
            </h4>
            <ul className="text-xs text-green-700 space-y-1">
              <li>• Be specific about conversations and decisions</li>
              <li>• Include action items and next steps</li>
              <li>• Note any objections or concerns raised</li>
              <li>• Record important dates and deadlines</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 sm:p-6 bg-white rounded-b-2xl flex-shrink-0">
          {/* ✅ Footer stacks on mobile */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:items-center">

            <div className="text-sm text-gray-500 min-h-[20px]">
              {category && (
                <span className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Category:
                  <span className="font-medium text-gray-700">
                    {category}
                  </span>
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 active:scale-95 transition-all duration-200 font-medium"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !note.trim()}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 active:scale-95 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    Save Note
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
