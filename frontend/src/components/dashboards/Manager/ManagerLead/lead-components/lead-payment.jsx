import React, { useEffect, useState } from "react";
import { X, Link as LinkIcon, IndianRupee } from "lucide-react";

export default function GeneratePaymentLinkModal({
  isOpen,
  onClose,
  leadName,
  openPopup,
}) {
  const [form, setForm] = useState({
    amount: "",
    paymentMode: "full",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");

  useEffect(() => {
    if (isOpen) {
      setForm({ amount: "", paymentMode: "full", notes: "" });
      setErrors({});
      setIsGenerating(false);
      setGeneratedLink("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const safePopup = (type, title, message) => {
    if (openPopup) openPopup(type, title, message);
    else console.log(`[${type}] ${title}: ${message}`);
  };

  const validate = () => {
    const e = {};
    if (!form.amount || Number(form.amount) <= 0) {
      e.amount = "Amount is required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  const handleGenerateLink = async (e) => {
    e.preventDefault();

    if (!validate()) {
      safePopup(
        "failure",
        "Validation Error",
        "Please enter a valid amount before generating link."
      );
      return;
    }

    setIsGenerating(true);
    safePopup("waiting", "Generating Link...", "Please wait a moment.");

    try {
      await new Promise((r) => setTimeout(r, 1000));
      const link = `https://pay.example.com/${Date.now()}`;
      setGeneratedLink(link);
      setIsGenerating(false);

      safePopup(
        "success",
        "Payment Link Generated!",
        `Link created for ${leadName || "lead"}.\nAmount: ₹${form.amount}`
      );
    } catch (err) {
      console.error(err);
      setIsGenerating(false);

      safePopup(
        "failure",
        "Generation Failed",
        "Could not generate payment link. Try again."
      );
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      safePopup("success", "Copied!", "Payment link copied to clipboard.");
    } catch (e) {
      safePopup("failure", "Copy Failed", "Unable to copy the link.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">
            Generate Payment Link
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-200">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleGenerateLink} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount *
            </label>
            <div className="relative">
              <IndianRupee className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                value={form.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                className={`w-full pl-9 pr-3 py-2 border rounded-xl ${
                  errors.amount
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="Enter amount"
              />
            </div>
            {errors.amount && (
              <p className="text-xs text-red-600 mt-1">{errors.amount}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Mode
            </label>
            <select
              value={form.paymentMode}
              onChange={(e) => handleChange("paymentMode", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-xl bg-white"
            >
              <option value="full">Full Payment</option>
              <option value="emi">EMI</option>
              <option value="loan">Loan</option>
              <option value="credit">Credit Card</option>
              <option value="upi">UPI</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (optional)
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-xl"
              placeholder="Any notes for payment..."
            />
          </div>

          {generatedLink && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-sm text-green-700 font-medium mb-2">
                Payment Link
              </p>
              <div className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-green-600" />
                <input
                  readOnly
                  value={generatedLink}
                  className="flex-1 bg-white text-sm p-2 border rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3 py-2 text-sm bg-green-600 text-white rounded-lg"
                >
                  Copy
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-xl"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={isGenerating}
              className="px-4 py-2 bg-green-600 text-white rounded-xl disabled:opacity-60"
            >
              {isGenerating ? "Generating..." : "Generate Link"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}