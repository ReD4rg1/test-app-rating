import React, {useState} from "react";
import styles from './Table.module.css';
import Preloader from "../common/Preloader/Preloader";
import TableItem from "./TableItems/TableItem";

const Table = (props) => {

    let [userName, changeName] = useState('');
    let [userStatus, changeStatus] = useState('');

    let newUserName = React.createRef();
    let newUserStatus = React.createRef();

    let addUser = () => {
        props.addUser(userName, userStatus);
        changeName('');
        newUserName.current.value = ('');
        changeStatus('');
        newUserStatus.current.value = ('');
    }

    return (
        <div className={styles.container}>
            <div className={styles.addNewUser}>
                <h2>Create New User</h2>
                <div className={styles.createForm}>
                    <span>Name</span>
                    <input type='text'
                           placeholder={'name'}
                           ref={newUserName}
                           onChange={() => {
                               changeName(newUserName.current.value);
                           }}
                    />
                    <span>Status</span>
                    <input type='text'
                           placeholder={'status'}
                           ref={newUserStatus}
                           onChange={() => {
                               changeStatus(newUserStatus.current.value);
                           }}
                    />
                    <button onClick={addUser}>Create
                    </button>
                </div>
            </div>
            <div className={styles.table}>
                <h2>Users</h2>
                <Preloader isFetching={props.isFetching}/>
                <div className={styles.tableTitle}>
                    <div className={styles.tableTitleItem}>Img</div>
                    <div className={styles.tableTitleItem}>Name</div>
                    <div className={styles.tableTitleItem}>Status</div>
                    <div className={styles.tableTitleItem}>Actions</div>
                </div>
                <hr/>
                {!!props.users
                    ? props.users.map(user => <TableItem name={user.name ? user.name : 'no name'}
                                                         status={user.status ? user.status : ''}
                                                         photo={user.photos.small}
                                                         id={user.id}
                                                         key={user.id}
                                                         deleteUser={props.deleteUser}
                                                         saveNewUserInfo={props.saveNewUserInfo}
                        />
                    ) : <div/>
                }
                <hr/>
            </div>
        </div>
    )
}

export default Table