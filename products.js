/*
  PRODUCTS DATA
  =============
  Edit this file to add, remove, or change laptops. Nothing else needs to change —
  script.js reads this list and builds the cards automatically.

  price        : number, no currency symbol (edit CURRENCY below to change the label)
  negotiable   : true shows "(negotiable)" after the price
  condition    : short honest grade, shown on the asset tag
  specs        : short list of chips shown under the title (edit freely)
  images       : array of image paths, shown as a swipeable filmstrip (first = cover)
  assetNo      : your own inventory/tag number — change to match your real stock system

  IMPORTANT — about the images below:
  Each product currently points to a simple drawn illustration
  (images/placeholders/laptop-x360.svg and laptop-classic.svg) instead of a real photo,
  since no product photos are bundled with this version of the site.

  To use your own photos later:
  1. Upload your photo files into a new folder, e.g. images/x360/photo1.jpg
  2. Replace the path(s) in the "images" array below with your new file path(s), e.g.:
       images: ["images/x360/photo1.jpg", "images/x360/photo2.jpg"]
  3. You can list as many photos as you want per product — the site automatically
     turns them into a swipeable filmstrip with next/prev arrows and dots.
*/

const CURRENCY = "ETB";

const PRODUCTS = [
  {
    id: "elitebook-x360",
    assetNo: "IIM-0104",
    name: "HP EliteBook x360",
    tagline: "360° convertible — folds flat into tablet mode",
    price: 75000,
    negotiable: true,
    condition: "Grade A — light cosmetic wear, fully functional hinge",
    specs: ["Intel Core i5 / i7 (8th Gen)", "360° flip hinge", "Bang & Olufsen speakers", "Fingerprint reader"],
    images: [
      "images/placeholders/laptop-x360.svg"
    ]
  },
  {
    id: "elitebook-classic",
    assetNo: "IIM-0087",
    name: "HP EliteBook (Classic)",
    tagline: "Standard clamshell, larger screen",
    price: 50000,
    negotiable: true,
    condition: "Grade B — visible cosmetic wear, tested and working",
    specs: ["Intel Core i5 vPro", "Larger screen size", "Standard clamshell body"],
    images: [
      "images/placeholders/laptop-classic.svg"
    ]
  }
];
