import { endpointForAuth, baseURL, redirect_uri, client_id, client_secret, apiResponse } from '../App';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './../App.css';

type propTypes = {
    setState: (code: apiResponse) => void
}

export default function LandingPage(prop: propTypes) {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    function handleOnclick(event: React.MouseEvent) {
        window.location.replace(endpointForAuth);
    }

    async function getAccessTokenByMakingACall() {

        const url = `${baseURL}/api/token`;
        const code = queryParams.get('code');
        const body = new URLSearchParams();
        body.append("redirect_uri", redirect_uri);
        body.append("grant_type", "authorization_code");
        if (code) body.append("code", code);

        const authOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body,
            json: true
        };

        try {
            const resp = await fetch(url, authOptions);
            const data: apiResponse = await resp.json();
            prop.setState(data);
            navigate('/', { replace: true });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        document.body.style.backgroundColor = 'aliceblue';

        async function checkForCodeAndMakeACall() {
            if (queryParams.has('code')) {
                await getAccessTokenByMakingACall();
            }
        }

        checkForCodeAndMakeACall();

        return () => {
            document.body.style.backgroundColor = '#000';
        }
    })

    return (
        <div>
            <div className='animate'>
                <div className='animation-drop'>
                    <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae nisi un</h2>
                    <h5>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem quisquam quo distinctio recusandae in. Nobis temporibus iusto, laboriosam saepe vero consequatur id in modi rem exercitationem unde porro, rerum illo iste quisquam quasi harum repellendus quo blanditiis. Perferendis temporibus provident dolor recusandae neque animi inventore harum! Ad delectus asperiores alias! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse hic incidunt quasi inventore! Dolores deleniti quam sed sapiente, libero, reiciendis neque velit dolorum fugit numquam labore nobis dolor. Harum optio eum quidem! Deleniti dicta reprehenderit ea quasi neque reiciendis. Autem, dolor. Possimus, tenetur. Distinctio nostrum dolore at tempora. Inventore, officia.
                    </h5>
                </div>
                <button onClick={handleOnclick}>
                    <h3>Click To continue</h3>
                </button>
            </div>
        </div>
    )
}


// export function run(data: apiResponse) {

//     async function fetchWebApi(endpoint: string, method: string, body?: JSON) {
//         const res = await fetch(`https://api.spotify.com/${endpoint}`, {
//             headers: {
//                 Authorization: `Bearer ${data.access_token}`,
//             },
//             method,
//             body: JSON.stringify(body)
//         });
//         return await res.json();
//     }

//     async function getTopTracks() {
//         // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
//         console.log(await fetchWebApi('v1/me/', 'GET'));
//     }

//     getTopTracks();
// }
