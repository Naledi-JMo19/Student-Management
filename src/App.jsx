import React, { useState, useEffect } from 'react';
import Dashboard from './Components/Dashboard';
import StudentModal from './Components/StudentModal';
import DeleteModal from './Components/DeleteModal';
import './App.css';

function App() {

  const initialData = [
    {
      id: "90101",
      name: "Mpho Mohapi",
      age: 21,
      email: "mpho@limkokwing.ac.ls",
      course: "Diploma in Information Technology",
      enrolled: true
    }
  ];

  // State hook for managing the list of students initialized with localStorage or demo data
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('students');
    return saved ? JSON.parse(saved) : initialData;
  });

  // Keep localStorage in sync with our current component state
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  // Modal display states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Arrow function to handle adding or updating a student record
  const saveStudent = (studentData) => {
    if (selectedStudent && selectedStudent.id) {
      // Edit mode: map through items and replace matching object
      setStudents(students.map(s => s.id === selectedStudent.id ? studentData : s));
    } else {
      // Add mode: append new student object to array
      setStudents([...students, studentData]);
    }
    closeFormModal();
  };

  // Arrow function to permanently delete a student record from state
  const deleteStudent = () => {
    if (selectedStudent) {
      setStudents(students.filter(s => s.id !== selectedStudent.id));
    }
    closeDeleteModal();
  };

  // Modal open controllers
  const openAddModal = () => {
    setSelectedStudent(null);
    setIsFormModalOpen(true);
  };

  const openEditModal = (student) => {
    setSelectedStudent(student);
    setIsFormModalOpen(true);
  };

  const openDeleteConfirmation = (student) => {
    setSelectedStudent(student);
    setIsDeleteModalOpen(true);
  };

  // Modal close controllers
  const closeFormModal = () => setIsFormModalOpen(false);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Student Management System</h1>
        <h2>Limkokwing University Of Creative Technology</h2>
        <button className="btn btn-add" onClick={openAddModal}>+ Add New Student</button>
      </header>

      <main>
        {students.length === 0 ? (
          <div className="empty-state">No student records found. Click "+ Add New Student" to begin.</div>
        ) : (
          <Dashboard 
            students={students} 
            onEdit={openEditModal} 
            onDelete={openDeleteConfirmation} 
          />
        )}
      </main>

      {/* Render Add/Edit Modal Form */}
      {isFormModalOpen && (
        <StudentModal 
          student={selectedStudent} 
          onSave={saveStudent} 
          onClose={closeFormModal} 
        />
      )}

      {/* Render Confirmation Dialog for Record Deletion */}
      {isDeleteModalOpen && (
        <DeleteModal 
          student={selectedStudent} 
          onConfirm={deleteStudent} 
          onClose={closeDeleteModal} 
        />
      )}
    </div>
  );
}

export default App;
