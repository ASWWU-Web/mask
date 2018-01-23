/**
 * Created by ethan on 2/9/17.
 */
// All fields that exist in a profile.
export const FieldSectionNames: string[] = [
    "General",
    "Relationship",
    "Education",
    "Personality",
    "Favorites",
    "Departmental"
];
export const FieldSections: string[][] = [
    [ "full_name", "phone", "email", "website", "gender", "birthday", "class_standing", "privacy" ],
    [ "relationship_status", "attached_to" ],
    [ "majors", "minors", "preprofessional", "graduate", "high_school", "class_of" ],
    [ "hobbies", "pet_peeves", "career_goals", "personality" ],
    [ "favorite_books", "favorite_food", "favorite_movies", "favorite_music", "quote", "quote_author" ],
    [ "department", "office", "office_hours" ]
];

// Fields that can't be edited by a user
export const DisabledFields: string[] = ["wwuid", "username", "views", "updated_at"];
export const PrivateFields: string[] = DisabledFields.concat(["full_name", "gender", "privacy"]);

export const FieldsInOrder: string[] = FieldSections.reduce((a, b) => { return a.concat(b); }).filter((a) => { return PrivateFields.indexOf(a) < 0; });
export const FieldsForUpdating: string[] = FieldSections.reduce((a, b) => { return a.concat(b); });
export const FieldsForSearching: string[] = FieldSections.reduce((a, b) => { return a.concat(b); }).filter((a) => { return a !=='privacy'; });

// Fields that are multiple-choice rather than entering whatever value the user decides.
export const SelectFields: Object = {
    relationship_status: ["","Attached","Available","Call me!","Content","Dating","Desperate","Engaged","Free for tea","Hermit","I'll pay","I'm a cheap date","In a relationship","In engineering...","In pursuit","Just ask me","Lonely","Looking","Married","Married to my books","Not available","Pick me! Pick me!","Senior, single, and ready to mingle","Single","Single but not set on it","Social life? what's that?","Socially inept","Taken","Undecided","Very available","Waiting","Waiting for my ring","Will date for coffee","Yoda hasn't told me yet"],
    personality: ["","ENFJ - Teacher","ENFP - Champion","ENTJ - Field Marshall","ENTP - Inventor","ESFJ - Provider","ESFP - Performer","ESTJ - Supervisor","ESTP - Promoter","INFJ - Counselor","INFP - Healer","INTJ - Mastermind","INTP - Architect","ISFJ - Protector","ISFP - Composer","ISTJ - Inspector","ISTP - Crafter","No personality"],
    gender: ["","Male","Female"],
    class_standing: ["Freshman","Sophomore","Junior","Senior","Super Senior","Undecided"],
    privacy: ["Public", "Must Be Logged In", "Hidden"]
};

export const SearchableFields: Object = {
    majors: ["Accounting","African studies","Anthropology","Applied Computer Science","Art","Athlete management","Automotive Management","Automotive Technology","Aviation Management","Aviation Technology","Bachelor of Business Administration (BBA)","Being awesome","Biblical Languages","Biochemistry","Bioengineering","Biology","Biology-premed","Biomedical Electronics Technology","Biophysics","Business","Business Administration","Business Education","Business finance","Chemistry","Civil Engineering","Commercial Art","Communications","Computer Engineering","Computer Information Systems","Computer Programming","Computer Science","Cosmetology","Counseling Psychology","Criminology","Culinary arts","Debating","Education","Educational leadership","Electrical Engineering","Electronics Technology","Elementary Education","Elvish","Engineering","English","English education","Entrepreneurship","Environmental Science","Environmental Studies","Finance","Fine Art","Fire Science","Fire Science/EMT","Fitness management","Forensic Psychology","French","General B.A.","German","Gerontology","Graduate!","Graphic Communications","Graphic Design","Graphic Imaging","Graphics Technology","Health","Health Promotion","Health Science","Health science-premed","History","Human Development and Family","Human Resource Management","Humanities","Industrial Design","International Business","International Communications","International Rescue and Relief","It's a surprise!","Journalism","Journalism and Public Relations","Life","Management","Marketing","Mass Communication","Master of Arts in Teaching (MAT)","Masters of Science in Biology (MS)","Master of Education (MED)","Master of Social Work (MSW)","Mathematics","Mechanical Engineering","Mechanical/Materials Engineering","Media","Music","Music Education","Music Performance","Nerdgineering","New Media Imaging","Nursing","Operation managemnent","Orthotics and Prosthetics","Outdoor recreation","Photojournalism","Physical Education","Physical Education (Physiology Concentration)","Physics","Plant Maintenance Certificate","Pre-Architecture","Pre-Chiropractic","Pre-Cytotechnology","Pre-Dental Hygiene","Pre-Dentistry","Pre-Emergency Medical Care/Cardiopulmonary Sciences","Pre-Health Information Administration","Pre-Law","Pre-Medical Technology","Pre-Medicine","Pre-Nutrition and Dietetics","Pre-Occupational Therapy","Pre-Occupational Therapy Assistant","Pre-Optometry","Pre-Osteopathy","Pre-Pharmacy","Pre-Physical Therapy","Pre-Physical Therapy Assistant","Pre-Physician Assistant","Pre-Physicians Assistant","Pre-Public Health","Pre-Radiological Technology","Pre-Respiratory Therapy","Pre-Speech Pathology","Pre-Speech-Lang. Pathology and Audiology","Pre-Veterinary Science","Pre-Wed","Pre-world domination","Printing Certificate","Psychology","Public Relations","Religion","Religion/minor P.E","Secondary education","Small Business Management","Social Welfare","Social Work","Social Work, Child LIfe Specialist","Sociology","Spanish","Special Education","Speech Communication","Sports medicine","Theology","Time travel","Undecided","Web Design and Development","Women","Wind Energy Technology","Writing"],
    minors: ["Accounting","Airsoft Management","Archaeology","Art","Astronomy","Astrophysics","Automotive Technology","Aviation","Awesome","Awesomness","Bachelor of arts applied music","Being creative","Biblical Languages","Biology","Business","Business Education","Chemistry","Chinese","Coal","Communications","Computer Information Systems","Computer Science","Culinary arts","Design","Dragon slaying","Drama","Early Childhood Education","Economics","Education","English","Environmental Science","Environmental Studies","Facial chops","Fame","Film Literature","Film Studies","French","German","Girls","Gold","Graphic Arts","Health","Health & physical education","History","History Education","I dont know?","International Business","Journalism","Kick assedness","Life","Love","Lunch","Maintaining a social life","Making life interesting","Management","Marketing","Mass communication","Math (by default)","Mathematical....stuff","Mathematics","Midieval humor","Midlevel Humanities","Motivational Speaker","Music","Music (organ)","Music Performance","No thanks, I'm in college","Non- minor Science","Not sure yet...","Nutrition & dietetics","P.E.","Philosophy","Photo Journalism","Photography","Physical Education","Physics","Pre-Dental Hygiene","Pre-Dentistry","Pre-law","Pre-medicine","Pre-Physician Assistant","Psychology","Pycolo","Pys","Religion","Riches","Rock star","Social Studies Endorsement","Social Welfare","Social Work","Sociology","Space Exploration","Spanish","Special Education","Speech Communication","Speech pathology","Spelling","Sports medicine","Subtlety","Superhumanology","Technology","The Art of Kung Fu","Theater","There are a few of them...","Tiger Training","Time travel","Voice","Web Design and Development","Whatever I can get for 240 credits","Wildlife Ecology"]
};
