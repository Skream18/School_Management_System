import { useParams } from 'react-router-dom';
import { Calendar, TrendingUp, MessageSquare, Award, CheckCircle, XCircle, Clock, FileText } from 'lucide-react';
import Layout from '../components/Layout';
import { mockStudents, mockAttendance, mockPerformance } from '../data/mockData';

export default function StudentReport() {
  const { studentId } = useParams();
  const student = mockStudents.find(s => s.id === studentId) || mockStudents[0];
  const attendanceRecords = mockAttendance.filter(a => a.studentId === student.id).slice(0, 10);
  const performanceRecords = mockPerformance.filter(p => p.studentId === student.id);

  const totalAttendance = attendanceRecords.length;
  const presentCount = attendanceRecords.filter(a => a.status === 'present').length;
  const attendanceRate = totalAttendance > 0 ? ((presentCount / totalAttendance) * 100).toFixed(1) : '0';

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'absent':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'late':
        return <Clock className="w-5 h-5 text-orange-600" />;
      case 'leave':
        return <FileText className="w-5 h-5 text-blue-600" />;
      default:
        return null;
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-50 border-green-200';
      case 'absent':
        return 'bg-red-50 border-red-200';
      case 'late':
        return 'bg-orange-50 border-orange-200';
      case 'leave':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'excellent':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'needs-improvement':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'homework-missing':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'active-in-class':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getTagLabel = (tag: string) => {
    switch (tag) {
      case 'excellent':
        return '优秀';
      case 'needs-improvement':
        return '需要改进';
      case 'homework-missing':
        return '作业缺交';
      case 'active-in-class':
        return '课堂活跃';
      default:
        return tag;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'A':
        return 'bg-green-500';
      case 'B':
        return 'bg-blue-500';
      case 'C':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
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
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{student.name}</h1>
              <p className="text-blue-100 mb-4">{student.class} · 学号: {student.id}</p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <div className="bg-white bg-opacity-20 rounded-xl px-4 py-2 backdrop-blur-sm">
                  <p className="text-sm text-blue-100">出勤率</p>
                  <p className="text-xl font-bold">{attendanceRate}%</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-xl px-4 py-2 backdrop-blur-sm">
                  <p className="text-sm text-blue-100">评价记录</p>
                  <p className="text-xl font-bold">{performanceRecords.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">学习表现时间线</h2>
              </div>

              <div className="space-y-6">
                {performanceRecords.map((record, index) => (
                  <div key={record.id} className="relative pl-8">
                    <div className={`absolute left-0 top-0 w-6 h-6 rounded-full ${getLevelColor(record.assessmentLevel)} flex items-center justify-center text-white text-xs font-bold shadow-md`}>
                      {record.assessmentLevel}
                    </div>
                    {index !== performanceRecords.length - 1 && (
                      <div className="absolute left-3 top-6 bottom-0 w-0.5 bg-gray-200"></div>
                    )}
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-800">{record.subject} - {record.week}</h3>
                          <p className="text-sm text-gray-500">{new Date(record.date).toLocaleDateString('zh-CN')}</p>
                        </div>
                        <Award className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {record.tags.map(tag => (
                          <span
                            key={tag}
                            className={`text-xs font-semibold px-3 py-1 rounded-full border ${getTagColor(tag)}`}
                          >
                            {getTagLabel(tag)}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-start space-x-2 text-gray-700">
                        <MessageSquare className="w-4 h-4 mt-1 flex-shrink-0 text-gray-400" />
                        <p className="text-sm">{record.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {performanceRecords.length === 0 && (
                  <div className="text-center py-12">
                    <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">暂无表现评价记录</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">考勤记录</h2>
              </div>

              <div className="space-y-3">
                {attendanceRecords.map(record => (
                  <div
                    key={record.id}
                    className={`border rounded-xl p-4 ${getStatusColor(record.status)}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {new Date(record.date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
                      </span>
                      {getStatusIcon(record.status)}
                    </div>
                    <p className="text-sm font-semibold text-gray-800">
                      {getStatusLabel(record.status)}
                    </p>
                    {record.notes && (
                      <p className="text-xs text-gray-600 mt-1">{record.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-md p-6 text-white">
              <Award className="w-10 h-10 mb-4" />
              <h3 className="font-semibold text-lg mb-2">表现总结</h3>
              <p className="text-sm text-green-100 mb-2">本学期表现良好</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>出勤率</span>
                  <span className="font-semibold">{attendanceRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span>优秀评价</span>
                  <span className="font-semibold">
                    {performanceRecords.filter(p => p.tags.includes('excellent')).length} 次
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
