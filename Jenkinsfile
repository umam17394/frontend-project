pipeline {
    agent any

    stages {
        stage('docker build') {
            steps {
                sh 'docker build -t reactjs:v1 .'
            }
        }
      stage('docker tag') {
            steps {
                sh 'docker tag reactjs:v1 prasadchandu/nag:reactjs'
            }
        }
      stage('docker login') {
            steps {
                sh 'docker login'
            }
        }
      stage('docker push') {
            steps {
                sh 'docker push prasadchandu/nag:reactjs'
            }
        }
    }
}
