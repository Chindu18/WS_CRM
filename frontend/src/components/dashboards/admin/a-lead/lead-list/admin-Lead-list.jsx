import React, { useState } from "react";
import {
  Search,
  Plus,
  Phone,
  Mail,
  MessageSquare,
  Edit,
  UserPlus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Popup from "../../../../commonpopup/popup";
// ✅ adjust path to your Popup.jsx

import MakeACall from "../lead-components/makecall";
import LeadForm from "../lead-components/add-Lead-form";
import EmailModal from "../lead-components/lead-mail";
import WhatsAppModal from "../lead-components/lead-whatsup";
import { useNavigate } from "react-router-dom";
import { backend_url } from "../../../../../config";
import { useEffect } from "react";


const AssignLeadModal = ({ isOpen, onClose, lead, onAssign, openPopup }) => {
  const [assignTo, setAssignTo] = useState("");
  const [teamLeads, setTeamLeads] = useState([]);
  const [executives, setExecutives] = useState([]);




  if (!isOpen) return null;

  const safePopup = (type, title, message) => {
    if (openPopup) openPopup(type, title, message);
    else console.log(`[${type}] ${title}: ${message}`);
  };

  const handleAssign = () => {
    if (assignTo) {
      onAssign(lead.id, assignTo);
      onClose();
      safePopup("success", "Lead Assigned", `Lead assigned to ${assignTo}`);
    } else {
      safePopup("failure", "Validation Error", "Please select an executive");
    }
  };

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const [tlRes, exeRes] = await Promise.all([
          fetch(`${backend_url}/api/users/getAllTeamLeads`),
          fetch(`${backend_url}/api/users/getAllExecutives`)
        ]);

        const tlData = await tlRes.json();
        const exeData = await exeRes.json();

        if (tlData.success) setTeamLeads(tlData.teamLeads);
        if (exeData.success) setExecutives(exeData.executives);
        console.log("Team Leads:", tlData.teamLeads);
        console.log("Executives:", exeData.executives);

      } catch (err) {
        console.error("❌ Failed to fetch TL/Executive data:", err);
      }
    };

    fetchTeamData();
  }, []);



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-lg font-semibold mb-4">Assign {lead?.name}</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assign To
            </label>
            <select
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Executive</option>

              {executives.length > 0 ? (
                executives.map((exe) => (
                  <option key={exe.id} value={exe.name}>
                    {exe.name}
                  </option>
                ))
              ) : (
                <option disabled>Loading executives...</option>
              )}
            </select>

          </div>
        </div>

        <div className="flex gap-2 justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function LeadsList({ onNavigate, userRole = "admin" }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isAssignLeadModalOpen, setIsAssignLeadModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [editLead, setEditLead] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [teamLeads, setTeamLeads] = useState([]);
  const [executives, setExecutives] = useState([]);

  // const [leads, setLeads] = useState(allLeadsData);
  const [leads, setLeads] = useState([]);
  const [filters, setFilters] = useState({
    source: "all",
    teamLead: "all",
    executive: "all",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch(`${backend_url}/api/admin/all`);
        const data = await res.json();

        if (data.success) {
          const formattedLeads = data.leads.map((lead) => ({
            id: lead.id,
            name: lead.name,
            phone: lead.phone,
            email: lead.email,
            source: lead.source,
            assignedTo: lead.assigned_to || "Not Assigned",
            tl: lead.team_lead || "Not Assigned",
            status:
              lead.priority.charAt(0).toUpperCase() +
              lead.priority.slice(1),
            priority: lead.priority,
            lastContact: new Date(lead.created_at).toLocaleString(),
          }));
          setLeads(formattedLeads);
        } else {
          console.error("❌ Error:", data.message);
        }
      } catch (err) {
        console.error("❌ Failed to fetch leads:", err);
      }
    };

    fetchLeads();
  }, []);


  // ✅ GLOBAL POPUP STATE
  const [popup, setPopup] = useState({
    open: false,
    type: "success",
    title: "",
    message: "",
  });

  const openPopup = (type, title, message) =>
    setPopup({ open: true, type, title, message });

  const closePopup = () =>
    setPopup((p) => ({ ...p, open: false }));

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.source.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriority =
      selectedPriority === "all" || lead.priority === selectedPriority;

    const matchesSource =
      filters.source === "all" ||
      lead.source.toLowerCase().includes(filters.source);

    const matchesTeamLead =
      filters.teamLead === "all" ||
      lead.tl.toLowerCase() === filters.teamLead;

    const matchesExecutive =
      filters.executive === "all" ||
      lead.assignedTo.toLowerCase() === filters.executive;

    return (
      matchesSearch &&
      matchesPriority &&
      matchesSource &&
      matchesTeamLead &&
      matchesExecutive
    );
  });

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLeads = filteredLeads.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleAddLead = (leadData, isEdit = false) => {
    if (isEdit) {
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === leadData.id ? { ...lead, ...leadData } : lead
        )
      );
      openPopup("success", "Lead Updated", "Lead updated successfully");
    } else {
      setLeads((prev) => [leadData, ...prev]);
      openPopup("success", "Lead Added", "Lead added successfully");
    }

    setIsLeadFormOpen(false);
    setEditLead(null);
  };

  const handleEditLead = (lead) => {
    setEditLead(lead);
    setIsLeadFormOpen(true);
  };

  const handleAssignLead = (leadId, executive) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === leadId ? { ...lead, assignedTo: executive } : lead
      )
    );
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setCurrentPage(1);
  };

  const handleLeadAction = (lead, actionType) => {
    setSelectedLead(lead);
    switch (actionType) {
      case "call":
        setIsCallModalOpen(true);
        break;
      case "email":
        setIsEmailModalOpen(true);
        break;
      case "whatsapp":
        setIsWhatsAppModalOpen(true);
        break;
      case "assign":
        setIsAssignLeadModalOpen(true);
        break;
      default:
        break;
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const handlePriorityTabClick = (priority) => {
    setSelectedPriority(priority);
    setCurrentPage(1);
  };

  const handleOpenAddLead = () => {
    setEditLead(null);
    setIsLeadFormOpen(true);
  };

  const handleCloseLeadForm = () => {
    setIsLeadFormOpen(false);
    setEditLead(null);
  };

  const handleLeadClick = (lead) => {
    navigate(`/admin/lead-details/${lead.id}`, {
      state: {
        lead,
        fromLeadsList: true,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* ✅ GLOBAL POPUP */}
      <Popup
        open={popup.open}
        type={popup.type}
        title={popup.title}
        message={popup.message}
        onClose={closePopup}
      />

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Leads
            </h1>
            <p className="text-gray-500 mt-1 text-sm md:text-base">
              Manage and track all leads
            </p>
          </div>

          <button
            onClick={handleOpenAddLead}
            className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Lead
          </button>
        </div>

        {/* Filters */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-6">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <select
                value={filters.source}
                onChange={(e) => handleFilterChange("source", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Sources</option>
                <option value="meta">Meta Ads</option>
                <option value="linkedin">LinkedIn</option>
                <option value="website">Website</option>
                <option value="referral">Referral</option>
              </select>

              <select
                value={filters.teamLead}
                onChange={(e) =>
                  handleFilterChange("teamLead", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All TLs</option>
                <option value="arun">Arun</option>
                <option value="meena">Meena</option>
              </select>

              <select
                value={filters.executive}
                onChange={(e) =>
                  handleFilterChange("executive", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Executives</option>
                <option value="karthik">Karthik</option>
                <option value="priya">Priya</option>
                <option value="arjun">Arjun</option>
              </select>
            </div>
          </div>
        </div>

        {/* Priority Tabs */}
        <div className="bg-white border border-gray-200 rounded-xl">
          <div className="flex overflow-x-auto">
            {["all", "hot", "warm", "cold"].map((p) => (
              <button
                key={p}
                onClick={() => handlePriorityTabClick(p)}
                className={`flex-1 px-4 py-3 border-b-2 text-sm font-medium transition-colors ${selectedPriority === p
                  ? p === "hot"
                    ? "border-red-600 text-red-600"
                    : p === "warm"
                      ? "border-orange-600 text-orange-600"
                      : p === "cold"
                        ? "border-blue-600 text-blue-600"
                        : "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
              >
                {p === "all"
                  ? "All Leads"
                  : p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-4 md:p-6">
            {/* Mobile Cards View */}
            <div className="block lg:hidden space-y-4">
              {paginatedLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="rounded-xl border border-gray-200 bg-white p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <button
                        onClick={() => handleLeadClick(lead)}
                        className="text-gray-900 hover:text-blue-600 transition-colors font-medium text-left"
                      >
                        {lead.name}
                      </button>
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className={`inline-block px-2 py-1 rounded-lg text-xs ${lead.status === "Hot"
                            ? "bg-red-50 text-red-600"
                            : lead.status === "Warm"
                              ? "bg-orange-50 text-orange-600"
                              : "bg-blue-50 text-blue-600"
                            }`}
                        >
                          {lead.status}
                        </span>
                        <span className="text-sm text-gray-600">
                          {lead.source}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 text-sm text-gray-600 mb-3">
                    <span>Assigned: {lead.assignedTo}</span>
                    <span>TL: {lead.tl}</span>
                  </div>

                  <div className="text-sm text-gray-600 mb-3">
                    Last contact: {lead.lastContact}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleLeadAction(lead, "call")}
                      className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </button>

                    <button
                      onClick={() => handleLeadAction(lead, "email")}
                      className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg hover:bggray-50 transition-colors"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </button>

                    <button
                      onClick={() => handleLeadAction(lead, "whatsapp")}
                      className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleEditLead(lead)}
                      className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-900">
                        Lead Name
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-900">
                        Source
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-900">
                        Assigned To
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-900">
                        TL
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-900">
                        Last Contact
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-900">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedLeads.map((lead) => (
                      <tr
                        key={lead.id}
                        className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                      >
                        <td className="py-3 px-2">
                          <button
                            onClick={() => handleLeadClick(lead)}
                            className="hover:text-blue-600 transition-colors text-gray-900 font-medium text-left"
                          >
                            {lead.name}
                          </button>
                        </td>
                        <td className="py-3 px-2 text-gray-600">
                          {lead.source}
                        </td>
                        <td className="py-3 px-2 text-gray-600">
                          {lead.assignedTo}
                        </td>
                        <td className="py-3 px-2 text-gray-600">{lead.tl}</td>
                        <td className="py-3 px-2">
                          <span
                            className={`inline-block px-2 py-1 rounded-lg text-xs ${lead.status === "Hot"
                              ? "bg-red-50 text-red-600"
                              : lead.status === "Warm"
                                ? "bg-orange-50 text-orange-600"
                                : "bg-blue-50 text-blue-600"
                              }`}
                          >
                            {lead.status}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-gray-600">
                          {lead.lastContact}
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleLeadAction(lead, "call")}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Call"
                            >
                              <Phone className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleLeadAction(lead, "email")}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Email"
                            >
                              <Mail className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleLeadAction(lead, "whatsapp")}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="WhatsApp"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEditLead(lead)}
                              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleLeadAction(lead, "assign")}
                              className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                              title="Assign"
                            >
                              <UserPlus className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {filteredLeads.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No leads found matching your criteria.
                </p>
              </div>
            )}

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-3">
              <p className="text-sm text-gray-600">
                Showing {startIndex + 1}-
                {Math.min(startIndex + itemsPerPage, filteredLeads.length)} of{" "}
                {filteredLeads.length} leads
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 border rounded-lg transition-colors ${currentPage === page
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-gray-300 hover:bg-gray-50"
                          }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* LeadForm */}
        <LeadForm
          isOpen={isLeadFormOpen}
          onClose={handleCloseLeadForm}
          onSave={handleAddLead}
          editLead={editLead}
          title={editLead ? "Edit Lead" : "Add New Lead"}
          description={
            editLead
              ? "Update the lead details below"
              : "Enter the lead details below"
          }
          openPopup={openPopup}
        />

        {/* Other modals */}
        <MakeACall
          isOpen={isCallModalOpen}
          onClose={() => setIsCallModalOpen(false)}
          lead={selectedLead}
          openPopup={openPopup}
        />

        <WhatsAppModal
          isOpen={isWhatsAppModalOpen}
          onClose={() => setIsWhatsAppModalOpen(false)}
          lead={selectedLead}
          openPopup={openPopup}
        />

        <EmailModal
          isOpen={isEmailModalOpen}
          onClose={() => setIsEmailModalOpen(false)}
          lead={selectedLead}
          openPopup={openPopup}
        />

        <AssignLeadModal
          isOpen={isAssignLeadModalOpen}
          onClose={() => setIsAssignLeadModalOpen(false)}
          lead={selectedLead}
          onAssign={handleAssignLead}
          openPopup={openPopup}
        />
      </div>
    </div>
  );
}