from django.db import models
from datetime import datetime

# Create your models here.
class Todo(models.Model):
	title = models.CharField(max_length=200)
	body = models.TextField()
	date_created = models.DateTimeField(auto_now_add=True, blank=True)

	def __str__(self):
		return self.title																									
