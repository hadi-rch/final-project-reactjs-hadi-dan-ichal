// import { createContext, useState } from "react";
// import { useHistory } from "react-router-dom";

// export const GameContext = createContext();

// export const GameProvider = (props) => {
//     let history = useHistory();
//     const [inputGame, setInputGame] = useState({
//         genre: "",
//         image_url: "",
//         singlePlayer: "",
//         multiPlayer: "",
//         name: "",
//         platform: "",
//         release: "",
//     });
//     const functionDetailGame = (id) => {
//         history.push(`/games/detail/${id}`);
//     };

//     return (
//         <GameContext.Provider
//             value={{
//                 inputGame,
//                 setInputGame,
//                 functionDetailGame,
//             }}
//         >
//             {props.children}
//         </GameContext.Provider>
//     )
    
// }