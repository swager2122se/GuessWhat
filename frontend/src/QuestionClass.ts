export class QuestionClass {
  answers: string[];
  hardQuestions: string[];
  easyQuestions: string[];
  

  constructor({
    answers = [],
    hardQuestions = [],
    easyQuestions = [],
  }: {
    answers?: string[];
    hardQuestions?: string[];
    easyQuestions?: string[];
  } = {}) {
    this.answers = answers;
    this.hardQuestions = hardQuestions;
    this.easyQuestions = easyQuestions;
  }



  getRandomQuestion(): string | null{
   
    if (this.hardQuestions.length> 0 ){
      return this.getRandomHardQuestion();
    }
    if (this.easyQuestions.length> 0) {
      return this.getRandomEasyQuestion();
    }

    return null;


  }

  getRandomEasyQuestion(): string | null {
    if (this.easyQuestions.length === 0) return null;
    const index = Math.floor(Math.random() * this.easyQuestions.length);
    return this.easyQuestions.splice(index,1)[0];
  }




  getRandomHardQuestion(): string | null {
    if (this.hardQuestions.length === 0) return null;
    const index = Math.floor(Math.random() * this.hardQuestions.length);
    return this.hardQuestions.splice(index,1)[0];
  }



}




