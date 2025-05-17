#generics permite crear vistas genericas
from rest_framework import generics
from .serializers import PostSerializer
from .models import Post

# Se crea una clase gererica que hereda de LstCreateAPIView
#LsitCreateAPIView permite listar y crear objetos
class ListarTodo(generics.ListCreateAPIView):
    queryset = Post.objects.all() 
    serializer_class= PostSerializer 

# Se crea una clase gererica que hereda de RetrieveUpdateDestroyAPIView
# que permite boterner, actualizar y eliminar objetos a através de un campo especifico
class ObtenerActualizarBorrar(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer