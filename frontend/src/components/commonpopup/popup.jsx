// // Popup.jsx
// import React from "react";

// const POPUP_STYLES = {
//   success: {
//     title: "Success!",
//     message:
//       "Your action was completed successfully. You're all set to continue.",
//     gradient: "from-emerald-500 to-green-400",
//     iconColor: "text-emerald-500",
//     bgColor: "bg-emerald-50",
//     borderColor: "border-emerald-200",
//     buttonGradient:
//       "from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600",
//     icon: "✓",
//   },
//   failure: {
//     title: "Oops! Something went wrong",
//     message:
//       "We encountered an issue while processing your request. Please try again in a moment.",
//     gradient: "from-rose-500 to-pink-500",
//     iconColor: "text-rose-500",
//     bgColor: "bg-rose-50",
//     borderColor: "border-rose-200",
//     buttonGradient:
//       "from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600",
//     icon: "⚠",
//   },
//   waiting: {
//     title: "Please wait...",
//     message: "We're working on it. This may take a few seconds.",
//     gradient: "from-amber-500 to-orange-400",
//     iconColor: "text-amber-500",
//     bgColor: "bg-amber-50",
//     borderColor: "border-amber-200",
//     buttonGradient:
//       "from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600",
//     icon: "⏳",
//   },
//   notallow: {
//     title: "Access Restricted",
//     message:
//       "Sales executive does not have permission to add leads. Please contact your administrator.",
//     gradient: "from-slate-600 to-gray-500",
//     iconColor: "text-slate-600",
//     bgColor: "bg-slate-50",
//     borderColor: "border-slate-200",
//     buttonGradient:
//       "from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700",
//     icon: "🚫",
//   },
// };

// export default function Popup({
//   open,
//   type = "success",
//   onClose,
//   title,
//   message,
//   showRetry = false,
//   onRetry,
// }) {
//   if (!open) return null;

//   const style = POPUP_STYLES[type] || POPUP_STYLES.success;

//   const finalTitle = title || style.title;
//   const finalMessage = message || style.message;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center p-4 z-[1000]">
//       {/* Backdrop */}
//       <div
//         onClick={onClose}
//         className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
//       />

//       {/* Popup Container */}
//       <div className="relative animate-scaleIn w-full max-w-md">
//         {/* Gradient Border Effect */}
//         <div
//           className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${style.gradient} p-0.5`}
//         >
//           <div className="absolute inset-0 rounded-3xl bg-white/30 backdrop-blur-sm" />
//         </div>

//         {/* Main Popup Content */}
//         <div
//           className={`relative rounded-[calc(1.5rem-2px)] ${style.bgColor} border ${style.borderColor} overflow-hidden shadow-2xl`}
//         >
//           {/* Header */}
//           <div
//             className={`relative py-6 px-8 bg-gradient-to-r ${style.gradient}`}
//           >
//             {/* Close Button */}
//             <button
//               onClick={onClose}
//               className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-xl transition-all duration-300 hover:scale-110"
//               aria-label="Close popup"
//             >
//               ×
//             </button>

//             {/* Title */}
//             <h3 className="text-2xl font-bold text-white pt-2 pr-12">
//               {finalTitle}
//             </h3>
//           </div>

//           {/* Body Content */}
//           <div className="px-8 py-4">
//             {/* Icon + Message */}
//             <div className="flex gap-4 flex-col justify-center items-center">
//               <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
//                 <span className={`text-3xl font-bold ${style.iconColor}`}>
//                   {style.icon}
//                 </span>
//               </div>

//               <p className="text-slate-700 text-center text-lg leading-relaxed">
//                 {finalMessage}
//               </p>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-4 mt-6">
//               <button
//                 onClick={onClose}
//                 className={`flex-1 py-3 rounded-xl bg-gradient-to-r ${style.buttonGradient} text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5`}
//               >
//                 Got it
//               </button>

//               {(showRetry || type === "failure") && (
//                 <button
//                   onClick={onRetry}
//                   className="flex-1 py-3 rounded-xl bg-gradient-to-r from-slate-500 to-gray-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
//                 >
//                   Try Again
//                 </button>
//               )}
//             </div>

//             {/* Waiting dots */}
//             {type === "waiting" && (
//               <div className="mt-6 pt-5 border-t border-slate-200">
//                 <div className="flex flex-col items-center gap-3">
//                   <div className="flex items-center gap-3">
//                     <span className="h-3 w-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 animate-pulse"></span>
//                     <span className="h-3 w-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 animate-pulse [animation-delay:150ms]"></span>
//                     <span className="h-3 w-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 animate-pulse [animation-delay:300ms]"></span>
//                   </div>
//                   <p className="text-sm text-slate-500">
//                     Processing your request...
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* Not allow extra info */}
//             {type === "notallow" && (
//               <div className="mt-6 p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl border border-slate-200">
//                 <p className="text-sm text-slate-600 text-center">
//                   Need access? Contact your administrator at{" "}
//                   <span className="font-semibold text-slate-800">
//                     admin@company.com
//                   </span>
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Bottom Gradient */}
//           <div className={`h-2 bg-gradient-to-r ${style.gradient}`} />
//         </div>
//       </div>

