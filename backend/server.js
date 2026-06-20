import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

/* ======================================================
   1️⃣ PERSONALIZED SKIN CARE ROUTINE
   ====================================================== */

function generateRoutine(skinType, condition) {
  let morning = [];
  let evening = [];
  let night = [];

  // Base routine
  morning.push("Gentle cleanser");
  evening.push("Cleanser to remove dirt and oil");
  night.push("Cleanser");

  // Skin type
  if (skinType.includes("dry")) {
    morning.push("Hydrating toner");
    morning.push("Ceramide-based moisturizer");
    night.push("Rich repairing moisturizer");
  }

  if (skinType.includes("oily")) {
    morning.push("Oil-free gel moisturizer");
    night.push("Lightweight non-comedogenic moisturizer");
  }

  if (skinType.includes("combination")) {
    morning.push("Balancing moisturizer (focus on T-zone)");
    night.push("Gel-cream moisturizer");
  }

  if (skinType.includes("sensitive")) {
    morning.push("Soothing serum (aloe / panthenol)");
    night.push("Barrier-repair cream");
  }

  // Conditions
  if (condition.includes("acne") || condition.includes("breakout")) {
    morning.push("Niacinamide serum");
    evening.push("Salicylic acid (2–3x weekly)");
    night.push("Azelaic acid or benzoyl peroxide (spot treatment)");
  }

  if (condition.includes("blackhead") || condition.includes("whitehead")) {
    evening.push("BHA exfoliant");
  }

  if (condition.includes("dryness") || condition.includes("flaky")) {
    morning.push("Hyaluronic acid serum");
    night.push("Occlusive moisturizer if needed");
  }

  if (condition.includes("pigment") || condition.includes("melasma")) {
    morning.push("Vitamin C serum");
    night.push("Azelaic acid or gentle AHA");
  }

  if (condition.includes("wrinkle") || condition.includes("fine line")) {
    night.push("Retinoid (alternate nights)");
  }

  if (condition.includes("redness") || condition.includes("inflammation")) {
    morning.push("Centella / calming serum");
    night.push("Anti-redness moisturizer");
  }

  if (condition.includes("pore")) {
    morning.push("Niacinamide serum");
  }

  if (condition.includes("texture")) {
    evening.push("Mild AHA exfoliation (1–2x weekly)");
  }

  morning.push("Broad-spectrum sunscreen SPF 30+");

  return `
🌅 MORNING:
• ${morning.join("\n• ")}

🌆 EVENING:
• ${evening.join("\n• ")}

🌙 NIGHT:
• ${night.join("\n• ")}
`;
}

/* ======================================================
   2️⃣ INGREDIENT ANALYZER
   ====================================================== */

