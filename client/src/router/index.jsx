import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import ClassesPage from "../pages/ClassesPage"
import HomeAdminPage from "../pages/HomeAdminPage"
import LessonsPage from "../pages/LessonsPage"
import StudentsPage from "../pages/StudentsPage"
import TeachersPage from "../pages/TeachersPage"
import StudentPage from "../pages/StudentPage"
import LoginPage from "../pages/LoginPage"
import RequireAuth from "../components/RequireAuth"
import CreateStudentPage from "../pages/CreateStudentPage"
import CreateTeacherPage from "../pages/CreateTeacherPage"
import EditStudentPage from "../pages/EditStudentPage"
import CreateLessonPage from "../pages/CreateLessonPage"
import EditTeacherPage from "../pages/EditTeacherPage"
import UnauthorizedPage from "../pages/UnauthorizedPage"
import HomeStudentPage from "../pages/HomeStudentPage"
import HomeAcademicianPage from "../pages/HomeTeacherPage"
import NotFoundPage from "../pages/NotFoundPage"
import AttendancePage from "../pages/AttendancePage"
import EditAttendancePage from "../pages/EditAttendancePage"

export const router = createBrowserRouter([
    {
        // path:"/",
        element: <MainLayout />,
        children: [
            {
                path: "/home/admin",
                element:
                    <RequireAuth allowedRoles={["admin"]}>
                        <HomeAdminPage />
                    </RequireAuth>
            },
            {
                path: "/",
                element:
                    <RequireAuth allowedRoles={["admin","student","teacher"]}>
                        <HomeAdminPage />
                    </RequireAuth>
            },
            {
                path: "/home/student",
                element:
                    <RequireAuth allowedRoles={["student"]}>
                        <HomeStudentPage />
                    </RequireAuth>
            },
            {
                path: "/home/academician",
                element:
                    <RequireAuth allowedRoles={["academician"]}>
                        <AttendancePage />
                    </RequireAuth>
            },
            {
                path: "/students",
                element:
                    <RequireAuth>
                        <StudentsPage />
                    </RequireAuth>
            },
            {
                path: "/students/create",
                element:
                    <RequireAuth >
                        <CreateStudentPage />
                    </RequireAuth>
            },
            {
                path: "/students/:id",
                element:
                    <RequireAuth>
                        <StudentPage />
                    </RequireAuth>
            },
            {
                path: "/students/edit/:id",
                element:
                    <RequireAuth>
                        <EditStudentPage />
                    </RequireAuth>
            },
            {
                path: "/teachers",
                element:
                    <RequireAuth>
                        <TeachersPage />
                    </RequireAuth>
            },
            {
                path: "/editAttendance",
                element:
                    <RequireAuth allowedRoles={["academician"]}>
                        <EditAttendancePage />
                    </RequireAuth>
            },
            {
                path: "/teachers/create",
                element:
                    <RequireAuth>   
                        <CreateTeacherPage />
                    </RequireAuth>
            },
            {
                path: "/teachers/edit/:id",
                element:
                    <RequireAuth>
                        <EditTeacherPage />
                    </RequireAuth>
            },
            {
                path: "/lessons",
                element:
                    <RequireAuth>
                        <LessonsPage />
                    </RequireAuth>
            },
            {
                path: "/lessons/create",
                element:
                    <RequireAuth>
                        <CreateLessonPage />
                    </RequireAuth>
            },
            {
                path: "/classes",
                element:
                    <RequireAuth>
                        <ClassesPage />
                    </RequireAuth>
            },
        ]
    },
    {
        path: "/unauthorized",
        element:
            <RequireAuth allowedRoles={["admin", "student"]}>
                <UnauthorizedPage />
            </RequireAuth>
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "*",
        element: <NotFoundPage />
    }
])