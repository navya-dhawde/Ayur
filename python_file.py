# from PIL import Image
import numpy as np
import cv2
import sys
from tensorflow.keras.models import load_model
import tensorflow as tf
from tensorflow.keras import layers, models
# from kerastuner.tuners import Hyperband
import tensorflow_hub as hub
# import matplotlib.pyplot as plt

TF_ENABLE_ONEDNN_OPTS=0


class_names = ['Lemongrass','Neem','Palak(Spinach)','Tulsi','Turmeric']



def load_pretrained_model():
    # Load your pretrained ML model
    model = load_model('model_avg_25.h5')
    if model== None:
        print("No")


    return model

# Load your pretrained ML model
model = load_pretrained_model()

# Function to predict a single image
def predict(model, image):
    predictions = model.predict(np.expand_dims(image, axis=0), verbose=0)
    predicted_class = np.argmax(predictions)
    confidence = np.max(predictions) * 100
    return predicted_class, confidence

def process_image(img_path):
    img = cv2.imread(img_path)
    resized_image = cv2.resize(img, (299, 299))  # Resize the image
    return predict(model, resized_image)

if __name__ == "__main__":
    # image_path = sys.argv[1]
    image_data = sys.stdin.buffer.read()

# Process the image data here
# For example, you can save the image to a file
    with open("processed_image.jpg", "wb") as f:
        f.write(image_data)
    
    image_path = "processed_image.jpg"
    predictions = process_image(image_path)
    label = class_names[predictions[0]]
    print(label)
    print(predictions[1])

