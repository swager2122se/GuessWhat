import Question from "../models/question.js";
import { QuestionClass } from "./question.js";



class Game{
    constructor(){
        this.players = [];
        this.currentQuestion= null;
        this.point = 10;
    }

    gameEnd(){
        for (const player of this.players){
            if (player.points >= this.point){
                this.players.map((player) => {
                    player.points = 0;
                })

                this.currentQuestion = null;

                return true;
            }
        }

        return false;

    }

    
    addPlayer(player){
        this.players.push(player);
    }

    findPlayerbyIDandUpdatePoint(id){
        for (const player of this.players){
            if (player.id === id){
                player.updatePoints();
                break;
            }
        }
    }

    
    isCorrectAnswer(answer){
        return this.currentQuestion.answers.includes(answer);
    }
    
    getPlayers(){
        return this.players;
    }


    
    async showRandomQuestionandRemoveinOrder(){
        if (this.currentQuestion?.easyQuestions.length === 0 || !this.currentQuestion){
            try{ 
                await this.getQuestionFromDB();
                const tempAns = this.currentQuestion.answers[0];
            return {
                type: "replace",
                ans : tempAns,
                data : this.showRandomListObjectandRemove(this.currentQuestion.hardQuestions)
        }
            }catch(e){
            console.log(e);
        }
        }
        

        if (this.currentQuestion?.hardQuestions.length > 0) {
        return {
                type: "append",
                data : this.showRandomListObjectandRemove(this.currentQuestion.hardQuestions)
                  }        
        }

        if (this.currentQuestion?.easyQuestions.length > 0){
        return {
                type: "append",
                data : this.showRandomListObjectandRemove(this.currentQuestion.easyQuestions)
                  }   
            }
    }


    async  getQuestionFromDB()  {
    try{
        const docs = await Question.aggregate([{$sample: {size:1}}])
        console.log("DB returned:", docs);
        this.currentQuestion = new QuestionClass();
        const doc = docs[0];
        this.currentQuestion.answers = doc.answer;
        this.currentQuestion.hardQuestions = doc.hardQuestions;
        this.currentQuestion.easyQuestions = doc.easyQuestions;
        

    }catch(e){
        console.log(e);
    }
   
}

 showRandomListObjectandRemove(listofString){
        const index = Math.floor(Math.random() * listofString.length);
        return listofString.splice(index,1)[0];
    }
}

export default Game;
