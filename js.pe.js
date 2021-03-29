
/*
 Hieronder gaan jullie mijn Javascript code terug vinden.
 Ik heb hiervoor heel veel opgezocht op stackoverflow. w3 schools en youtube
 Links die mij geholpen hebben
 https://www.youtube.com/watch?v=UeL5glVjEYo
 https://www.w3schools.com/
 https://stackoverflow.com/questions
*/


// Ik heb eerst de Arrei aangemaakt       
let arrayErrors = [];




// Met deze code gaan we eerst "Yekes errors, Goed gedaan, en de Betalingzwijze verbergen tot dat we ze opnieuw gaan opvragen
document.getElementById('idErrors').classList.add('hidden');
document.getElementById('idCorrect').classList.add('hidden');
document.getElementById("betalingswijze").classList.add("hidden");


/*
Het functie validataitieForm is eigenlijk het main methode. Hierin worden alle andere functies aangeroepen
Eeerst gaan we de functie aanroepen/maken via de btn Wave your magic wand
De reden waarom ik het zo doe en niet via .onclick is omdat als je nu heel de tijd op de button zou drukken, 
worden de fouten maar 1 keer getoond, anders zouden zoveel getoond worden als je op de knoop zou drukken 
*/
document.getElementById('btnClick').addEventListener('click', ValidatieForm);
function ValidatieForm() {

        arrayErrors=[];



        // voor het zekerheid heb ik nog eens de idErrors, idCorrect en de betalingswijze verborgen vooraller ik verdergaa
        document.getElementById('idErrors').classList.add('hidden');
        document.getElementById('idCorrect').classList.add('hidden');
        document.getElementById("betalingswijze").classList.add("hidden");



        //Onderste code wordt in de browser getoond indien de gebruiker niks invult
        checkEmptyField(document.forms["formID"]["achternaam"].value, "Achternaam dient ingevuld te worden." + "<br/>");
        checkEmptyField(document.forms["formID"]["voornaam"].value, "Voornaam dient ingevuld te worden!" + "<br/>");
        checkEmptyField(document.forms["formID"]["inlineFormInputGroupUsername2"].value, "Gebruikersnaam voldoet niet aan de voorwaarden!" + "<br/>");
        checkEmptyField(document.forms["formID"]["inputAddress"].value, "Adres is vereist." + "<br/>");
         checkEmptyField(document.forms["formID"]["inputZip"].value, "Het veld postcode is vereist." + "<br/>");
        checkEmptyField(document.forms["formID"]["inputPassword5"].value, "Wachtwoord dient ingevuld te worden!" + "<br/>");
        checkEmptyField(document.forms["formID"]["inputPassword6"].value, "Bevestiging wachtwoord dient ingevuld te worden!" + "<br/>");



        // Hier gaan we controleren of de wachtwoord hetzelefde is bij 'wachtwoord' en bij 'bevestig wachtwoord'
        controleWachtwoord(document.forms["formID"]["inputPassword5"].value);
        if (document.forms["formID"]["inputPassword5"].value != document.forms["formID"]["inputPassword6"].value) {
                arrayErrors.push("Het veld (Wachtwoord) komt niet overeen met het deel (Bevestiging wachtwoord)!" + "<br/>");
        }



        // Hiergaan we de functie validateEmail aanroepen, zoals in de opgave wordt gevraagd, functie wordt gemaakt vanonder
        validateEmail(document.forms["formID"]["inputEmail4"].value);






        //Hiermee gaan we controleren of de klant een betalingswijze selecteerd. 
        let option = document.getElementsByName('yesno');
        if (!(option[0].checked || option[1].checked || option[2].checked || option[3].checked)) {
                arrayErrors.push("Selecteer een betalingswijze!" + "<br/>");

        }


        // Hier gaan we de functie checkPC aanroepen. Functie wordt vanonder opgemaakt
        checkPC(document.forms["formID"]["inputZip"].value);



        // Klant moet akoord gaan met de algemene voorwarden
        if (document.getElementById('idakoord').checked == false) {
                arrayErrors.push("Je moet akoord gaan met de algemeene voorwarden!" + "<br/>");
        }




       

        
        
        // Hier gaan we ons code checken. Indien de gebruiker een foutieve waarde ingeefd, moeten die om het browser verschijnen via de div idErrors
        if (Array.isArray(arrayErrors) && arrayErrors.length) {
               

                document.getElementById("idErrors").classList.remove('hidden');
                // Eerst de kommas weg doen
                document.getElementById('errors').innerHTML = arrayErrors.join(" ");

                 
                
                // op de console kunnen we nog eens de errors zien
                // indien niks is ingevuld is ons arrayErrors 13 karacters lang
                console.log(arrayErrors.length);

                // deze heb ik er extra bijgevoegd omdat ik het mooi vond
                //Indien er fouten bij zijn gaat de titel rood worden
                document.getElementById("titel1").style.color = "#dc143c";
                document.getElementById("titel2").style.color = "#dc143c";

        }
        else {

                // indien er geen foutmeldingen zijn 
                document.getElementById("idCorrect").classList.remove("hidden");
                document.getElementById("betalingswijze").classList.remove("hidden");
                // Als gebruiker een betalingswijze kiest.

                document.getElementById("idInfo").innerHTML = "Je betalingswijze is " + document.forms["formID"]["betaling"].value;
                // indien de klant alles te goed invuld krijgt hij de titel in het groen te zien(ik vond het mooi en heb ik dus dat gedaan)!
                document.getElementById("titel1").style.color = "#90ee90";
                document.getElementById("titel2").style.color = "#90ee90";
        }




        /*
        Voor de onderstste methode heb ik deze voorbeeld gebruikt van W3 schools
        The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
        https://www.w3schools.com/jsref/event_preventdefault.asp
                For example, this can be useful when:
        Clicking on a "Submit" button, prevent it from submitting a form
        Clicking on a link, prevent the link from following the URL
        */
        event.preventDefault();
};








