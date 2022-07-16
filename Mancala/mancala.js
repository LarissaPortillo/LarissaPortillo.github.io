let startBtn=document.querySelector('.start');
let inst=document.querySelector('.instructions');
let infoBtn=document.querySelector('#info');
let info=document.querySelector('#mancalaInfo');
let infoExt=document.querySelector('.x')
let hover=document.querySelectorAll('.s1')
let turn=1;
let proceed=true;


//function that picks a random number from a given range, bounds are included
let rnd=(min,max)=> Math.floor(Math.random()*((max+1)-min)+min)

let s=document.querySelector('.mancala13');
const clone=()=>{
    
    let dimen=s.getBoundingClientRect();
    console.log(dimen, dimen.height,dimen.width)
    
    for(i=0;i<8;i++){
      
    let bean1=document.querySelector('.bean1');
    let bean2=document.querySelector('.bean2');
    let Newbean1=bean1.cloneNode(true);
    let Newbean2=bean2.cloneNode(true);
    var posX = rnd(7,55);
    var posY = Math.floor(Math.random() * (60));
    console.log(posX,posY)
    if(i%2==0){
        Newbean1.style.top=posX+'%'
        Newbean1.style.left=posY+'%'
        s.appendChild(Newbean1)
        Newbean1.style.display='block'
    }
    else{  
        Newbean2.style.left=posY+'%'
        Newbean2.style.top=posX+'%'
        s.appendChild(Newbean2)
        Newbean2.style.display='block'
    }
    }
    
}

clone();
//s.innerHTML='' deletes everything in div

console.log(infoBtn)
//if info button is clicked then the instrunctions will pop up 
infoBtn.addEventListener('click',function(e){
    info.classList.add('active');
})

infoExt.addEventListener('click', function(e){
    info.classList.remove('active');
} )

