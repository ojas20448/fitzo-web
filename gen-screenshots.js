const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const W = 1080;
const H = 1920;

// Fitzo theme colors
const bg = '#000000';
const surface = 'rgba(255,255,255,0.03)';
const border = 'rgba(255,255,255,0.08)';
const borderLight = 'rgba(255,255,255,0.15)';
const white = '#FFFFFF';
const muted = 'rgba(255,255,255,0.55)';
const secondary = 'rgba(255,255,255,0.7)';
const teal = '#4ECDC4';
const yellow = '#FFE66D';
const coral = '#FF6B6B';
const green = '#22C55E';

// ============ SCREENSHOT 1: HOME SCREEN ============
const homeScreen = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${bg}"/>

  <!-- Status bar -->
  <text x="60" y="65" font-family="Arial" font-size="28" fill="${muted}">9:41</text>
  <text x="960" y="65" font-family="Arial" font-size="24" fill="${muted}">100%</text>

  <!-- Header -->
  <g transform="translate(50, 120)">
    <!-- Avatar -->
    <circle cx="35" cy="35" r="35" fill="${surface}" stroke="${border}" stroke-width="2"/>
    <text x="35" y="42" font-family="Arial" font-size="28" font-weight="bold" fill="${white}" text-anchor="middle">O</text>
    <!-- Greeting -->
    <text x="90" y="25" font-family="Arial" font-size="22" fill="${muted}" letter-spacing="1">CONSISTENCY MATTERS.</text>
    <text x="90" y="58" font-family="Arial" font-size="36" font-weight="bold" fill="${white}">Ojas</text>
    <!-- Streak -->
    <rect x="800" y="8" width="120" height="56" rx="28" fill="${surface}" stroke="${border}" stroke-width="1"/>
    <text x="840" y="44" font-family="Arial" font-size="26" fill="#FF6B35">🔥</text>
    <text x="880" y="44" font-family="Arial" font-size="26" font-weight="bold" fill="${white}">12</text>
  </g>

  <!-- Today's Training -->
  <g transform="translate(50, 240)">
    <text x="0" y="30" font-family="Arial" font-size="30" fill="${secondary}">Today's Training</text>
    <rect x="700" y="8" width="180" height="36" rx="18" fill="${white}"/>
    <text x="790" y="33" font-family="Arial" font-size="18" font-weight="bold" fill="${bg}" text-anchor="middle">TAP TO SET</text>
    <text x="0" y="100" font-family="Arial" font-size="68" font-weight="bold" fill="${white}" letter-spacing="-1">UPPER BODY</text>
    <text x="26" y="135" font-family="Arial" font-size="22" fill="${muted}">Tap to change</text>
  </g>

  <!-- Completed Today Card -->
  <g transform="translate(50, 420)">
    <rect width="980" height="160" rx="28" fill="${surface}" stroke="${border}" stroke-width="1"/>
    <rect x="24" y="20" width="240" height="40" rx="20" fill="rgba(255,255,255,0.05)" stroke="${border}" stroke-width="1"/>
    <text x="60" y="47" font-family="Arial" font-size="18" font-weight="bold" fill="${white}" letter-spacing="2">✓ COMPLETED TODAY</text>
    <text x="40" y="100" font-family="Arial" font-size="18" font-weight="bold" fill="${muted}" letter-spacing="1.5">WORKOUTS</text>
    <text x="40" y="135" font-family="Arial" font-size="42" fill="${white}">2</text>
    <text x="400" y="100" font-family="Arial" font-size="18" font-weight="bold" fill="${muted}" letter-spacing="1.5">CALORIES LOGGED</text>
    <text x="400" y="135" font-family="Arial" font-size="42" fill="${white}">1,847<tspan font-size="22" fill="${muted}">kcal</tspan></text>
  </g>

  <!-- Action Buttons -->
  <g transform="translate(50, 620)">
    <rect width="470" height="100" rx="24" fill="${white}"/>
    <text x="200" y="58" font-family="Arial" font-size="24" font-weight="bold" fill="${bg}" text-anchor="middle">+ LOG WORKOUT</text>
    <rect x="500" width="470" height="100" rx="24" fill="${white}"/>
    <text x="735" y="58" font-family="Arial" font-size="24" font-weight="bold" fill="${bg}" text-anchor="middle">+ LOG CALORIES</text>
  </g>

  <!-- Nutrition Section -->
  <g transform="translate(50, 770)">
    <text x="0" y="30" font-family="Arial" font-size="32" font-weight="bold" fill="${white}">Today's Nutrition</text>
    <text x="840" y="30" font-family="Arial" font-size="20" font-weight="bold" fill="${muted}" letter-spacing="1.5">LOG FOOD</text>

    <!-- Nutrition Card -->
    <rect y="50" width="980" height="260" rx="24" fill="${surface}" stroke="${border}" stroke-width="1"/>

    <!-- Calorie Ring -->
    <circle cx="160" cy="180" r="80" fill="none" stroke="${border}" stroke-width="16"/>
    <circle cx="160" cy="180" r="80" fill="none" stroke="${white}" stroke-width="16" stroke-dasharray="503" stroke-dashoffset="100" stroke-linecap="round" transform="rotate(-90 160 180)"/>
    <text x="160" y="175" font-family="Arial" font-size="40" font-weight="bold" fill="${white}" text-anchor="middle">153</text>
    <text x="160" y="205" font-family="Arial" font-size="18" fill="${muted}" text-anchor="middle">REMAINING</text>

    <!-- Macro Bars -->
    <g transform="translate(300, 90)">
      <!-- Protein -->
      <circle cx="8" cy="8" r="6" fill="${teal}"/>
      <text x="24" y="14" font-family="Arial" font-size="22" fill="${secondary}">Protein</text>
      <rect y="25" width="580" height="10" rx="5" fill="rgba(255,255,255,0.05)"/>
      <rect y="25" width="400" height="10" rx="5" fill="${teal}"/>
      <text x="590" y="36" font-family="Arial" font-size="18" fill="${muted}">120g / 150g</text>

      <!-- Carbs -->
      <circle cx="8" cy="78" r="6" fill="${yellow}"/>
      <text x="24" y="84" font-family="Arial" font-size="22" fill="${secondary}">Carbs</text>
      <rect y="95" width="580" height="10" rx="5" fill="rgba(255,255,255,0.05)"/>
      <rect y="95" width="320" height="10" rx="5" fill="${yellow}"/>
      <text x="590" y="106" font-family="Arial" font-size="18" fill="${muted}">155g / 200g</text>

      <!-- Fat -->
      <circle cx="8" cy="148" r="6" fill="${coral}"/>
      <text x="24" y="154" font-family="Arial" font-size="22" fill="${secondary}">Fat</text>
      <rect y="165" width="580" height="10" rx="5" fill="rgba(255,255,255,0.05)"/>
      <rect y="165" width="440" height="10" rx="5" fill="${coral}"/>
      <text x="590" y="176" font-family="Arial" font-size="18" fill="${muted}">52g / 65g</text>
    </g>
  </g>

  <!-- Weekly Progress -->
  <g transform="translate(50, 1120)">
    <rect width="980" height="200" rx="24" fill="${surface}" stroke="${border}" stroke-width="1"/>
    <text x="30" y="50" font-family="Arial" font-size="28" font-weight="bold" fill="${white}">Weekly Progress</text>
    <text x="30" y="78" font-family="Arial" font-size="22" fill="${secondary}">4 / 5 workouts</text>
    <rect x="750" y="28" width="140" height="36" rx="8" fill="rgba(78,205,196,0.2)" stroke="${teal}" stroke-width="1"/>
    <text x="820" y="52" font-family="Arial" font-size="18" font-weight="bold" fill="${teal}" text-anchor="middle">GOAL HIT!</text>

    <!-- Day circles -->
    <g transform="translate(80, 120)">
      ${['M','T','W','T','F','S','S'].map((d, i) => {
        const active = i < 4;
        const isToday = i === 3;
        const cx = i * 125;
        return `
          <circle cx="${cx}" cy="0" r="28" fill="${active ? white : 'transparent'}" stroke="${active ? white : isToday ? muted : border}" stroke-width="${isToday && !active ? 2 : 1}"/>
          ${active ? `<text x="${cx}" y="8" font-family="Arial" font-size="22" font-weight="bold" fill="${bg}" text-anchor="middle">✓</text>` : ''}
          <text x="${cx}" y="55" font-family="Arial" font-size="20" fill="${isToday ? white : muted}" text-anchor="middle" font-weight="${isToday ? 'bold' : 'normal'}">${d}</text>
        `;
      }).join('')}
    </g>
  </g>

  <!-- Gym Buddies -->
  <g transform="translate(50, 1370)">
    <text x="0" y="30" font-family="Arial" font-size="32" font-weight="bold" fill="${white}">Gym Buddies</text>
    <text x="0" y="60" font-family="Arial" font-size="22" fill="${muted}">3 of your gym squads worked out today</text>

    <g transform="translate(0, 90)">
      ${['Raj', 'Priya', 'Amit', 'Neha', 'Vikram'].map((name, i) => `
        <g transform="translate(${i * 140}, 0)">
          <circle cx="45" cy="40" r="40" fill="${surface}" stroke="${border}" stroke-width="1.5"/>
          <text x="45" y="48" font-family="Arial" font-size="28" font-weight="bold" fill="${white}" text-anchor="middle">${name[0]}</text>
          <text x="45" y="100" font-family="Arial" font-size="18" font-weight="bold" fill="${secondary}" text-anchor="middle">${name}</text>
        </g>
      `).join('')}
    </g>
  </g>

  <!-- Tab Bar -->
  <rect y="1780" width="${W}" height="140" fill="#0A0A0A"/>
  <rect y="1780" width="${W}" height="1" fill="${border}"/>
  <g transform="translate(0, 1810)">
    ${[
      {icon: '⌂', label: 'Home', active: true},
      {icon: '👥', label: 'Buddies', active: false},
      {icon: '+', label: '', active: false, isCenter: true},
      {icon: '📖', label: 'Learn', active: false},
      {icon: '👤', label: 'Profile', active: false},
    ].map((tab, i) => {
      const x = i * 216 + 108;
      if (tab.isCenter) return `
        <circle cx="${x}" cy="5" r="40" fill="${white}"/>
        <text x="${x}" y="18" font-family="Arial" font-size="44" font-weight="bold" fill="${bg}" text-anchor="middle">+</text>
      `;
      return `
        <text x="${x}" y="15" font-family="Arial" font-size="32" text-anchor="middle" fill="${tab.active ? white : muted}">${tab.icon}</text>
        <text x="${x}" y="50" font-family="Arial" font-size="16" text-anchor="middle" fill="${tab.active ? white : muted}">${tab.label}</text>
      `;
    }).join('')}
  </g>
