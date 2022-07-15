let startBtn=document.querySelector('.start');
let inst=document.querySelector('.instructions');
let infoBtn=document.querySelector('#info');
let info=document.querySelector('#mancalaInfo');
let infoExt=document.querySelector('.x')
console.log(infoBtn)
//if info button is clicked then the instrunctions will pop up 
infoBtn.addEventListener('click',function(e){
    info.classList.add('active');
})

infoExt.addEventListener('click', function(e){
    info.classList.remove('active');
} )

//set the board, 4 stones in each socket except mancala which are index 6 and 13
let board=[4,4,0,4,4,4,0,4,4,4,4,4,4,0];

// function to update board stats
const setStats=(array)=>{
    for(i=0;i<array.length;i++){
        let statBox=document.querySelector(`.stat${i}`);
        console.log(statBox);
        statBox.textContent=array[i];
    }
}

//find index where stone lands
const findPosition=(selection, stones, player)=>{ 
    let x;
    if(stones%13==0){
        return selection;
    }
    else{
      if(player==1){ //player one
        if(selection+stones>12){
          x=stones-(12-selection);
          if(x>13){
            if(x%13==0){
              return 12;
            }
            else{
               return (x%13)-1;
            }
          }
          else{
            return x-1;
          }
        }
        else{
          return selection+stones;
        }
      }
      else{ //player 2
        if(selection+stones>13){
            x=stones-(13-selection);
            if(x>13){
              if( x%13==0){
                return 13;
              }
              else{
                if(7<=(x%13) && (x%13)<=13){
                  return (x%13);
                }
                else{
                  return (x%13)-1;
                }
              }
            }
            else{
              if( 7 <= x && x <= 13){
                return x;
              }
              else{
                return x-1;
              }
            }
        }
        else{
          return stones+selection;
        }
      }
    }
  }

//function to distribute stones on the board
const distributeStns=(selection,stones,player)=>{
    let skip;
    if(player==1){
        skip=13;
    }
    else{
        skip=6;
    }
    board[selection]=0;
    for(i=1;i<=stones;i++){
        if(i!=skip){ //skip opponent mandala
            let pos=findPosition(selection,i,player); 
            board[pos]+=1;
        }
    }
}

//function to steal oponents stones
const stealStones=(indx,player)=>{
    if(player==1){
        board[6]+=board[12-indx]+1;
        board[indx]=0;
        board[12-indx]=0;
    }
    else{
        board[13]+=board[12-indx]+1;
        board[indx]=0;
        board[12-indx]=0;
    }  
}

//function to check for empty sides
const emptySide=(start,end)=>{
    let empt=true;
    for(i=start;i<=end;i++){
        if(board[i]>0){
            empt==false;
        }
    }
    return empt;
}

//distribute last stones at end of Game
const endCollection=()=>{
    count=0;
    if(emptySide(0,5)){//if player side is empty
        for(i=7;i<=12;i++){
            count+=board[i];
        }
        board[13]+=count;
    }
    else{//oponent side is empty
        for(i=0;i<=5;i++){
            count+=board[i];
        }
        board[6]+=count;
    }
}

//tally score at end of game and proclaim winner
const endTally=()=>{
    if(board[6]>board[13]){
        console.log('You win!');
    }
    else if(board[13]>board[6]){
        console.log('You lose. Computer Wins!');
    }
    else{
        console.log(`Tie!`);
    }
}


//function that picks a random number from a given range, bounds are included
let rnd=(min,max)=> Math.floor(Math.random()*((max+1)-min)+min)


//set the board
setStats(board);


const click=(e)=>{
    //console.log (e.path[0].getAttribute('value'));
    let p1=e.path[0].getAttribute('value');
    if(board[p1]==0){
        inst.textContent=`That's socket. Please choose a socket with beans.`;
    }
    else{
        distributeStns
    }
}

let eventFunct=click.bind()


//add the event listeners to the sockets
const socketListener=()=>{
    for(i=0;i<=5;i++){
        let socket=document.querySelector(`.socket${i}`);
        socket.addEventListener('click', eventFunct);
    }
}

socketListener()

const removeSocketListener=()=>{
    for(i=0;i<=5;i++){
        let socket=document.querySelector(`.socket${i}`);
        
        socket.removeEventListener('click',eventFunct);
    }
}
socketListener()

let computerSelection=rnd(7,12);


const start=(e)=>{
    let side1=emptySide(0,5);
    let side2=emptySide(7,12);
    while(side1!=true && side2!=true){ //game will go on until one side is empty
        console.log('Choose a socket with beans')
        socketListener()
    }
    //exit out the while loop so game is done
    endCollection();
    endTally()

}

//game starts when player clicks button
startBtn.addEventListener('click',start)