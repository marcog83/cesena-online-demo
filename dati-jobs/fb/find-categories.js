// let categories = require("./category-list");

exports.SPORTS = /Bowling|Bike|Athletic|Golf|Ice Skating|Hunting|sports|gym|fitness|Pool|Martial|Sky|Recreation/gim;
exports.BENESSERE = /Aesthetics|gym|fitness|Spa|Beauty|Personal Care/gim;

// let sports = categories
//     .filter(cat=>cat.name.match(sportsRegExp))
//     .filter(cat=>!["Spanish Restaurant", "Newspaper"].includes(cat.name));

exports.ARTS = /Book|Auditorium|Museum|art |Arts &|Historical/gim;
exports.TEATRI_CINEMA = /Auditorium|theater/gim;
// let arts = categories
//     .filter(cat=>cat.name.match(sportsRegExp))
//     .filter(cat=>!["Car Parts & Accessories", "Automotive Parts & Accessories"].includes(cat.name));

exports.FOOD = /Beer|Bakery|Health Food Store|Steakhouse|Ice Cream|Yogurt|Chips|Restaurant|Pizza|Gastropub|Cafe|Club|Bar|Beer|Breakfast|Brewery/gim;


// let food = categories
//     .filter(cat=>cat.name.match(sportsRegExp))
//     .filter(cat=>!["Barber Shop", "Bartending Service"].includes(cat.name));

exports.LOCALI = /Beer|Cafe|Club|Bar|Nightlife/gim;//pub include troppo
exports.BUSISNESS = /Law Practice|Book|Bingo|Bed and Breakfast|Beauty|Bakery|Audiovisual|Home|Health Food Store|Medical|Event Planner|Insurance|agent|Lawyer|Doctor|Drugstore|Shop|Store|Commercial|Furniture|Internet|Web|Agency|Advertising|Consultant|Business/gim;

exports.TECH = /Internet|Web|Advertising Agency|Advertising|Marketing Consultant/gim;
exports.MUSICA = /Music|Media Production|broadcasting/gim;
exports.SALUTE = /Eyewear|Psychologist|Beauty|Audiologist|Aromatherapy|Health Food Store|Medical|Doctor/gim;
exports.ARCHITETTURA = /Home|Architect/gim;


