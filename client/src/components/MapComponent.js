// import React, { useEffect, useRef } from 'react';
// import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';


// // Set your Mapbox access token here
// mapboxgl.accessToken = 'pk.eyJ1IjoiY2FkZW5tYWNrZW56aWUiLCJhIjoiY2x1eXUwZGN2MDBxYjJpcjM0dmg0cDU0aCJ9.KB2ahNXpmjIpT8CC7Q2Ejg';

// const MapComponent = () => {
//     const mapContainerRef = useRef(null);
//     const mapRef = useRef(null); // To hold the Map instance

//     // useEffect(() => {
//     //     // Function to initialize the map
//     //     const initializeMap = () => {
//     //         console.log("Initializing map...");
//     //         const newMap = new mapboxgl.Map({
//     //             container: mapContainerRef.current,
//     //             style: 'mapbox://styles/mapbox/streets-v11', // You can change the style
//     //             center: [-103.181102, 20.519758], // Initial geographical center of the map
//     //             zoom: 13 // Initial map zoom level
//     //         });

//     //         newMap.on('load', () => {
//     //             console.log("Map loaded successfully");
//     //             fetchDirections(newMap); // Fetch directions once the map is loaded
//     //         });

//     //         mapRef.current = newMap; // Store the map instance in the ref
//     //     };

//     //     if (!mapRef.current) {
//     //         initializeMap(); // Initialize map if it's not already initialized
//     //     }

//     //     return () => {
//     //         if (mapRef.current) {
//     //             console.log("Removing map...");
//     //             mapRef.current.remove();
//     //         }
//     //     };
//     // }, []); // Empty dependency array ensures this effect runs only once
//     useEffect(() => {
//         if (mapRef.current) return; // Exit if map is already initialized
    
//         const initializeMap = () => {
//             console.log("Initializing map...");
//             const newMap = new mapboxgl.Map({
//                 container: mapContainerRef.current,
//                 style: 'mapbox://styles/mapbox/streets-v11',
//                 center: [-103.181102, 20.519758],
//                 zoom: 13
//             });
    
//             newMap.on('load', () => {
//                 console.log("Map loaded successfully");
//                 fetchDirections(newMap);
//             });
    
//             mapRef.current = newMap;
//         };
    
//         initializeMap();
    
//         // Proper cleanup to remove the map only when the component is unmounting
//         return () => {
//             if (mapRef.current) {
//                 console.log("Removing map...");
//                 mapRef.current.remove();
//                 mapRef.current = null;
//             }
//         };
//     }, []); // Ensure this effect runs only once by passing an empty dependency array
    

//     // Function to fetch directions from the backend
//     const fetchDirections = async (map) => {
//         console.log("Fetching directions...");
//         try {
//             const response = await fetch(`${window.location.origin}/directions`);
//             const data = await response.json();
//             if (data.location && data.location.routes) {
//                 const route = data.location.routes[0];
//                 const geojson = {
//                     type: 'Feature',
//                     properties: {},
//                     geometry: route.geometry
//                 };

//                 map.addSource('route', {
//                     type: 'geojson',
//                     data: geojson
//                 });

//                 map.addLayer({
//                     id: 'route',
//                     type: 'line',
//                     source: 'route',
//                     layout: {
//                         'line-join': 'round',
//                         'line-cap': 'round'
//                     },
//                     paint: {
//                         'line-color': '#4287f5',
//                         'line-width': 8
//                     }
//                 });

//                 console.log("Route added to the map");
//             }
//         } catch (error) {
//             console.error('Failed to fetch directions:', error);
//         }
//     };

//     return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
// };

// export default MapComponent;

// import React, { useEffect, useRef } from 'react';
// import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';

// mapboxgl.accessToken = 'pk.eyJ1IjoiY2FkZW5tYWNrZW56aWUiLCJhIjoiY2x1eXUwZGN2MDBxYjJpcjM0dmg0cDU0aCJ9.KB2ahNXpmjIpT8CC7Q2Ejg'; // Replace with your actual Mapbox access token

// const MapComponent = () => {
//     const mapContainerRef = useRef(null);
//     const mapRef = useRef(null); // To hold the Map instance

