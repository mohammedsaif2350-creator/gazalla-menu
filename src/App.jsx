import { useState, useEffect, useCallback } from "react";

// ============================================================
// بيانات المطعم - يمكن تعديلها من لوحة التحكم
// ============================================================
const RESTAURANT_CONFIG = {
  name: "غزالة",
  slogan: "ابدأ نهارك مع غزالة 🦌",
  whatsapp: "966551804564",
  logo: "🦌",
  currency: "ريال",
};

const INITIAL_MENU = {
  // شباتي / صامولي
  shabatySamoli: [
    { id: "ss1", name: "دجاج", basePrice: 6, emoji: "🍗", popular: true, category: "شباتي / صامولي" },
    { id: "ss2", name: "كبده", basePrice: 6, emoji: "🔥", popular: false, category: "شباتي / صامولي" },
    { id: "ss3", name: "لحم مفروم", basePrice: 6, emoji: "🥩", popular: false, category: "شباتي / صامولي" },
    { id: "ss4", name: "تونه", basePrice: 5, emoji: "🐟", popular: false, category: "شباتي / صامولي" },
    { id: "ss5", name: "شكشوكه", basePrice: 4, emoji: "🍳", popular: false, category: "شباتي / صامولي" },
    { id: "ss6", name: "بيض جبنة", basePrice: 4, emoji: "🍳", popular: false, category: "شباتي / صامولي" },
    { id: "ss7", name: "مقلي - مسلوق ساده", basePrice: 3, emoji: "🍳", popular: false, category: "شباتي / صامولي" },
    { id: "ss8", name: "جبنة سائل", basePrice: 3, emoji: "🧀", popular: false, category: "شباتي / صامولي" },
    { id: "ss9", name: "جبنة مربى", basePrice: 5, emoji: "🧀", popular: false, category: "شباتي / صامولي" },
    { id: "ss10", name: "مشكل طعمية", basePrice: 5, emoji: "🧆", popular: false, category: "شباتي / صامولي" },
    { id: "ss11", name: "طعمية ساده", basePrice: 4, emoji: "🧆", popular: false, category: "شباتي / صامولي" },
    { id: "ss12", name: "شباتي ساده", basePrice: 2, emoji: "🫓", popular: false, category: "شباتي / صامولي" },
  ],
  // شباتي / حالي
  shabatyHali: [
    { id: "sh1", name: "شباتي لبنه", basePrice: 4, emoji: "🫙", popular: true, category: "شباتي / حالي" },
    { id: "sh2", name: "شباتي لبنه عسل", basePrice: 5, emoji: "🍯", popular: false, category: "شباتي / حالي" },
    { id: "sh3", name: "شباتي لبنه زعتر", basePrice: 5, emoji: "🌿", popular: false, category: "شباتي / حالي" },
    { id: "sh4", name: "شباتي نوتيلا", basePrice: 5, emoji: "🍫", popular: true, category: "شباتي / حالي" },
    { id: "sh5", name: "شباتي فول سوداني", basePrice: 5, emoji: "🥜", popular: false, category: "شباتي / حالي" },
    { id: "sh6", name: "شباتي لوتس", basePrice: 6, emoji: "🍪", popular: false, category: "شباتي / حالي" },
    { id: "sh7", name: "شباتي طحينة", basePrice: 4, emoji: "🫙", popular: false, category: "شباتي / حالي" },
    { id: "sh8", name: "شباتي طحينة جبنة", basePrice: 5, emoji: "🧀", popular: false, category: "شباتي / حالي" },
    { id: "sh9", name: "شباتي جبنة عسل", basePrice: 5, emoji: "🍯", popular: false, category: "شباتي / حالي" },
  ],
  // شاورما / برقر
  shawarma: [
    { id: "sw1", name: "شاورما صاروخ", basePrice: 11, emoji: "🌯", popular: true, category: "شاورما / برقر" },
    { id: "sw2", name: "شاورما صغير", basePrice: 6, emoji: "🌯", popular: false, category: "شاورما / برقر" },
    { id: "sw3", name: "شاورما عربي", basePrice: 18, emoji: "🌯", popular: false, category: "شاورما / برقر" },
    { id: "sw4", name: "صحن مسحب", basePrice: 17, emoji: "🍽️", popular: false, category: "شاورما / برقر" },
    { id: "sw5", name: "ساندوتش مسحب", basePrice: 10, emoji: "🥙", popular: false, category: "شاورما / برقر" },
    { id: "sw6", name: "ساندوتش زنجر", basePrice: 12, emoji: "🥙", popular: false, category: "شاورما / برقر" },
    { id: "sw7", name: "برقر دجاج", basePrice: 12, emoji: "🍔", popular: true, category: "شاورما / برقر" },
    { id: "sw8", name: "برقر لحم مدخن", basePrice: 15, emoji: "🍔", popular: false, category: "شاورما / برقر" },
    { id: "sw9", name: "صحن بطاطس", basePrice: 6, emoji: "🍟", popular: false, category: "شاورما / برقر" },
  ],
  // صحون
  soHon: [
    { id: "so1", name: "صحن كبده", basePrice: 12, emoji: "🍽️", popular: false, category: "صحون" },
    { id: "so2", name: "صحن دجاج", basePrice: 12, emoji: "🍽️", popular: false, category: "صحون" },
    { id: "so3", name: "صحن تونه", basePrice: 10, emoji: "🐟", popular: false, category: "صحون" },
    { id: "so4", name: "صحن شكشوكه", basePrice: 8, emoji: "🍳", popular: false, category: "صحون" },
    { id: "so5", name: "صحن قلابة - عدس", basePrice: 6, emoji: "🫘", popular: false, category: "صحون" },
    { id: "so6", name: "صحن تونة بازيلاء", basePrice: 10, emoji: "🐟", popular: false, category: "صحون" },
  ],
  // بوكسات غزالة
  boxes: [
    { id: "bx1", name: "بوكس ساندوتش مشكل", basePrice: 28, emoji: "📦", popular: false, category: "بوكسات غزالة" },
    { id: "bx2", name: "بوكس نواشف", basePrice: 28, emoji: "📦", popular: false, category: "بوكسات غزالة" },
    { id: "bx3", name: "بوكس ساندوتش حالي", basePrice: 28, emoji: "📦", popular: false, category: "بوكسات غزالة" },
    { id: "bx4", name: "بوكس شاورما غزالة", basePrice: 37, emoji: "📦", popular: true, category: "بوكسات غزالة" },
  ],
  extras: [
    { id: "e1", label: "شيبس عمان", priceAdd: 1, emoji: "🥔" },
    { id: "e2", label: "جبنه", priceAdd: 1, emoji: "🧀" },
    { id: "e3", label: "بيض دبل", priceAdd: 1, emoji: "🍳" },
    { id: "e4", label: "علبة ثوم", priceAdd: 2, emoji: "🧄" },
    { id: "e5", label: "علبة كاتشاب", priceAdd: 2, emoji: "🍅" },
  ],
  removals: [
    { id: "r1", label: "بدون بصل" },
    { id: "r2", label: "بدون طماطم" },
    { id: "r3", label: "بدون مخلل" },
    { id: "r4", label: "بدون صوص" },
    { id: "r5", label: "بدون خس" },
    { id: "r6", label: "بدون فلفل" },
  ],
  spice: [
    { id: "sp1", label: "عادي", emoji: "😊" },
    { id: "sp2", label: "حار قليلاً", emoji: "🌶️" },
    { id: "sp3", label: "حار جداً", emoji: "🔥" },
  ],
  // مشروبات باردة
  coldDrinks: [
    { id: "cd1", name: "مـــاء", price: 1, emoji: "💧" },
    { id: "cd2", name: "مشروب غازي", price: 2, emoji: "🥤" },
    { id: "cd3", name: "عصير ربيع", price: 2, emoji: "🧃" },
    { id: "cd4", name: "عصير طازج", price: 10, emoji: "🍊" },
    { id: "cd5", name: "عصير مركز", price: 5, emoji: "🍹" },
  ],
  // مشروبات ساخنة
  hotDrinks: [
    { id: "hd1", name: "شـــاي", price: 2, emoji: "☕" },
    { id: "hd2", name: "شاي كرك", price: 3, emoji: "☕" },
    { id: "hd3", name: "شاي حليب / زنجبيل", price: 3, emoji: "☕" },
    { id: "hd4", name: "شاي أخضر", price: 2, emoji: "🍵" },
    { id: "hd5", name: "نسكافيه", price: 3, emoji: "☕" },
    { id: "hd6", name: "حافظة كرك", price: 25, emoji: "🫖" },
    { id: "hd7", name: "حافظة شاي", price: 22, emoji: "🫖" },
  ],
  // جمع كل المشروبات للاختيار
  get drinks() {
    return [...this.coldDrinks, ...this.hotDrinks];
  },
  // جمع كل الأصناف للقائمة
  get sandwiches() {
    return [...this.shabatySamoli, ...this.shabatyHali, ...this.shawarma, ...this.soHon, ...this.boxes];
  },
};

