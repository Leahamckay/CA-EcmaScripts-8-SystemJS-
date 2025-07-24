def verify_chain(cert_pem, chain_pems):
    from cryptography import x509
    # Load cert and validate signatures through chain
    # Apply policies (e.g., expiration, purpose)