//     useEffect(() => {
//         if (mapRef.current) return; // If map is already initialized

//         const newMap = new mapboxgl.Map({
//             container: mapContainerRef.current,
//             style: 'mapbox://styles/mapbox/streets-v11',
//             center: [-103.181102, 20.519758], // Set a default center
//             zoom: 13
//         });

//         newMap.on('load', () => {
//             console.log("Map loaded successfully");
//             fetchDirections(newMap); // Pass map instance to fetchDirections
//         });

//         mapRef.current = newMap; // Store the map instance in the ref

//         return () => {
//             if (mapRef.current) {
//                 console.log("Removing map...");
//                 mapRef.current.remove();
//                 mapRef.current = null;
//             }
//         };
//     }, []);

//     const fetchDirections = async (map) => {
//         try {
//             const response = await fetch(`${window.location.origin}/directions`);
//             const data = await response.json();
//             if (data.location && data.location.routes) {
//                 const route = data.location.routes[0];
//                 const geojson = {
//                     type: 'Feature',
//                     properties: {},
//                     geometry: route.geometry
//                 };

//                 map.addSource('route', {
//                     type: 'geojson',
//                     data: geojson
//                 });

//                 map.addLayer({
//                     id: 'route',
//                     type: 'line',
//                     source: 'route',
//                     layout: {
//                         'line-join': 'round',
//                         'line-cap': 'round'
//                     },
//                     paint: {
//                         'line-color': '#4287f5',
//                         'line-width': 8
//                     }
//                 });

//                 // Add markers for each stop
//                 route.geometry.coordinates.forEach(coord => {
//                     new mapboxgl.Marker()
//                         .setLngLat(coord)
//                         .addTo(map);
//                 });

//                 console.log("Route added to the map");
//             }
//         } catch (error) {
//             console.error('Failed to fetch directions:', error);
//         }
//     };

//     return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
// };

// export default MapComponent;
// import React, { useEffect, useRef } from 'react';
// import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';

// mapboxgl.accessToken = 'pk.eyJ1IjoiY2FkZW5tYWNrZW56aWUiLCJhIjoiY2x1eXUwZGN2MDBxYjJpcjM0dmg0cDU0aCJ9.KB2ahNXpmjIpT8CC7Q2Ejg'; // Replace with your actual Mapbox access token

// const MapComponent = () => {
//     const mapContainerRef = useRef(null);
//     const mapRef = useRef(null); // To hold the Map instance

//     useEffect(() => {
//         if (mapRef.current) return; // If map is already initialized

//         const newMap = new mapboxgl.Map({
//             container: mapContainerRef.current,
//             style: 'mapbox://styles/mapbox/streets-v11',
//             center: [-103.181102, 20.519758], // Set a default center
//             zoom: 13
//         });

//         newMap.on('load', () => {
//             console.log("Map loaded successfully");
//             fetchDirections(newMap); // Pass map instance to fetchDirections
//         });

//         mapRef.current = newMap; // Store the map instance in the ref

//         return () => {
//             if (mapRef.current) {
//                 console.log("Removing map...");
//                 mapRef.current.remove();
//                 mapRef.current = null;
//             }
//         };
//     }, []);

//     const fetchDirections = async (map) => {
//         try {
//             const response = await fetch(`${window.location.origin}/directions`);
//             const data = await response.json();
//             if (data.location && data.location.routes) {
//                 const route = data.location.routes[0];
//                 const geojson = {
//                     type: 'Feature',
//                     properties: {},
//                     geometry: route.geometry
//                 };

//                 map.addSource('route', {
//                     type: 'geojson',
//                     data: geojson
//                 });

//                 map.addLayer({
//                     id: 'route',
//                     type: 'line',
//                     source: 'route',
//                     layout: {
//                         'line-join': 'round',
//                         'line-cap': 'round'
//                     },
//                     paint: {
//                         'line-color': '#4287f5',
//                         'line-width': 8
//                     }
//                 });

//                 // Assume data.stops contains the geocoded coordinates for each stop
//                 data.stops.forEach(stop => {
//                     new mapboxgl.Marker()
//                         .setLngLat([stop.longitude, stop.latitude]) // Make sure these are the correct property names
//                         .addTo(map);
//                 });

