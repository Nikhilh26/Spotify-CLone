import { useEffect } from "react"
import { useContextProps, baseURL2 } from "../App";

export default function HomeComponent() {
    const props = useContextProps();

    useEffect(() => {
        if (props?.access_token) {
            (async () => {
                const data = await fetch(`${baseURL2}/v1/recommendations?limit=20&market=IN&seed`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${props.access_token}`
                    }
                })
                console.log(await data.json());
            })()
        }
    }, [])

    return (
        <div>
            Infinite scrolling ......
        </div>
    )
}
