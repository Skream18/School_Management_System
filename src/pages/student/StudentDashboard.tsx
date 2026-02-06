import { Calendar, TrendingUp, Award, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { mockStudents, mockAttendance, mockPerformance } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

export default function StudentDashboard() {
  const { user } = useAuth();
  const student = mockStudents[0];
  const myAttendance = mockAttendance.filter(a => a.studentId === student.id);
  const myPerformance = mockPerformance.filter(p => p.studentId === student.id);

  const recentAttendance = myAttendance.slice(0, 7);
  const recentPerformance = myPerformance.slice(0, 3);

  const totalAttendance = myAttendance.length;
  const presentCount = myAttendance.filter(a => a.status === 'present').length;
  const attendanceRate = totalAttendance > 0 ? ((presentCount / totalAttendance) * 100).toFixed(1) : '0';

  const excellentCount = myPerformance.filter(p => p.tags.includes('excellent')).length;

  const stats = [
    {
      title: '出勤率',
      value: `${attendanceRate}%`,
      icon: Calendar,
      color: 'from-blue-500 to-blue-600',
      subtitle: '本学期'
    },
    {
      title: '优秀评价',
      value: excellentCount,
      icon: Award,
      color: 'from-yellow-500 to-yellow-600',
      subtitle: '累计获得'
    },
    {
      title: '课程进度',
      value: '85%',
      icon: BookOpen,
      color: 'from-green-500 to-green-600',
      subtitle: '学期进度'
    },
    {
      title: '综合评分',
      value: 'A',
      icon: TrendingUp,
      color: 'from-red-500 to-red-600',
      subtitle: '本月表现'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-500';
      case 'absent':
        return 'bg-red-500';
      case 'late':
        return 'bg-orange-500';
      case 'leave':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'present':
        return '出席';
      case 'absent':
        return '缺席';
      case 'late':
        return '迟到';
      case 'leave':
        return '请假';
      default:
        return status;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl shadow-xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">欢迎回来，{student.name}！</h1>
              <p className="text-blue-100">{student.class}</p>
            </div>
            <Link
              to={`/student-report/${student.id}`}
              className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
            >
              查看完整报告
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">最近考勤</h2>
              <Link to="/student/attendance" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                查看全部
              </Link>
            </div>
            <div className="space-y-3">
              {recentAttendance.map(record => (
                <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div>
                    <p className="font-medium text-gray-800">
                      {new Date(record.date).toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'short' })}
                    </p>
                    {record.notes && (
                      <p className="text-sm text-gray-600 mt-1">{record.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`w-3 h-3 rounded-full ${getStatusColor(record.status)}`}></span>
                    <span className="text-sm font-semibold text-gray-700">{getStatusLabel(record.status)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">最近评价</h2>
              <Link to={`/student-report/${student.id}`} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                查看全部
              </Link>
            </div>
            <div className="space-y-4">
              {recentPerformance.map(record => (
                <div key={record.id} className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800">{record.subject}</h3>
                      <p className="text-sm text-gray-600">{record.week}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-full ${
                      record.assessmentLevel === 'A' ? 'bg-green-500' :
                      record.assessmentLevel === 'B' ? 'bg-blue-500' : 'bg-orange-500'
                    } flex items-center justify-center text-white font-bold shadow-md`}>
                      {record.assessmentLevel}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{record.comment}</p>
                  <div className="flex flex-wrap gap-2">
                    {record.tags.map(tag => {
                      const tagLabels: Record<string, string> = {
                        'excellent': '优秀',
                        'needs-improvement': '需要改进',
                        'homework-missing': '作业缺交',
                        'active-in-class': '课堂活跃'
                      };
                      return (
                        <span key={tag} className="text-xs bg-white px-2 py-1 rounded-full text-gray-700 font-medium">
                          {tagLabels[tag]}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
