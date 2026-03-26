import { Demo } from "@/types/demo";

type DemoSeed = Omit<Demo, "tags" | "created_at">;

const categoryTags: Record<string, string[]> = {
  lawyer: [
    "lawyer","attorney","law firm","legal services","litigation","corporate law","contract law","criminal law","family law","immigration law","intellectual property","legal advisor","consultation","court case","legal notice","compliance","arbitration","mediation","document drafting","company setup","tax law","real estate law","employment law","professional","trusted",
  ],
  "real-estate": [
    "real estate","realtor","property","homes for sale","apartments","villas","land","commercial property","investment","rentals","listing","property advisor","mortgage","valuation","open house","luxury homes","new projects","residential","broker","portfolio","townhouse","penthouse","buy home","sell home","estate agent",
  ],
  photographer: [
    "photographer","wedding photography","portrait","studio","event photography","commercial shoot","drone shoot","cinematic video","photo gallery","branding shoot","fashion shoot","product shoot","retouching","album design","photo package","engagement","family shoot","storytelling","creative","lifestyle","social media content","reels","videography","visual identity","premium portfolio",
  ],
  dental: [
    "dental clinic","dentist","implant","orthodontics","teeth whitening","smile design","oral care","braces","invisalign","root canal","dental cleaning","appointment","pediatric dentistry","gum treatment","x-ray","prosthodontics","periodontics","endodontics","clinic","healthcare","doctor profile","before after","treatment plans","cosmetic dentistry","emergency dental",
  ],
  beauty: [
    "beauty","beauty salon","hair care","hair styling","haircut","hair color","skin care","facial","makeup","nail art","manicure","pedicure","spa","laser treatment","eyebrow design","lashes","self care","wellness","appointment","glow","aesthetics","bridal makeup","salon","beauty clinic","personal care",
  ],
  construction: [
    "construction","contractor","architecture","engineering","project management","interior design","renovation","commercial build","residential build","turnkey","site work","structural","planning","blueprint","infrastructure","civil engineering","building company","materials","timeline","cost estimate","portfolio","completed projects","industrial","quality","safety",
  ],
  consulting: [
    "consulting","business consulting","strategy","operations","management","growth","digital transformation","finance consulting","hr consulting","market research","branding","process optimization","b2b","advisory","executive coaching","performance","kpi","roadmap","workshop","training","analytics","leadership","change management","scaling","professional services",
  ],
  cafe: [
    "cafe","coffee shop","specialty coffee","brunch","desserts","menu","reservation","cozy space","barista","latte","cold brew","bakery","takeaway","delivery","local cafe","food photography","opening hours","location","best coffee","community","wifi cafe","meeting spot","artisan","fresh roast","beverages",
  ],
  restaurant: [
    "restaurant","fine dining","menu","table booking","chef","food","dinner","lunch","reservation","delivery","takeaway","cuisine","signature dishes","wine list","family restaurant","business lunch","events","private dining","reviews","location","opening hours","special offers","food gallery","seafood","steakhouse",
  ],
  automotive: [
    "car dealer","automotive","showroom","used cars","new cars","test drive","vehicle listing","car financing","trade in","suv","sedan","hatchback","luxury cars","fleet","inspection","warranty","service history","auto gallery","price list","book appointment","leasing","car sales","certified pre-owned","vehicle details","motor",
  ],
  fitness: [
    "gym","fitness","personal trainer","membership","workout","strength training","cardio","crossfit","pilates","yoga","bodybuilding","wellness","fat loss","muscle gain","training plan","group classes","nutrition","fitness coach","transformation","health club","athlete","exercise","recovery","indoor cycling","bootcamp",
  ],
  psychology: [
    "psychologist","therapy","mental health","counseling","anxiety","depression","stress","family therapy","couples therapy","child therapy","online therapy","mindfulness","wellbeing","clinical psychologist","session booking","emotional support","trauma","burnout","self esteem","guided support","assessment","behavioral therapy","cbt","safe space","professional care",
  ],
  education: [
    "education","course","academy","training","online class","exam prep","language course","certificate","workshop","student success","learning","tutoring","college prep","career training","curriculum","class schedule","registration","mentor","instructor","e-learning","bootcamp","skills","practice test","campus","education center",
  ],
  software: [
    "software agency","saas","web development","mobile app","ui ux","product design","startup","automation","crm","api integration","dashboard","cloud","devops","data platform","mvp","scale up","tech partner","full stack","frontend","backend","ai integration","support","maintenance","security","custom software",
  ],
};

