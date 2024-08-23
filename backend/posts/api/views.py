from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import RPi.GPIO as GPIO
import time
from rest_framework.decorators import api_view
import os
from django.http import JsonResponse
import serial
import adafruit_fingerprint
from pyfingerprint.pyfingerprint import PyFingerprint
import base64
import face_recognition

from ..models import Owner, BoardingHouse, Room, Tenant, Guardian, Transaction, FaceImage
from .serializers import OwnerSerializer, BoardingHouseSerializer, RoomSerializer, TenantSerializer, GuardianSerializer, TransactionSerializer, FaceImageSerializer

# ModelViewSets for CRUD operations
class OwnerViewSet(viewsets.ModelViewSet):
    queryset = Owner.objects.all()
    serializer_class = OwnerSerializer

class BoardingHouseViewSet(viewsets.ModelViewSet):
    queryset = BoardingHouse.objects.all()
    serializer_class = BoardingHouseSerializer

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class TenantViewSet(viewsets.ModelViewSet):
    queryset = Tenant.objects.all()
    serializer_class = TenantSerializer

class GuardianViewSet(viewsets.ModelViewSet):
    queryset = Guardian.objects.all()
    serializer_class = GuardianSerializer

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class FaceImageViewSet(viewsets.ModelViewSet):
    queryset = FaceImage.objects.all()
    serializer_class = FaceImageSerializer

