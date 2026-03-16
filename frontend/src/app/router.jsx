// frontend/src/app/router.jsx

import { Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import RoleRoute from "../components/auth/RoleRoute";

import Dashboard from "../pages/dashboard/Dashboard";
import Users from "../pages/users/Users";
import PocketUsers from "../pages/users/PocketUsers";
import Login from "../pages/login/Login";
import Transfer from "../pages/transfer/Transfer";
import Receive from "../pages/receive/Receive";
import Sales from "../pages/Sales/Sales";
import Report from "../pages/report/Report";
import RolesPermissions from "../pages/rolesPermissions/RolesPermissions";
import LoginAccess from "../pages/loginAccess/LoginAccess";
import Api from "../pages/api/Api";
import Settings from "../pages/settings/Settings";
import Inventorization from "../pages/inventorization/Inventorization";
import WebsiteUsers from "../pages/users/WebsiteUsers";
import PocketRoles from "../pages/users/PocketRoles";
import WebsiteRoles from "../pages/users/WebsiteRoles";
import ModuleRoute from "../components/auth/ModuleRoute";
import Warehouses from "../pages/settings/Warehouses";
import InventorizationList from "../pages/inventorization/InventorizationList";
import InventorizationDetail from "../pages/inventorization/InventorizationDetail";
import TransferList from "../pages/transfer/TransferList";
import TransferDetail from "../pages/transfer/TransferDetail";
import PriceLists from "../pages/sales/PriceLists";
import PriceUploadDetail from "../pages/sales/PriceUploadDetail";

export default function Router() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<Login />} />

      {/* Protected layout */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Accessible by admin + super_admin */}
        <Route index element={<Dashboard />} />
        {/* <Route path="/inventorization" element={<Inventorization />} /> */}
        {/* <Route path="/transfer-list" element={<Transfer />} />
        <Route path="/transfer/:id" element={<Transfer />} /> */}
        <Route path="/receive" element={<Receive />} />
        {/* <Route path="/sales" element={<Sales />} /> */}
        <Route path="/report" element={<Report />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/pocket-users" element={<PocketUsers />} />
        <Route path="/users/pocket-roles" element={<PocketRoles />} />
        {/* <Route path="/roles-permissions" element={<RolesPermissions />} /> */}
        <Route path="/login-access" element={<LoginAccess />} />
        <Route path="/api" element={<Api />} />
        <Route path="/settings" element={<Settings />} />

        {/* Super Admin only */}
        <Route
          path="/roles-permissions"
          element={
            <RoleRoute roles={["super_admin"]}>
              <RolesPermissions />
            </RoleRoute>
          }
        />
        <Route
          path="/sales"
          element={
            <ModuleRoute module="sales">
              <Sales />
            </ModuleRoute>
          }
        />
        <Route
          path="/sales/price-lists"
          element={
            <ModuleRoute module="sales">
              <PriceLists />
            </ModuleRoute>
          }
        />

        <Route
          path="/sales/price-lists/:id"
          element={
            <ModuleRoute module="sales">
              <PriceUploadDetail />
            </ModuleRoute>
          }
        />
        <Route
          path="/users/website-users"
          element={
            <ModuleRoute module="website_users">
              <WebsiteUsers />
            </ModuleRoute>
          }
        />
        <Route
          path="/users/website-roles"
          element={
            <ModuleRoute module="website_roles">
              <WebsiteRoles />
            </ModuleRoute>
          }
        />
        <Route
          path="/settings/warehouses"
          element={
            <ModuleRoute module="warehouses">
              <Warehouses />
            </ModuleRoute>
          }
        />
        <Route
          path="/inventorization"
          element={
            <ModuleRoute module="inventorization">
              <InventorizationList />
            </ModuleRoute>
          }
        />
        <Route
          path="/inventorization/:id"
          element={
            <ModuleRoute module="inventorization">
              <InventorizationDetail />
            </ModuleRoute>
          }
        />
        <Route
          path="/transfer-list"
          element={
            <ModuleRoute module="transfer">
              <TransferList />
            </ModuleRoute>
          }
        />
        <Route
          path="/transfer/:id"
          element={
            <ModuleRoute module="transfer">
              <TransferDetail />
            </ModuleRoute>
          }
        />
        {/*<Route
          path="/settings"
          element={
            <RoleRoute roles={["super_admin"]}>
              <Settings />
            </RoleRoute>
          }
        /> */}
      </Route>
    </Routes>
  );
}
