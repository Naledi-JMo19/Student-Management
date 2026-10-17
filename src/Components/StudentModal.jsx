import React, { useState, useEffect } from 'react';

function StudentModal({ student, onSave, onClose }) {

    const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [enrolled, setEnrolled] = useState(true);
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) {
      setId(student.id);
      setName(student.name);
      setAge(student.age);
      setEmail(student.email);
      setCourse(student.course);
      setEnrolled(student.enrolled);
    }
  }, [student]);


  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!id.trim()) validationErrors.id = "Student ID is required.";
    if (!name.trim()) validationErrors.name = "Full name is required.";
    
    if (!age) {
      validationErrors.age = "Age is required.";
    } else if (Number(age) < 16 || Number(age) > 100) {
      validationErrors.age = "Please provide a valid student age (16-60).";
    }

    if (!email.trim()) {
      validationErrors.email = "Email address is required.";
    } else if (!emailRegex.test(email)) {
      validationErrors.email = "Please input a valid email address layout.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave({
      id: id.trim(),
      name: name.trim(),
      age: Number(age),
      email: email.trim(),
      course,
      enrolled
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>{student ? 'Edit Student Details' : 'Register New Student'}</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>Student ID:</label>
            <input 
              type="text" 
              value={id} 
              onChange={(e) => setId(e.target.value)}
              disabled={!!student} // Prevent mutating unique identifier key during updates
            />
            {errors.id && <span className="error-text">{errors.id}</span>}
          </div>

          <div className="form-group">
            <label>Full Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Age:</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
            {errors.age && <span className="error-text">{errors.age}</span>}
          </div>

          <div className="form-group">
            <label>Email Address:</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Course of Study:</label>
            <select value={course} onChange={(e) => setCourse(e.target.value)}>
              <option value="Diploma in Information Technology">Diploma in Information Technology(DIT)</option>
              <option value="Diploma in Business Information Technology">Diploma in Business Information Technology(DBIT)</option>
              <option value="Diploma in Multi-Media and Software Engineering">Diploma in Multi-Media and Software Engineering(DMSE)</option>
              <option value="Bachelor Of Science in Business Information Technology">BSC in Business Information Technology(BSC-BIT)</option>
              <option value="Bachelor Of Science in Information Technology">BSC in Information Technology(BSC-IT)</option>
              <option value="Bachelor Of Science in Software Engineering And Multi-Media">BSC in Software Engineering And Multi-Media(BSC-SEM)</option>
            </select>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input 
                type="checkbox" 
                checked={enrolled} 
                onChange={(e) => setEnrolled(e.target.checked)} 
              />
              Mark Active Enrollment Status
            </label>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-save">Save Record</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentModal;
