import React from 'react';
import './styles.scss';
import Countries from '../../UI/Countries/Countries';
function Main() {

    return (
        <main className='main'>
            <h2>Select item</h2>
            <Countries />
        </main>
    );
}

export default Main;