// import VolumeOffIcon from '@mui/icons-material/VolumeOff';
// import PauseIcon from '@mui/icons-material/Pause';
// import { useState } from 'react';

import '../css/MusicPlayer.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useContextProps } from '../App';

// do not leave as object or object[]  
type songApiResponse = {
    album: object,
    artist: object[],
    available_markets: string[],
    disc_number: number,
    duration_ms: number,
    explicit: boolean,
    external_ids: object,
    external_urls: { spotify: string },
    href: string,
    id: string,
    is_playable: boolean,
    linked_from: object,
    restrictions: object,
    name: string,
    popularity: number,
    preview_url: string,
    track_number: string,
    type: string,
    uri: string,
    is_local: boolean
}

export default function MusicPlayer() {
    const dispatch = useContextProps();

    return (
        <div className="music-player-wrapper">

            <div className='music-player'>

                <div className='icons'>
                    <ShuffleIcon />
                    <SkipPreviousIcon />
                    <PlayArrowIcon />
                    <SkipNextIcon />
                    <RepeatOneIcon />
                </div>

                <input type='range' className='control-bar' />

            </div>

            <div className='add-functions'>
                <QueueMusicIcon />
                <VolumeUpIcon />
                <input
                    type='range'
                    onChange={
                        (e) => {
                            
                            console.log(e.target.value);
                        }}
                        />
            </div>

        </div>
    )
}


// find a way of playing songs
// https://developer.spotify.com/documentation/embeds/references/iframe-api (explore this )
// useEffect(() => {
    //     async function run() {
        //         try {
            //             const data = fetch('https://api.spotify.com/v1/tracks/5kRBzRZmZTXVg8okC7SJFZ?si=b7b493eaad2c4897', {
                //                 method: 'GET',
                //                 headers: {
                    //                     Authorization: `Bearer ${dispatch?.access_token}`
                    //                 }
                    //             });
                    
                    //             data.then(async (val) => await val.json()).then((val: songApiResponse) => {
                        //                 //console.log(val);
                        //                 //console.log(val.external_urls);
                        //                 if (val.external_urls?.spotify) {
                            //                     console.log(val.external_urls.spotify);
                            //                     //const audio = new Audio(val.external_urls?.spotify);
                            //                     //audio.play();
                            //                 }
                            //             })
                            //         } catch (e) {
                                //             console.log(e);
                                //         }
                                //     }
                                //     run();
                                // }, [])
                                // https://open.spotify.com/track/5kRBzRZmZTXVg8okC7SJFZ?si=b7b493eaad2c4897
                                //const 
/* <audio controls>
<source src=""></source>
</audio> */