let startBtn=document.querySelector('.start');
let inst=document.querySelector('.instructions');
let infoBtn=document.querySelector('#info');
let info=document.querySelector('#mancalaInfo');
let infoExt=document.querySelector('.x');
let iconSett=document.querySelector('.fa-solid.fa-gear');
let settExt=document.querySelector('.settX')
let sett=document.querySelector('.settings');
let hover=document.querySelectorAll('.r1');
let proceed=true;
let darkMode = document.querySelectorAll('input[name="darkMode"]');
let body=document.querySelector('body');
let bg=document.querySelector('.game');
let btn=document.querySelector(".start");
let infoTxt=document.querySelector('.infoText')

//being able to toggle between dark and light mode
darkMode.forEach(radio=> radio.addEventListener('change',()=>{
    if(radio.value==='on'){
        body.style.backgroundColor='#090602';
        body.style.color='rgb(224, 220, 213)';
        bg.style.backgroundImage='url(https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/109/posts/35622/image/Tut_Aug2020_Wood_Grain_Texture_10.jpg)';
        btn.style.color='rgb(224, 220, 213)';
        infoTxt.style.color='black';
        sett.style.color='black';
    }
    if(radio.value==='off'){
        body.style.backgroundColor='white';
        body.style.color='#383736';
        bg.style.backgroundImage="url(https://unblast.com/wp-content/uploads/2018/12/Wood-Pattern-5.jpg)";   
        btn.style.color='#383736';
        infoTxt.style.color='#383736';
        sett.style.color='#383736';
        btn.addEventListener('mouseover',function(){btn.style.color='white'});
        btn.addEventListener('mouseout',function(){btn.style.color='#383736'})

    }
}))

//if info button is clicked then the instructions will pop up 
infoBtn.addEventListener('click',function(e){
    info.classList.add('active');
})

//exit pop up when x is clicked
infoExt.addEventListener('click', function(e){
    info.classList.remove('active');
} )

//if settings icon clicked div will pop up
iconSett.addEventListener('click',function(){
    sett.classList.add('active');
})

//exit settings pop when x is clicked
settExt.addEventListener('click',function(){
    sett.classList.remove('active');
})

//function that picks a random number from a given range, bounds are included
let rnd=(min,max)=> Math.floor(Math.random()*((max+1)-min)+min)

//set the board, 4 stones in each hole except mancala which are index 6 and 13
const setBoard=()=>{
    return [4,4,4,4,4,4,0,4,4,4,4,4,4,0];
}
let board=setBoard();

//render beans on board
let renderBean=()=>{
    let bean1=document.querySelector('.bean1');
    let bean2=document.querySelector('.bean2');
    let beanArr=[bean1,bean2];
    let nb, s, posX, posY;
    for(i=0;i<board.length;i++){
        if(i!=6 && i!=13){
            for(j=1;j<=board[i];j++)
                    {
                        s=document.querySelector(`.hole${i}`); 
                        s.style.position='relative';
                        posX = rnd(4,55);
                        posY = rnd(4,65);
                        nb=beanArr[rnd(0,1)].cloneNode(true);
                        nb.style.top=posY+'%';
                        nb.style.left=posX+'%';
                        s.appendChild(nb);
                        nb.style.display='block';
                    }        
        } 
        else{
            s=document.querySelector(`.mancala${i}`); 
            s.innerHTML=' ';
        }            
    }    
    
}


// function to update board stats
const setStats=(array)=>{
    for(i=0;i<array.length;i++){
        let statBox=document.querySelector(`.stat${i}`);
        statBox.textContent=array[i];
    }
}

//find hole where stone last lands
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
    let e=document.querySelector(`.stat${selection}`);
    e.textContent=board[selection];
    let eh= document.querySelector(`.hole${selection}`);
    let beanList=eh.querySelectorAll('svg');
    eh.innerHTML='';
    for(i=1;i<=stones;i++){     
        let pos=findPosition(selection,i,player);
        let hb=document.querySelector(`.hole${pos}`);
        let mb;
        if(player==1){
            mb=document.querySelector(`.mancala6`);
        }
        else{
            mb=document.querySelector(`.mancala13`);
        }
        let hs=document.querySelector(`.stat${pos}`);
        if(pos!=skip){ //skip opponent mancala
                board[pos]+=1;
                if(pos==13){
                    mb.appendChild(beanList[i-1]);
                }
                else if(pos==6){
                    mb.appendChild(beanList[i-1]);
                }
                else{
                    hb.appendChild(beanList[i-1]);
                }
                hs.textContent=board[pos];                  
        } 
    } 

    
}