//                 console.log("Route and markers added to the map");
//             }
//         } catch (error) {
//             console.error('Failed to fetch directions:', error);
//         }
//     };

//     return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
// };

// export default MapComponent;
// import React, { useEffect, useRef } from 'react';
// import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';

// mapboxgl.accessToken = 'pk.eyJ1IjoiY2FkZW5tYWNrZW56aWUiLCJhIjoiY2x1eXUwZGN2MDBxYjJpcjM0dmg0cDU0aCJ9.KB2ahNXpmjIpT8CC7Q2Ejg';

// const MapComponent = () => {
//     const mapContainerRef = useRef(null);
//     const mapRef = useRef(null);

//     useEffect(() => {
//         if (mapRef.current) return;  // Ensures the map is initialized only once

//         const newMap = new mapboxgl.Map({
//             container: mapContainerRef.current,
//             style: 'mapbox://styles/mapbox/streets-v11',
//             center: [-103.181102, 20.519758],
//             zoom: 13
//         });

//         newMap.on('load', () => {
//             console.log("Map loaded successfully");
//             fetchDirections(newMap);
//         });

//         mapRef.current = newMap;

//         return () => {
//             if (mapRef.current) {
//                 console.log("Removing map...");
//                 mapRef.current.remove();
//                 mapRef.current = null;
//             }
//         };
//     }, []);

//     const fetchDirections = async (map) => {
//         try {
//             const response = await fetch(`${window.location.origin}/directions`);
//             const data = await response.json();
//             if (data.location && data.location.routes) {
//                 const route = data.location.routes[0];
//                 const geojson = {
//                     type: 'Feature',
//                     properties: {},
//                     geometry: route.geometry
//                 };
    
//                 map.addSource('route', {
//                     type: 'geojson',
//                     data: geojson
//                 });
    
//                 map.addLayer({
//                     id: 'route',
//                     type: 'line',
//                     source: 'route',
//                     layout: {
//                         'line-join': 'round',
//                         'line-cap': 'round'
//                     },
//                     paint: {
//                         'line-color': '#4287f5',
//                         'line-width': 8
//                     }
//                 });
    
//                 console.log("Route added to the map");
    
//                 if (data.stops && data.stops.length > 0) {
//                     // Adding a unique marker for the starting point
//                     new mapboxgl.Marker({ color: 'green' })
//                         .setLngLat([data.stops[0].coordinates[0], data.stops[0].coordinates[1]])
//                         .addTo(map);
    
//                     // Adding a unique marker for the ending point
//                     new mapboxgl.Marker({ color: 'red' })
//                         .setLngLat([data.stops[data.stops.length - 1].coordinates[0], data.stops[data.stops.length - 1].coordinates[1]])
//                         .addTo(map);
    
//                     // Add markers for other stops if needed
//                     data.stops.slice(1, -1).forEach(stop => {
//                         new mapboxgl.Marker()
//                             .setLngLat([stop.coordinates[0], stop.coordinates[1]])
//                             .addTo(map);
//                     });
    
//                     console.log("Markers added to the map");
//                 } else {
//                     console.error("No stops data available");
//                 }
//             } else {
//                 console.error("No route data available");
//             }
//         } catch (error) {
//             console.error('Failed to fetch directions:', error);
//         }
//     };
    

//     return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
// };

// export default MapComponent;
// import React, { useEffect, useRef } from 'react';
// import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';

// mapboxgl.accessToken = 'pk.eyJ1IjoiY2FkZW5tYWNrZW56aWUiLCJhIjoiY2x1eXUwZGN2MDBxYjJpcjM0dmg0cDU0aCJ9.KB2ahNXpmjIpT8CC7Q2Ejg';

// const MapComponent = () => {
//     const mapContainerRef = useRef(null);
//     const mapRef = useRef(null);

//     useEffect(() => {
//         if (mapRef.current) return;

//         const newMap = new mapboxgl.Map({
//             container: mapContainerRef.current,
//             style: 'mapbox://styles/mapbox/streets-v11',
//             center: [-103.181102, 20.519758],
//             zoom: 13
//         });

//         newMap.on('load', () => {
//             console.log("Map loaded successfully");
//             fetchDirections(newMap);
//         });

