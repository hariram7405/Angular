import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Student, StudentService } from '../../services/student.service';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [TableModule, DialogModule, ButtonModule, InputTextModule, DropdownModule, MessageModule, ReactiveFormsModule, CommonModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  displayDialog = false;
  editForm: FormGroup;
  selectedStudent: Student | null = null;
  
  departments = ['CSE', 'IT', 'ECE', 'EEE'];

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(16), Validators.max(45)]],
      department: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.studentService.students$.subscribe(students => {
      this.students = students;
    });
  }

  onRowSelect(student: Student) {
    this.selectedStudent = student;
    this.editForm.patchValue(student);
    this.displayDialog = true;
  }

  saveStudent() {
    if (this.editForm.valid && this.selectedStudent) {
      this.studentService.updateStudent(this.editForm.value);
      this.displayDialog = false;
      this.selectedStudent = null;
    }
  }

  hideDialog() {
    this.displayDialog = false;
    this.selectedStudent = null;
  }

  getFieldError(fieldName: string): string {
    const field = this.editForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['minlength']) return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
      if (field.errors['email']) return 'Please enter a valid email';
      if (field.errors['min']) return `Age must be at least ${field.errors['min'].min}`;
      if (field.errors['max']) return `Age must be at most ${field.errors['max'].max}`;
    }
    return '';
  }
}
