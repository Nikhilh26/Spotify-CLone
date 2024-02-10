import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Person2Icon from '@mui/icons-material/Person2';
import './../css/HeaderComponent.css';
import { props } from '../pages/Home'
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { baseURL2, useContextProps } from '../App';

export default function HeaderComponent({ search }: props) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const props = useContextProps();
  const redirectTo = (to: number) => () => {
    navigate(to);
  };

  useEffect(() => {

    if (query.length) {

      try {
        const encodedString = encodeURIComponent(query);
        const type = "album,artist";
        console.log(encodedString);
        fetch(`${baseURL2}/v1/search?q=${encodedString}&type=${type}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${props?.access_token}`
          }

        }).then(async (data) => await data.json()).then((data) => {
          console.log(data);
        });
      } catch (error) {
        console.log(error);
      }

    }

    console.log("mounting");
    return () => {
      console.log("unmounting");
    }
  }, [query]);

  return (
    <div className='headerComponent'>
      <div className='search-and-redirect'>

        <div style={{ backgroundColor: '#121212' }} onClick={redirectTo(-1)}>
          <ArrowBackIosIcon style={{ color: 'white' }} />
        </div>

        <div style={{ backgroundColor: '#121212' }} onClick={redirectTo(1)}>
          <ArrowForwardIosIcon style={{ color: 'white' }} />
        </div>

        {
          search
          &&
          <input type='text' style={{ 'marginLeft': '2vh', borderRadius: "15px", height: "30px", width: "300px", caretColor: "black", padding: "2px 2px 2px 2px" }}
            onChange={(e) => { setQuery(e.target.value) }} value={query} />
        }

      </div>

      <Link to="/profile" style={{ textDecoration: "none", color: "white" }}>
        <Person2Icon />
      </Link>
    </div>
  )
}