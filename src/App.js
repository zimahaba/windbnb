import classes from './App.module.css';
import logo from './assets/logo.png';
import search from './assets/search-red.png';
import properties from './assets/stays.json';
import rating from './assets/rating.png';
import { useState } from 'react';
import SearchModal from './SearchModal';

function App() {

  const [showSearch, setShowSearch] = useState(false);
  const [location, setLocation] = useState('');
  const [guestsCount, setGuestsCount] = useState(0);
  const [propertiesList, setPropertiesList] = useState(properties);

  const searchClickHandler = () => {
    setShowSearch(true);
  }

  const searchConfirmHandler = (location, guestsCount) => {
    setShowSearch(false);
    setLocation(location);
    console.log('location: ', location);
    setGuestsCount(guestsCount);

    let filteredProperties = [...properties];
    if (location !== '') {
      let locationArray = location.split(',');
      if (locationArray.length > 1) {
        console.log('country: ', locationArray[1]);
        filteredProperties = filteredProperties.filter(property => property.country === locationArray[1].trim());
      }
      console.log('city: ', locationArray[0]);
      filteredProperties = filteredProperties.filter(property => property.city === locationArray[0].trim());
    }

    if (guestsCount > 0) {
      filteredProperties = filteredProperties.filter(property => property.maxGuests >= guestsCount);
    }
    
    setPropertiesList(filteredProperties)
  }

  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <div>
          <img src={logo}/>
        </div>
        <div className={classes['search-div']}>
          <div onClick={searchClickHandler} className={`${classes['search-field']} ${classes['location-search']}`}>
            <div>
              {location === '' && <label className={classes['div-label']}>Add location</label>}
              {location !== '' && <label style={{cursor: 'pointer'}}>{location}</label>}
            </div>
          </div>
          <div onClick={searchClickHandler} className={`${classes['search-field']} ${classes['guests-search']}`}>
            <div>
              {guestsCount === 0 && <label className={classes['div-label']}>Add guests</label>}
              {guestsCount > 0 && <label style={{cursor: 'pointer'}}>{guestsCount + ' ' + (guestsCount > 1 ? 'guests' : 'guest')}</label>}
            </div>
          </div>
          <div onClick={searchClickHandler} className={classes['search-field']}>
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
          {propertiesList.map(prop => (
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
        <SearchModal onConfirm={searchConfirmHandler} onCancel={() => setShowSearch(false)}/>
      }
    </div>
  );
}

export default App;
