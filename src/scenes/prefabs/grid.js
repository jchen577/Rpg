class Grid{
    constructor(nRadius){
        this.unwalkable;;
        this.nRadius = nRadius;
        this.grid;
        this.nodeDiameter;
        this.gridSizeX;
        this.gridSizeY;
        this.map;
        this.gridWorldSizeX;
        this.gridWorldSizeY;
    }

    start(map){
        this.map = map;
        this.nodeDiameter = this.nRadius*2;
        this.gridSizeX = Math.round(map.widthInPixels/this.nodeDiameter);
        this.gridSizeY = Math.round(map.heightInPixels/this.nodeDiameter);
        this.gridWorldSizeX = map.widthInPixels;
        this.gridWorldSizeY = map.heightInPixels;
        this.createGrid();
    }

    nodeFromWP(worldPos){
        /*let percentX = (worldPos[0]+this.gridWorldSizeX/2)/(this.gridWorldSizeX);
        let percentY = (worldPos[1]+this.gridWorldSizeY/2)/(this.gridWorldSizeY);

        let x = Math.round(((this.gridSizeX-1)*percentX));
        let y = Math.round(((this.gridSizeY-1)*percentY));
        console.log(percentX,percentY,x,y,worldPos[0],worldPos[1],this.map.widthInPixels,this.map.heightInPixels, this.gridSizeX,this.gridSizeY)
        console.table(this.grid)*/
        return this.grid[Math.round(worldPos[0]/16)][Math.round(worldPos[1]/16)];
    }

    getNeighbors(node){
        let neighbors = [];
        for(let x = -1; x <= 1; x++){
            for(let y = -1; y <=1 ; y++){
                if(x == 0 && y == 0){
                    continue;
                }
                else{
                    let checkX = node.gridX + x;
                    let checkY = node.gridY + y;
                    if((checkX >= 0 && checkX < this.gridSizeX) && (checkY >= 0 && checkY < this.gridSizeY )){
                        neighbors.push(this.grid[checkX][checkY]);
                    }
                }
            }
        }
        return neighbors;
    }

    createGrid(){
        this.grid = Array(this.gridSizeX).fill(0).map(() => Array(this.gridSizeY).fill(0));
        let nodePoint;
        let walkYes;
        for(let x = 0; x < this.gridSizeX; x++){
            for(let y = 0; y < this.gridSizeY; y++){
                let nX = x*this.nodeDiameter+this.nRadius;
                let nY = y*this.nodeDiameter+this.nRadius
                nodePoint = [nX,nY];
                if(this.map.layers[2].data[y][x].properties.collisions,x,y == true){
                    walkYes = true;
                }
                else{
                    walkYes = false
                }
                this.grid[x][y] = new Node(walkYes,nodePoint,x,y);
            }
        }
    }
}