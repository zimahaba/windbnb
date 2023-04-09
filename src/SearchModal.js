import { Fragment, useState } from "react";
import ReactDOM from 'react-dom';
import classes from './SearchModal.module.css';

const Backdrop = props => {
  return (
    <div className={classes.backdrop} onClick={props.onCancel}></div>
  );
}

const ModalOverlay = props => {

  const [location, setLocation] = useState('Helsinki, Finland');

  return (
    <div className={classes.modal}>
      <div className={classes.content}>
        
        <div className={classes['search-div']}>
          <div className={classes['location-search']}>
            <div className={classes['location-title']}>Location</div>
            <div>
              <input className={classes['location-input']} value={location} onChange={(event) => setLocation(event.target.value)}></input>
            </div>
          </div>
          <div className={classes['guests-search']}>guests</div>
          <div className={classes['search-button-div']}>Search</div>
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