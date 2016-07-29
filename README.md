# Step-by-step example of simple JS backend and frontend with explanations
To properly view [Markdown](https://en.wikipedia.org/wiki/Markdown) documents (`*.md`, like this one) in the VSCode you should press `CTRL + SHIFT + V`.

This manual consists of several sections. Each section is stored in a separate folder in its final state along with detailed manual describing how it was done in `readme.md`.

Every next section is based on the results of the previous section.

Contents are:

1. Simple frontend and backend
    - HTML and Stylesheet
    - Express HTTP service
    - NPM package's entry point and dependencies
    - Run and debug Node.JS service in the VSCode
2. Unit tests with Mocha and Chai
    - Creating a Node.JS module
    - Using our Node.JS module
    - Unit testing by Mocha and Chai
    - Debug Mocha tests in the VSCode
3. Browserify modules
    - Create a frontend code
    - Build the frontend code with Browserify and Watchify
    - Debug the frontend code in the browser
4. Dynamic pages and Socket.IO
    - Dynamic page
    - Communication between the frontend and the backend

## Initial setup
Perform these steps to make initial setup of your work environment:
 1. Install the [VSCode](https://code.visualstudio.com)
 2. Install the [Node.js](https://nodejs.org), it comes with the [NPM](https://docs.npmjs.com/) package manager
 3. Open section's folder in the VSCode

## Run code in folders
If you simply want to run the existing code do the following after the initial setup:
 1. Open section's folder in the VSCode
 2. Open _View -> Integrated Terminal_ and run `npm install` command to install all required dependencies
 3. Open _View -> Debug_, choose `Launch` in combobox and press `F5` to run backend service
 4. Open [http://localhost:5000/](http://localhost:5000/) page to see client side (also dynamic page [http://localhost:5000/about](http://localhost:5000/about) is available in section 4)