# Google Maps Setup Guide

## 1. Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - **Maps JavaScript API**
   - **Places API**
4. Go to "Credentials" and create an API key
5. Restrict the API key to your domain for security

## 2. Set Up Environment Variables

Create a `.env.local` file in your project root and add:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

## 3. Features Implemented

- **Autocomplete Search**: Users can type and get location suggestions
- **Interactive Map**: Shows the selected location with a marker
- **Address Validation**: Ensures valid delivery addresses
- **Location Storage**: Saves coordinates and address in orders

## 4. Usage

The Google Maps component is now integrated into your checkout page. When users:

1. Type in the address field, they'll see autocomplete suggestions
2. Select a location, the map will update with a marker
3. Complete checkout, the location data is saved with the order

## 5. Security Notes

- The API key is prefixed with `NEXT_PUBLIC_` so it's visible in the browser
- Restrict the API key to your domain in Google Cloud Console
- Monitor usage in Google Cloud Console to avoid unexpected charges

## 6. Troubleshooting

- If the map doesn't load, check your API key and ensure the APIs are enabled
- If autocomplete doesn't work, verify the Places API is enabled
- Check browser console for any JavaScript errors
