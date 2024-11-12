const grille = document.getElementById("grille");
let tab = [["", "", ""], ["", "", ""], ["", "", ""]];
let gameOver = false;
let currentPlayer = "x";
let result = document.getElementById("result");
let mode = ""; // Mode de jeu

document.getElementById("solo").onclick = () => startGame("solo");
document.getElementById("contreIA").onclick = () => startGame("ia");

function startGame(selectedMode) {
    mode = selectedMode; // Définit le mode de jeu
    document.getElementById("menu").style.display = "none"; // Masque le menu
    grille.style.display = "grid"; // Affiche la grille
}

function play(cell, i, j, isAI = false) {
    if (cell.textContent === "" && !gameOver) {
        tab[i][j] = currentPlayer; // Met à jour le tableau
        cell.textContent = currentPlayer; // Affiche le symbole du joueur
        endgame(); // Vérifie si le jeu est terminé

        if (!gameOver) {
            currentPlayer = currentPlayer === "x" ? "o" : "x"; // Change de joueur
            if (mode === "ia" && currentPlayer === "o") {
                setTimeout(playAI, 300); // L'IA joue après un court délai
            }
        }
    }
}

function endgame() {
    // Vérification des lignes
    for (let i = 0; i < tab.length; i++) {
        if (tab[i][0] !== "" && tab[i][0] === tab[i][1] && tab[i][1] === tab[i][2]) {
            result.textContent = "Victoire de : " + tab[i][0];
            gameOver = true;
            afficherFinDeJeu();
            return;
        }
    }

   // Vérification des colonnes
   for (let j = 0; j < tab.length; j++) {
       if (tab[0][j] !== "" && tab[0][j] === tab[1][j] && tab[1][j] === tab[2][j]) {
           result.textContent = "Victoire de : " + tab[0][j];
           gameOver = true;
           afficherFinDeJeu();
           return;
       }
   }

   // Vérification des diagonales
   if (tab[0][0] !== "" && tab[0][0] === tab[1][1] && tab[1][1] === tab[2][2]) {
       result.textContent = "Victoire de : " + tab[0][0];
       gameOver = true;
       afficherFinDeJeu();
       return;
   }
   
   if (tab[0][2] !== "" && tab[0][2] === tab[1][1] && tab[1][1] === tab[2][0]) {
       result.textContent = "Victoire de : " + tab[0][2];
       gameOver = true;
       afficherFinDeJeu();
       return;
   }

   // Vérification d'égalité (match nul)
   if (!tab.flat().includes("")) {
       result.textContent = "Match nul !";
       gameOver = true;
       afficherFinDeJeu();
   }
}

function afficherFinDeJeu() {
   grille.style.display = "none"; // Masquer la grille
   document.querySelector("#fin").style.display="block"; // Afficher le conteneur de fin de jeu
}

function resetGame() {
   // Réinitialiser le tableau de jeu
   tab = [["", "", ""], ["", "", ""], ["", "", ""]];
   
   // Réinitialiser les variables du jeu
   gameOver = false;
   currentPlayer = "x";

   // Effacer le contenu des cellules
   const cells = document.querySelectorAll("#grille div");
   cells.forEach(cell => cell.textContent = "");

   // Effacer le message de résultat
   result.textContent = "";
   
   // Réafficher la grille et cacher le bouton de redémarrage
   grille.style.display = "grid"; 
   document.querySelector("#fin").style.display="none"; 
}

function playAI() {
   if (gameOver) return;

   // Sélectionner toutes les cellules vides dans la grille
   let emptyCells = Array.from(document.querySelectorAll('#grille div')).filter(cell => cell.textContent === "");

   // Si des cellules vides existent 
   if (emptyCells.length > 0) {
       let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
       let cellIndex = Array.from(randomCell.parentNode.children).indexOf(randomCell);
       let i = Math.floor(cellIndex / 3);
       let j = cellIndex % 3;

       play(randomCell, i, j, true); // Indiquer que c'est l'IA qui joue
   }
}