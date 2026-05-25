export interface VisaRequirement {
  slug: string;
  name: string;
  country: string;
  category: string;
  photo: {
    format: string;
    width: number;
    height: number;
    minSizeBytes: number;
    maxSizeBytes: number;
    background: string;
    aspectRatio?: string;
    note?: string;
  };
  metaTitle: string;
  metaDesc: string;
  h1: string;
  keywords: string[];
}

export const visaRequirements: VisaRequirement[] = [
  {
    slug: "us-visa-photo",
    name: "USA Visa / Passport",
    country: "United States",
    category: "North America",
    photo: { format: "jpeg", width: 600, height: 600, minSizeBytes: 55296, maxSizeBytes: 245760, background: "white", aspectRatio: "1:1", note: "Square format. 600x600 to 1200x1200 pixels. 54KB-240KB." },
    metaTitle: "US Visa Photo Resize Free — 600x600px 240KB | PasteDocs",
    metaDesc: "Resize photo for US visa DS-160: 600x600px square, max 240KB JPG. Auto tool.",
    h1: "US Visa Photo Ready in 10 Seconds",
    keywords: ["us visa photo resize", "ds-160 photo size", "us passport photo 600x600"]
  },
  {
    slug: "uk-visa-photo",
    name: "UK Visa",
    country: "United Kingdom",
    category: "Europe",
    photo: { format: "jpeg", width: 413, height: 531, minSizeBytes: 10240, maxSizeBytes: 6291456, background: "light grey", note: "45x35mm, light grey background preferred. Max 6MB." },
    metaTitle: "UK Visa Photo Resize Free — 45x35mm | PasteDocs",
    metaDesc: "Resize photo for UK visa: 45x35mm JPG, max 6MB, light grey background.",
    h1: "UK Visa Photo in 10 Seconds",
    keywords: ["uk visa photo resize", "ukvi photo size", "uk visa 45x35mm"]
  },
  {
    slug: "schengen-visa-photo",
    name: "Schengen Visa (Europe)",
    country: "Europe (27 countries)",
    category: "Europe",
    photo: { format: "jpeg", width: 413, height: 531, minSizeBytes: 10240, maxSizeBytes: 1048576, background: "white or light grey", note: "35x45mm, 413x531px at 300 DPI. Light grey or white background. ICAO compliant." },
    metaTitle: "Schengen Visa Photo Resize Free — 35x45mm | PasteDocs",
    metaDesc: "Resize photo for Schengen visa: 35x45mm (413x531px), JPG, white/grey background.",
    h1: "Schengen Visa Photo in 10 Seconds",
    keywords: ["schengen visa photo resize", "europe visa photo size", "schengen photo 35x45"]
  },
  {
    slug: "canada-visa-photo",
    name: "Canada Visa / PR",
    country: "Canada",
    category: "North America",
    photo: { format: "jpeg", width: 420, height: 540, minSizeBytes: 10240, maxSizeBytes: 4194304, background: "white", note: "35x45mm, white background, 420x540px." },
    metaTitle: "Canada Visa Photo Resize Free — 35x45mm | PasteDocs",
    metaDesc: "Resize photo for Canada visa or PR: 35x45mm JPG, max 4MB.",
    h1: "Canada Visa Photo in 10 Seconds",
    keywords: ["canada visa photo resize", "canada pr photo size", "canada immigration photo"]
  },
  {
    slug: "australia-visa-photo",
    name: "Australia Visa",
    country: "Australia",
    category: "Asia Pacific",
    photo: { format: "jpeg", width: 413, height: 531, minSizeBytes: 10240, maxSizeBytes: 10485760, background: "white", note: "35x45mm, max 10MB." },
    metaTitle: "Australia Visa Photo Resize Free | PasteDocs",
    metaDesc: "Resize photo for Australia visa: 35x45mm JPG.",
    h1: "Australia Visa Photo in 10 Seconds",
    keywords: ["australia visa photo resize", "australian visa photo size"]
  },
  {
    slug: "dubai-uae-visa-photo",
    name: "Dubai / UAE Visa",
    country: "UAE",
    category: "Middle East",
    photo: { format: "jpeg", width: 413, height: 531, minSizeBytes: 10240, maxSizeBytes: 1048576, background: "white", note: "43x55mm preferred, white background." },
    metaTitle: "Dubai UAE Visa Photo Resize Free | PasteDocs",
    metaDesc: "Resize photo for Dubai/UAE visa: JPG, white background.",
    h1: "UAE Visa Photo in 10 Seconds",
    keywords: ["dubai visa photo resize", "uae visa photo size", "dubai photo requirements"]
  },
  {
    slug: "singapore-visa-photo",
    name: "Singapore Visa",
    country: "Singapore",
    category: "Asia Pacific",
    photo: { format: "jpeg", width: 400, height: 514, minSizeBytes: 10240, maxSizeBytes: 61440, background: "white", note: "35x45mm, max 60KB. Strict size limit." },
    metaTitle: "Singapore Visa Photo Resize Free — 60KB | PasteDocs",
    metaDesc: "Resize photo for Singapore visa: 35x45mm, max 60KB JPG.",
    h1: "Singapore Visa Photo in 10 Seconds",
    keywords: ["singapore visa photo resize", "singapore visa photo 60kb"]
  },
  {
    slug: "japan-visa-photo",
    name: "Japan Visa",
    country: "Japan",
    category: "Asia Pacific",
    photo: { format: "jpeg", width: 472, height: 472, minSizeBytes: 10240, maxSizeBytes: 2097152, background: "white", note: "4x4cm square, white background, taken within 6 months." },
    metaTitle: "Japan Visa Photo Resize Free | PasteDocs",
    metaDesc: "Resize photo for Japan visa: 4x4cm square JPG.",
    h1: "Japan Visa Photo in 10 Seconds",
    keywords: ["japan visa photo resize", "japan visa photo size"]
  }
];
