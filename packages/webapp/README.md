# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.


# Guidelines for collaborators

## Directory Structure
```
└── /src 
  ├── /assets 
  ├── /components 
  ├── /views 
  ├── /services 
  ├── /utils 
  ├── /hooks 
  ├── /store 
  └── App.js 
  ├── index.js 
  ├── index.css
```
* Assets folder contains all of the project's static files, such as your logo, fonts, images, and favicons. 
* Components folder contains a bit collection of UI codes such as buttons, forms, avatars, and so on. 
* Pages folder contains all your React application's web pages. 
* Services folder contains code that allows you to interact with external API resources. 
* The utils folder contains reusable function snippets for performing quick tasks like text truncation or down casing. 
* Hooks folder contains codes and logic that can be reused across multiple components. 
* The store folder houses your state management files, such as Redux, which are used to make certain functions and variables available throughout your application. 
* The main component of your React application is the App.js file. This file connects all components and views. 
* Index.js file is the React application's entry point. It is responsible for bootstrapping the React library and mounting it on the root element. 
* index.css is the main and global CSS file for our application. Any writing style to this file will apply throughout the project.  

## Create Custom Hooks 
To reduce duplications and complexities from your codebase, writing a custom hook that toggles the password's visibility is the right approach. Here's an example of a custom hook:  

Create a hook as described in the code snippet below: 

```
└── /src 
  ├── /hooks 
      ├──useUser.js 
```

##  Separate business logic from UI 
To improve the quality of your codes and make maintenance a lot easier, it is highly recommended that you separate logic from the UI components. The user interface structure of each page should be stored in the /pages  directory as React components and all logics should be in custom hooks and services.

## Best Practices 
The following are some general guidelines for creating a scalable and optimized React application: 

1. Avoid using an excessive number of nested files and directories, and don't overthink on the application structure. 

2. Don't move files around; you can't afford to change file locations when a team of developers is working on the same project. 

3. Follow proper naming  conventions

4. Separate your features into separate reducers, with each one exporting its action creators and selectors, so that teams can work on them more effectively. 

5. Use Redux-saga in your project to manage a large amount of asynchronous code and side effects. 

