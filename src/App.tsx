import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import AttendanceMark from './pages/teacher/AttendanceMark';
import StudentPerformance from './pages/teacher/StudentPerformance';
import StudentDashboard from './pages/student/StudentDashboard';
import ParentDashboard from './pages/parent/ParentDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentReport from './pages/StudentReport';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/teacher/attendance" element={<AttendanceMark />} />
          <Route path="/teacher/performance" element={<StudentPerformance />} />

          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/attendance" element={<StudentDashboard />} />

          <Route path="/parent" element={<ParentDashboard />} />
          <Route path="/parent/child" element={<ParentDashboard />} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminDashboard />} />
          <Route path="/admin/classes" element={<AdminDashboard />} />

          <Route path="/student-report/:studentId" element={<StudentReport />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
