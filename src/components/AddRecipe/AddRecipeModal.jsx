import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { RecipeForm } from '../RecipeForm/RecipeForm'

import closeIcon from '../../assets/icons/closemodal.svg'
import styles from './AddRecipeModal.module.scss'

export const AddRecipeModal = ({ isOpen, onClose, onSubmit }) => {
  return ReactDOM.createPortal(
    <div className={`${styles.modalOverlay} ${isOpen ? styles.modalOpen : styles.modalClosed}`} onClick={onClose}>
      <div
        className={`${styles.modalWrapper} ${isOpen ? styles.modalOpen : styles.modalClosed}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Adding New Recipe</h2>
          <button className={styles.closeBtn} type="button" onClick={onClose}>
            <img src={closeIcon} alt="Close" />
          </button>
        </div>

        <RecipeForm
          onSubmit={(data) => {
            onSubmit(data)
            onClose()
          }}
          isAddNewRecipe
        />
      </div>
    </div>,
    document.getElementById('portal-root')
  )
}

AddRecipeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}
