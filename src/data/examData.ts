export const ALL_EXAMS = [

  // ═══ CENTRAL EXAMS ═══

  { slug: "neet-ug", name: "NEET UG 2026", authority: "NTA", category: "Central", subcategory: "Medical",
    photo: { width: 275, height: 354, minKB: 10, maxKB: 200, format: "jpeg", background: "white" },
    signature: { width: 275, height: 118, minKB: 4, maxKB: 30, format: "jpeg" },
    special: "TWO photos needed: Passport + Postcard (4x6 inch). Name and date visible on photo.",
    postcard: { width: 1800, height: 1200, minKB: 10, maxKB: 200, format: "jpeg" } },

  { slug: "jee-main", name: "JEE Main 2026", authority: "NTA", category: "Central", subcategory: "Engineering",
    photo: { width: 275, height: 354, minKB: 10, maxKB: 300, format: "jpeg", background: "white" },
    signature: { width: 275, height: 118, minKB: 10, maxKB: 50, format: "jpeg" } },

  { slug: "jee-advanced", name: "JEE Advanced 2026", authority: "IIT", category: "Central", subcategory: "Engineering",
    photo: { width: 275, height: 354, minKB: 10, maxKB: 150, format: "jpeg", background: "white" },
    signature: { width: 275, height: 118, minKB: 5, maxKB: 50, format: "jpeg" } },

  { slug: "upsc-cse", name: "UPSC Civil Services 2026", authority: "UPSC", category: "Central", subcategory: "Civil Services",
    photo: { width: 400, height: 400, minKB: 20, maxKB: 300, format: "jpeg", background: "white", nameDate: true },
    signature: { width: 400, height: 400, minKB: 20, maxKB: 100, format: "jpeg" },
    special: "Name and date MUST be printed at bottom of photo. Triple signature required." },

  { slug: "upsc-cds", name: "UPSC CDS 2026", authority: "UPSC", category: "Central", subcategory: "Defence",
    photo: { width: 350, height: 450, minKB: 20, maxKB: 200, format: "jpeg", background: "white" },
    signature: { width: 350, height: 120, minKB: 10, maxKB: 100, format: "jpeg" } },

  { slug: "upsc-nda", name: "UPSC NDA 2026", authority: "UPSC", category: "Central", subcategory: "Defence",
    photo: { width: 350, height: 450, minKB: 20, maxKB: 200, format: "jpeg", background: "white" },
    signature: { width: 350, height: 120, minKB: 10, maxKB: 100, format: "jpeg" } },

  { slug: "ssc-cgl", name: "SSC CGL 2026", authority: "SSC", category: "Central", subcategory: "Government Job",
    photo: { width: 275, height: 354, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 236, height: 79, minKB: 10, maxKB: 20, format: "jpeg" } },

  { slug: "ssc-chsl", name: "SSC CHSL 2026", authority: "SSC", category: "Central", subcategory: "Government Job",
    photo: { width: 200, height: 240, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 200, height: 80, minKB: 10, maxKB: 20, format: "jpeg" } },

  { slug: "ssc-gd", name: "SSC GD 2026", authority: "SSC", category: "Central", subcategory: "Government Job",
    photo: { width: 200, height: 240, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 240, height: 80, minKB: 10, maxKB: 20, format: "jpeg" } },

  { slug: "ssc-mts", name: "SSC MTS 2026", authority: "SSC", category: "Central", subcategory: "Government Job",
    photo: { width: 200, height: 240, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 240, height: 80, minKB: 10, maxKB: 20, format: "jpeg" } },

  { slug: "ssc-cpo", name: "SSC CPO 2026", authority: "SSC", category: "Central", subcategory: "Police",
    photo: { width: 275, height: 354, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 236, height: 79, minKB: 10, maxKB: 20, format: "jpeg" } },

  { slug: "ibps-po", name: "IBPS PO 2026", authority: "IBPS", category: "Central", subcategory: "Banking",
    photo: { width: 200, height: 230, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 140, height: 60, minKB: 10, maxKB: 20, format: "jpeg" } },

  { slug: "ibps-clerk", name: "IBPS Clerk 2026", authority: "IBPS", category: "Central", subcategory: "Banking",
    photo: { width: 200, height: 230, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 140, height: 60, minKB: 10, maxKB: 20, format: "jpeg" } },

  { slug: "ibps-rrb-po", name: "IBPS RRB PO 2026", authority: "IBPS", category: "Central", subcategory: "Banking",
    photo: { width: 200, height: 230, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 140, height: 60, minKB: 10, maxKB: 20, format: "jpeg" } },

  { slug: "sbi-po", name: "SBI PO 2026", authority: "SBI", category: "Central", subcategory: "Banking",
    photo: { width: 200, height: 230, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 140, height: 60, minKB: 10, maxKB: 20, format: "jpeg" } },

  { slug: "sbi-clerk", name: "SBI Clerk 2026", authority: "SBI", category: "Central", subcategory: "Banking",
    photo: { width: 200, height: 230, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 140, height: 60, minKB: 10, maxKB: 20, format: "jpeg" } },

  { slug: "rbi-grade-b", name: "RBI Grade B 2026", authority: "RBI", category: "Central", subcategory: "Banking",
    photo: { width: 200, height: 230, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 140, height: 60, minKB: 10, maxKB: 20, format: "jpeg" } },

  { slug: "rbi-assistant", name: "RBI Assistant 2026", authority: "RBI", category: "Central", subcategory: "Banking",
    photo: { width: 200, height: 230, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 140, height: 60, minKB: 10, maxKB: 20, format: "jpeg" } },

  { slug: "canara-bank", name: "Canara Bank PO 2026", authority: "Canara Bank", category: "Central", subcategory: "Banking",
    photo: { width: 200, height: 230, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 140, height: 60, minKB: 10, maxKB: 20, format: "jpeg" } },

  { slug: "union-bank", name: "Union Bank PO 2026", authority: "Union Bank", category: "Central", subcategory: "Banking",
    photo: { width: 200, height: 230, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 140, height: 60, minKB: 10, maxKB: 20, format: "jpeg" } },

  { slug: "indian-bank", name: "Indian Bank PO 2026", authority: "Indian Bank", category: "Central", subcategory: "Banking",
    photo: { width: 200, height: 230, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 140, height: 60, minKB: 10, maxKB: 20, format: "jpeg" } },

  { slug: "railway-ntpc", name: "Railway NTPC 2026", authority: "RRB", category: "Central", subcategory: "Railway",
    photo: { width: 320, height: 240, minKB: 30, maxKB: 70, format: "jpeg", background: "white" },
    signature: { width: 140, height: 60, minKB: 30, maxKB: 70, format: "jpeg" } },

  { slug: "railway-group-d", name: "Railway Group D 2026", authority: "RRB", category: "Central", subcategory: "Railway",
    photo: { width: 320, height: 240, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 140, height: 60, minKB: 10, maxKB: 40, format: "jpeg" } },

  { slug: "rrb-alp", name: "RRB ALP 2026", authority: "RRB", category: "Central", subcategory: "Railway",
    photo: { width: 275, height: 354, minKB: 50, maxKB: 150, format: "jpeg", background: "white" },
    signature: { width: 275, height: 157, minKB: 30, maxKB: 49, format: "jpeg" } },

  { slug: "india-post-gds", name: "India Post GDS 2026", authority: "India Post", category: "Central", subcategory: "Government Job",
    photo: { width: 320, height: 400, minKB: 30, maxKB: 100, format: "jpeg", background: "white" },
    signature: { width: 300, height: 120, minKB: 20, maxKB: 100, format: "jpeg" } },

  { slug: "ctet", name: "CTET 2026", authority: "CBSE", category: "Central", subcategory: "Teaching",
    photo: { width: 200, height: 230, minKB: 10, maxKB: 100, format: "jpeg", background: "white" },
    signature: { width: 140, height: 60, minKB: 4, maxKB: 30, format: "jpeg" } },

  { slug: "cuet-ug", name: "CUET UG 2026", authority: "NTA", category: "Central", subcategory: "University",
    photo: { width: 275, height: 354, minKB: 10, maxKB: 200, format: "jpeg", background: "white" },
    signature: { width: 275, height: 118, minKB: 4, maxKB: 30, format: "jpeg" } },

  { slug: "gate", name: "GATE 2026", authority: "IIT", category: "Central", subcategory: "Engineering",
    photo: { width: 350, height: 450, minKB: 5, maxKB: 1000, format: "jpeg", background: "white" },
    signature: { width: 400, height: 120, minKB: 3, maxKB: 1000, format: "jpeg" } },

  { slug: "nda-exam", name: "NDA 2026", authority: "UPSC", category: "Central", subcategory: "Defence",
    photo: { width: 350, height: 450, minKB: 20, maxKB: 200, format: "jpeg", background: "white" },
    signature: { width: 350, height: 120, minKB: 10, maxKB: 100, format: "jpeg" } },

  { slug: "rpf-constable", name: "RPF Constable 2026", authority: "Railways", category: "Central", subcategory: "Police",
    photo: { width: 275, height: 354, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 140, height: 60, minKB: 10, maxKB: 20, format: "jpeg" } },

  { slug: "epfo-ssa", name: "EPFO SSA 2026", authority: "EPFO", category: "Central", subcategory: "Government Job",
    photo: { width: 200, height: 230, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 140, height: 60, minKB: 10, maxKB: 20, format: "jpeg" } },

  { slug: "lic-aao", name: "LIC AAO 2026", authority: "LIC", category: "Central", subcategory: "Insurance",
    photo: { width: 200, height: 230, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 140, height: 60, minKB: 10, maxKB: 20, format: "jpeg" } },

  // ═══ STATE PSC EXAMS ═══

  { slug: "gpsc", name: "GPSC 2026", authority: "GPSC", category: "State PSC", subcategory: "Gujarat",
    photo: { width: 130, height: 180, minKB: 10, maxKB: 15, format: "jpeg", background: "white" },
    signature: { width: 275, height: 90, minKB: 10, maxKB: 15, format: "jpeg" } },

  { slug: "mpsc", name: "MPSC 2026", authority: "MPSC", category: "State PSC", subcategory: "Maharashtra",
    photo: { width: 275, height: 354, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 275, height: 118, minKB: 10, maxKB: 20, format: "jpeg" } },

  { slug: "tnpsc", name: "TNPSC 2026", authority: "TNPSC", category: "State PSC", subcategory: "Tamil Nadu",
    photo: { width: 275, height: 354, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 275, height: 118, minKB: 10, maxKB: 20, format: "jpeg" } },

  { slug: "kpsc", name: "KPSC 2026", authority: "KPSC", category: "State PSC", subcategory: "Karnataka",
    photo: { width: 200, height: 240, minKB: 20, maxKB: 100, format: "jpeg", background: "white" },
    signature: { width: 140, height: 80, minKB: 10, maxKB: 50, format: "jpeg" } },

  { slug: "kerala-psc", name: "Kerala PSC 2026", authority: "Kerala PSC", category: "State PSC", subcategory: "Kerala",
    photo: { width: 150, height: 200, minKB: 20, maxKB: 30, format: "jpeg", background: "white" },
    signature: { width: 150, height: 100, minKB: 20, maxKB: 30, format: "jpeg" },
    special: "Kerala PSC requires name and date text band at bottom of photo." },

  { slug: "uppsc", name: "UPPSC 2026", authority: "UPPSC", category: "State PSC", subcategory: "Uttar Pradesh",
    photo: { width: 180, height: 216, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 216, height: 108, minKB: 10, maxKB: 30, format: "jpeg" } },

  { slug: "bpsc", name: "BPSC 2026", authority: "BPSC", category: "State PSC", subcategory: "Bihar",
    photo: { width: 250, height: 250, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 220, height: 100, minKB: 10, maxKB: 20, format: "jpeg" } },

  { slug: "mppsc", name: "MPPSC 2026", authority: "MPPSC", category: "State PSC", subcategory: "Madhya Pradesh",
    photo: { width: 275, height: 354, minKB: 25, maxKB: 200, format: "jpeg", background: "white" },
    signature: { width: 275, height: 118, minKB: 25, maxKB: 200, format: "jpeg" } },

  { slug: "rpsc", name: "RPSC 2026", authority: "RPSC", category: "State PSC", subcategory: "Rajasthan",
    photo: { width: 240, height: 320, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 280, height: 80, minKB: 20, maxKB: 50, format: "jpeg" } },

  { slug: "appsc", name: "APPSC 2026", authority: "APPSC", category: "State PSC", subcategory: "Andhra Pradesh",
    photo: { width: 200, height: 250, minKB: 50, maxKB: 100, format: "jpeg", background: "white" },
    signature: { width: 140, height: 60, minKB: 20, maxKB: 50, format: "jpeg" } },

  { slug: "tspsc", name: "TSPSC 2026", authority: "TSPSC", category: "State PSC", subcategory: "Telangana",
    photo: { width: 275, height: 354, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 275, height: 118, minKB: 10, maxKB: 30, format: "jpeg" } },

  { slug: "wbpsc", name: "WBPSC 2026", authority: "WBPSC", category: "State PSC", subcategory: "West Bengal",
    photo: { width: 138, height: 177, minKB: 20, maxKB: 100, format: "jpeg", background: "white" },
    signature: { width: 138, height: 59, minKB: 10, maxKB: 20, format: "jpeg" } },

  { slug: "hpsc", name: "HPSC 2026", authority: "HPSC", category: "State PSC", subcategory: "Haryana",
    photo: { width: 138, height: 177, minKB: 10, maxKB: 100, format: "jpeg", background: "white" },
    signature: { width: 138, height: 59, minKB: 10, maxKB: 50, format: "jpeg" } },

  { slug: "ppsc", name: "PPSC 2026", authority: "PPSC", category: "State PSC", subcategory: "Punjab",
    photo: { width: 140, height: 177, minKB: 10, maxKB: 40, format: "jpeg", background: "white" },
    signature: { width: 140, height: 80, minKB: 10, maxKB: 40, format: "jpeg" } },

  { slug: "ukpsc", name: "UKPSC 2026", authority: "UKPSC", category: "State PSC", subcategory: "Uttarakhand",
    photo: { width: 150, height: 200, minKB: 30, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 150, height: 100, minKB: 20, maxKB: 30, format: "jpeg" } },

  { slug: "jkpsc", name: "JKPSC 2026", authority: "JKPSC", category: "State PSC", subcategory: "J&K",
    photo: { width: 200, height: 240, minKB: 10, maxKB: 20, format: "jpeg", background: "white" },
    signature: { width: 200, height: 100, minKB: 10, maxKB: 20, format: "jpeg" } },

  { slug: "cgpsc", name: "CGPSC 2026", authority: "CGPSC", category: "State PSC", subcategory: "Chhattisgarh",
    photo: { width: 275, height: 354, minKB: 30, maxKB: 100, format: "jpeg", background: "white" },
    signature: { width: 275, height: 118, minKB: 20, maxKB: 50, format: "jpeg" } },

  { slug: "opsc", name: "OPSC 2026", authority: "OPSC", category: "State PSC", subcategory: "Odisha",
    photo: { width: 200, height: 240, minKB: 20, maxKB: 100, format: "jpeg", background: "white" },
    signature: { width: 140, height: 60, minKB: 10, maxKB: 50, format: "jpeg" } },

  { slug: "apsc", name: "APPSC 2026", authority: "APSC", category: "State PSC", subcategory: "Assam",
    photo: { width: 200, height: 250, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 140, height: 60, minKB: 10, maxKB: 20, format: "jpeg" } },

  // ═══ DIPLOMA TO DEGREE, ACPC, & BOARD EXAMS ═══

  { slug: "ddcet", name: "DDCET Exam 2026", authority: "ACPC / GTU", category: "State PSC", subcategory: "Gujarat",
    photo: { width: 200, height: 230, minKB: 10, maxKB: 100, format: "jpeg", background: "white" },
    signature: { width: 140, height: 60, minKB: 5, maxKB: 50, format: "jpeg" },
    special: "For Diploma to Degree Common Entrance Test (DDCET) engineering admissions in Gujarat." },

  { slug: "acpc-admission", name: "ACPC Admission Form 2026", authority: "ACPC Gujarat", category: "State PSC", subcategory: "Gujarat",
    photo: { width: 200, height: 230, minKB: 10, maxKB: 100, format: "jpeg", background: "white" },
    signature: { width: 140, height: 60, minKB: 5, maxKB: 50, format: "jpeg" },
    special: "For professional courses admission registrations (B.E, B.Tech, MCA, MBA) under ACPC." },

  { slug: "gseb-10th-board", name: "10th Class Board Exam (GSEB/CBSE)", authority: "Education Boards", category: "State PSC", subcategory: "Multiple State",
    photo: { width: 150, height: 200, minKB: 5, maxKB: 40, format: "jpeg", background: "white" },
    signature: { width: 140, height: 60, minKB: 5, maxKB: 20, format: "jpeg" },
    special: "Standard JPG requirements for 10th Class Board Exam enrollment and hall ticket registrations." },

  { slug: "gseb-12th-board", name: "12th Class Board Exam (GSEB/CBSE)", authority: "Education Boards", category: "State PSC", subcategory: "Multiple State",
    photo: { width: 150, height: 200, minKB: 5, maxKB: 40, format: "jpeg", background: "white" },
    signature: { width: 140, height: 60, minKB: 5, maxKB: 20, format: "jpeg" },
    special: "Standard photography & signature guidelines for 12th Class Board Exam forms." },

  // ═══ POLICE EXAMS ═══

  { slug: "up-police", name: "UP Police Constable 2026", authority: "UPPRPB", category: "Police", subcategory: "Uttar Pradesh",
    photo: { width: 180, height: 225, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 200, height: 80, minKB: 5, maxKB: 20, format: "jpeg" } },

  { slug: "delhi-police", name: "Delhi Police 2026", authority: "SSC", category: "Police", subcategory: "Delhi",
    photo: { width: 100, height: 120, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 40, height: 60, minKB: 20, maxKB: 50, format: "jpeg" } },

  { slug: "mp-police", name: "MP Police 2026", authority: "MPPEB", category: "Police", subcategory: "Madhya Pradesh",
    photo: { width: 200, height: 250, minKB: 50, maxKB: 200, format: "jpeg", background: "white" },
    signature: { width: 300, height: 100, minKB: 30, maxKB: 100, format: "jpeg" } },

  { slug: "rajasthan-police", name: "Rajasthan Police 2026", authority: "RPSC", category: "Police", subcategory: "Rajasthan",
    photo: { width: 350, height: 450, minKB: 50, maxKB: 100, format: "jpeg", background: "white" },
    signature: { width: 400, height: 200, minKB: 20, maxKB: 50, format: "jpeg" } },

  { slug: "maharashtra-police", name: "Maharashtra Police 2026", authority: "Maharashtra Police", category: "Police", subcategory: "Maharashtra",
    photo: { width: 160, height: 200, minKB: 5, maxKB: 20, format: "jpeg", background: "white" },
    signature: { width: 256, height: 64, minKB: 5, maxKB: 20, format: "jpeg" } },

  { slug: "wb-police", name: "West Bengal Police 2026", authority: "WBPRB", category: "Police", subcategory: "West Bengal",
    photo: { width: 200, height: 240, minKB: 10, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 140, height: 80, minKB: 10, maxKB: 30, format: "jpeg" } },

  { slug: "bihar-police", name: "Bihar Police 2026", authority: "BPSSC", category: "Police", subcategory: "Bihar",
    photo: { width: 200, height: 230, minKB: 30, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 140, height: 60, minKB: 20, maxKB: 50, format: "jpeg" } },

  { slug: "haryana-police", name: "Haryana Police 2026", authority: "HPRB", category: "Police", subcategory: "Haryana",
    photo: { width: 138, height: 177, minKB: 20, maxKB: 40, format: "jpeg", background: "white" },
    signature: { width: 138, height: 59, minKB: 10, maxKB: 30, format: "jpeg" } },

  { slug: "gujarat-police", name: "Gujarat Police 2026", authority: "Gujarat Police", category: "Police", subcategory: "Gujarat",
    photo: { width: 200, height: 250, minKB: 30, maxKB: 100, format: "jpeg", background: "white" },
    signature: { width: 140, height: 80, minKB: 10, maxKB: 50, format: "jpeg" } },

  { slug: "tn-police", name: "Tamil Nadu Police 2026", authority: "TNUSRB", category: "Police", subcategory: "Tamil Nadu",
    photo: { width: 275, height: 354, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 200, height: 80, minKB: 10, maxKB: 20, format: "jpeg" } },

  { slug: "kerala-police", name: "Kerala Police 2026", authority: "Kerala Police", category: "Police", subcategory: "Kerala",
    photo: { width: 150, height: 200, minKB: 20, maxKB: 30, format: "jpeg", background: "white" },
    signature: { width: 150, height: 100, minKB: 20, maxKB: 30, format: "jpeg" } },

  { slug: "odisha-police", name: "Odisha Police 2026", authority: "Odisha Police", category: "Police", subcategory: "Odisha",
    photo: { width: 200, height: 240, minKB: 35, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 140, height: 60, minKB: 25, maxKB: 50, format: "jpeg" } },

  { slug: "karnataka-police", name: "Karnataka Police 2026", authority: "Karnataka Police", category: "Police", subcategory: "Karnataka",
    photo: { width: 200, height: 250, minKB: 30, maxKB: 100, format: "jpeg", background: "white" },
    signature: { width: 140, height: 80, minKB: 20, maxKB: 50, format: "jpeg" } },

  { slug: "assam-police", name: "Assam Police 2026", authority: "Assam Police", category: "Police", subcategory: "Assam",
    photo: { width: 280, height: 350, minKB: 100, maxKB: 450, format: "jpeg", background: "white" },
    signature: { width: 280, height: 200, minKB: 50, maxKB: 100, format: "jpeg" } },

  // ═══ JUDICIARY EXAMS ═══

  { slug: "delhi-judiciary", name: "Delhi Judicial Service 2026", authority: "DHCSC", category: "Judiciary", subcategory: "Delhi",
    photo: { width: 200, height: 240, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 140, height: 80, minKB: 10, maxKB: 20, format: "jpeg" } },

  { slug: "patna-hc", name: "Patna High Court 2026", authority: "Patna HC", category: "Judiciary", subcategory: "Bihar",
    photo: { width: 200, height: 240, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 140, height: 80, minKB: 10, maxKB: 20, format: "jpeg" } },

  { slug: "bombay-hc", name: "Bombay High Court 2026", authority: "Bombay HC", category: "Judiciary", subcategory: "Maharashtra",
    photo: { width: 200, height: 240, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 120, height: 80, minKB: 10, maxKB: 20, format: "jpeg" } },

  { slug: "rajasthan-judiciary", name: "Rajasthan Judiciary 2026", authority: "Rajasthan HC", category: "Judiciary", subcategory: "Rajasthan",
    photo: { width: 240, height: 320, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 280, height: 80, minKB: 20, maxKB: 50, format: "jpeg" } },

  { slug: "mp-judiciary", name: "MP Judicial Service 2026", authority: "MPSC-J", category: "Judiciary", subcategory: "Madhya Pradesh",
    photo: { width: 200, height: 240, minKB: 20, maxKB: 50, format: "jpeg", background: "white" },
    signature: { width: 140, height: 80, minKB: 10, maxKB: 20, format: "jpeg" } },

  { slug: "gauhati-hc", name: "Gauhati High Court 2026", authority: "Gauhati HC", category: "Judiciary", subcategory: "Assam",
    photo: { width: 200, height: 240, minKB: 20, maxKB: 100, format: "jpeg", background: "white" },
    signature: { width: 140, height: 80, minKB: 10, maxKB: 50, format: "jpeg" } },

  { slug: "chhattisgarh-judiciary", name: "Chhattisgarh Judiciary 2026", authority: "CG HC", category: "Judiciary", subcategory: "Chhattisgarh",
    photo: { width: 200, height: 240, minKB: 20, maxKB: 100, format: "jpeg", background: "white" },
    signature: { width: 140, height: 80, minKB: 10, maxKB: 100, format: "jpeg" } },
]
