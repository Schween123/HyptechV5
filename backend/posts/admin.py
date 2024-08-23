from django.contrib import admin
from django.urls import path
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.db import connection
from .models import Owner, BoardingHouse, Room, Tenant, Guardian, Transaction, FaceImage

@admin.action(description='Reset Owner ID sequence')
def reset_owner_id_sequence(modeladmin, request, queryset):
    # Execute raw SQL depending on your database backend
    with connection.cursor() as cursor:
        if connection.vendor == 'postgresql':
            cursor.execute("ALTER SEQUENCE posts_owner_id_seq RESTART WITH 1;")
        elif connection.vendor == 'mysql':
            cursor.execute("ALTER TABLE posts_owner AUTO_INCREMENT = 1;")
        elif connection.vendor == 'sqlite':
            cursor.execute("DELETE FROM sqlite_sequence WHERE name='posts_owner';")

@admin.action(description='Reset BoardingHouse ID sequence')
def reset_boardinghouse_id_sequence(modeladmin, request, queryset):
    # Execute raw SQL depending on your database backend
    with connection.cursor() as cursor:
        if connection.vendor == 'postgresql':
            cursor.execute("ALTER SEQUENCE posts_boardinghouse_id_seq RESTART WITH 1;")
        elif connection.vendor == 'mysql':
            cursor.execute("ALTER TABLE posts_boardinghouse AUTO_INCREMENT = 1;")
        elif connection.vendor == 'sqlite':
            cursor.execute("DELETE FROM sqlite_sequence WHERE name='posts_boardinghouse';")

@admin.register(Owner)
class OwnerAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'address', 'phone_number', 'fingerprint')
    search_fields = ('first_name', 'last_name', 'address', 'phone_number')
    actions = [reset_owner_id_sequence]
    change_list_template = 'admin/posts/owner/change_list.html'
    
    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('reset-owner-id-sequence/', self.admin_site.admin_view(self.reset_owner_id_sequence), name='reset_owner_id_sequence'),
        ]
        return custom_urls + urls

    def reset_owner_id_sequence(self, request):
        with connection.cursor() as cursor:
            if connection.vendor == 'postgresql':
                cursor.execute("ALTER SEQUENCE posts_owner_id_seq RESTART WITH 1;")
            elif connection.vendor == 'mysql':
                cursor.execute("ALTER TABLE posts_owner AUTO_INCREMENT = 1;")
            elif connection.vendor == 'sqlite':
                cursor.execute("DELETE FROM sqlite_sequence WHERE name='posts_owner';")
        
        self.message_user(request, "Owner ID sequence has been reset.")
        return HttpResponseRedirect(reverse('admin:posts_owner_changelist'))

@admin.register(BoardingHouse)
class BoardingHouseAdmin(admin.ModelAdmin):
    list_display = ('bh_name', 'address', 'capacity', 'number_of_tenants', 'number_of_rooms', 'owner')
    search_fields = ('bh_name', 'address', 'owner__first_name', 'owner__last_name')
    list_filter = ('capacity', 'number_of_tenants', 'number_of_rooms')
    actions = [reset_boardinghouse_id_sequence]
    change_list_template = 'admin/posts/boardinghouse/change_list.html'
    
    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('reset-boardinghouse-id-sequence/', self.admin_site.admin_view(self.reset_boardinghouse_id_sequence), name='reset_boardinghouse_id_sequence'),
        ]
        return custom_urls + urls

    def reset_boardinghouse_id_sequence(self, request):
        with connection.cursor() as cursor:
            if connection.vendor == 'postgresql':
                cursor.execute("ALTER SEQUENCE posts_boardinghouse_id_seq RESTART WITH 1;")
            elif connection.vendor == 'mysql':
                cursor.execute("ALTER TABLE posts_boardinghouse AUTO_INCREMENT = 1;")
            elif connection.vendor == 'sqlite':
                cursor.execute("DELETE FROM sqlite_sequence WHERE name='posts_boardinghouse';")
        
        self.message_user(request, "BoardingHouse ID sequence has been reset.")
        return HttpResponseRedirect(reverse('admin:posts_boardinghouse_changelist'))

@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('boarding_house', 'room_number', 'capacity', 'available_beds')
    search_fields = ('boarding_house__bh_name', 'room_number')
    list_filter = ('capacity', 'available_beds')

@admin.register(Tenant)
class TenantAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'gender', 'age', 'course_profession', 'school_company', 'address', 'phone_number', 'monthly_due', 'monthly_due_date', 'room', 'initial_payment')
    search_fields = ('first_name', 'last_name', 'gender', 'course_profession', 'school_company', 'address', 'phone_number')
    list_filter = ('gender', 'age', 'course_profession', 'school_company')

@admin.register(Guardian)
class GuardianAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'phone_number', 'address', 'relationship', 'tenant')
    search_fields = ('first_name', 'last_name', 'phone_number', 'address', 'relationship', 'tenant__first_name', 'tenant__last_name')
    list_filter = ('relationship',)

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('transaction_id', 'transaction_date', 'transaction_time', 'mode_of_payment', 'amount_paid', 'month_status', 'tenant')
    search_fields = ('transaction_id', 'transaction_date', 'transaction_time', 'mode_of_payment', 'amount_paid', 'tenant__first_name', 'tenant__last_name')
    list_filter = ('transaction_date', 'transaction_time', 'mode_of_payment', 'amount_paid', 'month_status')

@admin.register(FaceImage)
class FaceImageAdmin(admin.ModelAdmin):
    list_display = ('image_id', 'tenant', 'time_stamp')
    search_fields = ('image_id', 'tenant__first_name', 'tenant__last_name')
    list_filter = ('time_stamp',)
