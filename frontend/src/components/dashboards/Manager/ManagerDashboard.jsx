// // MainManagerDashboard.jsx
// import React, { useMemo, useState } from "react";
// import {
//   DollarSign,
//   TrendingUp,
//   CheckCircle,
//   AlertCircle,
//   Award,
//   Bell,
//   Calendar,
// } from "lucide-react";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";
// import { Link } from "react-router-dom";

// import Popup from "../../commonpopup/popup"; // ✅ Import Popup component

// /* ----------------------- Mock Manager Data ----------------------- */
// // Make data stateful so we can update it
// const initialManagerData = {
//   totalRevenue: 450000,
//   todayRevenue: 85000,
//   leadsConverted: 124,
//   paymentsVerified: 89,
//   todayPayments: 12,
//   pendingApprovals: 8,
//   pendingVerifications: [
//     {
//       id: 1,
//       lead: "Sanjay Kumar",
//       executive: "Rahul",
//       type: "Full",
//       amount: "₹45,000",
//       time: "2 hours ago",
//     },
//     {
//       id: 2,
//       lead: "Priya Singh",
//       executive: "Sneha",
//       type: "EMI",
//       amount: "₹1,20,000",
//       time: "1 hour ago",
//     },
//   ],
//   criticalAlerts: [
//     {
//       type: "payment",
//       priority: "high",
//       message: "3 high-value payments pending verification",
//     },
//   ],
//   topPerformersToday: [
//     { name: "Rahul", conversions: 8, revenue: "₹85,000" },
//     { name: "Priya", conversions: 6, revenue: "₹72,000" },
//     { name: "Karthik", conversions: 5, revenue: "₹58,000" },
//   ],
// };

// const getTodayDate = () =>
//   new Date().toLocaleDateString("en-IN", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

// /* ---------------------- Small responsive chips ---------------------- */
// const TypeChip = ({ type }) => {
//   const styles =
//     type === "Full"
//       ? "bg-green-50 text-green-700"
//       : type === "EMI"
//       ? "bg-blue-50 text-blue-700"
//       : type === "Loan"
//       ? "bg-orange-50 text-orange-700"
//       : "bg-purple-50 text-purple-700";
//   return (
//     <span className={`inline-block px-2 py-1 rounded-lg text-xs ${styles}`}>
//       {type}
//     </span>
//   );
// };

// const StatusChip = ({ status }) => {
//   const styles =
//     status === "verified"
//       ? "bg-green-50 text-green-700"
//       : "bg-orange-50 text-orange-700";
//   return (
//     <span className={`inline-block px-2 py-1 rounded-lg text-xs ${styles}`}>
//       {status === "verified" ? "Verified" : "Unverified"}
//     </span>
//   );
// };

// export default function MainManagerDashboard() {
//   const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
//   const [managerData, setManagerData] = useState(initialManagerData);
//   const [pendingVerifications, setPendingVerifications] = useState(
//     initialManagerData.pendingVerifications
//   );

//   // ✅ GLOBAL POPUP STATE
//   const [popup, setPopup] = useState({
//     open: false,
//     type: "success", // success | failure | waiting
//     title: "",
//     message: "",
//     showRetry: false,
//     onRetry: null,
//   });

//   const openPopup = (type, title, message, extra = {}) => {
//     setPopup({
//       open: true,
//       type,
//       title,
//       message,
//       showRetry: false,
//       onRetry: null,
//       ...extra,
//     });
//   };

//   const closePopup = () => {
//     setPopup((p) => ({
//       ...p,
//       open: false,
//       showRetry: false,
//       onRetry: null,
//     }));
//   };

//   // ✅ Derive pending count from state
//   const pendingCount = pendingVerifications.length;

//   const kpis = useMemo(
//     () => [
//       {
//         label: "Total Revenue",
//         value: `₹${(managerData.totalRevenue / 100000).toFixed(1)}L`,
//         icon: DollarSign,
//         color: "bg-green-50 text-green-600",
//         trend: "+18%",
//         subtext: `₹${(managerData.todayRevenue / 100000).toFixed(1)}L today`,
//       },
//       {
//         label: "Leads Converted",
//         value: managerData.leadsConverted.toString(),
//         icon: TrendingUp,
//         color: "bg-blue-50 text-blue-600",
//         trend: "+12%",
//         subtext: "This month",
//       },
//       {
//         label: "Payments Verified",
//         value: managerData.paymentsVerified.toString(),
//         icon: CheckCircle,
//         color: "bg-purple-50 text-purple-600",
//         trend: "+8%",
//         subtext: `${managerData.todayPayments} verified today`,
//       },
//       {
//         label: "Pending Approvals",
//         value: pendingCount.toString(),
//         icon: AlertCircle,
//         color: "bg-orange-50 text-orange-600",
//         trend: "-5%",
//         subtext: "Needs attention",
//       },
//     ],
//     [managerData, pendingCount]
//   );

//   const payments = [
//     {
//       lead: "Priya Sharma",
//       executive: "Karthik",
//       type: "Full",
//       amount: "₹45,000",
//       status: "verified",
//     },
//     {
//       lead: "Rajesh Kumar",
//       executive: "Priya",
//       type: "EMI",
//       amount: "₹1,20,000",
//       status: "unverified",
//     },
//     {
//       lead: "Anita Desai",
//       executive: "Arjun",
//       type: "Full",
//       amount: "₹38,000",
//       status: "verified",
//     },
//     {
//       lead: "Vikram Singh",
//       executive: "Sneha",
//       type: "Loan",
//       amount: "₹95,000",
//       status: "unverified",
//     },
//     {
//       lead: "Meera Patel",
//       executive: "Rahul",
//       type: "Credit",
//       amount: "₹52,000",
//       status: "verified",
//     },
//   ];

