import { useEffect, useState} from 'react';
import './App.css';

import OscillatingGrid from './OscillatingGrid';
import Header from './Header';
import NewsCard from './NewsCard';

interface Article {
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}

function App() {
  const [error, setError] = useState(false);
  const [inputValue, setValue] = useState('');
  const [page, setPage] = useState(0);
  const [articles, setArticles] = useState<Article[]>([]);
  const [expArticles, setExpArticles] = useState<Article[]>([]);
  const [locArticles, setLocalArticles] = useState<Article[]>([]);
  const [city, setCity] = useState('');
  const [isLoading, setLoading] = useState(false)
  const server_url = "https://buzzwirebe.onrender.com"
  const BASE_URL = server_url + '/api';

  const handleUserSearch = () => {
    console.log(inputValue)
    if (inputValue != '' && page == 0) {
      setLoading(true)
      const url = BASE_URL + "/" + encodeURIComponent(inputValue)
      fetch(url, {})
      .then((response) => {
        if (!response.ok) {
          setLoading(false);
          throw new Error('Network response was not ok');
        }
        setLoading(false);
        return response.json();
      })
      .then((data) => {
        setValue('');
        setArticles(data.articles);
        setLoading(false);
        console.log(data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(true); // Set error state or handle error as needed
        setLoading(false);
      });

    }
    else if (page == 1 && expArticles.length == 0) {
      setLoading(true);
      const url = BASE_URL + "/" + encodeURIComponent("breaking news")
      fetch(url, {})
      .then((response) => {
        if (!response.ok) {
          setLoading(false);
          throw new Error('Network response was not ok');
        }
        setLoading(false);
        return response.json();
      })
      .then((data) => {
        setValue('');
        setExpArticles(data.articles);
        setLoading(false);
        console.log(data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(true); 
        setLoading(false);
      });
    } else if (page == 2 && locArticles.length == 0) {
      setLoading(true);
      const city_url = 'https://ipapi.co/json/'
      fetch(city_url, {})
      .then((response) => {
        if (!response.ok) {
          setLoading(false);
          throw new Error('Network response was not ok');
        }
        setLoading(false);
        return response.json();
      })
      .then((data) => {
        setCity(data.city)
        console.log(data)
        console.log(page)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(true); // Set error state or handle error as needed
        setLoading(false);
      });
    } 
  };

  useEffect(() => {
    if (page == 2) {
      const header = city + ' news'
      const url = BASE_URL + "/" + encodeURIComponent(header)
      fetch(url, {})
      .then((response) => {
        if (!response.ok) {
          setLoading(false);
          throw new Error('Network response was not ok');
        }
        setLoading(false);
        return response.json();
      })
      .then((data) => {
        setValue('');
        setLocalArticles(data.articles);
        setLoading(false);
        console.log(data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(true); 
        setLoading(false);
      });
    }

  }, [city]);


  useEffect(() => {
    setError(false)
    if (page == 1 || page == 2) {
      handleUserSearch();
      console.log(locArticles)
    }
  }, [page]);

  const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log("enter")
      console.log(inputValue)
      // setLoading(true)
      handleUserSearch();
      
      console.log("input: ", inputValue)
    }
  };

  return (
    <div>
      <Header onPageChange={setPage} activePage={page}/>
      <div className='container'>
        <OscillatingGrid />
          {page === 0 && isLoading == false && error == false? (
            <div className="content-wrapper">
              <div className="title-container">
                <span>BuzzWire</span>
                <span>BuzzWire</span>
              </div>
              <div className="content-below">
                <div className="brutalist-container">
                  <input
                    placeholder="TYPE HERE"
                    className="brutalist-input smooth-type"
                    type="text"
                    onChange={(e) => setValue(e.target.value)}
                    value={inputValue}
                    onKeyDown={handleEnterKeyPress}
                  />
                  <label className="brutalist-label">News on demand</label>
                </div>
                <div style={{marginTop:'4%'}}>
                  <NewsCard articles={articles}></NewsCard>
                </div>
            </div>
          </div>
            ) : (
              isLoading == true && error == false? // means this page is loading
              <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <svg className='test' style={{top:'50%', left:'50%', position:'absolute'}} preserveAspectRatio='xMidYMid meet' viewBox='0 0 187.3 93.7'
                height='300px' width="400px">
                  <path d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 				c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z" strokeMiterlimit="10" strokeLinejoin="round" strokeLinecap="round" strokeWidth="4" fill="none" id="outline" stroke="#4E4FEB"></path>
                  <path d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 				c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z" strokeMiterlimit="10" strokeLinejoin="round" strokeLinecap="round" strokeWidth="4" stroke="black" fill="none" opacity="0.35" id="outline-bg"></path>
                </svg>
                <h1>If the backend hasn't been active recently, it can take up to a minute for the backend to restart. Please be patient. Thank you!</h1>
              </div>
              : (page == 1 && isLoading == false && error == false? 
              <div style={{marginTop:'4%'}}>
                <NewsCard articles={expArticles}></NewsCard>
              </div>  
              : 
              (page == 2 && isLoading == false && error == false
              ?  
              <div>
                <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                  <h1 style={{fontSize:50, fontWeight:10}}>{city} News</h1>
                </div>
                <div style={{marginTop:'0%'}}>
                  <NewsCard articles={locArticles}></NewsCard>
                </div>
              </div>
              : 
              <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <h1>
                An error has occurred when querying the backend. **NOTE** The backend is being hosted using Render's free service. 
                It is likely that since it is hosted in a serverless environment, there is a spin-up time after prolounged inactivity. 
                Spin up time is uncertain, but Render's website says around ~50 seconds. 
                </h1>
              </div> 
            )
            ))}
        </div>
      </div>
  );
}

export default App;