# Bill Acceptor GPIO Interaction
class BillAcceptorView(APIView):
    billAcceptorPin = 7  # Physical Pin 7 (GPIO4)
    ledPin = 13          # Physical Pin 13 (GPIO27)
    inhibitPin = 11      # Physical Pin 11 (GPIO17)
    pulseDtct = 0        # Counter for consecutive pulses
    lastPulseTime = 0    # Stores the time when the last pulse was detected
    pulseDelay = 0.5     # Maximum delay between pulses in seconds

    def setup_gpio(self):
        GPIO.setmode(GPIO.BOARD)
        GPIO.setup(self.billAcceptorPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
        GPIO.setup(self.ledPin, GPIO.OUT)
        GPIO.setup(self.inhibitPin, GPIO.OUT)
        GPIO.output(self.ledPin, GPIO.LOW)
        GPIO.output(self.inhibitPin, GPIO.LOW)

    def detect_bill(self):
        start_time = time.time()
        bill_value = 0
        pulse_detected = False

        while time.time() - start_time < 30:
            pinState = GPIO.input(self.billAcceptorPin)
            currentTime = time.time()

            if pinState == GPIO.LOW:
                GPIO.output(self.ledPin, GPIO.HIGH)

                if currentTime - self.lastPulseTime <= self.pulseDelay:
                    self.pulseDtct += 1
                else:
                    self.pulseDtct = 1

                self.lastPulseTime = currentTime
                pulse_detected = True

            else:
                GPIO.output(self.ledPin, GPIO.LOW)

            if pulse_detected and (currentTime - self.lastPulseTime > self.pulseDelay):
                if self.pulseDtct == 10:
                    bill_value = 100
                elif self.pulseDtct == 2:
                    bill_value = 20
                elif self.pulseDtct == 5:
                    bill_value = 50
                elif self.pulseDtct == 20:
                    bill_value = 200
                elif self.pulseDtct == 50:
                    bill_value = 500
                elif self.pulseDtct == 100:
                    bill_value = 1000
                break

            time.sleep(0.05)

        self.pulseDtct = 0
        return bill_value

    def get(self, request, format=None):
        try:
            self.setup_gpio()
            bill_value = self.detect_bill()
            GPIO.cleanup()
            return Response({'bill_value': bill_value}, status=status.HTTP_200_OK)
        except Exception as e:
            GPIO.cleanup()
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Ultrasonic Sensor GPIO Interaction
class UltrasonicSensorView(APIView):
    def initialize_gpio(self):
        GPIO.setmode(GPIO.BCM)
        self.GPIO_TRIGGER = 23
        self.GPIO_ECHO = 24
        GPIO.setup(self.GPIO_TRIGGER, GPIO.OUT)
        GPIO.setup(self.GPIO_ECHO, GPIO.IN)

    def get_distance(self):
        GPIO.output(self.GPIO_TRIGGER, True)
        time.sleep(0.00001)
        GPIO.output(self.GPIO_TRIGGER, False)

        start_time = time.time()
        stop_time = time.time()

        while GPIO.input(self.GPIO_ECHO) == 0:
            start_time = time.time()

        while GPIO.input(self.GPIO_ECHO) == 1:
            stop_time = time.time()

        time_elapsed = stop_time - start_time
        distance = (time_elapsed * 34300) / 2
        return distance

    def get(self, request, format=None):
        try:
            self.initialize_gpio()
            distance = self.get_distance()
        finally:
            GPIO.cleanup()
        return Response({'distance': distance}, status=status.HTTP_200_OK)

# Face Image Upload
@api_view(['POST'])
def upload_face_image(request):
    image = request.FILES.get('image')
    first_name = request.POST.get('firstName', 'undefined')

    if image:
        filename = f"{first_name}.jpg"
        save_path = os.path.join('/home/user/Faces/Admin', filename)
        with open(save_path, 'wb+') as destination:
            for chunk in image.chunks():
                destination.write(chunk)
        return JsonResponse({'status': 'success', 'message': 'Image uploaded successfully'})
    return JsonResponse({'status': 'error', 'message': 'No image uploaded'})

# Fingerprint Enrollment and Verification
try:
    uart = serial.Serial("/dev/serial0", baudrate=57600, timeout=1)
    finger = adafruit_fingerprint.Adafruit_Fingerprint(uart)
except Exception as e:
    uart = None
    print(f"Error initializing serial connection: {e}")

@api_view(['GET'])
def test_fingerprint_read(request):
    if uart is None:
        return Response({'status': 'error', 'message': 'Serial connection failed'}, status=500)

    while finger.get_image() != adafruit_fingerprint.OK:
        pass

    if finger.image_2_tz(1) != adafruit_fingerprint.OK:
        return Response({'status': 'error', 'message': 'Failed to convert first fingerprint image to template'}, status=400)

    while finger.get_image() == adafruit_fingerprint.OK:
        pass

    while finger.get_image() != adafruit_fingerprint.OK:
        pass

    if finger.image_2_tz(2) != adafruit_fingerprint.OK:
        return Response({'status': 'error', 'message': 'Failed to convert second fingerprint image to template'}, status=400)

    if finger.create_model() != adafruit_fingerprint.OK:
        return Response({'status': 'error', 'message': 'Failed to create fingerprint model'}, status=400)

    if finger.store_model(1) != adafruit_fingerprint.OK:
        return Response({'status': 'error', 'message': 'Failed to store fingerprint model in sensor'}, status=500)

    fingerprint_data = finger.get_fpdata('char', 1)
    fingerprint_data_base64 = base64.b64encode(bytes(fingerprint_data)).decode('utf-8')

    return Response({
        'status': 'success',
        'message': 'Fingerprint enrolled successfully!',
        'fingerprint_data_base64': fingerprint_data_base64
    })

@api_view(['GET'])
def check_fingerprint_match(request):
    if uart is None:
        return Response({'status': 'error', 'message': 'Serial connection failed'}, status=500)

    try:
        while finger.get_image() != adafruit_fingerprint.OK:
            pass

        if finger.image_2_tz(1) != adafruit_fingerprint.OK:
            return Response({'status': 'error', 'message': 'Failed to convert fingerprint image to template'}, status=400)

        stored_fingerprints = Owner.objects.values_list('fingerprint', flat=True)

        if not stored_fingerprints:
            return Response({'status': 'error', 'message': 'No fingerprints found in the database.'}, status=404)

        for stored_fp in stored_fingerprints:
            try:
                finger.send_fpdata(stored_fp, "char", 2)
                if finger.compare_templates() == adafruit_fingerprint.OK:
                    return Response({'status': 'success', 'message': 'Fingerprint match found!'})
            except Exception as e:
                continue

        return Response({'status': 'error', 'message': 'No match found'}, status=404)
    except Exception as e:
        return Response({'status': 'error', 'message': f'Unhandled exception: {str(e)}'}, status=500)

# Face Image Upload and Recognition
@api_view(['POST'])
def upload_owner_face_image(request):
    first_name = request.POST.get('first_name', 'undefined')
    last_name = request.POST.get('last_name', 'undefined')
    image = request.FILES.get('image')

    if image:
        binary_data = image.read()
        Owner.objects.create(
            first_name=first_name,
            last_name=last_name,
            face_image=binary_data,
            address=request.POST.get('address', ''),
            phone_number=request.POST.get('phone_number', '')
        )
        return JsonResponse({'status': 'success', 'message': 'Image uploaded and saved successfully'})

    return JsonResponse({'status': 'error', 'message': 'No image uploaded'})

@api_view(['POST'])
def recognize_face(request):
    if request.method == 'POST' and request.FILES.get('image'):
        image = request.FILES['image']
        temp_image_path = '/tmp/temp_image.jpg'
        with open(temp_image_path, 'wb+') as temp_image_file:
            for chunk in image.chunks():
                temp_image_file.write(chunk)

        temp_image = face_recognition.load_image_file(temp_image_path)
        temp_encoding = face_recognition.face_encodings(temp_image)[0]

        for file_name in os.listdir('/home/user/Faces/Admin'):
            if file_name.endswith('.jpg') or file_name.endswith('.png'):
                saved_image_path = f'/home/user/Faces/Admin/{file_name}'
                saved_image = face_recognition.load_image_file(saved_image_path)
                saved_encoding = face_recognition.face_encodings(saved_image)[0]

                matches = face_recognition.compare_faces([saved_encoding], temp_encoding)
                if matches[0]:
                    return JsonResponse({'status': 'success', 'matched': True, 'matched_file': file_name})

        return JsonResponse({'status': 'success', 'matched': False})
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)
