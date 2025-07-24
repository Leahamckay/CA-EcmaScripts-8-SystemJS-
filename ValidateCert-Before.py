from cryptography import x509
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding

def verify_certificate(cert_pem, trusted_ca_pem):
    cert = x509.load_pem_x509_certificate(cert_pem.encode(), default_backend())
    ca_cert = x509.load_pem_x509_certificate(trusted_ca_pem.encode(), default_backend())
    try:
        ca_cert.public_key().verify(
            cert.signature,
            cert.tbs_certificate_bytes,
            padding.PKCS1v15(),
            cert.signature_hash_algorithm
        )
        return True
    except Exception as e:
        print(f"Cert verification failed: {e}")
        return False