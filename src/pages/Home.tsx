import { v4 as uuidv4 } from 'uuid'
import {useEffect,useState} from 'react'
import CryptoCard from '../components/CryptoCard'

const Home = () => {
    
    const [cryptoData,setCryptoData] = useState([])
    const [topListLimit,setTopListLimit] = useState<number>(20)
    

    useEffect(() => {
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setCryptoData(data)
        })
        
    },[topListLimit])

        console.log(cryptoData?.slice(0,topListLimit))
    return ( 

        <main className='px-24'>
            <h1>Home</h1>
            <h3>Top {topListLimit} Crypto</h3>
            {cryptoData?.slice(0,topListLimit).map((coin:{name:string,current_price:number,market_cap:number,market_cap_change_24h:number,image:string}) => {
                return(
                    <CryptoCard 
                        key={uuidv4()}
                        name={coin.name}
                        price={coin.current_price}
                        cap={coin.market_cap}
                        capChange24h={coin.market_cap_change_24h}
                        logo={coin.image}
                    />
                )
            })}
            <button onClick={() => setTopListLimit(topListLimit + 20)}>Show More</button>
        </main>
    );
}

export default Home;