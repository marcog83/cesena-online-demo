var Parser = require("parse-listing");
var doc=`Sabato 29 Aprile:
Entro le 12.00 Arrivo squadre presso il Centro Sportivo Romagna Centro per check in dei gruppi, consegna materiale
Ore 15.00: Primo turno di gare per le Categorie a 11.
Ore 21:00: CERIMONIA INAUGURALE con sfilata di tutti i club partecipant
Domenica 30 Aprile:
Proseguimento del Torneo come da Calendario. Fasi finali e premiazioni per alcune categorie.
Lunedì 1 Maggio: Fasi Finali, a seguire PREMIAZIONI (dopo ogni finale, verrà premiata ciascuna categoria, premi a tutti gli atleti) . Partenza.
Il programma può subire variazioni di carattere tecnico
QUOTE A PERSONA:
Pens. Completa in Camera tripla/quadrupla:
Hotel Casa Vacanza 1* € 99
Hotel 2** € 106
Hotel 3*** € 112
Hotel3*** Comfort € 119
Hotel 4**** € 135

Supplementi:
Camera Doppia € 8 a persona per l'intero periodo
Camera Singola € 24 a persona per l'intero periodo

Gratuità: Una quota Gratuita ogni 25 persone (la 25esima)
Gratuità Extra: Se prenoti entro il 06 Gennaio

Note:
- In casa vacanza accomodamenti in camerata
- Le strutture sono dotate di riscaldamento

Cosa Comprende il costo del Torneo:

- Partecipazione al 15° Cesenatico Youth Festival (inclusa la quota di iscrizione per squadra);
- Servizio informazioni;
- Una brochure del Torneo per ogni partecipante;
- Biglietto Omaggio al Parco di Mirabilandia se soggiorni un giorno Extra € 45 in Hotel3*** contattaci per maggiori dettagli 0547-613347
- PLAY SPORT CARD Entrata gratuita alla Cerimonia Inaugurale del Torneo, a tutte le partite ed alle Premiazioni (Gli ingressi ai campi da gioco, alla Cerimonia inaugurale e alle Premiazioni sono sempre inclusi nella quota di partecipazione individuale mentre potrebbero essere a pagamento per chi non avesse prenotato tramite l’Organizzazione);
- Due notti di soggiorno: sistemazione in Casa Vacanze/ Pensione/Hotel 1* (non tutte le camere hanno servizi privati) oppure in Hotel 2**/ 3***/ 3*** Plus oppure Hotel 4**** (ciascuna camera con servizi privati).
- Pasti: Pensione Completa: n. 2 cene + n. 2 colazioni + n. 2 pranzi. Inizio con la cena del giorno Sabato 29 Aprile termine con il pranzo di Lunedì 01 Maggio;
- Serata in Discoteca per i dirigenti.
- Acqua sui campi di gioco e durante i pasti (altre bevande escluse fatta eccezione per la colazione);
- Assistenza dello staff del Torneo dell’Adriatico durante il soggiorno: in Hotel e sui campi da gioco.`


Parser.parseEntries(doc, function(err, entryArray) {
    entryArray.forEach(function(entry, i) {
        console.log("Name:",entry.name);
        console.log("Type", entry.type);
        console.log("Size:", entry.size);
    });
});