from django.db import models

class Owner(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    fingerprint = models.BinaryField(null=True, blank=True)
    face_image = models.CharField(max_length=255, null=True, blank=True)
    address = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class BoardingHouse(models.Model):
    bh_name = models.CharField(max_length=255, unique=True)
    address = models.CharField(max_length=255)
    capacity = models.IntegerField(default=0)
    number_of_tenants = models.IntegerField(default=0)
    number_of_rooms = models.IntegerField(default=0)
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)

    def __str__(self):
        return self.bh_name

class Room(models.Model):
    room_id = models.AutoField(primary_key=True)
    boarding_house = models.ForeignKey(BoardingHouse, on_delete=models.CASCADE)
    room_number = models.CharField(max_length=15)
    capacity = models.IntegerField(null=True, blank=True)
    available_beds = models.IntegerField(null=True, blank=True)
    tenants = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"{self.boarding_house.bh_name} - {self.room_number}"

class Tenant(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    image_id = models.IntegerField()
    gender = models.CharField(max_length=50)
    age = models.IntegerField()
    course_profession = models.CharField(max_length=255)
    school_company = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)
    monthly_due = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    monthly_due_date = models.DateField(null=True, blank=True)
    guardian = models.ForeignKey('Guardian', on_delete=models.SET_NULL, null=True, blank=True, related_name='tenants')
    room = models.ForeignKey(Room, on_delete=models.SET_NULL, null=True, blank=True)
    initial_payment = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Guardian(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)
    address = models.CharField(max_length=255)
    relationship = models.CharField(max_length=255, default='')
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='guardians')

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Transaction(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    transaction_date = models.DateField()
    transaction_time = models.TimeField()
    mode_of_payment = models.CharField(max_length=50)
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2)
    month_status = models.DateField()
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)

class FaceImage(models.Model):
    image_id = models.AutoField(primary_key=True)
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    face_image = models.BinaryField()
    time_stamp = models.DateTimeField(auto_now_add=True)
    
class AdminFaceImage(models.Model):
    image = models.ImageField(upload_to='admin_faces/')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Face Image {self.id} - {self.created_at}"