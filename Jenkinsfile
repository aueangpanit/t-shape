pipeline {
  agent any
  
  environment {
    REACT_APP_SERVICE_URL = credentials(env.BRANCH_NAME + '_REACT_APP_SERVICE_URL')
    databaseUrl = credentials(env.BRANCH_NAME + '_databaseUrl')
    databaseUsername = credentials(env.BRANCH_NAME + '_databaseUsername')
    databasePassword = credentials(env.BRANCH_NAME + '_databasePassword')
    jwtSecretKey = credentials(env.BRANCH_NAME + '_jwtSecretKey')
    dockerhubUsername = credentials(env.BRANCH_NAME + '_dockerhubUsername')
    dockerhubPassword = credentials(env.BRANCH_NAME + '_dockerhubPassword')
    devServerUrl = credentials('devServerUrl')
  }
  
  stages {
    stage('ssh to dev server') {
      when {
        expression { env.BRANCH_NAME == 'dev' }
      }
      steps {
        sh 'ssh -tt ubuntu@' + env.devServerUrl
      }
    }

    stage('Login to Dockerhub') {
      steps {
        sh 'docker login --username ' + env.dockerhubUsername + ' --password ' + env.dockerhubPassword
      }
    }

    stage('Exit from dev server') {
       when {
        expression { env.BRANCH_NAME == 'dev' }
      }
      steps {
        sh 'exit'
      }
    }

    stage('Build client') {
      steps {
        dir('client') {
          writeFile file: '.env.production', text: 'REACT_APP_SERVICE_URL=' + env.REACT_APP_SERVICE_URL
          sh 'npm install'
          sh 'npm run build'
        }
      }
    }

    stage('Create client Docker image and upload to docker hub') {
      steps {
        dir('client') {
          sh 'docker build -t aueangpanit/' + env.BRANCH_NAME + '-ticketer-client:latest .'
          sh 'docker image push aueangpanit/' + env.BRANCH_NAME + '-ticketer-client:latest'
        }
      }
    }

    stage('Build service') {
      steps {
        dir('service/src/main/resources') {
          sh 'rm application.properties'
          writeFile file: 'application.properties', text: 'spring.jpa.hibernate.ddl-auto=update' + 
            '\nspring.datasource.url=' + env.databaseUrl +
            '\nspring.datasource.username=' + env.databaseUsername +
            '\nspring.datasource.password=' + env.databasePassword +
            '\njwt.secretkey=' + env.jwtSecretKey
        }
        dir('service') {
          sh 'mvn install'
        }
      }
    }

    stage('Create service image and upload to Docker hub') {
      steps {
        dir('service') {
          sh 'docker build --build-arg JAR_FILE=target/*.jar -t aueangpanit/' + env.BRANCH_NAME + '-ticketer-service:latest .'
          sh 'docker image push aueangpanit/' + env.BRANCH_NAME + '-ticketer-service:latest'
        }
      }
    }
  }
}