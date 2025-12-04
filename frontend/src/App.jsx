

import { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 1. Keep essential components as regular imports (small ones)
import { LoginPage } from "./components/auth/loginPage";
import Header from "./components/header/header";
import Accounts from "./components/Navbar/Accounts";
import Profile from "./components/Navbar/Profile";
import Settings from "./components/Navbar/Settings";

// 2. Loading component
const PageLoading = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// 3. Create a safe lazy loader that handles the error properly
const safeLazy = (importFunc, componentName) => {
  return lazy(async () => {
    try {
      const module = await importFunc();
      // Handle both default and named exports
      const Component = module.default || module;
      if (!Component) {
        throw new Error(`Component ${componentName} not found in module`);
      }
      return { default: Component };
    } catch (error) {
      console.error(`Error loading ${componentName}:`, error);
      // Return a fallback component
      return {
        default: () => (
          <div className="p-8 text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              Component Failed to Load
            </h2>
            <p className="text-gray-600">Please refresh the page or try again later.</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Refresh Page
            </button>
          </div>
        )
      };
    }
  });
};

// 4. Lazy load only the HEAVIEST components - start with just the layouts
const AdminLayout = safeLazy(() => import("./components/dashboards/admin/Layouts/AdminLayout"), "AdminLayout");
const ManagerLayout = safeLazy(() => import("./components/dashboards/Manager/Layouts/ManagerLayouts"), "ManagerLayout");
const TeamLeadLayout = safeLazy(() => import("./components/dashboards/Teamlead/Layouts/TeamleadLayout"), "TeamLeadLayout");
const SalesLayout = safeLazy(() => import("./components/dashboards/SalesExecutive/Layouts/SalesLayout"), "SalesLayout");

// 5. Import dashboard components normally for now (we'll lazy load them later)
import AdminPage from "./components/dashboards/admin/adminPage";
import LeadsList from "./components/dashboards/admin/a-lead/lead-list/admin-Lead-list";
import LeadDetail from "./components/dashboards/admin/a-lead/lead-details/admin-Lead-Details";
import { AutomationsModule } from "./components/dashboards/admin/a-automodel/admin-automodel";
import AdminSettings from "./components/dashboards/admin/a-settings/admin-settings";
import { AdminCallPage } from "./components/dashboards/admin/a-Calls/Admin-Calls";
import { PaymentsModule } from "./components/dashboards/admin/a-payments/Admin-payments-Pages";
import { AdminReports } from "./components/dashboards/admin/a-reports/Admin-Reports";
import AdminPipeline from "./components/dashboards/admin/a-pieline/Admin-Pipeline";

// Manager imports
import MainManagerDashboard from "./components/dashboards/Manager/ManagerDashboard";
import ManagerLeadsList from "./components/dashboards/Manager/ManagerLead/lead-list/manager-Lead-list";
import ManagerLeadDetail from "./components/dashboards/Manager/ManagerLead/lead-details/Manager-Lead-Details";
import { ManagerCallsModule } from "./components/dashboards/Manager/ManagerCalls/ManagerCalls";
import ManagerPaymentsModule from "./components/dashboards/Manager/ManagerPayments/ManagerPayments";
import ManagerPipeline from "./components/dashboards/Manager/ManagerPieline/Manager-Pipeline";
import { ManagerReportsModule } from "./components/dashboards/Manager/ManagerReports/ManagerReports";
import ManagerSettings from "./components/dashboards/Manager/Managersettings/manager-settings";
import { ManagerAutomationsModule } from "./components/dashboards/Manager/ManagerAutomation/ManagerAutomation";

// Team Lead imports
import { TeamLeadDashboard } from "./components/dashboards/Teamlead/Dashboard/Dashboard";
import TeamLeadsList from "./components/dashboards/Teamlead/Leads/tl-lead-list/Tl-Lead-list";
import TeamleadLeadDetail from "./components/dashboards/Teamlead/Leads/tl-lead-details/TL-Lead-Details";
import { TeamLeadCallsModule } from "./components/dashboards/Teamlead/Calls/TeamleadCalls";
import TeamLeadPaymentsModule from "./components/dashboards/Teamlead/Payment/TlPayment";
import TeamLeadPipeline from "./components/dashboards/Teamlead/Pipeline/TlPipeline";
import { TeamLeadReportsModule } from "./components/dashboards/Teamlead/Reports/TlReports";
import { TeamLeadAutomationsModule } from "./components/dashboards/Teamlead/Automation/TlAutomation";

// Sales Exec imports
import SalesExecutiveDashboard from "./components/dashboards/SalesExecutive/SalesDashboard/SalesDashboard";
import SalesLeadsList from "./components/dashboards/SalesExecutive/salesLead/sales-lead-list/sales-Lead-list";
import SalesLeadDetail from "./components/dashboards/SalesExecutive/salesLead/sales-lead-details/sales-Lead-Details";
import { SalesCallsModule } from "./components/dashboards/SalesExecutive/Calls/SalesCall";
import SalesPaymentsModule from "./components/dashboards/SalesExecutive/Payments/SalesPayment";
import { SalesReportsModule } from "./components/dashboards/SalesExecutive/Reports/SalesReports";
import SalesleadPipeline from "./components/dashboards/SalesExecutive/Pipeline/SalesPipeline";

// 6. Main App Component
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Header />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Global pages */}
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />

        {/* ADMIN Routes */}
        <Route 
          path="/admin" 
          element={
            <Suspense fallback={<PageLoading />}>
              <AdminLayout />
            </Suspense>
          }
        >
          <Route index element={<AdminPage />} />
          <Route path="lead-list" element={<LeadsList />} />
          <Route path="lead-details/:id" element={<LeadDetail />} />
          <Route path="automation" element={<AutomationsModule />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="call" element={<AdminCallPage />} />
          <Route path="payment" element={<PaymentsModule />} />
          <Route path="report" element={<AdminReports />} />
          <Route path="pipeline" element={<AdminPipeline />} />
        </Route>

        {/* MANAGER Routes */}
        <Route 
          path="/manager" 
          element={
            <Suspense fallback={<PageLoading />}>
              <ManagerLayout />
            </Suspense>
          }
        >
          <Route index element={<MainManagerDashboard />} />
          <Route path="lead-list" element={<ManagerLeadsList />} />
          <Route path="lead-details/:id" element={<ManagerLeadDetail />} />
          <Route path="call" element={<ManagerCallsModule />} />
          <Route path="settings" element={<ManagerSettings />} />
          <Route path="report" element={<ManagerReportsModule />} />
          <Route path="pipeline" element={<ManagerPipeline />} />
          <Route path="payment" element={<ManagerPaymentsModule />} />
          <Route path="automation" element={<ManagerAutomationsModule />} />
        </Route>

        {/* TEAM LEAD Routes */}
        <Route 
          path="/teamlead" 
          element={
            <Suspense fallback={<PageLoading />}>
              <TeamLeadLayout />
            </Suspense>
          }
        >
          <Route index element={<TeamLeadDashboard />} />
          <Route path="lead-list" element={<TeamLeadsList />} />
          <Route path="lead-details/:id" element={<TeamleadLeadDetail />} />
          <Route path="call" element={<TeamLeadCallsModule />} />
          <Route path="payment" element={<TeamLeadPaymentsModule />} />
          <Route path="pipeline" element={<TeamLeadPipeline />} />
          <Route path="report" element={<TeamLeadReportsModule />} />
          <Route path="automation" element={<TeamLeadAutomationsModule />} />
        </Route>

        {/* SALES EXEC Routes */}
        <Route 
          path="/salesexecutive" 
          element={
            <Suspense fallback={<PageLoading />}>
              <SalesLayout />
            </Suspense>
          }
        >
          <Route index element={<SalesExecutiveDashboard />} />
          <Route path="lead-list" element={<SalesLeadsList />} />
          <Route path="lead-details/:id" element={<SalesLeadDetail />} />
          <Route path="pipeline" element={<SalesleadPipeline />} />
          <Route path="call" element={<SalesCallsModule />} />
          <Route path="payment" element={<SalesPaymentsModule />} />
          <Route path="report" element={<SalesReportsModule />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<div className="p-10">404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}