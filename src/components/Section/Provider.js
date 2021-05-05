import Context from './Context';
import useStorage from './useStorage';

const Provider = ({ children }) => {
    const [token, setToken] = useStorage('@bino/token');

    return (
        <Context.Provider 
            value={{
                token,
                setToken
            }}
        >
        {children}
    </Context.Provider>
    )
};

export default Provider;