</svg>`;

// ============ SCREENSHOT 2: LEARN SCREEN ============
const learnScreen = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${bg}"/>

  <!-- Status bar -->
  <text x="60" y="65" font-family="Arial" font-size="28" fill="${muted}">9:41</text>

  <!-- Header -->
  <g transform="translate(50, 120)">
    <text x="0" y="35" font-family="Arial" font-size="36" fill="${white}" letter-spacing="2">LEARN</text>
    <text x="155" y="35" font-family="Arial" font-size="18" fill="${muted}" letter-spacing="2">PATH</text>
    <rect x="800" y="4" width="130" height="44" rx="22" fill="${surface}" stroke="${border}" stroke-width="1"/>
    <text x="840" y="32" font-family="Arial" font-size="22" fill="${white}">◆ 450</text>
  </g>

  <!-- Overall Progress -->
  <g transform="translate(50, 200)">
    <rect width="980" height="80" rx="24" fill="${surface}" stroke="${border}" stroke-width="1"/>
    <text x="30" y="45" font-family="Arial" font-size="24" fill="${secondary}">5/12 Lessons</text>
    <text x="900" y="45" font-family="Arial" font-size="24" font-weight="bold" fill="${white}">42%</text>
    <rect x="30" y="58" width="920" height="8" rx="4" fill="${border}"/>
    <rect x="30" y="58" width="386" height="8" rx="4" fill="${white}"/>
  </g>

  <!-- Unit 1 -->
  <g transform="translate(50, 320)">
    <rect width="120" height="32" rx="16" fill="${surface}" stroke="${border}" stroke-width="1"/>
    <text x="60" y="22" font-family="Arial" font-size="16" fill="${muted}" text-anchor="middle" letter-spacing="1.5">UNIT 1</text>
    <text x="0" y="75" font-family="Arial" font-size="42" font-weight="bold" fill="${white}">Nutrition Basics</text>
  </g>

  <!-- Timeline lessons -->
  ${[
    {title: 'Understanding Macros', desc: 'Learn about protein, carbs, and fats', completed: true, score: 95},
    {title: 'Calorie Counting 101', desc: 'How to accurately track your intake', completed: true, score: 88},
    {title: 'Meal Timing Myths', desc: 'What science says about when to eat', completed: true, score: 92},
    {title: 'Protein Requirements', desc: 'How much do you really need?', active: true},
    {title: 'Supplements Guide', desc: 'Evidence-based supplement advice', locked: true},
  ].map((lesson, i) => {
    const y = 440 + i * 220;
    const isLast = i === 4;
    return `
    <g transform="translate(70, ${y})">
      <!-- Indicator -->
      <circle cx="20" cy="20" r="22" fill="${lesson.completed ? white : lesson.active ? white : 'transparent'}" stroke="${lesson.completed ? white : lesson.active ? white : border}" stroke-width="2" ${lesson.locked ? 'stroke-dasharray="4 4"' : ''}/>
      ${lesson.completed ? `<text x="20" y="28" font-family="Arial" font-size="22" font-weight="bold" fill="${bg}" text-anchor="middle">✓</text>` :
        lesson.active ? `<text x="20" y="28" font-family="Arial" font-size="22" fill="${bg}" text-anchor="middle">▶</text>` :
        `<text x="20" y="26" font-family="Arial" font-size="16" fill="${muted}" text-anchor="middle">🔒</text>`}

      <!-- Line -->
      ${!isLast ? `<rect x="18" y="46" width="4" height="170" fill="${lesson.completed ? white : border}" ${lesson.locked ? 'opacity="0.5"' : ''}/>` : ''}

      <!-- Card -->
      <rect x="70" y="-20" width="860" height="180" rx="20" fill="${surface}" stroke="${lesson.active ? borderLight : border}" stroke-width="1" ${lesson.locked ? 'opacity="0.6"' : ''}/>
      <text x="100" y="20" font-family="Arial" font-size="28" font-weight="bold" fill="${lesson.locked ? muted : white}">${lesson.title}</text>
      ${lesson.active ? `<rect x="650" y="-4" width="120" height="30" rx="15" fill="${white}"><text/></rect><text x="710" y="18" font-family="Arial" font-size="14" font-weight="bold" fill="${bg}" text-anchor="middle">CURRENT</text>` : ''}
      <text x="100" y="55" font-family="Arial" font-size="22" fill="${lesson.locked ? 'rgba(255,255,255,0.3)' : muted}">${lesson.desc}</text>
      <text x="120" y="100" font-family="Arial" font-size="20" fill="${lesson.locked ? 'rgba(255,255,255,0.3)' : white}">📖 5 questions</text>
      ${lesson.completed && lesson.score ? `<text x="700" y="100" font-family="Arial" font-size="20" fill="${green}">✓ ${lesson.score}%</text>` : ''}
      ${lesson.completed && !lesson.score ? `<text x="700" y="100" font-family="Arial" font-size="20" fill="${green}">Completed</text>` : ''}
    </g>`;
  }).join('')}

  <!-- Tab Bar -->
  <rect y="1780" width="${W}" height="140" fill="#0A0A0A"/>
  <rect y="1780" width="${W}" height="1" fill="${border}"/>
  <g transform="translate(0, 1810)">
    ${[
      {icon: '⌂', label: 'Home', active: false},
      {icon: '👥', label: 'Buddies', active: false},
      {icon: '+', label: '', active: false, isCenter: true},
      {icon: '📖', label: 'Learn', active: true},
      {icon: '👤', label: 'Profile', active: false},
    ].map((tab, i) => {
      const x = i * 216 + 108;
      if (tab.isCenter) return `
        <circle cx="${x}" cy="5" r="40" fill="${white}"/>
        <text x="${x}" y="18" font-family="Arial" font-size="44" font-weight="bold" fill="${bg}" text-anchor="middle">+</text>
      `;
      return `
        <text x="${x}" y="15" font-family="Arial" font-size="32" text-anchor="middle" fill="${tab.active ? white : muted}">${tab.icon}</text>
        <text x="${x}" y="50" font-family="Arial" font-size="16" text-anchor="middle" fill="${tab.active ? white : muted}">${tab.label}</text>
      `;
    }).join('')}
  </g>
</svg>`;

