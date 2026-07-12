import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";

import ProtectedRoute from "./ProtectedRoute";

import MainLayout from "../layouts/MainLayout";
import EmployeeList from "../pages/Employee/EmployeeList";

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

        </Routes>

    );

}