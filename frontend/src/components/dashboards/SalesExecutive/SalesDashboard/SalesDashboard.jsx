// import { useMemo, useState } from "react";
// import {
//   Phone,
//   Calendar,
//   Clock,
//   UserCheck,
//   PhoneCall,
//   Mail,
//   MessageSquare,
//   TrendingUp,
//   Target,
//   X,
// } from "lucide-react";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   LineChart,
//   Line,
//   AreaChart,
//   Area,
// } from "recharts";

// import MakeACall from "../../../common/MakeACall";
// import SalesEmailModal from "../salesLead/sales-lead-compo/lead-mail";
// import SalesWhatsAppModal from "../salesLead/sales-lead-compo/lead-whatsup";
// import { Link } from "react-router-dom";

// const SalesExecutiveDashboard = ({
//   userName = "Karthik",
//   onNavigate = () => {},
// }) => {
//   const [isCallModalOpen, setIsCallModalOpen] = useState(false);
//   const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
//   const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
//   const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false);
//   const [selectedLead, setSelectedLead] = useState(null);

//   // Mock Data
//   const karthikData = {
//     leadsAssigned: 24,
//     callsToday: 9,
//     talkTimeToday: 45,
//     todayFollowUps: [
//       { time: "10:00 AM", name: "Priya Sharma", note: "Discuss payment options" },
//       { time: "2:30 PM", name: "Rajesh Kumar", note: "Send contract details" },
//       { time: "4:00 PM", name: "Anita Desai", note: "Product demo follow-up" },
//     ],
//     leads: [
//       {
//         id: "1",
//         name: "Priya Sharma",
//         source: "Website",
//         status: "Hot",
//         lastContact: "2 hours ago",
//         followUp: "Today 10:00 AM",
//       },
//       {
//         id: "2",
//         name: "Rajesh Kumar",
//         source: "Referral",
//         status: "Warm",
//         lastContact: "3 hours ago",
//         followUp: "Today 2:30 PM",
//       },
//       {
//         id: "3",
//         name: "Anita Desai",
//         source: "Social Media",
//         status: "Cold",
//         lastContact: "1 day ago",
//         followUp: "Today 4:00 PM",
//       },
//       {
//         id: "4",
//         name: "Vikram Singh",
//         source: "Website",
//         status: "Hot",
//         lastContact: "2 days ago",
//         followUp: "Tomorrow 11:00 AM",
//       },
//     ],
//   };

//   const getCurrentTime = () =>
//     new Date().toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//   const getTodayDate = () =>
//     new Date().toLocaleDateString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });

//   const kpis = [
//     {
//       label: "Leads Assigned",
//       value: karthikData.leadsAssigned.toString(),
//       icon: UserCheck,
//       color: "bg-blue-50 text-blue-600",
//       change: "+4 this week",
//     },
//     {
//       label: "Calls Today",
//       value: karthikData.callsToday.toString(),
//       icon: Phone,
//       color: "bg-green-50 text-green-600",
//       change: "67% answer rate",
//     },
//     {
//       label: "Talk Time Today",
//       value: `${karthikData.talkTimeToday} min`,
//       icon: Clock,
//       color: "bg-purple-50 text-purple-600",
//       change: "+15% vs avg",
//     },
//     {
//       label: "Today's Follow-ups",
//       value: karthikData.todayFollowUps.length.toString(),
//       icon: Calendar,
//       color: "bg-orange-50 text-orange-600",
//       change: "3 remaining",
//     },
//   ];

//   const leads = karthikData.leads;

//   const leadMapByName = useMemo(() => {
//     const map = new Map();
//     leads.forEach((l) => map.set(l.name, l));
//     return map;
//   }, [leads]);

//   const activities = [
//     {
//       type: "call",
//       title: "Called Priya Sharma",
//       time: "2 hours ago",
//       result: "Interested - Follow up needed",
//     },
//     {
//       type: "email",
//       title: "Sent payment link to Rajesh Kumar",
//       time: "3 hours ago",
//       result: "Email opened",
//     },
//     {
//       type: "whatsapp",
//       title: "WhatsApp message to Anita Desai",
//       time: "4 hours ago",
//       result: "Read",
//     },
//     {
//       type: "call",
//       title: "Called Vikram Singh",
//       time: "5 hours ago",
//       result: "Not picked - Will try later",
//     },
//   ];

//   const funnelData = [
//     { stage: "Leads", count: 24, color: "#3B82F6" },
//     { stage: "Contacted", count: 18, color: "#8B5CF6" },
//     { stage: "Payment Sent", count: 12, color: "#F59E0B" },
//     { stage: "Paid", count: 6, color: "#10B981" },
//   ];

//   const performanceData = [
//     { day: "Mon", calls: 8, leads: 5, conversions: 2 },
//     { day: "Tue", calls: 12, leads: 7, conversions: 3 },
//     { day: "Wed", calls: 10, leads: 6, conversions: 4 },
//     { day: "Thu", calls: 15, leads: 9, conversions: 5 },
//     { day: "Fri", calls: 9, leads: 5, conversions: 3 },
//     { day: "Sat", calls: 6, leads: 3, conversions: 1 },
//     { day: "Sun", calls: 4, leads: 2, conversions: 1 },
//   ];

