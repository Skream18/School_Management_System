import { Link } from 'react-router-dom';
import { Calendar, TrendingUp, Bell, Award, AlertCircle, CheckCircle } from 'lucide-react';
import Layout from '../../components/Layout';
import { mockStudents, mockAttendance, mockPerformance, mockNotifications } from '../../data/mockData';

export default function ParentDashboard() {
  const child = mockStudents[0];
  const childAttendance = mockAttendance.filter(a => a.studentId === child.id);
  const childPerformance = mockPerformance.filter(p => p.studentId === child.id);
  const notifications = mockNotifications;

  const recentAttendance = childAttendance.slice(0, 5);
  const recentPerformance = childPerformance.slice(0, 2);

  const totalAttendance = childAttendance.length;
  const presentCount = childAttendance.filter(a => a.status === 'present').length;
  const attendanceRate = totalAttendance > 0 ? ((presentCount / totalAttendance) * 100).toFixed(1) : '0';

  const excellentCount = childPerformance.filter(p => p.tags.includes('excellent')).length;
  const needsAttentionCount = childPerformance.filter(p =>
    p.tags.includes('needs-improvement') || p.tags.includes('homework-missing')
  ).length;

  const stats = [
    {
      title: '出勤率',
      value: `${attendanceRate}%`,
      icon: Calendar,
      color: 'from-blue-500 to-blue-600',
      trend: '+2%'
    },
    {
      title: '优秀评价',
      value: excellentCount,
      icon: Award,
      color: 'from-yellow-500 to-yellow-600',
      trend: '+1'
    },
    {
      title: '需要关注',
      value: needsAttentionCount,
      icon: AlertCircle,
      color: 'from-orange-500 to-orange-600',
      trend: needsAttentionCount > 0 ? 'alert' : 'ok'
    },
    {
      title: '本周表现',
      value: 'A',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      trend: '优秀'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'text-green-600';
      case 'absent':
        return 'text-red-600';
      case 'late':
        return 'text-orange-600';
      case 'leave':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
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

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'attendance':
        return <Calendar className="w-5 h-5" />;
      case 'performance':
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl shadow-xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <img
              src={child.avatar}
              alt={child.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">孩子成长概览</h1>
              <p className="text-blue-100">{child.name} · {child.class}</p>
            </div>
            <Link
              to={`/student-report/${child.id}`}
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
                  <div className="flex items-end justify-between">
                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                    {stat.trend && stat.trend !== 'alert' && stat.trend !== 'ok' && (
                      <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                        {stat.trend}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">最近考勤</h2>
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recentAttendance.map(record => (
                  <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div>
                      <p className="font-medium text-gray-800">
                        {new Date(record.date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
                      </p>
                      {record.notes && (
                        <p className="text-xs text-gray-600 mt-1">{record.notes}</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {record.status === 'present' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-orange-600" />
                      )}
                      <span className={`text-sm font-semibold ${getStatusColor(record.status)}`}>
                        {getStatusLabel(record.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">教师评价</h2>
                <TrendingUp className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {recentPerformance.map(record => (
                  <div key={record.id} className="border border-gray-200 rounded-xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-800">{record.subject} - {record.week}</h3>
                        <p className="text-sm text-gray-600">{new Date(record.date).toLocaleDateString('zh-CN')}</p>
                      </div>
                      <div className={`w-10 h-10 rounded-full ${
                        record.assessmentLevel === 'A' ? 'bg-green-500' :
                        record.assessmentLevel === 'B' ? 'bg-blue-500' : 'bg-orange-500'
                      } flex items-center justify-center text-white font-bold shadow-md`}>
                        {record.assessmentLevel}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{record.comment}</p>
                    <div className="flex flex-wrap gap-2">
                      {record.tags.map(tag => {
                        const tagLabels: Record<string, string> = {
                          'excellent': '优秀',
                          'needs-improvement': '需要改进',
                          'homework-missing': '作业缺交',
                          'active-in-class': '课堂活跃'
                        };
                        return (
                          <span key={tag} className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
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

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">通知中心</h2>
                <Bell className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                {notifications.map(notif => (
                  <div
                    key={notif.id}
                    className={`p-4 rounded-xl border ${
                      notif.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-lg ${
                        notif.read ? 'bg-gray-200' : 'bg-blue-500'
                      } flex items-center justify-center text-white`}>
                        {getNotificationIcon(notif.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold ${notif.read ? 'text-gray-700' : 'text-gray-800'}`}>
                          {notif.title}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">{notif.message}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(notif.date).toLocaleDateString('zh-CN')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-md p-6 text-white">
              <Award className="w-10 h-10 mb-4" />
              <h3 className="font-semibold text-lg mb-2">本周亮点</h3>
              <ul className="space-y-2 text-sm text-green-100">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>本周全勤</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>数学获得优秀评价</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>课堂表现积极</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