const demos: DemoSeed[] = [
  { id: "local-1", title: "Legal Authority Pro", category: "lawyer", slug: "legal-authority-pro", demo_url: "https://example.com/demo-law-1", preview_image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1400&q=80", base_price: 12000, short_description: "Trust-first legal presentation for modern law firms.", is_active: true },
  { id: "local-2", title: "Urban Property Prime", category: "real-estate", slug: "urban-property-prime", demo_url: "https://example.com/demo-realty-1", preview_image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&q=80", base_price: 15000, short_description: "Lead-focused real estate landing with premium listing layout.", is_active: true },
  { id: "local-3", title: "Visual Story Studio", category: "photographer", slug: "visual-story-studio", demo_url: "https://example.com/demo-photo-1", preview_image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1400&q=80", base_price: 10000, short_description: "Elegant portfolio structure for photographers and creators.", is_active: true },
  { id: "local-4", title: "Villa Showcase Elite", category: "real-estate", slug: "villa-showcase-elite", demo_url: "https://example.com/demo-realty-2", preview_image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80", base_price: 16500, short_description: "Luxury property showcase with strong conversion blocks.", is_active: true },
  { id: "local-5", title: "Investor Property Funnel", category: "real-estate", slug: "investor-property-funnel", demo_url: "https://example.com/demo-realty-3", preview_image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1400&q=80", base_price: 17250, short_description: "Built for investment-oriented property campaigns.", is_active: true },
  { id: "local-6", title: "Smile Clinic Modern", category: "dental", slug: "smile-clinic-modern", demo_url: "https://example.com/demo-dental-1", preview_image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1400&q=80", base_price: 14000, short_description: "Clean dental clinic template with trust signals.", is_active: true },
  { id: "local-7", title: "Dental Booking Plus", category: "dental", slug: "dental-booking-plus", demo_url: "https://example.com/demo-dental-2", preview_image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1400&q=80", base_price: 15200, short_description: "Appointment-driven dental layout for quick contact.", is_active: true },
  { id: "local-8", title: "Beauty Glow Studio", category: "beauty", slug: "beauty-glow-studio", demo_url: "https://example.com/demo-beauty-1", preview_image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1400&q=80", base_price: 11250, short_description: "Premium salon showcase focused on treatments.", is_active: true },
  { id: "local-9", title: "Beauty Booking Lounge", category: "beauty", slug: "beauty-booking-lounge", demo_url: "https://example.com/demo-beauty-2", preview_image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1400&q=80", base_price: 12500, short_description: "Beauty page optimized for booking conversion.", is_active: true },
  { id: "local-10", title: "BuildCorp Signature", category: "construction", slug: "buildcorp-signature", demo_url: "https://example.com/demo-construction-1", preview_image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80", base_price: 18500, short_description: "Corporate construction layout with project trust.", is_active: true },
  { id: "local-11", title: "Project Portfolio Builder", category: "construction", slug: "project-portfolio-builder", demo_url: "https://example.com/demo-construction-2", preview_image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1400&q=80", base_price: 19800, short_description: "Case-study heavy format for contractors.", is_active: true },
  { id: "local-12", title: "Executive Consulting One", category: "consulting", slug: "executive-consulting-one", demo_url: "https://example.com/demo-consulting-1", preview_image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80", base_price: 16000, short_description: "Decision-maker focused consulting pitch page.", is_active: true },
  { id: "local-13", title: "Consulting Premium Grid", category: "consulting", slug: "consulting-premium-grid", demo_url: "https://example.com/demo-consulting-2", preview_image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80", base_price: 17500, short_description: "Modern consulting design with conversion modules.", is_active: true },
  { id: "local-14", title: "Bistro Cafe Landing", category: "cafe", slug: "bistro-cafe-landing", demo_url: "https://example.com/demo-cafe-1", preview_image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1400&q=80", base_price: 9800, short_description: "Atmospheric cafe page with menu highlights.", is_active: true },
  { id: "local-15", title: "Restaurant Menu Flow", category: "restaurant", slug: "restaurant-menu-flow", demo_url: "https://example.com/demo-restaurant-1", preview_image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=80", base_price: 11800, short_description: "Reservation-first restaurant presentation.", is_active: true },
  { id: "local-16", title: "Auto Gallery Showroom", category: "automotive", slug: "auto-gallery-showroom", demo_url: "https://example.com/demo-auto-1", preview_image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1400&q=80", base_price: 14300, short_description: "Vehicle listing layout for auto dealers.", is_active: true },
  { id: "local-17", title: "Fitness Membership Hub", category: "fitness", slug: "fitness-membership-hub", demo_url: "https://example.com/demo-gym-1", preview_image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&q=80", base_price: 10800, short_description: "Membership-driven gym conversion page.", is_active: true },
  { id: "local-18", title: "MindCare Psychology", category: "psychology", slug: "mindcare-psychology", demo_url: "https://example.com/demo-psychology-1", preview_image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1400&q=80", base_price: 13200, short_description: "Calm and trustworthy therapy website style.", is_active: true },
  { id: "local-19", title: "Course Center Pro", category: "education", slug: "course-center-pro", demo_url: "https://example.com/demo-education-1", preview_image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1400&q=80", base_price: 11900, short_description: "Lead-focused course registration page.", is_active: true },
  { id: "local-20", title: "SaaS Agency Prime", category: "software", slug: "saas-agency-prime", demo_url: "https://example.com/demo-software-1", preview_image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1400&q=80", base_price: 21000, short_description: "B2B-ready software agency positioning template.", is_active: true },
];

export const localDemos: Demo[] = demos.map((demo) => ({
  ...demo,
  tags: categoryTags[demo.category] ?? [],
  created_at: new Date().toISOString(),
}));

export function hasSupabaseEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