//         mapRef.current = newMap;

//         return () => {
//             if (mapRef.current) {
//                 console.log("Removing map...");
//                 mapRef.current.remove();
//                 mapRef.current = null;
//             }
//         };
//     }, []);

//     const fetchDirections = async (map) => {
//         try {
//             const response = await fetch(`${window.location.origin}/directions`);
//             const data = await response.json();
//             if (data.location && data.location.routes) {
//                 const route = data.location.routes[0];
//                 const geojson = {
//                     type: 'Feature',
//                     properties: {},
//                     geometry: route.geometry
//                 };
    
//                 map.addSource('route', {
//                     type: 'geojson',
//                     data: geojson
//                 });
    
//                 map.addLayer({
//                     id: 'route',
//                     type: 'line',
//                     source: 'route',
//                     layout: {
//                         'line-join': 'round',
//                         'line-cap': 'round'
//                     },
//                     paint: {
//                         'line-color': '#4287f5',
//                         'line-width': 8
//                     }
//                 });
    
//                 console.log("Route added to the map");
    
//                 if (data.stops && data.stops.length > 0) {
//                     console.log("Adding markers...");
//                     console.log("Start Marker Coordinates:", data.stops[0].coordinates);
//                     console.log("End Marker Coordinates:", data.stops[data.stops.length - 1].coordinates);
                    
//                     // new mapboxgl.Marker({ color: 'green' })
//                     //     .setLngLat([data.stops[0].coordinates[0], data.stops[0].coordinates[1]])
//                     //     .addTo(map);
    
//                     // new mapboxgl.Marker({ color: 'red' })
//                     //     .setLngLat([data.stops[data.stops.length - 1].coordinates[0], data.stops[data.stops.length - 1].coordinates[1]])
//                     //     .addTo(map);
                    
//                     // data.stops.slice(1, -1).forEach(stop => {
//                     //     new mapboxgl.Marker()
//                     //         .setLngLat([stop.coordinates[0], stop.coordinates[1]])
//                     //         .addTo(map);
//                     // });
    
//                     // const bounds = new mapboxgl.LngLatBounds();
//                     // data.stops.forEach(stop => bounds.extend([stop.coordinates[0], stop.coordinates[1]]));
//                     // map.fitBounds(bounds, { padding: 20 });
    
//                     // console.log("Markers added to the map");
//                     // Inside fetchDirections function
//                     console.log("Adding markers...");

//                     if (data.stops[0].coordinates.toString() === data.stops[data.stops.length - 1].coordinates.toString()) {
//                         console.log("Start and end are the same. Adding a blue marker.");
//                         new mapboxgl.Marker({ color: 'blue' })
//                             .setLngLat([data.stops[0].coordinates[0], data.stops[0].coordinates[1]])
//                             .addTo(map);
//                     } else {
//                         console.log("Adding green marker for start, red for end.");
//                         new mapboxgl.Marker({ color: 'green' })
//                             .setLngLat([data.stops[0].coordinates[0], data.stops[0].coordinates[1]])
//                             .addTo(map);
//                         new mapboxgl.Marker({ color: 'red' })
//                             .setLngLat([data.stops[data.stops.length - 1].coordinates[0], data.stops[data.stops.length - 1].coordinates[1]])
//                             .addTo(map);
//                     }

//                     data.stops.slice(1, -1).forEach(stop => {
//                         new mapboxgl.Marker()
//                             .setLngLat([stop.coordinates[0], stop.coordinates[1]])
//                             .addTo(map);
//                     });

//                     console.log("Markers added to the map");

//                 } else {
//                     console.error("No stops data available");
//                 }
//             } else {
//                 console.error("No route data available");
//             }
//         } catch (error) {
//             console.error('Failed to fetch directions:', error);
//         }
//     };

//     return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
// };

// export default MapComponent;

// import React, { useEffect, useRef } from 'react';
// import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';

// mapboxgl.accessToken = 'pk.eyJ1IjoiY2FkZW5tYWNrZW56aWUiLCJhIjoiY2x1eXUwZGN2MDBxYjJpcjM0dmg0cDU0aCJ9.KB2ahNXpmjIpT8CC7Q2Ejg';

