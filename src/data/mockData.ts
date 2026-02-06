import { User, Student, AttendanceRecord, PerformanceRecord, Class, Notification } from '../types';

export const mockUsers: User[] = [
  {
    id: 'teacher1',
    name: '张老师',
    role: 'teacher',
    email: 'zhang.teacher@school.edu',
    avatar: 'https://images.pexels.com/photos/3771074/pexels-photo-3771074.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'student1',
    name: '李明',
    role: 'student',
    email: 'liming@school.edu',
    avatar: 'https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'parent1',
    name: '李先生',
    role: 'parent',
    email: 'li.parent@email.com',
    childId: 'student1',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'admin1',
    name: '王校长',
    role: 'admin',
    email: 'wang.admin@school.edu',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200'
  }
];

export const mockStudents: Student[] = [
  {
    id: 'student1',
    name: '李明',
    grade: '五年级',
    class: '五年级 (3) 班',
    avatar: 'https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=200',
    parentId: 'parent1'
  },
  {
    id: 'student2',
    name: '王小华',
    grade: '五年级',
    class: '五年级 (3) 班',
    avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'student3',
    name: '陈思思',
    grade: '五年级',
    class: '五年级 (3) 班',
    avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'student4',
    name: '张伟',
    grade: '五年级',
    class: '五年级 (3) 班',
    avatar: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 'student5',
    name: '刘洋',
    grade: '五年级',
    class: '五年级 (3) 班',
    avatar: 'https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=200'
  }
];

export const mockClasses: Class[] = [
  {
    id: 'class1',
    name: '五年级 (3) 班 - 数学',
    grade: '五年级',
    subject: '数学',
    teacherId: 'teacher1',
    students: ['student1', 'student2', 'student3', 'student4', 'student5'],
    schedule: '周一、周三、周五 8:00-9:30'
  },
  {
    id: 'class2',
    name: '五年级 (3) 班 - 语文',
    grade: '五年级',
    subject: '语文',
    teacherId: 'teacher1',
    students: ['student1', 'student2', 'student3', 'student4', 'student5'],
    schedule: '周二、周四 8:00-9:30'
  }
];

export const mockAttendance: AttendanceRecord[] = [
  {
    id: 'att1',
    studentId: 'student1',
    date: '2026-01-20',
    status: 'present',
    markedBy: 'teacher1'
  },
  {
    id: 'att2',
    studentId: 'student1',
    date: '2026-01-19',
    status: 'present',
    markedBy: 'teacher1'
  },
  {
    id: 'att3',
    studentId: 'student1',
    date: '2026-01-18',
    status: 'late',
    notes: '迟到10分钟',
    markedBy: 'teacher1'
  },
  {
    id: 'att4',
    studentId: 'student1',
    date: '2026-01-17',
    status: 'present',
    markedBy: 'teacher1'
  },
  {
    id: 'att5',
    studentId: 'student1',
    date: '2026-01-16',
    status: 'leave',
    notes: '病假',
    markedBy: 'teacher1'
  },
  {
    id: 'att6',
    studentId: 'student2',
    date: '2026-01-20',
    status: 'present',
    markedBy: 'teacher1'
  },
  {
    id: 'att7',
    studentId: 'student3',
    date: '2026-01-20',
    status: 'absent',
    notes: '未请假',
    markedBy: 'teacher1'
  },
  {
    id: 'att8',
    studentId: 'student4',
    date: '2026-01-20',
    status: 'present',
    markedBy: 'teacher1'
  },
  {
    id: 'att9',
    studentId: 'student5',
    date: '2026-01-20',
    status: 'late',
    notes: '迟到5分钟',
    markedBy: 'teacher1'
  }
];

export const mockPerformance: PerformanceRecord[] = [
  {
    id: 'perf1',
    studentId: 'student1',
    subject: '数学',
    week: '第3周',
    tags: ['excellent', 'active-in-class'],
    assessmentLevel: 'A',
    comment: '本周表现优秀，课堂积极发言，作业完成质量高。继续保持！',
    teacherId: 'teacher1',
    date: '2026-01-17'
  },
  {
    id: 'perf2',
    studentId: 'student1',
    subject: '数学',
    week: '第2周',
    tags: ['active-in-class'],
    assessmentLevel: 'B',
    comment: '课堂表现积极，但作业有部分错误，需要加强练习。',
    teacherId: 'teacher1',
    date: '2026-01-10'
  },
  {
    id: 'perf3',
    studentId: 'student1',
    subject: '语文',
    week: '第3周',
    tags: ['excellent'],
    assessmentLevel: 'A',
    comment: '作文写得很好，阅读理解能力强。',
    teacherId: 'teacher1',
    date: '2026-01-16'
  },
  {
    id: 'perf4',
    studentId: 'student2',
    subject: '数学',
    week: '第3周',
    tags: ['needs-improvement', 'homework-missing'],
    assessmentLevel: 'C',
    comment: '本周有两次作业未交，需要家长配合督促。',
    teacherId: 'teacher1',
    date: '2026-01-17'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif1',
    type: 'performance',
    title: '新的成绩评价',
    message: '张老师给李明添加了数学第3周的评价',
    date: '2026-01-17',
    read: false
  },
  {
    id: 'notif2',
    type: 'attendance',
    title: '迟到提醒',
    message: '李明今天迟到10分钟',
    date: '2026-01-18',
    read: true
  },
  {
    id: 'notif3',
    type: 'announcement',
    title: '家长会通知',
    message: '本周五下午3点召开家长会，请准时参加',
    date: '2026-01-15',
    read: true
  }
];
