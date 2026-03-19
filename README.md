# 📊 Eloquent Case Study – Client Dashboard

This project is a full frontend implementation of a client dashboard, built to replicate a reference interface with high visual and functional fidelity.

It includes dynamic KPI calculations, editable client records, and multi-page navigation consistent with the original design.

---

## 🌐 Live Demo

👉 [https://your-project.vercel.app  ](https://kingchau-eloquent-takehome2.vercel.app)

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

## ✨ Features

- 📈 KPI dashboard (revenue, churn risk, etc.)  
- 🧾 Editable detail panel for first 5 clients  
- 🔄 Real-time KPI updates after edits  
- 📅 Date picker for last active field  
- 🔢 Increment/decrement controls for numeric inputs  
- 🚫 Status field is non-editable  
- 📊 Accurate replication of reference UI and behavior  

---

## 🧠 Key Logic

### Churn Risk Calculation
- Applies only to **Enterprise** and **SME** segments  
- Triggered when **Last Active > 60 days**  
- **Inactive clients are excluded** from churn risk  

### KPI Updates
- All KPIs dynamically update after saving changes  
- Changes propagate across dashboard and detail views  

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
