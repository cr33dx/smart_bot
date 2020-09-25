import os
import tensorflow as tf
from tensorflow import keras
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from PIL import Image
import requests
from io import BytesIO
import numpy as np
import pprint
import random
#
#
# class ActionHelloWorld(Action):
#
#     def name(self) -> Text:
#         return "action_hello_world"
#
#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#
#         dispatcher.utter_message(text="Hello World!")
#
#         return []

pp = pprint.PrettyPrinter(indent=4)
def getFact(entity):
    message = []
    data = [
            {'grizzly' : [
                "Grizzlies can vary in color, from light cream to brown to black.",
                "They are distinguished from black bears by a hump on their back. The hump is a mass of muscles used for digging."
                ]
            },
            {'panda':[
                "Pandas are shy; they don't venture into areas where people live. This restricts pandas to very limited areas.",
                "Prehistoric pandas lived up to 2 million years ago"
                ]
            },
            {'polar':[
                "Polar Bears are actually black, not white",
                "They can smell their prey up to a kilometer away"
                ]
            },
            {'sun':[
                "The sun bear is the smallest, most arboreal and least studied bear. It is the second rarest bear species, after the giant panda."
                ]
            }
        ]
    for i in data:
        for j in i:
            if(j == entity):
                message = i[j]
    return random.choice(message)
class ActionTest(Action):
    def __init__(self):
        self.class_names = ['grizzly', 'panda', 'polar', 'sun']
        self.model = tf.keras.models.load_model('/Users/cr33d/smart_bot/bot/actions/bearopedia.h5')
    def name(self):
        return 'action_predict_image'
    def run(self, dispatcher, tracker, domain):
        url = tracker.current_state()['events'][-1]['text']
        response = requests.get(url)
        img = Image.open(BytesIO(response.content))
        img = img.resize((159, 159))
        img_array = keras.preprocessing.image.img_to_array(img)
        img_array = tf.expand_dims(img_array, 0)
        predictions = self.model.predict(img_array)
        score = tf.nn.softmax(predictions[0])
        prediction = self.class_names[np.argmax(score)]
        #print("This image most likely belongs to {} with a {:.2f} percent confidence.".format(self.class_names[np.argmax(score)], 100 * np.max(score)))
        dispatcher.utter_message(
            text = f'''This image most likely belongs to {prediction} bear with a {100 * np.max(score):.2f} percent confidence. here's a fact about them:
             {getFact(prediction)}'''
        )

class SpitMessage(Action):
    def name(self):
        return 'action_facts'
    def run(self, dispatcher, tracker, domain):
        entity = tracker.latest_message['entities'][0].get('value')
        print(entity)

        dispatcher.utter_message(text = f'{getFact(entity)}')
        