//   const revenueData = [
//     { month: "Jun", revenue: 8.5 },
//     { month: "Jul", revenue: 9.2 },
//     { month: "Aug", revenue: 10.1 },
//     { month: "Sep", revenue: 9.8 },
//     { month: "Oct", revenue: 11.2 },
//     { month: "Nov", revenue: 12.4 },
//   ];

//   const paymentTypeData = [
//     { name: "Full Payment", value: 45, color: "#10B981" },
//     { name: "EMI", value: 30, color: "#3B82F6" },
//     { name: "Loan", value: 15, color: "#F59E0B" },
//     { name: "Credit", value: 10, color: "#8B5CF6" },
//   ];

//   // ✅ Approve Payment Handler
//   const handleApprove = (payment) => {
//     console.log("APPROVED PAYMENT DATA:", payment);

//     // Show success popup
//     openPopup(
//       "success",
//       "Payment Approved",
//       `${payment.lead}'s payment (${payment.amount}) has been approved.`
//     );

//     // Remove from pending verifications
//     setPendingVerifications((prev) =>
//       prev.filter((p) => p.id !== payment.id)
//     );

//     // Update metrics (increment verified payments)
//     setManagerData((prev) => ({
//       ...prev,
//       paymentsVerified: prev.paymentsVerified + 1,
//       todayPayments: prev.todayPayments + 1,
//       todayRevenue: prev.todayRevenue + parseInt(payment.amount.replace(/[^0-9]/g, '')) || 0,
//     }));
//   };

//   // ✅ Reject Payment Handler
//   const handleReject = (payment) => {
//     console.log("REJECTED PAYMENT DATA:", payment);

//     // Show failure popup
//     openPopup(
//       "failure",
//       "Payment Rejected",
//       `${payment.lead}'s payment (${payment.amount}) has been rejected.`
//     );

//     // Remove from pending verifications
//     setPendingVerifications((prev) =>
//       prev.filter((p) => p.id !== payment.id)
//     );
//   };

//   // ✅ Handle Approve All
//   const handleApproveAll = () => {
//     if (pendingVerifications.length === 0) return;

//     // Calculate total amount
//     const totalAmount = pendingVerifications.reduce((sum, p) => {
//       return sum + (parseInt(p.amount.replace(/[^0-9]/g, '')) || 0);
//     }, 0);

//     // Show success popup
//     openPopup(
//       "success",
//       "All Payments Approved",
//       `All ${pendingVerifications.length} pending payments (total: ₹${(totalAmount / 1000).toFixed(0)}K) have been approved.`
//     );

//     // Update metrics
//     setManagerData((prev) => ({
//       ...prev,
//       paymentsVerified: prev.paymentsVerified + pendingVerifications.length,
//       todayPayments: prev.todayPayments + pendingVerifications.length,
//       todayRevenue: prev.todayRevenue + totalAmount,
//     }));

//     // Clear all pending verifications
//     setPendingVerifications([]);
//   };

//   return (
//     <div className="w-full bg-gray-50">
//       {/* ✅ GLOBAL POPUP */}
//       <Popup
//         open={popup.open}
//         type={popup.type}
//         title={popup.title}
//         message={popup.message}
//         onClose={closePopup}
//         showRetry={popup.showRetry}
//         onRetry={popup.onRetry}
//       />

//       <div className="max-w-7xl mx-auto space-y-6 p-3 sm:p-6 min-w-0">
//         {/* Header */}
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
//           <div className="min-w-0">
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">
//               Manager Overview
//             </h1>
//             <p className="text-gray-500 mt-1 text-sm sm:text-base">
//               {getTodayDate()}
//             </p>
//           </div>

//           {/* Actions: stack on mobile */}
//           <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
//             <Link 
//               to="/manager/report"
//               className="w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl bg-white text-gray-700 hover:bg-gray-50 text-sm"
//             >
//               <Calendar className="w-4 h-4 mr-2" />
//               Reports
//             </Link>

//             <button
//               onClick={() => setIsApprovalModalOpen(true)}
//               className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-white text-sm relative"
//             >
//               Approve Payments
//               {pendingCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-600 rounded-full w-6 h-6 flex items-center justify-center text-xs text-white">
//                   {pendingCount}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Critical Alerts */}
//         {!!managerData.criticalAlerts?.length && (
//           <div className="space-y-3">
//             {managerData.criticalAlerts.map((alert, index) => (
//               <div
//                 key={index}
//                 className={`rounded-xl border p-4 sm:p-6 ${
//                   alert.priority === "high"
//                     ? "border-red-300 bg-gradient-to-r from-red-50 to-orange-50"
//                     : "border-orange-300 bg-gradient-to-r from-orange-50 to-yellow-50"
//                 }`}
//               >
//                 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                   <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
//                     <div
//                       className={`w-10 h-10 sm:w-12 sm:h-12 ${
//                         alert.priority === "high"
//                           ? "bg-red-600"
//                           : "bg-orange-600"
//                       } rounded-xl flex items-center justify-center flex-shrink-0`}
//                     >
//                       {alert.type === "payment" ? (
//                         <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//                       ) : (
//                         <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//                       )}
//                     </div>

