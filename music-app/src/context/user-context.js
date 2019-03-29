import {createContext} from 'react';

const defaultState = {roles: [], username: '', isLoggedIn: false, userId: '', updateUser() {}};
const {Consumer, Provider} = createContext(defaultState);

export {
    Consumer,
    Provider,
    defaultState
}