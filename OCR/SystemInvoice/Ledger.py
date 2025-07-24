             }
import datetime
import uuid

class Transaction:
    def __init__(self, account_id, type, amount, description):
        self.id = str(uuid.uuid4())
        self.account_id = account_id
        self.type = type  # 'incoming' or 'outgoing'
        self.amount = amount
        self.description = description
        self.timestamp = datetime.datetime.now()

class InvoiceLedger:
    def __init__(self):
        self.transactions = []

    def add_transaction(self, account_id, type, amount, description):
        txn = Transaction(account_id, type, amount, description)
        self.transactions.append(txn)
        return txn

    def print_invoice(self, account_id):
        print(f"\n🧾 Invoice for Account: {account_id}")
        for txn in self.transactions:
            if txn.account_id == account_id:
                print(f"[{txn.timestamp}] {txn.type.upper()} - ${txn.amount}: {txn.description}")

    def export_xml(self, account_id):
        from xml.etree.ElementTree import Element, SubElement, tostring

        root = Element("Invoice")
        for txn in self.transactions:
            if txn.account_id == account_id:
                tx_elem = SubElement(root, "Transaction")
                SubElement(tx_elem, "Type").text = txn.type
                SubElement(tx_elem, "Amount").text = str(txn.amount)
                SubElement(tx_elem, "Description").text = txn.description
                SubElement(tx_elem, "Timestamp").text = txn.timestamp.isoformat()

        print(tostring(root, encoding='unicode'))