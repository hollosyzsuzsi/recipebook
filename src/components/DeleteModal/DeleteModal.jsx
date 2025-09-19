import ReactDOM from 'react-dom'

import { useDeleteModal } from '../../hooks/useDeleteModal'

import closeModalIcon from '../../assets/icons/closemodal.svg'
import styles from './DeleteModal.module.scss'

export const DeleteModal = () => {
  const { isOpen, closeModal, onConfirm } = useDeleteModal()

  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={closeModal}>
      <div className={styles.modalWrapper} onClick={(e) => e.stopPropagation()}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.modalTitle}>Confirmation</h1>
          <button className={styles.closeBtn}>
            <img src={closeModalIcon} alt="Close modal" onClick={closeModal} />
          </button>
        </div>
        <p className={styles.modalText}>Are you sure you want to delete this recipe?</p>
        <div className={styles.buttonsWrapper}>
          <button className={styles.cancelBtn} onClick={closeModal}>
            Cancel
          </button>
          <button
            className={styles.submitBtn}
            onClick={() => {
              onConfirm()
              closeModal()
            }}
          >
            Yes, delete
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('portal-root')
  )
}
