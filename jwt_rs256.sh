ssh-keygen -t rsa -b 4096 -f keystore/id_rsa
openssl rsa -in keystore/id_rsa -pubout -outform PEM -out keystore/id_rsa.pub
cat keystore/id_rsa.pub
cat keystore/id_rsa