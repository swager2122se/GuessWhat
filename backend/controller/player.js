    
import { v4 as uuidv4 } from 'uuid';
    
    
    class Player{
        constructor(name,id =  uuidv4() , points = 0){
            this.id = id;
            this.name = name;
            this.points = points; 
        }

        updatePoints() {
        this.points = this.points+1;    
        }

    }

    export default Player;