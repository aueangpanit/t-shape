pipeline {
  agent any
  
  environment {
    REACT_APP_SERVICE_URL = credentials('REACT_APP_SERVICE_URL')
    databaseUrl = credentials('databaseUrl')
    databaseUsername = credentials('databaseUsername')
    databasePassword = credentials('databasePassword')
  }
  
  stages {
    stage('Build client') {
      steps {
        echo 'building client...'
        dir('client') {
          writeFile file: '.env.production', text: 'REACT_APP_SERVICE_URL=${REACT_APP_SERVICE_URL}'
          sh 'ls -l .env.production'
          sh 'cat .env.production'
          sh 'sudo npm run build'
          sh 'sudo docker --version'
        }
      }
    }
    stage('Deploy client') {
      steps {
        echo 'deploying client...'
      }
    }
  }
}