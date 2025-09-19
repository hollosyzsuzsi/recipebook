import { useContext } from 'react'
import { DeleteModalContext } from '../context/DeleteModalContext'

export const useDeleteModal = () => useContext(DeleteModalContext)
