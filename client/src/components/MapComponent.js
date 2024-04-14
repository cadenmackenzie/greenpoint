import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2FkZW5tYWNrZW56aWUiLCJhIjoiY2x1eXUwZGN2MDBxYjJpcjM0dmg0cDU0aCJ9.KB2ahNXpmjIpT8CC7Q2Ejg';

const MapComponent = () => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);

    useEffect(() => {
        const newMap = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-103.3473, 20.6752], // Default center
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
            const response = await fetch(`${window.location.origin}/directions?city=Juanacatlan`);
            const data = await response.json();
            if (data.location && data.location.routes) {
                const route = data.location.routes[0];
                const geojson = {
                    type: 'Feature',
                    properties: {},
                    geometry: route.geometry
                };

                // Set the center of the map to the first coordinate of the first stop
                if (data.stops.length > 0) {
                    map.flyTo({center: data.stops[0].coordinates, zoom: 13});
                }

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

