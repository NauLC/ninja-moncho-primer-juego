export default class win extends Phaser.Scene {
    constructor () {
        super("Win");
    
}

create () {
    this.add.image(400,300, "win").setScale(0.555)

}
}
