# Projet Gestion des notes (Spring boot/Angular)

Ce projet est une application web basée sur Spring Boot côté serveur et Angular côté client.

## Prérequis

Avant de pouvoir exécuter l'application, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- Java Development Kit (JDK) 11 ou une version ultérieure
- Node.js avec npm (Node Package Manager) : https://nodejs.org
- Angular CLI : vous pouvez l'installer en exécutant la commande suivante :
    ```
    npm install -g @angular/cli
    ```
- MySQL : assurez-vous que MySQL est installé et démarré sur votre machine. Vous devrez vérifier que le serveur MySQL est en cours d'exécution avant de lancer l'application.


## Installation

1. Clonez ce dépôt GitHub sur votre machine :
    ```
    git clone https://github.com/Smail-k/Gestion_des_notes.git
    ```

## Exécution

1. Démarrez le serveur Spring Boot (la base de donnée est crée automatiquement)

2. Dans un terminal, accédez au répertoire du client Angular :
    ```
    cd Gestion-des-notes-frontend
    ```

3. Démarrez le client Angular en exécutant la commande suivante :
    ```
    ng serve
    ```

4. Ouvrez votre navigateur et accédez à l'URL suivante pour voir l'application en action :
    ```
    http://localhost:4200
    ```

C'est tout ! Vous devriez maintenant pouvoir exécuter le projet Spring Boot avec le front-end Angular localement sur votre machine. Assurez-vous d'avoir les ports nécessaires disponibles (8080 pour Spring Boot et 4200 pour Angular).