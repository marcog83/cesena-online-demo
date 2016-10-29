const goog = require("../google-places/categories");
var map = {
    "Education": a=> {
        return [goog.school]
    },
    "Financial Services": a=> {
        return [goog.finance]
    },
    "Food & Restaurant": a=> {
        return [goog.food,goog.restaurant]
    },
    "Lodging": a=> {
        return [goog.lodging]
    },
    "Medical & Health": a=> {
        return [goog.health]
    },
    "Pet Service": a=> {
        return [goog.pet_store,goog.veterinary_care]
    },
    "Public Places & Attractions": a=> {
        return [goog.attraction]
    },
    "Religious Center": a=> {
        return [goog.church]
    },
    "Residence": a=> {
        return [goog.residence]
    },
    "Restaurant": a=> {
        return [goog.restaurant]
    },
    "Spa, Beauty & Personal Care": a=> {
        return [goog.spa,goog.beauty_salon]
    },
    "Arts & Entertainment": a=> {
        return [goog.art_gallery,goog.museum]
    },
    "Automotive": a=> {
        return [goog.car_dealer]
    },
    "Business Services": a=> {
        return []
    },
    "Community & Government": a=> {
        return []
    },
    "Event Planning": a=> {
        return []
    },
    "Food & Grocery": a=> {
        return [goog.food,goog.grocery_or_supermarket]
    },
    "Home Improvement": a=> {
        return [goog.home_goods_store]
    },
    "Just For Fun": a=> {
        return []
    },
    "Professional Services": a=> {
        return []
    },
    "Real Estate": a=> {
        return [goog.real_estate_agency]
    },
    "Shopping & Retail": a=> {
        return [goog.shopping_mall]
    },
    "Sports & Recreation": a=> {
        return [goog.sports]
    },
    "Tours & Sightseeing": a=> {
        return []
    },
    "Travel & Transportation": a=> {
        return [goog.train_station,goog.bus_station]
    },
    "Workplace & Office": a=> {
        return [goog.workplace]
    },
    "Abortion Services": a=> {
        return []
    },
    "Accessories Store": a=> {
        return [goog.store]
    },
    "Accountant": a=> {
        return [goog.accounting]
    },
    "Active Life": a=> {
        return []
    },
    "Acupuncture": a=> {
        return [goog.health]
    },
    "Addiction Resources": a=> {
        return [goog.health]
    },
    "Admissions Training": a=> {
        return []
    },
    "Adoption Service": a=> {
        return []
    },
    "Adult Education": a=> {
        return []
    },
    "Adult Entertainment": a=> {
        return []
    },
    "Advertising Agency": a=> {
        return [goog.age]
    },
    "Advertising Service": a=> {
        return
    },
    "Afghani Restaurant": a=> {
        return
    },
    "African Methodist Episcopal Church": a=> {
        return
    },
    "African Restaurant": a=> {
        return
    },
    "Agricultural Service": a=> {
        return
    },
    "AIDS Resources": a=> {
        return
    },
    "Airline": a=> {
        return
    },
    "Airline Industry Services": a=> {
        return
    },
    "Airport Lounge": a=> {
        return
    },
    "Airport Shuttle": a=> {
        return
    },
    "Airport Terminal": a=> {
        return
    },
    "Allergist": a=> {
        return
    },
    "Allergy Doctor": a=> {
        return
    },
    "Alternative & Holistic Health": a=> {
        return
    },
    "Ambulance & Rescue": a=> {
        return
    },
    "American Restaurant": a=> {
        return
    },
    "Amusement": a=> {
        return
    },
    "Amusement Park Ride": a=> {
        return
    },
    "Anglican Church": a=> {
        return
    },
    "Animal Shelter": a=> {
        return
    },
    "Antique Store": a=> {
        return
    },
    "Antiques & Vintage": a=> {
        return
    },
    "Apartment & Condo Building": a=> {
        return
    },
    "Apostolic Church": a=> {
        return
    },
    "Appliances": a=> {
        return
    },
    "Appraiser": a=> {
        return
    },
    "Arcade": a=> {
        return
    },
    "Archaeological Services": a=> {
        return
    },
    "Archery": a=> {
        return
    },
    "Architect": a=> {
        return
    },
    "Argentine Restaurant": a=> {
        return
    },
    "Armed Forces": a=> {
        return
    },
    "Armored Cars": a=> {
        return
    },
    "Aromatherapy": a=> {
        return
    },
    "Art Gallery": a=> {
        return
    },
    "Art Museum": a=> {
        return
    },
    "Art Restoration": a=> {
        return
    },
    "Art School": a=> {
        return
    },
    "Artistic Services": a=> {
        return
    },
    "Arts & Crafts Supply Store": a=> {
        return
    },
    "Arts & Marketing": a=> {
        return
    },
    "Asian Fusion Restaurant": a=> {
        return
    },
    "Asian Restaurant": a=> {
        return
    },
    "Assembly of God": a=> {
        return
    },
    "Athletic Education": a=> {
        return
    },
    "ATVs & Golf Carts": a=> {
        return
    },
    "Auction House": a=> {
        return
    },
    "Audiologist": a=> {
        return
    },
    "Audiovisual Equipment": a=> {
        return
    },
    "Auditorium": a=> {
        return
    },
    "Auto Body Shop": a=> {
        return
    },
    "Auto Glass": a=> {
        return
    },
    "Automation Services": a=> {
        return
    },
    "Automobile Leasing": a=> {
        return
    },
    "Automotive Consultant": a=> {
        return
    },
    "Automotive Customizing": a=> {
        return
    },
    "Automotive Manufacturing": a=> {
        return
    },
    "Automotive Parts & Accessories": a=> {
        return
    },
    "Automotive Repair": a=> {
        return
    },
    "Automotive Restoration": a=> {
        return
    },
    "Automotive Storage": a=> {
        return
    },
    "Automotive Trailer Services": a=> {
        return
    },
    "Automotive Wholesaler": a=> {
        return
    },
    "Aviation Fuel": a=> {
        return
    },
    "Aviation School": a=> {
        return
    },
    "Awnings & Canopies": a=> {
        return
    },
    "Babysitter": a=> {
        return
    },
    "Bail Bonds": a=> {
        return
    },
    "Bakery": a=> {
        return
    },
    "Bands & Musicians": a=> {
        return
    },
    "Bank": a=> {
        return
    },
    "Bank Equipment & Service": a=> {
        return
    },
    "Bankruptcy Lawyer": a=> {
        return
    },
    "Baptist Church": a=> {
        return
    },
    "Bar & Grill": a=> {
        return
    },
    "Barbecue Restaurant": a=> {
        return
    },
    "Barber Shop": a=> {
        return
    },
    "Bartending Service": a=> {
        return
    },
    "Basque Restaurant": a=> {
        return
    },
    "Batting Cage": a=> {
        return
    },
    "Beach": a=> {
        return
    },
    "Beach Resort": a=> {
        return
    },
    "Beauty Salon": a=> {
        return
    },
    "Bed and Breakfast": a=> {
        return
    },
    "Beer Garden": a=> {
        return
    },
    "Belgian Restaurant": a=> {
        return
    },
    "Big Box Retailer": a=> {
        return
    },
    "Bike Rental & Bike Share": a=> {
        return
    },
    "Bike Shop": a=> {
        return
    },
    "Bingo Hall": a=> {
        return
    },
    "Biotechnology": a=> {
        return
    },
    "Blinds & Curtains": a=> {
        return
    },
    "Blood Bank": a=> {
        return
    },
    "Boat Dealer": a=> {
        return
    },
    "Boat Rental": a=> {
        return
    },
    "Boat Service": a=> {
        return
    },
    "Boating": a=> {
        return
    },
    "Book & Magazine Distribution": a=> {
        return
    },
    "Borough": a=> {
        return
    },
    "Bowling Alley": a=> {
        return
    },
    "Brazilian Restaurant": a=> {
        return
    },
    "Breakfast & Brunch Restaurant": a=> {
        return
    },
    "Brewery": a=> {
        return
    },
    "Bridal Shop": a=> {
        return
    },
    "Bridge": a=> {
        return
    },
    "British Restaurant": a=> {
        return
    },
    "Broadcasting & Media Production": a=> {
        return
    },
    "Brokers & Franchising": a=> {
        return
    },
    "Buddhist Temple": a=> {
        return
    },
    "Buffet Restaurant": a=> {
        return
    },
    "Burger Restaurant": a=> {
        return
    },
    "Burial & Cremation Service": a=> {
        return
    },
    "Burmese Restaurant": a=> {
        return
    },
    "Bus Line": a=> {
        return
    },
    "Bus Station": a=> {
        return
    },
    "Business Center": a=> {
        return
    },
    "Business Consultant": a=> {
        return
    },
    "Business Supply Service": a=> {
        return
    },
    "Butcher": a=> {
        return
    },
    "Cabin": a=> {
        return
    },
    "Cabinets & Countertops": a=> {
        return
    },
    "Cable & Satellite Service": a=> {
        return
    },
    "Cafe": a=> {
        return
    },
    "Cafeteria": a=> {
        return
    },
    "Cajun & Creole Restaurant": a=> {
        return
    },
    "Cambodian Restaurant": a=> {
        return
    },
    "Camera Store": a=> {
        return
    },
    "Camp": a=> {
        return
    },
    "Campground": a=> {
        return
    },
    "Campus Building": a=> {
        return
    },
    "Canadian Restaurant": a=> {
        return
    },
    "Candy Store": a=> {
        return
    },
    "Cantonese Restaurant": a=> {
        return
    },
    "Car Dealership": a=> {
        return
    },
    "Car Parts & Accessories": a=> {
        return
    },
    "Car Rental": a=> {
        return
    },
    "Car Wash & Detailing": a=> {
        return
    },
    "Cargo & Freight": a=> {
        return
    },
    "Caribbean Restaurant": a=> {
        return
    },
    "Carnival Supplies": a=> {
        return
    },
    "Carpenter": a=> {
        return
    },
    "Carpet Cleaner": a=> {
        return
    },
    "Carpet & Flooring Store": a=> {
        return
    },
    "Cash Advance Service": a=> {
        return
    },
    "Casino": a=> {
        return
    },
    "Caterer": a=> {
        return
    },
    "Catholic Church": a=> {
        return
    },
    "Cemetery": a=> {
        return
    },
    "Charismatic Church": a=> {
        return
    },
    "Charity Organization": a=> {
        return
    },
    "Charter Buses": a=> {
        return
    },
    "Cheerleading": a=> {
        return
    },
    "Chemicals & Gasses": a=> {
        return
    },
    "Chicken Restaurant": a=> {
        return
    },
    "Chicken Wings": a=> {
        return
    },
    "Child Care": a=> {
        return
    },
    "Child Protective Services": a=> {
        return
    },
    "Children's Clothing Store": a=> {
        return
    },
    "Chinese Restaurant": a=> {
        return
    },
    "Chiropractor": a=> {
        return
    },
    "Christian Church": a=> {
        return
    },
    "Christian Science Church": a=> {
        return
    },
    "Church": a=> {
        return
    },
    "Church of Christ": a=> {
        return
    },
    "Church of God": a=> {
        return
    },
    "Church of Jesus Christ of Latter-day Saints": a=> {
        return
    },
    "Circus": a=> {
        return
    },
    "City Hall": a=> {
        return
    },
    "Classes": a=> {
        return
    },
    "Cleaning Service": a=> {
        return
    },
    "Clergy": a=> {
        return
    },
    "Clinic": a=> {
        return
    },
    "Clothing Store": a=> {
        return
    },
    "Clothing Supply & Distribution": a=> {
        return
    },
    "Clubhouse": a=> {
        return
    },
    "Coffee Shop": a=> {
        return
    },
    "Collectibles Store": a=> {
        return
    },
    "Collection Agency": a=> {
        return
    },
    "College & University": a=> {
        return
    },
    "Comedy Club": a=> {
        return
    },
    "Comic Book Store": a=> {
        return
    },
    "Commercial Automotive": a=> {
        return
    },
    "Commercial Bank": a=> {
        return
    },
    "Commercial & Industrial": a=> {
        return
    },
    "Commercial & Industrial Equipment": a=> {
        return
    },
    "Commercial Real Estate": a=> {
        return
    },
    "Community Center": a=> {
        return
    },
    "Community Organization": a=> {
        return
    },
    "Computer Services": a=> {
        return
    },
    "Computer Store": a=> {
        return
    },
    "Computer Training": a=> {
        return
    },
    "Computers & Electronics": a=> {
        return
    },
    "Concrete Contractor": a=> {
        return
    },
    "Congregational Church": a=> {
        return
    },
    "Construction Service & Supply": a=> {
        return
    },
    "Consulate & Embassy": a=> {
        return
    },
    "Continental Restaurant": a=> {
        return
    },
    "Contractor": a=> {
        return
    },
    "Convenience Store": a=> {
        return
    },
    "Convent & Monastery": a=> {
        return
    },
    "Convention Center": a=> {
        return
    },
    "Cooking Lesson": a=> {
        return
    },
    "Copying & Printing": a=> {
        return
    },
    "Copyright Lawyer": a=> {
        return
    },
    "Copywriting Service": a=> {
        return
    },
    "Corporate Lawyer": a=> {
        return
    },
    "Corporate Office": a=> {
        return
    },
    "Cosmetics & Beauty Supply": a=> {
        return
    },
    "Costume Shop": a=> {
        return
    },
    "Cottage": a=> {
        return
    },
    "Counseling & Mental Health": a=> {
        return
    },
    "County": a=> {
        return
    },
    "Courthouse": a=> {
        return
    },
    "Credit Counseling": a=> {
        return
    },
    "Criminal Lawyer": a=> {
        return
    },
    "Crisis Prevention Center": a=> {
        return
    },
    "Crêperie": a=> {
        return
    },
    "Cruise": a=> {
        return
    },
    "Cruise Excursions": a=> {
        return
    },
    "Cuban Restaurant": a=> {
        return
    },
    "Culinary School": a=> {
        return
    },
    "Cultural Gifts Store": a=> {
        return
    },
    "Cupcake Shop": a=> {
        return
    },
    "Currency Exchange": a=> {
        return
    },
    "Cyber Cafe": a=> {
        return
    },
    "Damage Restoration Service": a=> {
        return
    },
    "Dance Club": a=> {
        return
    },
    "Dance Instruction": a=> {
        return
    },
    "Dating Service": a=> {
        return
    },
    "Day Care & Preschool": a=> {
        return
    },
    "Day Spa": a=> {
        return
    },
    "Deck & Patio": a=> {
        return
    },
    "Deli": a=> {
        return
    },
    "Dental Equipment": a=> {
        return
    },
    "Dentist": a=> {
        return
    },
    "Department Store": a=> {
        return
    },
    "Dermatologist": a=> {
        return
    },
    "Dessert Place": a=> {
        return
    },
    "Dim Sum Restaurant": a=> {
        return
    },
    "Diner": a=> {
        return
    },
    "Direct Mail Service": a=> {
        return
    },
    "Disability Services": a=> {
        return
    },
    "Disabled Persons Services": a=> {
        return
    },
    "Disaster Relief": a=> {
        return
    },
    "Discount Store": a=> {
        return
    },
    "Dive Bar": a=> {
        return
    },
    "Divorce & Family Lawyer": a=> {
        return
    },
    "DJ": a=> {
        return
    },
    "DMV": a=> {
        return
    },
    "Document Service": a=> {
        return
    },
    "Dog Training": a=> {
        return
    },
    "Dog Walker": a=> {
        return
    },
    "Donuts & Bagels": a=> {
        return
    },
    "Dorm": a=> {
        return
    },
    "Drinking Water Distribution": a=> {
        return
    },
    "Drive In Restaurant": a=> {
        return
    },
    "Driving Range": a=> {
        return
    },
    "Driving School": a=> {
        return
    },
    "Drug & Alcohol Rehab": a=> {
        return
    },
    "Drugstore": a=> {
        return
    },
    "Dry Cleaner": a=> {
        return
    },
    "DVD & Video Store": a=> {
        return
    },
    "Eastern Orthodox Church": a=> {
        return
    },
    "Eco Tours": a=> {
        return
    },
    "Educational Camp": a=> {
        return
    },
    "Educational Consultant": a=> {
        return
    },
    "Educational Organization": a=> {
        return
    },
    "Educational Research": a=> {
        return
    },
    "Educational Service": a=> {
        return
    },
    "Educational Supplies": a=> {
        return
    },
    "Electrician": a=> {
        return
    },
    "Electronic Equipment Service": a=> {
        return
    },
    "Electronics Store": a=> {
        return
    },
    "Elementary School": a=> {
        return
    },
    "Elevator Services": a=> {
        return
    },
    "Email Marketing": a=> {
        return
    },
    "Emergency Roadside Service": a=> {
        return
    },
    "Emissions Inspection": a=> {
        return
    },
    "Employment Agency": a=> {
        return
    },
    "Employment Lawyer": a=> {
        return
    },
    "Engineering Service": a=> {
        return
    },
    "Entertainment Service": a=> {
        return
    },
    "Environmental Conservation": a=> {
        return
    },
    "Environmental Consultant": a=> {
        return
    },
    "Episcopal Church": a=> {
        return
    },
    "Equipment Service & Supply": a=> {
        return
    },
    "Escrow Services": a=> {
        return
    },
    "Estate Lawyer": a=> {
        return
    },
    "Estate Planning": a=> {
        return
    },
    "Aesthetics": a=> {
        return
    },
    "Ethiopian Restaurant": a=> {
        return
    },
    "Ethnic Grocery Store": a=> {
        return
    },
    "Evangelical Church": a=> {
        return
    },
    "Event Planner": a=> {
        return
    },
    "Event Venue": a=> {
        return
    },
    "Excavation & Wrecking": a=> {
        return
    },
    "Exchange Program": a=> {
        return
    },
    "Exotic Car Rental": a=> {
        return
    },
    "Eyewear": a=> {
        return
    },
    "Fairground": a=> {
        return
    },
    "Family Doctor": a=> {
        return
    },
    "Family Medicine Practice": a=> {
        return
    },
    "Family Style Restaurant": a=> {
        return
    },
    "Farm": a=> {
        return
    },
    "Farmers Market": a=> {
        return
    },
    "Fashion Designer": a=> {
        return
    },
    "Fast Food Restaurant": a=> {
        return
    },
    "Ferry & Boat": a=> {
        return
    },
    "Filipino Restaurant": a=> {
        return
    },
    "Financial Aid": a=> {
        return
    },
    "Financial Planning": a=> {
        return
    },
    "Fine Dining Restaurant": a=> {
        return
    },
    "Fire Protection": a=> {
        return
    },
    "Fire Station": a=> {
        return
    },
    "Fireplaces": a=> {
        return
    },
    "Fireproofing": a=> {
        return
    },
    "Fireworks Retailer": a=> {
        return
    },
    "First Aid Class": a=> {
        return
    },
    "First Aid Service": a=> {
        return
    },
    "Fish & Chips Shop": a=> {
        return
    },
    "Fishing": a=> {
        return
    },
    "Fitness Center": a=> {
        return
    },
    "Flea Market": a=> {
        return
    },
    "Florist": a=> {
        return
    },
    "Fondue Restaurant": a=> {
        return
    },
    "Food & Beverage Service & Distribution": a=> {
        return
    },
    "Food & Beverage Service & Distribution": a=> {
        return
    },
    "Food Consultant": a=> {
        return
    },
    "Food Stand": a=> {
        return
    },
    "Food Truck": a=> {
        return
    },
    "Forestry & Logging": a=> {
        return
    },
    "Formal Wear": a=> {
        return
    },
    "Franchising Service": a=> {
        return
    },
    "French Restaurant": a=> {
        return
    },
    "Frozen Yogurt Shop": a=> {
        return
    },
    "Fruit & Vegetable Store": a=> {
        return
    },
    "Full Gospel Church": a=> {
        return
    },
    "Funeral Service": a=> {
        return
    },
    "Furniture Repair": a=> {
        return
    },
    "Furniture Store": a=> {
        return
    },
    "Garage Door Services": a=> {
        return
    },
    "Garden Center": a=> {
        return
    },
    "Gardener": a=> {
        return
    },
    "Gas & Chemical Service": a=> {
        return
    },
    "Gas Station": a=> {
        return
    },
    "Gastropub": a=> {
        return
    },
    "Gay Bar": a=> {
        return
    },
    "Genealogist": a=> {
        return
    },
    "Geologic Service": a=> {
        return
    },
    "German Restaurant": a=> {
        return
    },
    "Gift Shop": a=> {
        return
    },
    "Glass Products": a=> {
        return
    },
    "Glass Service": a=> {
        return
    },
    "Gluten-Free Restaurant": a=> {
        return
    },
    "Go Karting": a=> {
        return
    },
    "Golf Course": a=> {
        return
    },
    "Government Organization": a=> {
        return
    },
    "Governmental Law": a=> {
        return
    },
    "Graphic Design": a=> {
        return
    },
    "Greek Restaurant": a=> {
        return
    },
    "Grocery Store": a=> {
        return
    },
    "Gun Range": a=> {
        return
    },
    "Gun Store": a=> {
        return
    },
    "Gym": a=> {
        return
    },
    "Hair & Beauty Supply": a=> {
        return
    },
    "Hair Removal": a=> {
        return
    },
    "Hair Replacement": a=> {
        return
    },
    "Hair Salon": a=> {
        return
    },
    "Hairpieces & Extensions": a=> {
        return
    },
    "Halal Restaurant": a=> {
        return
    },
    "Halfway House": a=> {
        return
    },
    "Handwriting Service": a=> {
        return
    },
    "Hardware Store": a=> {
        return
    },
    "Hardware & Tools Service": a=> {
        return
    },
    "Hawaiian Restaurant": a=> {
        return
    },
    "Health Agency": a=> {
        return
    },
    "Health Care Administration": a=> {
        return
    },
    "Health Food Restaurant": a=> {
        return
    },
    "Health Food Store": a=> {
        return
    },
    "Health Spa": a=> {
        return
    },
    "Healthcare Administrator": a=> {
        return
    },
    "Heating, Ventilating & Air Conditioning": a=> {
        return
    },
    "High School": a=> {
        return
    },
    "Highway": a=> {
        return
    },
    "Himalayan Restaurant": a=> {
        return
    },
    "Hindu Temple": a=> {
        return
    },
    "Historical Place": a=> {
        return
    },
    "History Museum": a=> {
        return
    },
    "Holiness Church": a=> {
        return
    },
    "Home": a=> {
        return
    },
    "Home Cleaning": a=> {
        return
    },
    "Home Inspection": a=> {
        return
    },
    "Home Security": a=> {
        return
    },
    "Home Theater Store": a=> {
        return
    },
    "Home Window Service": a=> {
        return
    },
    "Hookah Lounge": a=> {
        return
    },
    "Horse-Drawn Vehicles": a=> {
        return
    },
    "Horses": a=> {
        return
    },
    "Hospital": a=> {
        return
    },
    "Hospitality Service": a=> {
        return
    },
    "Hostel": a=> {
        return
    },
    "Hot Air Balloons": a=> {
        return
    },
    "Hot Dog Joint": a=> {
        return
    },
    "Hot Dog Stand": a=> {
        return
    },
    "Hotel Supply Service": a=> {
        return
    },
    "House Sitter": a=> {
        return
    },
    "Housewares": a=> {
        return
    },
    "Housing Assistance Service": a=> {
        return
    },
    "Housing & Homeless Shelter": a=> {
        return
    },
    "Hungarian Restaurant": a=> {
        return
    },
    "Hunting and Fishing": a=> {
        return
    },
    "Ice Cream Parlor": a=> {
        return
    },
    "Ice Machines": a=> {
        return
    },
    "Ice Skating": a=> {
        return
    },
    "Image Consultant": a=> {
        return
    },
    "Independent Church": a=> {
        return
    },
    "Indian Restaurant": a=> {
        return
    },
    "Indonesian Restaurant": a=> {
        return
    },
    "Inn": a=> {
        return
    },
    "Insurance Agent": a=> {
        return
    },
    "Insurance Broker": a=> {
        return
    },
    "Interdenominational Church": a=> {
        return
    },
    "Interior Designer": a=> {
        return
    },
    "Internal Medicine": a=> {
        return
    },
    "International Restaurant": a=> {
        return
    },
    "Internet Cafe": a=> {
        return
    },
    "Internet Service Provider": a=> {
        return
    },
    "Inventory Control Service": a=> {
        return
    },
    "Investing Service": a=> {
        return
    },
    "Irish Restaurant": a=> {
        return
    },
    "Italian Restaurant": a=> {
        return
    },
    "Janitorial Service": a=> {
        return
    },
    "Japanese Restaurant": a=> {
        return
    },
    "Jazz Club": a=> {
        return
    },
    "Jewelry Store": a=> {
        return
    },
    "Jewelry Supplier": a=> {
        return
    },
    "Juvenile Law": a=> {
        return
    },
    "Karaoke": a=> {
        return
    },
    "Kennel": a=> {
        return
    },
    "Kingdom Hall": a=> {
        return
    },
    "Kitchen Construction": a=> {
        return
    },
    "Korean Restaurant": a=> {
        return
    },
    "Kosher Restaurant": a=> {
        return
    },
    "Labor & Employment Law": a=> {
        return
    },
    "Laboratory Equipment": a=> {
        return
    },
    "Landscaping": a=> {
        return
    },
    "Language School": a=> {
        return
    },
    "Laser Hair Removal": a=> {
        return
    },
    "Laser Tag": a=> {
        return
    },
    "Late Night Restaurant": a=> {
        return
    },
    "Latin American Restaurant": a=> {
        return
    },
    "Laundromat": a=> {
        return
    },
    "Law Enforcement": a=> {
        return
    },
    "Law Practice": a=> {
        return
    },
    "Lebanese Restaurant": a=> {
        return
    },
    "Lifestyle Services": a=> {
        return
    },
    "Lighting Fixtures": a=> {
        return
    },
    "Limo Service": a=> {
        return
    },
    "Liquor Store": a=> {
        return
    },
    "Live & Raw Food Restaurant": a=> {
        return
    },
    "Loans": a=> {
        return
    },
    "Lobbyist": a=> {
        return
    },
    "Local Education": a=> {
        return
    },
    "Locksmith": a=> {
        return
    },
    "Lodge": a=> {
        return
    },
    "Lottery Retailer": a=> {
        return
    },
    "Lounge": a=> {
        return
    },
    "Luggage Service": a=> {
        return
    },
    "Lutheran Church": a=> {
        return
    },
    "Maid & Butler": a=> {
        return
    },
    "Makeup Artist": a=> {
        return
    },
    "Malaysian Restaurant": a=> {
        return
    },
    "Malpractice Law": a=> {
        return
    },
    "Management Service": a=> {
        return
    },
    "Manufacturing": a=> {
        return
    },
    "Marina": a=> {
        return
    },
    "Marine Equipment": a=> {
        return
    },
    "Marine Service Station": a=> {
        return
    },
    "Market": a=> {
        return
    },
    "Market Research Consultant": a=> {
        return
    },
    "Marketing Consultant": a=> {
        return
    },
    "Martial Arts": a=> {
        return
    },
    "Masonry": a=> {
        return
    },
    "Massage": a=> {
        return
    },
    "Mattress Manufacturing": a=> {
        return
    },
    "Mattress Wholesale": a=> {
        return
    },
    "Mattresses & Bedding": a=> {
        return
    },
    "Meat Shop": a=> {
        return
    },
    "Medical Center": a=> {
        return
    },
    "Medical Equipment": a=> {
        return
    },
    "Medical Lab": a=> {
        return
    },
    "Medical Research": a=> {
        return
    },
    "Medical School": a=> {
        return
    },
    "Medical Spa": a=> {
        return
    },
    "Medical Supplies": a=> {
        return
    },
    "Mediterranean Restaurant": a=> {
        return
    },
    "Meeting Room": a=> {
        return
    },
    "Mennonite Church": a=> {
        return
    },
    "Men's Clothing Store": a=> {
        return
    },
    "Merchandising Service": a=> {
        return
    },
    "Metals": a=> {
        return
    },
    "Methodist Church": a=> {
        return
    },
    "Mexican Restaurant": a=> {
        return
    },
    "Middle Eastern Restaurant": a=> {
        return
    },
    "Military Base": a=> {
        return
    },
    "Miniature Golf": a=> {
        return
    },
    "Mission": a=> {
        return
    },
    "Mobile Homes": a=> {
        return
    },
    "Mobile Phone Shop": a=> {
        return
    },
    "Modeling Agency": a=> {
        return
    },
    "Modern Art Museum": a=> {
        return
    },
    "Modern European Restaurant": a=> {
        return
    },
    "Mongolian Restaurant": a=> {
        return
    },
    "Monument": a=> {
        return
    },
    "Moroccan Restaurant": a=> {
        return
    },
    "Mortgage Brokers": a=> {
        return
    },
    "Mosque": a=> {
        return
    },
    "Motel": a=> {
        return
    },
    "Motorcycle Repair": a=> {
        return
    },
    "Motorcycles": a=> {
        return
    },
    "Mountain Biking": a=> {
        return
    },
    "Mover": a=> {
        return
    },
    "Movie & Television Studio": a=> {
        return
    },
    "Movie Theater": a=> {
        return
    },
    "Music Lessons & Instruction": a=> {
        return
    },
    "Music Production": a=> {
        return
    },
    "Music Store": a=> {
        return
    },
    "Musical Instrument Store": a=> {
        return
    },
    "Nail Salon": a=> {
        return
    },
    "Nanny": a=> {
        return
    },
    "National Park": a=> {
        return
    },
    "Nazarene Church": a=> {
        return
    },
    "Nepalese Restaurant": a=> {
        return
    },
    "New American Restaurant": a=> {
        return
    },
    "Night Club": a=> {
        return
    },
    "Nightlife": a=> {
        return
    },
    "Nondenominational Church": a=> {
        return
    },
    "Notary Public": a=> {
        return
    },
    "Nursing": a=> {
        return
    },
    "Nursing Home": a=> {
        return
    },
    "Nutritionist": a=> {
        return
    },
    "OBGYN": a=> {
        return
    },
    "Occupational Safety": a=> {
        return
    },
    "Occupational Therapist": a=> {
        return
    },
    "Ocean": a=> {
        return
    },
    "Oil Lube & Filter Service": a=> {
        return
    },
    "Oncologist": a=> {
        return
    },
    "Ophthalmologist": a=> {
        return
    },
    "Optometrist": a=> {
        return
    },
    "Orchestra": a=> {
        return
    },
    "Organization": a=> {
        return
    },
    "Otolaryngologist": a=> {
        return
    },
    "Outdoor Equipment Store": a=> {
        return
    },
    "Outdoor Recreation": a=> {
        return
    },
    "Outdoor Services": a=> {
        return
    },
    "Outdoors": a=> {
        return
    },
    "Outlet Store": a=> {
        return
    },
    "Packaging Supplies & Equipment": a=> {
        return
    },
    "Paintball": a=> {
        return
    },
    "Painter": a=> {
        return
    },
    "Pakistani Restaurant": a=> {
        return
    },
    "Park": a=> {
        return
    },
    "Parking": a=> {
        return
    },
    "Party Center": a=> {
        return
    },
    "Party Supplies": a=> {
        return
    },
    "Passport & Visa Service": a=> {
        return
    },
    "Patent Trademark & Copyright Law": a=> {
        return
    },
    "Patrol & Security": a=> {
        return
    },
    "Paving & Asphalt Service": a=> {
        return
    },
    "Pawn Shop": a=> {
        return
    },
    "Pawn Shop": a=> {
        return
    },
    "Pediatrics": a=> {
        return
    },
    "Pentecostal Church": a=> {
        return
    },
    "Performance Venue": a=> {
        return
    },
    "Performing Arts Education": a=> {
        return
    },
    "Persian Restaurant": a=> {
        return
    },
    "Personal Coaching": a=> {
        return
    },
    "Personal Trainer": a=> {
        return
    },
    "Peruvian Restaurant": a=> {
        return
    },
    "Pest Control": a=> {
        return
    },
    "Pet Breeder": a=> {
        return
    },
    "Pet Cemetery": a=> {
        return
    },
    "Pet Groomer": a=> {
        return
    },
    "Pet Sitter": a=> {
        return
    },
    "Pet Store": a=> {
        return
    },
    "Petroleum Services": a=> {
        return
    },
    "Petting Zoo": a=> {
        return
    },
    "Pharmacy": a=> {
        return
    },
    "Pho Restaurant": a=> {
        return
    },
    "Photographic Services & Equipment": a=> {
        return
    },
    "Physical Fitness": a=> {
        return
    },
    "Physical Therapist": a=> {
        return
    },
    "Physician Assistant": a=> {
        return
    },
    "Picnic Ground": a=> {
        return
    },
    "Pizza Place": a=> {
        return
    },
    "Plastic Surgery": a=> {
        return
    },
    "Plastics": a=> {
        return
    },
    "Playground": a=> {
        return
    },
    "Plumber": a=> {
        return
    },
    "Podiatrist": a=> {
        return
    },
    "Police Station": a=> {
        return
    },
    "Polish Restaurant": a=> {
        return
    },
    "Political Organization": a=> {
        return
    },
    "Polynesian Restaurant": a=> {
        return
    },
    "Pool & Billiards": a=> {
        return
    },
    "Port": a=> {
        return
    },
    "Portable Building Service": a=> {
        return
    },
    "Portable Toilet Rentals": a=> {
        return
    },
    "Portuguese Restaurant": a=> {
        return
    },
    "Post Office": a=> {
        return
    },
    "Pregnancy & Childbirth Service": a=> {
        return
    },
    "Presbyterian Church": a=> {
        return
    },
    "Preschool": a=> {
        return
    },
    "Printing Service": a=> {
        return
    },
    "Prison & Correctional Facility": a=> {
        return
    },
    "Private Investigator": a=> {
        return
    },
    "Private Plane Charter": a=> {
        return
    },
    "Private School": a=> {
        return
    },
    "Private Transportation": a=> {
        return
    },
    "Promotional Item Services": a=> {
        return
    },
    "Property Law": a=> {
        return
    },
    "Property Management": a=> {
        return
    },
    "Psychic": a=> {
        return
    },
    "Psychologist": a=> {
        return
    },
    "Pub": a=> {
        return
    },
    "Public Relations": a=> {
        return
    },
    "Public School": a=> {
        return
    },
    "Public Services": a=> {
        return
    },
    "Public Square": a=> {
        return
    },
    "Public Transportation": a=> {
        return
    },
    "Public Utility": a=> {
        return
    },
    "Race Cars": a=> {
        return
    },
    "Race Track": a=> {
        return
    },
    "Racquetball Court": a=> {
        return
    },
    "Radio & Communication Equipment": a=> {
        return
    },
    "Rafting": a=> {
        return
    },
    "Railroad": a=> {
        return
    },
    "Ramen Restaurant": a=> {
        return
    },
    "Real Estate Agent": a=> {
        return
    },
    "Real Estate Appraiser": a=> {
        return
    },
    "Real Estate Developer": a=> {
        return
    },
    "Real Estate Investment": a=> {
        return
    },
    "Real Estate Lawyer": a=> {
        return
    },
    "Real Estate Service": a=> {
        return
    },
    "Real Estate Title & Development": a=> {
        return
    },
    "Recreation Center": a=> {
        return
    },
    "Recreation Center": a=> {
        return
    },
    "Recreational Vehicle Dealer": a=> {
        return
    },
    "Recruiter": a=> {
        return
    },
    "Recycling & Waste Management": a=> {
        return
    },
    "Recycling & Waste Management": a=> {
        return
    },
    "Refrigeration": a=> {
        return
    },
    "Refrigeration Sales & Service": a=> {
        return
    },
    "Region": a=> {
        return
    },
    "Religious Book Store": a=> {
        return
    },
    "Religious Organization": a=> {
        return
    },
    "Religious School": a=> {
        return
    },
    "Rent to Own Store": a=> {
        return
    },
    "Rental Company": a=> {
        return
    },
    "Rental Shop": a=> {
        return
    },
    "Repair Service": a=> {
        return
    },
    "Reproductive Services": a=> {
        return
    },
    "Research Service": a=> {
        return
    },
    "Reservoir": a=> {
        return
    },
    "Resort": a=> {
        return
    },
    "Restaurant Supply": a=> {
        return
    },
    "Restaurant Wholesale": a=> {
        return
    },
    "Retirement & Assisted Living Facility": a=> {
        return
    },
    "Robotics": a=> {
        return
    },
    "Rock Climbing": a=> {
        return
    },
    "Rodeo": a=> {
        return
    },
    "Roller Coaster": a=> {
        return
    },
    "Roofer": a=> {
        return
    },
    "Rubber Service & Supply": a=> {
        return
    },
    "Russian Restaurant": a=> {
        return
    },
    "RV Dealership": a=> {
        return
    },
    "RV Park": a=> {
        return
    },
    "RV Repair": a=> {
        return
    },
    "Safety & First Aid Service": a=> {
        return
    },
    "Salad Bar": a=> {
        return
    },
    "Salvation Army": a=> {
        return
    },
    "Sandwich Shop": a=> {
        return
    },
    "Scandinavian Restaurant": a=> {
        return
    },
    "School Fundraiser": a=> {
        return
    },
    "School Transportation": a=> {
        return
    },
    "Scooter Rental": a=> {
        return
    },
    "Screen Printing & Embroidery": a=> {
        return
    },
    "Scuba Diving": a=> {
        return
    },
    "Seafood Restaurant": a=> {
        return
    },
    "Seasonal Store": a=> {
        return
    },
    "Secretarial Service": a=> {
        return
    },
    "Security": a=> {
        return
    },
    "Senior Center": a=> {
        return
    },
    "Septic Tank Service": a=> {
        return
    },
    "Septic Tank Service": a=> {
        return
    },
    "Service Station Supply": a=> {
        return
    },
    "Seventh Day Adventist Church": a=> {
        return
    },
    "Sewer Service": a=> {
        return
    },
    "Sewing & Seamstress": a=> {
        return
    },
    "Shoe Store": a=> {
        return
    },
    "Shopping District": a=> {
        return
    },
    "Shopping Mall": a=> {
        return
    },
    "Shopping Service": a=> {
        return
    },
    "Signs & Banner Service": a=> {
        return
    },
    "Sikh Temple": a=> {
        return
    },
    "Singaporean Restaurant": a=> {
        return
    },
    "Ski Resort": a=> {
        return
    },
    "Ski & Snowboard School": a=> {
        return
    },
    "Skin Care": a=> {
        return
    },
    "Sky Diving": a=> {
        return
    },
    "Smog Check Station": a=> {
        return
    },
    "Smoothie & Juice Bar": a=> {
        return
    },
    "Snowmobiles": a=> {
        return
    },
    "Social Club": a=> {
        return
    },
    "Social Services": a=> {
        return
    },
    "Solar Energy Service": a=> {
        return
    },
    "Sorority & Fraternity": a=> {
        return
    },
    "Soul Food Restaurant": a=> {
        return
    },
    "Soup Restaurant": a=> {
        return
    },
    "Southern Restaurant": a=> {
        return
    },
    "Southwestern Restaurant": a=> {
        return
    },
    "Spa": a=> {
        return
    },
    "Spanish Restaurant": a=> {
        return
    },
    "Specialty Grocery Store": a=> {
        return
    },
    "Specialty School": a=> {
        return
    },
    "Speech Pathologist": a=> {
        return
    },
    "Sporting Goods Store": a=> {
        return
    },
    "Sports Bar": a=> {
        return
    },
    "Sports Center": a=> {
        return
    },
    "Sports Club": a=> {
        return
    },
    "Sports Instruction": a=> {
        return
    },
    "Sports Promoter": a=> {
        return
    },
    "Sports Venue & Stadium": a=> {
        return
    },
    "Sportswear": a=> {
        return
    },
    "Startup": a=> {
        return
    },
    "State": a=> {
        return
    },
    "State Park": a=> {
        return
    },
    "Statue & Fountain": a=> {
        return
    },
    "Steakhouse": a=> {
        return
    },
    "Storage": a=> {
        return
    },
    "Storage Service": a=> {
        return
    },
    "Street": a=> {
        return
    },
    "Subway & Light Rail Station": a=> {
        return
    },
    "Supply & Distribution Services": a=> {
        return
    },
    "Surfing Spot": a=> {
        return
    },
    "Surveyor": a=> {
        return
    },
    "Sushi Restaurant": a=> {
        return
    },
    "Swimming Pool": a=> {
        return
    },
    "Swimming Pool Maintenance": a=> {
        return
    },
    "Swimwear": a=> {
        return
    },
    "Symphony": a=> {
        return
    },
    "Synagogue": a=> {
        return
    },
    "Taiwanese Restaurant": a=> {
        return
    },
    "Take Out Restaurant": a=> {
        return
    },
    "Tanning Salon": a=> {
        return
    },
    "Tanning Salon Supplier": a=> {
        return
    },
    "Tapas Bar & Restaurant": a=> {
        return
    },
    "Tattoo & Piercing": a=> {
        return
    },
    "Tax Preparation": a=> {
        return
    },
    "Taxi": a=> {
        return
    },
    "Taxidermist": a=> {
        return
    },
    "Tea Room": a=> {
        return
    },
    "Technical Institute": a=> {
        return
    },
    "Teeth Whitening": a=> {
        return
    },
    "Telemarketing Service": a=> {
        return
    },
    "Tennis": a=> {
        return
    },
    "Tex-Mex Restaurant": a=> {
        return
    },
    "Textiles": a=> {
        return
    },
    "Thai Restaurant": a=> {
        return
    },
    "Theater": a=> {
        return
    },
    "Theatrical Equipment": a=> {
        return
    },
    "Theme Park": a=> {
        return
    },
    "Thrift or Consignment Store": a=> {
        return
    },
    "Ticket Sales": a=> {
        return
    },
    "Tire Dealer": a=> {
        return
    },
    "Tobacco Store": a=> {
        return
    },
    "Tools Service": a=> {
        return
    },
    "Airport": a=> {
        return
    },
    "Appliances": a=> {
        return
    },
    "Bar": a=> {
        return
    },
    "Book Store": a=> {
        return
    },
    "City": a=> {
        return
    },
    "Concert Venue": a=> {
        return
    },
    "Country": a=> {
        return
    },
    "Doctor": a=> {
        return
    },
    "Entertainer": a=> {
        return
    },
    "Event": a=> {
        return
    },
    "Home Decor": a=> {
        return
    },
    "Hotel": a=> {
        return
    },
    "Island": a=> {
        return
    },
    "Junior High School": a=> {
        return
    },
    "Kitchen Supplies": a=> {
        return
    },
    "Lake": a=> {
        return
    },
    "Landmark": a=> {
        return
    },
    "Library": a=> {
        return
    },
    "Middle School": a=> {
        return
    },
    "Mountain": a=> {
        return
    },
    "Museum": a=> {
        return
    },
    "Neighborhood": a=> {
        return
    },
    "Newspaper": a=> {
        return
    },
    "Office Supplies": a=> {
        return
    },
    "Other": a=> {
        return
    },
    "Photographer": a=> {
        return
    },
    "Publisher": a=> {
        return
    },
    "River": a=> {
        return
    },
    "School": a=> {
        return
    },
    "Tour Company": a=> {
        return
    },
    "Tour Guide": a=> {
        return
    },
    "Tourist Attraction": a=> {
        return
    },
    "Tourist Information": a=> {
        return
    },
    "Towing Service": a=> {
        return
    },
    "Toy Store": a=> {
        return
    },
    "Trade School": a=> {
        return
    },
    "Traffic School": a=> {
        return
    },
    "Trailer  Rental": a=> {
        return
    },
    "Train Station": a=> {
        return
    },
    "Translator": a=> {
        return
    },
    "Transportation Service": a=> {
        return
    },
    "Travel Agency": a=> {
        return
    },
    "Trophies & Engraving": a=> {
        return
    },
    "Truck Rental": a=> {
        return
    },
    "Truck Towing": a=> {
        return
    },
    "Turkish Restaurant": a=> {
        return
    },
    "Tutoring": a=> {
        return
    },
    "Upholstery Service": a=> {
        return
    },
    "Urban Farm": a=> {
        return
    },
    "Vacation Home Rental": a=> {
        return
    },
    "Vegetarian & Vegan Restaurant": a=> {
        return
    },
    "Vending Machine Service": a=> {
        return
    },
    "Veterinarian": a=> {
        return
    },
    "Video Games": a=> {
        return
    },
    "Vietnamese Restaurant": a=> {
        return
    },
    "Vintage Store": a=> {
        return
    },
    "Wallpaper": a=> {
        return
    },
    "Warehouse": a=> {
        return
    },
    "Waste Management": a=> {
        return
    },
    "Water Filtration & Treatment": a=> {
        return
    },
    "Water Park": a=> {
        return
    },
    "Web Design": a=> {
        return
    },
    "Web Development": a=> {
        return
    },
    "Wedding Planning": a=> {
        return
    },
    "Well Water Drilling Service": a=> {
        return
    },
    "Wholesale & Supply Store": a=> {
        return
    },
    "Wig Store": a=> {
        return
    },
    "Wildlife Sanctuary": a=> {
        return
    },
    "Wills & Estate Lawyer": a=> {
        return
    },
    "Window Service & Repair": a=> {
        return
    },
    "Wine Bar": a=> {
        return
    },
    "Winery & Vineyard": a=> {
        return
    },
    "Women's Clothing Store": a=> {
        return
    },
    "Women's Health": a=> {
        return
    },
    "Writing Service": a=> {
        return
    },
    "Yoga & Pilates": a=> {
        return
    },
    "Youth Organization": a=> {
        return
    },
    "Zoo & Aquarium": a=> {
        return
    }
}