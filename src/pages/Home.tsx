import { v4 as uuidv4 } from 'uuid'
import {useEffect,useState} from 'react'
import CryptoList from '../components/CryptoList'


const Home = () => {
    


    return ( 

        <main className='px-24'>
            <h1>COIN TRACKER</h1>
            <CryptoList  />
        </main>
    );
}

export default Home;