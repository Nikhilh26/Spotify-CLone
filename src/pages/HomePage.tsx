import { useEffect } from "react"
import HeaderComponent from "../components/HeaderComponent"
import HomeComponent from "../components/HomeComponent"
import HomeSearchComponent from "../components/HomeSearchComponent"
import { props } from './Home'

// import './../css/HomePage.css' -> Removed as it only had only one class

const style: React.CSSProperties = {
    flexGrow: "1",
    backgroundColor: "#121212",
    border: "2px red solid",
    borderRadius: "50px",
    marginLeft: "1vw",
    overflowY: "scroll",
    minWidth: "300px"
}

export default function HomePage({ search }: props) {
    // useEffect(() => {
    //     console.log("onloading");
    //     return () => {
    //         console.log("deboard");
    //     }
    // }, [])

    return (
        <div className="home-page-wrapper" style={style}>

            <div style={{ marginBottom: '2vh' }}>
                <HeaderComponent search={search} />
            </div>

            {
                search ?
                    <HomeSearchComponent />
                    :
                    <HomeComponent />
            }
        </div>
    )
}

// get genre infinite scroll + genre sesong fetch