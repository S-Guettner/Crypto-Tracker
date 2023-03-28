import { v4 as uuidv4 } from "uuid"
import { useEffect, useState } from "react"
import CryptoCard from "../components/CryptoCard"

const CryptoList = () => {
    const [cryptoData, setCryptoData] = useState([])
    const [topListLimit, setTopListLimit] = useState<number>(20)

    // sort by filter
    const [listOrder, setListOrder] = useState("market_cap_desc")
    const [changeSort, setChangeSort] = useState(false);

    const SORTLIST = [
        {name: "market cap ascending",value: "market_cap_asc",},
        {name: "market cap descending",value: "market_cap_desc",},
        {name: "Volume ascending",value: "volume_asc",},
        {name: "Volume descending",value: "volume_desc",},
    ];

    // vs currency filter
    const [currency, setCurrency] = useState("usd")
    const [changeCurrency, setChangeCurrency] = useState(false)

    const CURRENCYLIST = [
        {name: "USD",value: "usd",},
        {name: "EUR",value: "eur",},
        {name: "JPY",value: "jpy",},
        {name: "AUD",value: "AUD",},
    ]

    useEffect(() => {
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${listOrder}&per_page=100&page=1&sparkline=false`)
            .then((res) => res.json())
            .then((data) => {
                /* console.log(data) */
                setCryptoData(data)
            });
    }, [topListLimit, listOrder, currency])

    /* console.log(cryptoData?.slice(0,topListLimit)) */

    console.log(changeSort)
    return (
        <main className="px-24">
            <h3>Top {topListLimit} Crypto</h3>

            <section className="flex ">
                {/* sort by filter */}
                <div className="ml-auto mb-2">
                    <button className="rounded-lg border-2" onClick={() => setChangeSort(!changeSort)}>Sort By</button>
                    <div>
                        {changeSort && SORTLIST.map((item) => {
                                return (
                                    <button key={uuidv4()} className="block border-2 m-2 p-2" onClick={() => setListOrder(item.value)}>
                                        <p>{item.name}</p>
                                    </button>
                                )
                            })}
                    </div>
                </div>

                {/* change currency */}
                <div>
                    <button className="rounded-lg border-2" onClick={() => setChangeCurrency(!changeCurrency)}>Currency</button>
                    <div>
                        {changeCurrency && CURRENCYLIST.map((item) => {
                                return (
                                    <button key={uuidv4()} className="block border-2 m-2 p-2" onClick={() => setCurrency(item.value)}>
                                        <p>{item.name}</p>
                                    </button>
                                )
                            })}
                    </div>
                </div>
            </section>

            <section>
                {cryptoData?.slice(0, topListLimit).map((coin: { name: string; current_price: number; market_cap: number; market_cap_change_24h: number; image: string }) => {
                        return (
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
            </section>

            <button className="border-2 p-2" onClick={() => setTopListLimit(topListLimit + 20)}>
                Show More
            </button>
        </main>
    );
};

export default CryptoList;
