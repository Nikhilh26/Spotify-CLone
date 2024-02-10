import HomePage from './HomePage'
import MusicPlayer from '../components/MusicPlayer'
import SidePanel from '../components/SidePanel'
import { useParams } from 'react-router-dom'
// import '../css/Home.css'

export type props = {
    search?: boolean
}
const style: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    color: "white",
    height: "99vh",
}

export default function Home({ search }: props) {
    const vals = useParams();
    console.log(vals);
    return (
        <>
            <div className='home-wrapper' style={style}>
                <SidePanel />
                <HomePage search={search} />
            </div>
            <MusicPlayer />
        </>
    )
}