import { createContext } from 'react';

const Context = createContext({
    token: null,
    setToken: () => {}
});

export default Context;