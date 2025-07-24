# OCR using pytesseract
import pytesseract
from PIL import Image

text = pytesseract.image_to_string(Image.open('certificate.jpg'))

# Sample post-processing: create XML format
import xml.etree.ElementTree as ET

certificate = ET.Element("Certificate")
content = ET.SubElement(certificate, "Content")
content.text = text

xml_str = ET.tostring(certificate, encoding='unicode')
print(xml_str)