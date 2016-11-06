var R = require("ramda");
const Categories = {
    real_estate: "Commercial Real Estate|Real Estate Appraiser|real_estate_agency|Real Estate|Real Estate Agent",
    cinema: "movie_theater|cinema|Movie Theater|Theater",
    teatro: "teatro|Theater",
    ristoranti: "Gastropub|restaurant|Tex-Mex Restaurant|Italian Restaurant|Sports Bar|Fast Food Restaurant|Vegetarian & Vegan Restaurant|Seafood Restaurant|Diner|Place to Eat/Drink|Restaurant|Health Food Restaurant|Buffet Restaurant|Breakfast & Brunch Restaurant|Family Style Restaurant|Greek Restaurant|Take Out Restaurant|Sushi Restaurant|Burger Restaurant|Sandwich Shop|Thai Restaurant|Restaurant/Cafe|Donuts & Bagels|Food & Restaurant|Cantonese Restaurant|Brazilian Restaurant|Modern European Restaurant|Nepalese Restaurant|Mediterranean Restaurant|Asian Restaurant",
    cibo: "Deli|Wine Bar|Cafe|Gastropub|restaurant|bar|food|Specialty Grocery Store|Health Food Store|grocery_or_supermarket|Tex-Mex Restaurant|Italian Restaurant|Dessert Place|Bar|Sports Bar|Pub|Fast Food Restaurant|Vegetarian & Vegan Restaurant|Smoothie & Juice Bar|Dive Bar|Seafood Restaurant|Diner|Place to Eat/Drink|Ice Cream Parlor|Pizza Place|meal_delivery|meal_takeaway|Restaurant|piadineria|Health Food Restaurant|Buffet Restaurant|Breakfast & Brunch Restaurant|Bakery|liquor_store|cafe|Family Style Restaurant|Greek Restaurant|Take Out Restaurant|Sushi Restaurant|Burger Restaurant|Sandwich Shop|Thai Restaurant|bakery|Brewery|Beer Garden|Coffee Shop|Restaurant/Cafe|Donuts & Bagels|Food & Restaurant|Liquor Store|Cantonese Restaurant|Brazilian Restaurant|Supply & Distribution Service|Bed and Breakfast|Bar & Grill|Food & Beverage Service & Distribution|Kitchen/Cooking|Butcher Shop|Internet Cafe|Cupcake Shop|Modern European Restaurant|Nepalese Restaurant|Mediterranean Restaurant|Asian Restaurant",
    piadineria: "piadineria",
    erboristeria: "Alternative & Holistic Health",
    gelateria: "Ice Cream Parlor",
    da_asporto: "meal_delivery|meal_takeaway|Take Out Restaurant",
    vegetariano: "Vegetarian & Vegan Restaurant|Health Food Restaurant",
    bar: "Wine Bar|Cafe|Gastropub|bar|Bar|Sports Bar|Pub|Smoothie & Juice Bar|Dive Bar|cafe|Coffee Shop|Social Club|Bar & Grill|Night Club|Internet Cafe|Cupcake Shop|Lounge",
    benessere: "Spas/Beauty/Personal Care|spa|beauty_salon|Cosmetics & Beauty Supply|Beauty Salon|Health Spa|Aesthetics|Health/Beauty|Hair & Beauty Supply|Hair Removal|Plastic Surgery|Nutritionist|Hair Salon|Barber Shop",
    tech: "Web Design|Internet|Web|Advertising Agency|Advertising|Marketing Consultant",
    parrucchiera: "hair_care|hairpieces & extensions",
    accessori: "accessories store",
    farmacia: "pharmacy|pharmacy/drugstore",
    sports: "Sports Venue & Stadium|gym|Sports & Recreation|Tennis|Massage|Personal Coaching|Physical Fitness|Rock Climbing|Recreational Vehicle Dealer|Mountain Biking|Bike Shop|bicycle_store|stadium|Sportswear|Yoga & Pilates|Personal Trainer|Outdoor Recreation|Gym/Physical Fitness Center|Martial Arts|Sports Club|Recreation Center|Sporting Goods Store|Athletic Education|Sports Event|Swimming Pool|Sports Instruction|Sports Promoter",
    musica: "Broadcasting & Media Production|Music Lessons & Instruction|Music Production|Musician/Band|Music Store|Musical Instrument Store",
    posti_storici: "Historical Place",
    agenzia_viaggio: "travel_agency|Tourist Information|Tour Guide|Travel Agency",
    libreria: "Book Store|book_store|Comic Book Store",
    fumetteria: "Comic Book Store",
    biblioteca: "Library",
    universita: "College & University|Medical School",
    web_design: "web design",
    graphic_design: "Graphic Design",
    agency: "Advertising Agency|Marketing Consultant",
    hotel: "Hotel|lodging|Hostel|Bed and Breakfast",
    bed_and_breakfast: "Bed and Breakfast",
    abbigliamento: "clothing_store|Bridal Shop|Clothing Store|Children's Clothing Store|Men's Clothing Store|Shoe Store|shoe_store|Women's Clothing Store",
    abbigliamento_uomo: "Men's Clothing Store",
    abbigliamento_donna: "Women's Clothing Store|Bridal Shop",
    sposa: "Bridal Shop",
    abbigliamento_bambino: "Children's Clothing Store",
    scarpe: "Shoe Store|shoe_store",
    gioielleria: "Jewelry Store|jewelry_store",
    giardinaggio: "Gardener|Florist",
    arredamento: "Textiles|Furniture Store|home_goods_store|furniture_store|Lighting Fixtures",
    casalinghi: "Housewares|home_goods_store",
    automobili: "Tire Dealer & Repair Shop|Glass Service|car_repair|Car Dealership|car_dealer|Automobiles and Parts|Automotive Body Shop|RV Repair|Recreational Vehicle Dealer|Automotive",
    camion: "Truck Rental",
    riparazioni: "Repair Service",
    smartphone: "Mobile Phone Shop",
    computer_elettronica: "Security|Computers & Electronics|Computer Service|Internet Service Provider|Radio & Communication Equipment|Computer Store|electronics_store",
    scuola: "Culinary School|Language School|school|Music Lessons & Instruction|School|Medical School|university|Public School|Art School|High School|Dance Instruction|Private School|Educational Camp|Educational Service",
    forze_dell_ordine: "Police Station",
    polizia: "Police Station",
    educazione_istruzione: "Educational Service|Music Lessons & Instruction|School|Education|school|Performing Arts Education|Athletic Education|Language School|Classes|Educational Camp",
    ottica: "Eyewear",
    medicina: "Eyewear|Physical Therapist|Doctor|doctor|Optometrist|Medical Center|Dentist|Hospital/Clinic|dentist|Medical Research",
    parco: "park",
    pizzeria: "Pizza Place",
    assicurazioni: "Insurance Broker|Insurance Agent|insurance_agency",
    consulenze_finanziarie: "Insurance Broker|Insurance Agent|Bank|insurance_agency|atm|finance|bank|Tax Preparation|Accountant|Business Service|accounting|Investing Service|Financial Planning|Business Consultant|Corporate Lawyer",
    avvocato: "Lawyer|lawyer|Law Practice|Divorce & Family Lawyer|Corporate Lawyer|Wills & Estate Lawyer",
    ufficio_pubblico: "city_hall|local_government_office|Government Organization|City Hall|Public Places & Attractions|library|Train Station|Police station",
    luogo_interesse: "Travel/Leisure|Landmark|Train Station|Historical Place",
    agricultura: "Farming/Agriculture|Agricultural Service|Farm",
    frutta_verdura: "Fruit & Vegetable Store",
    museo: "museum|history museum",
    negozio: "store",
    event_planner: "event planner",
    ferramenta: "hardware_store|hardware store",
    "ristorante_text_mex": "Tex-Mex Restaurant",
    "ristorante_italiano": "Italian Restaurant",
    "bar_sport": "Sports Bar",
    "fast_food": "Fast Food Restaurant",
    "ristorante_pesce": "Seafood Restaurant",
    "piccola_ristorazione": "Diner",
    "buffet": "Buffet Restaurant",
    "colazioni_brunch": "Breakfast & Brunch Restaurant",
    "ristorante_famiglie": "Family Style Restaurant",
    "ristorante_greco": "Greek Restaurant",
    "sushi": "Sushi Restaurant",
    "hamburger": "Burger Restaurant",
    "panini": "Sandwich Shop",
    "ristorante_thai": "Thai Restaurant",
    "donuts_bagels": "Donuts & Bagels",
    "ristorante_cinese": "Cantonese Restaurant|Asian Restaurant",
    "ristorante_brasiliano": "Brazilian Restaurant",
    "ristorante_europeo": "Modern European Restaurant",
    "ristorante_napoletano": "Nepalese Restaurant",
    "ristorante_mediterraneo": "Mediterranean Restaurant",
    enoteca: "Liquor Store|Wine bar",
    supermercato: "shopping mall|shopping_mall|department_store|convenience store",
    catering: "caterer|wedding planning",
    alimentari: "grocery store",
    cantina: "winery/vineyard",
    cartoleria: "office supplies|gift shop",
    "stadio": "stadium",
    "palestra": "gym|Physical Fitness|Gym/Physical Fitness Center",
    "tennis": "Tennis",
    "massaggi": "Massage",
    "personal_trainer": "Personal Coaching|Personal Trainer",
    "climbing": "Rock Climbing",
    "bicicletta": "Mountain Biking|Bike Shop|bicycle_store",
    "yoga_pilates": "Yoga & Pilates",
    "arti_marziali": "Martial Arts",
    "club_sportivo": "Sports Club",
    "centro_ricreativo": "Recreation Center",
    "negozio_sportivo": "Sporting Goods Store",
    "piscina": "Swimming Pool",
    "scuola_musica": "Music Lessons & Instruction",
    "produzione_musicale": "Music Production",
    "gruppo_musicale": "Musician/Band",
    "negozio_musica": "Music Store|Musical Instrument Store",
    fiorista_vivaio: "florist",
    banca: "bank|commercial bank|credit counseling|bank/financial service",
    sartoria: "sewing & seamstress",
    ospedale: "nursing home|clinic|hospital|nursing|Hospital/Clinic",
    picnic: "picnic ground",
    arte_intrattenimento: "arts & entertainment|arts & marketing",
    organizzazione_no_profit: "non-profit organization",
    architetto: "architect|interior designer"
};
var esclusioni = "professional service|retail and consumer merchandise|amusement|performance venue|organization|non-governmental organization (ngo)|Local Business|point_of_interest|establishment".toLowerCase().split("|");
var keys = Object.keys(Categories);
//dall'alto al basso AL CONTRARIO PERCHE' tranducer
var xf = R.compose(R.filter(cat=> {
    return !esclusioni.includes(cat.toLowerCase());
}), R.map(cat=> {
    cat = cat.toLowerCase();
    var newCats = keys.filter(key=> {
        let regex = Categories[key].toLowerCase().split("|");
        return regex.includes(cat);
    });
    if (newCats.length) {
        return newCats
    } else {
        return [cat]
    }
}));
exports.map = R.compose(R.uniq, R.flatten, R.into([], xf));
/*function (categories) {
 var results=R.flatten(R.into([],xf,categories));
 return R.uniq(results)
 };*/
exports.Categories = Categories;

