import hashlib, uuid, datetime

# Independent function for generating digests
def create_digest(data: str) -> str:
    return hashlib.sha256(data.encode()).hexdigest()

# Function to log transaction to ledger
def log_transaction(cert_id: str, digest: str, prev_hash: str) -> dict:
    timestamp = datetime.datetime.now().isoformat()
    entry_id = str(uuid.uuid4())
    entry_hash = create_digest(cert_id + digest + prev_hash + timestamp)
    return {
        "id": entry_id,
        "cert_id": cert_id,
        "digest": digest,
        "prev_hash": prev_hash,
        "timestamp": timestamp,
        "entry_hash": entry_hash
    }

# Certificate validation shell (extendable)
def validate_cert(cert_pem: str) -> bool:
    from cryptography import x509
    cert = x509.load_pem_x509_certificate(cert_pem.encode())
    # Add extension/parsing logic here
    return True  # Placeholder for actual validation