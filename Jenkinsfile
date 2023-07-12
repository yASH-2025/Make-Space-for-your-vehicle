pipeline {
    agent any

    stages {
        stage('Pulling Application from Github Repo') {
            steps {
                git credentialsId: 'git-credss', url: 'https://github.com/Gaurav-Tilokani/MakeSpaceForYourVehicle.git', branch: 'master'
            }
        }
        stage('Frontend:  Node Package Manager'){
            steps{
              sh '''
							cd MakeSpaceFYV/frontend-web-react
							npm ci
					'''
            }
        }
        stage('Backend: Testing and Installing Dependencies (Node Package Manager)'){
            steps{
               sh '''
							cd MakeSpaceFYV/backend
							npm ci
							npm run test
					'''
            }
        }
        stage('Frontend: Build Docker Image') {
			steps {
				sh "docker build -t gauravtilokani/make-space-for-your-vehicle-frontend-web:latest MakeSpaceFYV/frontend-web-react/"
			}   
		}
        stage('Backend: Build Docker Image') {
			steps {
				sh "docker build -t gauravtilokani/make-space-for-your-vehicle-backend:latest MakeSpaceFYV/backend/"
			}   
		}
		stage('Docker LOGIN'){
            steps{
                script{
                    withCredentials([string(credentialsId: 'docker-auth', variable: 'dockerhubcreds')]) {
                        sh 'docker login -u gauravtilokani -p ${dockerhubcreds}'
                    }
                }
            }
        }
        stage('FRONTEND Image PUSH'){
            steps{
                 sh 'docker push gauravtilokani/make-space-for-your-vehicle-frontend-web:latest'
            }
        }
        stage('BACKEND Image PUSH'){
            steps{
                 sh 'docker push gauravtilokani/make-space-for-your-vehicle-backend:latest'
            }
        }
        stage('Removing Docker Images (frontend) from Local') {
			steps {
				sh "docker rmi gauravtilokani/make-space-for-your-vehicle-frontend-web:latest"
			}
		}
		stage('Removing Docker Images (backend) from Local') {
			steps {
				sh "docker rmi gauravtilokani/make-space-for-your-vehicle-backend:latest"
			}
		}
		stage('Ansible'){
            steps{
                sh 'ls'
                ansiblePlaybook becomeUser: null, installation: 'Ansible', inventory: 'MakeSpaceFYV/inventory', playbook: 'MakeSpaceFYV/deploy-playbook.yml', sudoUser: 'null'
            }
        }
    }
}
