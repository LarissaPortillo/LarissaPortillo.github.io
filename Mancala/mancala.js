//set the board, 4 stones in each socket except mancala which are index 6 and 13
let board=[4,4,4,4,4,4,0,4,4,4,4,4,4,0];


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



let playerSelection;


let stns=board[playerSelection];

if(stns!=0){//not empty
    let pos=findPosition(playerSelection,stns)
    distributeStns=(playerSelection,stns)
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

