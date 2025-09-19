import { NavLink } from 'react-router-dom'

import recipesIcon from '../../assets/icons/allrecipes.svg'
import favoritesIcon from '../../assets/icons/favoriterecipes.svg'

import styles from './Sidebar.module.scss'

export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.sidebarNav}>
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : styles.navLink)}
        >
          <img src={recipesIcon} alt="All recipes" className={styles.navIcon} />
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : styles.navLink)}
        >
          <img src={favoritesIcon} alt="Favorite recipes" className={styles.navIcon} />
        </NavLink>
      </nav>
    </aside>
  )
}
