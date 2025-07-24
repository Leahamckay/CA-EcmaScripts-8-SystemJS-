# Example OpenSSL usage with extensions
openssl req -new -key client.key -out client.csr -config ext.conf
openssl x509 -req -in client.csr -CA root.crt -CAkey root.key -set_serial 02 -out client.crt -extfile ext.conf