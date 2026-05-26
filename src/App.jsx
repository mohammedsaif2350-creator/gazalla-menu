import { useState, useCallback } from "react";

// ============================================================
// بيانات مطعم غزالة
// ============================================================
const CONFIG = {
  name: "غزالة",
  slogan: "ابدأ نهارك مع غزالة",
  whatsapp: "966551804564",
  instagram: "gazallah2023",
  currency: "ريال",
};

const DRINKS_COLD = [
  { id: "dc1", name: "مـاء", price: 1, emoji: "💧" },
  { id: "dc2", name: "مشروب غازي", price: 2, emoji: "🥤" },
  { id: "dc3", name: "عصير ربيع", price: 2, emoji: "🧃" },
  { id: "dc4", name: "عصير طازج", price: 10, emoji: "🍊" },
  { id: "dc5", name: "عصير مركز", price: 5, emoji: "🍹" },
];

const DRINKS_HOT = [
  { id: "dh1", name: "شاي", price: 2, emoji: "☕" },
  { id: "dh2", name: "شاي كرك", price: 3, emoji: "☕" },
  { id: "dh3", name: "شاي حليب/زنجبيل", price: 3, emoji: "☕" },
  { id: "dh4", name: "شاي أخضر", price: 2, emoji: "🍵" },
  { id: "dh5", name: "نسكافية", price: 3, emoji: "☕" },
  { id: "dh6", name: "حافظة كرك", price: 28, emoji: "🫖" },
  { id: "dh7", name: "حافظة شاي", price: 22, emoji: "🫖" },
];

const ALL_DRINKS = [...DRINKS_COLD, ...DRINKS_HOT];

const CATEGORIES = [
  {
    id: "shawarma", name: "شاورما / برقر", emoji: "🌯", color: "#8B1A1A",
    items: [
      { id: "sw1", name: "شاورما صاروخ", price: 11, emoji: "🌯", popular: true },
      { id: "sw2", name: "شاورما صغير", price: 6, emoji: "🌯" },
      { id: "sw3", name: "شاورما عربي", price: 18, emoji: "🌯", popular: true },
      { id: "sw4", name: "صحن مسحب", price: 17, emoji: "🍽️" },
      { id: "sw5", name: "ساندوتش مسحب", price: 10, emoji: "🥪" },
      { id: "sw6", name: "ساندوتش زنجر", price: 12, emoji: "🥪" },
      { id: "sw7", name: "برقر دجاج", price: 12, emoji: "🍔", popular: true },
      { id: "sw8", name: "برقر لحم مدخن", price: 15, emoji: "🍔" },
      { id: "sw9", name: "صحن بطاطس", price: 6, emoji: "🍟" },
    ],
  },
  {
    id: "shbati_s", name: "شباتي / صامولي", emoji: "🫓", color: "#5D4037",
    items: [
      { id: "bs1", name: "شباتي دجاج", price: 6, emoji: "🫓", popular: true },
      { id: "bs2", name: "شباتي كبده", price: 6, emoji: "🫓" },
      { id: "bs3", name: "شباتي لحم مفروم", price: 6, emoji: "🫓" },
      { id: "bs4", name: "شباتي تونه", price: 5, emoji: "🫓" },
      { id: "bs5", name: "شباتي شكشوكه", price: 4, emoji: "🫓" },
      { id: "bs6", name: "شباتي بيض جبنة", price: 4, emoji: "🫓" },
      { id: "bs7", name: "مقلي / مسلوق ساده", price: 3, emoji: "🫓" },
      { id: "bs8", name: "جبنه سائل", price: 3, emoji: "🫓" },
      { id: "bs9", name: "جبنه مربى", price: 5, emoji: "🫓" },
      { id: "bs10", name: "مشكل طعمية", price: 5, emoji: "🫓" },
      { id: "bs11", name: "طعمية ساده", price: 4, emoji: "🫓" },
      { id: "bs12", name: "شباتي ساده", price: 2, emoji: "🫓" },
    ],
  },
  {
    id: "shbati_h", name: "شباتي / حالي", emoji: "🍯", color: "#6D4C1F",
    items: [
      { id: "bh1", name: "شباتي لبنه", price: 4, emoji: "🍯" },
      { id: "bh2", name: "شباتي لبنه عسل", price: 5, emoji: "🍯", popular: true },
      { id: "bh3", name: "شباتي لبنه زعتر", price: 5, emoji: "🍯" },
      { id: "bh4", name: "شباتي نوتيلا", price: 5, emoji: "🍫", popular: true },
      { id: "bh5", name: "شباتي فول سوداني", price: 5, emoji: "🥜" },
      { id: "bh6", name: "شباتي لوتس", price: 6, emoji: "🍪", popular: true },
      { id: "bh7", name: "شباتي طحينة", price: 4, emoji: "🍯" },
      { id: "bh8", name: "شباتي طحينة جبنة", price: 5, emoji: "🍯" },
      { id: "bh9", name: "شباتي جبنة عسل", price: 5, emoji: "🍯" },
      { id: "bh10", name: "شباتي جلد امرو", price: 6, emoji: "🍬" },
    ],
  },
  {
    id: "sohon", name: "صحون", emoji: "🍽️", color: "#1A3A1A",
    items: [
      { id: "so1", name: "صحن كبده", price: 12, emoji: "🍽️" },
      { id: "so2", name: "صحن دجاج", price: 12, emoji: "🍽️", popular: true },
      { id: "so3", name: "صحن تونه", price: 10, emoji: "🍽️" },
      { id: "so4", name: "صحن شكشوكه", price: 8, emoji: "🍳" },
      { id: "so5", name: "صحن قلابة/عدس", price: 6, emoji: "🍽️" },
      { id: "so6", name: "صحن تونة بازيلاء", price: 10, emoji: "🍽️" },
    ],
  },
  {
    id: "boxes", name: "بوكسات غزالة", emoji: "📦", color: "#4A235A",
    items: [
      { id: "bx1", name: "بوكس ساندوتش مشكل", price: 28, emoji: "📦", popular: true },
      { id: "bx2", name: "بوكس نواشف", price: 28, emoji: "📦" },
      { id: "bx3", name: "بوكس ساندوتش حالي", price: 28, emoji: "📦" },
      { id: "bx4", name: "بوكس شاورما غزالة", price: 37, emoji: "📦", popular: true },
    ],
  },
];

