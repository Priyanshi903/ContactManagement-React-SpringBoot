import React from 'react';
import MainHeader from '../components/Header/MainHeader';

const Layout = (props) => {
    return (
        <React.Fragment>
            <MainHeader />
            <main >{props.children}</main>
        </React.Fragment>
    )
};

export default Layout;