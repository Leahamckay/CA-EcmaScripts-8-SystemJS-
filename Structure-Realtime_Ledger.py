# Basic structure for real-time ledger
class RealTimeLedger:
    def __init__(self):
        self.transactions = []

    def record_transaction(self, source, amount, description):
        txn = {
            "id": str(uuid.uuid4()),
            "source": source,
            "amount": amount,
            "description": description,
            "timestamp": datetime.datetime.now()
        }
        self.transactions.append(txn)

    def load_preset(self, preset_name):
        # Example preset
        presets = {
            "monthly_subscription": [("Stripe", 9.99, "Premium Plan"), ("PayPal", 5.99, "Add-on Service")],
            "invoice_batch": [("BankTransfer", 250, "Client Invoice"), ("CreditCard", 100, "Refund")]
        }
        for entry in presets.get(preset_name, []):
            self.record_transaction(*entry)