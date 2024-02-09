pipeline {
    agent any

    stages {
        stage('docker build') {
            steps {
                sh 'docker build -t react:v1 .'
            }
        }
      stage('docker tag') {
            steps {
                sh 'docker tag react:v1 prasadchandu/java:reactjs'
            }
        }
      stage('docker login') {
            steps {
                sh 'docker login'
            }
        }
      stage('docker push') {
            steps {
                sh 'docker push prasadchandu/java:reactjs'
            }
        }
    }
}
