# Sssffrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.

Note! There is one vulnerability, that should be fixed, it this would be in proper use. More security
features must also be added.

This is peared with keeping_track_of_ideas backend.

BackendConnector connects this to node.js express server. There is pages for login, register, view public ideas and
view ideas of current user. In public ideas view there is possibility to click tag, so that only ideas tagged with
that tag is shown. There is differences what is shown in public and in own ideas. Only in public view comments and likes
can be added and only from view of own ideas visibility of ideas can be changed and ideas can be edited and removed.

localStorage is used to store token from the backend and also some other information. Tokens are removed, when user
logs out.
