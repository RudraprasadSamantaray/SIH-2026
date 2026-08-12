import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Shared
import RoleGuard from './components/RoleGuard';

// Layouts
import Layout from './components/Layout';
import AuditorLayout from './components/AuditorLayout';
import AdminLayout from './components/AdminLayout';

// Auth
import Login from './pages/Login';

// === ENGINEER PAGES ===
import Dashboard from './pages/Dashboard';
import DataUpload from './pages/DataUpload';
import LCA from './pages/LCA';
import Circularity from './pages/Circularity';
import Transportation from './pages/Transportation';
import Simulator from './pages/Simulator';
import Scoring from './pages/Scoring';
import Recommendations from './pages/Recommendations';
import Reports from './pages/Reports';

// === AUDITOR PAGES ===
import AuditOverview from './pages/auditor/AuditOverview';
import DataVerification from './pages/auditor/DataVerification';
import LCAReview from './pages/auditor/LCAReview';
import CircularityReview from './pages/auditor/CircularityReview';
import TransportationReview from './pages/auditor/TransportationReview';
import ScenarioReview from './pages/auditor/ScenarioReview';
import RecommendationsReview from './pages/auditor/RecommendationsReview';
import AuditorReports from './pages/auditor/AuditorReports';

// === ADMIN PAGES ===
import AdminOverview from './pages/admin/AdminOverview';
import AdminPlants from './pages/admin/AdminPlants';
import AnalysisStatus from './pages/admin/AnalysisStatus';
import AuditStatus from './pages/admin/AuditStatus';
import AdminReports from './pages/admin/AdminReports';
import UserRoles from './pages/admin/UserRoles';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* ============================================================
            ENGINEER PORTAL  —  Role: engineer
        ============================================================ */}
        <Route
          path="/"
          element={
            <RoleGuard allowedRole="engineer">
              <Layout />
            </RoleGuard>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="upload" element={<DataUpload />} />
          <Route path="lca" element={<LCA />} />
          <Route path="circularity" element={<Circularity />} />
          <Route path="transportation" element={<Transportation />} />
          <Route path="simulator" element={<Simulator />} />
          <Route path="scoring" element={<Scoring />} />
          <Route path="recommendations" element={<Recommendations />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* ============================================================
            AUDITOR PORTAL  —  Role: auditor
        ============================================================ */}
        <Route
          path="/auditor"
          element={
            <RoleGuard allowedRole="auditor">
              <AuditorLayout />
            </RoleGuard>
          }
        >
          <Route index element={<AuditOverview />} />
          <Route path="data-verification" element={<DataVerification />} />
          <Route path="lca" element={<LCAReview />} />
          <Route path="circularity" element={<CircularityReview />} />
          <Route path="transportation" element={<TransportationReview />} />
          <Route path="scenarios" element={<ScenarioReview />} />
          <Route path="recommendations" element={<RecommendationsReview />} />
          <Route path="reports" element={<AuditorReports />} />
        </Route>

        {/* ============================================================
            ADMIN PORTAL  —  Role: admin
        ============================================================ */}
        <Route
          path="/admin"
          element={
            <RoleGuard allowedRole="admin">
              <AdminLayout />
            </RoleGuard>
          }
        >
          <Route index element={<AdminOverview />} />
          <Route path="plants" element={<AdminPlants />} />
          <Route path="analysis" element={<AnalysisStatus />} />
          <Route path="audit" element={<AuditStatus />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="users" element={<UserRoles />} />
        </Route>

        {/* Catch-all: redirect to login for unknown routes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
