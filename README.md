## How to run project locally
1. git clone git@github.com:parkerproject/videoClipsApp.git
2. cd videoClipsApp && npm install
3. npm start

## How to use player as a standalone in another page
1. npm run build
2. Include the css file from the build folder ```html <link href=/build/static/css/{main_css_file}.js /> ```
3. set a global video url ```javascript <script>window.VIDEO_URL = {video_url}</script> ```
4. Include the js file from the build folder ```javascript <script src=/build/static/js/{main_js_file}.js></script> ```