// فئة المشروبات كقائمة منفصلة للطلب المباشر
const DRINK_CATEGORY = {
  id: "drinks_only", name: "مشروبات", emoji: "🥤", color: "#0d3b2e",
};

const EXTRAS = [
  { id: "ex1", label: "شيبس عمان", priceAdd: 1, emoji: "🥔" },
  { id: "ex2", label: "جبنه", priceAdd: 1, emoji: "🧀" },
  { id: "ex3", label: "بيض دبل", priceAdd: 1, emoji: "🍳" },
  { id: "ex4", label: "علبة ثوم", priceAdd: 2, emoji: "🧄" },
  { id: "ex5", label: "علبة كاتشاب", priceAdd: 2, emoji: "🍅" },
];

const SPICE = [
  { id: "sp1", label: "عادي", emoji: "😊" },
  { id: "sp2", label: "حار قليلاً", emoji: "🌶️" },
  { id: "sp3", label: "حار جداً", emoji: "🔥" },
];

const REMOVALS = [
  { id: "r1", label: "بدون بصل" },
  { id: "r2", label: "بدون طماطم" },
  { id: "r3", label: "بدون مخلل" },
  { id: "r4", label: "بدون صوص" },
  { id: "r5", label: "بدون خس" },
  { id: "r6", label: "بدون فلفل" },
];

// حساب سعر العنصر
const calcItemTotal = (item) => {
  if (item.isDrink) return item.price * item.qty;
  const extrasSum = (item.extras || []).reduce((s, eid) => {
    return s + (EXTRAS.find(e => e.id === eid)?.priceAdd || 0);
  }, 0);
  const drinkPrice = item.drink ? (ALL_DRINKS.find(d => d.id === item.drink)?.price || 0) : 0;
  return (item.price + extrasSum + drinkPrice) * item.qty;
};

let orderSeq = 1050 + Math.floor(Math.random() * 50);

// ============================================================
// اللوغو SVG
// ============================================================
const GazalaLogo = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="48" fill="#1a1a2e" stroke="#D4A017" strokeWidth="2.5"/>
    <ellipse cx="56" cy="53" rx="19" ry="10" fill="#C0392B" transform="rotate(-15 56 53)"/>
    <circle cx="38" cy="44" r="8" fill="#C0392B"/>
    <line x1="46" y1="42" x2="56" y2="46" stroke="#C0392B" strokeWidth="4" strokeLinecap="round"/>
    <line x1="66" y1="51" x2="73" y2="44" stroke="#C0392B" strokeWidth="3" strokeLinecap="round"/>
    <line x1="73" y1="44" x2="75" y2="37" stroke="#C0392B" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="46" y1="59" x2="43" y2="70" stroke="#C0392B" strokeWidth="3" strokeLinecap="round"/>
    <line x1="53" y1="61" x2="51" y2="71" stroke="#C0392B" strokeWidth="3" strokeLinecap="round"/>
    <line x1="64" y1="59" x2="63" y2="69" stroke="#C0392B" strokeWidth="3" strokeLinecap="round"/>
    <line x1="70" y1="56" x2="71" y2="66" stroke="#C0392B" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="25" cy="63" r="5" fill="#D4A017"/>
    <circle cx="76" cy="31" r="4" fill="#D4A017"/>
  </svg>
);

// ============================================================
// Chip مكون زر الاختيار
// ============================================================
const Chip = ({ label, active, onClick, color = "#C0392B" }) => (
  <button onClick={onClick} style={{
    padding: "8px 14px", borderRadius: 20, cursor: "pointer", transition: "all 0.15s",
    border: `1.5px solid ${active ? color : "rgba(255,255,255,0.15)"}`,
    background: active ? color : "rgba(255,255,255,0.05)",
    color: active ? "#fff" : "#bbb",
    fontFamily: "'Cairo', sans-serif", fontSize: 12, fontWeight: active ? 700 : 400,
    whiteSpace: "nowrap", WebkitTapHighlightColor: "transparent",
  }}>{label}</button>
);