//   const leadSourceData = [
//     { name: "Website", value: 12, color: "#3B82F6" },
//     { name: "Referral", value: 6, color: "#10B981" },
//     { name: "Social Media", value: 4, color: "#F59E0B" },
//     { name: "Google Ads", value: 2, color: "#EF4444" },
//   ];

//   const statusData = [
//     { status: "Hot", count: 8 },
//     { status: "Warm", count: 10 },
//     { status: "Cold", count: 6 },
//   ];

//   const todayGoal = {
//     target: 15,
//     completed: karthikData.callsToday,
//     percentage: Math.round((karthikData.callsToday / 15) * 100),
//   };

//   const followUps = [
//     { date: "11", day: "Today", count: 3, isToday: true },
//     { date: "12", day: "Tue", count: 3 },
//     { date: "13", day: "Wed", count: 5 },
//     { date: "14", day: "Thu", count: 2 },
//     { date: "15", day: "Fri", count: 4 },
//   ];

//   const handleCall = (lead) => {
//     setSelectedLead(lead);
//     setIsCallModalOpen(true);
//   };
//   const handleWhatsApp = (lead) => {
//     setSelectedLead(lead);
//     setIsWhatsAppModalOpen(true);
//   };
//   const handleEmail = (lead) => {
//     setSelectedLead(lead);
//     setIsEmailModalOpen(true);
//   };
//   const handleFollowUp = (lead) => {
//     setSelectedLead(lead);
//     setIsFollowUpModalOpen(true);
//   };

//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
//           <p className="font-medium text-gray-900">{label}</p>
//           {payload.map((entry, index) => (
//             <p key={index} style={{ color: entry.color }}>
//               {entry.name}: {entry.value}
//             </p>
//           ))}
//         </div>
//       );
//     }
//     return null;
//   };

