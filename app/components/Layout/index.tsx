/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MenuItem } from '@material-ui/core';
import React, { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import Routes from '../../constants/routes.json';
import styles from './Layout.css';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  // @ts-ignore
  const Links = Object.keys(Routes).map((el: string) => Routes[el]);
  const history = useHistory();

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        {/* <img src="" alt="Jardim Pilates" /> */}
        <ul>
          {Links.map((router) => (
            <MenuItem
              key={router.router}
              onClick={() => {
                history.replace(router.router);
              }}
            >
              {router.label}
            </MenuItem>
          ))}
        </ul>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Layout;