// const MapComponent = () => {
//     const mapContainerRef = useRef(null);
//     const mapRef = useRef(null);

//     useEffect(() => {
//         if (mapRef.current) return; // Ensures the map is initialized only once

//         const newMap = new mapboxgl.Map({
//             container: mapContainerRef.current,
//             style: 'mapbox://styles/mapbox/streets-v11',
//             center: [-103.181102, 20.519758],
//             zoom: 13
//         });

//         newMap.on('load', () => {
//             console.log("Map loaded successfully");
//             fetchDirections(newMap);
//         });

//         mapRef.current = newMap;

//         return () => {
//             if (mapRef.current) {
//                 console.log("Removing map...");
//                 mapRef.current.remove();
//                 mapRef.current = null;
//             }
//         };
//     }, []);

//     const fetchDirections = async (map) => {
//         try {
//             const response = await fetch(`${window.location.origin}/directions`);
//             const data = await response.json();
//             if (data.location && data.location.routes) {
//                 const route = data.location.routes[0];
//                 const geojson = {
//                     type: 'Feature',
//                     properties: {},
//                     geometry: route.geometry
//                 };

//                 map.addSource('route', {
//                     type: 'geojson',
//                     data: geojson
//                 });

//                 map.addLayer({
//                     id: 'route',
//                     type: 'line',
//                     source: 'route',
//                     layout: {
//                         'line-join': 'round',
//                         'line-cap': 'round'
//                     },
//                     paint: {
//                         'line-color': '#4287f5',
//                         'line-width': 8
//                     }
//                 });

//                 console.log("Route added to the map");

//                 data.stops.forEach((stop, index) => {
//                     const marker = new mapboxgl.Marker()
//                         .setLngLat([stop.coordinates[0], stop.coordinates[1]])
//                         .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(stop.address)) // add popups
//                         .addTo(map);
//                 });

//                 console.log("Markers added to the map");
//             } else {
//                 console.error("No route data available");
//             }
//         } catch (error) {
//             console.error('Failed to fetch directions:', error);
//         }
//     };

//     return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
// };

// export default MapComponent;
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2FkZW5tYWNrZW56aWUiLCJhIjoiY2x1eXUwZGN2MDBxYjJpcjM0dmg0cDU0aCJ9.KB2ahNXpmjIpT8CC7Q2Ejg';

const MapComponent = () => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current) return; // Ensures the map is initialized only once

        const newMap = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-103.181102, 20.519758],
            zoom: 13
        });

        newMap.on('load', () => {
            console.log("Map loaded successfully");
            fetchDirections(newMap);
        });

        mapRef.current = newMap;

        return () => {
            if (mapRef.current) {
                console.log("Removing map...");
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    const fetchDirections = async (map) => {
        try {
            const response = await fetch(`${window.location.origin}/directions`);
            const data = await response.json();
            if (data.location && data.location.routes) {
                const route = data.location.routes[0];
                const geojson = {
                    type: 'Feature',
                    properties: {},
                    geometry: route.geometry
                };

                map.addSource('route', {
                    type: 'geojson',
                    data: geojson
                });

                map.addLayer({
                    id: 'route',
                    type: 'line',
                    source: 'route',
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': '#4287f5',
                        'line-width': 8
                    }
                });

                console.log("Route added to the map");
                console.log("Stops:", data.stops);

                data.stops.forEach((stop, index) => {
                    const el = document.createElement('div');
                    el.className = 'marker';
                    el.style.width = '30px';
                    el.style.height = '30px';
                    el.style.background = 'blue';
                    el.style.color = 'white';
                    el.style.display = 'flex';
                    el.style.alignItems = 'center';
                    el.style.justifyContent = 'center';
                    el.style.borderRadius = '50%';
                    el.textContent = index + 1; // Stop number

                    const marker = new mapboxgl.Marker(el)
                        .setLngLat([stop.coordinates[0], stop.coordinates[1]])
                        .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(`Stop ${index + 1}: ${stop.address}`))
                        .addTo(map);
                });

                console.log("Markers added to the map");
            } else {
                console.error("No route data available");
            }
        } catch (error) {
            console.error('Failed to fetch directions:', error);
        }
    };

    return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
};

export default MapComponent;





