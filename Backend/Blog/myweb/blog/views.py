from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import PostSerializer
# Create your views here.
from .models import Post

@api_view(['GET']) # Decorador que indica que la vista solo acpeta peticiones GET
def home(request):
    posts = Post.objects.all() #Se obtienen todos los objetos de la base de datos
    serializador= PostSerializer(posts, many= True) # Se serializan los objetos a JSON
    return Response(serializador.data) #Retrona la respuesta en formato JSON