#!/bin/bash
if [ -x "$(command -v docker)" ]; then
  echo "Already installed. Skipping..."
else
  echo "Installing Docker..."
  curl https://get.docker.com | sudo bash
  sudo usermod -aG docker $(whoami)
fi