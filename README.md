# CS3398-Klingons-S2020
Texas State University cs3398 Software Engineering course project.

[![Netlify Status](https://api.netlify.com/api/v1/badges/01ec3479-dd15-4611-80c6-4daa7503be4e/deploy-status)](https://app.netlify.com/sites/klingons-triviaknights/deploys)

# Trivia Knights
[comment]: <> (Here goes your awesome project description!)
![icon](https://i.imgur.com/Z4GvIx6.png)

## Table of contents
* [General info](#general-info)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)

## Description
1. This project is maintained by Jackson, Aaron, Donevan, Trevor, and Sohail
2. We are creating a Trivia application in order to allow users to play against others or even on their own!
3. We want to provide this application for any and all users that will enjoy it
4. This project is a demonstration of the skills we have acquired and are honing during our college tenure.

## Screenshots
![Example screenshot](https://i.imgur.com/u207NhB.png)

## Technologies
* Python - 3.7.1
* React - 16.13.0
* Django REST framework - 3.11.0
* Django - 2.2.1
* Djoser - 2.0.3

## Setup
To run the backend follow these [instructions](https://github.com/CS3398-HOUNDS/CS3398-Klingons-S2020/tree/master/backend)

## Code Examples
Show examples of usage:
`put-your-code-here`

## Features
List of features ready and TODOs for future development
* Apply filters / searching / ordering to our API (Jackson) [artifact](https://github.com/CS3398-HOUNDS/CS3398-Klingons-S2020/commit/cf50547813c0abb25671dfd4b427838be49667e2) Deployed web browsable API [artifact](http://klingons.pythonanywhere.com/docs/#/)
* Permissions for authenticated and anonymous users (Aaron)  [artifact](https://github.com/CS3398-HOUNDS/CS3398-Klingons-S2020/commit/1cf92a729f9a7350ddb423abf7de641d5da90ad2) djoser framework uses authorization token allowing access to url endpoints in our REST API and rest framework allows us to add permissions to our viewsets 
* Splash page design (Sohail) [artifact](https://github.com/CS3398-HOUNDS/CS3398-Klingons-S2020/commit/a95cdf285ed762110f70a661eacd7a88a72c6256) features graphics and practical color/layout design considerations
* Game page in frontend (Donevan) [artifact](https://github.com/CS3398-HOUNDS/CS3398-Klingons-S2020/commit/e46295049d2e6ad65dfa42a5893bee549349c77c) react component that fetches json from a Trivia API
* Layout, style, and navigation (Trevor) [artifact](https://github.com/CS3398-HOUNDS/CS3398-Klingons-S2020/commit/15f72fba7d4296d8556c1f7de7d15e75bcfbbb3e) Polished, minimal, style for pages to facilitate user interface and experience.

To-do list:
* Personalized page
* Create Game Session
* Leaderboard

## Status
[comment]: <> (Project is: _in progress_, _finished_, _no longer continue_ and why?)
Trivia Knights is currently a work in progress and will remain in progress for the time being.
  * Donevan's Next Step: TriviaGame component will be able to handle multiple questions and provide a score to the player.
  * Aaron's Next Step: Convert database to MySQL in order to accept datatypes from our fixtures.- in progress -
  * Jackson's Next Step: Enable leaderboard API functionality and work on adding websockets for real time chat. - in progress -
  * Trevor's Next Step: Create User Page and Game components and render them with React.

## Contact
Created by Texas State University Students contact us at:
* Jackson Ayers: jwa58@txstate.edu
* Aaron Carrasco: adc129@txstate.edu
* Trevor Chaney: t_c296@txstate.edu
* Donevan Gonzales: dlg143@txstate.edu
* Sohail Selky: 158@txstate.edu
