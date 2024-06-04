from django.contrib import admin

# Register your models here.
from .models import Product, food_item, user


admin.site.register(user)
admin.site.register(Product)
admin.site.register(food_item)