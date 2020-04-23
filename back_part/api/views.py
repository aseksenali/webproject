from django.shortcuts import render

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from api.models import Book, Genre, Author
from api.serializer import GenreSerializer, AuthorSerializer, BookSerializer

class AuthorListAPIView(generics.ListCreateAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class GenreListAPIView(generics.ListCreateAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

class BookListAPIView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer