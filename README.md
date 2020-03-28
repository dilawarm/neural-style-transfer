# Neural style transfer

Neural style transfer is a class of algorithms to manipulate digital images to the style of another image by using deep neural networks. This [paper](https://arxiv.org/abs/1508.06576) explains the technique in much greater detail.

## This system

Users can upload an image, and choose a style (or add their own style), and get the style-transfered image!

## Model
The model that has been used here is a VGG19 model:
![](https://www.researchgate.net/profile/Clifford_Yang/publication/325137356/figure/fig2/AS:670371271413777@1536840374533/llustration-of-the-network-architecture-of-VGG-19-model-conv-means-convolution-FC-means.jpg)

To represent the style and content of the input image, we use the intermediate layers from the network. The layer used for the input image is `conv5_2`, and the layers for the style are `conv1_1, conv2_1, conv3_1, conv4_1 and conv5_1`. 

To calculate the style of the image, we calculate the Gram matrix which takes the outer product of the feature vector with itself at each location, and averaging that outer product over all locations:

<img src="https://render.githubusercontent.com/render/math?math=G_{cd}^l=\frac{\sum_{ij}{F_{ijc}^l(x)F_{ijd}^l(x)}}{IJ}">

The optimizer used here is `Adam`, even though the paper recommends `LBFGS`.

Here is the result of a basic implementation with my face styled with Kandinsky, with alpha=1e4 and beta=1e-2:

![](pics/style_noise_dilawar.png)

The noise in this result is a result of a lot of high frequency artifacts. By adding the _total variation loss_ to the loss we have from before, we get this result:

![](pics/stylized-image.png)

## How to run
_Under production ..._
