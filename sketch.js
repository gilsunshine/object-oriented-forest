function setup() {
  createCanvas(windowWidth,windowHeight);
  forest = new Forest();
}

function draw() {
  background(0);
    forest.displayLeaves();
}

class Forest {
  constructor( ) {
    this.numTrees = 5;
    this.trees = [];
    this.types = ["red", "orange", "yellow", "green"]
    for (var i = 0; i < this.numTrees; i++){
      this.trees.push(new Tree(random(0, windowWidth-200) + 200, random(0, windowHeight-200) + 200, this.types[Math.floor(random(0,4))]));
    }
  }

  displayLeaves() {
    for (var i = 0; i < this.numTrees; i++){
      for (var j = 0; j < this.trees[i].numBranches; j++){
        for (var m = 0; m < this.trees[i].branches[j].numLeaves; m++){
          this.trees[i].treeSway();
          this.trees[i].branches[j].branchSway();
          this.trees[i].branches[j].leaves[m].leafSway();
          noStroke();
          fill(this.trees[i].branches[j].leaves[m].r, this.trees[i].branches[j].leaves[m].g, this.trees[i].branches[j].leaves[m].b, this.trees[i].branches[j].leaves[m].a);
          ellipse(this.trees[i].branches[j].leaves[m].x, this.trees[i].branches[j].leaves[m].y, this.trees[i].branches[j].leaves[m].size, this.trees[i].branches[j].leaves[m].size);
        }
      }
    }
  }

}

class Tree {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.amplitude = .0009;
    this.angle = random(-.5,.5);
    this.aVelocity = .0000005;
    this.numBranches = random(10, 20);
    this.branches = [];
    for(var i = 0; i < this.numBranches; i++){
      this.branches.push(new Branch(this.x + randomGaussian(-80, 80), this.y + randomGaussian(-80, 80), color));
      }
  }

  treeSway(){
    for(var i = 0; i < this.numBranches; i++){
      for (var j = 0; j < this.branches[i].numLeaves; j++){
        this.branches[i].leaves[j].x += this.amplitude * cos(this.angle);
        this.branches[i].leaves[j].y += this.amplitude * sin(this.angle);
        this.angle += this.aVelocity;
    }
  }
  }
}

class Branch {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.amplitude = .01;
    this.angle = random(-.5,.5);
    this.aVelocity = .00005;
    this.numLeaves = random(10, 20);
    this.leaves = [];
    for(var i = 0; i < this.numLeaves; i++){
      this.leaves.push(new Leaf(this.x + randomGaussian(-20, 20), this.y + randomGaussian(-20, 20), this.color));
    }
  }

  branchSway(){
    for(var i = 0; i < this.numLeaves; i++){
      this.leaves[i].x += this.amplitude * cos(this.angle);
      this.leaves[i].y += this.amplitude * cos(this.angle);
      this.angle += this.aVelocity;
    }
  }
}

class Leaf {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.amplitude = random(-.2,.2);
      this.angle = random(-.5,.5);
      this.aVelocity = random(-.5,.5);
      this.size = random(2, 20);
      if(this.color == "red"){
        this.r = random(200, 250);
        this.g = random(50, 80);
        this.b = random(20, 50);
        this.a = random(150, 250);
      }
      if(this.color == "orange"){
        this.r = random(200, 250);
        this.g = random(50, 100);
        this.b = random(50, 100);
        this.a = random(150, 250);
      }
      if(this.color == "yellow"){
        this.r = random(200,250);
        this.g = random(150, 200);
        this.b = random(20, 50);
        this.a = random(150, 250);
      }
      if(this.color == "green"){
        this.r = random(50, 100);
        this.g = random(200, 250);
        this.b = random(50, 100);
        this.a = random(150, 250);
      }
    }

    leafSway(){
        this.x += this.amplitude * sin(this.angle);
        this.y += this.amplitude * cos(this.angle);
        this.angle += this.aVelocity;
    }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
