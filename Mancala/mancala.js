let startBtn=document.querySelector('.start');
let inst=document.querySelector('.instructions');
let infoBtn=document.querySelector('#info');
let info=document.querySelector('#mancalaInfo');
let infoExt=document.querySelector('.x')
let hover=document.querySelectorAll('.r1')
let proceed=true;


//function that picks a random number from a given range, bounds are included
let rnd=(min,max)=> Math.floor(Math.random()*((max+1)-min)+min)


//if info button is clicked then the instructions will pop up 
infoBtn.addEventListener('click',function(e){
    info.classList.add('active');
})

//exit pop up when x is clicked
infoExt.addEventListener('click', function(e){
    info.classList.remove('active');
} )

//set the board, 4 stones in each hole except mancala which are index 6 and 13
const setBoard=()=>{
    return [4,4,4,4,4,4,0,4,4,4,4,4,4,0];
}
let board=setBoard();


let renderBean=(isDistribution,position)=>{
    let bean1=document.querySelector('.bean1');
    let bean2=document.querySelector('.bean2');
    let beanArr=[bean1,bean2];
    let nb, s, posX, posY;
    if(isDistribution){//if distribution is true
        setTimeout(()=>{
        console.log("setTimeout");
        if(position===6 || position===13){
            
            s=document.querySelector(`.mancala${position}`); 
            s.style.position='relative';
            posX = rnd(0,72);
            posY = rnd(2,88);
            nb=beanArr[rnd(0,1)].cloneNode(true);
            nb.style.top=posY+'%';
            nb.style.left=posX+'%';
            s.appendChild(nb);
            nb.style.display='block';
      
        }
        else{
           
            s=document.querySelector(`.hole${position}`); 
            s.style.position='relative';
            posX = rnd(4,55);
            posY = rnd(5,65);
            nb=beanArr[rnd(0,1)].cloneNode(true);
            nb.style.top=posY+'%';
            nb.style.left=posX+'%';
            s.appendChild(nb);
            nb.style.display='block';
        }        
        },6000)
        
    }
    else{//distribution is false, so we just set up the board
        for(i=0;i<board.length;i++){
            if(i!=6 && i!=13){
                    for(j=1;j<=board[i];j++)
                    {
                        s=document.querySelector(`.hole${i}`); 
                        s.style.position='relative'
                        posX = rnd(4,55);
                        posY = rnd(4,65);
                        nb=beanArr[rnd(0,1)].cloneNode(true);
                        nb.style.top=posY+'%'
                        nb.style.left=posX+'%'
                        s.appendChild(nb)
                        nb.style.display='block'
                    }
            } 
            else{
                s=document.querySelector(`.mancala${i}`); 
                s.innerHTML=' ';
            }
        }
    }
}


// function to update board stats
const setStats=(array)=>{
    for(i=0;i<array.length;i++){
        let statBox=document.querySelector(`.stat${i}`);
        console.log(statBox);
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
    // setTimeout(()=>{
    let skip;
    if(player==1){
        skip=13;
    }
    else{
        skip=6;
    }
    board[selection]=0;
    let e=document.querySelector(`.stat${selection}`)
    e.textContent=board[selection];
    
    let eh= document.querySelector(`.hole${selection}`);
    let beanList=eh.querySelectorAll('svg');
    eh.innerHTML='';
    console.log(beanList)
    console.log(beanList[0])

    for(i=1;i<=stones;i++){
       
        let pos=findPosition(selection,i,player);
        let hb=document.querySelector(`.hole${pos}`)
        let mb;
        console.log('distb pos'+pos)
        if(player==1){
            mb=document.querySelector(`.mancala6`)
        }
        else{
            mb=document.querySelector(`.mancala13`)
        }
        
        let hs=document.querySelector(`.stat${pos}`)
        if(pos!=skip){ //skip opponent mandala
                board[pos]+=1;
                if(pos==13){
                    mb.appendChild(beanList[i-1])
                }
                else if(pos==6){
                    mb.appendChild(beanList[i-1])
                }
                else{
                    hb.appendChild(beanList[i-1])
                }
                hs.textContent=board[pos];                  
        } 
        } 

    
}

const appendStolenBeans=(parent,arr)=>{
    // console.log(parent,arr)
    for(i=0;i<arr.length;i++){
        parent.appendChild(arr[i]);
    }
}

//function to steal oponents stones
const stealStones=(indx,player)=>{
    let h=document.querySelector(`.hole${indx}`);
    let hb=h.querySelector('svg')
    let oh=document.querySelector(`.hole${12-indx}`)
    
    let ob=oh.querySelectorAll('svg');
    console.log('steal'+ob+'from'+oh)
    let parent;
    if(board[12-indx]!=0){
        if(player==1){
            parent=document.querySelector('.mancala6')
            board[6]+=board[12-indx]+1;
            board[indx]=0;
            board[12-indx]=0;
            h.innerHTML='';
            parent.appendChild(hb);
            appendStolenBeans(parent,ob);
        }
        else{
            console.log('steal')
            parent=document.querySelector('.mancala13')
            board[13]+=board[12-indx]+1;
            board[indx]=0;
            board[12-indx]=0;
            h.innerHTML='';
            parent.appendChild(hb);
            appendStolenBeans(parent,ob)
        }  
        setStats(board);
        console.log(board);
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
            inst.textContent='Oop all your holes are empty. End of Game! Calculating...'
        }
        else{//oponent side is empty
            inst.textContent=`Oop all of your opponent's holes are empty. End of Game! Calculating...`
        }
        proceed=false;
    }
}

