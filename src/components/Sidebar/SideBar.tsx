import React from 'react';

import Sort from '../SortUser/SortUser';

interface SideBarProp {
  setSort: (arr: string[]) => void;
}

const Sidebar: React.FC<SideBarProp> = ({ setSort }) => {
  return (
    <aside>
      <Sort setSort={setSort} />
    </aside>
  );
};

export default Sidebar;
