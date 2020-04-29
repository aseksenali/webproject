from django.db import models


# Create your models here.

class Genre(models.Model):
    name = models.CharField(max_length=200)


class Author(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Book(models.Model):
    name = models.CharField(max_length=200)
    price = models.FloatField()
    genres = models.ManyToManyField(Genre, related_name='genres')
    authors = models.ManyToManyField(Author, related_name='authors')
    year = models.IntegerField()
    cover = models.CharField(max_length=200)
    language = models.CharField(max_length=100)
    image = models.TextField()
    rating = models.FloatField()
    description = models.TextField()
