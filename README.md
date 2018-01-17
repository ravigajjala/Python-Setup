# Bonnie

## Requirements

#### Node Version
* Both the CLI and generated project have dependencies that require Node 8.9.4 , together with NPM 5.6.0.

#### Angular Cli
* Using Angular cli version 1.3.0

####Node libraries.
* Angular@4.4.6
* Typescript@2.6.2

## Project setup
* Clone Bonnie repo from [Github](https://github.smg-apps.com/BT-Developers/Bonnie/tree/develop).
* Open this folder from terminal and run `npm install`.

##Setting up Google App Engine Locally

Download & Install GoogleAppEngine from https://cloud.google.com/appengine/docs/standard/python/download

* GoTo File>AddExistingApplication & browse the project.

* Click on "Add" Button.

* Now we can see the project successfully added to the GoogleAppEngine Launcher

## Running on the server

Run `ng build` for a dev server. Navigate to "GoogleAppEngineLauncher" & click on Browse.The app will be automatically opens in the browser.
  
## Deploying on Google App Engine Cloud.

* Open the Project Terminal

* Run the deploy command `gcloud app deploy --project <your_project_id>`
  

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.
