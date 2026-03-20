# 📊 Eloquent Case Study – Client Dashboard

This project replicates the reference interface with a focus on:

- Pixel-perfect UI fidelity
- Accurate KPI calculations
- Correct data flow between table and detail view
- Matching **behavior**, not just visuals

The goal is to reverse-engineer and reproduce the reference application as closely as possible, including non-obvious logic and edge cases.

---

## 🌐 Live Demo

👉 https://kingchau-eloquent-takehome2.vercel.app

---

## 📦 Repository

👉 https://github.com/kingchau97/kingchau-eloquent-takehome2  

---

## 🚀 Tech Stack

- React (TypeScript)  
- Vite  
- Tailwind CSS  
- Lucide React  

---

## 🛠️ Getting Started (Run Locally)

### 1. Clone the repository
```bash
git clone https://github.com/kingchau97/kingchau-eloquent-takehome2.git
cd kingchau-eloquent-takehome2
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```

### 4. Open in browser
```
Open the local host link
```

---

## 🏗️ Build for Production

```bash
npm run build
npm run preview
```

---

## 🧠 Key Implementation Details

### 1. Frontend-Only State (No Persistence)

All data is stored in React state:

```ts
const [clients, setClients] = useState(initialClients);
```

- No backend
- No localStorage / sessionStorage

Result:
- All edits are temporary  
- Browser refresh resets data to default  

This matches the reference behavior exactly.

---

### 2. KPI Calculations

#### Total Spend

Dynamically calculated from current state:

```ts
const totalSpent = clients.reduce(
  (sum, client) => sum + client.totalSpent,
  0
);
```

---

### 3. Enterprise Revenue (Reverse-Engineered Behavior)

Enterprise Revenue does **not behave like a typical dynamic KPI**.

Observed behavior from reference:
- Updates when segment changes to "Enterprise"
- Does NOT update when total spend changes
- Resets on refresh

Implementation:

- Uses current segment values from `clients`
- Uses original totalSpent values from `initialClients`

```ts
const enterpriseRevenueTotal = clients.reduce((sum, client) => {
  if (client.segment !== "Enterprise") return sum;

  const originalClient = initialClients.find(
    (item) => item.id === client.id
  );

  return sum + (originalClient?.totalSpent ?? client.totalSpent);
}, 0);

const initialTotalSpent = initialClients.reduce(
  (sum, client) => sum + client.totalSpent,
  0
);

const enterpriseRevenue = initialTotalSpent
  ? ((enterpriseRevenueTotal / initialTotalSpent) * 100).toFixed(1)
  : "0.0";
```


---

### 4. Churn Risk Calculation

Churn Risk represents the number of at-risk clients.

A client is considered at risk if:

- Segment is Enterprise or SME
- Status is Active
- Days since last activity is greater than 60 days

```ts
const churnRisk = clients.filter((client) => {
  const isHighValue =
    client.segment === "Enterprise" || client.segment === "SME";
  const isActive = client.status === "Active";
  const daysSinceLastActive = getDaysSince(client.lastActive);

  return isHighValue && isActive && daysSinceLastActive > 60;
}).length;
```
---

## 🔍 Notes for Reviewers

- Only the **first 5 rows are editable**, as specified in the requirements  
- UI and interactions are designed to closely match the reference implementation  
- Routing is configured to support multi-page navigation  

---

## 🚀 Deployment

This project is deployed using Vercel.

---

## 👤 Author

King Chau  

---
