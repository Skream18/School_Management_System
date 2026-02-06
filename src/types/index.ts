export type UserRole = 'teacher' | 'student' | 'parent' | 'admin';

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'leave';

export type PerformanceTag = 'excellent' | 'needs-improvement' | 'homework-missing' | 'active-in-class';

export type AssessmentLevel = 'A' | 'B' | 'C';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatar?: string;
  childId?: string;
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  class: string;
  avatar?: string;
  parentId?: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: AttendanceStatus;
  notes?: string;
  markedBy: string;
}

export interface PerformanceRecord {
  id: string;
  studentId: string;
  subject: string;
  week: string;
  tags: PerformanceTag[];
  assessmentLevel: AssessmentLevel;
  comment: string;
  teacherId: string;
  date: string;
}

export interface Class {
  id: string;
  name: string;
  grade: string;
  subject: string;
  teacherId: string;
  students: string[];
  schedule: string;
}

export interface Notification {
  id: string;
  type: 'attendance' | 'performance' | 'announcement';
  title: string;
  message: string;
  date: string;
  read: boolean;
}
