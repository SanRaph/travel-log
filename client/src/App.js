import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { listLogEntries } from './API';

import LogEntryForm from './LogEntryForm';

const App = () => {
  const [ logEnries, setLogEntries ] = useState( [] );
  const [ showPopup, setShowPopup ] = useState( {} );
  const [addEntryLocation, setAddEntryLocation] = useState(null);

  const [viewport, setViewport] = useState({
    height: '100vh',
    width: '100vw',
    latitude: 6.4349121,
    longitude: 3.4228469,
    zoom: 3
  });

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries( logEntries );
  };

  useEffect( () => {
    getEntries();
  }, [] );

  const showAddMarkerPopup = (event) => {
    const [ longitude, latitude ] = event.lngLat;
    setAddEntryLocation({ latitude, longitude, })
  }

  return (
    <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/sanraph1990/ckky4f2eo0lek17ocrcmbgusr"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        onDblClick={showAddMarkerPopup}
      >
        {
          logEnries.map( entry => (
            <React.Fragment key={ entry._id }>
              <Marker

                
                latitude={ entry.latitude } 
                longitude={ entry.longitude } 
                >

              <div onClick={ () => setShowPopup( { /* ...showPopup, */ [entry._id]: true, } ) } >

                  <svg 
                    className="marker"
                    style={{
                      width: `${ 12 * viewport.zoom }px`,
                      width: `${ 12 * viewport.zoom }px`
                    }} 
                    viewBox="0 0 24 24" 
                    stroke="#FFFF00" 
                    stroke-width="1" 
                    fill="none" 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                  > <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z">
                    </path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>

              </div>

              </Marker>

              {
                showPopup[entry._id] ? (
                  <Popup
                      latitude={ entry.latitude } 
                      longitude={ entry.longitude } 
                      closeButton={true}
                      closeOnClick={false}
                      dynamicPosition={true}
                      onClose={ () => setShowPopup( { ...showPopup, [entry._id]: false, } ) }
                      anchor="top" >
                      <div className="popup">
                        <h4>{entry.title}</h4>
                        <p>{entry.comment}</p>
                        <p>{entry.description}</p>
                        <p>Rating: {entry.rating}</p>
                        <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
                        { entry.image ? <img src={entry.image} alt={entry.title} /> : null }
                      </div>
                  </Popup>
                ) : null
              }

            </React.Fragment>

          ) )
        
        }

        {
          addEntryLocation ? (
            <>

                  <Marker

                      latitude={ addEntryLocation .latitude } 
                      longitude={ addEntryLocation .longitude } 
                      >

                      <div>

                        <svg 
                          className="marker"
                          style={{
                            width: `${ 12 * viewport.zoom }px`,
                            height: `${ 12 * viewport.zoom }px`
                          }} 
                          viewBox="0 0 24 24" 
                          stroke="#FF0000" 
                          stroke-width="1" 
                          fill="none" 
                          stroke-linecap="round" 
                          stroke-linejoin="round" 
                        > <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z">
                          </path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>

                        
                      </div>

                  </Marker>

                    <Popup
                        latitude={ addEntryLocation.latitude } 
                        longitude={ addEntryLocation.longitude } 
                        closeButton={true}
                        closeOnClick={false}
                        dynamicPosition={true}
                        onClose={ () => setAddEntryLocation(null) }
                        anchor="top" >
                        <LogEntryForm onClose={ () => { setAddEntryLocation(null); getEntries(); } } location={addEntryLocation} />
                    </Popup>


            </>
          ) : null
        }

    </ReactMapGL>
  );
}

export default App;