//                     <div className="min-w-0">
//                       <span
//                         className={`inline-block px-2 py-1 rounded-lg text-xs font-medium text-white mb-2 ${
//                           alert.priority === "high"
//                             ? "bg-red-600"
//                             : "bg-orange-600"
//                         }`}
//                       >
//                         {alert.priority === "high"
//                           ? "High Priority"
//                           : "Medium Priority"}
//                       </span>
//                       <p className="text-gray-900 text-sm sm:text-base break-words">
//                         {alert.message}
//                       </p>
//                     </div>
//                   </div>

//                   <button
//                     onClick={() => setIsApprovalModalOpen(true)}
//                     className={`w-full md:w-auto px-4 py-2 rounded-xl text-white text-sm sm:text-base ${
//                       alert.priority === "high"
//                         ? "bg-red-600 hover:bg-red-700"
//                         : "bg-orange-600 hover:bg-orange-700"
//                     } transition-colors flex-shrink-0`}
//                   >
//                     Take Action
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Today's Performance */}
//         <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div className="flex items-center gap-3 sm:gap-4">
//               <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
//                 <DollarSign className="w-6 h-6 md:w-8 md:h-8 text-white" />
//               </div>
//               <div>
//                 <h3 className="text-gray-900 font-semibold text-lg md:text-xl">
//                   Today's Revenue
//                 </h3>
//                 <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
//                   ₹{(managerData.todayRevenue / 100000).toFixed(1)}L
//                 </p>
//                 <p className="text-gray-600 mt-1 text-sm md:text-base">
//                   {managerData.todayPayments} payments verified today
//                 </p>
//               </div>
//             </div>

//             <div className="text-left md:text-right">
//               <p className="text-sm text-gray-600">Top Performer Today</p>
//               <p className="text-gray-900 mt-1 font-semibold">
//                 {managerData.topPerformersToday?.[0]?.name}
//               </p>
//               <p className="text-sm text-gray-600 mt-1">
//                 {managerData.topPerformersToday?.[0]?.revenue}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* KPI Cards - Updated to use pendingCount */}
//         <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
//           {kpis.map((kpi, index) => {
//             const Icon = kpi.icon;
//             return (
//               <div
//                 key={index}
//                 className="rounded-xl border border-gray-200 bg-white p-4 md:p-6 hover:shadow-md transition-shadow min-w-0"
//               >
//                 <div className="flex items-center justify-between mb-3 sm:mb-4">
//                   <div
//                     className={`w-10 h-10 md:w-12 md:h-12 ${kpi.color} rounded-xl flex items-center justify-center`}
//                   >
//                     <Icon className="w-5 h-5 md:w-6 md:h-6" />
//                   </div>

//                   <div className="flex items-center gap-1">
//                     <TrendingUp
//                       className={`w-3 h-3 ${
//                         kpi.trend.startsWith("+")
//                           ? "text-green-600"
//                           : "text-red-600"
//                       }`}
//                     />
//                     <span
//                       className={`text-xs ${
//                         kpi.trend.startsWith("+")
//                           ? "text-green-600"
//                           : "text-red-600"
//                       }`}
//                     >
//                       {kpi.trend}
//                     </span>
//                   </div>
//                 </div>

//                 <p className="text-sm text-gray-500">{kpi.label}</p>
//                 <p className="text-xl md:text-2xl font-bold text-gray-900 mt-2">
//                   {kpi.value}
//                 </p>
//                 <p className="text-xs text-gray-600 mt-2">{kpi.subtext}</p>
//               </div>
//             );
//           })}
//         </div>

//         {/* Main Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 min-w-0">
//           {/* Left Column */}
//           <div className="lg:col-span-2 space-y-4 sm:space-y-6 min-w-0">
//             {/* Finance Overview */}
//             <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-6 min-w-0">
//               <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
//                 Finance Overview
//               </h2>

//               {/* Mobile cards */}
//               <div className="block md:hidden space-y-3">
//                 {payments.map((p, idx) => (
//                   <div
//                     key={idx}
//                     className="border border-gray-200 rounded-xl p-3 bg-gray-50"
//                   >
//                     <div className="flex items-start justify-between gap-2">
//                       <div className="min-w-0">
//                         <p className="font-medium text-gray-900 truncate">
//                           {p.lead}
//                         </p>
//                         <p className="text-xs text-gray-600 mt-1 truncate">
//                           Exec: {p.executive}
//                         </p>
//                       </div>
//                       <StatusChip status={p.status} />
//                     </div>

