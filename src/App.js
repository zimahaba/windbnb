import classes from './App.module.css';
import logo from './assets/logo.png';
import search from './assets/search.png';
import properties from './assets/stays.json';
import rating from './assets/rating.png';
import { useState } from 'react';
import SearchModal from './SearchModal';

function App() {

  const [showSearch, setShowSearch] = useState(false);
  const [city, setCity] = useState('Helsinki');
  const [country, setCountry] = useState('Finland');

  const locationClickHandler = () => {
    setShowSearch(true);
  }

  const guestsClickHandler = () => {
    console.log('guests')
  }

  const lensClickHandler = () => {
    console.log('icon')
  }

  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <div>
          <img src={logo}/>
        </div>
        <div className={classes['search-div']}>
          <div onClick={locationClickHandler} className={`${classes['search-field']} ${classes['location-search']}`}>
            <div>{city + ', ' + country}</div>
          </div>
          <div onClick={guestsClickHandler} className={`${classes['search-field']} ${classes['guests-search']}`}>
            <div>Add guests</div>
          </div>
          <div onClick={lensClickHandler} className={classes['search-field']}>
            <img className={classes['search-icon']} src={search}/>
          </div>
        </div>
      </div>
      <div className={classes.properties}>
        <div className={classes['properties-title']}>
          <div>
            Stays in Finland
          </div>
          <div>
            12+ stays
          </div>
        </div>
        <div className={classes['properties-list']}>
          {properties.map(prop => (
              <div className={classes['property']}>
                <img className={classes['property-image']} src={prop.photo}></img>
                <div className={classes['property-info']}>
                  <div className={classes['property-desc']}>
                    <div className={classes['desc-1']}>
                      {prop.superHost &&
                        <div className={classes['super-host']}>SUPER HOST</div>
                      }
                      <div className={classes['prop-type']}>{prop.type}</div>
                    </div>
                    <div className={classes.rating}><img className={classes['rating-img']} src={rating}></img>{prop.rating}</div>
                  </div>
                  <div className={classes['prop-title']}>
                    {prop.title}
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      
      {showSearch &&
        <SearchModal onCancel={() => setShowSearch(false)}/>
      }
    </div>
  );
}

export default App;