//add the bean icons to each hole
const appendBeans=(parent,arr)=>{
    for(i=0;i<arr.length;i++){
        parent.appendChild(arr[i]);
    }
}

//function to steal oponents stones
const stealStones=(indx,player)=>{
    let h=document.querySelector(`.hole${indx}`);
    let hb=h.querySelector('svg');
    let oh=document.querySelector(`.hole${12-indx}`);
    let ob=oh.querySelectorAll('svg');
    console.log('steal');
    let parent;
    if(board[12-indx]!=0){
        if(player==1){
            parent=document.querySelector('.mancala6');
            board[6]+=board[12-indx]+1;
            board[indx]=0;
            board[12-indx]=0;
            h.innerHTML='';
            parent.appendChild(hb);
            appendBeans(parent,ob);
        }
        else{
            parent=document.querySelector('.mancala13');
            board[13]+=board[12-indx]+1;
            board[indx]=0;
            board[12-indx]=0;
            h.innerHTML='';
            parent.appendChild(hb);
            appendBeans(parent,ob);
        }  
        setStats(board);
    }
   
}

//check if the entire range of empty holes is empty based on index given
const isSideEmpty=(start,end)=>{
    let empt=true;
    for(i=start;i<=end;i++){
        if(board[i]>0){
            empt=false;
        }
    }
    return empt;
}

//check if one side is empty
const isEmpty=()=>{
    if(isSideEmpty(0,5)===true || isSideEmpty(7,12)===true){
        if(isSideEmpty(0,5)){//if player side is empty
            inst.textContent='Oop all your holes are empty. End of Game! Calculating...';
        }
        else{//oponent side is empty
            inst.textContent=`Oop all of your opponent's holes are empty. End of Game! Calculating...`;
        }
        proceed=false;
    }
}

//allocate the remaining beans to correct mancala at the end of the game
const endAppend=()=>{
    let m;
    if(isSideEmpty(0,5)){
         m=document.querySelector('.mancala13');
        let h7=document.querySelector('.hole7');
        appendBeans(m,h7.querySelectorAll('svg'))
        let h8=document.querySelector('.hole8');
        appendBeans(m,h8.querySelectorAll('svg'))
        let h9=document.querySelector('.hole9');
        appendBeans(m,h9.querySelectorAll('svg'))
        let h10=document.querySelector('.hole10');
        appendBeans(m,h10.querySelectorAll('svg'))
        let h11=document.querySelector('.hole11');
        appendBeans(m,h11.querySelectorAll('svg'))
        let h12=document.querySelector('.hole12');
        appendBeans(m,h12.querySelectorAll('svg'))
    }
    else{
        m=document.querySelector('.mancala6');
        let h0=document.querySelector('.hole0');
        appendBeans(m,h0.querySelectorAll('svg'))
        let h1=document.querySelector('.hole1');
        appendBeans(m,h1.querySelectorAll('svg'))
        let h2=document.querySelector('.hole2');
        appendBeans(m,h2.querySelectorAll('svg'))
        let h3=document.querySelector('.hole3');
        appendBeans(m,h3.querySelectorAll('svg'))
        let h4=document.querySelector('.hole4');
        appendBeans(m,h4.querySelectorAll('svg'))
        let h5=document.querySelector('.hole5');
        appendBeans(m,h5.querySelectorAll('svg'))

    }
}

//disable or enable the pointer event option on holes
const pointerOn=(bool)=>{
    let h0,h1,h2,h3,h4,h5;
    if(bool){
        h0=document.querySelector('.hole0');
        h0.style.pointerEvents='auto';
        h1=document.querySelector('.hole1');
        h1.style.pointerEvents='auto';
        h2=document.querySelector('.hole2');
        h2.style.pointerEvents='auto';
        h3=document.querySelector('.hole3');
        h3.style.pointerEvents='auto';
        h4=document.querySelector('.hole4');
        h4.style.pointerEvents='auto';
        h5=document.querySelector('.hole5');
        h5.style.pointerEvents='auto';
    }
    else{
        h0=document.querySelector('.hole0');
        h0.style.pointerEvents='none';
        h1=document.querySelector('.hole1');
        h1.style.pointerEvents='none'
        h2=document.querySelector('.hole2');
        h2.style.pointerEvents='none';
        h3=document.querySelector('.hole3');
        h3.style.pointerEvents='none';
        h4=document.querySelector('.hole4');
        h4.style.pointerEvents='none';
        h5=document.querySelector('.hole5');
        h5.style.pointerEvents='none';
    }

}