const endAppend=()=>{
    let m;
    if(isSideEmpty(0,5)){
         m=document.querySelector('.mancala13');
        let h7=document.querySelector('.hole7');
        appendStolenBeans(m,h7.querySelectorAll('svg'))
        let h8=document.querySelector('.hole8');
        appendStolenBeans(m,h8.querySelectorAll('svg'))
        let h9=document.querySelector('.hole9');
        appendStolenBeans(m,h9.querySelectorAll('svg'))
        let h10=document.querySelector('.hole10');
        appendStolenBeans(m,h10.querySelectorAll('svg'))
        let h11=document.querySelector('.hole11');
        appendStolenBeans(m,h11.querySelectorAll('svg'))
        let h12=document.querySelector('.hole12');
        appendStolenBeans(m,h12.querySelectorAll('svg'))
    }
    else{
        m=document.querySelector('.mancala6');
        let h0=document.querySelector('hole0');
        appendStolenBeans(m,h0.querySelectorAll('svg'))
        let h1=document.querySelector('hole1');
        appendStolenBeans(m,h1.querySelectorAll('svg'))
        let h2=document.querySelector('hole2');
        appendStolenBeans(m,h2.querySelectorAll('svg'))
        let h3=document.querySelector('hole3');
        appendStolenBeans(m,h3.querySelectorAll('svg'))
        let h4=document.querySelector('hole4');
        appendStolenBeans(m,h4.querySelectorAll('svg'))
        let h5=document.querySelector('hole5');
        appendStolenBeans(m,h5.querySelectorAll('svg'))

    }
}

//distribute last stones at end of Game
const endCollection=()=>{
    count=0;
    let h;
    if(isSideEmpty(0,5)){//if player side is empty
        for(i=7;i<=12;i++){
            h=document.querySelector(`.hole${i}`);
            h.innerHTML=''
            count+=board[i];
            board[i]=0;
        }
        board[13]+=count;
    }
    else{//oponent side is empty
        for(i=0;i<=5;i++){
            h=document.querySelector(`.hole${i}`);
            h.innerHTML=''
            count+=board[i];
            board[i]=0;
        }
        board[6]+=count;
    }
    let m13=document.querySelector(".mancala13")
    let m6=document.querySelector('.mancala6')
    
    setTimeout(setStats(board),5000);
}

//tally score at end of game and proclaim winner
const endTally=()=>{
    console.log('endTally')
    if(board[6]>board[13]){
        inst.textContent='You Win'
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
    },10000);
    
}

const opponentTurn=()=>{
    let p2;
    let stns2=0
    let pos2;
    let cond;
    while(stns2===0){
        p2=rnd(7,12);
        stns2=board[p2];
        pos2=findPosition(p2,stns2,1)
    }
    distributeStns(p2,stns2,2)
    cond=pos2;
    while(cond==13){//land on mancala
        console.log('player2 land on mandala')
        p2=rnd(7,12);
        pos2=findPosition(p1,stns2,1)
        stns2=board[p2];
        
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
        console.log('player 1 turn')
        inst.textContent='Choose a hole with beans';   
    }
    
}

const click=(e)=>{
    let path=e.composedPath(0);
    let p1=parseInt(path[0].getAttribute('value'));
    let stns1=board[p1];
    let pos1=findPosition(p1,stns1,1)
    let c;
    let pos2;
    let p2;
    let stns2=0;
    let cond;
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
            inst.innerHTML=`Woah! You landed on an empty space. You can steal if they have stones! <br> Opponent's turn.`
            //opponent
            while(stns2===0){
                p2=rnd(7,12);
                pos2=findPosition(p1,stns1,1)
                stns2=board[p2];
            }
            distributeStns(p2,stns2,2)
            cond=pos2;
            while(cond===13){//land on mancala
                console.log('player2 land on mandala')
                p2=rnd(7,12);
                pos2=findPosition(p1,stns1,1)
                stns2=board[p2];
                
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
                inst.textContent='Choose a hole with beans';
            }
            else{//none of above
                console.log('player 1 turn')
                inst.textContent='Choose a hole with beans';
            }
            

        }
        else{
            console.log('player2 turn')
            inst.textContent=`Opponent's turn. Please wait...`
            //opponent
            setTimeout(()=>{opponentTurn()}
                ,2000)
           
        }
        endGame();
    }
    
  
}


let eventFunct=click.bind()


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
    console.log(board);
    board=setBoard();
    setStats(board);
    renderBean(false);
    startBtn.style.display='none';
    inst.textContent='Choose a hole with beans';
    console.log(board)
    holeListener();
}

//game starts when player clicks button
startBtn.addEventListener('click',start);