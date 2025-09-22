# BIM Import Chrome Extension

A Chrome extension that adds an "Import to BIM" button to BuildingSmart bSDD (buildingSMART Data Dictionary) pages, allowing users to easily import dictionary data into their BIM applications.

## Features

- Automatically detects bSDD dictionary pages
- Adds a styled "Import to BIM" button to the page interface
- Extracts dictionary metadata (name, identifier, version, etc.)
- Configurable API endpoint through extension popup
- Visual feedback for import status (loading, success, error)
- Notifications for user feedback

## Installation

1. Download or clone this extension
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The extension icon should appear in your toolbar

## Configuration

1. Click the extension icon in your Chrome toolbar
2. Enter your BIM API endpoint URL
3. Optionally add an API key for authentication
4. Click "Save Settings"

## Usage

1. Navigate to any bSDD dictionary page (e.g., `https://search.bsdd.buildingsmart.org/uri/...`)
2. The "Import to BIM" button will automatically appear
3. Click the button to import the current dictionary data
4. Watch for visual feedback and notifications

## API Integration

The extension sends a POST request to your configured endpoint with the following payload:

\`\`\`json
{
"source": "bsdd",
"url": "https://search.bsdd.buildingsmart.org/uri/...",
"data": {
"name": "Dictionary Name",
"identifier": "https://identifier.buildingsmart.org/uri/...",
"dictionaryCode": "code",
"version": "1.0",
"organization": "Organization Name"
},
"timestamp": "2024-01-01T00:00:00.000Z"
}
\`\`\`

## Development

To modify the extension:

1. Edit the relevant files
2. Go to `chrome://extensions/`
3. Click the refresh icon on your extension
4. Test your changes

## Files Structure

- `manifest.json` - Extension configuration
- `content.js` - Main script that injects the button
- `styles.css` - Styling for the button and notifications
- `popup.html` - Settings interface
- `popup.js` - Settings functionality
- `README.md` - This documentation
