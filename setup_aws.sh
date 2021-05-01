#!/bin/bash
# terraform fmt
# terraform init
# terraform plan
# terraform apply -var-file secrets.tfvars
ipAddresses=$(cat ./ansible/file.txt | grep -Po '[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+')
echo "$ipAddresses"
IFS='\n' read -r -a array <<< "$ipAddresses"
echo "$array"
for element in "${array[@]}"
do
    echo "$element"
done