//                     <div className="mt-2 flex items-center justify-between text-sm">
//                       <TypeChip type={p.type} />
//                       <span className="font-semibold text-gray-900">
//                         {p.amount}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Desktop table */}
//               <div className="hidden md:block overflow-x-auto">
//                 <table className="w-full min-w-[600px]">
//                   <thead>
//                     <tr className="border-b border-gray-200">
//                       {["Lead", "Sales Exec", "Payment Type", "Amount", "Status"].map(
//                         (h) => (
//                           <th
//                             key={h}
//                             className="text-left py-3 px-2 text-sm font-semibold text-gray-900 whitespace-nowrap"
//                           >
//                             {h}
//                           </th>
//                         )
//                       )}
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {payments.map((payment, idx) => (
//                       <tr
//                         key={idx}
//                         className="border-b border-gray-100 last:border-b-0"
//                       >
//                         <td className="py-3 px-2 text-sm text-gray-900">
//                           {payment.lead}
//                         </td>
//                         <td className="py-3 px-2 text-sm text-gray-600">
//                           {payment.executive}
//                         </td>
//                         <td className="py-3 px-2">
//                           <TypeChip type={payment.type} />
//                         </td>
//                         <td className="py-3 px-2 text-sm text-gray-900">
//                           {payment.amount}
//                         </td>
//                         <td className="py-3 px-2">
//                           <StatusChip status={payment.status} />
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Revenue Trend Chart */}
//             <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-6">
//               <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
//                 Revenue Trend (Last 6 Months)
//               </h2>

//               <div className="w-full min-h-[260px] sm:min-h-[320px]">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={revenueData} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                     <XAxis dataKey="month" stroke="#6b7280" tickLine={false} />
//                     <YAxis stroke="#6b7280" tickLine={false} />
//                     <Tooltip />
//                     <Line
//                       type="monotone"
//                       dataKey="revenue"
//                       stroke="#3b82f6"
//                       strokeWidth={3}
//                       dot={{ r: 4 }}
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="space-y-4 sm:space-y-6 min-w-0">
//             {/* Top Performers */}
//             <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg md:text-xl font-semibold text-gray-900">
//                   Today's Top Performers
//                 </h2>
//                 <span className="bg-green-600 text-white px-2 py-1 rounded-lg text-xs">
//                   Live
//                 </span>
//               </div>

//               <div className="space-y-3">
//                 {managerData.topPerformersToday.map((member, index) => (
//                   <div
//                     key={index}
//                     className={`flex items-center gap-3 p-3 rounded-lg ${
//                       index === 0
//                         ? "bg-yellow-50 border border-yellow-200"
//                         : "bg-gray-50"
//                     }`}
//                   >
//                     <div
//                       className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
//                         index === 0
//                           ? "bg-yellow-500 text-white"
//                           : index === 1
//                           ? "bg-gray-400 text-white"
//                           : "bg-orange-400 text-white"
//                       }`}
//                     >
//                       {index === 0 ? (
//                         <Award className="w-4 h-4 md:w-5 md:h-5" />
//                       ) : (
//                         index + 1
//                       )}
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm font-medium text-gray-900 truncate">
//                         {member.name}
//                       </p>
//                       <p className="text-xs text-gray-600 mt-1">
//                         {member.conversions} conversions today
//                       </p>
//                     </div>

//                     <div className="text-right">
//                       <p className="text-sm font-medium text-gray-900">
//                         {member.revenue}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Pending Verifications - Updated to use state */}
//             <div className="rounded-xl border border-orange-200 bg-orange-50 p-4 md:p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg md:text-xl font-semibold text-gray-900">
//                   Pending Verifications
//                 </h2>
//                 <span className="bg-orange-600 text-white px-2 py-1 rounded-lg text-xs">
//                   {pendingCount}
//                 </span>
//               </div>

//               <div className="space-y-3">
//                 {pendingCount === 0 ? (
//                   <div className="text-center p-4">
//                     <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
//                     <p className="text-gray-600">All payments are verified! 🎉</p>
//                   </div>
//                 ) : (
//                   <>
//                     {pendingVerifications.slice(0, 3).map((payment, index) => (
//                       <div
//                         key={payment.id}
//                         className="p-3 bg-white border border-orange-200 rounded-lg"
//                       >
//                         <p className="text-sm font-medium text-gray-900">
//                           {payment.lead}
//                         </p>
//                         <p className="text-xs text-gray-600 mt-1">
//                           {payment.type} - {payment.amount}
//                         </p>
//                         <p className="text-xs text-gray-500 mt-1">{payment.time}</p>
//                       </div>
//                     ))}
                    
//                     {pendingCount > 3 && (
//                       <p className="text-sm text-center text-gray-600">
//                         +{pendingCount - 3} more pending...
//                       </p>
//                     )}
//                   </>
//                 )}

//                 <button
//                   onClick={() => setIsApprovalModalOpen(true)}
//                   className="w-full bg-orange-600 hover:bg-orange-700 rounded-xl text-white py-2 px-4 transition-colors text-sm md:text-base"
//                 >
//                   {pendingCount === 0 ? 'View All' : 'Review All'}
//                 </button>
//               </div>
//             </div>

//             {/* Payment Type Breakdown */}
//             <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-6">
//               <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
//                 Payment Type Breakdown
//               </h2>

//               <div className="w-full min-h-[220px] sm:min-h-[260px]">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={paymentTypeData}
//                       dataKey="value"
//                       nameKey="name"
//                       cx="50%"
//                       cy="50%"
//                       innerRadius="45%"
//                       outerRadius="75%"
//                       paddingAngle={4}
//                     >
//                       {paymentTypeData.map((item, index) => (
//                         <Cell key={index} fill={item.color} />
//                       ))}
//                     </Pie>
//                     <Legend verticalAlign="bottom" height={36} />
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ✅ Approval Modal with Working Buttons */}
//         {isApprovalModalOpen && (
//           <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-3 sm:p-4">
//             <div className="bg-white w-full max-w-xl rounded-2xl overflow-hidden flex flex-col max-h-[92vh]">
//               <div className="p-4 sm:p-6 border-b border-gray-200">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <h2 className="text-lg sm:text-xl font-bold">
//                       Approve Payments
//                     </h2>
//                     <p className="text-gray-600 mt-1 text-sm sm:text-base">
//                       Pending payments: {pendingCount}
//                     </p>
//                   </div>
//                   {pendingCount > 0 && (
//                     <button
//                       onClick={handleApproveAll}
//                       className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
//                     >
//                       Approve All
//                     </button>
//                   )}
//                 </div>
//               </div>

//               <div className="p-4 sm:p-6 space-y-4 overflow-y-auto">
//                 {pendingCount === 0 ? (
//                   <div className="text-center py-8">
//                     <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
//                     <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                       No Pending Payments
//                     </h3>
//                     <p className="text-gray-600">
//                       All payments have been reviewed and verified.
//                     </p>
//                   </div>
//                 ) : (
//                   pendingVerifications.map((p) => (
//                     <div key={p.id} className="p-4 bg-gray-50 border rounded-xl">
//                       <div className="flex justify-between items-start mb-2">
//                         <div>
//                           <p className="font-semibold text-gray-900">{p.lead}</p>
//                           <p className="text-sm text-gray-600">
//                             Executive: {p.executive}
//                           </p>
//                         </div>
//                         <TypeChip type={p.type} />
//                       </div>
                      
//                       <div className="flex justify-between items-center mb-3">
//                         <div>
//                           <p className="text-2xl font-bold text-gray-900">
//                             {p.amount}
//                           </p>
//                           <p className="text-xs text-gray-500">{p.time}</p>
//                         </div>
//                       </div>

//                       <div className="flex flex-col xs:flex-row gap-2">
//                         <button 
//                           onClick={() => handleReject(p)}
//                           className="w-full xs:w-auto px-4 py-2 border border-red-400 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
//                         >
//                           Reject
//                         </button>
//                         <button 
//                           onClick={() => handleApprove(p)}
//                           className="w-full xs:w-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
//                         >
//                           Approve
//                         </button>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>

//               <div className="p-4 sm:p-6 border-t border-gray-200 flex justify-end">
//                 <button
//                   onClick={() => setIsApprovalModalOpen(false)}
//                   className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm sm:text-base transition-colors"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// MainManagerDashboard.jsx
import React, { useMemo, useState } from "react";
import {
  DollarSign,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Award,
  Bell,
  Calendar,
  Users,
  Target,
  Clock,
  Download,
  Filter,
} from "lucide-react";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
} from "recharts";
import { Link } from "react-router-dom";