// ============ SCREENSHOT 3: PROFILE SCREEN ============
const profileScreen = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${bg}"/>

  <!-- Status bar -->
  <text x="60" y="65" font-family="Arial" font-size="28" fill="${muted}">9:41</text>

  <!-- Header -->
  <g transform="translate(50, 120)">
    <text x="0" y="35" font-family="Arial" font-size="36" fill="${white}" letter-spacing="2">PROFILE</text>
    <text x="210" y="35" font-family="Arial" font-size="18" fill="${muted}" letter-spacing="2">YOU</text>
    <rect x="870" y="0" width="60" height="50" rx="25" fill="${surface}" stroke="${border}" stroke-width="1"/>
    <text x="900" y="32" font-family="Arial" font-size="24" fill="${white}" text-anchor="middle">✎</text>
  </g>

  <!-- Avatar & Name -->
  <g transform="translate(0, 220)">
    <circle cx="540" cy="80" r="75" fill="${surface}" stroke="${border}" stroke-width="2"/>
    <text x="540" y="95" font-family="Arial" font-size="52" font-weight="bold" fill="${white}" text-anchor="middle">O</text>
    <text x="540" y="200" font-family="Arial" font-size="42" font-weight="bold" fill="${white}" text-anchor="middle">Ojas Narang</text>

    <!-- Badges -->
    <g transform="translate(280, 230)">
      <rect width="200" height="44" rx="22" fill="${surface}" stroke="${border}" stroke-width="1"/>
      <text x="100" y="30" font-family="Arial" font-size="22" font-weight="bold" fill="${secondary}" text-anchor="middle">🔥 12 Day Streak</text>
      <rect x="220" width="220" height="44" rx="22" fill="${surface}" stroke="${border}" stroke-width="1"/>
      <text x="330" y="30" font-family="Arial" font-size="22" font-weight="bold" fill="${secondary}" text-anchor="middle">🏢 FitZone Gym</text>
    </g>
  </g>

  <!-- Activity Calendar (simplified) -->
  <g transform="translate(50, 540)">
    <text x="0" y="20" font-family="Arial" font-size="20" fill="rgba(255,255,255,0.45)" letter-spacing="2">ACTIVITY HISTORY</text>
    <rect y="40" width="980" height="280" rx="20" fill="${surface}" stroke="${border}" stroke-width="1"/>
    <text x="40" y="80" font-family="Arial" font-size="24" font-weight="bold" fill="${white}">March 2026</text>

    <!-- Calendar grid -->
    <g transform="translate(40, 100)">
      ${['S','M','T','W','T','F','S'].map((d, i) =>
        `<text x="${i * 130 + 20}" y="20" font-family="Arial" font-size="18" fill="${muted}" text-anchor="middle">${d}</text>`
      ).join('')}
      ${Array.from({length: 28}, (_, i) => {
        const row = Math.floor(i / 7);
        const col = i % 7;
        const hasWorkout = [0,1,3,4,7,8,10,11,14,15,17,18,21,22,24,25].includes(i);
        const hasFood = [0,1,2,3,4,5,7,8,9,10,11,14,15,16,17,18,21,22,23,24,25].includes(i);
        return `<rect x="${col * 130}" y="${row * 38 + 35}" width="36" height="36" rx="6" fill="${hasWorkout ? white : hasFood ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.03)'}" opacity="${hasWorkout ? '1' : '0.8'}"/>`;
      }).join('')}
    </g>
  </g>

  <!-- Health & Biometrics -->
  <g transform="translate(50, 880)">
    <text x="0" y="20" font-family="Arial" font-size="20" fill="rgba(255,255,255,0.45)" letter-spacing="2">HEALTH &amp; BIOMETRICS</text>
    <rect y="40" width="980" height="320" rx="20" fill="${surface}" stroke="${border}" stroke-width="1"/>

    <!-- Stats row -->
    <g transform="translate(0, 70)">
      <text x="160" y="30" font-family="Arial" font-size="36" font-weight="bold" fill="${white}" text-anchor="middle">22.4</text>
      <text x="160" y="55" font-family="Arial" font-size="14" font-weight="bold" fill="${muted}" text-anchor="middle">BMI</text>
      <rect x="326" y="5" width="1" height="50" fill="${border}"/>
      <text x="490" y="30" font-family="Arial" font-size="36" font-weight="bold" fill="${white}" text-anchor="middle">2,100</text>
      <text x="490" y="55" font-family="Arial" font-size="14" font-weight="bold" fill="${muted}" text-anchor="middle">MAINTENANCE</text>
      <rect x="653" y="5" width="1" height="50" fill="${border}"/>
      <text x="820" y="30" font-family="Arial" font-size="36" font-weight="bold" fill="${white}" text-anchor="middle">72<tspan font-size="18" fill="${muted}">kg</tspan></text>
      <text x="820" y="55" font-family="Arial" font-size="14" font-weight="bold" fill="${muted}" text-anchor="middle">WEIGHT</text>
    </g>

    <rect x="56" y="140" width="868" height="1" fill="${border}"/>

    <!-- Menu items -->
    ${['Calculator & Goal Settings', 'Body Measurements', 'Health Report'].map((item, i) => `
      <g transform="translate(60, ${165 + i * 55})">
        <text x="40" y="30" font-family="Arial" font-size="26" fill="${white}">${item}</text>
        <text x="900" y="30" font-family="Arial" font-size="26" fill="${muted}">›</text>
      </g>
      ${i < 2 ? `<rect x="100" y="${220 + i * 55}" width="824" height="1" fill="${border}"/>` : ''}
    `).join('')}
  </g>

  <!-- Account Section -->
  <g transform="translate(50, 1260)">
    <text x="0" y="30" font-family="Arial" font-size="28" font-weight="bold" fill="${white}">Account</text>
    <rect y="50" width="980" height="220" rx="20" fill="${surface}" stroke="${border}" stroke-width="1"/>
    ${['Notifications', 'Privacy & Security', 'Help & Support'].map((item, i) => `
      <g transform="translate(60, ${75 + i * 60})">
        <text x="40" y="30" font-family="Arial" font-size="26" fill="${white}">${item}</text>
        <text x="900" y="30" font-family="Arial" font-size="26" fill="${muted}">›</text>
      </g>
      ${i < 2 ? `<rect x="100" y="${130 + i * 60}" width="824" height="1" fill="${border}"/>` : ''}
    `).join('')}
  </g>

  <!-- Logout -->
  <g transform="translate(50, 1550)">
    <rect width="980" height="70" rx="35" fill="transparent" stroke="${borderLight}" stroke-width="1.5"/>
    <text x="490" y="45" font-family="Arial" font-size="26" font-weight="bold" fill="${white}" text-anchor="middle">Log Out</text>
  </g>

  <!-- Tab Bar -->
  <rect y="1780" width="${W}" height="140" fill="#0A0A0A"/>
  <rect y="1780" width="${W}" height="1" fill="${border}"/>
  <g transform="translate(0, 1810)">
    ${[
      {icon: '⌂', label: 'Home', active: false},
      {icon: '👥', label: 'Buddies', active: false},
      {icon: '+', label: '', active: false, isCenter: true},
      {icon: '📖', label: 'Learn', active: false},
      {icon: '👤', label: 'Profile', active: true},
    ].map((tab, i) => {
      const x = i * 216 + 108;
      if (tab.isCenter) return `
        <circle cx="${x}" cy="5" r="40" fill="${white}"/>
        <text x="${x}" y="18" font-family="Arial" font-size="44" font-weight="bold" fill="${bg}" text-anchor="middle">+</text>
      `;
      return `
        <text x="${x}" y="15" font-family="Arial" font-size="32" text-anchor="middle" fill="${tab.active ? white : muted}">${tab.icon}</text>
        <text x="${x}" y="50" font-family="Arial" font-size="16" text-anchor="middle" fill="${tab.active ? white : muted}">${tab.label}</text>
      `;
    }).join('')}
  </g>
</svg>`;

async function generate() {
  const dir = path.join('C:/Users/PC/Documents/Code/Fitzo/mobile/screenshots');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  const screens = [
    { name: 'home', svg: homeScreen },
    { name: 'learn', svg: learnScreen },
    { name: 'profile', svg: profileScreen },
  ];

  for (const screen of screens) {
    await sharp(Buffer.from(screen.svg))
      .resize(1080, 1920)
      .png()
      .toFile(path.join(dir, `${screen.name}.png`));
    console.log(`Done: screenshots/${screen.name}.png`);
  }

  // Cleanup
  fs.unlinkSync(__filename);
}

generate().catch(console.error);
