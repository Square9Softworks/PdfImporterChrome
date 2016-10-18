#  Square9API Pdf Importing Chrome Extension

A chrome extension that can make it easy to import .pdf files from the browser into GlobalSearch. 

Developed to serve as a tutorial and functional example of building an integration with Square9API. Seen and completed at Encompass 2016.


## Startup
* Open js/background.js and edit any 'url' section with your Square9API url if necessary. See the example below of what an $.ajax calls look like and the 'url' property to change:

```javascript
    //Step 1: Get a license token for our API calls.
    $.ajax({
      type: "GET",
      url: 'http://localhost/square9api/api/licenses',
      async: false,
      timeout: 5000,
      headers: {"Authorization":"basic " + EncodedCredentials},
```
* In chrome enable 'Developer Mode' and then click 'Load unpacked extension..' 
* Navigate to the extension's folder and open it into chrome.
* Click the 'Options' link below the loaded extension and fill out your auth credentials, database, and archive.

## Usage
You'll see in the browser action icons list in the top left a greyed out Square 9 logo. This logo will only light up and be clickable when the current tab has a URL ending in .pdf.

If it's lit up, clicking the button will import the current URL's pdf into the targeted archive set in the options. Field data can be modified in code.

Any errors currently output to the chrome developer console (press F12).


### Special Thanks:

The Encompass 2016 participants who sat through my "Using the GlobalSearch API for ECM Integration" session. Here are the tools we used: 
* Chrome and chrome developer console
* SublimeText3 with SublimeLinter and JSHint packages installed
* Postman

File an issue with any difficulties/enhancements.

License: MIT License