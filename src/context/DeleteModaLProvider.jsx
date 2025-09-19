import { useState } from 'react'
import PropTypes from 'prop-types'
import { DeleteModalContext } from './DeleteModalContext'

export const DeleteModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [onConfirm, setOnConfirm] = useState(() => {})

  const openModal = ({ onConfirm }) => {
    setOnConfirm(() => onConfirm)
    setIsOpen(true)
  }

  const closeModal = () => setIsOpen(false)

  return (
    <DeleteModalContext.Provider value={{ openModal, isOpen, closeModal, onConfirm }}>
      {children}
    </DeleteModalContext.Provider>
  )
}

DeleteModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
