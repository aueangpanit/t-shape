pipeline {
  agent any
  
  environment {
    REACT_APP_SERVICE_URL = credentials('REACT_APP_SERVICE_URL')
    databaseUrl = credentials('databaseUrl')
    databaseUsername = credentials('databaseUsername')
    databasePassword = credentials('databasePassword')
    dockerhubUsername = credentials('dockerhubUsername')
    dockerhubPassword = credentials('dockerhubPassword')
  }
  
  stages {
    stage('Login to Dockerhub') {
      steps {
        sh 'echo "$dockerhubPassword" | docker login --username ' + env.dockerhubUsername + ' --password-stdin'
        sh 'sudo usermod -a -G docker jenkins'
      }
    }

    stage('Build client') {
      steps {
        echo 'building client...'
        dir('client') {
          writeFile file: '.env.production', text: 'REACT_APP_SERVICE_URL=' + env.REACT_APP_SERVICE_URL
          sh 'cat .env.production'
          sh 'npm install'
          sh 'npm run build'
        }
      }
    }

    stage('Create client Docker image and upload to docker hub') {
      steps {
        dir('client') {
          sh 'docker build -t ticketer-client:latest .'
          sh 'docker image push aueangpanit/ticketer-client:latest'
        }
      }
    }
  }
}