// ============================================================
// المكون الرئيسي
// ============================================================
export default function App() {
  // الصفحات: menu | customize | drink_order | cart | admin
  const [page, setPage] = useState("menu");
  const [activeCat, setActiveCat] = useState("shawarma");
  const [cart, setCart] = useState([]);
  const [customItem, setCustomItem] = useState(null); // بيانات التخصيص الحالية
  const [notification, setNotification] = useState(null);
  const [orderSent, setOrderSent] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminPass, setAdminPass] = useState("");

  const cartTotal = cart.reduce((s, i) => s + calcItemTotal(i), 0);

  const notify = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 2200);
  };

  // ---- فتح صفحة تخصيص صنف ----
  const openCustomize = (item, catColor) => {
    setCustomItem({
      cartId: Date.now(),
      name: item.name,
      price: item.price,
      emoji: item.emoji,
      catColor: catColor || "#8B1A1A",
      isDrink: false,
      extras: [],
      removals: [],
      spice: "sp1",
      drink: null,
      qty: 1,
      notes: "",
    });
    setPage("customize");
  };

  // ---- فتح صفحة طلب مشروب مباشر ----
  const openDrinkOrder = (drink) => {
    setCustomItem({
      cartId: Date.now(),
      name: drink.name,
      price: drink.price,
      emoji: drink.emoji,
      isDrink: true,
      qty: 1,
    });
    setPage("drink_order");
  };

  // ---- إضافة للسلة ----
  const addToCart = (item) => {
    setCart(prev => [...prev, item]);
    notify("✅ أُضيف للسلة!");
    setPage("menu");
  };

  const removeFromCart = (cartId) => setCart(prev => prev.filter(i => i.cartId !== cartId));
  const changeQty = (cartId, delta) =>
    setCart(prev => prev.map(i => i.cartId === cartId ? { ...i, qty: Math.max(1, i.qty + delta) } : i));

  // ---- إرسال الطلب عبر واتساب ----
  const sendOrder = () => {
    orderSeq++;
    const now = new Date();
    const time = now.toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" });
    let msg = `🦌 *طلب من مطعم غزالة*\n━━━━━━━━━━━━━━━\n`;
    msg += `📋 رقم الطلب: *#${orderSeq}*\n⏰ الوقت: *${time}*\n━━━━━━━━━━━━━━━\n\n`;
    cart.forEach((item, i) => {
      msg += `${i + 1}️⃣ *${item.name}* × ${item.qty}\n`;
      if (!item.isDrink) {
        const spiceLabel = SPICE.find(s => s.id === item.spice)?.label || "";
        msg += `   🌶️ ${spiceLabel}\n`;
        if (item.extras?.length > 0) {
          msg += `   ➕ ${item.extras.map(eid => EXTRAS.find(e => e.id === eid)?.label).join("، ")}\n`;
        }
        if (item.removals?.length > 0) {
          msg += `   ➖ ${item.removals.map(rid => REMOVALS.find(r => r.id === rid)?.label).join("، ")}\n`;
        }
        if (item.drink) {
          const d = ALL_DRINKS.find(d => d.id === item.drink);
          msg += `   🥤 مشروب: ${d?.name}\n`;
        }
        if (item.notes) msg += `   📝 ${item.notes}\n`;
      }
      msg += `   💰 ${calcItemTotal(item)} ${CONFIG.currency}\n\n`;
    });
    msg += `━━━━━━━━━━━━━━━\n💵 *الإجمالي: ${cartTotal} ${CONFIG.currency}*\n━━━━━━━━━━━━━━━\n_شكراً لطلبك من غزالة_ 🦌`;
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
    setOrderSent(true);
    setTimeout(() => { setOrderSent(false); setCart([]); setPage("menu"); }, 3000);
  };

  // ============================================================
  // ===== صفحة القائمة الرئيسية =====
  // ============================================================
  if (page === "menu") {
    const currentCat = CATEGORIES.find(c => c.id === activeCat);
    const isColDrink = activeCat === "drinks_cold";
    const isHotDrink = activeCat === "drinks_hot";
    const currentDrinks = isColDrink ? DRINKS_COLD : isHotDrink ? DRINKS_HOT : null;

    return (
      <div style={{ minHeight: "100vh", background: "#0f0f1a", direction: "rtl", fontFamily: "'Cairo', sans-serif" }}>
        <GlobalStyle />

        {/* هيدر */}
        <div style={{
          background: "linear-gradient(135deg,#1a1a2e,#16213e)",
          padding: "18px 16px 14px",
          borderBottom: "2px solid #D4A017",
          position: "sticky", top: 0, zIndex: 50,
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <div onClick={() => setPage("admin")} style={{ cursor: "pointer", fontSize: 20, opacity: 0.5 }}>⚙️</div>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              <GazalaLogo size={42} />
              <div>
                <div style={{ color: "#D4A017", fontSize: 22, fontWeight: 900 }}>غزالة</div>
                <div style={{ color: "#888", fontSize: 11 }}>ابدأ نهارك مع غزالة 🦌</div>
              </div>
            </div>
          </div>
          {cart.length > 0
            ? <button onClick={() => setPage("cart")} style={{ background: "#D4A017", border: "none", borderRadius: 20, padding: "8px 14px", color: "#0f0f1a", fontWeight: 900, fontFamily: "'Cairo',sans-serif", fontSize: 13, cursor: "pointer", boxShadow: "0 2px 10px rgba(212,160,23,.4)" }}>🛒 {cart.length}</button>
            : <div style={{ width: 50 }} />}
        </div>

        {/* تبويبات الفئات */}
        <div style={{ overflowX: "auto", display: "flex", gap: 8, padding: "12px 16px 8px", background: "#0a0a15" }}>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setActiveCat(cat.id)} style={{
              flexShrink: 0, padding: "8px 14px", borderRadius: 20, cursor: "pointer",
              border: activeCat === cat.id ? "2px solid #D4A017" : "2px solid rgba(255,255,255,0.1)",
              background: activeCat === cat.id ? cat.color : "rgba(255,255,255,0.04)",
              color: activeCat === cat.id ? "#FFD700" : "#999",
              fontFamily: "'Cairo',sans-serif", fontSize: 12, fontWeight: activeCat === cat.id ? 800 : 400,
              whiteSpace: "nowrap", transition: "all 0.2s",
            }}>{cat.emoji} {cat.name}</button>
          ))}
          {/* مشروبات باردة/ساخنة */}
          {["drinks_cold","drinks_hot"].map((dk, idx) => (
            <button key={dk} onClick={() => setActiveCat(dk)} style={{
              flexShrink: 0, padding: "8px 14px", borderRadius: 20, cursor: "pointer",
              border: activeCat === dk ? "2px solid #D4A017" : "2px solid rgba(255,255,255,0.1)",
              background: activeCat === dk ? "#0d3b2e" : "rgba(255,255,255,0.04)",
              color: activeCat === dk ? "#FFD700" : "#999",
              fontFamily: "'Cairo',sans-serif", fontSize: 12, fontWeight: activeCat === dk ? 800 : 400,
              whiteSpace: "nowrap",
            }}>{idx === 0 ? "🥤 باردة" : "☕ ساخنة"}</button>
          ))}
        </div>

        {/* المحتوى */}
        <div style={{ padding: "10px 16px 130px" }}>
          {currentCat && (
            <>
              <SectionTitle emoji={currentCat.emoji} title={currentCat.name} />
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {currentCat.items.map(item => (
                  <ItemRow key={item.id} item={item} onPress={() => openCustomize(item, currentCat.color)} />
                ))}
              </div>
            </>
          )}

          {/* ===== المشروبات - يمكن طلبها مباشرة ===== */}
          {currentDrinks && (
            <>
              <SectionTitle emoji={isColDrink ? "🥤" : "☕"} title={isColDrink ? "مشروبات باردة" : "مشروبات ساخنة"} />
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {currentDrinks.map(drink => (
                  <div key={drink.id} onClick={() => openDrinkOrder(drink)} style={{
                    background: "linear-gradient(135deg,#0d2010,#0f3020)",
                    border: "1px solid rgba(212,160,23,0.2)", borderRadius: 14,
                    padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer",
                  }}>
                    <span style={{ fontSize: 28 }}>{drink.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: "#ddd", fontSize: 15, fontWeight: 700 }}>{drink.name}</div>
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <div style={{ color: "#D4A017", fontSize: 16, fontWeight: 900 }}>{drink.price}</div>
                      <div style={{ color: "#777", fontSize: 10 }}>{CONFIG.currency}</div>
                    </div>
                    <div style={{ background: "#0d3b2e", borderRadius: 10, padding: "6px 10px", color: "#90EE90", fontSize: 18, fontWeight: 900 }}>+</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* زر السلة العائم */}
        {cart.length > 0 && (
          <div style={{ position: "fixed", bottom: 20, left: 16, right: 16, zIndex: 100 }}>
            <button onClick={() => setPage("cart")} style={{
              width: "100%", background: "linear-gradient(135deg,#D4A017,#C0392B)",
              border: "none", borderRadius: 16, padding: "15px 20px",
              color: "#fff", fontFamily: "'Cairo',sans-serif", fontSize: 16, fontWeight: 900,
              cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
              boxShadow: "0 6px 24px rgba(212,160,23,.35)",
            }}>
              <span style={{ background: "rgba(255,255,255,.2)", borderRadius: 12, padding: "2px 10px" }}>{cart.length}</span>
              <span>🛒 عرض السلة</span>
              <span>{cartTotal} {CONFIG.currency}</span>
            </button>
          </div>
        )}
        <Toast n={notification} />
      </div>
    );
  }

  // ============================================================
  // ===== صفحة تخصيص الصنف =====
  // ============================================================
  if (page === "customize" && customItem) {
    return <CustomizePage
      initial={customItem}
      onBack={() => setPage("menu")}
      onAdd={addToCart}
    />;
  }

  // ============================================================
  // ===== صفحة طلب مشروب مباشر =====
  // ============================================================
  if (page === "drink_order" && customItem) {
    return <DrinkOrderPage
      initial={customItem}
      onBack={() => setPage("menu")}
      onAdd={addToCart}
    />;
  }

  // ============================================================
  // ===== صفحة السلة =====
  // ============================================================
  if (page === "cart") {
    return (
      <div style={{ minHeight: "100vh", background: "#0f0f1a", direction: "rtl", paddingBottom: 120, fontFamily: "'Cairo',sans-serif" }}>
        <GlobalStyle />
        <div style={{ background: "linear-gradient(135deg,#1a1a2e,#16213e)", padding: "16px", borderBottom: "2px solid #D4A017", display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 10 }}>
          <BackBtn onClick={() => setPage("menu")} />
          <div style={{ flex: 1, textAlign: "right", color: "#D4A017", fontSize: 18, fontWeight: 900 }}>🛒 سلة طلباتك</div>
          <GazalaLogo size={36} />
        </div>

        {cart.length === 0 ? (
          <div style={{ textAlign: "center", padding: "70px 20px" }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
            <div style={{ color: "#555", fontSize: 16 }}>السلة فارغة!</div>
            <button onClick={() => setPage("menu")} style={{ marginTop: 20, background: "#D4A017", border: "none", borderRadius: 14, padding: "12px 32px", color: "#0f0f1a", fontFamily: "'Cairo',sans-serif", fontSize: 15, fontWeight: 800, cursor: "pointer" }}>🦌 ابدأ الطلب</button>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            {cart.map(item => {
              const spiceLabel = !item.isDrink ? (SPICE.find(s => s.id === item.spice)?.label || "") : null;
              const drinkObj = !item.isDrink && item.drink ? ALL_DRINKS.find(d => d.id === item.drink) : null;
              const t = calcItemTotal(item);
              return (
                <div key={item.cartId} style={{ background: "linear-gradient(135deg,#1a1a2e,#16213e)", border: "1px solid rgba(212,160,23,.2)", borderRadius: 16, padding: 16, marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <button onClick={() => removeFromCart(item.cartId)} style={{ background: "rgba(192,57,43,.2)", border: "1px solid #C0392B", borderRadius: 8, padding: "4px 10px", color: "#E57373", cursor: "pointer", fontSize: 12, fontFamily: "'Cairo',sans-serif" }}>🗑️ حذف</button>
                    <div style={{ color: "#eee", fontSize: 15, fontWeight: 800 }}>{item.emoji} {item.name}</div>
                  </div>
                  {!item.isDrink && (
                    <div style={{ color: "#888", fontSize: 12, lineHeight: 2, textAlign: "right" }}>
                      {spiceLabel && <>🌶️ {spiceLabel}<br /></>}
                      {item.extras?.length > 0 && <>➕ {item.extras.map(eid => EXTRAS.find(e => e.id === eid)?.label).join("، ")}<br /></>}
                      {item.removals?.length > 0 && <>➖ {item.removals.map(rid => REMOVALS.find(r => r.id === rid)?.label).join("، ")}<br /></>}
                      {drinkObj && <>🥤 {drinkObj.name}<br /></>}
                      {item.notes && <>📝 {item.notes}</>}
                    </div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                    <div style={{ color: "#D4A017", fontSize: 17, fontWeight: 900 }}>{t} {CONFIG.currency}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <RoundBtn onClick={() => changeQty(item.cartId, -1)} color="#C0392B" label="−" />
                      <span style={{ color: "#fff", fontSize: 18, fontWeight: 900, minWidth: 22, textAlign: "center" }}>{item.qty}</span>
                      <RoundBtn onClick={() => changeQty(item.cartId, 1)} color="#2E7D32" label="+" />
                    </div>
                  </div>
                </div>
              );
            })}
            {/* إجمالي */}
            <div style={{ background: "linear-gradient(135deg,#1a1200,#2a1e00)", border: "2px solid #D4A017", borderRadius: 16, padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ color: "#D4A017", fontSize: 22, fontWeight: 900 }}>{cartTotal} {CONFIG.currency}</div>
              <div style={{ color: "#eee", fontSize: 16, fontWeight: 700 }}>💰 الإجمالي</div>
            </div>
          </div>
        )}

        {cart.length > 0 && (
          <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "14px 16px", background: "rgba(15,15,26,.97)", borderTop: "1px solid rgba(212,160,23,.2)" }}>
            {orderSent
              ? <div style={{ textAlign: "center", color: "#A5D6A7", fontSize: 16, fontWeight: 700, padding: 14 }}>✅ تم إرسال الطلب! شكراً لك 🦌</div>
              : <button onClick={sendOrder} style={{ width: "100%", background: "linear-gradient(135deg,#25D366,#128C7E)", border: "none", borderRadius: 14, padding: "16px", color: "#fff", fontFamily: "'Cairo',sans-serif", fontSize: 16, fontWeight: 900, cursor: "pointer", boxShadow: "0 4px 20px rgba(37,211,102,.35)", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                  <span style={{ fontSize: 22 }}>📲</span>
                  إرسال الطلب عبر واتساب — {cartTotal} {CONFIG.currency}
                </button>}
          </div>
        )}
      </div>
    );
  }

  // ============================================================
  // ===== لوحة التحكم =====
  // ============================================================
  if (page === "admin") {
    if (!adminUnlocked) return (
      <div style={{ minHeight: "100vh", background: "#0f0f1a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, direction: "rtl", fontFamily: "'Cairo',sans-serif" }}>
        <GlobalStyle />
        <GazalaLogo size={64} />
        <h2 style={{ color: "#D4A017", marginTop: 16, marginBottom: 24 }}>لوحة تحكم غزالة</h2>
        <input type="password" value={adminPass} onChange={e => setAdminPass(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") adminPass === "1234" ? setAdminUnlocked(true) : notify("كلمة مرور خاطئة", "error"); }}
          placeholder="كلمة المرور"
          style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(212,160,23,.4)", borderRadius: 12, padding: "12px 16px", color: "#fff", fontFamily: "'Cairo',sans-serif", fontSize: 15, width: "100%", maxWidth: 300, direction: "rtl", marginBottom: 12, outline: "none" }} />
        <button onClick={() => adminPass === "1234" ? setAdminUnlocked(true) : notify("كلمة مرور خاطئة", "error")}
          style={{ background: "#D4A017", border: "none", borderRadius: 14, padding: "12px 32px", color: "#0f0f1a", fontFamily: "'Cairo',sans-serif", fontSize: 15, fontWeight: 800, cursor: "pointer" }}>دخول</button>
        <p style={{ color: "#555", fontSize: 11, marginTop: 12 }}>كلمة المرور الافتراضية: 1234</p>
        <button onClick={() => setPage("menu")} style={{ marginTop: 8, background: "transparent", border: "none", color: "#888", fontFamily: "'Cairo',sans-serif", cursor: "pointer", fontSize: 14 }}>← رجوع للقائمة</button>
        <Toast n={notification} />
      </div>
    );

    return (
      <div style={{ minHeight: "100vh", background: "#0f0f1a", direction: "rtl", fontFamily: "'Cairo',sans-serif", paddingBottom: 40 }}>
        <GlobalStyle />
        <div style={{ background: "linear-gradient(135deg,#0d2b0d,#1a4a1a)", padding: "16px", borderBottom: "2px solid #2E7D32", display: "flex", alignItems: "center", gap: 12 }}>
          <BackBtn onClick={() => setPage("menu")} />
          <div style={{ flex: 1, textAlign: "right", color: "#90EE90", fontSize: 18, fontWeight: 900 }}>⚙️ لوحة التحكم</div>
          <GazalaLogo size={36} />
        </div>
        <div style={{ padding: 16 }}>
          <div style={{ background: "rgba(46,125,50,.1)", border: "1px solid #2E7D32", borderRadius: 12, padding: 16, textAlign: "center", marginBottom: 20 }}>
            <div style={{ color: "#25D366", fontSize: 28 }}>📲</div>
            <div style={{ color: "#eee", fontSize: 16, fontWeight: 800, marginTop: 6 }}>+{CONFIG.whatsapp}</div>
            <div style={{ color: "#888", fontSize: 12, marginTop: 4 }}>🦌 @{CONFIG.instagram}</div>
          </div>
          {CATEGORIES.map(cat => (
            <div key={cat.id} style={{ marginBottom: 20 }}>
              <h3 style={{ color: "#D4A017", fontSize: 15, fontWeight: 800, textAlign: "right", borderRight: "3px solid #D4A017", paddingRight: 10, marginBottom: 10 }}>{cat.emoji} {cat.name}</h3>
              {cat.items.map(item => (
                <div key={item.id} style={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, padding: "10px 12px", marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
                  <input type="number" defaultValue={item.price} style={{ width: 60, background: "rgba(212,160,23,.1)", border: "1px solid rgba(212,160,23,.4)", borderRadius: 8, padding: "6px", color: "#D4A017", fontFamily: "'Cairo',sans-serif", fontSize: 14, textAlign: "center", outline: "none" }} />
                  <div style={{ flex: 1, color: "#ccc", fontSize: 14, textAlign: "right" }}>{item.emoji} {item.name}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <Toast n={notification} />
      </div>
    );
  }

  return null;
}

// ============================================================
// ===== صفحة تخصيص الصنف (مكون منفصل بـ useState خاص به) =====
// ============================================================
function CustomizePage({ initial, onBack, onAdd }) {
  const [item, setItem] = useState({ ...initial });
  const total = calcItemTotal(item);

  const toggleArr = (field, val) =>
    setItem(p => ({ ...p, [field]: p[field].includes(val) ? p[field].filter(v => v !== val) : [...p[field], val] }));

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f1a", direction: "rtl", paddingBottom: 100, fontFamily: "'Cairo',sans-serif" }}>
      <GlobalStyle />
      {/* رأس */}
      <div style={{ background: item.catColor || "#8B1A1A", padding: "16px", display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 10 }}>
        <BackBtn onClick={onBack} />
        <div style={{ flex: 1, textAlign: "right" }}>
          <div style={{ color: "#fff", fontSize: 18, fontWeight: 900 }}>{item.emoji} {item.name}</div>
          <div style={{ color: "rgba(255,255,255,.7)", fontSize: 12 }}>خصّص طلبك كما تريد</div>
        </div>
      </div>

      <div style={{ padding: 16 }}>
        {/* الحدة */}
        <Sec title="🌶️ درجة الحدة">
          <ChipRow>{SPICE.map(s => <Chip key={s.id} label={`${s.emoji} ${s.label}`} active={item.spice === s.id} onClick={() => setItem(p => ({ ...p, spice: s.id }))} color="#8B1A1A" />)}</ChipRow>
        </Sec>

        {/* الإضافات */}
        <Sec title="➕ الإضافات">
          <ChipRow>{EXTRAS.map(e => <Chip key={e.id} label={`${e.emoji} ${e.label} (+${e.priceAdd})`} active={item.extras.includes(e.id)} onClick={() => toggleArr("extras", e.id)} color="#2E7D32" />)}</ChipRow>
        </Sec>

        {/* المحذوفات */}
        <Sec title="➖ حذف مكونات">
          <ChipRow>{REMOVALS.map(r => <Chip key={r.id} label={r.label} active={item.removals.includes(r.id)} onClick={() => toggleArr("removals", r.id)} color="#B71C1C" />)}</ChipRow>
        </Sec>

        {/* مشروب اختياري */}
        <Sec title="🥤 أضف مشروب (اختياري)">
          <ChipRow>
            <Chip label="بدون مشروب" active={!item.drink} onClick={() => setItem(p => ({ ...p, drink: null }))} color="#555" />
            {ALL_DRINKS.map(d => <Chip key={d.id} label={`${d.emoji} ${d.name} (${d.price})`} active={item.drink === d.id} onClick={() => setItem(p => ({ ...p, drink: d.id }))} color="#0d3b2e" />)}
          </ChipRow>
        </Sec>

        {/* ملاحظات */}
        <Sec title="📝 ملاحظات">
          <textarea value={item.notes} onChange={e => setItem(p => ({ ...p, notes: e.target.value }))} placeholder="مثال: زيادة صوص، ضغط خفيف..."
            style={{ width: "100%", background: "rgba(255,255,255,.06)", border: "1px solid rgba(212,160,23,.3)", borderRadius: 12, padding: 12, color: "#fff", fontFamily: "'Cairo',sans-serif", fontSize: 13, resize: "none", direction: "rtl", minHeight: 70, outline: "none" }} />
        </Sec>

        {/* الكمية */}
        <Sec title="🔢 الكمية">
          <div style={{ display: "flex", alignItems: "center", gap: 20, justifyContent: "flex-end" }}>
            <RoundBtn onClick={() => setItem(p => ({ ...p, qty: Math.max(1, p.qty - 1) }))} color="#C0392B" label="−" size={44} />
            <span style={{ color: "#D4A017", fontSize: 24, fontWeight: 900, minWidth: 30, textAlign: "center" }}>{item.qty}</span>
            <RoundBtn onClick={() => setItem(p => ({ ...p, qty: p.qty + 1 }))} color="#2E7D32" label="+" size={44} />
          </div>
        </Sec>
      </div>

      {/* زر الإضافة */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "14px 16px", background: "rgba(15,15,26,.97)", borderTop: "1px solid rgba(212,160,23,.2)" }}>
        <button onClick={() => onAdd({ ...item, cartId: Date.now() })} style={{ width: "100%", background: "linear-gradient(135deg,#D4A017,#C0392B)", border: "none", borderRadius: 14, padding: "16px", color: "#fff", fontFamily: "'Cairo',sans-serif", fontSize: 16, fontWeight: 900, cursor: "pointer", boxShadow: "0 4px 20px rgba(212,160,23,.3)" }}>
          🛒 أضف للسلة — {total} {CONFIG.currency}
        </button>
      </div>
    </div>
  );
}

// ============================================================
// ===== صفحة طلب مشروب مباشر =====
// ============================================================
function DrinkOrderPage({ initial, onBack, onAdd }) {
  const [item, setItem] = useState({ ...initial });
  const total = calcItemTotal(item);

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f1a", direction: "rtl", fontFamily: "'Cairo',sans-serif" }}>
      <GlobalStyle />
      <div style={{ background: "#0d3b2e", padding: "16px", display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 10 }}>
        <BackBtn onClick={onBack} />
        <div style={{ flex: 1, textAlign: "right" }}>
          <div style={{ color: "#fff", fontSize: 18, fontWeight: 900 }}>{item.emoji} {item.name}</div>
          <div style={{ color: "rgba(255,255,255,.7)", fontSize: 12 }}>اختر الكمية</div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 30 }}>
        <div style={{ fontSize: 80 }}>{item.emoji}</div>
        <div style={{ color: "#fff", fontSize: 22, fontWeight: 900 }}>{item.name}</div>
        <div style={{ color: "#D4A017", fontSize: 28, fontWeight: 900 }}>{item.price} {CONFIG.currency}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <RoundBtn onClick={() => setItem(p => ({ ...p, qty: Math.max(1, p.qty - 1) }))} color="#C0392B" label="−" size={52} />
          <span style={{ color: "#D4A017", fontSize: 32, fontWeight: 900, minWidth: 40, textAlign: "center" }}>{item.qty}</span>
          <RoundBtn onClick={() => setItem(p => ({ ...p, qty: p.qty + 1 }))} color="#2E7D32" label="+" size={52} />
        </div>
        <div style={{ color: "#aaa", fontSize: 14 }}>الإجمالي: <strong style={{ color: "#D4A017" }}>{total} {CONFIG.currency}</strong></div>
      </div>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "14px 16px", background: "rgba(15,15,26,.97)", borderTop: "1px solid rgba(212,160,23,.2)" }}>
        <button onClick={() => onAdd({ ...item, cartId: Date.now() })} style={{ width: "100%", background: "linear-gradient(135deg,#0d3b2e,#1a6040)", border: "none", borderRadius: 14, padding: "16px", color: "#fff", fontFamily: "'Cairo',sans-serif", fontSize: 16, fontWeight: 900, cursor: "pointer" }}>
          🛒 أضف للسلة — {total} {CONFIG.currency}
        </button>
      </div>
    </div>
  );
}

// ============================================================
// مكونات مساعدة صغيرة
// ============================================================
function GlobalStyle() {
  return <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');
    * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    body { margin: 0; direction: rtl; background: #0f0f1a; }
    ::-webkit-scrollbar { display: none; }
  `}</style>;
}

function SectionTitle({ emoji, title }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid rgba(212,160,23,.2)", marginTop: 8 }}>
      <span style={{ fontSize: 20 }}>{emoji}</span>
      <h2 style={{ color: "#D4A017", fontSize: 17, fontWeight: 800, margin: 0, fontFamily: "'Cairo',sans-serif" }}>{title}</h2>
    </div>
  );
}

function ItemRow({ item, onPress }) {
  return (
    <div onClick={onPress} style={{
      background: "linear-gradient(135deg,#1a1a2e,#16213e)",
      border: `1px solid ${item.popular ? "#D4A017" : "rgba(255,255,255,.08)"}`,
      borderRadius: 14, padding: "14px 16px",
      display: "flex", alignItems: "center", gap: 12, cursor: "pointer",
      boxShadow: item.popular ? "0 2px 12px rgba(212,160,23,.12)" : "none",
    }}>
      <span style={{ fontSize: 28 }}>{item.emoji}</span>
      <div style={{ flex: 1 }}>
        <div style={{ color: "#eee", fontSize: 15, fontWeight: 700, fontFamily: "'Cairo',sans-serif" }}>{item.name}</div>
        {item.popular && <div style={{ color: "#D4A017", fontSize: 10, marginTop: 2 }}>⭐ الأكثر طلباً</div>}
      </div>
      <div style={{ textAlign: "left" }}>
        <div style={{ color: "#D4A017", fontSize: 16, fontWeight: 900, fontFamily: "'Cairo',sans-serif" }}>{item.price}</div>
        <div style={{ color: "#666", fontSize: 10, fontFamily: "'Cairo',sans-serif" }}>{CONFIG.currency}</div>
      </div>
      <div style={{ background: "#C0392B", borderRadius: 10, padding: "6px 10px", color: "#fff", fontSize: 18, fontWeight: 900 }}>+</div>
    </div>
  );
}

function Sec({ title, children }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <h3 style={{ color: "#D4A017", fontFamily: "'Cairo',sans-serif", fontSize: 14, fontWeight: 700, marginBottom: 10, textAlign: "right", borderRight: "3px solid #C0392B", paddingRight: 10 }}>{title}</h3>
      {children}
    </div>
  );
}

function ChipRow({ children }) {
  return <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>{children}</div>;
}

function BackBtn({ onClick }) {
  return (
    <button onClick={onClick} style={{ background: "rgba(0,0,0,.3)", border: "none", borderRadius: 10, padding: "8px 14px", color: "#fff", fontSize: 14, cursor: "pointer", fontFamily: "'Cairo',sans-serif" }}>← رجوع</button>
  );
}

function RoundBtn({ onClick, color, label, size = 36 }) {
  return (
    <button onClick={onClick} style={{ width: size, height: size, borderRadius: "50%", background: color, border: "none", color: "#fff", fontSize: size * 0.55, cursor: "pointer", fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>{label}</button>
  );
}

function Toast({ n }) {
  if (!n) return null;
  return (
    <div style={{ position: "fixed", top: 80, left: "50%", transform: "translateX(-50%)", background: n.type === "error" ? "#C0392B" : "#1e7e34", color: "#fff", fontFamily: "'Cairo',sans-serif", fontSize: 14, fontWeight: 700, padding: "10px 24px", borderRadius: 24, zIndex: 9999, boxShadow: "0 4px 20px rgba(0,0,0,.5)", whiteSpace: "nowrap" }}>{n.msg}</div>
  );
}
