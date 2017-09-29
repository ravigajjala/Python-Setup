# Python-Setup 

## Requirements

#### Node Version
* Both the CLI and generated project have dependencies that require Node 6.9.0 or higher, together with NPM 3 or higher.

#### Angular Cli
* Using Angular cli version 1.3.0

#### Global node libraries.
* Angular@4.2.4
* Typescript@2.3.3

## Project setup
* Clone Bonnie repo from [Github](https://github.smg-apps.com/BT-Developers/Bonnie/tree/develop).
* Open this folder from terminal and run `npm install`.

## Running on the server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Building for Deployment
 
  * Run `ng build -prod -aot` for a production build with AOT enabled.
  
  The above command will generate a build in dist folder in the root directory of the project.
  
 ## Deploying on Google App Engine
 
  * Install the `gcloud` cli using the steps mentioned on below link:
  	
    [App Engine SDK Setup](https://cloud.google.com/appengine/docs/standard/python/download)
    
  * Add/copy the `app.yaml` file to your build output (`dist`) directory
  
  * cd into dist folder: `cd dist`

  * Run the deploy command `gcloud app deploy app.yaml --project <your_project_id>`
  

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.
 