//distribute last stones at end of Game
const endCollection=()=>{
    count=0;
    let h;
    if(isSideEmpty(0,5)){//if player side is empty
        for(i=7;i<=12;i++){
            h=document.querySelector(`.hole${i}`);
            h.innerHTML='';
            count+=board[i];
            board[i]=0;
        }
        board[13]+=count;
    }
    else{//oponent side is empty
        for(i=0;i<=5;i++){
            h=document.querySelector(`.hole${i}`);
            h.innerHTML='';
            count+=board[i];
            board[i]=0;
        }
        board[6]+=count;
    }
    setTimeout(setStats(board),5000);
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

//function containing functions to be excuted once game ends
const endGame=()=>{
    isEmpty();
    setTimeout(() => {
        if(proceed===false){//one side is empty
        startBtn.style.display='block';
        endAppend();
        endCollection();
        endTally();
        removeHoleListener();
    }
    },20000);
    
}

//function to run when it's computer's turn
const opponentTurn=()=>{
    endGame();
    let stns2=0;
    let p2, pos2, cond;
    while(stns2===0){
        endGame();
        p2=rnd(7,12);
        stns2=board[p2];
        pos2=findPosition(p2,stns2,2);
    }
    console.log('player 2 distributing')
    distributeStns(p2,stns2,2);
    cond=pos2;
    while(cond==13){//land on mancala
        endGame();
        console.log('player2 land on mancala')
        p2=rnd(7,12);
        stns2=board[p2];
        pos2=findPosition(p2,stns2,2);
        while(stns2===0){
            endGame();
            p2=rnd(7,12);
            stns2=board[p2];
            pos2=findPosition(p2,stns2,2);
        }
        console.log('player 2 distributing again')
        distributeStns(p2,stns2,2);
        if(board[pos2]==1 && pos2>=7 && pos2<=12){//land on empty
            console.log('player2 land on empty and steals');
            stealStones(pos2,2);
            console.log('player 1 turn')  
            inst.textContent='Choose a hole with beans';   
             
        }
        else{//none of above
            console.log('player 1 turn') 
            inst.textContent='Choose a hole with beans';    
              
        }
        cond=pos2;  
    }
    if(board[pos2]==1 && pos2>=7 && pos2<=12){//land on empty
        console.log('player2 land on empty and steals');
        stealStones(pos2,2);
        console.log('player 1 turn')
        inst.textContent='Choose a hole with beans';   
    }
    else{//none of above
        console.log('player 1 turn');
        inst.textContent='Choose a hole with beans';   
    }
    pointerOn(true);
    endGame();
    
}

const play=(e)=>{
    let path=e.composedPath(0);
    let p1=parseInt(path[0].getAttribute('value'));
    let stns1=board[p1];
    let pos1=findPosition(p1,stns1,1);
    let c, pos2, p2, cond;
    let stns2=0;
    if(stns1==0){//no stones in selected hole
        console.log('player1 chose empty hole')
        inst.textContent=`That's empty. Please choose a hole with beans.`;
        endGame();
    }
    else{//hole isn't empty
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
            inst.innerHTML=`Opponent's turn. Please wait...`;
            //opponent
            pointerOn(false);
            setTimeout(()=>{opponentTurn()}
                ,4000)
        }
        else{
            console.log('player2 turn')
            inst.textContent=`Opponent's turn. Please wait...`;
            //opponent
            pointerOn(false);
            setTimeout(()=>{opponentTurn()}
                ,4000)           
        }
        endGame();
    }
}

let eventFunct=play.bind()

//add the event listeners to the holes
const holeListener=()=>{
    for(i=0;i<=5;i++){
        let hole=document.querySelector(`.hole${i}`);
        hover[i].classList.add('hover');
        hole.addEventListener('click', eventFunct);
    }
}

//remove the event listeners from the holes
const removeHoleListener=()=>{
    for(i=0;i<=5;i++){
        let hole=document.querySelector(`.hole${i}`);
        hole.removeEventListener('click',eventFunct);
        hover[i].classList.remove('hover');
    }
}

//begin game function
const start=(e)=>{
    proceed=true;
    board=setBoard();
    setStats(board);
    renderBean();
    startBtn.style.display='none';
    inst.textContent='Choose a hole with beans';
    pointerOn(true);
    holeListener();
}

//game starts when player clicks button
startBtn.addEventListener('click',start);