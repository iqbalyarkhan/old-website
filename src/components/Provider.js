import React, { useState } from 'react';

export const myContext = React.createContext();

const Provider = props => {
    const [isActive, setTheme] = useState(false);
    document.body.className = isActive ? 'dark' : 'light';

    return (
        <myContext.Provider value={{
            isActive,
            changeTheme: () => setTheme(!isActive)
        }}>
            {props.children}
        </myContext.Provider>
    )
};

export default ({ element }) => (
    <Provider>
        {element}
    </Provider>
);