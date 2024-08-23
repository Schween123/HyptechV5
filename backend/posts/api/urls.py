from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import OwnerViewSet, BoardingHouseViewSet, RoomViewSet, TenantViewSet, GuardianViewSet, TransactionViewSet, FaceImageViewSet, BillAcceptorView, UltrasonicSensorView, upload_face_image, test_fingerprint_read, check_fingerprint_match, upload_owner_face_image, recognize_face

router = DefaultRouter()
router.register(r'owners', OwnerViewSet)
router.register(r'boardinghouses', BoardingHouseViewSet)
router.register(r'rooms', RoomViewSet)
router.register(r'tenants', TenantViewSet)
router.register(r'guardians', GuardianViewSet)
router.register(r'transactions', TransactionViewSet)
router.register(r'faceimages', FaceImageViewSet)

# Include the router URLs
urlpatterns = router.urls

# Add the custom URL pattern for BillAcceptorView
urlpatterns += [
    path('bill-acceptor/', BillAcceptorView.as_view(), name='bill_acceptor'),
    path('sensor/', UltrasonicSensorView.as_view(), name='sensor_data'),
    path('adminfaceimages/', upload_face_image, name='upload_face_image'),
    path('fingerprint_read/', test_fingerprint_read, name='test_fingerprint_read'),
    path('check_fingerprint_match/', check_fingerprint_match, name='check_fingerprint_match'),
    path('upload_owner_face_image/', upload_owner_face_image, name='upload_owner_face_image'),
    path('recognize_face/', recognize_face, name='recognize_face'),
]