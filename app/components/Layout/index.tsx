/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MenuItem } from '@material-ui/core';
import { ipcMain, ipcRenderer } from 'electron';
import React, { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Routes from '../../constants/routes.json';
import colors from '../../styles/colors';
import styles from './Layout.css';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  // @ts-ignore
  const Links = Object.keys(Routes).map((el: string) => Routes[el]);
  const history = useHistory();
  const { location } = useSelector((redux) => redux.router);
  const [listRouters, setListRouters] = useState<any[]>([]);

  useEffect(() => {
    setListRouters(
      Links.map((router) => {
        const color =
          location.pathname === router.router ? colors.primary : colors.white;
        return (
          <MenuItem
            style={{
              backgroundColor: color,
            }}
            key={router.router}
            onClick={() => {
              history.replace(router.router);
            }}
          >
            {router.label}
          </MenuItem>
        );
      })
    );
  }, [location]);

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        {/* <img src="" alt="Jardim Pilates" /> */}
        <ul>{listRouters}</ul>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Layout;
