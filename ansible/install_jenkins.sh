#!/bin/bash
if [ -f /home/jenkins/jenkins.war ]; then
    echo "Already installed. Skipping..."
else
    echo "Installing Jenkins..."
    sh /home/jenkins.sh
    sudo chown jenkins /var/run/docker.sock
fi

