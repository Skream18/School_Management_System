import { Link } from 'react-router-dom';
import { Calendar, ClipboardCheck, UserCheck, AlertCircle, TrendingUp, Clock } from 'lucide-react';
import Layout from '../../components/Layout';
import { mockClasses, mockStudents, mockAttendance } from '../../data/mockData';

export default function TeacherDashboard() {
  const todayClasses = mockClasses;
  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = mockAttendance.filter(a => a.date === today);
  const absentToday = todayAttendance.filter(a => a.status === 'absent' || a.status === 'late');

  const studentsNeedingAttention = mockStudents.slice(0, 3);

  const stats = [
    {
      title: '今日课程',
      value: todayClasses.length,
      icon: Calendar,
      color: 'from-blue-500 to-blue-600',
      change: '+2'
    },
    {
      title: '学生总数',
      value: mockStudents.length,
      icon: UserCheck,
      color: 'from-green-500 to-green-600',
      change: ''
    },
    {
      title: '今日出勤',
      value: `${todayAttendance.filter(a => a.status === 'present').length}/${todayAttendance.length}`,
      icon: ClipboardCheck,
      color: 'from-orange-500 to-orange-600',
      change: '92%'
    },
    {
      title: '需要关注',
      value: absentToday.length,
      icon: AlertCircle,
      color: 'from-red-500 to-red-600',
      change: ''
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">教师工作台</h1>
          <p className="text-gray-600">欢迎回来，张老师！今天是 {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</p>
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
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">今日课程</h2>
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {todayClasses.map((classItem) => (
                <div key={classItem.id} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{classItem.name}</h3>
                      <p className="text-sm text-gray-600">{classItem.schedule}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {classItem.students.length} 人
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Link
                      to="/teacher/attendance"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:shadow-md transition-all text-center"
                    >
                      快速考勤
                    </Link>
                    <Link
                      to="/teacher/performance"
                      className="flex-1 bg-gray-100 text-gray-700 text-sm font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition-all text-center"
                    >
                      评价管理
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">需要关注</h2>
                <AlertCircle className="w-5 h-5 text-orange-500" />
              </div>
              <div className="space-y-3">
                {absentToday.map((record) => {
                  const student = mockStudents.find(s => s.id === record.studentId);
                  return (
                    <div key={record.id} className="flex items-center space-x-3 p-3 bg-red-50 rounded-xl border border-red-100">
                      <img
                        src={student?.avatar}
                        alt={student?.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 text-sm">{student?.name}</p>
                        <p className="text-xs text-red-600">
                          {record.status === 'absent' ? '旷课' : '迟到'} {record.notes && `- ${record.notes}`}
                        </p>
                      </div>
                    </div>
                  );
                })}
                {absentToday.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-sm">今日无需要关注的学生</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-md p-6 text-white">
              <TrendingUp className="w-8 h-8 mb-4" />
              <h3 className="font-semibold text-lg mb-2">本周表现优秀</h3>
              <p className="text-sm text-blue-100 mb-4">共有 {studentsNeedingAttention.length} 位学生获得优秀评价</p>
              <Link
                to="/teacher/performance"
                className="inline-block bg-white text-blue-600 text-sm font-semibold py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
              >
                查看详情
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
