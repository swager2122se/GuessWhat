import Game from "./nikaloQuestion.js";


class Lobby{
        constructor(){
            this.lobbies = new Map();
        }



    generateRandomLobbyCode(length = 4) {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let code = '';
        for (let i = 0; i < length; i++) {
            code += letters[Math.floor(Math.random() * letters.length)];
        }
        return code;
        }



        createLobby(){
            let lobbycode = this.generateRandomLobbyCode();

            const game = new Game();
            this.lobbies.set(lobbycode, game);
            console.log("created game");
            return lobbycode;
        }


        getGame(lobbycode){
            return this.lobbies.get(lobbycode);
        }

        exists(lobbycode){
           return this.lobbies.has(lobbycode);
        }


}
const lobbyManager = new Lobby();
export default lobbyManager;