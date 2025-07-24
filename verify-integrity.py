import hashlib

def sha256(data):
    return hashlib.sha256(data.encode()).hexdigest()

def merkle_tree(digests):
    while len(digests) > 1:
        if len(digests) % 2 != 0:
            digests.append(digests[-1])  # Duplicate last if odd
        digests = [
            sha256(digests[i] + digests[i+1])
            for i in range(0, len(digests), 2)
        ]
    return digests[0]  # Merkle root