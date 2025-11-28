<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <title>FAQ / Chatbot | URR School</title>
  <style>
    body { font-family: Arial, sans-serif; background:#f5f6fa; margin:0; padding:0; }
    header { background:linear-gradient(120deg,#ff6fb5,#0d6efd,#20c997); color:white; padding:12px; text-align:center; }
    main { max-width:900px; margin:20px auto; background:white; padding:20px; border-radius:12px; box-shadow:0 2px 8px rgba(0,0,0,0.12); }
    #chatbox { height:400px; overflow-y:auto; border:1px solid #ddd; padding:10px; margin-bottom:12px; background:#fafafa; }
    .msg { margin:6px 0; padding:8px 12px; border-radius:12px; max-width:70%; word-wrap:break-word; white-space:pre-line; }
    .user { background:#0d6efd; color:white; margin-left:auto; }
    .bot { background:#e9f3ff; color:#333; margin-right:auto; }
    #userInput { width:80%; padding:8px; border-radius:8px; border:1px solid #ccc; }
    #sendBtn { padding:8px 14px; border:none; background:#ff2f92; color:white; border-radius:8px; cursor:pointer; }
    #sendBtn:hover { background:#d91f7a; }

    .category-buttons { margin:20px 0; }
    .category-buttons h3 { margin-bottom:8px; font-size:16px; color:#333; }
    .category-buttons button {
      margin:4px;
      padding:6px 12px;
      border:none;
      background:#e9f3ff;
      color:#0d6efd;
      border-radius:999px;
      cursor:pointer;
      font-size:16px;
    }
    .category-buttons button:hover { background:#d0e7ff; }
  </style>
</head>
<body>
<header>
  <h2>🤖 FAQ / Chatbot URR School</h2>
  <p>ถาม–ตอบอัตโนมัติ เกี่ยวกับการสมัครเรียน หลักสูตร และข้อมูลโรงเรียน</p>
</header>

<main>
  <div class="category-buttons">
    <h3>📚 คำถามแนะนำ</h3>
    <button onclick="ask('สนใจเรียน')">สนใจเรียน</button>
    <button onclick="ask('อยากสมัครเรียน')">อยากสมัครเรียน</button>
    <button onclick="ask('หลักสูตร')">หลักสูตร</button>
    <button onclick="ask('ค่าเรียนเท่าไร')">ค่าเรียนเท่าไร</button>
    <button onclick="ask('เรียนกี่เดือน')">เรียนกี่เดือน</button>
    <button onclick="ask('จบแล้วทำงานอะไรได้บ้าง')">จบแล้วทำงานอะไรได้บ้าง</button>
    <button onclick="ask('มีทุนหรือกู้ได้ไหม')">มีทุนหรือกู้ได้ไหม</button>
    <button onclick="ask('เปิดรับสมัครรุ่นใหม่เมื่อไหร่')">เปิดรับสมัครรุ่นใหม่เมื่อไหร่</button>
    <button onclick="ask('ติดต่อใคร')">ติดต่อครูไนช์</button>
  </div>

  <div id="chatbox"></div>
  <input id="userInput" placeholder="พิมพ์คำถามของคุณ...">
  <button id="sendBtn">ส่ง</button>
</main>

<!-- โหลดข้อมูล FAQ จากไฟล์ภายนอก -->
<script src="faq-data.js"></script>

<!-- Fuse.js สำหรับค้นหาข้อความแบบ fuzz -->
<script src="https://cdn.jsdelivr.net/npm/fuse.js/dist/fuse.js"></script>

<script>
  // ---------------------------
  // 1) ตรวจว่า faqData จากไฟล์ภายนอกถูกโหลดหรือไม่
  // ---------------------------
  if (typeof faqData === "undefined") {
    alert("❌ ไม่พบตัวแปร faqData จากไฟล์ faq-data.js\nตรวจชื่อไฟล์หรือ path ให้ถูกต้อง");
  }

  // ---------------------------
  // 2) ตั้งค่า Fuse.js ให้ใช้ key 'q'
  // ---------------------------
  const fuseOptions = {
    keys: ["q"],      // ใน faq-data.js มี q และ a
    threshold: 0.4,
    includeScore: true
  };
  const fuse = new Fuse(faqData, fuseOptions);

  // ---------------------------
  // 3) ฟังก์ชันแชต
  // ---------------------------
  const chatbox = document.getElementById("chatbox");
  const input   = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");

  function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = "msg " + type;
    div.innerText = text;
    chatbox.appendChild(div);
    chatbox.scrollTop = chatbox.scrollHeight;
  }

  function botReply(userText) {
    const text = userText.trim();
    if (!text) return "";

    const result = fuse.search(text);

    if (result.length === 0) {
      return "ยังไม่มีคำตอบตรงกับคำถามนี้ในระบบค่ะ\nลองพิมพ์คำถามสั้น ๆ เช่น \"หลักสูตร\", \"ค่าเรียนเท่าไร\", \"เรียนกี่เดือน\" หรือทักไลน์โรงเรียนสอบถามเจ้าหน้าที่ได้เลยค่ะ 💬";
    }

    return result[0].item.a;
  }

  // ใช้เรียกจากปุ่มคำถามด้านบน
  function ask(text) {
    addMessage(text, "user");
    const reply = botReply(text);
    setTimeout(() => addMessage(reply, "bot"), 300);
  }

  // ให้ปุ่ม onclick มองเห็นฟังก์ชัน ask
  window.ask = ask;

  // ---------------------------
  // 4) ปุ่มส่ง & Enter
  // ---------------------------
  sendBtn.addEventListener("click", () => {
    const text = input.value;
    if (!text.trim()) return;
    addMessage(text, "user");
    input.value = "";
    const reply = botReply(text);
    setTimeout(() => addMessage(reply, "bot"), 300);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      sendBtn.click();
    }
  });

  // ---------------------------
  // 5) ข้อความต้อนรับ
  // ---------------------------
  addMessage(
    "สวัสดีค่ะ 😊 ยินดีต้อนรับสู่ระบบถาม–ตอบ URR School\n" +
    "ลองพิมพ์คำถาม เช่น \"หลักสูตร\", \"ค่าเรียนเท่าไร\", \"เรียนกี่เดือน\", \"จบแล้วทำงานอะไรได้บ้าง\" หรือกดปุ่มด้านบนได้เลยค่ะ",
    "bot"
  );
</script>

</body>
</html>