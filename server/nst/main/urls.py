from django.urls import path
from . import views

urlpatterns = [
    path('styles/', views.StyleView.as_view(), name= 'styles_list'),
    path('uploads/', views.UploadView.as_view(), name= 'uploads_list'),
]