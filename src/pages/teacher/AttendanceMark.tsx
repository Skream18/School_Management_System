import { useState } from 'react';
import { Check, X, Clock, FileText, Save } from 'lucide-react';
import Layout from '../../components/Layout';
import { mockStudents, mockClasses } from '../../data/mockData';
import { AttendanceStatus } from '../../types';

export default function AttendanceMark() {
  const [selectedClass, setSelectedClass] = useState(mockClasses[0].id);
  const [attendanceData, setAttendanceData] = useState<Record<string, { status: AttendanceStatus; notes: string }>>(() => {
    const initial: Record<string, { status: AttendanceStatus; notes: string }> = {};
    mockStudents.forEach(student => {
      initial[student.id] = { status: 'present', notes: '' };
    });
    return initial;
  });

  const selectedClassData = mockClasses.find(c => c.id === selectedClass);
  const studentsInClass = mockStudents.filter(s =>
    selectedClassData?.students.includes(s.id)
  );

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], status }
    }));
  };

  const handleNotesChange = (studentId: string, notes: string) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], notes }
    }));
  };

  const handleSave = () => {
    alert('考勤记录已保存！');
  };

  const statusButtons = [
    { status: 'present' as AttendanceStatus, label: '出席', icon: Check, color: 'bg-green-500 hover:bg-green-600' },
    { status: 'absent' as AttendanceStatus, label: '缺席', icon: X, color: 'bg-red-500 hover:bg-red-600' },
    { status: 'late' as AttendanceStatus, label: '迟到', icon: Clock, color: 'bg-orange-500 hover:bg-orange-600' },
    { status: 'leave' as AttendanceStatus, label: '请假', icon: FileText, color: 'bg-blue-500 hover:bg-blue-600' }
  ];

  const getStatusCount = (status: AttendanceStatus) => {
    return Object.values(attendanceData).filter(a => a.status === status).length;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">课堂考勤</h1>
            <p className="text-gray-600">{new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</p>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            <Save className="w-5 h-5" />
            <span>保存考勤</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">选择班级</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full md:w-auto px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {mockClasses.map(cls => (
              <option key={cls.id} value={cls.id}>{cls.name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statusButtons.map(btn => (
            <div key={btn.status} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${btn.color} rounded-lg flex items-center justify-center`}>
                  <btn.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{btn.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{getStatusCount(btn.status)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">学生</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">班级</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">考勤状态</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">备注</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {studentsInClass.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-800">{student.name}</p>
                          <p className="text-sm text-gray-500">ID: {student.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-700">{student.class}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center space-x-2">
                        {statusButtons.map(btn => (
                          <button
                            key={btn.status}
                            onClick={() => handleStatusChange(student.id, btn.status)}
                            className={`p-2 rounded-lg transition-all ${
                              attendanceData[student.id]?.status === btn.status
                                ? `${btn.color} text-white shadow-md`
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                            title={btn.label}
                          >
                            <btn.icon className="w-4 h-4" />
                          </button>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={attendanceData[student.id]?.notes || ''}
                        onChange={(e) => handleNotesChange(student.id, e.target.value)}
                        placeholder="添加备注..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
