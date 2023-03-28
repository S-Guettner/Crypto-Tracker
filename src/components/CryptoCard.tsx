

const CryptoCard = (props:{name:string,price:number,cap:number,capChange24h:number,logo:string}) => {
    
    return ( 
        <section className="border-2 flex justify-between p-5">
                <p className="w-32 inline-block">{props.name}</p>
                <img className="w-12" src={props.logo} alt="coin-logo" />
            <div className="w-32">
                <p>current Price</p>
                <p>${props.price}</p>
            </div>
            <div className="w-32">
                <p>Market Cap.</p>
                <p>{props.cap}</p>
            </div>
            <div>
                <p>market cap. change 24h</p>
                <p>{props.capChange24h}</p>
            </div>
        </section>
     )
}
 
export default CryptoCard;