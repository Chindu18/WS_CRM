import { useState } from "react";
import { Plus, Zap } from "lucide-react";
import Popup from "../../../commonpopup/popup"; // ✅ change path as per your project

export function TeamLeadAutomationsModule() {
  const [isAddRuleModalOpen, setIsAddRuleModalOpen] = useState(false);
  const [rules, setRules] = useState([
    {
      id: "1",
      name: "Auto-assign Hot Leads",
      conditions: "Source = Meta Ads AND Score > 70",
      actions: 'Assign to TL "Arun" → Priority: Hot → Notify TL',
      enabled: true,
    },
    {
      id: "2",
      name: "Follow-up Reminder",
      conditions: "Last Contact > 2 days",
      actions:
        'Send reminder to Executive → Update status to "Follow-up Required"',
      enabled: true,
    },
    {
      id: "3",
      name: "Payment Link Auto-send",
      conditions: "Status = Interested AND Call Result = Positive",
      actions: "Send payment link via Email & WhatsApp",
      enabled: false,
    },
    {
      id: "4",
      name: "Cold Lead Re-engagement",
      conditions: "Status = Cold AND Last Contact > 7 days",
      actions: "Send re-engagement email → Schedule follow-up call",
      enabled: true,
    },
  ]);

  // ✅ Popup state
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

  // Form state
  const [newRule, setNewRule] = useState({
    name: "",
    conditions: [],
    actions: [],
  });

  const [errors, setErrors] = useState({});
  const [conditionInputs, setConditionInputs] = useState([
    { field: "", operator: "", value: "" },
  ]);
  const [actionInputs, setActionInputs] = useState([
    { type: "", value: "" },
  ]);

  const toggleRule = (id) => {
    setRules((prev) =>
      prev.map((rule) =>
        rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
  };

  const validateForm = () => {
    const newErrors = {};

    if (!newRule.name.trim()) newErrors.name = "Rule name is required";

    if (
      conditionInputs.length === 0 ||
      conditionInputs.some(
        (cond) => !cond.field || !cond.operator || !cond.value
      )
    ) {
      newErrors.conditions = "At least one valid condition is required";
    }

    if (
      actionInputs.length === 0 ||
      actionInputs.some((action) => !action.type || !action.value)
    ) {
      newErrors.actions = "At least one valid action is required";
    }

    setErrors(newErrors);
    console.log(newRule)
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveRule = () => {
    // ✅ show popup if validation fails
    if (!validateForm()) {
      openPopup(
        "failure",
        "Validation Error",
        "Please fill in all required fields before saving."
      );
      return;
    }

    const formattedConditions = conditionInputs
      .map((c) => `${c.field} ${c.operator} ${c.value}`)
      .join(" AND ");

    const formattedActions = actionInputs
      .map((a) => `${a.type}: ${a.value}`)
      .join(" → ");

    const rule = {
      id: Date.now().toString(),
      name: newRule.name,
      conditions: formattedConditions,
      actions: formattedActions,
      enabled: true,
    };

    setRules((prev) => [...prev, rule]);

    // ✅ success popup
    openPopup(
      "success",
      "Rule Added",
      "Automation rule created successfully!"
    );

    handleCloseModal();
  };

  const handleConditionChange = (index, field, value) => {
    setConditionInputs((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleActionChange = (index, field, value) => {
    setActionInputs((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const addCondition = () =>
    setConditionInputs((prev) => [
      ...prev,
      { field: "", operator: "", value: "" },
    ]);

  const removeCondition = (index) => {
    setConditionInputs((prev) =>
      prev.length > 1 ? prev.filter((_, i) => i !== index) : prev
    );
  };

  const addAction = () =>
    setActionInputs((prev) => [...prev, { type: "", value: "" }]);

  const removeAction = (index) => {
    setActionInputs((prev) =>
      prev.length > 1 ? prev.filter((_, i) => i !== index) : prev
    );
  };

  const handleCloseModal = () => {
    setIsAddRuleModalOpen(false);
    setNewRule({ name: "", conditions: [], actions: [] });
    setConditionInputs([{ field: "", operator: "", value: "" }]);
    setActionInputs([{ type: "", value: "" }]);
    setErrors({});
  };

  return (
    <div className="space-y-5 p-3 sm:p-6 w-full min-w-0">
      {/* ✅ Popup */}
      <Popup
        open={popup.open}
        type={popup.type}
        title={popup.title}
        message={popup.message}
        onClose={closePopup}
      />

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Automations
          </h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Set up automated workflows and rules
          </p>
        </div>

        <button
          onClick={() => setIsAddRuleModalOpen(true)}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center justify-center transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Rule
        </button>
      </div>

      {/* Active Rules Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Rules</p>
              <p className="text-2xl font-semibold text-gray-900 mt-2">
                {rules.filter((r) => r.enabled).length}
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Triggered Today</p>
              <p className="text-2xl font-semibold text-gray-900 mt-2">24</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Success Rate</p>
              <p className="text-2xl font-semibold text-gray-900 mt-2">94%</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Rules Builder */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm min-w-0">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Automation Rules
          </h2>
        </div>

        {/* Mobile cards */}
        <div className="p-4 sm:p-6 space-y-3 lg:hidden">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className="border border-gray-200 rounded-xl p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 truncate">
                    {rule.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Conditions</p>
                  <p className="text-sm text-gray-700 break-words">
                    {rule.conditions}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Actions</p>
                  <p className="text-sm text-gray-700 break-words">
                    {rule.actions}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span
                    className={`inline-flex px-2.5 py-0.5 rounded-lg text-xs font-medium ${
                      rule.enabled
                        ? "bg-green-50 text-green-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {rule.enabled ? "Active" : "Inactive"}
                  </span>

                  <button
                    onClick={() => toggleRule(rule.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      rule.enabled ? "bg-blue-600" : "bg-gray-200"
                    }`}
                    aria-label="toggle rule"
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        rule.enabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden lg:block p-6">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">
                    Rule Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">
                    Conditions
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">
                    Actions
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">
                    Toggle
                  </th>
                </tr>
              </thead>
              <tbody>
                {rules.map((rule) => (
                  <tr
                    key={rule.id}
                    className="border-b border-gray-200 last:border-b-0"
                  >
                    <td className="py-4 px-4 text-gray-900">{rule.name}</td>
                    <td className="py-4 px-4">
                      <code className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {rule.conditions}
                      </code>
                    </td>
                    <td className="py-4 px-4 text-gray-600 text-sm">
                      {rule.actions}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium ${
                          rule.enabled
                            ? "bg-green-50 text-green-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {rule.enabled ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => toggleRule(rule.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          rule.enabled ? "bg-blue-600" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            rule.enabled ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Example Templates */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Popular Templates
          </h2>
        </div>

        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              {
                title: "Lead Score Assignment",
                desc:
                  "Automatically score leads based on source and engagement",
                bg: "bg-blue-50 text-blue-600",
              },
              {
                title: "Welcome Email Sequence",
                desc: "Send welcome emails to new leads automatically",
                bg: "bg-green-50 text-green-600",
              },
              {
                title: "Task Assignment",
                desc:
                  "Auto-assign tasks based on lead status changes",
                bg: "bg-orange-50 text-orange-600",
              },
              {
                title: "Payment Reminder",
                desc:
                  "Send payment reminders for pending invoices",
                bg: "bg-purple-50 text-purple-600",
              },
            ].map((t) => (
              <div
                key={t.title}
                className="p-4 border border-gray-200 rounded-xl hover:border-blue-600 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 ${t.bg} rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <Zap className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-medium text-gray-900">
                      {t.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      {t.desc}
                    </p>
                    <button className="text-blue-600 text-xs mt-2 hover:text-blue-700">
                      Use Template
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Rule Modal */}
      {isAddRuleModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Create Automation Rule
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Define conditions and actions for your automation
              </p>
            </div>

            {/* scroll area */}
            <div className="p-4 sm:p-6 space-y-6 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Rule Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Auto-assign premium leads"
                  value={newRule.name}
                  onChange={(e) =>
                    setNewRule({ ...newRule, name: e.target.value })
                  }
                  className={`w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.name ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Conditions */}
              <div
                className={`border rounded-xl p-4 ${
                  errors.conditions ? "border-red-300" : "border-gray-200"
                }`}
              >
                <h4 className="text-sm font-medium text-gray-900 mb-4">
                  Conditions (When this happens)
                </h4>

                <div className="space-y-3">
                  {conditionInputs.map((condition, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-start"
                    >
                      <select
                        value={condition.field}
                        onChange={(e) =>
                          handleConditionChange(index, "field", e.target.value)
                        }
                        className="rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Field</option>
                        <option value="source">Lead Source</option>
                        <option value="score">Lead Score</option>
                        <option value="status">Status</option>
                        <option value="priority">Priority</option>
                        <option value="last_contact">Last Contact</option>
                      </select>

                      <select
                        value={condition.operator}
                        onChange={(e) =>
                          handleConditionChange(
                            index,
                            "operator",
                            e.target.value
                          )
                        }
                        className="rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Operator</option>
                        <option value="=">=</option>
                        <option value=">">&gt;</option>
                        <option value="<">&lt;</option>
                        <option value=">=">&gt;=</option>
                        <option value="<=">&lt;=</option>
                        <option value="contains">Contains</option>
                      </select>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Value"
                          value={condition.value}
                          onChange={(e) =>
                            handleConditionChange(index, "value", e.target.value)
                          }
                          className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {conditionInputs.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeCondition(index)}
                            className="px-2 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addCondition}
                    className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors w-full sm:w-auto"
                  >
                    + Add Condition
                  </button>

                  {errors.conditions && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.conditions}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div
                className={`border rounded-xl p-4 ${
                  errors.actions ? "border-red-300" : "border-gray-200"
                }`}
              >
                <h4 className="text-sm font-medium text-gray-900 mb-4">
                  Actions (Do this)
                </h4>

                <div className="space-y-3">
                  {actionInputs.map((action, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-start"
                    >
                      <select
                        value={action.type}
                        onChange={(e) =>
                          handleActionChange(index, "type", e.target.value)
                        }
                        className="rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Action Type</option>
                        <option value="assign">Assign to</option>
                        <option value="notify">Send Notification</option>
                        <option value="email">Send Email</option>
                        <option value="status">Update Status</option>
                        <option value="priority">Update Priority</option>
                        <option value="schedule">Schedule Task</option>
                      </select>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Action value"
                          value={action.value}
                          onChange={(e) =>
                            handleActionChange(index, "value", e.target.value)
                          }
                          className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {actionInputs.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeAction(index)}
                            className="px-2 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addAction}
                    className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors w-full sm:w-auto"
                  >
                    + Add Action
                  </button>

                  {errors.actions && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.actions}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* footer */}
            <div className="p-4 sm:p-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
              <button
                onClick={handleCloseModal}
                className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRule}
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                Save Rule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}