import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DataUpload from './pages/DataUpload';
import LCA from './pages/LCA';
import Circularity from './pages/Circularity';
import Transportation from './pages/Transportation';
import Simulator from './pages/Simulator';
import Scoring from './pages/Scoring';
import Recommendations from './pages/Recommendations';
import Reports from './pages/Reports';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