//set the board, 4 stones in each socket except mancala which are index 6 and 13
let board=[4,4,4,4,4,4,0,4,4,4,4,4,4,0];

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
    selection=parseInt(selection);
    stones=parseInt(stones)
    let y=selection+stones;
    let x;
    if(stones%13===0){
        return selection;
    }
    else{
      if(player===1){ //player one
        if(y>12){
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
          return y;
        }
      }
      else{ //player 2
        if(y>13){
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
          return y;
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
    for(i=1;i<=stones;i++){//2 stones
        let pos=findPosition(selection,i,player); 
        if(pos!=skip){ //skip opponent mandala
            board[pos]+=1;
        }
    }
    setStats(board);
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
    setStats(board);
}

//function to check for empty sides
const isSideEmpty=(start,end)=>{
    let empt=true;
    for(i=start;i<=end;i++){
        if(board[i]>0){
            empt=false;
        }
    }
    return empt;
}

const isEmpty=()=>{
    if(isSideEmpty(0,5)===true || isSideEmpty(7,12)===true){
        proceed=false;
    }
}

//distribute last stones at end of Game
const endCollection=()=>{
    count=0;
    if(isSideEmpty(0,5)){//if player side is empty
        for(i=7;i<=12;i++){
            count+=board[i];
            board[i]=0;
        }
        board[13]+=count;
    }
    else{//oponent side is empty
        for(i=0;i<=5;i++){
            count+=board[i];
            board[i]=0;
        }
        board[6]+=count;
    }
    setStats(board);
}

//tally score at end of game and proclaim winner
const endTally=()=>{
    console.log('endTally')
    if(board[6]>board[13]){
        inst.textContent='You Win';
        console.log('You win!');
    }
    else if(board[13]>board[6]){
        inst.textContent='You lose. Computer Wins!';
        console.log('You lose. Computer Wins!');
    }
    else{
        console.log(`Tie!`);
    }
}



//set the board
setStats(board);

// const click=(e)=>{
//     let path=e.composedPath(0);
//     let p1=path[0].getAttribute('value');
//     let stns=board[p1];
//     let pos;
//     let pos2;
//     let player2;
//     while (proceed===true){//no side is empty 
//         path=e.composedPath(0);
//         p1=path[0].getAttribute('value');
//         stns=board[p1];
//         console.log('inside while')
//         if(isEmptySide(0,5)===true || isEmptySide(7,12)===true){
//             proceed=false;
//             console.log('inside if1')
//         }
//         else{
//             console.log('inside else1')
//             if (turn===1){//player one is playing
//                 while(turn==1){
//                     console.log('inside if1 turn1')
//                 if(board[p1]==0){//empty socket
//                     inst.textContent=`That's socket. Please choose a socket with beans.`;
//                     console.log(' if2 empty socket')
//                     t
//                 }
//                 else{
//                     //distribute stone
//                     console.log('else2 stone distrib')
//                     distributeStns(p1,stns,1);
//                     pos=findPosition(p1,stns,1)
//                     setStats(board);
//                     //analyze where last stone lands
//                     if(board[pos]==1 && pos>=0 && pos<=5 ){//land on empty socket
//                         console.log('if 3 empty socket')
//                         stealStones(pos,1);
//                         setStats(board)
//                         setTimeout(()=>{inst.textContent=`Landed on empty socket. You stole opponent's beans.`},1000)
//                         setTimeout(()=>{ inst.textContent=`Opponent's Turn`},1000)
//                         turn=2;
//                     }
//                     else if(pos==6){//land on mancala
//                         inst.textContent('Landed on mancala. Choose another socket.')
//                         turn=1;
//                         console.log('land on mandala')
//                     }
//                     else{
//                         inst.textContent=`Opponent's Turn`
//                         turn=2;
//                         console.log('opponent turn')
//                     }
//                 }
//                 }
//             }
//             else{//player 2 is plating 
//                 while(turn==2){
//                     console.log('inside else2 turn2')
//                 player2=rnd(7,12);
            
//                 while(board[player2]==0){//empty socket
//                     player2=rnd(7,12);
//                 }
//                 let stns2=board[player2]
//                 distributeStns(player2,stns2,2);
//                 pos2=findPosition(player2,stns2,2);
//                 setStats(board);
//                 if(board[pos2]==1 && pos2>=7 && pos2<=12 ){//land on socket
//                     stealStones(pos2,2);
//                     setStats(board);
//                     inst.textContent=`Opponemt landed on empty socket and stole your beans.`;
//                     turn=1;
//                 }
//                 if(pos2==13){//mancala
//                     let p=pos2;
//                     while(p==13){
//                         inst.textContent='Opponent landed on mancala and is playing again.'
//                         while(board[player2]==0){//empty socket
//                             player2=rnd(7,12);
//                         }
//                         let stns2=board[player2]
//                         distributeStns(player2,stns2,2);
//                         pos2=findPosition(player2,stns2,2);
//                         setStats(board);
//                         if(board[pos2]==1 && pos2>=7 && pos2<=12 ){//land on socket
//                             stealStones(pos2,2);
//                             setStats(board);
//                             inst.textContent=`Opponent landed on empty socket and stole your beans.`;
//                             turn=1;
//                         }
//                         p=pos2;
//                     }
//                 }
//                 }
//             }
//         }

//     }
   
// }

const click=(e)=>{
    isEmpty()
    console.log('click');
    let path=e.composedPath(0);
    let p1=parseInt(path[0].getAttribute('value'));
    let stns1=board[p1];
    console.log('p1'+p1);
    console.log(stns1)
    let pos1=findPosition(p1,stns1,1)
    console.log('pos1'+pos1)
    let pos2;
    let p2;
    if(proceed===false){//one side is empty
        endCollection();
        endTally();
        startBtn.style.display='block';
        removeSocketListener();
    }
    else{
        if(stns1==0){//no stones in selected socket
            console.log('player1 chose empty socket')
            inst.textContent=`That's empty. Please choose a socket with beans.`;
        }
        else{//socket isn't empty
            console.log("p1 distributing");
            distributeStns(p1,stns1,1);
            //check where the last bean landed
            if(pos1===6){//landed on mancala
                inst.textContent='Nice Move, you landed on your mancala. Go again!';
                console.log('player1 land on mancala')
            }
            else if(board[pos1]==1 && pos1>=0 && pos1<=5){//land on empty
                console.log('player1 land on empty')
                stealStones(pos1,1);
                setTimeout(()=>{ inst.textContent='Woah! You landed on an empty space. You can steal!' },0)
                
                setTimeout(()=>{  inst.textContent=`Opponent's turn` },5000)
     
               

            }
            else{
                inst.textContent=`Opponent's turn`
                console.log('player2 turn')
            }
    
        }
    }
  
}


let eventFunct=click.bind()


//add the event listeners to the sockets
const socketListener=()=>{
    for(i=0;i<=5;i++){
        let socket=document.querySelector(`.socket${i}`);
        hover[i].classList.add('hover');
        socket.addEventListener('click', eventFunct);
    }
    
}

const removeSocketListener=()=>{
    for(i=0;i<=5;i++){
        let socket=document.querySelector(`.socket${i}`);
        socket.removeEventListener('click',eventFunct);
        hover[i].classList.remove('hover');
    }
}



const start=(e)=>{
    
    startBtn.style.display='none';
    // if(turn===1){
    //      socketListener();   
    // }
   
    
      
    // while(proceed===true){ //game will go on until one side is empty
        //console.log('in while');
    inst.textContent='Choose a socket with beans';
        
    socketListener();
        // if(turn===2){
        //     proceed=false;
        //     console.log('opponent')
        //     removeSocketListener();
            
           
        // }
        // else{
        //     socketListener();
        // }
    //}
    //exit out the while loop so game is done
    // if(proceed===false){
    //     removeSocketListener();
    //     endCollection();
    //     endTally();
    //     startBtn.style.display='block';
    // }
  
    

}

//game starts when player clicks button
startBtn.addEventListener('click',start);