let Handlebars = require("handlebars");


exports.fbHours = hours=> {
    if (!hours)return [];
    var names = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    var days = ["mon", "tue", "wed","thu",  "fri", "sat", "sun"].map((day,i)=> {
        var key1o = day + "_1_open";
        var key1c = day + "_1_close";
        var key2o = day + "_2_open";
        var key2c = day + "_2_close";
        var str = "";
        if (hours[key1o] || hours[key2o]) {
            str = names[i] + ": ";
        }
        var mattina = [hours[key1o] || "", hours[key1c] || ""];
        var pome = [hours[key2o] || "", hours[key2c] || ""];
        str += mattina.join("-");
        if (hours[key2o]) {
            str += " | "+pome.join("-");
        }
        return str;

    });
    return days;
};


