/**
 * Created by mgobbi on 01/12/2016.
 */
const R = require("ramda");
const fs = require("fs");
const addressit = require("addressit");
var impreseCategory = JSON.parse(fs.readFileSync("imprese.json"));
var imprese = R.compose(
    R.flatten
    , R.map(category=>R.map(impresa=> {

            return {
                category_list: [category.label]
                ,name:impresa.name
                ,address:`${impresa.address_1}, ${impresa.address_2}`

            }
        }, category.imprese)
    ))(impreseCategory);
fs.writeFileSync("imprese-flatten.json", JSON.stringify(imprese));
