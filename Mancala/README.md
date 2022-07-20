<!-- # LarissaPortillo.github.io -->
# Mancala Game / Mod 1 Project

This is my Mod1 project for the PerScholas Software Engineering course. 

Click [here][1] for the live site link to my game.

## Table of Contents
***
1. Project Description
2. Brief Example
3. List of Features
4. Technologies Used
5. Installation instructions 
6. Future Plans 

## Project Description
***
For the project, we had to create a game with the following requirements: 
* Two player game
* Win state
* Lose state
* A way to keep playing if the game is not over
* Multiple rounds to play 
  * A round must begin, end, and there must be a way to check if the game should continue or the overall game is won or lost 

Based on the project requirements, I decided to create an online mancala game that someone could play on their own against a computer. The game follows the traditional rules of mancala. The player and the computer would take turns making a move until the end of the game. The game would be over once one of the rows on the board is empty of beans. At the end of the game, the beans collected by each mancala would be tallied and the one with the highest number would be the winner. 

## Brief Example
***

insert the brief example here

## Approach Taken
***
### Aesthetic
My first focus when approaching the game was how it would look. Overall, my goal was to make the page look light and organized (at least with the dark mode off). Based on the layout of a typical mancala board, I decided to use CSS grid to format the different sections of the board. For the outline and look of the board, I wanted to maintain the general shape and wood textture that is common in wooden mancala sets. I searched online for wood patterns that I thought fit best as the background of the grid. For the moving pieces, I decided that I wanted the pieces to look like beans. When I was younger, my friend would practically lose all the glass stones that came with her mancala set so we had to substitute the missing pieces with beans. I was looking up bean icons online and I saw a coffee bean icon that I really liked. So, I tried to replicate something similar on Figma. I specifically used Figma, because it's free and I would be able to export the digital drawing as an svg. I also included a little tally section close to each hole or mancala so that the user could know right away how many beans were in each space of the board instead of trying to guess or count all the beans located in each space. 

### Coding the Game
I already know how to play mancala. So, I decided first to pseudo code all the possible outcomes of the game. 
![Pseudo Code for game](/LarissaPortillo.github.io/Mancala/PseudoCode.jpg)
After the pseudo code, I needed to figure out how I would store information about the locations and the beans on the board. I needed to prioritize order. Since order mattered for this code and we did extensive learning on arrays in the course, I decided I would base the board on an array. With those decisions down, I proceeded to code the project.

## Unsolved Problems
***
I was having a hard time figuring out how to properly use setTimeout in my code. I wish I could have gotten a good grasp of how it worked, so that every action could be timed properly. The poor timing of certain functions can be seen in parts of the game play. 
When the user wins the game, the whole page freezes. So, I believe there is an infinite while loop that happens at that point but I haven't had the chance to debug it.

## User Stories
***
* Use is able to start the game
* User can click any legal move on the board 
* User is able to view instructions of the game
* User is able to start a new game after they have finished playing
* User is able to turn dark mode setting on and off 

***
## Technologies Used
***
* HTML5
* CSS
* Javascript

## Installation
***
Click [here][2] to be redirected to the main github repo.

Fork and clone the repository
```
$ git clone https://github.com/yourusername/repositoryname
```
Go to the project directory
```
$ cd repositoryname/Mancala
```
Open html in your browser to see the project


## Future Plans
***
There are more features that I wanted to include in this game. Due to time, I was not able to add in all of the following features. 

#### Play options
* Playing against another person instead of just the computer
* Add easy, medium and hard level options if computer option is picked  
    * This prospect is exciting because it would be fun to try to create an algorithm where the computer could strategize during the game play. But, I do realize at the moment that I need more practice with algorithms in general to be able to navigate the best way to achieve this. 

#### Animation
* I would like to animate the movement of the beans on the board
    * This feature would allow the user to see more clearly what happens when their opponent makes a move or user themseleves makes a move

#### Interaction
* I would like to add more interaction in the game. 
    * For example: Being able to drag and drop stolen beans into their own mancala

#### Customization
* I would like to add color blind friendly palettes to the settings.


[1]:https://larissaportillo.github.io/Mancala/mancala.html "live site"
[2]:https://github.com/LarissaPortillo/LarissaPortillo.github.io.git "githuub repo"
