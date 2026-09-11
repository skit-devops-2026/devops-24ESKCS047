pipeline {
    agent any

    tools {
        nodejs 'NodeJS-20'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install --prefix backend'
                sh 'npm install --prefix frontend'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test --prefix backend'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'npm run build --prefix frontend'
            }
        }
    }
}
