let fs = require("fs");


var _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}
function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function getAlladinOrari(films) {
    var periodi = films.map(movie=> {
        var days = movie.orari.programmazione.split(/dal/gim)[1].trim().split(/al/gim);
        var start_date = days[0].trim().split(".");
        start_date = new Date(start_date[2], parseInt(start_date[1]) - 1, start_date[0]);
        var end_date = days[1].trim().split(".");
        end_date = new Date(end_date[2], parseInt(end_date[1]) - 1, end_date[0]);
        var diffDays = dateDiffInDays(start_date, end_date);
        var days_list = [];
        for (var i = 0; i <= diffDays; i++) {

            var day = addDays(start_date, i);
            var day_week = day.getDay();

            var periodi_orari = movie.orari.date;
            var FestiviIndex = periodi_orari.lastIndexOf("Festivi");
            var SabatoIndex = periodi_orari.lastIndexOf("Sabato");
            var FerialiIndex = periodi_orari.lastIndexOf("Feriali");
            //
            var festivi = "";
            var sabato = "";
            var feriali = "";
            if (FestiviIndex != -1) {
                festivi = periodi_orari.slice(FestiviIndex);

            }
            if (SabatoIndex != -1) {
                if (FestiviIndex != -1) {
                    sabato = periodi_orari.slice(SabatoIndex, FestiviIndex);
                } else {
                    sabato = periodi_orari.slice(SabatoIndex);
                }
            }
            if (FerialiIndex != -1) {
                if (SabatoIndex != -1) {
                    feriali = periodi_orari.slice(FerialiIndex, SabatoIndex);
                } else if (FestiviIndex != -1) {
                    feriali = periodi_orari.slice(FerialiIndex, FestiviIndex);
                } else {
                    feriali = periodi_orari.slice(FerialiIndex);
                }
            }
            var fascie = [];

            var oreRegEXP = /([01]\d|2[0-3])[:|.]?[0-5]\d/gi;
            if (day_week == 6) {
                fascie = sabato

            } else if (day_week == 0) {
                fascie = festivi
            } else {
                fascie = feriali
            }
            days_list.push({
                day,
                fascie: (fascie.match(oreRegEXP)||[]).map(a=>a.replace(".", ":"))
            })
        }


        return Object.assign({days_list}, movie);
    });
    return periodi;
}
exports.getAlladinOrari = getAlladinOrari


//fs.writeFileSync("ala-test.json", JSON.stringify(periodi))


/**
 *
 *
 var myString = "Feriali  Feriali ore. 20.30. 22.40Sabato  16:30 - 17:30 - 18:30 - 20:30 - 22:40Festivi  15:30 - 16:30 - 17:30 - 18:30 - 20:30 - 22:40".replace("Feriali ","");
 var myRegexp = /Feriali  ore\.|Sabato|Festivi/gim;
 match = myRegexp.exec(myString);
 while (match != null) {
  // matched text: match[0]
  // match start: match.index
  // capturing group n: match[n]
  console.log(match[0])
  match = myRegexp.exec(myString);
}

 */

