from django.urls import path
from .views import ListarTodo, ObtenerActualizarBorrar

urlpatterns = [
    path('', ListarTodo.as_view(), name='home'),
    path('<int:pk>/',ObtenerActualizarBorrar.as_view() , name='post-detail'),  # detalle, update y delete
]