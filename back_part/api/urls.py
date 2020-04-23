from django.urls import path, include
from api import views

urlpatterns = [
    path('api/books', views.BookListAPIView.as_view()),
    path('api/genres', views.GenreListAPIView.as_view()),
    path('api/authors', views.AuthorListAPIView.as_view()),
]