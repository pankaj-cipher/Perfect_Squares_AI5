import numpy as np
import pandas as pd
import pickle
import os
import base64
from PIL import Image
import PIL
from io import BytesIO
import matplotlib.pyplot as plt
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras.applications.vgg16 import preprocess_input
from tensorflow.keras.preprocessing.sequence import pad_sequences
import tensorflow as tf
with open('./AI5_model_final','rb') as file:
  m = pickle.load(file)
  model = m['model_caption']
  modelvgg = m['model_vgg']

with open('./AI5_token_final','rb') as file:
  t = pickle.load(file)
  tokenizer = t['token']

class pred():

    def decode_base64(self, b64image):
        img = Image.open(BytesIO(base64.b64decode(b64image)))
        return img

    def preprocessing_image(self, image):
        img = self.decode_base64(image)
        img = img.resize((224, 224), PIL.Image.NEAREST)
        # plt.imshow(img)
        # plt.show()
        nimage = img_to_array(img)
        nimage = preprocess_input(nimage)
        y_pred = modelvgg.predict(nimage.reshape((1,) + nimage.shape[:3]), verbose=0)
        y_pred = y_pred.flatten().reshape(1, 4096)
        return y_pred

    def predict_caption(self, data):
        '''
        image.shape = (1,4096)
        '''
        image = data['image']
        maxlen = 30
        image = self.preprocessing_image(image)
        index_word = dict([(index, word) for word, index in tokenizer.word_index.items()])
        in_text = 'startseq'
        for iword in range(maxlen):
            sequence = tokenizer.texts_to_sequences([in_text])[0]
            sequence = pad_sequences([sequence], maxlen)
            yhat = model.predict([image, sequence], verbose=0)
            yhat = np.argmax(yhat)
            newword = index_word[yhat]
            in_text += " " + newword
            if newword == "endseq":
                break
        return {'text':in_text}
