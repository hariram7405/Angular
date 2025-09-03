import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
  department: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = [];
  private studentsSubject = new BehaviorSubject<Student[]>([]);
  public students$ = this.studentsSubject.asObservable();
  private nextId = 1;

  addStudent(student: Omit<Student, 'id'>): void {
    const newStudent: Student = { ...student, id: this.nextId++ };
    this.students.push(newStudent);
    this.studentsSubject.next([...this.students]);
  }

  updateStudent(updatedStudent: Student): void {
    const index = this.students.findIndex(s => s.id === updatedStudent.id);
    if (index !== -1) {
      this.students[index] = updatedStudent;
      this.studentsSubject.next([...this.students]);
    }
  }

  getStudents(): Student[] {
    return [...this.students];
  }
}