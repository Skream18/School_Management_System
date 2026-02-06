import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Home, Users, FileText, Bell, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navigation() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getNavLinks = () => {
    const baseLink = `/${user?.role}`;

    switch (user?.role) {
      case 'teacher':
        return [
          { to: baseLink, icon: Home, label: '首页' },
          { to: `${baseLink}/attendance`, icon: FileText, label: '考勤' },
          { to: `${baseLink}/performance`, icon: Users, label: '评价' }
        ];
      case 'student':
        return [
          { to: baseLink, icon: Home, label: '首页' },
          { to: `${baseLink}/attendance`, icon: FileText, label: '考勤记录' }
        ];
      case 'parent':
        return [
          { to: baseLink, icon: Home, label: '首页' },
          { to: `${baseLink}/child`, icon: Users, label: '孩子情况' }
        ];
      case 'admin':
        return [
          { to: baseLink, icon: Home, label: '首页' },
          { to: `${baseLink}/users`, icon: Users, label: '用户管理' },
          { to: `${baseLink}/classes`, icon: FileText, label: '班级管理' }
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavLinks();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to={`/${user?.role}`} className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-800 hidden sm:block">智慧校园</span>
            </Link>

            <div className="hidden md:flex space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="hidden md:flex items-center space-x-3">
              <img
                src={user?.avatar || 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200'}
                alt={user?.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
              />
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.role === 'teacher' ? '教师' : user?.role === 'student' ? '学生' : user?.role === 'parent' ? '家长' : '管理员'}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="hidden md:flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">退出</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 px-4 py-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">退出登录</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
