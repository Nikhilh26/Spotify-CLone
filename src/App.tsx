import { Routes, Route, Link, useParams } from 'react-router-dom';
import NotFoundPage from "./pages/NotFoundPage";
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import { useContext, useState } from 'react';
import { createContext, useEffect } from 'react';
// import { Link } from 'react-router-dom';

export const baseURL = "https://accounts.spotify.com"
export const baseURL2 = "https://api.spotify.com";
export const client_id = "09612522344c47b5ad1196880320d6d2";
export const redirect_uri = "http://localhost:3000";
export const scope = "user-read-private%20user-read-email%20user-top-read%20user-follow-read%20playlist-read-private%20user-read-playback-position%20user-library-read";
export const endpointForAuth = `${baseURL}/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scope}`;
export const client_secret = "3c1cd111846246f883722112fa129401";

export type apiResponse = {
  access_token: string,
  token_type: string,
  scope: string,
  expires_in: number,
  refresh_token: string
}

const MyContext = createContext<apiResponse | undefined>(undefined);

export const useContextProps = () => {
  return useContext(MyContext);
}

function App() {

  const [params, setParams] = useState<apiResponse>({
    access_token: "",
    token_type: "",
    scope: "",
    expires_in: 0,
    refresh_token: ""
  });

  function setState(code: apiResponse) {
    setParams(code);
  }

  return (
    <MyContext.Provider value={params}>
      <div>
        <Routes>
          {
            params?.access_token?.length === 0 ?
              <Route path='/' element={<LandingPage setState={setState} />} />
              :
              <>
                <Route path='/' element={<Home />} />
                <Route path='/search/:id?' element={<Home search={true} />} />
                <Route path='/category/:id' element={<Helper />} />
              </>
          }
          <Route path='/*' element={<NotFoundPage />} />
        </Routes>
      </div>
    </MyContext.Provider>
  );

}

export default App;

function Helper() {
  const val = useParams();
  return (
    <div>hello {val.id}</div>
  );
}
// // get genre infinite scroll + genre sesong fetch
// // %20user-modify-playback-state%20user-read-playback-position%20user-library-read%20streaming%20user-read-playback-state%20user-read-recently-played%20playlist-read-private
