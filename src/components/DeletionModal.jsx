import styles from "./DeletionModal.module.css";

function DeletionModal({ open, onConfirm, onCancel, count, isDeleting }) {
  if (!open) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>Are you sure you want to delete {count} selected contact(s)?</p>
        <button
          onClick={onConfirm}
          className={styles.deleteBtn}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Yes, Delete"}
        </button>
        <button
          onClick={onCancel}
          className={styles.cancelBtn}
          disabled={isDeleting}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeletionModal; 