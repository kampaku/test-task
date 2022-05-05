import React from 'react';

import Button from '../Button/Button';
import styles from './SortUser.module.scss';

interface SortProp {
  setSort: (arr: string[]) => void;
}

const Sort: React.FC<SortProp> = ({ setSort }) => {
  return (
    <div className={styles.filter}>
      <span>сортировка:</span>
      <Button onClick={() => setSort(['address', 'city'])}>по городу</Button>
      <Button onClick={() => setSort(['company', 'name'])}>по компании</Button>
    </div>
  );
};

export default Sort;
