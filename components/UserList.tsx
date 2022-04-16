import React, {FunctionComponent} from 'react';
import {User} from './types';
import styles from '../styles/Words.module.css';
import UserComponent from './User';

type UserListProps = {
    users: User[]
};

const UserListComponent: FunctionComponent<UserListProps> = ({users}) => (
  <ul className={styles.container}>
    {users.map((user: User) => <UserComponent key={user.id} user={user} /> )}
  </ul>
);

export default UserListComponent;
