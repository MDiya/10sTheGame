import Theme from '../Helpers/FR_Theme'
import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Récupère le thème en fonction de l'id
export function getTheme(id){
  return  Theme.find(function(item){
   return item.id == id;}).name
}

// Récupère un id de thème aléatoirement dans la liste des thèmes pas encore
// utilisés sinon ils sont tous utilisés, récupère le premier thème
export function getRandomTheme(usedId:[]) {
  const themesNotUsed = Theme.filter((elem) => {
    return !usedId.some((ele) => {
      return  ele === elem.id ;
      });
    });
  var item = {id: 1}
  if (themesNotUsed.length > 0){
     item = themesNotUsed[Math.floor(Math.random()*themesNotUsed.length)];
  }
  return item.id
}

export function getLengthThemeList(){
  return Theme[0].length;
}

export function  _getPlayerName(){
  const players = useSelector((state) => state.players);
  const idCurrentPlayer = useSelector((state) => state.idCurrentPlayer);
    return players.filter(
      (item, _) => item.id == idCurrentPlayer)[0].name;
  }
