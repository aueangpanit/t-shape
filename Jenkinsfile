pipeline {
  agent any
  stages {
    stage("Build client") {
      dir("client") {
        steps {
          sh "sudo npm install"
          sh "sudo npm run build"
        }
      }
    }
    stage("Deploy client") {
      dir("client") {
        steps {
          sh "sudo rm -rf /var/www/jenkins-react-app"
          sh "sudo cp -r ${WORKSPACE}/build/ /var/www/jenkins-react-app/"
        }
      }
    }
  }
}