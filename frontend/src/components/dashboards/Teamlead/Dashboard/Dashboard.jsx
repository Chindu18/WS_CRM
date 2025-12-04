import React, { useMemo, useState } from "react";
import {
  Users,
  Phone,
  Clock,
  Send,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Award,
  UserPlus,
  ChevronRight,
  BarChart3,
  Target,
  Star,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

import AssignLeads from "../Dashboard/AssignLead";
import Popup from "../../../commonpopup/popup";

/* ----------------------- Mock Team Data ----------------------- */
const arunTeamData = {
  totalLeads: 156,
  unassignedLeads: { hot: 8, warm: 12, cold: 15 },
  teamCallsToday: 89,
  avgTalkTime: 7.2,
  paymentLinksSent: 23,
  todayHighlights: [
    { executive: "Priya Sharma", achievement: "Closed 3 premium accounts", time: "10:30 AM" },
    { executive: "Rahul Kumar", achievement: "Highest talk time: 45 mins", time: "11:15 AM" },
    { executive: "Anita Patel", achievement: "5 successful demos completed", time: "2:45 PM" },
  ],
  team: [
    { id: 1, name: "Priya Sharma", leads: 23, calls: 15, talkTime: 45, conversion: 32, status: "active" },
    { id: 2, name: "Rahul Kumar", leads: 18, calls: 12, talkTime: 38, conversion: 28, status: "active" },
    { id: 3, name: "Anita Patel", leads: 21, calls: 14, talkTime: 42, conversion: 35, status: "active" },
    { id: 4, name: "Vikram Singh", leads: 15, calls: 9, talkTime: 28, conversion: 22, status: "inactive" },
  ],
};

const getTodayDate = () =>
  new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

/* ----------------------- Mock Leads ----------------------- */
const mockLeads = [
  { id: "l1", name: "Rohan Mehta", status: "hot", source: "Meta Ads", lastSeen: "10 mins ago" },
  { id: "l2", name: "Kavya Reddy", status: "hot", source: "LinkedIn", lastSeen: "30 mins ago" },
  { id: "l3", name: "Sanjay Gupta", status: "hot", source: "Website", lastSeen: "45 mins ago" },
  { id: "l4", name: "Neha Verma", status: "warm", source: "Referral", lastSeen: "1 hr ago" },
  { id: "l5", name: "Akash Rao", status: "warm", source: "Website", lastSeen: "2 hrs ago" },
  { id: "l6", name: "Prateek Jain", status: "cold", source: "Other", lastSeen: "Yesterday" },
];

/* ----------------------- Mock Execs ----------------------- */
const mockExecutives = [
  { id: "e1", name: "Karthik", leadsAssigned: 24, leadsLimit: 30, priority: "high" },
  { id: "e2", name: "Priya", leadsAssigned: 28, leadsLimit: 30, priority: "very high" },
  { id: "e3", name: "Arjun", leadsAssigned: 22, leadsLimit: 30, priority: "medium" },
  { id: "e4", name: "Sneha", leadsAssigned: 26, leadsLimit: 30, priority: "high" },
  { id: "e5", name: "Rahul", leadsAssigned: 30, leadsLimit: 30, priority: "high" },
];

export function TeamLeadDashboard({ onNavigate = () => {} }) {
  const [activeTab, setActiveTab] = useState("hot");
  const [isAssignOpen, setIsAssignOpen] = useState(false);

  const [popup, setPopup] = useState({
    open: false,
    type: "success",
    message: "",
  });

  const notify = (type, message) => {
    setPopup({ open: true, type, message });
  };

  const closePopup = () => {
    setPopup((prev) => ({ ...prev, open: false }));
  };

  const safeHighlights = Array.isArray(arunTeamData.todayHighlights)
    ? arunTeamData.todayHighlights
    : [];
  const safeTeam = Array.isArray(arunTeamData.team) ? arunTeamData.team : [];
  const safeLeads = Array.isArray(mockLeads) ? mockLeads : [];

  const tabLeads = useMemo(
    () => safeLeads.filter((l) => l.status === activeTab),
    [safeLeads, activeTab]
  );

  const kpis = [
    {
      label: "Total Leads",
      value: arunTeamData.totalLeads.toString(),
      icon: Users,
      color: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconColor: "text-blue-600",
      trend: "+12%",
      trendColor: "text-green-600",
      subtext: `${
        arunTeamData.unassignedLeads.hot +
        arunTeamData.unassignedLeads.warm +
        arunTeamData.unassignedLeads.cold
      } unassigned`,
    },
    {
      label: "Team Calls Today",
      value: arunTeamData.teamCallsToday.toString(),
      icon: Phone,
      color: "bg-gradient-to-br from-green-50 to-green-100",
      iconColor: "text-green-600",
      trend: "+8%",
      trendColor: "text-green-600",
      subtext: "Above daily target",
    },
    {
      label: "Avg Talk Time",
      value: `${arunTeamData.avgTalkTime} min`,
      icon: Clock,
      color: "bg-gradient-to-br from-purple-50 to-purple-100",
      iconColor: "text-purple-600",
      trend: "+15%",
      trendColor: "text-green-600",
      subtext: "Team average",
    },
    {
      label: "Payment Links Sent",
      value: arunTeamData.paymentLinksSent.toString(),
      icon: Send,
      color: "bg-gradient-to-br from-orange-50 to-orange-100",
      iconColor: "text-orange-600",
      trend: "+22%",
      trendColor: "text-green-600",
      subtext: "Today only",
    },
  ];

  const leadStatusData = [
    { name: "Hot", value: arunTeamData.unassignedLeads.hot, color: "#ef4444" },
    { name: "Warm", value: arunTeamData.unassignedLeads.warm, color: "#f59e0b" },
    { name: "Cold", value: arunTeamData.unassignedLeads.cold, color: "#3b82f6" },
  ];

  const handleAssign = async (lead, exec) => {
    notify("success", `${lead.name} assigned to ${exec.name}`);
    return true;
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "hot":
        return "bg-red-100 text-red-800";
      case "warm":
        return "bg-orange-100 text-orange-800";
      case "cold":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/50 to-white">
      <Popup
        open={popup.open}
        type={popup.type}
        message={popup.message}
        onClose={closePopup}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Team Lead Dashboard
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <p className="text-sm text-gray-500">Hey Arun! · {getTodayDate()}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate("leads")}
              className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Lead Overview
            </button>
            <button
              onClick={() => setIsAssignOpen(true)}
              className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 text-sm font-medium transition-colors shadow-md"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Assign Leads
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${kpi.color}`}
                  >
                    <Icon className={`w-6 h-6 ${kpi.iconColor}`} />
                  </div>
                  <span className={`text-sm font-medium ${kpi.trendColor}`}>
                    {kpi.trend}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{kpi.label}</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {kpi.value}
                </p>
                <p className="text-xs text-gray-500">{kpi.subtext}</p>
              </div>
            );
          })}
        </div>

        {/* Highlights & Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Highlights Card */}
          <div className="lg:col-span-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Today's Team Highlights
                </h3>
                <p className="text-sm text-gray-600">Team achievements and milestones</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {safeHighlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{h.executive}</p>
                    <p className="text-sm text-gray-600">{h.achievement}</p>
                  </div>
                  <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                    {h.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Required Card */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Action Required
                </h3>
                <p className="text-sm text-gray-600">Urgent attention needed</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-white/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">Hot Leads</span>
                  <span className="text-lg font-bold text-red-600">
                    {arunTeamData.unassignedLeads.hot}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Unassigned hot leads require immediate attention
                </p>
              </div>
              
              <button
                onClick={() => setIsAssignOpen(true)}
                className="w-full px-4 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg hover:from-orange-700 hover:to-amber-700 transition-colors font-medium shadow-sm"
              >
                Assign Now
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Unassigned Leads Card */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Unassigned Leads
                </h2>
                <p className="text-sm text-gray-500 mt-1">Quick assign to team members</p>
              </div>
              
              <div className="flex gap-2 mt-3 sm:mt-0">
                {["hot", "warm", "cold"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {tab.toUpperCase()} ({arunTeamData.unassignedLeads?.[tab] || 0})
                  </button>
                ))}
              </div>
            </div>

            {/* Leads List */}
            <div className="space-y-3">
              {tabLeads.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <Target className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No {activeTab} leads pending</p>
                  <p className="text-sm text-gray-400 mt-1">Great job! All leads are assigned</p>
                </div>
              ) : (
                tabLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="flex items-center justify-between p-4 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                        lead.status === "hot" ? "bg-red-500" :
                        lead.status === "warm" ? "bg-orange-500" : "bg-blue-500"
                      }`}>
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{lead.name}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(lead.status)}`}>
                            {lead.status.toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-500">{lead.source}</span>
                          <span className="text-xs text-gray-500">· Last seen {lead.lastSeen}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setIsAssignOpen(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Assign
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Lead Distribution Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Lead Distribution
                </h2>
                <p className="text-sm text-gray-500">Unassigned leads breakdown</p>
              </div>
            </div>

            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadStatusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                  >
                    {leadStatusData.map((item, index) => (
                      <Cell key={index} fill={item.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [value, "Leads"]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "0.5rem",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value, entry) => (
                      <span className="text-sm text-gray-700">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2">
              {leadStatusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium text-gray-900">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">{item.value}</span>
                    <span className="text-xs text-gray-500">leads</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Performance Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Team Performance Today
              </h2>
              <p className="text-sm text-gray-500">Live team metrics and status</p>
            </div>
            <button
              onClick={() => onNavigate("reports")}
              className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View Details
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          {/* Mobile View */}
          <div className="sm:hidden space-y-3">
            {safeTeam.map((member) => (
              <div key={member.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                      <span className="font-semibold text-blue-600">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          member.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {member.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-2 bg-white rounded-lg">
                    <p className="text-xs text-gray-500">Leads</p>
                    <p className="text-lg font-bold text-gray-900">{member.leads}</p>
                  </div>
                  <div className="text-center p-2 bg-white rounded-lg">
                    <p className="text-xs text-gray-500">Calls</p>
                    <p className="text-lg font-bold text-gray-900">{member.calls}</p>
                  </div>
                  <div className="text-center p-2 bg-white rounded-lg">
                    <p className="text-xs text-gray-500">Talk Time</p>
                    <p className="text-lg font-bold text-gray-900">{member.talkTime}m</p>
                  </div>
                  <div className="text-center p-2 bg-white rounded-lg">
                    <p className="text-xs text-gray-500">Conversion</p>
                    <p className="text-lg font-bold text-gray-900">{member.conversion}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900 rounded-l-lg">
                    Executive
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">
                    Leads
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">
                    Calls
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">
                    Talk Time
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">
                    Conversion
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900 rounded-r-lg">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {safeTeam.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                          <span className="font-semibold text-blue-600">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{member.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">{member.leads}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-lg font-bold text-gray-900">{member.calls}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-lg font-bold text-gray-900">{member.talkTime}m</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">{member.conversion}%</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          member.conversion > 30 ? "bg-green-100 text-green-800" :
                          member.conversion > 25 ? "bg-yellow-100 text-yellow-800" :
                          "bg-red-100 text-red-800"
                        }`}>
                          {member.conversion > 30 ? "Good" : member.conversion > 25 ? "Avg" : "Low"}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          member.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          member.status === "active" ? "bg-green-500" : "bg-gray-400"
                        }`} />
                        {member.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Assign Modal */}
      <AssignLeads
        open={isAssignOpen}
        onClose={() => setIsAssignOpen(false)}
        leads={safeLeads}
        executives={mockExecutives}
        aiRecommendation={{
          message:
            "Based on availability and performance, we recommend assigning to Arjun or Karthik",
          execIds: ["e1", "e3"],
        }}
        onAssign={handleAssign}
      />
    </div>
  );
}

export default TeamLeadDashboard;