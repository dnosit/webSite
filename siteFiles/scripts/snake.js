window.onload=function() {
    // load canvasvas 
    canvas=document.getElementById("gc");
    // graphics context 
    ctx=canvas.getContext("2d");
    // check for keystokes
    document.addEventListener("keydown",keyPush);
    // call game function 15 times each second (converting from milliseconds)
    setInterval(game,1000/15); 
}
// VARS
// snake velocity init zero 
xvel=yvel=0;
// snake tail length init 5 long 
tail_length = 5;
// snake tail trail
trail=[]; 
// player positions init 10,10
xplay=yplay=10; 
// food 'goal' postions init 15,15 
x_food=y_food=15; 
// grid size and tile count both 20x20 for 400 size canvasvas 
grid_size=tile_count=20; 

// MAIN GAME 
function game() {
    // change the player postion accordingly
    xplay+=xvel;
    yplay+=yvel;
    // add wrap around for reaching edges 
    if(xplay<0) {
        xplay= tile_count-1; 
    }
    if(xplay> tile_count-1) {
        xplay= 0;
    }
    if(yplay<0) {
        yplay= tile_count-1; 
    }
    if(yplay> tile_count-1) {
        yplay= 0;
    }
    // refresh screen accordingly
    // canvasvas
    ctx.fillStyle="darkslategray";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    // snake trail
    ctx.fillStyle="maroon";
    for(let i=0;i<trail.length;i++) {
        // draw each section
        ctx.fillRect(trail[i].x*grid_size,trail[i].y*grid_size,grid_size-2,grid_size-2);
        // check if hit own tail_length 
        if(trail[i].x==xplay && trail[i].y==yplay) {
            // reset tail_length length 
            tail_length = 5; 
        }
    }
    // move the tail_length trail 
    trail.push({x:xplay,y:yplay}); 
    // keep the tail_length length consistent 
    while(trail.length>tail_length) {
    trail.shift(); 
    } 

    // check if 'eaten' food
    if(x_food==xplay && y_food==yplay) {
        // if so, add section to tail_length 
        tail_length++; 
        // set new random positions for food
        x_food=Math.floor(Math.random()*tile_count);
        y_food=Math.floor(Math.random()*tile_count);
    }
    // add food 'goal' 
    ctx.fillStyle="yellow";
    ctx.fillRect(x_food*grid_size,y_food*grid_size,grid_size-2,grid_size-2);
} // end Main Game 

// keystroke entered
function keyPush(evt) {
    switch(evt.keyCode) {
        // left arrow
        case 37:
            xvel=-1;yvel=0;
            break;
        // up arrow
        case 38:
            xvel=0;yvel=-1;
            break;
        // right arrow
        case 39:
            xvel=1;yvel=0;
            break;   
        // down arrow
        case 40:
            xvel=0;yvel=1;
            break;    
    }
}