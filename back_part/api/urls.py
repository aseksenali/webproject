from django.urls import path

from .views import *

urlpatterns = [
    path('books/', BookListAPIView.as_view()),
    path('books/<int:book_id>', BookDetailAPIView.as_view()),
    path('genres/', GenreListAPIView.as_view()),
    path('genres/<int:genre_id>', GenreDetailsAPIView.as_view()),
    path('authors/', AuthorListAPIView.as_view()),
    path('authors/<int:author_id>', AuthorDetailsAPIView.as_view())
]