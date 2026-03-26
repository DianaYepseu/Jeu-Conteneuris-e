class JeuDes {
  constructor() {
    this.multiNode = new MultiNode("ws://" + window.location.hostname + ":8080/multinode");
    this.multiNode.confirmerConnexion = () => this.confirmerConnexion();
    this.multiNode.confirmerAuthentification = (autresParticipants) =>
      this.confirmerAuthentification(autresParticipants);
    this.multiNode.apprendreAuthentification = (pseudonyme) =>
      this.apprendreAuthentification(pseudonyme);
    this.multiNode.recevoirVariable = (variable) => this.recevoirVariable(variable);

    this.listeJoueur = {};
    this.pseudonymeJoueur = "";
    this.pseudonymeAutreJoueur = "";

    this.listeScoresElement = document.getElementById("liste-scores");
    this.formulaireAuthentification = document.getElementById("formulaire-authentification");
    this.champPseudonyme = document.getElementById("champ-pseudonyme");
    this.boutonAuthentification = document.getElementById("bouton-authentification");

    this.formulaireJeu = document.getElementById("formulaire-jeu");
    this.champPointDuDe = document.getElementById("champ-point-de-de");
    this.boutonLancer = document.getElementById("bouton-lancer");
    this.informationAutreJoueur = document.getElementById("information-autre-joueur");
    this.champPointDuDeAutreJoueur = document.getElementById("champ-point-de-de-autre-joueur");
    this.champNombreTour = document.getElementById("champ-nombre-tour");
    this.initialiserModalFin();
    this.mettreAJourStatut("");
    this.nombreTour = 0;
    this.valeurDEJoueur = null;
    this.valeurDEAutreJoueur = null;

    this.partieTerminee = false;
    this.premierTourPret = false;

    this.rejouerEnAttente = false;
    this.demandeRejouerRecue = false;
    this.reponseRejouerEnvoyee = false;
    this.monChoixFinPartie = null;

    this.formulaireAuthentification.addEventListener("submit", (e) =>
      this.soumettreAuthentificationJoueur(e)
    );

    this.formulaireJeu.addEventListener("submit", (e) =>
      this.soumettreLancer(e)
    );

    this.formulaireJeu.style.display = "none";
    this.boutonLancer.disabled = true;
    this.champNombreTour.value = "0";
  }

  log(message) {
    console.log(message);
  }

  log(message) {
    console.log(message);
  }

  incrementerNombreTours() {
    this.nombreTour++;
    this.champNombreTour.value = this.nombreTour;
  }

  confirmerConnexion() {
    this.pseudonymeJoueur = this.champPseudonyme.value.trim();

    if (!this.pseudonymeJoueur) {
      alert("Entre un pseudonyme.");
      this.boutonAuthentification.disabled = false;
      return;
    }

    this.multiNode.demanderAuthentification(this.pseudonymeJoueur);
  }

  confirmerAuthentification(autresParticipants) {
    this.formulaireAuthentification.querySelector("fieldset").disabled = true;
    this.ajouterJoueur(this.pseudonymeJoueur);
    this.afficherScores();

    if (autresParticipants.length > 0) {
      this.pseudonymeAutreJoueur = autresParticipants[0];
      this.ajouterJoueur(this.pseudonymeAutreJoueur);
      this.afficherScores();
      this.afficherPartie();
      this.determinePremierJoueur();
    }
  }


new JeuDes();
