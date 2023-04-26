import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, useLocation, Navigate, BrowserRouter } from "react-router-dom";
import { AdminPage } from "./pages/admin";
import { StudentsPage } from "./pages/students";
import { Sidebar } from "./components/Sidebar";
import { StudentPage } from "./pages/student";
import { StudentCardPage } from "./pages/studentcard";
import { LoginPage } from "./pages/login";
import { getCookie } from "./components/functions/getCookie";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/student-card/:studentName"
          element={
            <RequiteStudentAuth>
              <StudentCardPage />
            </RequiteStudentAuth>
          }
        />
        <Route
          path="/students"
          element={
            <RequireAuth>
              <StudentsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/student/:studentName"
          element={
            <RequireAuth>
              <StudentPage />
            </RequireAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminPage />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
    ,
  </React.StrictMode>,
);

function RequiteStudentAuth({ children }: { children: any }) {
  let location = useLocation();

  if (!getCookie("token") && !getCookie("student-token")) {
    return <Navigate to={`/`} state={{ from: location }} replace />;
  }

  return (
    <main className="min-h-full">
      <div className="p-4">{children}</div>
    </main>
  );
}

function RequireAuth({ children }: { children: any }) {
  let location = useLocation();
  let studentToken = getCookie("student-token");
  if (studentToken && !getCookie("token")) {
    return (
      <Navigate
        to={`/student-card/${studentToken}`}
        state={{ from: location }}
        replace
      />
    );
  }

  if (!getCookie("token")) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <main className="min-h-full">
      <Sidebar />
      <div className="p-4 sm:ml-64">{children}</div>
    </main>
  );
}