// hieronder gaan we de controleWachtwoord aanmaken? Was niet verplicht om dat via een methode te doen maar ik vindt het zo properder
function controleWachtwoord(veld) {
        // in de opgave staaat dat de wachtwoord groter dan 8 karacters moet zijn
        if (veld.length < 8) {
                arrayErrors.push("Wachtwoord moet meer dan 8 karacters bevatten!" + "<br/>");
        }
}





// hieronder ga ik de validateEmail functie aanmaken
// Uiteraard wist ik niet hoe dat ik zo een functie moet aanaken
// Heb het functie overgenomen van Stackoverflow, maar als ik het nu bekijk lijkt het wel duidelijk
//https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(emailadress) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (re.test(emailadress) === false) {
                arrayErrors.push("E-mailadress is niet correct!" + "<br/>");
        }
        return re.test(String(emailadress).toLowerCase());
}






// Met de functie checkEmptyField gaan we kijken of de velden die moeten ingevuld worden door de gebruiker effectief ingevuld zijn.
// Indien niks wordt ingevuld, gaat er een melding in de arreyErorrs komen
function checkEmptyField(veld, melding) {
        if (veld < 1) {
                arrayErrors.push(melding);
                return true;
        }
        else {
                return false;
        }
}






/*
Hieronder gaan we de Postcode valideren via de functie checkPC zoals in de opgave gevraagt wordt
Inde opgave staat dat de postcode tussen 1000 en 9999 moet zijn. Dus dat gaan we nakijken of de gebruiker en juiste waarde ingeeft
We gebruiken hiervoor hetzelefde functie manier van werken als bij de functie controleWachtwoord
*/

function checkPC(veld) {
        // hier kijk ik of de postcode gemaakt is uit getallen. Moest niet. Maar ik vind dat het zo toch mooier en veiliger is
        if (Number.isInteger(Number(veld))==false){
                arrayErrors.push("Postcode dient met getalen ingevult te worden!"+"<br/>");
        }
        // zoals in de opgave wordt er gezegd dat de postcode niet groeter dan 9999 mag zijn maar ook niet kleiner dan 1000, indien het toch zo is, dan stoppen we die ingevulde veld door de gebruiker in de arrayErrors met de melding die als voorbeeld stond in de opgave 
        else if (veld < 1000 || veld > 9999) {
                arrayErrors.push("De waarde van postcode moet tussen 1000 en 9999 liggen." + "<br/>");
        }
  

}







