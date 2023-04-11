import { Fragment, useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom';
import classes from './SearchModal.module.css';
import locationIcon from './assets/location.png';
import searchIcon from './assets/search-white.png';

const countries = ['Finland'];
const locations = [{city: 'Helsinki', country: 'Finland'}, 
                {city: 'Turku', country: 'Finland'}, 
                {city: 'Vaasa', country: 'Finland'}, 
                {city: 'Oulu', country: 'Finland'}];

const Backdrop = props => {
  return (
    <div className={classes.backdrop} onClick={props.onCancel}></div>
  );
}

const ModalOverlay = props => {

  const locationInput = useRef(null);
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [locationWrapperClass, setLocationWrapperClass] = useState('location-wrapper');
  const [locationResults, setLocationResults] = useState([]);
  const [location, setLocation] = useState({city: props.searchObject.city, country: props.searchObject.country});
  const [showLocationResult, setShowLocationResults] = useState(false);

  const [showGuestsFields, setShowGuestsFields] = useState(false);
  const [guestsWrapperClass, setGuestsWrapperClass] = useState('guests-search-wrapper');
  const [adultsCount, setAdultsCount] = useState(props.searchObject.adultsCount);
  const [childrenCount, setChildrenCount] = useState(props.searchObject.childrenCount);


  const locationChangeHandler = () => {
    setLocation({city: '', country: ''});
    if (locationInput.current.value.length > 2) {
      let countriesFound = countries.filter(country => country.toUpperCase().includes(locationInput.current.value.toUpperCase()));
      if (countriesFound.length > 0) {
        setLocationResults(locations.filter(location => location.country.toUpperCase().includes(locationInput.current.value.toUpperCase()))
          .map(location => ({city: location.city, country: location.country})));
      } else {
        setLocationResults(locations.filter(location => location.city.toUpperCase().includes(locationInput.current.value.toUpperCase()))
          .map(location => ({city: location.city, country: location.country})));
      }
      
      setShowLocationResults(true);
    } else {
      setShowLocationResults(false);
    }
  }

  const locationResultClickHandler = (selectedLocation) => {
    locationInput.current.value = selectedLocation.city + ', ' + selectedLocation.country;
    setLocation(selectedLocation);
    setShowLocationResults(false);
  }

  useEffect(() => {
    if (location.city !== '' && location.country !== '') {
      setShowLocationInput(true);
      if (locationInput.current != null) {
        locationInput.current.value = location.city + ', ' + location.country;
      }
    } else {
showLocationIfInputAvailable();
    }
  }, [showLocationInput])

  const hasParentId = (target, parentId) => {
    let node = target;
    while (node !== null) {
      if (node.id === parentId) {
        return true;
      } else if (node.id === 'search-modal-content') {
        return false;
      }
      node = node.parentNode;
    }
    return false;
  }

  const showLocationIfInputAvailable = () => {
    if (locationInput.current !== null) {
      locationInput.current.focus();
      if (locationInput.current.value.length > 2) {
        setShowLocationResults(true);
      }
      setLocationWrapperClass('location-wrapper-border');
    }
  }

  const showLocation = () => {
    setShowLocationInput(true);
    showLocationIfInputAvailable();
  }

  const hideLocation = () => {
    setShowLocationResults(false);
    setLocationWrapperClass('location-wrapper');
    if (locationInput.current !== null && locationInput.current.value === '') {
      setShowLocationInput(false);
    }
  }

  const showGuests = () => {
    setShowGuestsFields(true);
    setGuestsWrapperClass('guests-search-wrapper-border');
  }

  const hideGuests = () => {
    setShowGuestsFields(false);
    setGuestsWrapperClass('guests-search-wrapper');
  }

  const modalClickHandler = (event) => {
    if (hasParentId(event.target, 'location-search-div')) {
      showLocation();
      hideGuests();
    } else if (hasParentId(event.target, 'guests-search-div') || hasParentId(event.target, 'guests-count')) {
      showGuests();
      hideLocation();
    } else {
      hideLocation();
      hideGuests();
    }
  }

  const updateAdultsCount = (operation) => {
    if (operation === 'add') {
      setAdultsCount(adultsCount+1);
    } else if (operation === 'subtract') {
      if (adultsCount > 0) {
        setAdultsCount(adultsCount-1);
      }
    }
  }

  const updateChildrenCount = (operation) => {
    if (operation === 'add') {
      setChildrenCount(childrenCount+1);
    } else if (operation === 'subtract') {
      if (childrenCount > 0) {
        setChildrenCount(childrenCount-1);
      }
    }
  }
  
  const searchButtonClickHandler = () => {
    props.onConfirm({city: location.city, 
                    country: location.country, 
                    hasLocation: location.city !== '' && location.country !== '', 
                    adultsCount: adultsCount, 
                    childrenCount: childrenCount,
                    guests: adultsCount + childrenCount});
  }

  return (
    <div className={classes.modal} onClick={modalClickHandler}>
      <div id='search-modal-content' className={classes.content}>
        
        <div className={classes['search-div']}>
          <div className={classes['location-search']}>
            <div id='location-search-div' className={classes[locationWrapperClass]}>
              <div className={classes['div-title']}>Location</div>
              <div>
                  {showLocationInput &&
                    <input id='location-search-input' className={classes['location-input']} onChange={locationChangeHandler} ref={locationInput}></input>}
                  {!showLocationInput &&
                    <label id='location-search-label' className={classes['div-label']}>Add location</label>}
              </div>
            </div>
          </div>
          <div className={classes['guests-search']}>
            <div id='guests-search-div' className={classes[guestsWrapperClass]}>
              <div className={classes['div-title']}>Guests</div>
              <div>
                {adultsCount + childrenCount > 0 &&
                  <label>{adultsCount + childrenCount} {adultsCount + childrenCount === 1 ? 'guest' : 'guests'}</label>}
                {adultsCount + childrenCount === 0 &&
                  <label className={classes['div-label']}>Add guests</label>}
                
              </div>
            </div>
          </div>
          <div className={classes['search-button-div']}>
            <button onClick={searchButtonClickHandler} className={classes['search-button']}>
              <img className={classes['search-icon']} src={searchIcon}/>
              Search
            </button>
          </div>
        </div>

        <div className={classes.results}>
          {showLocationResult &&
            <div className={classes['location-results']}>
              {locationResults.map((result, index) => (
                <div id={'location_result_' + index} className={classes['location-item']} onClick={() => locationResultClickHandler(result)}>
                  <img className={classes['location-icon']} src={locationIcon}/>
                  {result.city + ', ' + result.country}
                </div>
              ))}
            </div>
          }

          {showGuestsFields && 
            <div id='guests-count' className={classes['guests-count']}>
              <div className={classes['guests-count-wrapper']}>
                <div>Adults</div>
                <div className={classes['div-label']}>Ages 13 or above</div>
                <div>
                  <button className={classes['operation-button']} onClick={() => updateAdultsCount('subtract')}>-</button> 
                    <label className={classes['count-label']}>{adultsCount}</label>
                  <button className={classes['operation-button']} onClick={() => updateAdultsCount('add')}>+</button>
                </div>
              </div>
              <div className={classes['guests-count-wrapper']}>
                <div>Children</div>
                <div className={classes['div-label']}>Ages 13 or above</div>
                <div>
                  <button className={classes['operation-button']} onClick={() => updateChildrenCount('subtract')}>-</button> 
                    <label className={classes['count-label']}>{childrenCount}</label>
                  <button className={classes['operation-button']} onClick={() => updateChildrenCount('add')}>+</button>
                </div>
              </div>
            </div>
          }
        </div>
        
      </div>
    </div>
  );
}

const portalElement = document.getElementById('overlays');

const SearchModal = props => {

  const searchHandler = (searchObject) => {
    props.onConfirm(searchObject);
  }

  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onCancel={props.onCancel}/>, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay searchObject={props.searchObject} onConfirm={searchHandler}/>, portalElement)}
    </Fragment>
  );
}

export default SearchModal;