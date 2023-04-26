import{SHAPES} from "../../utils.js";
const{TRIANGLE, SQUARE, DIAMOND}=SHAPES;

export default class Game extends Phaser.Scene {
  score;
  constructor() {
    super("game");
  }

  init() {
    this.shapesRecolected ={
      [TRIANGLE]: {count:0, score:10},
      [SQUARE]: {count:0, score:20},
      [DIAMOND]: {count:0, score:30}
    }
    console.log(this.shapesRecolected)
  }
  preload() {
    this.load.image("sky", "./assets/images/sky.png");
    this.load.image("ground", "./assets/images/platform.png");
    this.load.image("ninja", "./assets/images/ninja.png");
    this.load.image(SQUARE, "./assets/images/square.png");
    this.load.image(DIAMOND, "./assets/images/diamond.png");
    this.load.image(TRIANGLE, "./assets/images/triangle.png");
    this.load.image("meme", "./assets/images/meme.png");
  }
  create() {
    // add background
    this.add.image(400, 300, "sky").setScale(0.555);
    //
    let platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, "ground").setScale(2).refreshBody();
    // add meme
   
    this.add.image(700, 90,"meme").setScale(0.25);
    

    // add sprite player
    this.player = this.physics.add.sprite(100, 450, "ninja");
    this.player.setCollideWorldBounds(true);
    // add shapes  groeup
    this.shapesGroup = this.physics.add.group();
    this.shapesGroup.create(100, 0, "diamond");
    this.shapesGroup.create(200, 0, "triangle");
    this.shapesGroup.create(300, 0, "square");
    this.addShape();
    //create event to add shapes
    this.time.addEvent({
      delay: 1500,
      callback: this.addShape,
      callbackScope: this,
      loop: true,
    });
    // create cursor
    this.cursors= this.input.keyboard.createCursorKeys();
    //add collierd between player and plataform
    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(this.player, this.shapesGroup);
    this.physics.add.collider(platforms, this.shapesGroup);
  // add overlap between player and shapes
this.physics.add.overlap(
  this.player,
  this.shapesGroup,
  this.collectShape,//funcion que llama cuando el player toca el shape
  null,//dejar fijo por ahora
  this//dejar fijo por ahora
)
this.score = 0;
this.scoreText = this.add.text(20 , 20, "Score: " + this.score, {
  fontSize: "35px",
  fontStyle: "bold",
  fill: "#FFFFFF",
});

  }


  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-250); 
    } else  {
      if (this.cursors.right.isDown) {
      this.player.setVelocityX(250);
    } else{ 
      this.player.setVelocityX(0);
    }
  }
    if (this.cursors.up.isDown && this.player.body.touching.down){
      this.player.setVelocityY(-330)
    }
  }




 addShape (){
  // get random shape
  const randomShape = Phaser.Math.RND.pick ([DIAMOND, SQUARE,TRIANGLE]);
  //get  random position  x
  const randomX = Phaser.Math.RND.between(0,800);
  // get random  to  screen
  this.shapesGroup.create(randomX, 0, randomShape)
  console.log("shape is added", randomX, randomShape);
  }
  collectShape(player, shape){
    //remove shape from screen
    shape.disableBody(true, true);
  
    const shapeName = shape.texture.key;
    this.shapesRecolected[shapeName].count++;

    this.score += this.shapesRecolected[shapeName].score;
  this.scoreText.setText(`Score: ${this.score.toString()}`);
  }
}