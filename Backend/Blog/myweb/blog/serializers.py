from rest_framework import serializers
from .models import Post
# En este archivo se definen lo serializadores que se encargan de convertir los 
# objetos de la base de datos en formato JSON
class PostSerializer(serializers.ModelSerializer):
    """La cllase Meta se utiliza para definir los campos que se van a serializar y 
    el modelo que se va a utilizar """
    class Meta:
        model = Post
        fields = ['id', 'titulo', 'contenido', 'fecha_creacion']