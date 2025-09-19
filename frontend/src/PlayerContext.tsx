import { createContext, useContext , useState, type ReactNode} from "react";
import React from "react";

export interface Player { 
  id : string,
  name : string,
  points : number
}

interface PlayerContextType {
  players : Player[]
  
  setPlayers : React.Dispatch<React.SetStateAction<Player[]>>

}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);



export const PlayerProvider = ({children} : {children : ReactNode}) => {

  const [players, setPlayers] = useState<Player[]>([]);




  return (
    <PlayerContext.Provider value = {{players,setPlayers}}>
      {children}
    </PlayerContext.Provider>
  )
}

export const  usePlayerProvider = ( ) => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("err");

  return context;

  
}

