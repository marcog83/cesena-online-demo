var R = require('ramda');
var clj_fuzzy = require('clj-fuzzy');
var TRESHOLD=.75;
function remove_common(str){
    return str
    .replace(/cesena/gi,"")
        .replace(/teatro/gi,"")
        .replace(/cinema|CineTeatro|Multisala/gi,"")
        .replace(/Ristorante/gi,"")

}
function trovaByName(places,{name}) {
    var place_found = R.find(place=> {


            //
             var percent=clj_fuzzy.metrics.dice(remove_common(name), remove_common(place.name));

            percent >= TRESHOLD && console.log(name," => ", place.name,percent);
            return percent >= TRESHOLD;

        }, places) || {id:null};
    return place_found;
}

module.exports=R.curryN(2,trovaByName);