import React from 'react';

function Dashboard({ students, onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="student-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Full Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Course</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td><strong>{student.id}</strong></td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>
                <span className={`status-badge ${student.enrolled ? 'active' : 'inactive'}`}>
                  {student.enrolled ? 'Enrolled' : 'Inactive'}
                </span>
              </td>
              <td>
                <button className="btn btn-edit" onClick={() => onEdit(student)}>Edit</button>
                <button className="btn btn-delete" onClick={() => onDelete(student)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
