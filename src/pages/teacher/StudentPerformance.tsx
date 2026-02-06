import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, AlertTriangle, FileX, MessageSquare, Save, TrendingUp } from 'lucide-react';
import Layout from '../../components/Layout';
import { mockStudents, mockClasses } from '../../data/mockData';
import { PerformanceTag, AssessmentLevel } from '../../types';

export default function StudentPerformance() {
  const [selectedStudent, setSelectedStudent] = useState(mockStudents[0].id);
  const [subject, setSubject] = useState('数学');
  const [week, setWeek] = useState('第4周');
  const [tags, setTags] = useState<PerformanceTag[]>([]);
  const [assessmentLevel, setAssessmentLevel] = useState<AssessmentLevel>('B');
  const [comment, setComment] = useState('');

  const student = mockStudents.find(s => s.id === selectedStudent);

  const availableTags: { value: PerformanceTag; label: string; icon: any; color: string }[] = [
    { value: 'excellent', label: '优秀', icon: Star, color: 'bg-yellow-500 border-yellow-600 text-yellow-700' },
    { value: 'needs-improvement', label: '需要改进', icon: AlertTriangle, color: 'bg-orange-500 border-orange-600 text-orange-700' },
    { value: 'homework-missing', label: '作业缺交', icon: FileX, color: 'bg-red-500 border-red-600 text-red-700' },
    { value: 'active-in-class', label: '课堂活跃', icon: MessageSquare, color: 'bg-green-500 border-green-600 text-green-700' }
  ];

  const assessmentLevels: { value: AssessmentLevel; label: string; color: string }[] = [
    { value: 'A', label: 'A - 优秀', color: 'bg-green-500 hover:bg-green-600' },
    { value: 'B', label: 'B - 良好', color: 'bg-blue-500 hover:bg-blue-600' },
    { value: 'C', label: 'C - 合格', color: 'bg-orange-500 hover:bg-orange-600' }
  ];

  const toggleTag = (tag: PerformanceTag) => {
    setTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSave = () => {
    alert('学生评价已保存！');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">学生评价管理</h1>
            <p className="text-gray-600">为学生添加表现标签和评价</p>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            <Save className="w-5 h-5" />
            <span>保存评价</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">选择学生</h2>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {mockStudents.map(s => (
                <button
                  key={s.id}
                  onClick={() => setSelectedStudent(s.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all ${
                    selectedStudent === s.id
                      ? 'bg-blue-50 border-2 border-blue-500'
                      : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                  }`}
                >
                  <img
                    src={s.avatar}
                    alt={s.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-800">{s.name}</p>
                    <p className="text-sm text-gray-500">{s.class}</p>
                  </div>
                  <Link
                    to={`/student-report/${s.id}`}
                    className="text-blue-600 hover:text-blue-700"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <TrendingUp className="w-5 h-5" />
                  </Link>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={student?.avatar}
                  alt={student?.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{student?.name}</h2>
                  <p className="text-gray-600">{student?.class}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">科目</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>数学</option>
                    <option>语文</option>
                    <option>英语</option>
                    <option>物理</option>
                    <option>化学</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">周次</label>
                  <select
                    value={week}
                    onChange={(e) => setWeek(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Array.from({ length: 20 }, (_, i) => (
                      <option key={i}>第{i + 1}周</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">表现标签</h3>
              <div className="grid grid-cols-2 gap-3">
                {availableTags.map(tag => {
                  const Icon = tag.icon;
                  const isSelected = tags.includes(tag.value);
                  return (
                    <button
                      key={tag.value}
                      onClick={() => toggleTag(tag.value)}
                      className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? `${tag.color} bg-opacity-10 border-opacity-100 shadow-md`
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isSelected ? tag.color.split(' ')[0] : 'bg-gray-100'
                      }`}>
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <span className={`font-medium ${isSelected ? 'text-gray-800' : 'text-gray-600'}`}>
                        {tag.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">周评等级</h3>
              <div className="flex space-x-3">
                {assessmentLevels.map(level => (
                  <button
                    key={level.value}
                    onClick={() => setAssessmentLevel(level.value)}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                      assessmentLevel === level.value
                        ? `${level.color} text-white shadow-md`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">教师评语</h3>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="请输入对学生本周表现的评价和建议..."
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <p className="text-sm text-gray-500 mt-2">
                已输入 {comment.length} 字
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
