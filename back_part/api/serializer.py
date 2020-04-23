from rest_framework import serializers

from api.models import Book, Author, Genre

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['name']

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['name']

class BookSerializer(serializers.ModelSerializer):
    genres = serializers.StringRelatedField(many=True)
    authors = serializers.StringRelatedField(many=True)
    class Meta:
        model = Book
        fields = '__all__'