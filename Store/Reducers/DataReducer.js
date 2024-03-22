
const initialState = {
  // liste des joueurs : player = {nom, score}
  players : [],
  // liste des thèmes déjà utilisés lors d'une partie
  idThemesUsed: [],
  // id du thème en cours
  idCurrentTheme : 0,
  // id du joueur qui a l'enchère le plus élevé
  idCurrentPlayer : 0,
  // enchère le plus élevé
  currentBet: 0,
  // MaJ du theme
  updateTheme: false,
  // MaJ des enchères éphémère
  updateCounts: false,
  // MaJ du chronométre
  updateGo: false,
  // affichage du tutoriel
  showRealApp : false
}

const managementData = (state = initialState, action) => {
  let nextState
  switch (action.type) {

    // suppression d'un joueur
    case "DELETE_PLAYER":
      nextState = {
        ...state,
        players: state.players.filter((item, _) => item !== action.value),
      };
      return nextState || state;

    // ajout d'un joueur
    case 'ADD_PLAYER':
      nextState = {
        ...state,
        players: [action.value, ...state.players,],
      }
      return nextState || state

      // ajout d'un joueur
      case 'UPDATE_PLAYER':
      let updatedPlayer = state.players.find((item, _) => item.id === action.value.id)
      updatedPlayer.name = action.value.name
      const newPlayers = state.players.filter((item, _) => item !== action.value)
      console.log(updatedPlayer);
      console.log(action.value.name);
        nextState = {
          ...state,
          newPlayers: [...state.players, updatedPlayer],
        }
        return nextState || state


    // initialisation de la liste des joueurs
    case 'INIT_PLAYER':
      nextState = {
        ...state,
        players: []
      }
      return nextState || state

    // ajout de l'id du thème dans la liste des thèmes utilisés
    case 'ADD_THEME':
      nextState = {
        ...state,
        idThemesUsed: [...state.idThemesUsed, action.value]
      }
      return nextState || state

      // reinitialise les themes utilisés
      case 'RESET_THEME':
        nextState = {
          ...state,
          idThemesUsed: []
        }
        return nextState || state

    // modification du thème en cours
    case 'MODIFY_CURRENT_THEME':
      nextState = {
        ...state,
        idCurrentTheme: action.value
      }
      return nextState || state

    // faut-il modifier le thème
    case 'UPDATE_THEME':
      nextState = {
        ...state,
        updateTheme: action.value
      }
      return nextState || state

    // faut-il modifier les enchères éphémères
    case 'UPDATE_COUNTS':
      nextState = {
        ...state,
        updateCounts: action.value
      }
      return nextState || state

    case 'UPDATE_SELECTED':
    const newPlayersSelected = [...state.players]
    newPlayersSelected.find(item => item.id == action.value.id).isSelected =
      !newPlayersSelected.find(item => item.id == action.value.id).isSelected

      nextState = {
          ...state,
          players: newPlayersSelected,
      }
      return nextState || state

    // modif de l'enchère le plus élevé
    case 'UPDATE_CURRENT_BET':
      nextState = {
        ...state,
        currentBet: action.value
      }
      return nextState || state

    // modification du joueur qui a l'enchère le plus élevé
    case 'UPDATE_CURRENT_PLAYER':
      nextState = {
        ...state,
        idCurrentPlayer: action.value
      }
      return nextState || state

      // faut-il mettre à jour le chronométre
      case 'UPDATE_GO':
        nextState = {
          ...state,
          updateGo: action.value
        }
        return nextState || state

      // le joueur a réussi son pari, il gagne son enchère, les enchère sont
      // remis à 0
      case 'SUCCESS':
        const newPlayersSuccess = [...state.players]
        newPlayersSuccess.find(item => item.id == state.idCurrentPlayer).score =
          newPlayersSuccess.find(item => item.id == state.idCurrentPlayer).score + state.currentBet

        nextState = {
          ...state,
          players: newPlayersSuccess,
          currentBet: 1,
          updateTheme: true,
          updateCounts: true,
        }
        return nextState || state

      // le joueur n'a pas réussi son pari, la moitier des points est partagé
      // avec les autres joueurs, les enchères sont remis à 0
      case 'FAIL':
        const failScore =
          Math.floor((Math.floor(state.currentBet)/2)/(state.players.length-1))

        const newPlayersFail = [...state.players]
        newPlayersFail.forEach((item, i) => {
          if (item.id != state.idCurrentPlayer) {
            item.score = item.score + failScore
          }
        });


        nextState = {
          ...state,
          players: newPlayersFail,
          currentBet: 1,
          updateTheme: true,
          updateCounts: true,

        }
        return nextState || state

      // initialisation de la partie, on garde les mêmes joueurs mais leurs
      // scores sont à 0, la liste des thèmes est vide, il n'y a plus de thème
      // en cours d'utilisation, il faut mettre à jour le thème
      case 'INIT_GAME':
        const initScores = [...state.players]
        initScores.forEach((item, i) => {
          item.score = 0;
          item.isSelected = false;
        });

        nextState = {
          ...state,
          players: initScores,
          idThemesUsed: [],
          idCurrentTheme: 0,
          updateTheme: true,
          updateCounts: action.value
        }
        return nextState || state

        case 'UPDATE_PLAYER_SELECTED':
        const initIsSelected = [...state.players]
          initIsSelected.forEach((item, i) => {
            item.isSelected = false;
          });

        nextState = {
          ...state,
          players: initIsSelected
        }
        return nextState || state



      default:
        return state
  }
}

export default managementData
