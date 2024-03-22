import AsyncStorage from '@react-native-async-storage/async-storage';

// Pour stocker les données
export const setUserChoice = (choice) => async (dispatch) => {
  try {
    dispatch({
      type: 'SET_USER_CHOICE',
      payload: choice,
    });

    // Enregistrez également le choix dans AsyncStorage
    await AsyncStorage.setItem('userChoice', choice.toString());
    console.log('Choix enregistré avec succès:', choice);
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement des données : ', error);
  }
};

// Pour récupérer les données
export async function getTutoSettings(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // Les données ont été récupérées avec succès
      return value;
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données : ', error);
  }
};

// Pour récupérer les données
export async function removeTutpSettings (key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Erreur lors de la récupération des données : ', error);
  }
};
