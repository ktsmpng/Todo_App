from rest_framework import generics

# Create your views here.
from .models import Todo
from .serializers import TodoSerializer

class ListTodo(generics.ListAPIView):
	queryset = Todo.objects.all()
	serializer_class = TodoSerializer

class DetailTodo(generics.RetrieveAPIView):
	queryset = Todo.objects.all()
	serializer_class = TodoSerializer
