pipeline {
  agent any
  
  environment {
    REACT_APP_SERVICE_URL = credentials('REACT_APP_SERVICE_URL')
    databaseUrl = credentials('databaseUrl')
    databaseUsername = credentials('databaseUsername')
    databasePassword = credentials('databasePassword')
    jwtSecretKey = credentials('jwtSecretKey')
    dockerhubUsername = credentials('dockerhubUsername')
    dockerhubPassword = credentials('dockerhubPassword')
  }
  
  stages {
    stage('Login to Dockerhub') {
      steps {
        sh 'echo "$dockerhubPassword" | docker login --username ' + env.dockerhubUsername + ' --password-stdin'
      }
    }

    stage('Build client') {
      steps {
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
          sh 'docker build -t aueangpanit/ticketer-client:latest .'
          sh 'docker image push aueangpanit/ticketer-client:latest'
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
          sh 'docker build --build-arg JAR_FILE=target/*.jar -t aueangpanit/ticketer-service:latest .'
          sh 'docker image push aueangpanit/ticketer-service:latest'
        }
      }
    }
  }
}