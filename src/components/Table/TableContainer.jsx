import React, {useEffect, useState} from "react";
import Table from "./Table";
import {getUsers} from "../../api/api";

const TableContainer = () => {

    let usersLS = localStorage.getItem('usersLS');
    let [users, setUsers] = useState();
    let [isFetching, changeIsFetching] = useState(false);
    let [isLoaded, changeIsLoaded] = useState(false);

    let setUsersToState = (newUsers) => {
        if (!usersLS) {
            setUsersToLocalStorage();
        } else {
            setUsers(JSON.parse(localStorage.getItem('usersLS')));
            changeIsLoaded(true);
        }
        if (newUsers) {
            localStorage.setItem('usersLS', JSON.stringify(newUsers));
            setUsers(JSON.parse(localStorage.getItem('usersLS')));
        }
    }

    async function setUsersToLocalStorage() {
        changeIsFetching(true);
        let response = await getUsers(20, 10)
        localStorage.setItem('usersLS', JSON.stringify(response.items));
        setUsers(response.items);
        changeIsFetching(false);
        changeIsLoaded(true);
    }

    let addNewUser = (name, status) => {
        let rand = 0.5 + Math.random() * (99999);
        let newUser = [...users];
        newUser.push({
            name: name,
            status: status,
            id: Math.round(rand),
            photos: {small: null},
        })
        setUsersToState(newUser);
    }

    let deleteUser = (id) => {
        let usersArray = [...users];
        let newUsersArray = usersArray.filter(user => {
            if (user.id !== id) return user
        })
        setUsersToState(newUsersArray);
    }

    let saveNewUserInfo = (id, name, status) => {
        let usersArray = [...users];
        usersArray.forEach((item) => {
            if (item.id === id) {
                item.name = name;
                item.status = status;
            }
        })
        setUsersToState(usersArray)
    }

    useEffect(() => {
        if (!usersLS || !isLoaded) {
            setUsersToState();
        }
    });

    return (
        <Table isFetching={isFetching}
               users={users}
               addUser={addNewUser}
               deleteUser={deleteUser}
               saveNewUserInfo={saveNewUserInfo}
        />
    )
}

export default TableContainer