# CS-554 Lab 4

## React Pokedex

For this lab, you will create a very simple Pokedex Single Page Application using React based off the patterns we've been learning about in our Marvel Application (Links to an external site.)Links to an external site..

You will be creating a Single Page Application using React that implements the following routes using create-react-app (Links to an external site.)Links to an external site. and react router 4 (Links to an external site.)Links to an external site..

You will be using the Pokeapi (Links to an external site.)Links to an external site.. You will use the Pokemon, Berries, and Machine listings, as well as the Resource Lists (Links to an external site.)Links to an external site..

# Pages


## /

The root directory of your application will be a simple page explaining the purpose of your site (to talk about Pokemon, Berries, and Machines). You should also explain what each of these things are, as if this was a little tutorial in Pokemon. Think of this app as your first steps through Palette Town.

This page will have a <Link> to the Pokemon Listing (/pokemon/page/0), The Berry Listing (/berries/page/0), and the Machine Listing (/machines/page/0)

# /pokemon/page/:page

This route will render a paginated list of Pokemon. It will use the :page param to determine what page to request from the API. If you are on page 0, you will show a button to go to the next page. If you are on page 1+, you will show a next button and a previous button, that will take you to the previous page.

## /pokemon/:id

This route will show details about a single Pokemon. If the Pokemon does not exist, the SPA will redirect to a 404 page.

## /berries/page/:page

This route will render a paginated list of berries. It will use the :page param to determine what page to request from the API.

## /berries/:id

This route will show details about a single berry. If the berry does not exist, the SPA will redirect to a 404 page.

## /machines/page/:page

This route will render a paginated list of machines. It will use the :page param to determine what page to request from the API. You will also show some sort of pagination UI (see below).

## /machines/:id

This route will show details about a single machine. If the machine does not exist, the SPA will redirect to a 404 page.

Hint: you can use the ContactContainer to store a value on the state such as ShowingDetails, and in the render method of the ContactContainer you can check the state to show if you want to render a ContactOverview or a ContactDetails.

## Pagination
Pagination can be done using an external library from NPM, such as react-bootstrap's pagination (Links to an external site.)Links to an external site. or react-paginate (Links to an external site.)Links to an external site..

The minimum you must provide for a pagination UI:

If you are on page 0, you will show a button to go to the next page.
If you are on page 1+, you will show a next button and a previous button, that will take you to the previous page.

## HTML, Look, and Content

Besides the specified settings, as long as your HTML is valid and your page runs passes a tota11y (Links to an external site.)Links to an external site. test, the general look and feel is up to you. If you want to update it, you may; if you do not, that is fine.

I do, however, recommend using React-Bootstrap  (Links to an external site.)Links to an external site.to make your life easier if you need any UI elements.

## General Requirements

Remember to submit your package.json file but not your node_modules folder.
Remember to run HTML Validator and tota11y tests!
Remember to have fun with the content.
Remember to practice usage of async / await!
Previous Next
