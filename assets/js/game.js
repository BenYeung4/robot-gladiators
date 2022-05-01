// fight function (now with parameter for enemy's name)
var fight = function(enemy) {
    //sets it that player and enemy health is more than 0, the if else situation
  while (playerInfo.health > 0 && enemy.health > 0) {
    // ask player if they'd like to fight or run
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === 'skip' || promptFight === 'SKIP') {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerInfo + ' has decided to skip this fight. Goodbye!');
        // subtract money from playerInfo.money for skipping, formula all the way at the bottom
        playerInfo.money = Math.max(playerInfo.money - 10);
        console.log("playerInfo.money", playerInfo.money)
        break;
      }
    }
      //generate random damage value based on player's attack power
      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
      
    // remove enemy's health by subtracting the amount set in the playerInfo.attack variable, we ensure that it will stop at 0.  formula is all the way at the bottom
    enemy.health = Math.max(0,enemy.health - damage);
    console.log(
      playerInfo + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
    );

    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + ' has died!');

      // award player money for winning
      playerInfo.money = playerInfo.money + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
    }
    //random damage from enemy attack
    var damage = randomNumber(enemy.attack -3, enemy.attack);

    // remove players's health by subtracting the amount set in the enemy.attack variable, gives a random damage, formula all the way at the bottom
    playerInfo.health = Math.max(0,playerInfo.health - damage);
    console.log(
      enemy.name + ' attacked ' + playerInfo + '. ' + playerInfo + ' now has ' + playerInfo.health + ' health remaining.'
    );

    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo + ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerInfo + ' still has ' + playerInfo.health + ' health left.');
    }
  }
};

// function to start a new game
var startGame = function() {
  // reset player stats, brings us down to the playerInfo and retrieves that data. so no need to rewrite all
 playerInfo.reset();


  // fight each enemy robot by looping over them and fighting them one at a time
  for (var i = 0; i < enemyInfo.length; i++) {
    // if player is still alive, keep fighting
    if (playerInfo.health > 0) {
      // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

      // pick new enemy to fight based on the index of the enemyNames array
      var pickedEnemyObj = enemyInfo[i];

      // reset enemy.health before starting new fight.  inside the () is health of 0-20 but that additional 40 makes it that at least health will be min 40 and max of 60
      pickedEnemyObj.health = randomNumber(40,60);

      // pass the picked enemy.name variable's value into the fight function, where it will assume the value of the enemy.name parameter
      fight(pickedEnemyObj);

      // if player is still alive and we're not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        // ask if player wants to use the store before next round
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
      
        // if yes, take them to the store() function
        if (storeConfirm) {
          shop();
        }
      }
    }
    // if player is not alive, break out of the loop and let endGame function run
    else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }
  }

  // after loop ends, we are either out of playerInfo.health or enemies to fight, so run the endGame function
  endGame();
};

// function to end the entire game
var endGame = function() {
  window.alert("The game has now ended. Let's see how you did!");

  // if player is still alive, player wins!
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + '.');
  } else {
    window.alert("You've lost your robot in battle!");
  }

  // ask player if they'd like to play again
  var playAgainConfirm = window.confirm('Would you like to play again?');

  if (playAgainConfirm) {
    startGame();
  } else {
    window.alert('Thank you for playing Robot Gladiators! Come back soon!');
  }
};

// go to shop between battles function
var shop = function() {
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    'Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one "REFILL", "UPGRADE", or "LEAVE" to make a choice.'
  );

  // use switch case to carry out action
  switch (shopOptionPrompt) {
    case 'REFILL':
    case 'refill':
        playerInfo.refillHealth();
        break;
    case 'UPGRADE':
    case 'upgrade':
     playerInfo.upgradeAttack();
     break;
  }
};

//sets that random health or value within a range, helps with the math
var randomNumber = function(min,max){
  var value = Math.floor(Math.random() *(max-min +1) + min);
  return value;
};

//placed at the bottom, so the calculation with random health/range can be used above for the var enemyinfo, so it can all generate.
var playerInfo = {
  name: window.prompt("What is your robot's name?"),
  health: 100,
  attack: 10,
  money: 10,

  reset: function(){  //so no need to rewrite it during the reset health, now everything can be pulled down from this.
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  }, //comma!!!
  refillHealth: function (){
    if (this.money >=7){
      window.alert("Refilling player's health by 20 for 7 dollars.");
    this.health += 20;  //meaning this.health = this.health + 20
    this.money-= 7;  //meaning this.money = this.money - 7
    }
    else{
      window.alert("You don't have enough money!");
    }
  }, //comma!!!
  upgradeAttack: function(){
    if(this.money>=7){
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
    
    this.attack +=6;
    this.money -=7;
    }
  }
};

var enemyInfo = [
  {name: "Roborto", 
  attack: randomNumber(10,14)
  },
  {
    name:"Amy Android",
    attack: randomNumber(10,14)
  },
  {
    name:"Robo Trumble",
    attack: randomNumber(10,14)
  }
];

// start first game when page loads
startGame();






// // check to see if the value fo the playerInfo.health veriable is greater than 0
// if (playerInfo.health > 0) {
//     console.log("Your player is still alive!");
// }
// //Subtract the value of 'playerInfo.attack' from the value of `enemy.health` and use that result to update the value in the `enemy.health` variable
// enemy.health  = enemy.health - playerInfo.attack;

// // Log a resulting message to the console so we know that it worked.
// console.log(
//     playerInfo +" attacked " + eneenemy.namemyName + "." + enemy.name +" now has " + enemy.health + " health remaining." 
// );

// //check enemy's health
// if (enemy.health <= 0){
//     window.alert(enemy.name + " has died!");
// }
// else {
// window.alert(enemy.name + " still has " + enemy.health + " health left.")
// }

// // Subtract the value of `enemy.attack` from the value of `playerInfo.health` and use that result to update the value in the `playerInfo.health` variable.
// playerInfo.health = playerInfo.health - enemy.attack;


// // Log a resulting message to the console so we know that it worked.
// console.log(
// enemy.name + " attacked " + playerInfo + ". " + playerInfo + " now has " + playerInfo + " health remaining."
// );

// // check player's health
// if (playerInfo.health <= 0){
//     window.alert(playerInfo + " has died!");
// }
// else{
//     window.alert(playerInfo + " still has " + playerInfo.health + " health left.");
// }




// // //execute function
// // fight();

// // //stores the playerInfo input
// // console.log(playerInfo);

// // console.log("This logs a string, good for leaving yourself a message");
// // //this will do math and log 20
// // console.log(10+10);
// // //What is this?
// // console.log("Our robot's name is " + playerInfo);

// // //Note the lack of quotation marks around playerInfo
// // window.alert(playerInfo);

// // //this creates a function named "fight"

// // function fight(){
// // window.alert("The fight has begun!");
// // }


