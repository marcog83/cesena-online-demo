const Categories=require("./categories-labels");
const intl = Object.assign({
    "locales": "en-US",
    "formats": {
        "date": {
            "short": {
                "day": "numeric"
                , "month": "long"
                , "year": "numeric"
            }
        }
    }

},Categories);

module.exports=intl;