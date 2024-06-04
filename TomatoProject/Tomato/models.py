from django.db import models

# Create your models here.

class user(models.Model):
    user_id = models.AutoField
    user_name = models.CharField(max_length=20)
    user_email = models.EmailField(max_length=20)
    user_password = models.CharField(max_length=20)
    user_account = models.CharField(max_length=20)

    def __str__(self):
        return self.user_name

        
class Product(models.Model):
    food_id = models.AutoField
    food_name = models.CharField(max_length=20)
    food_image = models.ImageField(upload_to='food-menu/')
    
    def __str__(self):
        return self.food_name


class food_item(models.Model):
    food_item_image = models.ImageField(upload_to='food-images/')
    food_item_name = models.CharField(max_length=20)
    food_item_price = models.IntegerField()
    food_item_description = models.CharField(max_length=100)
    food_item_category = models.CharField(max_length=20)
    
    def __str__(self):
        return self.food_item_name