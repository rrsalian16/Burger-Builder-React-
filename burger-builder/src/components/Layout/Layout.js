import React from 'react';

import style from './Layout.module.css';

const layout = (props) => (
  <React.Fragment>
    <div>Toolbar, SideDrawer, BackDrop</div>
    <main className={style.test}>{props.children}</main>
  </React.Fragment>
);

export default layout;
