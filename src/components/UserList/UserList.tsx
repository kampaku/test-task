import React from 'react';
import type { User } from 'src/types/types';

import Loader from '../Loader/Loader';
import Title from '../Title/Title';
import UserCard from '../UserCard/UserCard';
import styles from './UserList.module.scss';

interface UserListProps {
  users: User[];
  isLoading: boolean;
  error?: string;
}

const UserList: React.FC<UserListProps> = ({ users, isLoading, error }) => {
  return (
    <div className={styles.page}>
      <Title text="Список пользователей" />
      <div className={styles.cards}>
        {error ? <span>{error}</span> : null}
        {isLoading ? <Loader /> : null}
        {users.length > 0
          ? users.map((user) => <UserCard key={user.id} user={user} />)
          : null}
      </div>
    </div>
  );
};

export default UserList;
