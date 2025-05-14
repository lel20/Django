from django.contrib import admin
#importamos y regristamos el modelo Post en admin
from .models import Post
admin.site.register(Post)