//       {/* Animations */}
//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes scaleIn {
//           from {
//             opacity: 0;
//             transform: scale(0.9) translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1) translateY(0);
//           }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }
//         .animate-scaleIn {
//           animation: scaleIn 0.4s cubic-bezier(
//             0.175, 0.885, 0.32, 1.275
//           );
//         }
//       `}</style>
//     </div>
//   );
// }



// Popup.jsx
import React from "react";

const POPUP_STYLES = {
  success: {
    title: "Success!",
    message:
      "Your action was completed successfully. You're all set to continue.",
    gradient: "from-emerald-500 to-green-400",
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    buttonGradient:
      "from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600",
    icon: "✓",
  },
  failure: {
    title: "Oops! Something went wrong",
    message:
      "We encountered an issue while processing your request. Please try again in a moment.",
    gradient: "from-rose-500 to-pink-500",
    iconColor: "text-rose-500",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
    buttonGradient:
      "from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600",
    icon: "⚠",
  },
  waiting: {
    title: "Please wait...",
    message: "We're working on it. This may take a few seconds.",
    gradient: "from-amber-500 to-orange-400",
    iconColor: "text-amber-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    buttonGradient:
      "from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600",
    icon: "⏳",
  },
  notallow: {
    title: "Access Restricted",
    message:
      "Sales executive does not have permission to add leads. Please contact your administrator.",
    gradient: "from-slate-600 to-gray-500",
    iconColor: "text-slate-600",
    bgColor: "bg-slate-50",
    borderColor: "border-slate-200",
    buttonGradient:
      "from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700",
    icon: "🚫",
  },
};

export default function Popup({
  open,
  type = "success",
  onClose,
  title,
  message,
  showRetry = false,
  onRetry,
}) {
  if (!open) return null;

  const style = POPUP_STYLES[type] || POPUP_STYLES.success;

  const finalTitle = title || style.title;
  const finalMessage = message || style.message;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-[1000]">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
      />

      {/* Popup Container */}
      <div className="relative animate-scaleIn w-full max-w-md">
        {/* Gradient Border Effect */}
        <div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${style.gradient} p-0.5`}
        >
          <div className="absolute inset-0 rounded-3xl bg-white/30 backdrop-blur-sm" />
        </div>

        {/* Main Popup Content */}
        <div
          className={`relative rounded-[calc(1.5rem-2px)] ${style.bgColor} border ${style.borderColor} overflow-hidden shadow-2xl`}
        >
          {/* Header */}
          <div
            className={`relative py-6 px-8 bg-gradient-to-r ${style.gradient}`}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-xl transition-all duration-300 hover:scale-110"
              aria-label="Close popup"
            >
              ×
            </button>

            {/* Title */}
            <h3 className="text-2xl font-bold text-white pt-2 pr-12">
              {finalTitle}
            </h3>
          </div>

          {/* Body Content */}
          <div className="px-8 py-4">
            {/* Icon + Message */}
            <div className="flex gap-4 flex-col justify-center items-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                <span className={`text-3xl font-bold ${style.iconColor}`}>
                  {style.icon}
                </span>
              </div>

              <p className="text-slate-700 text-center text-lg leading-relaxed">
                {finalMessage}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={onClose}
                className={`flex-1 py-3 rounded-xl bg-gradient-to-r ${style.buttonGradient} text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5`}
              >
                Got it
              </button>

              {(showRetry || type === "failure") && (
                <button
                  onClick={onRetry}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-slate-500 to-gray-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  Try Again
                </button>
              )}
            </div>

            {/* Waiting dots */}
            {type === "waiting" && (
              <div className="mt-6 pt-5 border-t border-slate-200">
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 animate-pulse"></span>
                    <span className="h-3 w-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 animate-pulse [animation-delay:150ms]"></span>
                    <span className="h-3 w-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 animate-pulse [animation-delay:300ms]"></span>
                  </div>
                  <p className="text-sm text-slate-500">
                    Processing your request...
                  </p>
                </div>
              </div>
            )}

            {/* Not allow extra info */}
            {type === "notallow" && (
              <div className="mt-6 p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl border border-slate-200">
                <p className="text-sm text-slate-600 text-center">
                  Need access? Contact your administrator at{" "}
                  <span className="font-semibold text-slate-800">
                    admin@company.com
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Bottom Gradient */}
          <div className={`h-2 bg-gradient-to-r ${style.gradient}`} />
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.4s cubic-bezier(
            0.175, 0.885, 0.32, 1.275
          );
        }
      `}</style>
    </div>
  );
}