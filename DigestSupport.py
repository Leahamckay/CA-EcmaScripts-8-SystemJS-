from cryptography import x509
from cryptography.hazmat.primitives import hashes

def validate_digest(cert_pem, expected_digest_hex):
    cert = x509.load_pem_x509_certificate(cert_pem.encode())
    digest = cert.fingerprint(hashes.SHA256())

    # Compare digest
    if digest.hex() == expected_digest_hex.lower():
        print("✅ Digest matches certificate.")
        return True
    else:
        print("❌ Digest mismatch.")
        return False