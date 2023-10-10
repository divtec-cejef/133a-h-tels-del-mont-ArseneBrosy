/**
* @author      Arsène Brosy <arsene.brosy@divtec.ch>
* @version     1.0
* @since       2023-10-09
*
* http://usejsdoc.org/
*/

"use strict";

let formulaire = document.querySelector("form");

/**
 * Retourne le nom de l'hôtel sélectionné par le visiteur
 * @returns {String} Nom de l'hôtel ou "0" si pas de sélection
 */
function getHotel() {
  return formulaire.querySelector("#hotel").value;
}

/**
 * Retourne le nombre de chambres saisi par le visiteur
 * @returns {Number} Nombre de chambres ou NaN (Not A Number)
 */
function getNbChambre() {
  return parseInt(formulaire.querySelector("#nombre-chambre").value);
}

/**
 * Retourne le type de chambre sélectionné ou ""
 * @returns {String} Type de chambre ou ""
 */
function getChambre() {
  let selectedRadio = formulaire.querySelector("input[type=radio]:checked");
  return selectedRadio === null ? "" : selectedRadio.value;
}

/**
 * Retourne les options choisies par le visiteur
 * @returns {Array} tableau des éléments checkbox cochés
 */
function getOptions() {
  return Array.from(formulaire.querySelectorAll("input[type=checkbox]:checked"));
}

/**
 * Valide la saisie utilisateur
 * Retourne un message d'erreur au format HTML "<ul><li>erreur 1</li>...</ul>"
 * ou chaine vide si tout est OK.
 *
 * @returns {String}    Chaine vide si pas d'erreur ou <ul> d'erreurs
 */
function valideSaisie() {
  let result = "";
  if (getHotel() === "0") {
    result += "<li>Sélectionnez un hôtel !</li>";
  }
  if (isNaN(getNbChambre()) || getNbChambre() < 1 || getNbChambre() > 12) {
    result += "<li>Saisissez un nombre de chambre entre 1 et 12 !</li>";
  }
  if (getChambre() === "") {
    result += "<li>Sélectionnez un type de chambre !</li>";
  }

  // met le tout dans une balise ul s'il y a des erreurs
  result = result === "" ? "" : `<ul>${result}</ul>`;

  return result;
}

/**
 * Affiche la confirmation de réservation
 */
function afficheConfirmation() {
  let reservation = document.querySelector("#reservation");

  reservation.querySelector("#photo").src = `./images/${getHotel().toLowerCase()}.jpg`;
  reservation.querySelector("h2").innerHTML = getHotel();
  reservation.querySelector("#chambre_nombre").innerHTML = getNbChambre().toString();
  reservation.querySelector("#chambre_type").innerHTML = getChambre();

  // crée la liste des options
  let optionsList = "";
  for (let option of getOptions()) {
    optionsList += `<li>${option.name}</li>`;
  }

  reservation.querySelector("#options").innerHTML = optionsList;

  reservation.style.display = "block";
}

/**
 * Fonction appellé lors de l'envoi du formulaire
 * Test la saisie et affiche la confirmation ou le message d'erreur
 * @param event Objet représentant l'événement
 */
function reserver(event) {
  event.preventDefault();

  let messageDiv = document.querySelector("#message");
  messageDiv.style.display = "none";

  let erreurs = valideSaisie();
  if (erreurs !== "") {
    messageDiv.innerHTML = erreurs;
    messageDiv.style.display = "block";
    document.querySelector("#reservation").style.display = "none";
  } else {
    afficheConfirmation();
  }
}

formulaire.addEventListener("submit", reserver);

formulaire.addEventListener("reset", () => {
  document.querySelector("#reservation").style.display = "none";
  document.querySelector("#message").style.display = "none";
});
