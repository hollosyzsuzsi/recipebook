import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { RecipeForm } from '../RecipeForm/RecipeForm'

import closeIcon from '../../assets/icons/closemodal.svg'
import styles from './EditRecipeModal.module.scss'

export const EditRecipeModal = ({ onSubmit, initialValues, isOpen, onClose }) => {
  return ReactDOM.createPortal(
    <div className={`${styles.modalOverlay} ${isOpen ? styles.modalOpen : styles.modalClosed}`} onClick={onClose}>
      <div
        className={`${styles.modalWrapper} ${isOpen ? styles.modalOpen : styles.modalClosed}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Editing Your Recipe</h2>
          <button className={styles.closeBtn} type="button" onClick={onClose}>
            <img src={closeIcon} alt="Close" />
          </button>
        </div>
        <RecipeForm
          initialValues={initialValues}
          onSubmit={(data) => {
            onSubmit(initialValues.id, data)
            onClose()
          }}
        />
      </div>
    </div>,
    document.getElementById('portal-root')
  )
}

EditRecipeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
}
