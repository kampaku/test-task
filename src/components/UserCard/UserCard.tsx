import React from 'react';
import { Link } from 'react-router-dom';
import type { User } from 'src/types/types';

import styles from './UserCard.module.scss';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <span>
          <span className={styles.label}>ФИО:</span> {user.name}
        </span>
        <span>
          <span className={styles.label}>город:</span> {user.address.city}
        </span>
        <span>
          <span className={styles.label}>компания:</span> {user.company.name}
        </span>
      </div>
      <Link to={'/user/' + user.id} className={styles.link}>Подробнее</Link>
    </div>
  );
};

export default UserCard;
