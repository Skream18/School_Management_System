import { Users, GraduationCap, BookOpen, TrendingUp, Calendar, Award } from 'lucide-react';
import Layout from '../../components/Layout';
import { mockStudents, mockClasses, mockUsers, mockAttendance } from '../../data/mockData';

export default function AdminDashboard() {
  const totalStudents = mockStudents.length;
  const totalTeachers = mockUsers.filter(u => u.role === 'teacher').length;
  const totalClasses = mockClasses.length;
  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = mockAttendance.filter(a => a.date === today);
  const attendanceRate = todayAttendance.length > 0
    ? ((todayAttendance.filter(a => a.status === 'present').length / todayAttendance.length) * 100).toFixed(1)
    : '0';

  const stats = [
    {
      title: '学生总数',
      value: totalStudents,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      change: '+5',
      changeLabel: '本学期'
    },
    {
      title: '教师总数',
      value: totalTeachers,
      icon: GraduationCap,
      color: 'from-green-500 to-green-600',
      change: '+1',
      changeLabel: '本学期'
    },
    {
      title: '班级总数',
      value: totalClasses,
      icon: BookOpen,
      color: 'from-orange-500 to-orange-600',
      change: '',
      changeLabel: '活跃班级'
    },
    {
      title: '今日出勤率',
      value: `${attendanceRate}%`,
      icon: Calendar,
      color: 'from-red-500 to-red-600',
      change: '+2%',
      changeLabel: '较昨日'
    }
  ];

  const recentActivities = [
    { action: '张老师', description: '完成了五年级(3)班的数学考勤', time: '10分钟前', type: 'attendance' },
    { action: '李明', description: '获得优秀评价', time: '30分钟前', type: 'performance' },
    { action: '系统', description: '每周报告已生成', time: '1小时前', type: 'system' },
    { action: '王小华家长', description: '查看了孩子的学习报告', time: '2小时前', type: 'view' }
  ];

  const classPerformance = mockClasses.map(cls => ({
    name: cls.name,
    students: cls.students.length,
    attendance: Math.floor(Math.random() * 10) + 90,
    performance: ['优秀', '良好', '一般'][Math.floor(Math.random() * 3)]
  }));

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">管理员控制台</h1>
          <p className="text-gray-600">欢迎回来，王校长！今天是 {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    {stat.change && (
                      <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                        {stat.change}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.changeLabel}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">班级概览</h2>
              <BookOpen className="w-5 h-5 text-gray-400" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">班级</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">学生人数</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">出勤率</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">整体表现</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {classPerformance.map((cls, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <p className="font-medium text-gray-800">{cls.name}</p>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-gray-700">{cls.students}人</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          cls.attendance >= 95 ? 'bg-green-100 text-green-700' :
                          cls.attendance >= 90 ? 'bg-blue-100 text-blue-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {cls.attendance}%
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          cls.performance === '优秀' ? 'bg-yellow-100 text-yellow-700' :
                          cls.performance === '良好' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {cls.performance}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">最近动态</h2>
                <TrendingUp className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                      activity.type === 'attendance' ? 'bg-blue-100' :
                      activity.type === 'performance' ? 'bg-green-100' :
                      activity.type === 'system' ? 'bg-gray-100' :
                      'bg-orange-100'
                    }`}>
                      {activity.type === 'attendance' && <Calendar className="w-4 h-4 text-blue-600" />}
                      {activity.type === 'performance' && <Award className="w-4 h-4 text-green-600" />}
                      {activity.type === 'system' && <TrendingUp className="w-4 h-4 text-gray-600" />}
                      {activity.type === 'view' && <Users className="w-4 h-4 text-orange-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                      <p className="text-xs text-gray-600">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-md p-6 text-white">
              <Award className="w-10 h-10 mb-4" />
              <h3 className="font-semibold text-lg mb-2">本周数据</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">新增学生</span>
                  <span className="font-bold text-xl">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">优秀评价</span>
                  <span className="font-bold text-xl">32</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">平均出勤率</span>
                  <span className="font-bold text-xl">94%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
