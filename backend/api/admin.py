from django.contrib import admin
from .models import UserAccount
from django.contrib.auth.admin import UserAdmin  as BaseUserAdmin

# Register your models here.
class UserAccountAdmin(BaseUserAdmin):
    model=UserAccount
    list_display = ('id','name','email','phonenumber','date_joined')
    list_display_links = ('id','email')
    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()
    ordering = ('-date_joined',)
admin.site.register(UserAccount , UserAccountAdmin)