const ingredientDB = {
  retinal:
    "Stronger retinoid for acne and aging. Retinal, a potent form of vitamin A, accelerates cell turnover to smooth wrinkles, fade acne scars, and boost collagen production. Pros: Faster results than retinol; effective for anti-aging and clogged pores. Cons: Can irritate sensitive skin, causing redness or peeling—start low and slow. Use at night on clean, dry skin (pea-sized amount); pair with moisturizer and sunscreen daily.",

  niacinamide:
    "Reduces pores, redness and oil production. This vitamin B3 derivative calms inflammation, evens tone, and regulates sebum for a matte finish. Pros: Gentle for all skin types; strengthens barrier and minimizes pores quickly. Cons: High concentrations (over 10%) may sting initially. Apply morning/evening in serums or creams, especially for oily, acne-prone, or rosacea skin.",

  "vitamin c":
    "Brightens skin and fades pigmentation. As an antioxidant, it neutralizes free radicals, boosts radiance, and inhibits melanin for even tone. Pros: Protects against sun damage; enhances collagen for firmer skin. Cons: Unstable in light/heat—choose stable forms like ascorbyl glucoside. Use mornings under sunscreen in serums (10–20%).",

  "salicylic acid":
    "Unclogs pores and controls acne. A beta hydroxy acid (BHA) that penetrates oil to exfoliate inside pores. Pros: Oil-soluble; anti-inflammatory. Cons: Drying if overused. Use 1–2% in cleansers or toners daily for oily/acne-prone skin.",

  "benzoyl peroxide":
    "Kills acne-causing bacteria by oxygenating pores. Pros: Fast-acting for inflammatory acne. Cons: Can bleach fabrics and irritate skin. Start with 2.5–5% at night as spot treatment.",

  "azelaic acid":
    "Treats acne, redness and hyperpigmentation. Naturally derived, it reduces inflammation and fades dark spots. Pros: Safe for pregnancy and rosacea. Cons: Slower results. Use 10–20% creams once or twice daily.",

  "glycolic acid":
    "Exfoliates and improves texture. The smallest AHA dissolves dead skin cells. Pros: Evens tone and boosts glow. Cons: Sun sensitivity. Use 5–10% 2–3x weekly at night.",

  "hyaluronic acid":
    "Deep hydration and plumping. A humectant holding 1000x its weight in water. Pros: Lightweight and non-greasy. Cons: Needs moisture to work. Apply before moisturizer morning/night.",

  ceramides:
    "Strengthen the skin barrier by locking in moisture. Pros: Great for eczema and dry skin. Cons: Heavy textures may feel thick. Use daily in creams.",

  glycerin:
    "Attracts moisture into skin. Pros: Gentle and effective. Cons: Sticky in humidity. Found in most moisturizers.",

  urea:
    "Softens and hydrates dry skin while mildly exfoliating. Pros: Great for rough patches. Cons: Can sting broken skin. Use 5–10% creams for very dry areas.",

  petrolatum:
    "Seals moisture and repairs barrier. Pros: Excellent for healing. Cons: Too heavy for oily skin. Use as last step at night.",

  squalane:
    "Lightweight moisturizing oil that mimics skin sebum. Pros: Fast-absorbing and non-greasy. Cons: Expensive. Suitable for all skin types.",

  dimethicone:
    "Prevents moisture loss by forming a breathable barrier. Pros: Smooths texture. Cons: Can trap dirt if not cleansed well.",

  "shea butter":
    "Deep nourishment for dry skin. Pros: Anti-inflammatory and rich. Cons: Comedogenic for acne-prone skin.",

  "cetearyl alcohol":
    "Fatty alcohol that moisturizes and stabilizes formulas. Pros: Non-irritating. Cons: Rare allergies.",

  "glyceryl stearate":
    "Softens and conditions skin while improving texture. Pros: Gentle and moisturizing. Cons: Can feel waxy in excess.",

  "zinc oxide":
    "Mineral sunscreen offering broad-spectrum UV protection. Pros: Safe for sensitive skin. Cons: Thick texture.",

  "titanium dioxide":
    "Gentle mineral UV filter. Pros: Low irritation. Cons: May pill under makeup.",

  lactic:
    "Mild AHA exfoliant suitable for sensitive skin. Pros: Hydrating exfoliation. Cons: Sun sensitivity.",

  mandelic:
    "Gentle AHA for acne-prone skin. Pros: Minimal irritation. Cons: Slower exfoliation.",
};

function analyzeIngredient(text) {
  const key = text.toLowerCase();
  for (let ing in ingredientDB) {
    if (key.includes(ing)) {
      return ingredientDB[ing];
    }
  }
  return "This ingredient is commonly used in skincare. Check concentration and suitability.";
}

/* ======================================================
   3️⃣ DERMOSCOPY REPORT EXPLAINER
   ====================================================== */

function explainDermoscopy(text) {
  let explanation = [];

  if (text.includes("pigment network"))
    explanation.push("Pigment network is commonly seen in benign moles.");

  if (text.includes("irregular border"))
    explanation.push("Irregular borders may require dermatologist evaluation.");

  if (text.includes("asymmetry"))
    explanation.push("Asymmetry can indicate abnormal lesion growth.");

  if (text.includes("blue white veil"))
    explanation.push("Blue-white veil may be seen in suspicious lesions.");

  if (text.includes("dots") || text.includes("globules"))
    explanation.push("Dots and globules show pigment distribution patterns.");

  if (explanation.length === 0)
    explanation.push("This dermoscopy report explains skin structures under magnification.");

  return explanation.join(" ");
}

/* ======================================================
   🔹 SINGLE API ENDPOINT
   ====================================================== */

app.post("/api/ask", (req, res) => {
  const { mode, text, skinType, condition } = req.body;

  if (!mode) {
    return res.json({ answer: "Mode is required." });
  }

  let answer = "";

  if (mode === "routine") {
    answer = generateRoutine(
      (skinType || "").toLowerCase(),
      (condition || "").toLowerCase()
    );
  }

  if (mode === "analyzer") {
    answer = analyzeIngredient(text || "");
  }

  if (mode === "dermoscopy") {
    answer = explainDermoscopy((text || "").toLowerCase());
  }

  res.json({ answer });
});

/* ======================================================
   SERVER START
   ====================================================== */

// ✅ FIXED: works on localhost + online hosting (HuggingFace/Render/etc)
const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`✅ Dermatology AI Backend running at http://localhost:${PORT}`);
});
