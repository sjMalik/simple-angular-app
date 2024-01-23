## Welcome to the Angular Web Application from Scratch

![](./How%20to%20Create%20a%20Complex%20Form%20in%20Angular.jpeg)

**Install Node**

- [Installation Link](C:\Users\Surajit\OneDrive\Documents\Projects\simple-angular-app\README.md)

**Check the Node & NPM Version**
```js
node -v
npm --version
```

**Install Angular CLI globally**
```js
npm install -g @angular/cli@16
```

**Check Angular version**
```js
ng version
```

**Create a new Angular project**
```js
ng new
```

**Launch the app in your default browser**
```js
ng serve --open
```

**Project Structure**
```js
/my-demo
|
|-- e2e                            // Directory for end-to-end tests
|   |-- src                        // Source files for end-to-end tests
|   |-- tsconfig.json              // TypeScript configuration for e2e tests
|
|-- node_modules                   // Contains project dependencies installed via npm
|
|-- src                            // Main directory for your application source code
|   |
|   |-- app                        // The heart of your Angular application
|   |   |-- components             // Folder for Angular components
|   |   |-- services               // Folder for Angular services
|   |   |-- models                 // Folder for data models/interfaces
|   |   |-- modules                // Folder for Angular modules
|   |   |-- app-routing.module.ts  // Angular routing module
|   |   |-- app.component.html    // Root component's HTML template
|   |   |-- app.component.ts      // Root component's TypeScript code
|   |   |-- app.component.scss    // Root component's styles
|   |   |-- app.module.ts         // Root module file
|   |
|   |-- assets                     // Static files like images, fonts, etc.
|   |
|   |-- environments               // Configuration files for different environments
|   |   |-- environment.prod.ts    // Production environment settings
|   |   |-- environment.ts         // Default development environment settings
|   |
|   |-- styles.(css|scss|sass|less) // Global styles for the application
|   |
|   |-- index.html                 // HTML entry point for the application
|   |-- main.ts                    // TypeScript entry point
|   |-- polyfills.ts               // Polyfills to support various browsers
|   |-- styles.scss                // Main styles file for the application
|
|-- angular.json                  // Angular workspace configuration file
|-- package.json                  // Contains project dependencies and scripts
|-- tsconfig.json                 // TypeScript configuration for the project
|-- tslint.json                   // Configuration for TSLint code analysis
|-- README.md                     // Information about the project
|-- .editorconfig                 // Configuration for consistent coding styles
|-- .gitignore                    // Specifies files for Git to ignore
```

**Add Login Component**
```js
ng generate component components/login
```

**Add Auth Service**
```js
ng generate service services/auth
```

**Material Design for Todo List**
*https://freefrontend.com/bootstrap-to-do-lists/*
https://mdbootstrap.com/docs/standard/extended/to-do-list/

**Add Font Awesome icons to an Angular project**
1. Install Font Awesome
```
npm install --save @fortawesome/fontawesome-free
```

2. Import the Styles in Angular CLI
```
@import "~@fortawesome/fontawesome-free/css/all.css";
```