from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from back_part.models import Author, Genre, Book
from back_part.serializer import AuthorSerializer, GenreSerializer, BookSerializer


class AuthorListAPIView(generics.ListCreateAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    permission_classes = [IsAuthenticated, ]


class GenreListAPIView(generics.ListCreateAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_classes = [IsAuthenticated, ]


class BookListAPIView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated, ]


class BookDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    lookup_url_kwarg = 'book_id'
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated, ]
    
    def get_queryset(self):
        id = self.kwargs[self.lookup_url_kwarg]
        book = Book.objects.filter(id=id)
        return book


class AuthorDetailsAPIView(generics.RetrieveUpdateDestroyAPIView):
    lookup_url_kwarg = 'author_id'
    serializer_class = AuthorSerializer
    
    def get_queryset(self):
        id = self.kwargs[self.lookup_url_kwarg]
        author = Author.objects.filter(id=id)
        return author
    permission_classes = [IsAuthenticated, ]


class GenreDetailsAPIView(generics.RetrieveUpdateDestroyAPIView):
    lookup_url_kwarg = 'genre_id'
    serializer_class = AuthorSerializer
    
    def get_queryset(self):
        id = self.kwargs[self.lookup_url_kwarg]
        genre = Genre.objects.filter(id=id)
        return genre
    permission_classes = [IsAuthenticated, ]
