var table=[];
var number_of_bombs=13;
var truth_table=[];
var markers=[];
var x_tile, y_tile;
//var check_marked=true;
var success_sound, failed_sound;

function preload()
{
  img = loadImage('./resources/mine.png');
  success_sound = loadSound('./resources/applause.mp3');
  success_sound.setVolume(0.3);
  failed_sound = loadSound('./resources/bomb_explosion.wav');
  failed_sound.setVolume(0.12);
}

function setup()
{
  x_tile = -1;
  y_tile = -1;
for(let i=0;i<12;i++)
{
  table[i]=[];
for(let j=0;j<12;j++)
{
    table[i][j]=0;
}
}
set_bombs(number_of_bombs);
//console.log("bombs have been set!\n");
fill_table();
for(let i=1;i<11;i++)
  {
  truth_table[i]=[];
  markers[i]=[];
for(let j=1;j<11;j++)
  {
  truth_table[i][j]=false;
  markers[i][j]=false;
  }
  }
  cnv = createCanvas(600,600);
  cnv.parent("saper");
}

function draw()
{
  createCanvas(600,600);
  background(0);
  spread();
  draw_table();
  if(x_tile>=1 && x_tile<11 && y_tile>=1 && y_tile<11)
  {
    if_finished();
  }
}

function print_table() //For debug only
{
    console.log(table);
}

function set_bombs(number_of_bombs)
{
let bombs=0;
while(bombs<number_of_bombs)
  {
    let x = floor(random(1,11));
    let y = floor(random(1,11));
    if(x==11) {x--;}
    if(y==11) {y--;}
    if(table[x][y]==0)
    {
      table[x][y]='B';
      bombs++;
    }
  }
}

function fill_table()
{
for(let i=1;i<11;i++)
{
for(let j=1;j<11;j++)
{
if(table[i][j]=='B')
{
add_value(i+1,j);
add_value(i-1,j);
add_value(i+1,j+1);
add_value(i-1,j+1);
add_value(i,j+1);
add_value(i,j-1);
add_value(i-1,j-1);
add_value(i+1,j-1);
}
}}

}

function add_value(c, d)
{
  if(table[c][d]!='B')
  {
    table[c][d]++;
  }
}

function draw_table()
{
  for(let i=1;i<11;i++)
  {
    for(let j=1;j<11;j++)
    {
      stroke(0);
      if(truth_table[j][i]==true)
      {
        fill(235);}
      else {
        fill(color(200,202,210));
      }
      rect((i-1)*60,(j-1)*60,60,60);
      if(truth_table[j][i]==true)
      {
      if(table[j][i]==6)
      {
        fill(color(204, 153, 51));
        stroke(color(204, 153, 51));
      }
      if(table[j][i]==5)
      {
        fill(color(122, 8, 42));
        stroke(color(122, 8, 42));
      }
      if(table[j][i]==4)
      {
        fill(color(4, 21, 107));
        stroke(color(4, 21, 107));
      }
      if(table[j][i]==3)
      {
        fill(color(170,0,0));
        stroke(color(170,0,0));
      }
      if(table[j][i]==2)
      {
        fill(color(39,144,18));
        stroke(color(39,144,18));
      }
      if(table[j][i]==1)
      {
        fill(color(25,32,233));
        stroke(color(25,32,233));
      }
      if(table[j][i]=='B')
      {
        image(img, 9+(i-1)*60,-48+j*60, 40 , 40);
      }
      if(table[j][i]!=0 && table[j][i]!='B')
      {
      textSize(32);
      text(table[j][i],20+(i-1)*60,-18+j*60);
      }
      }
    }
  }
  stroke(0);
  fill(0);
}

function mousePressed()
{
  let x_pos=mouseX;
  let y_pos=mouseY;
  for(let p=0;p<10;p++)
  {
    if(x_pos>=(p*60) && x_pos<(p+1)*60)
    {
      x_tile=p+1;
    }
    if(y_pos>=(p*60) && y_pos<(p+1)*60)
    {
      y_tile=p+1;
    }
  }

  if (mouseButton === LEFT)
  {
    check_marked=false;
    markers[y_tile][x_tile]=false;
    truth_table[y_tile][x_tile]=true;
  }
}

function spread()
{
  for(let i=1;i<11;i++)
  {
    for(let j=1;j<11;j++)
    {
      if(table[i][j]==' ' && truth_table[i][j]==true)
      {
        if(i<10 && j>1)
        {truth_table[i+1][j-1]=true;}
        if(i<10)
        {truth_table[i+1][j]=true;}
        if(i<10 && j<10)
        {truth_table[i+1][j+1]=true;}
        if(j>1)
        {truth_table[i][j-1]=true;}
        if(j<10)
        {truth_table[i][j+1]=true;}
        if(i>1 && j>1)
        {truth_table[i-1][j-1]=true;}
        if(i>1)
        {truth_table[i-1][j]=true;}
        if(i>1 && j<10)
        {truth_table[i-1][j+1]=true;}
      }
    }
  }
}

function if_finished()
{
  if(table[y_tile][x_tile]=='B' && check_marked==false)
  {
  for(let i=1;i<11;i++)
    {
    for(let j=1;j<11;j++)
    {
        truth_table[j][i]=true;
    }
    }
    draw_table();
    failed_sound.play();
    setTimeout(game_over,0.25);
  }
  let sum=0;
  for(let i=1;i<11;i++)
    {
    for(let j=1;j<11;j++)
    {
        if(truth_table[j][i]==true)
        {sum++};
    }
    }
    if(sum+number_of_bombs==100)
    {
      success_sound.play();
      setTimeout(you_won,0.25);
    }

}
function game_over()
{
  window.alert('Game Over!');
  setup();
}
function you_won()
{
  window.alert('Congratulations!\nYou won! ');
  setup();
}