// ============================================================
// مساعدات
// ============================================================
let orderCounter = Math.floor(1000 + Math.random() * 9000);

const calcItemTotal = (item, menuData) => {
  const m = menuData || INITIAL_MENU;
  const extrasAdd = (item.extras || []).reduce((sum, eid) => {
    return sum + (m.extras.find((e) => e.id === eid)?.priceAdd || 0);
  }, 0);
  const drinkAdd = item.drink ? (m.drinks.find((d) => d.id === item.drink)?.price || 0) : 0;
  return (item.basePrice + extrasAdd + drinkAdd) * item.qty;
};

// ============================================================
// المكون الرئيسي
// ============================================================
export default function App() {
  const [page, setPage] = useState("menu"); // menu | customize | cart | admin
  const [menu, setMenu] = useState(INITIAL_MENU);
  const [config, setConfig] = useState(RESTAURANT_CONFIG);
  const [cart, setCart] = useState([]);
  const [selectedSandwich, setSelectedSandwich] = useState(null);
  const [customizing, setCustomizing] = useState(null);
  const [orderSent, setOrderSent] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [notification, setNotification] = useState(null);

  // إظهار إشعار
  const notify = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 2500);
  };

  // فتح تخصيص سندوتش
  const openCustomize = (sandwich) => {
    setSelectedSandwich(sandwich);
    setCustomizing({
      sandwichId: sandwich.id,
      sandwichName: sandwich.name,
      basePrice: sandwich.basePrice,
      emoji: sandwich.emoji,
      size: "sm",
      bread: "b1",
      extras: [],
      removals: [],
      spice: "sp1",
      drink: null,
      qty: 1,
      notes: "",
    });
    setPage("customize");
  };

  // إضافة للسلة - تاخد البيانات مباشرة عشان ما تقرأ state قديم
  const addToCart = (itemData) => {
    const item = { ...itemData, id: Date.now() };
    setCart((prev) => [...prev, item]);
    notify("✅ تمت الإضافة للسلة");
    setPage("menu");
  };

  // فتح تخصيص مشروب منفرد
  const openDrinkOrder = (drink) => {
    setCustomizing({
      sandwichId: drink.id,
      sandwichName: drink.name,
      basePrice: drink.price,
      emoji: drink.emoji,
      extras: [],
      removals: [],
      spice: "sp1",
      drink: null,
      qty: 1,
      notes: "",
      isDrink: true,
    });
    setPage("customize");
  };

  // حذف من السلة
  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  // تغيير الكمية
  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  // الإجمالي
  const total = cart.reduce((sum, i) => sum + calcItemTotal(i, menu), 0);

  // إرسال واتساب
  const sendOrder = () => {
    orderCounter++;
    const now = new Date();
    const timeStr = now.toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" });
    let msg = `🍽️ *طلب جديد من ${config.name}*\n`;
    msg += `━━━━━━━━━━━━━━━━━\n`;
    msg += `📋 *رقم الطلب:* #${orderCounter}\n`;
    msg += `⏰ *وقت الطلب:* ${timeStr}\n`;
    msg += `━━━━━━━━━━━━━━━━━\n\n`;
    cart.forEach((item, idx) => {
      msg += `${idx + 1}️⃣ *${item.sandwichName}* × ${item.qty}\n`;
      if (!item.isDrink) {
        const spiceLabel = menu.spice.find((s) => s.id === item.spice)?.label;
        if (spiceLabel) msg += `   🌶️ الحدة: ${spiceLabel}\n`;
        if (item.extras && item.extras.length > 0) {
          const extraLabels = item.extras.map((eid) => menu.extras.find((e) => e.id === eid)?.label).filter(Boolean).join('، ');
          if (extraLabels) msg += `   ➕ إضافات: ${extraLabels}\n`;
        }
        if (item.removals && item.removals.length > 0) {
          const remLabels = item.removals.map((rid) => menu.removals.find((r) => r.id === rid)?.label).filter(Boolean).join('، ');
          if (remLabels) msg += `   ➖ محذوفات: ${remLabels}\n`;
        }
        if (item.drink) {
          const drinkName = menu.drinks.find((d) => d.id === item.drink)?.name;
          if (drinkName) msg += `   🥤 مشروب: ${drinkName}\n`;
        }
      }
      if (item.notes) msg += `   📝 ملاحظات: ${item.notes}\n`;
      msg += `   💰 السعر: ${calcItemTotal(item, menu)} ${config.currency}\n\n`;
    });
    msg += `━━━━━━━━━━━━━━━━━\n`;
    msg += `💵 *الإجمالي: ${total} ${config.currency}*\n`;
    msg += `━━━━━━━━━━━━━━━━━`;
    const url = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    setOrderSent(true);
    setTimeout(() => { setOrderSent(false); setCart([]); setPage("menu"); }, 3000);
  };

  // ============================================================
  // واجهات الصفحات
  // ============================================================

  // ---- صفحة القائمة ----
  const MenuPage = () => (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #1a0a00 0%, #2d1200 50%, #1a0a00 100%)" }}>
      {/* الهيدر */}
      <div style={{
        background: "linear-gradient(180deg, #8B0000 0%, #C0392B 100%)",
        padding: "28px 20px 20px",
        textAlign: "center",
        position: "relative",
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)"
      }}>
        <div style={{ fontSize: 52, marginBottom: 4 }}>{config.logo}</div>
        <h1 style={{ color: "#FFD700", fontFamily: "'Cairo', sans-serif", fontSize: 26, fontWeight: 900, margin: 0, textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
          {config.name}
        </h1>
        <p style={{ color: "#FFEAA7", fontFamily: "'Cairo', sans-serif", fontSize: 13, margin: "4px 0 0", opacity: 0.9 }}>
          {config.slogan}
        </p>
        <button onClick={() => setPage("admin")} style={{
          position: "absolute", top: 14, left: 14, background: "rgba(255,255,255,0.15)",
          border: "none", borderRadius: 8, padding: "6px 10px", color: "#fff", fontSize: 11,
          fontFamily: "'Cairo', sans-serif", cursor: "pointer"
        }}>⚙️</button>
        {cart.length > 0 && (
          <button onClick={() => setPage("cart")} style={{
            position: "absolute", top: 14, right: 14,
            background: "#FFD700", border: "none", borderRadius: 20,
            padding: "6px 14px", color: "#1a0a00", fontWeight: 800,
            fontFamily: "'Cairo', sans-serif", fontSize: 13, cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
          }}>
            🛒 {cart.length}
          </button>
        )}
      </div>

      {/* القائمة بالتصنيفات */}
      <div style={{ padding: "20px 16px" }}>
        {[
          { key: "shabatySamoli", title: "🫓 شباتي / صامولي", color: "#8B4513" },
          { key: "shabatyHali", title: "🍯 شباتي / حالي", color: "#8B0045" },
          { key: "shawarma", title: "🌯 شاورما / برقر غزالة", color: "#8B0000" },
          { key: "soHon", title: "🍽️ صحون", color: "#1a3a1a" },
          { key: "boxes", title: "📦 بوكسات غزالة", color: "#1a1a5a" },
        ].map(({ key, title, color }) => (
          <div key={key} style={{ marginBottom: 28 }}>
            <h2 style={{ color: "#FFD700", fontFamily: "'Cairo', sans-serif", fontSize: 17, fontWeight: 800, marginBottom: 12, textAlign: "right", background: `${color}88`, padding: "8px 14px", borderRadius: 10, borderRight: "4px solid #FFD700" }}>
              {title}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {(menu[key] || []).map((s) => (
                <button key={s.id} onClick={() => openCustomize(s)} style={{
                  background: "linear-gradient(135deg, #2d1a00, #3d2200)",
                  border: "1px solid rgba(255,215,0,0.3)",
                  borderRadius: 14, padding: "14px 10px", cursor: "pointer",
                  textAlign: "center", position: "relative",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.4)"
                }}
                  onTouchStart={e => e.currentTarget.style.transform = "scale(0.96)"}
                  onTouchEnd={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  {s.popular && <span style={{
                    position: "absolute", top: 6, right: 6, background: "#FFD700",
                    color: "#1a0a00", fontSize: 8, fontWeight: 800, padding: "2px 5px",
                    borderRadius: 6, fontFamily: "'Cairo', sans-serif"
                  }}>⭐ الأكثر طلباً</span>}
                  <div style={{ fontSize: 32, marginBottom: 4 }}>{s.emoji}</div>
                  <div style={{ color: "#FFE4B5", fontFamily: "'Cairo', sans-serif", fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{s.name}</div>
                  <div style={{ color: "#FFD700", fontFamily: "'Cairo', sans-serif", fontSize: 14, fontWeight: 900 }}>
                    {s.basePrice} {config.currency}
                  </div>
                  <div style={{ marginTop: 8, background: "#C0392B", borderRadius: 8, padding: "5px 0", color: "#fff", fontSize: 11, fontFamily: "'Cairo', sans-serif", fontWeight: 700 }}>
                    + اختر وخصص
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* المشروبات - قابلة للطلب مباشرة */}
        <h2 style={{ color: "#FFD700", fontFamily: "'Cairo', sans-serif", fontSize: 17, fontWeight: 800, marginBottom: 12, textAlign: "right", background: "#0a2a4a88", padding: "8px 14px", borderRadius: 10, borderRight: "4px solid #FFD700" }}>
          ❄️ مشروبات باردة
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 20 }}>
          {menu.coldDrinks.map((d) => (
            <button key={d.id} onClick={() => openDrinkOrder(d)} style={{ background: "linear-gradient(135deg, #0a1628, #0d1f3c)", border: "1px solid rgba(255,215,0,0.2)", borderRadius: 12, padding: "10px 6px", textAlign: "center", cursor: "pointer" }}
              onTouchStart={e => e.currentTarget.style.opacity = "0.7"} onTouchEnd={e => e.currentTarget.style.opacity = "1"}>
              <div style={{ fontSize: 24 }}>{d.emoji}</div>
              <div style={{ color: "#B8D4FF", fontFamily: "'Cairo', sans-serif", fontSize: 11, fontWeight: 600, marginTop: 3 }}>{d.name}</div>
              <div style={{ color: "#FFD700", fontFamily: "'Cairo', sans-serif", fontSize: 12, fontWeight: 800 }}>{d.price} {config.currency}</div>
              <div style={{ marginTop: 5, background: "#1a3a6a", borderRadius: 6, padding: "3px 0", color: "#90c0ff", fontSize: 10, fontFamily: "'Cairo', sans-serif" }}>+ أضف للطلب</div>
            </button>
          ))}
        </div>

        <h2 style={{ color: "#FFD700", fontFamily: "'Cairo', sans-serif", fontSize: 17, fontWeight: 800, marginBottom: 12, textAlign: "right", background: "#3a1a0088", padding: "8px 14px", borderRadius: 10, borderRight: "4px solid #FFD700" }}>
          ☕ مشروبات ساخنة
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 40 }}>
          {menu.hotDrinks.map((d) => (
            <button key={d.id} onClick={() => openDrinkOrder(d)} style={{ background: "linear-gradient(135deg, #2a1000, #3a1800)", border: "1px solid rgba(255,215,0,0.2)", borderRadius: 12, padding: "10px 6px", textAlign: "center", cursor: "pointer" }}
              onTouchStart={e => e.currentTarget.style.opacity = "0.7"} onTouchEnd={e => e.currentTarget.style.opacity = "1"}>
              <div style={{ fontSize: 24 }}>{d.emoji}</div>
              <div style={{ color: "#FFE4B5", fontFamily: "'Cairo', sans-serif", fontSize: 11, fontWeight: 600, marginTop: 3 }}>{d.name}</div>
              <div style={{ color: "#FFD700", fontFamily: "'Cairo', sans-serif", fontSize: 12, fontWeight: 800 }}>{d.price} {config.currency}</div>
              <div style={{ marginTop: 5, background: "#3a1a00", borderRadius: 6, padding: "3px 0", color: "#ffb870", fontSize: 10, fontFamily: "'Cairo', sans-serif" }}>+ أضف للطلب</div>
            </button>
          ))}
        </div>
      </div>

      {/* زر السلة العائم */}
      {cart.length > 0 && (
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 100, width: "calc(100% - 40px)", maxWidth: 400 }}>
          <button onClick={() => setPage("cart")} style={{
            width: "100%", background: "linear-gradient(135deg, #FFD700, #FFA500)",
            border: "none", borderRadius: 16, padding: "16px 24px", color: "#1a0a00",
            fontFamily: "'Cairo', sans-serif", fontSize: 16, fontWeight: 900,
            cursor: "pointer", boxShadow: "0 6px 24px rgba(255,165,0,0.5)",
            display: "flex", justifyContent: "space-between", alignItems: "center"
          }}>
            <span>🛒 عرض السلة ({cart.length})</span>
            <span>{total} {config.currency}</span>
          </button>
        </div>
      )}
    </div>
  );

  // ---- صفحة التخصيص ----
  const CustomizePage = () => {
    const [local, setLocal] = useState(customizing);
    const itemTotal = local ? calcItemTotal(local, menu) : 0;

    const toggle = (field, val) => {
      setLocal((prev) => ({
        ...prev,
        [field]: prev[field].includes(val)
          ? prev[field].filter((v) => v !== val)
          : [...prev[field], val],
      }));
    };

    if (!local) return null;

    const Section = ({ title, children }) => (
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ color: "#FFD700", fontFamily: "'Cairo', sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 10, textAlign: "right", borderRight: "3px solid #C0392B", paddingRight: 10 }}>
          {title}
        </h3>
        {children}
      </div>
    );

    const ChipGroup = ({ options, selected, onSelect, multi = false, colorActive = "#C0392B" }) => (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "flex-end" }}>
        {options.map((o) => {
          const active = multi ? selected.includes(o.id) : selected === o.id;
          return (
            <button key={String(o.id)} onClick={() => multi ? toggle(multi, o.id) : onSelect(o.id)}
              style={{
                background: active ? colorActive : "rgba(255,255,255,0.08)",
                border: `1px solid ${active ? colorActive : "rgba(255,255,255,0.2)"}`,
                borderRadius: 24, padding: "7px 14px", color: active ? "#fff" : "#ddd",
                fontFamily: "'Cairo', sans-serif", fontSize: 12, fontWeight: active ? 700 : 400,
                cursor: "pointer", transition: "all 0.15s"
              }}>
              {o.emoji || ""} {o.label || o.name} {o.priceAdd > 0 ? `+${o.priceAdd}` : o.price > 0 && multi === false ? ` — ${o.price}` : ""}
            </button>
          );
        })}
      </div>
    );

    return (
      <div style={{ minHeight: "100vh", background: "#1a0a00", paddingBottom: 100 }}>
        {/* رأس الصفحة */}
        <div style={{ background: "linear-gradient(180deg, #8B0000, #C0392B)", padding: "18px 16px", display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 10 }}>
          <button onClick={() => setPage("menu")} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 10, padding: "8px 12px", color: "#fff", fontSize: 14, cursor: "pointer" }}>
            ← رجوع
          </button>
          <div style={{ flex: 1, textAlign: "right" }}>
            <div style={{ color: "#FFD700", fontFamily: "'Cairo', sans-serif", fontSize: 18, fontWeight: 800 }}>
              {local.emoji} {local.sandwichName}
            </div>
            <div style={{ color: "#FFEAA7", fontFamily: "'Cairo', sans-serif", fontSize: 12 }}>خصّص طلبك</div>
          </div>
        </div>

        <div style={{ padding: "20px 16px" }}>
          {!local.isDrink && (
            <>
              <Section title="🌶️ درجة الحرارة">
                <ChipGroup options={menu.spice} selected={local.spice} onSelect={(v) => setLocal({ ...local, spice: v })} />
              </Section>

              <Section title="➕ الإضافات">
                <ChipGroup options={menu.extras} selected={local.extras} onSelect={() => {}} multi="extras" colorActive="#2E7D32" />
              </Section>

              <Section title="➖ حذف مكونات">
                <ChipGroup options={menu.removals} selected={local.removals} onSelect={() => {}} multi="removals" colorActive="#B71C1C" />
              </Section>

              <Section title="🥤 أضف مشروب مع الطلب">
                <ChipGroup
                  options={[{ id: null, label: "بدون مشروب", price: 0 }, ...menu.drinks]}
                  selected={local.drink}
                  onSelect={(v) => setLocal({ ...local, drink: v })}
                />
              </Section>
            </>
          )}

          <Section title="📝 ملاحظات خاصة">
            <textarea
              value={local.notes}
              onChange={(e) => setLocal({ ...local, notes: e.target.value })}
              placeholder="مثال: سكر خفيف، بدون ثلج..."
              style={{
                width: "100%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,215,0,0.3)",
                borderRadius: 12, padding: 12, color: "#fff", fontFamily: "'Cairo', sans-serif",
                fontSize: 13, resize: "none", boxSizing: "border-box", direction: "rtl", minHeight: 80
              }}
            />
          </Section>

          <Section title="🔢 الكمية">
            <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "flex-end" }}>
              <button onClick={() => setLocal(prev => ({ ...prev, qty: Math.max(1, prev.qty - 1) }))}
                style={{ width: 40, height: 40, borderRadius: "50%", background: "#C0392B", border: "none", color: "#fff", fontSize: 22, cursor: "pointer", fontWeight: 900 }}>−</button>
              <span style={{ color: "#FFD700", fontFamily: "'Cairo', sans-serif", fontSize: 22, fontWeight: 900, minWidth: 30, textAlign: "center" }}>{local.qty}</span>
              <button onClick={() => setLocal(prev => ({ ...prev, qty: prev.qty + 1 }))}
                style={{ width: 40, height: 40, borderRadius: "50%", background: "#2E7D32", border: "none", color: "#fff", fontSize: 22, cursor: "pointer", fontWeight: 900 }}>+</button>
            </div>
          </Section>
        </div>

        {/* زر الإضافة */}
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "16px", background: "rgba(26,10,0,0.97)", borderTop: "1px solid rgba(255,215,0,0.2)" }}>
          <button onClick={() => addToCart(local)} style={{
            width: "100%", background: "linear-gradient(135deg, #FFD700, #FFA500)",
            border: "none", borderRadius: 14, padding: "16px", color: "#1a0a00",
            fontFamily: "'Cairo', sans-serif", fontSize: 16, fontWeight: 900, cursor: "pointer",
            boxShadow: "0 4px 20px rgba(255,165,0,0.4)"
          }}>
            🛒 أضف للسلة — {calcItemTotal(local, menu)} {config.currency}
          </button>
        </div>
      </div>
    );
  };

  // ---- صفحة السلة ----
  const CartPage = () => (
    <div style={{ minHeight: "100vh", background: "#1a0a00", paddingBottom: 120 }}>
      <div style={{ background: "linear-gradient(180deg, #8B0000, #C0392B)", padding: "18px 16px", display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 10 }}>
        <button onClick={() => setPage("menu")} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 10, padding: "8px 12px", color: "#fff", fontSize: 14, cursor: "pointer" }}>
          ← رجوع
        </button>
        <div style={{ flex: 1, textAlign: "right", color: "#FFD700", fontFamily: "'Cairo', sans-serif", fontSize: 18, fontWeight: 800 }}>
          🛒 سلة الطلبات
        </div>
      </div>

      {cart.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
          <div style={{ color: "#888", fontFamily: "'Cairo', sans-serif", fontSize: 16 }}>السلة فارغة</div>
          <button onClick={() => setPage("menu")} style={{
            marginTop: 20, background: "#C0392B", border: "none", borderRadius: 14,
            padding: "12px 32px", color: "#fff", fontFamily: "'Cairo', sans-serif",
            fontSize: 15, fontWeight: 700, cursor: "pointer"
          }}>ابدأ الطلب</button>
        </div>
      ) : (
        <div style={{ padding: "16px" }}>
          {cart.map((item) => {
            const spiceLabel = menu.spice.find((s) => s.id === item.spice)?.label;
            const drinkName = item.drink ? menu.drinks.find((d) => d.id === item.drink)?.name : null;
            const itemT = calcItemTotal(item, menu);

            return (
              <div key={item.id} style={{
                background: "linear-gradient(135deg, #2d1a00, #3d2200)",
                border: "1px solid rgba(255,215,0,0.2)",
                borderRadius: 16, padding: 16, marginBottom: 12
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <button onClick={() => removeFromCart(item.id)} style={{ background: "rgba(192,57,43,0.3)", border: "none", borderRadius: 8, padding: "4px 10px", color: "#E57373", cursor: "pointer", fontSize: 12, fontFamily: "'Cairo', sans-serif" }}>
                    🗑️ حذف
                  </button>
                  <div style={{ color: "#FFE4B5", fontFamily: "'Cairo', sans-serif", fontSize: 16, fontWeight: 800 }}>
                    {item.emoji} {item.sandwichName}
                  </div>
                </div>
                <div style={{ color: "#aaa", fontFamily: "'Cairo', sans-serif", fontSize: 12, lineHeight: 1.8, textAlign: "right" }}>
                  {!item.isDrink && spiceLabel && <span>🌶️ {spiceLabel}</span>}
                  {!item.isDrink && item.extras && item.extras.length > 0 && <><br />➕ {item.extras.map((eid) => menu.extras.find((e) => e.id === eid)?.label).filter(Boolean).join("، ")}</>}
                  {!item.isDrink && item.removals && item.removals.length > 0 && <><br />➖ {item.removals.map((rid) => menu.removals.find((r) => r.id === rid)?.label).filter(Boolean).join("، ")}</>}
                  {!item.isDrink && drinkName && <><br />🥤 مع: {drinkName}</>}
                  {item.notes && <><br />📝 {item.notes}</>}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                  <div style={{ color: "#FFD700", fontFamily: "'Cairo', sans-serif", fontSize: 16, fontWeight: 900 }}>
                    {itemT} {config.currency}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <button onClick={() => changeQty(item.id, -1)} style={{ width: 34, height: 34, borderRadius: "50%", background: "#C0392B", border: "none", color: "#fff", fontSize: 18, cursor: "pointer" }}>−</button>
                    <span style={{ color: "#fff", fontFamily: "'Cairo', sans-serif", fontSize: 18, fontWeight: 800, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                    <button onClick={() => changeQty(item.id, 1)} style={{ width: 34, height: 34, borderRadius: "50%", background: "#2E7D32", border: "none", color: "#fff", fontSize: 18, cursor: "pointer" }}>+</button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* الإجمالي */}
          <div style={{
            background: "linear-gradient(135deg, #0d1f3c, #0a1628)",
            border: "1px solid rgba(255,215,0,0.4)",
            borderRadius: 16, padding: "16px 20px",
            display: "flex", justifyContent: "space-between", alignItems: "center"
          }}>
            <div style={{ color: "#FFD700", fontFamily: "'Cairo', sans-serif", fontSize: 20, fontWeight: 900 }}>
              {total} {config.currency}
            </div>
            <div style={{ color: "#B8D4FF", fontFamily: "'Cairo', sans-serif", fontSize: 16, fontWeight: 700 }}>
              💰 الإجمالي
            </div>
          </div>
        </div>
      )}

      {/* زر الإرسال */}
      {cart.length > 0 && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "16px", background: "rgba(26,10,0,0.97)", borderTop: "1px solid rgba(255,215,0,0.2)" }}>
          {orderSent ? (
            <div style={{ textAlign: "center", color: "#A5D6A7", fontFamily: "'Cairo', sans-serif", fontSize: 16, fontWeight: 700 }}>
              ✅ تم إرسال الطلب! شكراً لك 🎉
            </div>
          ) : (
            <button onClick={sendOrder} style={{
              width: "100%", background: "linear-gradient(135deg, #25D366, #128C7E)",
              border: "none", borderRadius: 14, padding: "16px", color: "#fff",
              fontFamily: "'Cairo', sans-serif", fontSize: 16, fontWeight: 900, cursor: "pointer",
              boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10
            }}>
              <span style={{ fontSize: 20 }}>📲</span>
              إرسال الطلب عبر واتساب — {total} {config.currency}
            </button>
          )}
        </div>
      )}
    </div>
  );

  // ---- لوحة التحكم ----
  const AdminPage = () => {
    const [tab, setTab] = useState("sandwiches");
    const [editConfig, setEditConfig] = useState({ ...config });
    const [newSandwich, setNewSandwich] = useState({ name: "", basePrice: "", emoji: "🥙" });

    if (!adminUnlocked) {
      return (
        <div style={{ minHeight: "100vh", background: "#1a0a00", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔐</div>
          <h2 style={{ color: "#FFD700", fontFamily: "'Cairo', sans-serif", marginBottom: 20 }}>لوحة التحكم</h2>
          <input type="password" value={adminPass} onChange={e => setAdminPass(e.target.value)}
            placeholder="كلمة المرور"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,215,0,0.4)", borderRadius: 12, padding: "12px 16px", color: "#fff", fontFamily: "'Cairo', sans-serif", fontSize: 15, width: "100%", maxWidth: 300, direction: "rtl", marginBottom: 12, boxSizing: "border-box" }} />
          <button onClick={() => { if (adminPass === "1234") setAdminUnlocked(true); else notify("كلمة مرور خاطئة", "error"); }}
            style={{ background: "#C0392B", border: "none", borderRadius: 14, padding: "12px 32px", color: "#fff", fontFamily: "'Cairo', sans-serif", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
            دخول
          </button>
          <p style={{ color: "#888", fontFamily: "'Cairo', sans-serif", fontSize: 11, marginTop: 12 }}>كلمة المرور الافتراضية: 1234</p>
          <button onClick={() => setPage("menu")} style={{ marginTop: 12, background: "transparent", border: "none", color: "#aaa", fontFamily: "'Cairo', sans-serif", cursor: "pointer" }}>← رجوع للقائمة</button>
        </div>
      );
    }

    return (
      <div style={{ minHeight: "100vh", background: "#1a0a00", paddingBottom: 40 }}>
        <div style={{ background: "linear-gradient(180deg, #1a3a1a, #2d5a2d)", padding: "18px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setPage("menu")} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 10, padding: "8px 12px", color: "#fff", fontSize: 14, cursor: "pointer" }}>← رجوع</button>
          <div style={{ flex: 1, textAlign: "right", color: "#90EE90", fontFamily: "'Cairo', sans-serif", fontSize: 18, fontWeight: 800 }}>⚙️ لوحة التحكم</div>
        </div>

        {/* تبويبات */}
        <div style={{ display: "flex", gap: 0, background: "#0d0500", overflowX: "auto" }}>
          {["sandwiches", "drinks", "settings"].map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: "12px 8px", border: "none", cursor: "pointer",
              background: tab === t ? "#2d5a2d" : "transparent",
              color: tab === t ? "#90EE90" : "#888",
              fontFamily: "'Cairo', sans-serif", fontSize: 12, fontWeight: tab === t ? 700 : 400,
              borderBottom: tab === t ? "2px solid #90EE90" : "2px solid transparent"
            }}>
              {t === "sandwiches" ? "🥙 السندوتشات" : t === "drinks" ? "🥤 المشروبات" : "⚙️ الإعدادات"}
            </button>
          ))}
        </div>

        <div style={{ padding: "16px" }}>
          {tab === "sandwiches" && (
            <>
              <h3 style={{ color: "#90EE90", fontFamily: "'Cairo', sans-serif", textAlign: "right", marginBottom: 12 }}>إدارة الأصناف</h3>
              {[
                { key: "shabatySamoli", label: "شباتي / صامولي" },
                { key: "shabatyHali", label: "شباتي / حالي" },
                { key: "shawarma", label: "شاورما / برقر" },
                { key: "soHon", label: "صحون" },
                { key: "boxes", label: "بوكسات غزالة" },
              ].map(({ key, label }) => (
                <div key={key} style={{ marginBottom: 16 }}>
                  <div style={{ color: "#FFD700", fontFamily: "'Cairo', sans-serif", fontSize: 13, fontWeight: 700, textAlign: "right", marginBottom: 6, borderRight: "3px solid #90EE90", paddingRight: 8 }}>{label}</div>
                  {(menu[key] || []).map((s) => (
                    <div key={s.id} style={{ background: "#2d1a00", border: "1px solid rgba(144,238,144,0.2)", borderRadius: 10, padding: 10, marginBottom: 6, display: "flex", alignItems: "center", gap: 8 }}>
                      <input type="number" value={s.basePrice}
                        onChange={(e) => setMenu((prev) => ({ ...prev, [key]: prev[key].map((x) => x.id === s.id ? { ...x, basePrice: +e.target.value } : x) }))}
                        style={{ width: 55, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "5px 6px", color: "#FFD700", fontFamily: "'Cairo', sans-serif", fontSize: 13, textAlign: "center" }} />
                      <div style={{ flex: 1, color: "#FFE4B5", fontFamily: "'Cairo', sans-serif", fontSize: 13, textAlign: "right" }}>{s.emoji} {s.name}</div>
                    </div>
                  ))}
                </div>
              ))}
            </>
          )}

          {tab === "drinks" && (
            <>
              <h3 style={{ color: "#90EE90", fontFamily: "'Cairo', sans-serif", textAlign: "right", marginBottom: 12 }}>إدارة المشروبات</h3>
              {[
                { key: "coldDrinks", label: "❄️ باردة" },
                { key: "hotDrinks", label: "☕ ساخنة" },
              ].map(({ key, label }) => (
                <div key={key} style={{ marginBottom: 16 }}>
                  <div style={{ color: "#FFD700", fontFamily: "'Cairo', sans-serif", fontSize: 13, fontWeight: 700, textAlign: "right", marginBottom: 6, borderRight: "3px solid #90EE90", paddingRight: 8 }}>{label}</div>
                  {(menu[key] || []).map((d) => (
                    <div key={d.id} style={{ background: "#0d1f3c", border: "1px solid rgba(144,238,144,0.2)", borderRadius: 10, padding: 10, marginBottom: 6, display: "flex", alignItems: "center", gap: 8 }}>
                      <input type="number" value={d.price}
                        onChange={(e) => setMenu((prev) => ({ ...prev, [key]: prev[key].map((x) => x.id === d.id ? { ...x, price: +e.target.value } : x) }))}
                        style={{ width: 55, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "5px 6px", color: "#FFD700", fontFamily: "'Cairo', sans-serif", fontSize: 13, textAlign: "center" }} />
                      <div style={{ flex: 1, color: "#B8D4FF", fontFamily: "'Cairo', sans-serif", fontSize: 13, textAlign: "right" }}>{d.emoji} {d.name}</div>
                    </div>
                  ))}
                </div>
              ))}
            </>
          )}

          {tab === "settings" && (
            <>
              <h3 style={{ color: "#90EE90", fontFamily: "'Cairo', sans-serif", textAlign: "right", marginBottom: 12 }}>إعدادات المطعم</h3>
              {[
                { key: "name", label: "اسم المطعم" },
                { key: "slogan", label: "الشعار" },
                { key: "logo", label: "الإيموجي" },
                { key: "whatsapp", label: "رقم واتساب (مع رمز الدولة)" },
                { key: "currency", label: "العملة" },
              ].map(({ key, label }) => (
                <div key={key} style={{ marginBottom: 12 }}>
                  <label style={{ color: "#888", fontFamily: "'Cairo', sans-serif", fontSize: 12, display: "block", textAlign: "right", marginBottom: 4 }}>{label}</label>
                  <input value={editConfig[key]} onChange={e => setEditConfig({ ...editConfig, [key]: e.target.value })}
                    style={{ width: "100%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, padding: "10px 14px", color: "#fff", fontFamily: "'Cairo', sans-serif", fontSize: 14, direction: "rtl", boxSizing: "border-box" }} />
                </div>
              ))}
              <button onClick={() => { setConfig(editConfig); notify("تم حفظ الإعدادات ✅"); }}
                style={{ width: "100%", background: "#2E7D32", border: "none", borderRadius: 12, padding: "14px", color: "#fff", fontFamily: "'Cairo', sans-serif", fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 8 }}>
                💾 حفظ الإعدادات
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        body { margin: 0; direction: rtl; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,215,0,0.3); border-radius: 4px; }
      `}</style>

      {/* إشعار */}
      {notification && (
        <div style={{
          position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)",
          background: notification.type === "error" ? "#C0392B" : "#2E7D32",
          color: "#fff", fontFamily: "'Cairo', sans-serif", fontSize: 14, fontWeight: 700,
          padding: "10px 24px", borderRadius: 24, zIndex: 9999,
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)", whiteSpace: "nowrap"
        }}>
          {notification.msg}
        </div>
      )}

      {page === "menu" && <MenuPage />}
      {page === "customize" && <CustomizePage />}
      {page === "cart" && <CartPage />}
      {page === "admin" && <AdminPage />}
    </>
  );
}
