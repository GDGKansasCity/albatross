# Albatross Project

## Description

This project is a boilerplate Progressive Web App (PWA) that utilizes the Google+ API & Meetup.com API, built using Yeoman,  AngularJS, Angular Material, and running on a Firebase backend.

It is themed for use by GDG Kansas City. Originally designed by [Kyle Paul](https://github.com/neojato).

## Setup
(NOTE: This implies that you've created a Firebase project & enabled Google auth)

1. Clone this repository.
2. Run `bower install` and `npm install` for loading/updating resources.
    * NOTE: You will have to install `connect-modrewrite` manually: `npm install connect-modrewrite --save`
3. Rename the **config.js.template** file in your app to **config.js**, update the keys with those from your Firebase project.
4. Update the canonical info for your GDG in the **index.html** file:

```
  <link rel="canonical" href="<WEBSITE_URL>" />
  <link rel="publisher" href="<YOUR_GOOGLE+_PROFILE" /> // use the ID not handle
  <meta itemprop="name" content="GDG <YOUR_CITY>">
  ...
  <meta itemprop="image" content="<WEBSITE_URL>/images/gdg-logo.png">
 ```
 
 5. Open the **app.js** file and set the `SITE_SETUP` variable to `true`
 6. Run `grunt serve` in a terminal
 7. When the `localhost` window opens, navigate to: http://localhost:9000/admin
 8. Fill in the fields on the `Config`, `Social`, and `Admins` tabs
     * Make sure to enter your Gmail address on the `Admins` tab!
 9. Open the **app.js** file and set the `SITE_SETUP` variable back to `false`

## How to use 

#### Running Locally

Run `grunt serve` for livereload viewing/editing.

#### Build

Run `grunt build` for building.

#### Deploy

Run `firebase deploy` for deploying to Firebase Hosting.
