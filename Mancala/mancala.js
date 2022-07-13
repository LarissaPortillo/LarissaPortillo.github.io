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
const findPosition=(selection, stones)=>{ 
    let r= selection-(14-stones);
    let m=r%14;
    if(selection+stones<=13){
        return selection+stones;
    }
    else{
        return m;
    }
}

//function to distribute stones on the board
const distributeStns=(selection,stones)=>{
    board[selection]=0;
    for(i=1;i<=stones;i++){
        let pos=findPosition(selection,i);
        board[pos]+=1;       
    }
}

//function that picks a random number from a given range, bounds are included
let rnd=(min,max)=> (Math.random()*(max-min)+min)


//gameplay at the press of start button

let startBtn=document.querySelector('.start')

startBtn.addEventListener('click',function(){
    console.log('clicked start')
})

//set the board
setStats(board);

//add the event listeners to the sockets
for(i=0;i<=5;i++){
    let socket=document.querySelector(`.socket${i}`);
    socket.addEventListener('click',function(){
        console.log(socket.className+'click');
    });
}


let computerSelection=rnd(7,12);
let playerSelection;


let stns=board[playerSelection];

if(stns!=0){//not empty
    let pos=findPosition(playerSelection,stns);
    distributeStns(playerSelection,stns);
    if(board[pos]==1 && pos<6){
        console.log('You landed on an empty socket! Collect your opponents stones')
        board[pos]+=board[12-pos]+1
        board[pos]=0;
        board[12-pos]=0
    }
    else if(playerSelection==6){
        ('Your turn again')
    }
    else{
        ('Opponents turn')
    }
    
}
else{
    console.log("empty socket. please select another socket with stones")
}

