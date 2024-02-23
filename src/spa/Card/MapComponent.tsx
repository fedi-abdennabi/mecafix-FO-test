import React, { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Position {
  lat: number;
  lng: number;
}

interface MapComponentProps {
  onSelectPosition: (position: Position, address: string) => void;
  selectedAddress: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ onSelectPosition, selectedAddress }) => {
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [marker, setMarker] = useState<L.Marker | null>(null);

  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([36.8056, 10.1819], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);
    }

    const map = mapRef.current;

    const handleClick = async (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      setSelectedPosition({ lat, lng });

      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
      const data = await response.json();
      const address = data.display_name;

      onSelectPosition({ lat, lng }, address);

      if (marker) {
        map?.removeLayer(marker); // Remove existing marker
      }

      const newMarker = L.marker([lat, lng]).addTo(map).bindPopup(address).openPopup();
      setMarker(newMarker);
    };

    map?.on('click', handleClick);

    return () => {
      map?.off('click', handleClick);
    };
  }, [marker]); // Update useEffect dependency to re-run when marker changes

  return (
    <div id="map" style={{ height: '400px' }} />
  );
};

let DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default MapComponent;
