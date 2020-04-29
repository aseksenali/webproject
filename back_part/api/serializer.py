from rest_framework import serializers

from .models import Genre, Author, Book


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']

    def create(self, validated_data):
        selected = Genre.objects.filter(**validated_data)
        if len(selected) != 0:
            return
        Genre.objects.create(Genre(**validated_data))


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'name']

    def create(self, validated_data):
        selected = Author.objects.filter(**validated_data)
        if len(selected) != 0:
            return
        Author.objects.create(Genre(**validated_data))


class BookSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True)
    authors = AuthorSerializer(many=True)

    def create(self, validated_data):
        genres_data = validated_data.pop('genres')
        authors_data = validated_data.pop('authors')
        book = Book.objects.create(**validated_data)
        for genre_data in genres_data:
            genre = Genre.objects.filter(**genre_data)
            if len(genre) != 0:
                genre = genre.first()
            else:
                genre = Genre.objects.create(**genre_data)
            book.genres.add(genre)
        for author_data in authors_data:
            author = Author.objects.filter(**author_data)
            if len(author) != 0:
                author = author.first()
            else:
                author = Author.objects.create(**author_data)
            book.authors.add(author)
        return book

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.price = validated_data.get('price', instance.price)
        instance.year = validated_data.get('year', instance.year)
        instance.cover = validated_data.get('cover', instance.cover)
        instance.language = validated_data.get('language', instance.language)
        instance.image = validated_data.get('image', instance.image)
        instance.rating = validated_data.get('rating', instance.rating)
        instance.description = validated_data.get('description', instance.description)
        for genre in instance.genres.all():
            if genre.name not in [name for name in map(lambda data: data['name'], validated_data.get('genres'))]:
                Genre.delete(genre)
        for genre_data in validated_data.get('genres'):
            if genre_data['name'] not in [name for name in map(lambda g: g.name, instance.genres.all())]:
                instance.genres.add(Genre.objects.create(**genre_data))

        for author in instance.authors.all():
            if author.name not in [name for name in map(lambda data: data['name'], validated_data.get('authors'))]:
                Author.delete(author)
        for author_data in validated_data.get('authors'):
            if author_data['name'] not in [name for name in map(lambda a: a.name, instance.authors.all())]:
                instance.authors.add(Author.objects.create(**author_data))
        instance.save()
        return instance

    def delete(self, instance):
        return instance

    class Meta:
        model = Book
        fields = '__all__'
