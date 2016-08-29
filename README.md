## How to run project locally
1. git clone git@github.com:parkerproject/videoClipsApp.git
2. cd videoClipsApp && npm install
3. npm start

## How to use player as a standalone in another page
1. npm run build
2. Include  ```<link href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css" /> ```
3. Include  ``` <link href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css" rel="stylesheet" type="text/css" />```
4. Include the css file from the build folder ```<link href=/build/static/css/{main_css_file}.js /> ```
5. set a global video url ```<script>window.VIDEO_URL = {video_url}</script> ```
6. Include the js file from the build folder ```<script src=/build/static/js/{main_js_file}.js></script> ```
7. then wrap where you want the video with ```<div id="root"></div>```
