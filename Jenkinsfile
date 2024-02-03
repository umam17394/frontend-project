pipeline {
    agent any

    stages {
      stage("Cleanup Workspace") {
            steps {
                cleanWs()
            }
        }
        stage('Docker build') {
            steps {
                sh 'docker build -t frontend:v1 .'
            }
        }
      stage('docker tag') {
            steps {
                sh 'docker tag frontend:v1 prasadchandu/nag:frontend'
            }
        }
      stage('docker login') {
            steps {
                sh 'docker login'
            }
        }
      stage('docker push') {
            steps {
                sh 'docker push prasadchandu/nag:frontend'
            }
        }
      stage('SonarQube analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh "npm run start"
                }
            }
        }
        stage("Quality gate") {
            steps {
                waitForQualityGate abortPipeline: true
            }
        }
    }
}

