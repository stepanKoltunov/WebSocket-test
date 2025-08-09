import {useEffect, useRef, useState} from "react";

function App() {
    const [btnValue, setBtnValue] = useState<boolean>(false)
    const [price, setPrice] = useState<number | null>(null);
    const socketData = useRef<WebSocket | null>(null)

    useEffect(() => {
        if (btnValue) {
            socketData.current = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade')
            socketData.current.onmessage = (event) => {
                const data = JSON.parse(event.data);
                const newPrice = parseFloat(data.p);
                setPrice(newPrice);
            }
        } else {
            socketData.current?.close();
            setPrice(null);
        }
        return () => {
            if (socketData.current) {
                socketData.current.close();
            }
        }
    },[btnValue])

    return (
      <div>
          <span>{price}</span>
          <button onClick={() => setBtnValue(prev => !prev)}>Старт/Стоп</button>
      </div>
  )
}

export default App
