pipeline {
  agent any
  
  environment {
    REACT_APP_SERVICE_URL = credentials("${BRANCH_NAME}_REACT_APP_SERVICE_URL")
    databaseUrl = credentials("${BRANCH_NAME}_databaseUrl")
    databaseUsername = credentials("${BRANCH_NAME}_databaseUsername")
    databasePassword = credentials("${BRANCH_NAME}_databasePassword")
    jwtSecretKey = credentials("${BRANCH_NAME}_jwtSecretKey")
    dockerhubUsername = credentials("${BRANCH_NAME}_dockerhubUsername")
    dockerhubPassword = credentials("${BRANCH_NAME}_dockerhubPassword")
    devServerUrl = credentials('devServerUrl')
  }
  
// when {
//         expression { env.BRANCH_NAME == 'dev' }
//       }

  stages {
    stage('Login to Dockerhub') {
      steps {
        sh 'docker login --username ' + env.dockerhubUsername + ' --password ' + env.dockerhubPassword
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

    // node {
    //   def remote = [:]
    //   remote.name = 'test'
    //   remote.host = 'test.domain.com'
    //   remote.user = 'root'
    //   remote.password = 'password'
    //   remote.allowAnyHosts = true
    //   stage('Remote SSH') {
    //     sshCommand remote: remote, command: "ls -lrt"
    //     sshCommand remote: remote, command: "for i in {1..5}; do echo -n \"Loop \$i \"; date ; sleep 1; done"
    //   }
    // }
  }
}