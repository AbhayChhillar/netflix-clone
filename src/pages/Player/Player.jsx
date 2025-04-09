import React, { useEffect, useState } from 'react';
import { useParams , useNavigate} from 'react-router-dom';
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
const Player = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  


  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""


  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGYwNTVjMjc2ZDA4Yzg4ODc0OGQyMmYzMWQwNTM0ZCIsIm5iZiI6MTc0NDIyNDM1Ny41MTksInN1YiI6IjY3ZjZjMDY1MzE3NzUyNzZkNmQ5MWM2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7hpGMKOksVWu1ky9tOvSKzLGzmDDCJcJZNBo6Ymf60A'
    }
  };
  
  useEffect(() =>
    {fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));
  },[])


  return (
    <div className='player'>
          <img src={back_arrow_icon} alt="Back" onClick={()=>{navigate(-2)}} />
          
          <iframe
              width='90%'
              height='90% '
              src={`https://www.youtube.com/embed/${apiData.key}`}


              title='trailer'
              frameBorder='0'
              allowFullScreen>

          </iframe>

                <div className="player-info">
                    <p>{apiData.published_at.slice(0,10)}</p>
                    <p>{apiData.name}</p>
                    <p>{apiData.type}</p>
                </div>

          

    </div>
  );
};

export default Player;