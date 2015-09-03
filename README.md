SDI4Apps Liferay portal
=======================

# Contents of repo

This repo contains Liferay modules used in SDI4Apps portal.

# Prerequisities

Installed apache, tomcat and deployed Liferay.

# Apache

To integrate more application to one domain mod_proxy is used. This is example of virtualhost

<code>
<VirtualHost *:80>
    ServerName portal.sdi4apps.eu

    ScriptAlias /cgi-bin/ /data/www/portal.sdi4apps.eu/cgi-bin/
    <Directory "/data/www/portal.sdi4apps.eu/cgi-bin">
        AllowOverride None
        Options +ExecCGI -MultiViews +FollowSymlinks
        AddHandler cgi-script .py
        Require all granted
    </Directory>

    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^/cas-server https://%{HTTP_HOST}%{REQUEST_URI}

    <Files "awstats.pl">
        AuthUserFile /etc/awstats/.htpasswd
        AuthName "Restricted Area For Customers"
        AuthType Basic
        require valid-user
    </Files>

    Alias /css /data/www/portal.sdi4apps.eu/css
    Alias /js /data/www/portal.sdi4apps.eu/js
    Alias /php /data/www/portal.sdi4apps.eu/php
    Alias /wwwlibs /data/www/portal.sdi4apps.eu/wwwlibs

    <Directory /data/www/portal.sdi4apps.eu/>
        Options +FollowSymLinks +MultiViews
        AllowOverride All
        Require all granted
        SetOutputFilter DEFLATE
    </Directory>

    ProxyPass /wwwlibs !
    ProxyPass /php !
    ProxyPass /js !
    ProxyPass /css !
    ProxyPass /cgi-bin !

    ProxyRequests Off

    ProxyPass /                  ajp://localhost:8009/
    ProxyPassReverse /           ajp://localhost:8009/

    <Proxy *>
        AddDefaultCharset off
        Require all granted
        SetOutputFilter DEFLATE
    </Proxy>

    ProxyVia On


    ErrorLog /var/log/apache2/portal.sdi4apps.eu/error.log
    CustomLog /var/log/apache2/portal.sdi4apps.eu/access.log combined
</VirtualHost>
</code>

# CAS and Liferay

To share users created in Liferay with CAS server execute this sql in Liferay database (works only for PostgreSQL)



# 
