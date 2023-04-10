import { Fragment, useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom';
import classes from './SearchModal.module.css';
import locationIcon from './assets/location.png';

const Backdrop = props => {
  return (
    <div className={classes.backdrop} onClick={props.onCancel}></div>
  );
}

const countries = ['Finland'];
const locations = [{city: 'Helsinki', country: 'Finland'}, 
                {city: 'Turku', country: 'Finland'}, 
                {city: 'Vaasa', country: 'Finland'}, 
                {city: 'Oulu', country: 'Finland'}];

const ModalOverlay = props => {

  const locationInput = useRef(null);
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [locationWrapperClass, setLocationWrapperClass] = useState('location-wrapper');
  const [locationResults, setLocationResults] = useState(['Helsinki, Finland', 'Recife, Brasil']);
  const [showLocationResult, setShowLocationResults] = useState(false);

  const locationChangeHandler = () => {
    if (locationInput.current.value.length > 2) {
      let countriesFound = countries.filter(country => country.toUpperCase().includes(locationInput.current.value.toUpperCase()));
      if (countriesFound.length > 0) {
        setLocationResults(locations.filter(location => location.country.toUpperCase().includes(locationInput.current.value.toUpperCase())).map(location => location.city + ', ' + location.country));
      } else {
        setLocationResults(locations.filter(location => location.city.toUpperCase().includes(locationInput.current.value.toUpperCase())).map(location => location.city + ', ' + location.country));
      }
      
      setShowLocationResults(true);
    } else {
      setShowLocationResults(false);
    }
  }

  const locationResultClickHandler = (location) => {
    locationInput.current.value = location;
    setShowLocationResults(false);
  }

  useEffect(() => {
    if (locationInput.current !== null) {
      locationInput.current.focus();
      if (locationInput.current.value.length > 2) {
        setShowLocationResults(true);
      }
      setLocationWrapperClass('location-wrapper-border');
    }
  }, [showLocationInput])

  const test = (event) => {
    if (event.target.id === 'location-search-div' || event.target.id === 'location-search-input' || event.target.id === 'location-search-label') {
      setShowLocationInput(true);
      setLocationWrapperClass('location-wrapper-border');
      if (locationInput.current !== null) {
        locationInput.current.focus();
        if (locationInput.current.value.length > 2) {
          //setLocationResults(properties.filter(property => property.city === locationInput.current.value).map(property => property.city + ', ' + property.country));
          setShowLocationResults(true);
        }
      }
    } else {
      setShowLocationResults(false);
      setLocationWrapperClass('location-wrapper');
      if (locationInput.current !== null && locationInput.current.value === '') {
        setShowLocationInput(false);
      }
    }
  }

  return (
    <div className={classes.modal} onClick={test}>
      <div className={classes.content}>
        
        <div className={classes['search-div']}>
          <div className={classes['location-search']}>
            <div id='location-search-div' className={classes[locationWrapperClass]}>
              <div className={classes['div-title']}>Location</div>
              <div>
                  {showLocationInput &&
                    <input id='location-search-input' className={classes['location-input']} onChange={locationChangeHandler} ref={locationInput}></input>}
                  {showLocationInput == false &&
                    <label id='location-search-label' className={classes['div-label']}>Add location</label>}
              </div>
            </div>
          </div>
          <div className={classes['guests-search']}>
            <div className={classes['div-title']}>Guests</div>
            <div>
              <label className={classes['div-label']}>Add guests</label>
            </div>
          </div>
          <div className={classes['search-button-div']}>Search</div>
        </div>

        <div className={classes.results}>
          {showLocationResult &&
            <div className={classes['location-results']}>
              {locationResults.map((result, index) => (
                <div id={'location_result_' + index} className={classes['location-item']} onClick={() => locationResultClickHandler(result)}>
                  <img className={classes['location-icon']} src={locationIcon}/>
                  {result}
                </div>
              ))}
            </div>
          }
        </div>
        
      </div>
    </div>
  );
}

const portalElement = document.getElementById('overlays');

const SearchModal = props => {

  const searchHandler = () => {

  }

  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onCancel={props.onCancel}/>, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay onConfirm={searchHandler}/>, portalElement)}
    </Fragment>
  );
}

export default SearchModal;