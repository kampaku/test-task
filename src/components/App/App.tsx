import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import type { User } from 'src/types/types';

import Api from '../../services/Api';
import useFetching from '../../hooks/useFetching';
import UserList from '../UserList/UserList';
import Sidebar from '../Sidebar/SideBar';
import UserProfile from '../UserProfile/UserProfile';
import '../../assets/scss/style.scss';
import Title from '../Title/Title';
import styles from './App.module.scss';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [fetching, isLoading, error] = useFetching(async () => {
    const users = await api.getAllUsers();
    if (Object.keys(users).length === 0) throw new Error('что-то пошло не так');
    setUsers(users);
  });
  const api = new Api();

  function getProp<T extends object>(obj: T, pathToProp: string[]): string {
    let nestedObj = obj;
    let prop = '';

    for (const key of pathToProp) {
      if (typeof nestedObj[key as keyof T] === 'object') {
        nestedObj = nestedObj[key as keyof object];
      } else if (typeof nestedObj[key as keyof T] === 'string') {
        prop = nestedObj[key as keyof object];
      }
    }
    return prop;
  }

  const setSort = (pathToProp: string[]) => {
    const newUsers = [...users].sort((a, b) =>
      getProp(a, pathToProp).localeCompare(getProp(b, pathToProp))
    );
    setUsers(newUsers);
  };

  useEffect(() => {
    fetching();
  }, []);

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <div className={styles.aside}>
          <Sidebar setSort={setSort} />
        </div>
        <div className={styles.main}>
          <Routes>
            <Route
              path="/"
              element={
                <UserList error={error} users={users} isLoading={isLoading} />
              }
            />
            <Route path="/user/:id" element={<UserProfile />} />
            <Route path="*" element={<Title text="Такой страницы нет" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
