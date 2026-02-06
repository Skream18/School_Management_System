import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, User, Users, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const roles = [
  {
    id: 'teacher',
    name: '教师',
    icon: GraduationCap,
    color: 'from-blue-500 to-blue-600',
    description: '教学管理与评价'
  },
  {
    id: 'student',
    name: '学生',
    icon: User,
    color: 'from-green-500 to-green-600',
    description: '查看学习情况'
  },
  {
    id: 'parent',
    name: '家长',
    icon: Users,
    color: 'from-orange-500 to-orange-600',
    description: '关注孩子成长'
  },
  {
    id: 'admin',
    name: '管理员',
    icon: Shield,
    color: 'from-gray-600 to-gray-700',
    description: '系统管理'
  }
];

export default function Login() {
  const [selectedRole, setSelectedRole] = useState<string>('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (selectedRole) {
      login(selectedRole);
      navigate(`/${selectedRole}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl mb-4 shadow-lg">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">智慧校园管理系统</h1>
          <p className="text-gray-600">Smart School Management Platform</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">选择您的身份</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`relative overflow-hidden rounded-2xl p-6 border-2 transition-all duration-300 ${
                    selectedRole === role.id
                      ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center shadow-md`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">{role.name}</h3>
                      <p className="text-sm text-gray-600">{role.description}</p>
                    </div>
                    {selectedRole === role.id && (
                      <div className="absolute top-4 right-4">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={handleLogin}
            disabled={!selectedRole}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
              selectedRole
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:scale-105 active:scale-100'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            立即登录
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            演示系统 - 选择身份即可登录
          </p>
        </div>

        <div className="text-center mt-8 text-sm text-gray-600">
          <p>© 2026 智慧校园管理系统 - 教育信息化解决方案</p>
        </div>
      </div>
    </div>
  );
}
