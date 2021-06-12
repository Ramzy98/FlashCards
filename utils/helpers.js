import { AsyncStorage } from "react-native";
export const FLASHCARDS_STORAGE_KEY = "FlashCards:data";

var decks;
export function generateID() {
  return Date.now();
}

export async function getDecks() {
  return await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then((Data) => {
    decks = JSON.parse(Data);
    return JSON.parse(Data);
  });
}

export function getDeck(id) {
  return decks[id];
}

export function saveDeckTitle(title) {
  var key = generateID();
  return AsyncStorage.mergeItem(
    FLASHCARDS_STORAGE_KEY,
    JSON.stringify({
      [key]: {
        title: title,
        questions: [],
      },
    })
  );
}
export function addCardToDeck(id, question, answer) {
  AsyncStorage.clear();
  decks[id].questions.push({
    question: question,
    answer: answer,
  });
  var newEntry = decks[id].questions;
  decks[id] = {
    ...decks[id],
    questions: newEntry,
  };
  AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks));
}
/*
getDecks: return all of the decks along with their titles, questions, and answers.
getDeck: take in a single id argument and return the deck associated with that id.
saveDeckTitle: take in a single title argument and add it to the decks.
addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.*/
