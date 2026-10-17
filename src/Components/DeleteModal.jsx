import React from 'react';

function DeleteModal({ student, onConfirm, onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-content text-center">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to permanently remove student <strong>{student?.name}</strong> ({student?.id})?</p>
        <div className="modal-actions justify-center">
          <button className="btn btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn btn-delete" onClick={onConfirm}>Confirm Delete</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
