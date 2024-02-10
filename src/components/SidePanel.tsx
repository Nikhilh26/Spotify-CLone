import { Home } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import '../css/SidePannel.css'
import { useContextProps, baseURL2 } from '../App'
import { useEffect, useState } from 'react';
import Playlist from './Playlist';
import { Link } from 'react-router-dom';

// Css
const iconStyles: React.CSSProperties = {
    color: 'white',
    fontSize: '5vh'
}

// Type
type imageObject = {
    url: string,
    height: number | null,
    width: number | null
}

type ownerObject = {
    external_urls: {
        spotify: string
    },
    followers: {
        href: null,
        total: number
    },
    href: string,
    id: string,
    type: string,
    uri: string,
    display_name: string | null
}

export type simplifiedPlaylistObjects = {
    collaborative: boolean,
    description: string,
    external_urls: {
        spotify: string
    },
    href: string,
    id: string,
    name: string,
    public: boolean,
    snapshot_id: string,
    tracks: {
        href: string,
        total: number
    },
    type: string,
    uri: string,
    images: imageObject[],
    owner: ownerObject
}

type playlistResp = {
    href: string,
    limit: number,
    next: string | null,
    offset: number,
    previous: string | null,
    total: number,
    items: simplifiedPlaylistObjects[],
}

export default function SidePanel() {
    const props = useContextProps();
    const [playlist, setPlaylist] = useState<null | playlistResp>(null);

    useEffect(() => {
        if (typeof (props) === "object") {

            const resp: Promise<Response> = fetch(`${baseURL2}/v1/me/playlists`, {
                headers: {
                    Authorization: `Bearer ${props.access_token}`,
                },
                method: 'GET'
            });

            resp.then(async (data) => {
                const resp: playlistResp = await data.json();
                setPlaylist(resp);

            })
        }
    }, [])

    if (typeof (props) === 'undefined') {
        return (<div>Not allowed</div>)
    } else {
        return (
            <div className='side-panel'>

                <div className="home-search">
                    <Link className="home-btn" to="/" style={{ "textDecoration": "none" }}>
                        <Home className="Style-icon" style={iconStyles} />
                        <div style={{ color: 'white', paddingLeft: '1vw' }}>Home</div>
                    </Link>

                    <Link className="search-btn" to='/search' style={{ "textDecoration": "none" }}>
                        <SearchIcon className="Style-icon" style={iconStyles} />
                        <div style={{ color: 'white', paddingLeft: '1vw' }}>Search</div>
                    </Link>

                </div>

                <div className="library-and-playlist">

                    <div className='library' >
                        <LibraryAddIcon style={iconStyles} />
                        <div style={{ color: "white", paddingLeft: '1vw' }}>
                            Your Library
                        </div>
                    </div>

                    <div style={{ color: "white", marginTop: "2vh" }}>
                        Playlist
                    </div>

                    <div className='Recent-search-and-list'>

                        <div className='recent-search'>
                            <div title='search' >
                                <SearchIcon />
                            </div>

                            <div className='recent'>
                                <div>
                                    Recents
                                </div>
                                <FormatListBulletedIcon />
                            </div>
                        </div>

                        <div className='list'>

                            {
                                playlist?.items
                                &&
                                playlist?.items.length
                                &&
                                playlist?.items.map((element, idx) => {
                                    return (<Playlist key={idx} props={element} />)
                                })
                            }

                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

// backgroundColor: 'rgba(0,0,0,0.8)' -> bg playlist color
//import { run } from './../pages/LandingPage'

// TODO
// implement search functionality