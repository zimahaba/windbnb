import classes from './App.module.css';
import logo from './assets/logo.png';
import search from './assets/search-red.png';
import properties from './assets/stays.json';
import rating from './assets/rating.png';
import { useState } from 'react';
import SearchModal from './SearchModal';

function App() {

  const [showSearch, setShowSearch] = useState(false);
  const [searchObject, setSearchObject] = useState({city: '', country: '', hasLocation: false, adultsCount: 0, childrenCount: 0, guests: 0});
  const [propertiesList, setPropertiesList] = useState(properties);

  const searchClickHandler = () => {
    setShowSearch(true);
  }

  const searchConfirmHandler = (searchObject) => {
    setShowSearch(false);
    setSearchObject(searchObject);
    console.log('searchObject: ', searchObject)

    const filteredProperties = [...properties].filter(property => {
      let matchCity = true;
      let matchCountry = true;
      let matchGuests = true;
      
      if (searchObject.city !== '') {
        matchCity = property.city === searchObject.city;
      }
      if (searchObject.country !== '') {
        matchCountry = property.country === searchObject.country;
      }
      if (searchObject.adultsCount > 0 || searchObject.childrenCount > 0) {
        matchGuests = property.maxGuests >= searchObject.adultsCount + searchObject.childrenCount;
      }

      console.log('city['+property.city+']: ' + matchCity + ' - country['+property.country+']: ' + matchCountry + ' - count['+property.maxGuests+']: ' + matchGuests);
      return matchCity && matchCountry && matchGuests;
    });
    
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
              {!searchObject.hasLocation && <label className={classes['div-label']}>Add location</label>}
              {searchObject.hasLocation && <label style={{cursor: 'pointer'}}>{searchObject.city + ', ' + searchObject.country}</label>}
            </div>
          </div>
          <div onClick={searchClickHandler} className={`${classes['search-field']} ${classes['guests-search']}`}>
            <div>
              {searchObject.guests === 0 && <label className={classes['div-label']}>Add guests</label>}
              {searchObject.guests > 0 && <label style={{cursor: 'pointer'}}>{searchObject.guests + ' ' + (searchObject.guests > 1 ? 'guests' : 'guest')}</label>}
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
            {propertiesList.length} stays
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
        <SearchModal searchObject={searchObject} onConfirm={searchConfirmHandler} onCancel={() => setShowSearch(false)}/>
      }
    </div>
  );
}

export default App;
