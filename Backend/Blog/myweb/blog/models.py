from django.db import models

# Create your models here.
#modelo que representa una tabla de la base de datos
class Post(models.Model):
    titulo=models.CharField(max_length=100)
    contenido=models.TextField()
    fecha_creacion=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titulo