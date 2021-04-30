pipeline {
  agent any
  stages {
    stage('Build client') {
      steps {
        echo 'building client...'
        dir('client') {
          writeFile file: '.env.production', text: 'some text'
          sh 'ls -l .env.production'
          sh 'cat groovy1.txt'
          // sh "sudo npm install"
          // sh "sudo npm run build"
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