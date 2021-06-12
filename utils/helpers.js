import { AsyncStorage } from "react-native";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";
const FLASHCARDS_STORAGE_KEY = "FlashCards:data";
const NOTIFICATION_KEY = "FlashCards:notifications";
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

export function clearLocalNotification() {
  return AsyncStorage.removeItem("notification").then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

function createNotification() {
  return {
    title: "Take a quiz!",
    body: "👋 don't forget to study today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true,
    },
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate());
            tomorrow.setHours(18);
            tomorrow.setMinutes(50);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: "day",
            });

            AsyncStorage.setItem("notification", JSON.stringify(true));
          }
        });
      }
    });
}
