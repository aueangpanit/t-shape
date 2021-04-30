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
          sh 'docker login -u ' + env.dockerhubUsername + ' -p ' + env.dockerhubPassword
          sh 'docker image push aueangpanit/ticketer-client:latest'
        }
      }
    }
  }
}