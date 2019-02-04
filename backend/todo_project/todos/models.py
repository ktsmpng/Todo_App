from django.db import models
from datetime import date

# Create your models here.
class Todo(models.Model):
	title = models.CharField(max_length=200)
	body = models.TextField()
	date_created = models.DateTimeField(auto_now_add=True, blank=True)
	date_due = models.DateField(blank=True, default=date.today)

	def __str__(self):
		return self.title																									
