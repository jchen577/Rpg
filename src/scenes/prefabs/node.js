class Node{
    constructor(walkable, worldPos, gridX, gridY){
        this.walkable = walkable;
        this.worldPos = worldPos;
        this.gridX = gridX;
        this.gridY = gridY;
        this.parent;
        this.gCost = 0;
        this.hCost = 0;
        this.fCost = 0;
    }
}
