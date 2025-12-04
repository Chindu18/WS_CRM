import { useEffect, useMemo, useRef, useState } from "react";
import { Download, CheckCircle, XCircle, Mail, CheckCheck } from "lucide-react";
import ExportButton from "../../../common/Exports";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  Legend,
} from "recharts";

export default function PaymentsModule({ userRole = "viewer" }) {
  const printableRef = useRef(null);

  const [selectedTab, setSelectedTab] = useState("all");
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [isReceivedModalOpen, setIsReceivedModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // ✅ bar width responsive
  const [barSize, setBarSize] = useState(70);

  const [checklist, setChecklist] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });

  // ✅ Responsive bar width
  useEffect(() => {
    const updateBarSize = () => {
      const w = window.innerWidth;
      if (w < 420) setBarSize(28);
      else if (w < 640) setBarSize(40);
      else if (w < 1024) setBarSize(55);
      else setBarSize(70);
    };
    updateBarSize();
    window.addEventListener("resize", updateBarSize);
    return () => window.removeEventListener("resize", updateBarSize);
  }, []);

  const hasPermission = (role, permission) => {
    const permissions = {
      admin: ["canVerifyPayments", "canExportData", "canMarkReceived"],
      manager: ["canVerifyPayments", "canExportData", "canMarkReceived"],
      executive: ["canExportData", "canMarkReceived"],
      viewer: [],
    };
    return permissions[role]?.includes(permission) || false;
  };

  const canVerifyPayments = hasPermission(userRole, "canVerifyPayments");
  const canExportData = hasPermission(userRole, "canExportData");
  const canMarkReceived = hasPermission(userRole, "canMarkReceived");

  const payments = [
    {
      id: "1",
      lead: "Priya Sharma",
      executive: "Karthik",
      amount: "₹45,000",
      type: "Full",
      source: "Meta Ads",
      verified: true,
      date: "Nov 10, 2024",
      status: "verified",
    },
    {
      id: "2",
      lead: "Rajesh Kumar",
      executive: "Priya",
      amount: "₹1,20,000",
      type: "EMI",
      source: "LinkedIn",
      verified: false,
      date: "Nov 11, 2024",
      status: "payment", // Payment Link Sent
    },
    {
      id: "3",
      lead: "Anita Desai",
      executive: "Arjun",
      amount: "₹38,000",
      type: "Full",
      source: "Website",
      verified: true,
      date: "Nov 09, 2024",
      status: "verified",
    },
    {
      id: "4",
      lead: "Vikram Singh",
      executive: "Sneha",
      amount: "₹95,000",
      type: "Loan",
      source: "Referral",
      verified: false,
      date: "Nov 11, 2024",
      status: "received", // Payment Received (needs verification)
    },
    {
      id: "5",
      lead: "Meera Patel",
      executive: "Rahul",
      amount: "₹52,000",
      type: "Credit",
      source: "Meta Ads",
      verified: true,
      date: "Nov 08, 2024",
      status: "verified",
    },
    {
      id: "6",
      lead: "Amit Verma",
      executive: "Karthik",
      amount: "₹28,000",
      type: "Full",
      source: "Website",
      verified: false,
      date: "Nov 10, 2024",
      status: "failed",
    },
    {
      id: "7",
      lead: "Sunil Verma",
      executive: "ammu",
      amount: "₹28,000",
      type: "Full",
      source: "Website",
      verified: false,
      date: "Nov 10, 2024",
      status: "payment", // Payment Link Sent
    },
    {
      id: "8",
      lead: "Amit K",
      executive: "Karthi",
      amount: "₹28,000",
      type: "Full",
      source: "Website",
      verified: false,
      date: "Nov 10, 2024",
      status: "payment", // Payment Link Sent
    },
  ];

  const paymentTypeData = [
    { type: "Full", count: 45 },
    { type: "EMI", count: 30 },
    { type: "Loan", count: 15 },
    { type: "Credit", count: 10 },
  ];

  const revenueData = [
    { month: "Jun", revenue: 8.5 },
    { month: "Jul", revenue: 9.2 },
    { month: "Aug", revenue: 10.1 },
    { month: "Sep", revenue: 9.8 },
    { month: "Oct", revenue: 11.2 },
    { month: "Nov", revenue: 12.4 },
  ];

  // ✅ filteredPayments memo deps correct
  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      if (selectedTab === "all") return true;
      if (selectedTab === "payment") return p.status === "payment"; // Payment Link Sent
      if (selectedTab === "received") return p.status === "received"; // Payment Received
      if (selectedTab === "verified") return p.verified; // Verified
      if (selectedTab === "failed") return p.status === "failed"; // Failed
      return true;
    });
  }, [selectedTab]);

  const handleVerifyPayment = () => {
    console.log("Payment verified successfully");
    setIsVerifyModalOpen(false);
    setSelectedPayment(null);
    setChecklist({ check1: false, check2: false, check3: false, check4: false });
  };

  const handleMarkAsReceived = () => {
    console.log("Payment marked as received");
    setIsReceivedModalOpen(false);
    setSelectedPayment(null);
  };

  const handleChecklistChange = (key) =>
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));

  const VerifyModal = ({ isOpen, onClose, payment }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
        <div className="bg-white rounded-xl w-full max-w-2xl max-h-[92vh] overflow-hidden flex flex-col">
          {/* header */}
          <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              Verify Payment
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          {/* content scroll */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
            <p className="text-gray-600 text-sm sm:text-base">
              Review and verify payment details for{" "}
              <span className="font-medium text-gray-900">{payment?.lead}</span>
            </p>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  ["Lead Name", payment?.lead],
                  ["Amount", payment?.amount],
                  ["Payment Type", payment?.type],
                  ["Date", payment?.date],
                ].map(([label, value]) => (
                  <div key={label}>
                    <label className="text-xs text-gray-500 block">{label}</label>
                    <p className="text-sm text-gray-900 mt-1 break-words">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-900 block">
                Verification Checklist
              </label>
              {[
                { id: "check1", label: "Payment receipt verified" },
                { id: "check2", label: "Bank transaction confirmed" },
                { id: "check3", label: "Amount matches invoice" },
                { id: "check4", label: "Customer details verified" },
              ].map((item) => (
                <div key={item.id} className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id={item.id}
                    checked={checklist[item.id]}
                    onChange={() => handleChecklistChange(item.id)}
                    className="w-4 h-4 mt-0.5 text-green-600 border-gray-300 rounded"
                  />
                  <label htmlFor={item.id} className="text-sm text-gray-700 leading-snug">
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* footer */}
          <div className="p-4 sm:p-6 border-t border-gray-200 bg-white flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={onClose}
              className="w-full sm:flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-xl font-medium hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleVerifyPayment}
              disabled={!Object.values(checklist).every(Boolean)}
              className={`w-full sm:flex-1 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 ${Object.values(checklist).every(Boolean)
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
            >
              <CheckCircle className="w-4 h-4" />
              Verify Payment
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ReceivedModal = ({ isOpen, onClose, payment }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
        <div className="bg-white rounded-xl w-full max-w-md max-h-[92vh] overflow-hidden flex flex-col">
          {/* header */}
          <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              Mark Payment as Received
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          {/* content scroll */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
            <p className="text-gray-600 text-sm sm:text-base">
              Confirm that payment has been received from{" "}
              <span className="font-medium text-gray-900">{payment?.lead}</span>
            </p>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  ["Lead Name", payment?.lead],
                  ["Amount", payment?.amount],
                  ["Payment Type", payment?.type],
                  ["Date", payment?.date],
                ].map(([label, value]) => (
                  <div key={label}>
                    <label className="text-xs text-gray-500 block">{label}</label>
                    <p className="text-sm text-gray-900 mt-1 break-words">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-900 block">
                Confirmation
              </label>
              <p className="text-sm text-gray-600">
                This will change the status from "Payment Link Sent" to "Received". 
                The payment will then need to be verified by an admin or manager.
              </p>
            </div>
          </div>

          {/* footer */}
          <div className="p-4 sm:p-6 border-t border-gray-200 bg-white flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={onClose}
              className="w-full sm:flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-xl font-medium hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleMarkAsReceived}
              className="w-full sm:flex-1 bg-blue-600 text-white py-2.5 rounded-xl font-medium hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <CheckCheck className="w-4 h-4" />
              Mark as Received
            </button>
          </div>
        </div>
      </div>
    );
  };

  const BarTip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
        <p className="text-sm font-semibold text-gray-900">{label}</p>
        <p className="text-sm text-blue-600 mt-1">count : {payload[0].value}</p>
      </div>
    );
  };

  const getStatusInfo = (payment) => {
    if (payment.verified) return { text: "Verified", bg: "bg-green-100", textColor: "text-green-800" };
    if (payment.status === "failed") return { text: "Failed", bg: "bg-red-100", textColor: "text-red-800" };
    if (payment.status === "received") return { text: "Received", bg: "bg-blue-100", textColor: "text-blue-800" };
    if (payment.status === "payment") return { text: "Payment Link Sent", bg: "bg-orange-100", textColor: "text-orange-800" };
    return { text: "Pending", bg: "bg-gray-100", textColor: "text-gray-800" };
  };

  return (
    <div
      ref={printableRef}
      className="space-y-6 p-3 sm:p-6 w-full min-w-0 overflow-x-hidden bg-gray-50"
    >
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Track and manage payment transactions
          </p>
        </div>

        {canExportData && (
          <div className="w-full sm:w-auto">
            <ExportButton targetRef={printableRef} fileName="payments-dashboard.pdf">
              <div className="w-full sm:w-auto flex justify-center items-center gap-2 border border-gray-200 bg-white text-gray-900 px-5 py-2.5 rounded-full shadow-sm hover:bg-gray-50 transition">
                <Download className="w-4 h-4" />
                <span className="font-medium">Export</span>
              </div>
            </ExportButton>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {[
          ["Total Revenue", "₹12.4L", "text-green-600", "+18% From Last Month"],
          ["Verified", "72", "text-green-600", "+8% From Last Month"],
          ["Payment Link Sent", "14", "text-orange-600", "Awaiting Payment"],
          ["Received", "8", "text-blue-600", "Needs Verification"],
          ["Failed", "5", "text-red-600", "Requires Attention"],
        ].map(([title, value, c, sub]) => (
          <div
            key={title}
            className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 min-w-0"
          >
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-xl sm:text-2xl font-semibold text-gray-900 mt-2">
              {value}
            </p>
            <p className={`text-xs mt-2 ${c}`}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white border border-gray-200 rounded-xl inline-flex w-full overflow-x-auto no-scrollbar">
        {[
          ["all", "All Payments"],
          ["payment", "Payment Link Sent"],
          ["received", "Received"],
          ["verified", "Verified"],
          ["failed", "Failed"],
        ].map(([key, label], i) => (
          <button
            key={key}
            onClick={() => setSelectedTab(key)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap flex-1 min-w-[120px] ${i === 0 ? "rounded-l-xl" : i === 4 ? "rounded-r-xl" : ""
              } ${selectedTab === key
                ? "bg-green-50 text-green-700 border-b-2 border-green-500"
                : "text-gray-500 hover:text-gray-700"
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Mobile Cards */}
      <div className="block lg:hidden space-y-3">
        {filteredPayments.map((p) => {
          const statusInfo = getStatusInfo(p);
          return (
            <div key={p.id} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="min-w-0">
                  <p className="text-gray-900 font-medium truncate">{p.lead}</p>
                  <p className="text-sm text-gray-600 truncate">
                    Executive: {p.executive}
                  </p>
                </div>

                <span
                  className={`shrink-0 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.textColor}`}
                >
                  {statusInfo.text}
                </span>
              </div>

              <p className="text-gray-900 font-semibold">{p.amount}</p>
              <p className="text-sm text-gray-600 mt-1">
                {p.type} • {p.source}
              </p>
              <p className="text-sm text-gray-600 mt-1">Date: {p.date}</p>

              <div className="flex gap-2 mt-3">
                {canMarkReceived && p.status === "payment" && (
                  <button
                    onClick={() => {
                      setSelectedPayment(p);
                      setIsReceivedModalOpen(true);
                    }}
                    className="flex-1 border border-blue-500 text-blue-600 py-2 rounded-lg hover:bg-blue-50 text-sm flex items-center justify-center gap-1"
                  >
                    <CheckCheck className="w-4 h-4" />
                    Received
                  </button>
                )}

                {canVerifyPayments && p.status === "received" && !p.verified && (
                  <button
                    onClick={() => {
                      setSelectedPayment(p);
                      setIsVerifyModalOpen(true);
                    }}
                    className="flex-1 border border-green-500 text-green-600 py-2 rounded-lg hover:bg-green-50 text-sm flex items-center justify-center gap-1"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Verify
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b bg-gray-50">
                {["Lead", "Amount", "Payment Type", "Source", "Executive", "Date", "Status"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  )
                )}
                {(canMarkReceived || canVerifyPayments) && (
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3 whitespace-nowrap">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredPayments.map((p) => {
                const statusInfo = getStatusInfo(p);
                return (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{p.lead}</td>
                    <td className="px-4 py-3 text-sm">{p.amount}</td>
                    <td className="px-4 py-3 text-sm">{p.type}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{p.source}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{p.executive}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{p.date}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.textColor}`}
                      >
                        {statusInfo.text}
                      </span>
                    </td>

                    {(canMarkReceived || canVerifyPayments) && (
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          {canMarkReceived && p.status === "payment" && (
                            <button
                              onClick={() => {
                                setSelectedPayment(p);
                                setIsReceivedModalOpen(true);
                              }}
                              className="border border-blue-500 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-50 text-sm flex items-center gap-1"
                            >
                              <CheckCheck className="w-4 h-4" />
                              Received
                            </button>
                          )}

                          {canVerifyPayments && p.status === "received" && !p.verified && (
                            <button
                              onClick={() => {
                                setSelectedPayment(p);
                                setIsVerifyModalOpen(true);
                              }}
                              className="border border-green-500 text-green-600 px-3 py-1 rounded-lg hover:bg-green-50 text-sm flex items-center gap-1"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Verify
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ Charts (FIXED HEIGHT so ResponsiveContainer can render) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 min-w-0">
        {/* Bar Chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Payments by Type
          </h3>
          <div className="w-full h-[260px] sm:h-[320px] min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={paymentTypeData}
                margin={{ top: 8, right: 8, left: 0, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis
                  domain={[0, 60]}
                  ticks={[0, 15, 30, 45, 60]}
                  tickLine={false}
                />
                <XAxis dataKey="type" tickLine={false} />
                <Tooltip content={<BarTip />} cursor={{ fill: "rgba(0,0,0,0.06)" }} />
                <Bar
                  dataKey="count"
                  fill="#3b82f6"
                  barSize={barSize}
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Monthly Revenue Growth
          </h3>
          <div className="w-full h-[260px] sm:h-[320px] min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenueData}
                margin={{ top: 8, right: 8, left: 0, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis
                  domain={[0, 16]}
                  ticks={[0, 4, 8, 12, 16]}
                  tickLine={false}
                />
                <XAxis dataKey="month" tickLine={false} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 6 }}
                  name="Revenue (₹L)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Verify Modal */}
      <VerifyModal
        isOpen={isVerifyModalOpen}
        onClose={() => {
          setIsVerifyModalOpen(false);
          setSelectedPayment(null);
          setChecklist({ check1: false, check2: false, check3: false, check4: false });
        }}
        payment={selectedPayment}
      />

      {/* Received Modal */}
      <ReceivedModal
        isOpen={isReceivedModalOpen}
        onClose={() => {
          setIsReceivedModalOpen(false);
          setSelectedPayment(null);
        }}
        payment={selectedPayment}
      />
    </div>
  );
}