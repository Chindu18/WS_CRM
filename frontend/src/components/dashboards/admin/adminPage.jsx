import React, { useState, useMemo } from "react";
import {
  DollarSign,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Calendar,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Download,
  Filter,
  ChevronRight,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { Link } from "react-router-dom";

import Popup from "../../commonpopup/popup";

// --- Mocked data ---
const managerData = {
  totalRevenue: 450000,
  todayRevenue: 85000,
  leadsConverted: 124,
  paymentsVerified: 89,
  todayPayments: 12,
  pendingApprovals: 8,
  pendingVerifications: [
    {
      lead: "Sanjay Kumar",
      executive: "Rahul",
      type: "Full",
      amount: "₹45,000",
      time: "2 hours ago",
      id: 1,
    },
    {
      lead: "Priya Singh",
      executive: "Sneha",
      type: "EMI",
      amount: "₹1,20,000",
      time: "1 hour ago",
      id: 2,
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
    { name: "Rahul", conversions: 8, revenue: "₹85,000", avatarColor: "bg-blue-500" },
    { name: "Priya", conversions: 6, revenue: "₹72,000", avatarColor: "bg-purple-500" },
    { name: "Karthik", conversions: 5, revenue: "₹58,000", avatarColor: "bg-green-500" },
    { name: "Sneha", conversions: 4, revenue: "₹42,000", avatarColor: "bg-pink-500" },
    { name: "Arjun", conversions: 3, revenue: "₹35,000", avatarColor: "bg-orange-500" },
  ],
};

const getTodayDate = () =>
  new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function AdminDashboard() {
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [pendingVerifications, setPendingVerifications] = useState(
    managerData.pendingVerifications
  );

  // ✅ GLOBAL POPUP STATE
  const [popup, setPopup] = useState({
    open: false,
    type: "success",
    title: "",
    message: "",
    showRetry: false,
    onRetry: null,
  });

  const pendingCount = pendingVerifications.length;

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

  const kpis = useMemo(() => ([
    {
      label: "Total Revenue",
      value: `₹${(managerData.totalRevenue / 100000).toFixed(1)}L`,
      icon: DollarSign,
      color: "bg-gradient-to-br from-green-50 to-emerald-50",
      iconColor: "text-emerald-600",
      trend: "+18%",
      trendIcon: ArrowUpRight,
      trendColor: "text-emerald-600",
      subtext: `₹${(managerData.todayRevenue / 100000).toFixed(1)}L today`,
    },
    {
      label: "Leads Converted",
      value: managerData.leadsConverted.toString(),
      icon: TrendingUp,
      color: "bg-gradient-to-br from-blue-50 to-cyan-50",
      iconColor: "text-blue-600",
      trend: "+12%",
      trendIcon: ArrowUpRight,
      trendColor: "text-blue-600",
      subtext: "This month",
    },
    {
      label: "Payments Verified",
      value: managerData.paymentsVerified.toString(),
      icon: CheckCircle,
      color: "bg-gradient-to-br from-purple-50 to-violet-50",
      iconColor: "text-purple-600",
      trend: "+8%",
      trendIcon: ArrowUpRight,
      trendColor: "text-purple-600",
      subtext: `${managerData.todayPayments} verified today`,
    },
    {
      label: "Pending Approvals",
      value: pendingCount.toString(),
      icon: AlertCircle,
      color: "bg-gradient-to-br from-orange-50 to-amber-50",
      iconColor: "text-orange-600",
      trend: pendingCount > 5 ? "+5" : "-2",
      trendIcon: pendingCount > 5 ? ArrowUpRight : ArrowDownRight,
      trendColor: pendingCount > 5 ? "text-red-600" : "text-orange-600",
      subtext: "Needs attention",
      highlight: pendingCount > 5,
    },
  ]), [pendingCount]);

  const payments = [
    {
      lead: "Priya Sharma",
      executive: "Karthik",
      type: "Full",
      amount: "₹45,000",
      status: "verified",
      date: "Today, 10:30 AM",
    },
    {
      lead: "Rajesh Kumar",
      executive: "Priya",
      type: "EMI",
      amount: "₹1,20,000",
      status: "pending",
      date: "Today, 09:45 AM",
    },
    {
      lead: "Anita Desai",
      executive: "Arjun",
      type: "Full",
      amount: "₹38,000",
      status: "verified",
      date: "Yesterday, 4:15 PM",
    },
    {
      lead: "Vikram Patel",
      executive: "Sneha",
      type: "Loan",
      amount: "₹2,50,000",
      status: "pending",
      date: "2 days ago",
    },
    {
      lead: "Meera Nair",
      executive: "Rahul",
      type: "EMI",
      amount: "₹92,000",
      status: "verified",
      date: "3 days ago",
    },
  ];

  const revenueData = [
    { month: "Jun", revenue: 8.5, target: 9.0 },
    { month: "Jul", revenue: 9.2, target: 9.5 },
    { month: "Aug", revenue: 10.1, target: 10.0 },
    { month: "Sep", revenue: 9.8, target: 10.5 },
    { month: "Oct", revenue: 11.2, target: 11.0 },
    { month: "Nov", revenue: 12.4, target: 11.5 },
  ];

  const paymentTypeData = [
    { name: "Full Payment", value: 45, color: "#10B981", icon: "💳" },
    { name: "EMI", value: 30, color: "#3B82F6", icon: "📅" },
    { name: "Loan", value: 15, color: "#F59E0B", icon: "🏦" },
    { name: "Credit", value: 10, color: "#8B5CF6", icon: "💎" },
  ];

  const handleApprove = (p) => {
    console.log("APPROVED PAYMENT DATA:", p);
    openPopup(
      "success",
      "Payment Approved",
      `${p.lead}'s payment (${p.amount}) has been approved.`
    );
    setPendingVerifications((prev) => prev.filter((x) => x.id !== p.id));
  };

  const handleReject = (p) => {
    console.log("REJECTED PAYMENT DATA:", p);
    openPopup(
      "failure",
      "Payment Rejected",
      `${p.lead}'s payment (${p.amount}) has been rejected.`
    );
    setPendingVerifications((prev) => prev.filter((x) => x.id !== p.id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
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

      <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <p className="text-gray-500 text-sm">{getTodayDate()}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl bg-white text-gray-700 hover:bg-gray-50 text-sm transition-all hover:shadow-sm">
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl bg-white text-gray-700 hover:bg-gray-50 text-sm transition-all hover:shadow-sm">
              <Download className="w-4 h-4" />
              Export
            </button>
            <Link
              to="/admin/report"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-sm font-medium transition-all hover:shadow-lg hover:from-blue-700 hover:to-blue-800"
            >
              <Calendar className="w-4 h-4" />
              View Reports
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((k, i) => {
            const Icon = k.icon;
            const TrendIcon = k.trendIcon;
            return (
              <div
                key={i}
                className={`rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:shadow-md hover:-translate-y-1 ${k.highlight ? 'ring-2 ring-orange-200' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl ${k.color}`}>
                    <Icon className={`w-6 h-6 ${k.iconColor}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${k.trendColor}`}>
                    <TrendIcon className="w-4 h-4" />
                    {k.trend}
                  </div>
                </div>
                <p className="text-gray-500 text-sm mt-4">{k.label}</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">{k.value}</p>
                <p className="text-xs text-gray-600 mt-2">{k.subtext}</p>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Revenue Chart */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Revenue Trend</h2>
                  <p className="text-gray-500 text-sm mt-1">Last 6 months performance</p>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280' }}
                      tickFormatter={(value) => `₹${value}L`}
                    />
                    <Tooltip 
                      contentStyle={{
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value) => [`₹${value}L`, 'Revenue']}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#9ca3af"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
                  <p className="text-gray-500 text-sm mt-1">Latest payment activities</p>
                </div>
                <Link
                  to="/admin/transactions"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View all
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 text-left text-gray-600 font-medium">Lead</th>
                      <th className="py-3 text-left text-gray-600 font-medium">Executive</th>
                      <th className="py-3 text-left text-gray-600 font-medium">Type</th>
                      <th className="py-3 text-left text-gray-600 font-medium">Amount</th>
                      <th className="py-3 text-left text-gray-600 font-medium">Status</th>
                      <th className="py-3 text-left text-gray-600 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((p, i) => (
                      <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                        <td className="py-3">
                          <div className="font-medium text-gray-900">{p.lead}</div>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs">
                              {p.executive.charAt(0)}
                            </div>
                            {p.executive}
                          </div>
                        </td>
                        <td className="py-3">
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                            {p.type}
                          </span>
                        </td>
                        <td className="py-3 font-semibold text-gray-900">{p.amount}</td>
                        <td className="py-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              p.status === "verified"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3 text-sm text-gray-500">{p.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Top Performers */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Top Performers</h2>
                  <p className="text-gray-500 text-sm mt-1">Today's leaderboard</p>
                </div>
                <Users className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                {managerData.topPerformersToday.map((t, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${t.avatarColor} flex items-center justify-center text-white font-bold`}>
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{t.name}</div>
                        <div className="text-xs text-gray-600">
                          {t.conversions} conversions
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-gray-900">{t.revenue}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Breakdown */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Breakdown</h2>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentTypeData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                    >
                      {paymentTypeData.map((e, i) => (
                        <Cell key={i} fill={e.color} stroke="#fff" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Percentage']}
                      contentStyle={{
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {paymentTypeData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-gray-700">{item.name}</span>
                    <span className="ml-auto font-semibold">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6">
              <h3 className="text-white text-lg font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setIsApprovalModalOpen(true)}
                  className="w-full flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5" />
                    <span>Approve Payments</span>
                  </div>
                  {pendingCount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {pendingCount}
                    </span>
                  )}
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5" />
                    <span>View Alerts</span>
                  </div>
                  <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                    3
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Approval Modal */}
        {isApprovalModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Approve Payments</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {pendingCount} payment{pendingCount !== 1 ? 's' : ''} pending approval
                  </p>
                </div>
                <button
                  onClick={() => setIsApprovalModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {pendingVerifications.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      All caught up! 🎉
                    </h4>
                    <p className="text-gray-500">
                      No pending payments to approve.
                    </p>
                  </div>
                ) : (
                  pendingVerifications.map((p) => (
                    <div key={p.id} className="p-4 bg-gray-50 rounded-xl border">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                              {p.lead.charAt(0)}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{p.lead}</div>
                              <div className="text-sm text-gray-600">
                                Exec: {p.executive}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="px-3 py-1 bg-white border rounded-lg">
                              {p.type}
                            </span>
                            <span className="font-semibold text-gray-900">{p.amount}</span>
                            <span className="text-gray-500">{p.time}</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button
                            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all"
                            onClick={() => handleApprove(p)}
                          >
                            Approve
                          </button>
                          <button
                            className="px-4 py-2 border border-red-200 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors"
                            onClick={() => handleReject(p)}
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                <button
                  onClick={() => setIsApprovalModalOpen(false)}
                  className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-xl font-medium"
                >
                  Close
                </button>
                {pendingVerifications.length > 0 && (
                  <button
                    onClick={() => {
                      pendingVerifications.forEach(handleApprove);
                      setIsApprovalModalOpen(false);
                    }}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all"
                  >
                    Approve All
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}