import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";

import ProtectedRoute from "./ProtectedRoute";

import MainLayout from "../layouts/MainLayout";
import EmployeeList from "../pages/Employee/EmployeeList";
import DepartmentList from "../pages/Department/DepartmentList";
import RoleList from "../pages/Role/RoleList";
import DesignationList from "../pages/Designation/DesignationList";


export default function AppRoutes() {

    return (

        <Routes>

            <Route path="/" element={<Login />} />

            <Route
                path="/dashboard"
                element={

                    <ProtectedRoute>

                        <MainLayout>

                            <Dashboard />

                        </MainLayout>

                    </ProtectedRoute>

                }
            />
            <Route
                path="/employee"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <EmployeeList />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/departments"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <DepartmentList />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/roles"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <RoleList />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
                    <Route
                path="/designations"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <DesignationList />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

        </Routes>

    );

}