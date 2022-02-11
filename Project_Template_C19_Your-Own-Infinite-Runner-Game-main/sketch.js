var background, backgroundImg;
var ball, ballImg;
var obsOne, obsOneImg;
var obsTwo, obsTwoImg;
var goal, goalImg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var goals;
var obsOnes;
var obsTwos;

function preload(){
    backgroundImg = loadImage("background.png");
    ballImg = loadImage("ball-removebg-preview.png");
    obsOneImg = loadImage("obsOne-removebg-preview.png");
    obsTwoImg = loadImage("obsTwo-removebg-preview.png");
    goalImg = loadImage("goal-removebg-preview.png");
}

function setup() {
    createCanvas(600, 600);

    background = createSprite(300, 300);
    background.addImage("field", backgroundImg);

    ball = createSprite(300, 300);
    ball.addImage("ball", ballImg);
    ball.scale = 0.4;

    obsOnes = new Group();
    obsTwos = new Group();
    goals = new Group();
}

function spawnObsOne() {
    if (World.frameCount % 400 === 0) {
        obsOne = createSprite(200, -20, 20, 20);
        obsOne.addImage(obsOneImg);
        obsOne.scale = 0.99;
        obsOne.velocityY = 4;
        obsOnes.add(obsOne);
    }
}

function spawnObsTwo() {
    if (World.frameCount % 300 === 0) {
        obsTwo = createSprite(200, -20, 20, 20);
        obsTwo.addImage(obsTwoImg);
        obsTwo.scale = 0.99;
        obsTwo.velociyY = 4;
        obsTwos.add(obsTwo);
    }
}

function spawnGoals() {
    if(World.frameCount % 90 === 0) {
        goal = createSprite(Math.round(random(50, 400)), -20, 20, 20);
        goal.addImage(goalImg);
        goal.scale = 0.99;
        goal.velocityY = 4;
        goals.add(goal);
    }
}



function draw() {
    if (gameState == PLAY) {
        background.velocityY = 4;
        if (keyDown("left_arrow")) {
            ball.x = ball.x - 5;
        }
        else if (keyDown("right_arrow")) {
            ball.x = ball.x + 5;
        }
        edges = createEdgeSprites();
        ball.collide(edges);

        if (background.y > 600) {
            background.y = background.height/2;
        }
        spawnGoals();
        spawnObsOne();
        spawnObsTwo();

        if (goals.isTouching(ball)) {
            goals.destroyEach();
            score = score + 50;
        }

        if (obsOnes.isTouching(ball) || obsTwos.isTouching(ball)) {
            gameState == END;
        }
    
    }
    else if (gameState == END) {
        ball.x=width/2;
        ball.y=height/2;
        ball.scale=0.6;
    
        goals.destroyEach();
        obsOnes.destroyEach();
        obsTwos.destroyEach();
            
        goals.setVelocityYEach(0);
        obsOnes.setVelocityYEach(0);
        obsTwos.setVelocityYEach(0);
    }
    drawSprites();
    textSize(20);
    fill(255);
    text("goals: "+ score, 500, 30);
}