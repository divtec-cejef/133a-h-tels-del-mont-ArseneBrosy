/**
* @author      Arsène Brosy <arsene.brosy@divtec.ch>
* @version     1.0
* @since       2023-10-09
*
* http://usejsdoc.org/
*/

"use strict";

let formulaire = document.querySelector("form");
console.log(formulaire);

/**
 * Retourne le nom de l'hotel sélectionné par le visiteur
 * @returns {String} Nom de l'hotêl ou "0" si pas de sélection
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
  return formulaire.querySelector("input[type=radio]:checked").value;
}

/**
 * Retourne les options choisies par le visiteur
 * @returns {Array} tableau des éléments checkbox cochés
 */
function getOptions() {
  return formulaire.querySelectorAll("input[type=checkbox]:checked");
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
  if (isNaN(getNbChambre()) || getChambre() < 1 || getNbChambre() > 12) {
    result += "<li>Saisissez un nombre de chambre entre 1 et 12 !</li>";
  }
  if (getChambre() !== undefined) {
    result += "<li>Sélectionnez un type de chambre !</li>";
  }

  // met le tout dans une balise ul s'il y a des erreurs
  result = result === "" ? "" : "<ul>${result}</ul>";
}

/**
 * Affiche la confirmation de réservation
 */
function afficheConfirmation() {

}

/**
 * Fonction appellé lors de l'envoi du formulaire
 * Test la saisie et affiche la confirmation ou le message d'erreur
 * @param event Objet représentant l'événement
 */
function reserver(event) {
  event.preventDefault();
  alert("coucou");
}

formulaire.addEventListener("submit", reserver);
