# Load SSL module
LoadModule ssl_module modules/mod_ssl.so

# Listen on HTTPS port
Listen 443

# SSL Virtual Host
<VirtualHost *:443>
    ServerName www.yourdomain.com
    DocumentRoot "/var/www/html"

    SSLEngine on

    # Paths to your certificate files
    SSLCertificateFile "/etc/ssl/certs/yourdomain.crt"
    SSLCertificateKeyFile "/etc/ssl/private/yourdomain.key"
    SSLCertificateChainFile "/etc/ssl/certs/ca_bundle.crt"

    # Optional: Security headers
    <IfModule mod_headers.c>
        Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains"
    </IfModule>

    ErrorLog "/var/log/httpd/ssl_error.log"
    CustomLog "/var/log/httpd/ssl_access.log" combined
</VirtualHost>