import Popup from "../../commonpopup/popup";

/* ----------------------- Mock Manager Data ----------------------- */
const initialManagerData = {
  totalRevenue: 450000,
  todayRevenue: 85000,
  leadsConverted: 124,
  paymentsVerified: 89,
  todayPayments: 12,
  pendingApprovals: 8,
  teamSize: 15,
  conversionRate: 68,
  pendingVerifications: [
    {
      id: 1,
      lead: "Sanjay Kumar",
      executive: "Rahul",
      type: "Full",
      amount: "₹45,000",
      time: "2 hours ago",
      status: "pending",
    },
    {
      id: 2,
      lead: "Priya Singh",
      executive: "Sneha",
      type: "EMI",
      amount: "₹1,20,000",
      time: "1 hour ago",
      status: "pending",
    },
    {
      id: 3,
      lead: "Rajesh Patel",
      executive: "Karthik",
      type: "Loan",
      amount: "₹85,000",
      time: "30 minutes ago",
      status: "pending",
    },
  ],
  criticalAlerts: [
    {
      type: "payment",
      priority: "high",
      message: "3 high-value payments pending verification",
    },
  ],
  topPerformersToday: [
    { name: "Rahul", conversions: 8, revenue: "₹85,000", target: 6 },
    { name: "Priya", conversions: 6, revenue: "₹72,000", target: 5 },
    { name: "Karthik", conversions: 5, revenue: "₹58,000", target: 5 },
  ],
  weeklyPerformance: [
    { day: "Mon", revenue: 65000, leads: 15, conversions: 10 },
    { day: "Tue", revenue: 72000, leads: 18, conversions: 12 },
    { day: "Wed", revenue: 81000, leads: 20, conversions: 14 },
    { day: "Thu", revenue: 78000, leads: 19, conversions: 13 },
    { day: "Fri", revenue: 95000, leads: 22, conversions: 16 },
    { day: "Sat", revenue: 52000, leads: 14, conversions: 9 },
    { day: "Sun", revenue: 38000, leads: 10, conversions: 7 },
  ],
  executivePerformance: [
    { name: "Rahul", revenue: 450000, conversions: 42, target: 40 },
    { name: "Priya", revenue: 380000, conversions: 38, target: 35 },
    { name: "Karthik", revenue: 320000, conversions: 32, target: 30 },
    { name: "Sneha", revenue: 290000, conversions: 28, target: 25 },
    { name: "Arjun", revenue: 250000, conversions: 25, target: 25 },
  ],
  leadSources: [
    { name: "Website", value: 45, color: "#3B82F6" },
    { name: "Referral", value: 25, color: "#10B981" },
    { name: "Social Media", value: 15, color: "#8B5CF6" },
    { name: "Email", value: 10, color: "#F59E0B" },
    { name: "Direct", value: 5, color: "#EF4444" },
  ],
  monthlyTarget: [
    { month: "Jan", target: 85, actual: 78 },
    { month: "Feb", target: 85, actual: 82 },
    { month: "Mar", target: 85, actual: 80 },
    { month: "Apr", target: 85, actual: 84 },
    { month: "May", target: 85, actual: 79 },
    { month: "Jun", target: 85, actual: 88 },
    { month: "Jul", target: 85, actual: 86 },
    { month: "Aug", target: 85, actual: 90 },
    { month: "Sep", target: 85, actual: 92 },
    { month: "Oct", target: 85, actual: 87 },
    { month: "Nov", target: 85, actual: 94 },
    { month: "Dec", target: 85, actual: 91 },
  ],
};

