# Mobile Web Specialist Certification Course
---
#### _Three Stage Course Material Project - Restaurant Reviews_

## Project Overview: Stage 1


This is the Restaurant Reviews App project,
The starting app has been improved in order to be:

- Responsive to different sizes display
- More Accessible
- Offline working


### Main features

- Media queries
- Removed not working css reset file
- Add Figure elements for images with multiple srcset sources 
- Add Aria labels and roles 
- Fix foreground/background text color
- Improved table accessibility using <caption> and <th> elements
- Add alt attribute to images
- Fix page title on restaurant detail page
- Keyboard support to access restaurant detail page from map marker (with enter key)
- Add service worker and  static resources caching for offline use



### How to run?

1. In this folder, start up a simple HTTP server to serve up the site files on your local computer. Python has some simple tools to do this, and you don't even need to know Python. For most people, it's already installed on your computer. 

In a terminal, check the version of Python you have: `python -V`. If you have Python 2.x, spin up the server with `python -m SimpleHTTPServer 8000` (or some other port, if port 8000 is already in use.) For Python 3.x, you can use `python3 -m http.server 8000`. If you don't have Python installed, navigate to Python's [website](https://www.python.org/) to download and install the software.

2. With your server running, visit the site: `http://localhost:8000`, and look around for a bit to see what the current experience looks like.
3. Explore the provided code, and start making a plan to implement the required features in three areas: responsive design, accessibility and offline use.
4. Write code to implement the updates to get this site on its way to being a mobile-ready website.

Webp and small size images are created using gulp and saved on /dist/img/ , 
you do not need to install gulp to run the app.



