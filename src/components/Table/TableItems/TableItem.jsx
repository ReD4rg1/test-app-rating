import React, {useState} from "react";
import styles from './TableItem.module.css';
import avatar from "../../../assets/img/avatar.jpg";

const TableItem = (props) => {

    let [isEditing, editMode] = useState(false);
    let [name, changeName] = useState();
    let [status, changeStatus] = useState();

    let saveNewUserInfo = () => {
        props.saveNewUserInfo(props.id, name, status);
        toggleEditMode();
    }

    let deleteUser = () => {
        props.deleteUser(props.id);
        toggleEditMode();
    }

    let objectName = React.createRef();
    let objectStatus = React.createRef();

    let toggleEditMode = () => {
        isEditing
            ? editMode(false)
            : editMode(true)
        changeName(props.name);
        changeStatus(props.status);
    }

    return (
        <div className={styles.container}>
            <div className={styles.avatar}>
                {!props.photo
                    ? <img src={avatar} alt={'#'}/>
                    : <img src={props.photo} alt={'#'}/>
                }
            </div>
            <div className={styles.name}>
                {!isEditing
                    ? props.name
                    : <input onChange={() => {
                        changeName(objectName.current.value)
                    }}
                             value={name}
                             type="text"
                             ref={objectName}
                    />
                }
            </div>
            <div className={styles.status}>
                {!isEditing
                    ? props.status
                    : <input onChange={() => {
                        changeStatus(objectStatus.current.value)
                    }}
                             value={status}
                             type="text"
                             ref={objectStatus}/>
                }
            </div>
            {!isEditing
                ?
                <div className={styles.buttons}>
                    <button onClick={toggleEditMode}>Edit</button>
                    <button onClick={deleteUser}>Delete</button>
                </div>
                : <div className={styles.buttons}>
                    <button onClick={toggleEditMode}>Cancel</button>
                    <button onClick={saveNewUserInfo}>Save</button>
                </div>
            }
        </div>
    )
}

export default TableItem