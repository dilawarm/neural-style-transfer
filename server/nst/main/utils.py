import tensorflow as tf
import numpy as np
import PIL.Image
import time
import functools
import tensorflow_hub as hub
import cv2
import os

def tensor_to_image(tensor):
    tensor = tensor*255
    tensor = np.array(tensor, dtype=np.uint8)
    if np.ndim(tensor)>3:
        assert tensor.shape[0] == 1
        tensor = tensor[0]
    return PIL.Image.fromarray(tensor)

def load_img(path_to_img):
    max_dim = 512
    img = tf.io.read_file(path_to_img)
    img = tf.image.decode_image(img, channels=3)
    img = tf.image.convert_image_dtype(img, tf.float32)

    shape = tf.cast(tf.shape(img)[:-1], tf.float32)
    long_dim = max(shape)
    scale = max_dim / long_dim

    new_shape = tf.cast(shape * scale, tf.int32)

    img = tf.image.resize(img, new_shape)
    img = img[tf.newaxis, :]
    return img

def style(content_path, style_path, filename):
    content_image = load_img(content_path)
    style_image = load_img(style_path)

    if style_path == content_path:
        stylized_image = tensor_to_image(style_image)
        img = cv2.cvtColor(np.array(stylized_image), cv2.COLOR_RGB2BGR);
    else:
        hub_module = hub.load('https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/1')
        stylized_image = hub_module(tf.constant(content_image), tf.constant(style_image))[0]
        stylized_image = tensor_to_image(stylized_image)
        img = cv2.cvtColor(np.array(stylized_image), cv2.COLOR_RGB2BGR)
    s = "/"
    dir_path = os.path.dirname(os.path.realpath(__file__)).split(s)[:-3]
    dir_path = s.join(dir_path)
    cv2.imwrite(dir_path + f'/client/public/ai_uploads/{filename}', img)