//   const FollowUpModal = ({ isOpen, onClose, lead }) => {
//     if (!isOpen) return null;
//     return (
//       <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
//         <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
//           <div className="flex items-center justify-between p-4 sm:p-6 border-b">
//             <h3 className="text-lg font-semibold">Schedule Follow-up</h3>
//             <button onClick={onClose}>
//               <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
//             </button>
//           </div>
//           <div className="p-4 sm:p-6 space-y-4">
//             <p className="text-sm sm:text-base">
//               Schedule follow-up for <strong>{lead?.name}</strong>
//             </p>
//             <input
//               type="datetime-local"
//               className="w-full border rounded-lg p-3 text-sm"
//             />
//             <textarea
//               className="w-full border rounded-lg p-3 min-h-[80px] text-sm"
//               placeholder="Notes..."
//             />
//             <div className="flex flex-col sm:flex-row gap-3">
//               <button
//                 onClick={onClose}
//                 className="flex-1 px-4 py-2 border rounded-lg text-sm"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={onClose}
//                 className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg text-sm"
//               >
//                 Schedule
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const StatusBadge = ({ status }) => (
//     <span
//       className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
//         status === "Hot"
//           ? "bg-red-100 text-red-800"
//           : status === "Warm"
//           ? "bg-orange-100 text-orange-800"
//           : "bg-blue-100 text-blue-800"
//       }`}
//     >
//       {status}
//     </span>
//   );

//   return (
//     <div className="w-full bg-gray-50 overflow-x-hidden">
//       <main className="max-w-7xl mx-auto p-3 sm:p-4 lg:p-6 space-y-6 min-w-0">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//           <div className="min-w-0">
//             <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
//             <p className="text-gray-500 mt-1 text-sm sm:text-base">
//               Hi, {userName} 👋 · {getTodayDate()}
//             </p>
//           </div>
//           <Link
//             to={'/salesexecutive/lead-list'}
//             onClick={() => onNavigate("")}
//             className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 text-sm"
//           >
//             View All Leads
//           </Link>
//         </div>

//         {/* Today's Goal */}
//         <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6">
//           <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
//             <div className="flex items-start sm:items-center gap-4">
//               <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
//                 <Target className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
//               </div>
//               <div className="min-w-0">
//                 <h3 className="text-lg font-semibold text-gray-900">
//                   Today's Call Goal
//                 </h3>
//                 <p className="text-gray-600 mt-1 text-sm sm:text-base">
//                   {todayGoal.completed} of {todayGoal.target} calls completed ·{" "}
//                   {getCurrentTime()}
//                 </p>
//               </div>
//             </div>

//             <div className="w-full lg:w-auto text-left lg:text-right">
//               <p className="text-2xl lg:text-3xl font-semibold">
//                 {todayGoal.percentage}%
//               </p>
//               <div className="w-full lg:w-32 bg-gray-200 rounded-full h-2 mt-2">
//                 <div
//                   className="bg-green-600 h-2 rounded-full"
//                   style={{ width: `${todayGoal.percentage}%` }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* KPI Cards */}
//         <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
//           {kpis.map((kpi, index) => {
//             const Icon = kpi.icon;
//             return (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl border p-4 hover:shadow-md min-w-0"
//               >
//                 <div className="flex items-center justify-between mb-4 gap-2">
//                   <div
//                     className={`w-10 h-10 ${kpi.color} rounded-xl flex items-center justify-center shrink-0`}
//                   >
//                     <Icon className="w-5 h-5" />
//                   </div>
//                   <TrendingUp className="w-4 h-4 text-green-600 shrink-0" />
//                 </div>
//                 <p className="text-sm text-gray-500">{kpi.label}</p>
//                 <p className="text-xl font-semibold mt-2 truncate">
//                   {kpi.value}
//                 </p>
//                 <p className="text-xs text-gray-600 mt-2">{kpi.change}</p>
//               </div>
//             );
//           })}
//         </div>

//         {/* Main Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-w-0">
//           {/* Left */}
//           <div className="lg:col-span-2 space-y-6 min-w-0">
//             {/* Lead Quick View - MOBILE CARDS */}
//             <div className="block lg:hidden space-y-3">
//               {leads.map((lead) => (
//                 <div
//                   key={lead.id}
//                   className="bg-white border rounded-xl p-4"
//                 >
//                   <div className="flex items-start justify-between gap-2">
//                     <button
//                       onClick={() => onNavigate("lead-detail", lead.id)}
//                       className="text-blue-600 font-medium text-left truncate"
//                     >
//                       {lead.name}
//                     </button>
//                     <StatusBadge status={lead.status} />
//                   </div>

//                   <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-700">
//                     <div>
//                       <span className="text-gray-500">Source:</span>{" "}
//                       {lead.source}
//                     </div>
//                     <div>
//                       <span className="text-gray-500">Last:</span>{" "}
//                       {lead.lastContact}
//                     </div>
//                     <div className="col-span-2">
//                       <span className="text-gray-500">Follow-up:</span>{" "}
//                       {lead.followUp}
//                     </div>
//                   </div>

//                   <div className="flex gap-1 mt-3">
//                     <button
//                       onClick={() => handleCall(lead)}
//                       className="flex-1 py-2 border rounded-lg text-green-700 text-sm hover:bg-green-50 flex items-center justify-center gap-2"
//                     >
//                       <Phone className="w-4 h-4" /> Call
//                     </button>
//                     <button
//                       onClick={() => handleEmail(lead)}
//                       className="flex-1 py-2 border rounded-lg text-blue-700 text-sm hover:bg-blue-50 flex items-center justify-center gap-2"
//                     >
//                       <Mail className="w-4 h-4" /> Email
//                     </button>
//                     <button
//                       onClick={() => handleWhatsApp(lead)}
//                       className="flex-1 py-2 border rounded-lg text-green-700 text-sm hover:bg-green-50 flex items-center justify-center gap-2"
//                     >
//                       <MessageSquare className="w-4 h-4" /> WA
//                     </button>
//                   </div>

//                   <button
//                     onClick={() => handleFollowUp(lead)}
//                     className="w-full mt-2 py-2 border rounded-lg text-orange-700 text-sm hover:bg-orange-50 flex items-center justify-center gap-2"
//                   >
//                     <Calendar className="w-4 h-4" />
//                     Schedule Follow-up
//                   </button>
//                 </div>
//               ))}
//             </div>

//             {/* Lead Quick View - DESKTOP TABLE */}
//             <div className="hidden lg:block bg-white rounded-xl border overflow-hidden min-w-0">
//               <div className="p-4 border-b">
//                 <h2 className="text-lg font-semibold">Lead Quick View</h2>
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="w-full min-w-[700px]">
//                   <thead>
//                     <tr className="border-b bg-gray-50">
//                       <th className="text-left p-4 text-sm font-medium">
//                         Lead Name
//                       </th>
//                       <th className="text-left p-4 text-sm font-medium">
//                         Source
//                       </th>
//                       <th className="text-left p-4 text-sm font-medium">
//                         Status
//                       </th>
//                       <th className="text-left p-4 text-sm font-medium">
//                         Last Contact
//                       </th>
//                       <th className="text-left p-4 text-sm font-medium">
//                         Follow-up
//                       </th>
//                       <th className="text-left p-4 text-sm font-medium">
//                         Action
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {leads.map((lead) => (
//                       <tr key={lead.id} className="border-b hover:bg-gray-50">
//                         <td className="p-4">
//                           <button
//                             onClick={() => onNavigate("lead-detail", lead.id)}
//                             className="text-blue-600 hover:text-blue-800 text-left"
//                           >
//                             {lead.name}
//                           </button>
//                         </td>

//                         <td className="p-4 text-gray-600">{lead.source}</td>

//                         <td className="p-4">
//                           <StatusBadge status={lead.status} />
//                         </td>

//                         <td className="p-4 text-gray-600">
//                           {lead.lastContact}
//                         </td>

//                         <td className="p-4 text-gray-600">{lead.followUp}</td>

//                         <td className="p-4">
//                           <div className="flex gap-1">
//                             <button
//                               onClick={() => handleCall(lead)}
//                               className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg"
//                               title="Call"
//                             >
//                               <Phone className="w-4 h-4" />
//                             </button>
//                             <button
//                               onClick={() => handleEmail(lead)}
//                               className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
//                               title="Email"
//                             >
//                               <Mail className="w-4 h-4" />
//                             </button>
//                             <button
//                               onClick={() => handleWhatsApp(lead)}
//                               className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg"
//                               title="WhatsApp"
//                             >
//                               <MessageSquare className="w-4 h-4" />
//                             </button>
//                             <button
//                               onClick={() => handleFollowUp(lead)}
//                               className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg"
//                               title="Follow-up"
//                             >
//                               <Calendar className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Charts */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 min-w-0">
//               {/* Funnel */}
//               <div className="bg-white rounded-xl border p-4 sm:p-6 min-w-0">
//                 <h2 className="text-lg font-semibold mb-4">
//                   Lead Conversion Funnel
//                 </h2>

//                 {/* ✅ FIX: explicit height so ResponsiveContainer can render */}
//                 <div className="w-full h-[260px] sm:h-[300px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <BarChart data={funnelData} margin={{ left: 0, right: 8 }}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="stage" interval={0} />
//                       <YAxis />
//                       <Tooltip content={<CustomTooltip />} />
//                       <Bar dataKey="count" radius={[10, 10, 0, 0]}>
//                         {funnelData.map((entry, index) => (
//                           <Cell key={index} fill={entry.color} />
//                         ))}
//                       </Bar>
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>

//               {/* Weekly Performance */}
//               <div className="bg-white rounded-xl border p-4 sm:p-6 min-w-0">
//                 <h2 className="text-lg font-semibold mb-4">
//                   Weekly Performance
//                 </h2>
//                 <div className="w-full h-[260px] sm:h-[300px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <LineChart data={performanceData} margin={{ left: 0, right: 8 }}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="day" />
//                       <YAxis />
//                       <Tooltip content={<CustomTooltip />} />
//                       <Legend />
//                       <Line
//                         type="monotone"
//                         dataKey="calls"
//                         stroke="#3B82F6"
//                         strokeWidth={2}
//                       />
//                       <Line
//                         type="monotone"
//                         dataKey="leads"
//                         stroke="#10B981"
//                         strokeWidth={2}
//                       />
//                       <Line
//                         type="monotone"
//                         dataKey="conversions"
//                         stroke="#F59E0B"
//                         strokeWidth={2}
//                       />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>

//               {/* Lead Sources */}
//               <div className="bg-white rounded-xl border p-4 sm:p-6 min-w-0">
//                 <h2 className="text-lg font-semibold mb-4">Lead Sources</h2>
//                 <div className="w-full h-[260px] sm:h-[300px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <PieChart>
//                       <Pie
//                         data={leadSourceData}
//                         dataKey="value"
//                         nameKey="name"
//                         cx="50%"
//                         cy="50%"
//                         outerRadius="75%"
//                         labelLine={false}
//                         label={({ name, percent }) =>
//                           percent > 0.08
//                             ? `${name} ${(percent * 100).toFixed(0)}%`
//                             : ""
//                         }
//                       >
//                         {leadSourceData.map((entry, index) => (
//                           <Cell key={index} fill={entry.color} />
//                         ))}
//                       </Pie>
//                       <Tooltip content={<CustomTooltip />} />
//                       <Legend verticalAlign="bottom" iconType="circle" />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>

//               {/* Status */}
//               <div className="bg-white rounded-xl border p-4 sm:p-6 min-w-0">
//                 <h2 className="text-lg font-semibold mb-4">
//                   Lead Status Distribution
//                 </h2>
//                 <div className="w-full h-[260px] sm:h-[300px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <AreaChart data={statusData} margin={{ left: 0, right: 8 }}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="status" />
//                       <YAxis />
//                       <Tooltip content={<CustomTooltip />} />
//                       <Area
//                         type="monotone"
//                         dataKey="count"
//                         stroke="#8884d8"
//                         fill="#8884d8"
//                         fillOpacity={0.6}
//                       />
//                     </AreaChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right */}
//           <div className="space-y-6 min-w-0">
//             {/* Today's Followups */}
//             <div className="bg-white rounded-xl border min-w-0">
//               <div className="p-4 border-b flex flex-wrap items-center justify-between gap-2">
//                 <h2 className="text-lg font-semibold">Today's Follow-ups</h2>
//                 <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
//                   {karthikData.todayFollowUps.length} Scheduled
//                 </span>
//               </div>
//               <div className="p-4 space-y-3">
//                 {karthikData.todayFollowUps.map((followUp, index) => {
//                   const lead = leadMapByName.get(followUp.name);
//                   return (
//                     <div
//                       key={index}
//                       className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-orange-50 border rounded-lg gap-3"
//                     >
//                       <div className="min-w-0">
//                         <p className="text-sm font-medium truncate">
//                           {followUp.time} · {followUp.name}
//                         </p>
//                         <p className="text-xs text-gray-600 mt-1">
//                           {followUp.note}
//                         </p>
//                       </div>
//                       <button
//                         onClick={() => lead && handleCall(lead)}
//                         className="w-full sm:w-auto px-3 py-1.5 border text-orange-700 rounded-lg hover:bg-orange-100 text-sm"
//                       >
//                         Call
//                       </button>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Week schedule */}
//             <div className="bg-white rounded-xl border min-w-0">
//               <div className="p-4 border-b">
//                 <h2 className="text-lg font-semibold">
//                   This Week's Schedule
//                 </h2>
//               </div>
//               <div className="p-4 space-y-3">
//                 {followUps.map((day, index) => (
//                   <div
//                     key={index}
//                     className={`flex items-center justify-between p-3 rounded-lg ${
//                       day.isToday ? "bg-blue-50 border" : "bg-gray-50"
//                     }`}
//                   >
//                     <div>
//                       <p className="text-sm font-medium">
//                         {day.date} · {day.day}
//                       </p>
//                       <p className="text-xs text-gray-600">
//                         {day.count} follow-ups
//                       </p>
//                     </div>
//                     {day.isToday && (
//                       <span className="bg-blue-100 text-blue-800 text-xs px-2 rounded-full">
//                         Today
//                       </span>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Activity */}
//             <div className="bg-white rounded-xl border min-w-0">
//               <div className="p-4 border-b">
//                 <h2 className="text-lg font-semibold">Recent Activity</h2>
//               </div>
//               <div className="p-4 space-y-4">
//                 {activities.map((activity, index) => (
//                   <div key={index} className="flex gap-3">
//                     <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
//                       {activity.type === "call" && (
//                         <Phone className="w-4 h-4 text-green-600" />
//                       )}
//                       {activity.type === "email" && (
//                         <Mail className="w-4 h-4 text-blue-600" />
//                       )}
//                       {activity.type === "whatsapp" && (
//                         <MessageSquare className="w-4 h-4 text-green-600" />
//                       )}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm font-medium truncate">
//                         {activity.title}
//                       </p>
//                       <p className="text-xs text-gray-500">{activity.time}</p>
//                       <p className="text-xs text-gray-600">
//                         {activity.result}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Floating Quick Call */}
//         <button
//           onClick={() => setIsCallModalOpen(true)}
//           className="fixed bottom-6 sm:bottom-8 right-4 sm:right-8 w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg flex items-center justify-center z-40"
//           aria-label="Quick call"
//         >
//           <PhoneCall className="w-6 h-6" />
//         </button>

//         {/* Modals */}
//         <MakeACall
//           isOpen={isCallModalOpen}
//           onClose={() => setIsCallModalOpen(false)}
//           lead={selectedLead}
//         />

//         <SalesEmailModal
//           isOpen={isEmailModalOpen}
//           onClose={() => setIsEmailModalOpen(false)}
//           lead={selectedLead}
//         />

//         <SalesWhatsAppModal
//           isOpen={isWhatsAppModalOpen}
//           onClose={() => setIsWhatsAppModalOpen(false)}
//           lead={selectedLead}
//         />

//         <FollowUpModal
//           isOpen={isFollowUpModalOpen}
//           onClose={() => setIsFollowUpModalOpen(false)}
//           lead={selectedLead}
//         />
//       </main>
//     </div>
//   );
// };

// export default SalesExecutiveDashboard;


import { useMemo, useState } from "react";
import {
  Phone,
  Calendar,
  Clock,
  UserCheck,
  PhoneCall,
  Mail,
  MessageSquare,
  TrendingUp,
  Target,
  X,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

import MakeACall from "../../../common/MakeACall";
import SalesEmailModal from "../salesLead/sales-lead-compo/lead-mail";
import SalesWhatsAppModal from "../salesLead/sales-lead-compo/lead-whatsup";
import { Link } from "react-router-dom";

const SalesExecutiveDashboard = ({
  userName = "Karthik",
  onNavigate = () => {},
}) => {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  // Mock Data
  const karthikData = {
    leadsAssigned: 24,
    callsToday: 9,
    talkTimeToday: 45,
    todayFollowUps: [
      { time: "10:00 AM", name: "Priya Sharma", note: "Discuss payment options" },
      { time: "2:30 PM", name: "Rajesh Kumar", note: "Send contract details" },
      { time: "4:00 PM", name: "Anita Desai", note: "Product demo follow-up" },
    ],
    leads: [
      {
        id: "1",
        name: "Priya Sharma",
        source: "Website",
        status: "Hot",
        lastContact: "2 hours ago",
        followUp: "Today 10:00 AM",
      },
      {
        id: "2",
        name: "Rajesh Kumar",
        source: "Referral",
        status: "Warm",
        lastContact: "3 hours ago",
        followUp: "Today 2:30 PM",
      },
      {
        id: "3",
        name: "Anita Desai",
        source: "Social Media",
        status: "Cold",
        lastContact: "1 day ago",
        followUp: "Today 4:00 PM",
      },
      {
        id: "4",
        name: "Vikram Singh",
        source: "Website",
        status: "Hot",
        lastContact: "2 days ago",
        followUp: "Tomorrow 11:00 AM",
      },
    ],
  };

  const getCurrentTime = () =>
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const getTodayDate = () =>
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const kpis = [
    {
      label: "Leads Assigned",
      value: karthikData.leadsAssigned.toString(),
      icon: UserCheck,
      color: "bg-blue-50 text-blue-600",
      change: "+4 this week",
    },
    {
      label: "Calls Today",
      value: karthikData.callsToday.toString(),
      icon: Phone,
      color: "bg-green-50 text-green-600",
      change: "67% answer rate",
    },
    {
      label: "Talk Time Today",
      value: `${karthikData.talkTimeToday} min`,
      icon: Clock,
      color: "bg-purple-50 text-purple-600",
      change: "+15% vs avg",
    },
    {
      label: "Today's Follow-ups",
      value: karthikData.todayFollowUps.length.toString(),
      icon: Calendar,
      color: "bg-orange-50 text-orange-600",
      change: "3 remaining",
    },
  ];

  const leads = karthikData.leads;

  const leadMapByName = useMemo(() => {
    const map = new Map();
    leads.forEach((l) => map.set(l.name, l));
    return map;
  }, [leads]);

  const activities = [
    {
      type: "call",
      title: "Called Priya Sharma",
      time: "2 hours ago",
      result: "Interested - Follow up needed",
    },
    {
      type: "email",
      title: "Sent payment link to Rajesh Kumar",
      time: "3 hours ago",
      result: "Email opened",
    },
    {
      type: "whatsapp",
      title: "WhatsApp message to Anita Desai",
      time: "4 hours ago",
      result: "Read",
    },
    {
      type: "call",
      title: "Called Vikram Singh",
      time: "5 hours ago",
      result: "Not picked - Will try later",
    },
  ];

  const funnelData = [
    { stage: "Leads", count: 24, color: "#3B82F6" },
    { stage: "Contacted", count: 18, color: "#8B5CF6" },
    { stage: "Payment Sent", count: 12, color: "#F59E0B" },
    { stage: "Paid", count: 6, color: "#10B981" },
  ];

  const performanceData = [
    { day: "Mon", calls: 8, leads: 5, conversions: 2 },
    { day: "Tue", calls: 12, leads: 7, conversions: 3 },
    { day: "Wed", calls: 10, leads: 6, conversions: 4 },
    { day: "Thu", calls: 15, leads: 9, conversions: 5 },
    { day: "Fri", calls: 9, leads: 5, conversions: 3 },
    { day: "Sat", calls: 6, leads: 3, conversions: 1 },
    { day: "Sun", calls: 4, leads: 2, conversions: 1 },
  ];

  const leadSourceData = [
    { name: "Website", value: 12, color: "#3B82F6" },
    { name: "Referral", value: 6, color: "#10B981" },
    { name: "Social Media", value: 4, color: "#F59E0B" },
    { name: "Google Ads", value: 2, color: "#EF4444" },
  ];

  const statusData = [
    { status: "Hot", count: 8 },
    { status: "Warm", count: 10 },
    { status: "Cold", count: 6 },
  ];

  const todayGoal = {
    target: 15,
    completed: karthikData.callsToday,
    percentage: Math.round((karthikData.callsToday / 15) * 100),
  };

  const followUps = [
    { date: "11", day: "Today", count: 3, isToday: true },
    { date: "12", day: "Tue", count: 3 },
    { date: "13", day: "Wed", count: 5 },
    { date: "14", day: "Thu", count: 2 },
    { date: "15", day: "Fri", count: 4 },
  ];

  const handleCall = (lead) => {
    setSelectedLead(lead);
    setIsCallModalOpen(true);
  };
  const handleWhatsApp = (lead) => {
    setSelectedLead(lead);
    setIsWhatsAppModalOpen(true);
  };
  const handleEmail = (lead) => {
    setSelectedLead(lead);
    setIsEmailModalOpen(true);
  };
  const handleFollowUp = (lead) => {
    setSelectedLead(lead);
    setIsFollowUpModalOpen(true);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const FollowUpModal = ({ isOpen, onClose, lead }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b">
            <h3 className="text-lg font-semibold">Schedule Follow-up</h3>
            <button onClick={onClose}>
              <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
            </button>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            <p className="text-sm sm:text-base">
              Schedule follow-up for <strong>{lead?.name}</strong>
            </p>
            <input
              type="datetime-local"
              className="w-full border rounded-lg p-3 text-sm shadow-sm"
            />
            <textarea
              className="w-full border rounded-lg p-3 min-h-[80px] text-sm shadow-sm"
              placeholder="Notes..."
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border rounded-lg text-sm shadow-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg text-sm shadow-md hover:bg-orange-700"
              >
                Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const StatusBadge = ({ status }) => (
    <span
      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium shadow-sm ${
        status === "Hot"
          ? "bg-red-100 text-red-800 shadow-red-100"
          : status === "Warm"
          ? "bg-orange-100 text-orange-800 shadow-orange-100"
          : "bg-blue-100 text-blue-800 shadow-blue-100"
      }`}
    >
      {status}
    </span>
  );

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-x-hidden">
      <main className="max-w-7xl mx-auto p-3 sm:p-4 lg:p-6 space-y-6 min-w-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              Hi, {userName} 👋 · {getTodayDate()}
            </p>
          </div>
          <Link
            to={'/salesexecutive/lead-list'}
            onClick={() => onNavigate("")}
            className="w-full sm:w-auto px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg text-sm hover:bg-gray-50 transition-shadow"
          >
            View All Leads
          </Link>
        </div>

        {/* Today's Goal */}
        <div className="rounded-xl shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md shrink-0">
                <Target className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-gray-900">
                  Today's Call Goal
                </h3>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                  {todayGoal.completed} of {todayGoal.target} calls completed ·{" "}
                  {getCurrentTime()}
                </p>
              </div>
            </div>

            <div className="w-full lg:w-auto text-left lg:text-right">
              <p className="text-2xl lg:text-3xl font-semibold">
                {todayGoal.percentage}%
              </p>
              <div className="w-full lg:w-32 bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full shadow-sm"
                  style={{ width: `${todayGoal.percentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-lg p-4 transition-all duration-200 hover:-translate-y-1 min-w-0"
              >
                <div className="flex items-center justify-between mb-4 gap-2">
                  <div
                    className={`w-10 h-10 ${kpi.color} rounded-xl flex items-center justify-center shadow-sm shrink-0`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-600 shrink-0" />
                </div>
                <p className="text-sm text-gray-500">{kpi.label}</p>
                <p className="text-xl font-semibold mt-2 truncate">
                  {kpi.value}
                </p>
                <p className="text-xs text-gray-600 mt-2">{kpi.change}</p>
              </div>
            );
          })}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-w-0">
          {/* Left */}
          <div className="lg:col-span-2 space-y-6 min-w-0">
            {/* Lead Quick View - MOBILE CARDS */}
            <div className="block lg:hidden space-y-3">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="bg-white rounded-xl shadow-md p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <button
                      onClick={() => onNavigate("lead-detail", lead.id)}
                      className="text-blue-600 font-medium text-left truncate"
                    >
                      {lead.name}
                    </button>
                    <StatusBadge status={lead.status} />
                  </div>

                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-700">
                    <div>
                      <span className="text-gray-500">Source:</span>{" "}
                      {lead.source}
                    </div>
                    <div>
                      <span className="text-gray-500">Last:</span>{" "}
                      {lead.lastContact}
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-500">Follow-up:</span>{" "}
                      {lead.followUp}
                    </div>
                  </div>

                  <div className="flex gap-1 mt-3">
                    <button
                      onClick={() => handleCall(lead)}
                      className="flex-1 py-2 bg-white rounded-lg text-green-700 text-sm shadow-sm hover:shadow-md hover:bg-green-50 flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" /> Call
                    </button>
                    <button
                      onClick={() => handleEmail(lead)}
                      className="flex-1 py-2 bg-white rounded-lg text-blue-700 text-sm shadow-sm hover:shadow-md hover:bg-blue-50 flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4" /> Email
                    </button>
                    <button
                      onClick={() => handleWhatsApp(lead)}
                      className="flex-1 py-2 bg-white rounded-lg text-green-700 text-sm shadow-sm hover:shadow-md hover:bg-green-50 flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" /> WA
                    </button>
                  </div>

                  <button
                    onClick={() => handleFollowUp(lead)}
                    className="w-full mt-2 py-2 bg-white rounded-lg text-orange-700 text-sm shadow-sm hover:shadow-md hover:bg-orange-50 flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Schedule Follow-up
                  </button>
                </div>
              ))}
            </div>

            {/* Lead Quick View - DESKTOP TABLE */}
            <div className="hidden lg:block bg-white rounded-xl shadow-md overflow-hidden min-w-0">
              <div className="p-4 border-b bg-gradient-to-r from-gray-50 to-white">
                <h2 className="text-lg font-semibold">Lead Quick View</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <th className="text-left p-4 text-sm font-medium">
                        Lead Name
                      </th>
                      <th className="text-left p-4 text-sm font-medium">
                        Source
                      </th>
                      <th className="text-left p-4 text-sm font-medium">
                        Status
                      </th>
                      <th className="text-left p-4 text-sm font-medium">
                        Last Contact
                      </th>
                      <th className="text-left p-4 text-sm font-medium">
                        Follow-up
                      </th>
                      <th className="text-left p-4 text-sm font-medium">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead, index) => (
                      <tr 
                        key={lead.id} 
                        className={`hover:bg-gray-50 ${
                          index < leads.length - 1 ? 'border-b border-gray-100' : ''
                        }`}
                      >
                        <td className="p-4">
                          <button
                            onClick={() => onNavigate("lead-detail", lead.id)}
                            className="text-blue-600 hover:text-blue-800 text-left"
                          >
                            {lead.name}
                          </button>
                        </td>

                        <td className="p-4 text-gray-600">{lead.source}</td>

                        <td className="p-4">
                          <StatusBadge status={lead.status} />
                        </td>

                        <td className="p-4 text-gray-600">
                          {lead.lastContact}
                        </td>

                        <td className="p-4 text-gray-600">{lead.followUp}</td>

                        <td className="p-4">
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleCall(lead)}
                              className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg shadow-sm hover:shadow"
                              title="Call"
                            >
                              <Phone className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEmail(lead)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg shadow-sm hover:shadow"
                              title="Email"
                            >
                              <Mail className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleWhatsApp(lead)}
                              className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg shadow-sm hover:shadow"
                              title="WhatsApp"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleFollowUp(lead)}
                              className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg shadow-sm hover:shadow"
                              title="Follow-up"
                            >
                              <Calendar className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 min-w-0">
              {/* Funnel */}
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 min-w-0">
                <h2 className="text-lg font-semibold mb-4">
                  Lead Conversion Funnel
                </h2>
                <div className="w-full h-[260px] sm:h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={funnelData} margin={{ left: 0, right: 8 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="stage" interval={0} />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                        {funnelData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Weekly Performance */}
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 min-w-0">
                <h2 className="text-lg font-semibold mb-4">
                  Weekly Performance
                </h2>
                <div className="w-full h-[260px] sm:h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData} margin={{ left: 0, right: 8 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="calls"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="leads"
                        stroke="#10B981"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="conversions"
                        stroke="#F59E0B"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Lead Sources */}
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 min-w-0">
                <h2 className="text-lg font-semibold mb-4">Lead Sources</h2>
                <div className="w-full h-[260px] sm:h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={leadSourceData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius="75%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          percent > 0.08
                            ? `${name} ${(percent * 100).toFixed(0)}%`
                            : ""
                        }
                      >
                        {leadSourceData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend verticalAlign="bottom" iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Status */}
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 min-w-0">
                <h2 className="text-lg font-semibold mb-4">
                  Lead Status Distribution
                </h2>
                <div className="w-full h-[260px] sm:h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={statusData} margin={{ left: 0, right: 8 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="status" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="count"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-6 min-w-0">
            {/* Today's Followups */}
            <div className="bg-white rounded-xl shadow-md min-w-0">
              <div className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-t-xl">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-lg font-semibold">Today's Follow-ups</h2>
                  <span className="bg-gradient-to-r from-orange-100 to-orange-50 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full shadow-sm">
                    {karthikData.todayFollowUps.length} Scheduled
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {karthikData.todayFollowUps.map((followUp, index) => {
                  const lead = leadMapByName.get(followUp.name);
                  return (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg shadow-sm gap-3"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">
                          {followUp.time} · {followUp.name}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {followUp.note}
                        </p>
                      </div>
                      <button
                        onClick={() => lead && handleCall(lead)}
                        className="w-full sm:w-auto px-3 py-1.5 bg-white text-orange-700 rounded-lg shadow-sm hover:shadow-md hover:bg-orange-50 text-sm"
                      >
                        Call
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Week schedule */}
            <div className="bg-white rounded-xl shadow-md min-w-0">
              <div className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-t-xl">
                <h2 className="text-lg font-semibold">
                  This Week's Schedule
                </h2>
              </div>
              <div className="p-4 space-y-3">
                {followUps.map((day, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg shadow-sm ${
                      day.isToday 
                        ? "bg-gradient-to-r from-blue-50 to-blue-100" 
                        : "bg-gradient-to-r from-gray-50 to-gray-100"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {day.date} · {day.day}
                      </p>
                      <p className="text-xs text-gray-600">
                        {day.count} follow-ups
                      </p>
                    </div>
                    {day.isToday && (
                      <span className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 text-xs px-2 rounded-full shadow-sm">
                        Today
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Activity */}
            <div className="bg-white rounded-xl shadow-md min-w-0">
              <div className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-t-xl">
                <h2 className="text-lg font-semibold">Recent Activity</h2>
              </div>
              <div className="p-4 space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-sm shrink-0">
                      {activity.type === "call" && (
                        <Phone className="w-4 h-4 text-green-600" />
                      )}
                      {activity.type === "email" && (
                        <Mail className="w-4 h-4 text-blue-600" />
                      )}
                      {activity.type === "whatsapp" && (
                        <MessageSquare className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                      <p className="text-xs text-gray-600">
                        {activity.result}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Quick Call */}
        <button
          onClick={() => setIsCallModalOpen(true)}
          className="fixed bottom-6 sm:bottom-8 right-4 sm:right-8 w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full shadow-xl flex items-center justify-center z-40 transition-all hover:scale-110"
          aria-label="Quick call"
        >
          <PhoneCall className="w-6 h-6" />
        </button>

        {/* Modals */}
        <MakeACall
          isOpen={isCallModalOpen}
          onClose={() => setIsCallModalOpen(false)}
          lead={selectedLead}
        />

        <SalesEmailModal
          isOpen={isEmailModalOpen}
          onClose={() => setIsEmailModalOpen(false)}
          lead={selectedLead}
        />

        <SalesWhatsAppModal
          isOpen={isWhatsAppModalOpen}
          onClose={() => setIsWhatsAppModalOpen(false)}
          lead={selectedLead}
        />

        <FollowUpModal
          isOpen={isFollowUpModalOpen}
          onClose={() => setIsFollowUpModalOpen(false)}
          lead={selectedLead}
        />
      </main>
    </div>
  );
};

export default SalesExecutiveDashboard;