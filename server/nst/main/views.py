from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import StyleSerializer, UploadSerializer
from .models import Style, Upload
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .utils import style
import tensorflow as tf
import os
import time
import cv2

# Create your views here.
class StyleView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        posts = Style.objects.all()
        serializer = StyleSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        posts_serializer = StyleSerializer(data=request.data)
        if posts_serializer.is_valid():
            posts_serializer.save()
            return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        posts = Upload.objects.all()
        serializer = UploadSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        posts_serializer = UploadSerializer(data=request.data)
        if posts_serializer.is_valid():
            posts_serializer.save()
            filename = request.data["image"]
            link = request.data["link"]
            print("FILENAME: ", filename)
            print("LINK: ", str(link))
            extension = link.split(".")[-1]
            s = "/"
            dir_path = os.path.dirname(os.path.realpath(__file__)).split(s)[:-1]
            dir_path = s.join(dir_path)
            try:
                style_path = tf.keras.utils.get_file(f"{time.time()}.{extension}", link)
            except:
                style_path = dir_path + f"/media/upload_images/{filename}"
            style(dir_path + f"/media/upload_images/{filename}", style_path, filename)
            return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)