const getTodayDate = () =>
  new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

/* ---------------------- Custom Tooltip Components ---------------------- */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-900">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const RevenueTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-900">{payload[0].payload.month}</p>
        <p className="text-blue-600 text-sm">
          Revenue: ₹{(payload[0].value * 100000).toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

/* ---------------------- Chart Components ---------------------- */
const PerformanceRadialChart = ({ percentage }) => {
  const data = [
    { name: "Target", value: percentage, fill: "#10B981" }
  ];
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadialBarChart
        innerRadius="70%"
        outerRadius="100%"
        data={data}
        startAngle={180}
        endAngle={180 + (percentage * 3.6)}
      >
        <RadialBar
          background={{ fill: "#e5e7eb" }}
          dataKey="value"
          cornerRadius={10}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-2xl font-bold fill-gray-900"
        >
          {percentage}%
        </text>
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

/* ---------------------- Small responsive chips ---------------------- */
const TypeChip = ({ type }) => {
  const styles =
    type === "Full"
      ? "bg-green-50 text-green-700"
      : type === "EMI"
      ? "bg-blue-50 text-blue-700"
      : type === "Loan"
      ? "bg-orange-50 text-orange-700"
      : "bg-purple-50 text-purple-700";
  return (
    <span className={`inline-block px-2 py-1 rounded-lg text-xs ${styles}`}>
      {type}
    </span>
  );
};

const StatusChip = ({ status }) => {
  const styles =
    status === "verified"
      ? "bg-green-50 text-green-700"
      : status === "pending"
      ? "bg-orange-50 text-orange-700"
      : "bg-red-50 text-red-700";
  return (
    <span className={`inline-block px-2 py-1 rounded-lg text-xs ${styles}`}>
      {status === "verified" ? "Verified" : status === "pending" ? "Pending" : "Rejected"}
    </span>
  );
};

export default function MainManagerDashboard() {
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [managerData, setManagerData] = useState(initialManagerData);
  const [pendingVerifications, setPendingVerifications] = useState(
    initialManagerData.pendingVerifications
  );
  const [timeRange, setTimeRange] = useState("week");

  // ✅ GLOBAL POPUP STATE
  const [popup, setPopup] = useState({
    open: false,
    type: "success",
    title: "",
    message: "",
    showRetry: false,
    onRetry: null,
  });

  const openPopup = (type, title, message, extra = {}) => {
    setPopup({
      open: true,
      type,
      title,
      message,
      showRetry: false,
      onRetry: null,
      ...extra,
    });
  };

  const closePopup = () => {
    setPopup((p) => ({
      ...p,
      open: false,
      showRetry: false,
      onRetry: null,
    }));
  };

  // ✅ Filter data based on time range
  const filteredWeeklyData = useMemo(() => {
    if (timeRange === "week") return managerData.weeklyPerformance;
    if (timeRange === "month") {
      return managerData.monthlyTarget.slice(-4).map((item, index) => ({
        day: item.month,
        revenue: item.actual * 1000,
        conversions: Math.floor(item.actual * 0.6),
      }));
    }
    return managerData.weeklyPerformance;
  }, [timeRange, managerData]);

  // ✅ Derive pending count from state
  const pendingCount = pendingVerifications.length;

  // ✅ Calculate team performance metrics
  const teamMetrics = useMemo(() => {
    const totalRevenue = managerData.executivePerformance.reduce(
      (sum, exec) => sum + exec.revenue,
      0
    );
    const totalConversions = managerData.executivePerformance.reduce(
      (sum, exec) => sum + exec.conversions,
      0
    );
    const avgConversionRate = Math.round(
      (totalConversions / (managerData.executivePerformance.length * 50)) * 100
    );

    return {
      totalRevenue,
      totalConversions,
      avgConversionRate,
    };
  }, [managerData]);

  const kpis = useMemo(
    () => [
      {
        label: "Total Revenue",
        value: `₹${(teamMetrics.totalRevenue / 100000).toFixed(1)}L`,
        icon: DollarSign,
        color: "bg-green-50 text-green-600",
        trend: "+18%",
        subtext: `₹${(managerData.todayRevenue / 100000).toFixed(1)}L today`,
        chart: (
          <div className="w-16 h-10">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={managerData.weeklyPerformance.slice(-5)}>
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ),
      },
      {
        label: "Team Performance",
        value: `${teamMetrics.avgConversionRate}%`,
        icon: Users,
        color: "bg-blue-50 text-blue-600",
        trend: "+5%",
        subtext: `${managerData.teamSize} members`,
        chart: (
          <div className="w-16 h-10">
            <PerformanceRadialChart percentage={teamMetrics.avgConversionRate} />
          </div>
        ),
      },
      {
        label: "Leads Converted",
        value: teamMetrics.totalConversions.toString(),
        icon: TrendingUp,
        color: "bg-purple-50 text-purple-600",
        trend: "+12%",
        subtext: "This month",
        chart: (
          <div className="w-16 h-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={managerData.weeklyPerformance.slice(-3)}>
                <Bar dataKey="conversions" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ),
      },
      {
        label: "Pending Approvals",
        value: pendingCount.toString(),
        icon: AlertCircle,
        color: "bg-orange-50 text-orange-600",
        trend: pendingCount > 5 ? "+" : "-",
        subtext: "Needs attention",
        chart: (
          <div className="w-16 h-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[{ value: pendingCount }, { value: pendingCount - 1 }, { value: pendingCount + 2 }]}>
                <Area type="monotone" dataKey="value" stroke="#F59E0B" fill="#FEF3C7" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ),
      },
    ],
    [managerData, teamMetrics, pendingCount]
  );

  // ✅ Approve Payment Handler
  const handleApprove = (payment) => {
    console.log("APPROVED PAYMENT DATA:", payment);

    openPopup(
      "success",
      "Payment Approved",
      `${payment.lead}'s payment (${payment.amount}) has been approved.`
    );

    // Remove from pending verifications
    setPendingVerifications((prev) =>
      prev.filter((p) => p.id !== payment.id)
    );

    // Update metrics
    setManagerData((prev) => ({
      ...prev,
      paymentsVerified: prev.paymentsVerified + 1,
      todayPayments: prev.todayPayments + 1,
      todayRevenue: prev.todayRevenue + parseInt(payment.amount.replace(/[^0-9]/g, '')) || 0,
    }));
  };

  // ✅ Reject Payment Handler
  const handleReject = (payment) => {
    console.log("REJECTED PAYMENT DATA:", payment);

    openPopup(
      "failure",
      "Payment Rejected",
      `${payment.lead}'s payment (${payment.amount}) has been rejected.`
    );

    setPendingVerifications((prev) =>
      prev.filter((p) => p.id !== payment.id)
    );
  };

  // ✅ Handle Approve All
  const handleApproveAll = () => {
    if (pendingVerifications.length === 0) return;

    const totalAmount = pendingVerifications.reduce((sum, p) => {
      return sum + (parseInt(p.amount.replace(/[^0-9]/g, '')) || 0);
    }, 0);

    openPopup(
      "success",
      "All Payments Approved",
      `All ${pendingVerifications.length} pending payments (total: ₹${(totalAmount / 1000).toFixed(0)}K) have been approved.`
    );

    setManagerData((prev) => ({
      ...prev,
      paymentsVerified: prev.paymentsVerified + pendingVerifications.length,
      todayPayments: prev.todayPayments + pendingVerifications.length,
      todayRevenue: prev.todayRevenue + totalAmount,
    }));

    setPendingVerifications([]);
  };

  // ✅ Export Data Handler
  const handleExportData = () => {
    openPopup(
      "success",
      "Data Exported",
      "Dashboard data has been exported successfully.",
      {
        showRetry: false,
      }
    );
  };

  return (
    <div className="w-full bg-gray-50">
      {/* ✅ GLOBAL POPUP */}
      <Popup
        open={popup.open}
        type={popup.type}
        title={popup.title}
        message={popup.message}
        onClose={closePopup}
        showRetry={popup.showRetry}
        onRetry={popup.onRetry}
      />

      <div className="max-w-7xl mx-auto space-y-6 p-3 sm:p-6 min-w-0">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">
              Manager Overview
            </h1>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              {getTodayDate()}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <div className="flex gap-2">
              <button
                onClick={() => setTimeRange("week")}
                className={`px-3 py-1.5 rounded-lg text-sm ${timeRange === "week" ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'}`}
              >
                Week
              </button>
              <button
                onClick={() => setTimeRange("month")}
                className={`px-3 py-1.5 rounded-lg text-sm ${timeRange === "month" ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'}`}
              >
                Month
              </button>
            </div>
            
            <Link 
              to="/manager/report"
              className="w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl bg-white text-gray-700 hover:bg-gray-50 text-sm"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Reports
            </Link>

            <button
              onClick={handleExportData}
              className="w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl bg-white text-gray-700 hover:bg-gray-50 text-sm"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>

            <button
              onClick={() => setIsApprovalModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-white text-sm relative"
            >
              Approve Payments
              {pendingCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 rounded-full w-6 h-6 flex items-center justify-center text-xs text-white">
                  {pendingCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Today's Performance */}
        <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900 font-semibold text-lg md:text-xl">
                  Today's Performance
                </h3>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
                  ₹{(managerData.todayRevenue / 100000).toFixed(1)}L
                </p>
                <p className="text-gray-600 mt-1 text-sm md:text-base">
                  {managerData.todayPayments} payments • {managerData.leadsConverted} leads
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Target</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">110%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Conversion</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{managerData.conversionRate}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Team</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{managerData.teamSize}</p>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Cards with Mini Charts */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <div
                key={index}
                className="rounded-xl border border-gray-200 bg-white p-4 md:p-6 hover:shadow-lg transition-all min-w-0 group"
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 ${kpi.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>

                  <div className="flex items-center gap-1">
                    <TrendingUp
                      className={`w-3 h-3 ${
                        kpi.trend.startsWith("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    />
                    <span
                      className={`text-xs ${
                        kpi.trend.startsWith("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {kpi.trend}
                    </span>
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{kpi.label}</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-900 mt-2">
                      {kpi.value}
                    </p>
                    <p className="text-xs text-gray-600 mt-2">{kpi.subtext}</p>
                  </div>
                  <div className="ml-2">
                    {kpi.chart}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 min-w-0">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 min-w-0">
            {/* Weekly Performance Chart */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                  {timeRange === "week" ? "Weekly Performance" : "Monthly Performance"}
                </h2>
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select 
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
                  >
                    <option value="week">This Week</option>
                    <option value="month">Last 4 Months</option>
                  </select>
                </div>
              </div>

              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredWeeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="day" stroke="#6b7280" tickLine={false} />
                    <YAxis stroke="#6b7280" tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar 
                      dataKey="revenue" 
                      name="Revenue (₹)" 
                      fill="#3B82F6" 
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar 
                      dataKey="conversions" 
                      name="Conversions" 
                      fill="#10B981" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Executive Performance */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-6">
                Team Performance
              </h2>

              <div className="w-full h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={managerData.executivePerformance}
                    layout="vertical"
                    margin={{ left: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                    <XAxis type="number" stroke="#6b7280" tickLine={false} />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      stroke="#6b7280" 
                      tickLine={false}
                      width={80}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="revenue" 
                      name="Revenue (₹)" 
                      fill="#8B5CF6" 
                      radius={[0, 4, 4, 0]}
                    />
                    <Bar 
                      dataKey="conversions" 
                      name="Conversions" 
                      fill="#F59E0B" 
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4 sm:space-y-6 min-w-0">
            {/* Target vs Actual */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-6">
                Target vs Actual
              </h2>

              <div className="w-full h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={managerData.monthlyTarget.slice(-6)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" tickLine={false} />
                    <YAxis stroke="#6b7280" tickLine={false} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="target"
                      name="Target (%)"
                      stroke="#EF4444"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      name="Actual (%)"
                      stroke="#10B981"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Lead Sources */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
                Lead Sources
              </h2>

              <div className="w-full h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={managerData.leadSources}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius="40%"
                      outerRadius="70%"
                      paddingAngle={2}
                      label
                    >
                      {managerData.leadSources.map((item, index) => (
                        <Cell key={index} fill={item.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pending Verifications */}
            <div className="rounded-xl border border-orange-200 bg-orange-50 p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                  Pending Verifications
                </h2>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span className="bg-orange-600 text-white px-2 py-1 rounded-lg text-xs">
                    {pendingCount}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {pendingCount === 0 ? (
                  <div className="text-center p-4">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                    <p className="text-gray-600">All payments are verified! 🎉</p>
                  </div>
                ) : (
                  <>
                    {pendingVerifications.slice(0, 3).map((payment) => (
                      <div
                        key={payment.id}
                        className="p-3 bg-white border border-orange-200 rounded-lg hover:shadow-sm transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {payment.lead}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              {payment.type} • {payment.amount}
                            </p>
                          </div>
                          <span className="text-xs text-gray-500">{payment.time}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Executive: {payment.executive}
                        </p>
                      </div>
                    ))}
                    
                    {pendingCount > 3 && (
                      <p className="text-sm text-center text-gray-600">
                        +{pendingCount - 3} more pending...
                      </p>
                    )}
                  </>
                )}

                <button
                  onClick={() => setIsApprovalModalOpen(true)}
                  className="w-full bg-orange-600 hover:bg-orange-700 rounded-xl text-white py-2.5 px-4 transition-colors text-sm md:text-base flex items-center justify-center gap-2"
                >
                  <AlertCircle className="w-4 h-4" />
                  {pendingCount === 0 ? 'View All' : `Review ${pendingCount} Payments`}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Approval Modal */}
        {isApprovalModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-3 sm:p-4">
            <div className="bg-white w-full max-w-xl rounded-2xl overflow-hidden flex flex-col max-h-[92vh]">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold">
                      Approve Payments
                    </h2>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">
                      Pending payments: {pendingCount}
                    </p>
                  </div>
                  {pendingCount > 0 && (
                    <button
                      onClick={handleApproveAll}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve All
                    </button>
                  )}
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-4 overflow-y-auto">
                {pendingCount === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No Pending Payments
                    </h3>
                    <p className="text-gray-600">
                      All payments have been reviewed and verified.
                    </p>
                  </div>
                ) : (
                  pendingVerifications.map((p) => (
                    <div key={p.id} className="p-4 bg-gray-50 border rounded-xl hover:border-blue-300 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold text-gray-900">{p.lead}</p>
                          <p className="text-sm text-gray-600">
                            Executive: {p.executive}
                          </p>
                        </div>
                        <TypeChip type={p.type} />
                      </div>
                      
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">
                            {p.amount}
                          </p>
                          <p className="text-xs text-gray-500">{p.time}</p>
                        </div>
                        <StatusChip status={p.status} />
                      </div>

                      <div className="flex flex-col xs:flex-row gap-2">
                        <button 
                          onClick={() => handleReject(p)}
                          className="w-full xs:w-auto px-4 py-2.5 border border-red-400 hover:bg-red-50 text-red-600 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <AlertCircle className="w-4 h-4" />
                          Reject
                        </button>
                        <button 
                          onClick={() => handleApprove(p)}
                          className="w-full xs:w-auto px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-4 sm:p-6 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setIsApprovalModalOpen(false)}
                  className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm sm:text-base transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}