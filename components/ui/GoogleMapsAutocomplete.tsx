"use client";

import { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

interface GoogleMapsAutocompleteProps {
  onLocationSelect: (location: {
    lat: number;
    lng: number;
    address: string;
  }) => void;
  placeholder?: string;
  className?: string;
  mapHeight?: string;
  hasError?: boolean;
  errorMessage?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const GoogleMapsAutocomplete = ({
  onLocationSelect,
  placeholder = "Please select your location",
  className = "",
  mapHeight = "300px",
  hasError = false,
  errorMessage = "",
  value = "",
  onChange,
}: GoogleMapsAutocompleteProps) => {
  const [address, setAddress] = useState(value);
  const [location, setLocation] = useState({ lat: 5.6037, lng: -0.187 }); // Default: Accra
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const autocompleteRef = useRef<any>(null);

  // Update address when value prop changes
  useEffect(() => {
    setAddress(value);
  }, [value]);

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();

      if (place.geometry && place.geometry.location) {
        const newLocation = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };

        setLocation(newLocation);
        const formattedAddress = place.formatted_address;
        setAddress(formattedAddress);

        // Call onChange if provided
        if (onChange) {
          onChange(formattedAddress);
        }

        onLocationSelect({
          ...newLocation,
          address: formattedAddress,
        });
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setAddress(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  // Sync addressRef whenever address state changes
  useEffect(() => {
    if (onChange) {
      onChange(address);
    }
  }, [address, onChange]);

  const mapContainerStyle = {
    width: "100%",
    height: mapHeight,
  };

  const center = {
    lat: location.lat,
    lng: location.lng,
  };

  return (
    <div className={className}>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
        libraries={["places"]}
        onLoad={() => setIsMapLoaded(true)}
      >
        <div className="mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <Autocomplete
              onLoad={(autocomplete) => {
                autocompleteRef.current = autocomplete;
              }}
              onPlaceChanged={handlePlaceChanged}
            >
              <Input
                type="text"
                placeholder={placeholder}
                value={address}
                onChange={handleInputChange}
                className={`pl-10 ${hasError ? "border-red-500" : ""}`}
                required
              />
            </Autocomplete>
          </div>
          {hasError && errorMessage && (
            <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
          )}
        </div>

        {isMapLoaded && (
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={mapContainerStyle}
            options={{
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            <Marker position={center} />
          </GoogleMap>
        )}
      </LoadScript>
    </div>
  );
};

export default GoogleMapsAutocomplete;
