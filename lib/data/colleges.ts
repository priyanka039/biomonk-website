// AUTO-GENERATED from the original neet-predictor.html reference.
// 2023-2024 MCC/state counselling closing-rank data (indicative, not a guarantee).

export type Category = "UR" | "OBC" | "SC" | "ST" | "EWS" | "PH";

export interface College {
  name: string;
  state: string;
  type: "AIIMS" | "Central" | "Government" | "Deemed" | "Private";
  quota: string;
  seats: number;
  fees: string;
  cutoff: Record<Category, number>;
}

export const COLLEGES: College[] = [
  // ── AIIMS ──
  { name: "AIIMS New Delhi", state: "DL", type: "AIIMS", quota: "AIQ", seats: 107, fees: "~₹1,628/yr", cutoff: { UR: 50, OBC: 200, SC: 400, ST: 800, EWS: 150, PH: 2000 } },
  { name: "AIIMS Jodhpur", state: "RJ", type: "AIIMS", quota: "AIQ", seats: 100, fees: "~₹1,628/yr", cutoff: { UR: 500, OBC: 1000, SC: 2500, ST: 4000, EWS: 800, PH: 5000 } },
  { name: "AIIMS Bhopal", state: "MP", type: "AIIMS", quota: "AIQ", seats: 100, fees: "~₹1,628/yr", cutoff: { UR: 600, OBC: 1200, SC: 3000, ST: 5000, EWS: 900, PH: 6000 } },
  { name: "AIIMS Rishikesh", state: "UK", type: "AIIMS", quota: "AIQ", seats: 100, fees: "~₹1,628/yr", cutoff: { UR: 700, OBC: 1500, SC: 3500, ST: 6000, EWS: 1100, PH: 7000 } },
  { name: "AIIMS Patna", state: "BR", type: "AIIMS", quota: "AIQ", seats: 100, fees: "~₹1,628/yr", cutoff: { UR: 900, OBC: 2000, SC: 4000, ST: 7000, EWS: 1500, PH: 8000 } },
  { name: "AIIMS Raipur", state: "CG", type: "AIIMS", quota: "AIQ", seats: 100, fees: "~₹1,628/yr", cutoff: { UR: 1000, OBC: 2200, SC: 4500, ST: 7500, EWS: 1600, PH: 9000 } },
  { name: "AIIMS Nagpur", state: "MH", type: "AIIMS", quota: "AIQ", seats: 100, fees: "~₹1,628/yr", cutoff: { UR: 1100, OBC: 2400, SC: 5000, ST: 8000, EWS: 1800, PH: 10000 } },
  { name: "AIIMS Bhubaneswar", state: "OD", type: "AIIMS", quota: "AIQ", seats: 100, fees: "~₹1,628/yr", cutoff: { UR: 1200, OBC: 2600, SC: 5500, ST: 8500, EWS: 2000, PH: 11000 } },
  { name: "AIIMS Gorakhpur", state: "UP", type: "AIIMS", quota: "AIQ", seats: 100, fees: "~₹1,628/yr", cutoff: { UR: 1400, OBC: 3000, SC: 6000, ST: 9000, EWS: 2200, PH: 12000 } },
  { name: "AIIMS Mangalagiri (AP)", state: "AP", type: "AIIMS", quota: "AIQ", seats: 100, fees: "~₹1,628/yr", cutoff: { UR: 1600, OBC: 3500, SC: 6500, ST: 10000, EWS: 2500, PH: 13000 } },
  { name: "AIIMS Bibinagar (Telangana)", state: "TG", type: "AIIMS", quota: "AIQ", seats: 100, fees: "~₹1,628/yr", cutoff: { UR: 1800, OBC: 4000, SC: 7000, ST: 11000, EWS: 3000, PH: 14000 } },
  { name: "AIIMS Rajkot", state: "GJ", type: "AIIMS", quota: "AIQ", seats: 100, fees: "~₹1,628/yr", cutoff: { UR: 2000, OBC: 4500, SC: 7500, ST: 12000, EWS: 3200, PH: 15000 } },
  { name: "AIIMS Kalyani (WB)", state: "WB", type: "AIIMS", quota: "AIQ", seats: 100, fees: "~₹1,628/yr", cutoff: { UR: 2200, OBC: 5000, SC: 8000, ST: 13000, EWS: 3500, PH: 16000 } },

  // ── JIPMER / Central Institutes ──
  { name: "JIPMER Puducherry", state: "TN", type: "Central", quota: "AIQ", seats: 150, fees: "~₹5,000/yr", cutoff: { UR: 800, OBC: 1800, SC: 4000, ST: 8000, EWS: 1200, PH: 9000 } },
  { name: "JIPMER Karaikal", state: "TN", type: "Central", quota: "AIQ", seats: 100, fees: "~₹5,000/yr", cutoff: { UR: 3000, OBC: 7000, SC: 15000, ST: 25000, EWS: 5000, PH: 30000 } },
  { name: "VMMC & Safdarjung Hospital, Delhi", state: "DL", type: "Central", quota: "AIQ", seats: 150, fees: "~₹3,000/yr", cutoff: { UR: 300, OBC: 600, SC: 1800, ST: 3500, EWS: 500, PH: 4000 } },
  { name: "Lady Hardinge Medical College, Delhi", state: "DL", type: "Central", quota: "AIQ", seats: 200, fees: "~₹3,000/yr", cutoff: { UR: 800, OBC: 1600, SC: 4000, ST: 7000, EWS: 1200, PH: 8000 } },
  { name: "Maulana Azad Medical College, Delhi", state: "DL", type: "Government", quota: "AIQ+State", seats: 250, fees: "~₹3,000/yr", cutoff: { UR: 400, OBC: 900, SC: 2200, ST: 4500, EWS: 700, PH: 5000 } },
  { name: "University College of Medical Sciences, Delhi", state: "DL", type: "Government", quota: "AIQ+State", seats: 150, fees: "~₹3,000/yr", cutoff: { UR: 700, OBC: 1500, SC: 3500, ST: 6000, EWS: 1100, PH: 7000 } },
  { name: "BHU (IMS), Varanasi", state: "UP", type: "Central", quota: "AIQ", seats: 100, fees: "~₹15,000/yr", cutoff: { UR: 1000, OBC: 2500, SC: 6000, ST: 10000, EWS: 1600, PH: 12000 } },
  { name: "AMU (Jawaharlal Nehru MC), Aligarh", state: "UP", type: "Central", quota: "AIQ", seats: 100, fees: "~₹15,000/yr", cutoff: { UR: 5000, OBC: 10000, SC: 20000, ST: 35000, EWS: 8000, PH: 40000 } },

  // ── TOP GOVT — AIQ 15% ──
  { name: "Grant Medical College, Mumbai", state: "MH", type: "Government", quota: "AIQ", seats: 250, fees: "~₹30,000/yr", cutoff: { UR: 1500, OBC: 3000, SC: 7000, ST: 12000, EWS: 2500, PH: 14000 } },
  { name: "Seth GS Medical College, Mumbai", state: "MH", type: "Government", quota: "AIQ", seats: 200, fees: "~₹30,000/yr", cutoff: { UR: 1200, OBC: 2600, SC: 6000, ST: 10000, EWS: 2000, PH: 12000 } },
  { name: "Madras Medical College, Chennai", state: "TN", type: "Government", quota: "AIQ", seats: 250, fees: "~₹15,000/yr", cutoff: { UR: 2000, OBC: 4500, SC: 10000, ST: 18000, EWS: 3500, PH: 20000 } },
  { name: "Stanley Medical College, Chennai", state: "TN", type: "Government", quota: "AIQ", seats: 200, fees: "~₹15,000/yr", cutoff: { UR: 4000, OBC: 8000, SC: 18000, ST: 30000, EWS: 6000, PH: 35000 } },
  { name: "Kilpauk Medical College, Chennai", state: "TN", type: "Government", quota: "AIQ", seats: 200, fees: "~₹15,000/yr", cutoff: { UR: 5000, OBC: 10000, SC: 22000, ST: 35000, EWS: 8000, PH: 40000 } },
  { name: "Osmania Medical College, Hyderabad", state: "TG", type: "Government", quota: "AIQ", seats: 200, fees: "~₹20,000/yr", cutoff: { UR: 3000, OBC: 6500, SC: 15000, ST: 25000, EWS: 5000, PH: 28000 } },
  { name: "Gandhi Medical College, Hyderabad", state: "TG", type: "Government", quota: "AIQ", seats: 200, fees: "~₹20,000/yr", cutoff: { UR: 4500, OBC: 9000, SC: 20000, ST: 32000, EWS: 7500, PH: 35000 } },
  { name: "Bangalore Medical College (BMCRI)", state: "KA", type: "Government", quota: "AIQ", seats: 250, fees: "~₹25,000/yr", cutoff: { UR: 2500, OBC: 5500, SC: 12000, ST: 20000, EWS: 4000, PH: 22000 } },
  { name: "Mysore Medical College (MMC&RI)", state: "KA", type: "Government", quota: "AIQ", seats: 200, fees: "~₹25,000/yr", cutoff: { UR: 5000, OBC: 10000, SC: 22000, ST: 35000, EWS: 8000, PH: 40000 } },
  { name: "SMS Medical College, Jaipur", state: "RJ", type: "Government", quota: "AIQ", seats: 250, fees: "~₹15,000/yr", cutoff: { UR: 2000, OBC: 4500, SC: 10000, ST: 18000, EWS: 3200, PH: 20000 } },
  { name: "RNT Medical College, Udaipur", state: "RJ", type: "Government", quota: "AIQ", seats: 200, fees: "~₹15,000/yr", cutoff: { UR: 4000, OBC: 8000, SC: 18000, ST: 30000, EWS: 6500, PH: 33000 } },
  { name: "SN Medical College, Jodhpur", state: "RJ", type: "Government", quota: "AIQ", seats: 200, fees: "~₹15,000/yr", cutoff: { UR: 5000, OBC: 10000, SC: 22000, ST: 36000, EWS: 8000, PH: 40000 } },
  { name: "KGMU (King George's), Lucknow", state: "UP", type: "Government", quota: "AIQ", seats: 250, fees: "~₹20,000/yr", cutoff: { UR: 1000, OBC: 2200, SC: 5500, ST: 9000, EWS: 1600, PH: 11000 } },
  { name: "GSVM Medical College, Kanpur", state: "UP", type: "Government", quota: "AIQ", seats: 200, fees: "~₹15,000/yr", cutoff: { UR: 4000, OBC: 8000, SC: 18000, ST: 30000, EWS: 6500, PH: 33000 } },
  { name: "MLB Medical College, Jhansi", state: "UP", type: "Government", quota: "AIQ", seats: 150, fees: "~₹15,000/yr", cutoff: { UR: 7000, OBC: 14000, SC: 30000, ST: 50000, EWS: 11000, PH: 55000 } },
  { name: "Patna Medical College (PMCH)", state: "BR", type: "Government", quota: "AIQ", seats: 200, fees: "~₹10,000/yr", cutoff: { UR: 6000, OBC: 12000, SC: 26000, ST: 42000, EWS: 9500, PH: 46000 } },
  { name: "Darbhanga Medical College (DMCH)", state: "BR", type: "Government", quota: "AIQ", seats: 150, fees: "~₹10,000/yr", cutoff: { UR: 8000, OBC: 16000, SC: 35000, ST: 56000, EWS: 13000, PH: 60000 } },
  { name: "SCB Medical College, Cuttack", state: "OD", type: "Government", quota: "AIQ", seats: 200, fees: "~₹10,000/yr", cutoff: { UR: 5000, OBC: 10000, SC: 22000, ST: 35000, EWS: 8000, PH: 38000 } },
  { name: "VIMSAR, Burla (Odisha)", state: "OD", type: "Government", quota: "AIQ", seats: 150, fees: "~₹10,000/yr", cutoff: { UR: 7000, OBC: 14000, SC: 30000, ST: 48000, EWS: 11000, PH: 52000 } },
  { name: "Amrita School of Medicine, Kochi", state: "KL", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹18L/yr", cutoff: { UR: 5000, OBC: 5000, SC: 5000, ST: 5000, EWS: 5000, PH: 5000 } },
  { name: "Trivandrum Medical College (Govt)", state: "KL", type: "Government", quota: "AIQ", seats: 200, fees: "~₹10,000/yr", cutoff: { UR: 3000, OBC: 6500, SC: 14000, ST: 23000, EWS: 5000, PH: 25000 } },
  { name: "Calicut Medical College (Govt)", state: "KL", type: "Government", quota: "AIQ", seats: 200, fees: "~₹10,000/yr", cutoff: { UR: 4500, OBC: 9000, SC: 20000, ST: 32000, EWS: 7200, PH: 35000 } },
  { name: "Pt. BD Sharma PGIMS, Rohtak", state: "HR", type: "Government", quota: "AIQ", seats: 200, fees: "~₹15,000/yr", cutoff: { UR: 3500, OBC: 7000, SC: 16000, ST: 26000, EWS: 5500, PH: 28000 } },
  { name: "PGIMER, Chandigarh (UG)", state: "PB", type: "Central", quota: "AIQ", seats: 50, fees: "~₹10,000/yr", cutoff: { UR: 1500, OBC: 3200, SC: 8000, ST: 13000, EWS: 2400, PH: 15000 } },
  { name: "Government Medical College, Chandigarh", state: "PB", type: "Government", quota: "AIQ+State", seats: 100, fees: "~₹25,000/yr", cutoff: { UR: 2500, OBC: 5500, SC: 12000, ST: 20000, EWS: 4000, PH: 22000 } },
  { name: "Indira Gandhi Medical College, Shimla", state: "HP", type: "Government", quota: "AIQ", seats: 150, fees: "~₹12,000/yr", cutoff: { UR: 5500, OBC: 11000, SC: 24000, ST: 38000, EWS: 9000, PH: 42000 } },
  { name: "Dr. RMLIMS, Lucknow", state: "UP", type: "Central", quota: "AIQ", seats: 100, fees: "~₹12,000/yr", cutoff: { UR: 1800, OBC: 3800, SC: 9000, ST: 15000, EWS: 2900, PH: 17000 } },
  { name: "Vardhman Mahavir Medical College (VMMC Safdarjung)", state: "DL", type: "Central", quota: "AIQ", seats: 150, fees: "~₹5,000/yr", cutoff: { UR: 300, OBC: 650, SC: 1900, ST: 3800, EWS: 500, PH: 4200 } },
  { name: "GR Medical College, Gwalior", state: "MP", type: "Government", quota: "AIQ", seats: 200, fees: "~₹15,000/yr", cutoff: { UR: 5000, OBC: 10000, SC: 22000, ST: 35000, EWS: 8000, PH: 38000 } },
  { name: "Gandhi Medical College, Bhopal", state: "MP", type: "Government", quota: "AIQ", seats: 200, fees: "~₹15,000/yr", cutoff: { UR: 4000, OBC: 8000, SC: 18000, ST: 29000, EWS: 6500, PH: 32000 } },
  { name: "MGM Medical College, Indore", state: "MP", type: "Government", quota: "AIQ", seats: 200, fees: "~₹15,000/yr", cutoff: { UR: 3500, OBC: 7500, SC: 16000, ST: 27000, EWS: 5800, PH: 30000 } },
  { name: "PT JNM Medical College, Raipur", state: "CG", type: "Government", quota: "AIQ", seats: 150, fees: "~₹12,000/yr", cutoff: { UR: 6000, OBC: 12000, SC: 26000, ST: 42000, EWS: 9500, PH: 46000 } },
  { name: "Rajendra Institute of Medical Sciences (RIMS), Ranchi", state: "JH", type: "Government", quota: "AIQ", seats: 150, fees: "~₹12,000/yr", cutoff: { UR: 7000, OBC: 14000, SC: 30000, ST: 48000, EWS: 11000, PH: 52000 } },
  { name: "Calcutta National Medical College (CNMC), Kolkata", state: "WB", type: "Government", quota: "AIQ", seats: 200, fees: "~₹15,000/yr", cutoff: { UR: 6000, OBC: 12000, SC: 26000, ST: 42000, EWS: 9500, PH: 46000 } },
  { name: "Medical College Kolkata (MCK)", state: "WB", type: "Government", quota: "AIQ", seats: 250, fees: "~₹15,000/yr", cutoff: { UR: 3500, OBC: 7500, SC: 16000, ST: 27000, EWS: 5800, PH: 30000 } },
  { name: "NRS Medical College, Kolkata", state: "WB", type: "Government", quota: "AIQ", seats: 200, fees: "~₹15,000/yr", cutoff: { UR: 5000, OBC: 10000, SC: 22000, ST: 35000, EWS: 8000, PH: 38000 } },
  { name: "Coimbatore Medical College", state: "TN", type: "Government", quota: "AIQ", seats: 200, fees: "~₹15,000/yr", cutoff: { UR: 8000, OBC: 16000, SC: 35000, ST: 56000, EWS: 13000, PH: 60000 } },
  { name: "Tirunelveli Medical College", state: "TN", type: "Government", quota: "AIQ", seats: 200, fees: "~₹15,000/yr", cutoff: { UR: 9000, OBC: 18000, SC: 38000, ST: 60000, EWS: 14500, PH: 65000 } },
  { name: "Govt Medical College, Kozhikode", state: "KL", type: "Government", quota: "AIQ", seats: 200, fees: "~₹10,000/yr", cutoff: { UR: 6000, OBC: 12000, SC: 26000, ST: 42000, EWS: 9500, PH: 46000 } },
  { name: "Govt Medical College, Thrissur", state: "KL", type: "Government", quota: "AIQ", seats: 150, fees: "~₹10,000/yr", cutoff: { UR: 8000, OBC: 16000, SC: 35000, ST: 56000, EWS: 13000, PH: 60000 } },
  { name: "Nizams Institute of Medical Sciences (NIMS), Hyderabad", state: "TG", type: "Government", quota: "AIQ", seats: 100, fees: "~₹25,000/yr", cutoff: { UR: 5000, OBC: 10000, SC: 22000, ST: 35000, EWS: 8000, PH: 38000 } },
  { name: "KIMS (Kakatiya), Warangal", state: "TG", type: "Government", quota: "AIQ", seats: 150, fees: "~₹20,000/yr", cutoff: { UR: 9000, OBC: 18000, SC: 38000, ST: 60000, EWS: 14500, PH: 65000 } },
  { name: "Andhra Medical College, Visakhapatnam", state: "AP", type: "Government", quota: "AIQ", seats: 200, fees: "~₹20,000/yr", cutoff: { UR: 6000, OBC: 12000, SC: 26000, ST: 42000, EWS: 9500, PH: 46000 } },
  { name: "Guntur Medical College", state: "AP", type: "Government", quota: "AIQ", seats: 200, fees: "~₹20,000/yr", cutoff: { UR: 8000, OBC: 16000, SC: 35000, ST: 56000, EWS: 13000, PH: 60000 } },
  { name: "VSS Medical College, Burla", state: "OD", type: "Government", quota: "AIQ", seats: 100, fees: "~₹10,000/yr", cutoff: { UR: 9000, OBC: 18000, SC: 38000, ST: 60000, EWS: 14500, PH: 65000 } },

  // ── DEEMED UNIVERSITIES (MCC via AIQ, high fees) ──
  { name: "Kasturba Medical College, Manipal", state: "KA", type: "Deemed", quota: "AIQ", seats: 250, fees: "~₹21L/yr", cutoff: { UR: 8000, OBC: 8000, SC: 8000, ST: 8000, EWS: 8000, PH: 8000 } },
  { name: "Kasturba Medical College, Mangalore", state: "KA", type: "Deemed", quota: "AIQ", seats: 200, fees: "~₹21L/yr", cutoff: { UR: 15000, OBC: 15000, SC: 15000, ST: 15000, EWS: 15000, PH: 15000 } },
  { name: "JSS Medical College, Mysore", state: "KA", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹20L/yr", cutoff: { UR: 20000, OBC: 20000, SC: 20000, ST: 20000, EWS: 20000, PH: 20000 } },
  { name: "Sri Ramachandra Inst. of Higher Education, Chennai", state: "TN", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹22L/yr", cutoff: { UR: 10000, OBC: 10000, SC: 10000, ST: 10000, EWS: 10000, PH: 10000 } },
  { name: "SRM Medical College, Kattankulathur", state: "TN", type: "Deemed", quota: "AIQ", seats: 200, fees: "~₹20L/yr", cutoff: { UR: 25000, OBC: 25000, SC: 25000, ST: 25000, EWS: 25000, PH: 25000 } },
  { name: "Saveetha Medical College, Chennai", state: "TN", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹17L/yr", cutoff: { UR: 30000, OBC: 30000, SC: 30000, ST: 30000, EWS: 30000, PH: 30000 } },
  { name: "Amrita School of Medicine, Faridabad", state: "HR", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹18L/yr", cutoff: { UR: 12000, OBC: 12000, SC: 12000, ST: 12000, EWS: 12000, PH: 12000 } },
  { name: "Hamdard Inst. of Med Sciences, Delhi", state: "DL", type: "Deemed", quota: "AIQ", seats: 100, fees: "~₹15L/yr", cutoff: { UR: 20000, OBC: 20000, SC: 20000, ST: 20000, EWS: 20000, PH: 20000 } },
  { name: "Yenepoya Medical College, Mangalore", state: "KA", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹15L/yr", cutoff: { UR: 35000, OBC: 35000, SC: 35000, ST: 35000, EWS: 35000, PH: 35000 } },
  { name: "Sri Siddhartha MC, Tumkur", state: "KA", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹16L/yr", cutoff: { UR: 50000, OBC: 50000, SC: 50000, ST: 50000, EWS: 50000, PH: 50000 } },
  { name: "Aarupadai Veedu MC (MGMC&RI), Pondicherry", state: "TN", type: "Deemed", quota: "AIQ", seats: 100, fees: "~₹14L/yr", cutoff: { UR: 45000, OBC: 45000, SC: 45000, ST: 45000, EWS: 45000, PH: 45000 } },
  { name: "Meenakshi Academy of Medical Sciences, Chennai", state: "TN", type: "Deemed", quota: "AIQ", seats: 100, fees: "~₹12L/yr", cutoff: { UR: 55000, OBC: 55000, SC: 55000, ST: 55000, EWS: 55000, PH: 55000 } },
  { name: "Shri Sathya Sai MC & RI, Kanchipuram", state: "TN", type: "Deemed", quota: "AIQ", seats: 100, fees: "~₹16L/yr", cutoff: { UR: 40000, OBC: 40000, SC: 40000, ST: 40000, EWS: 40000, PH: 40000 } },
  { name: "Subharti Medical College, Meerut", state: "UP", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹12L/yr", cutoff: { UR: 60000, OBC: 60000, SC: 60000, ST: 60000, EWS: 60000, PH: 60000 } },
  { name: "Teerthanker Mahaveer Medical College, Moradabad", state: "UP", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹10L/yr", cutoff: { UR: 70000, OBC: 70000, SC: 70000, ST: 70000, EWS: 70000, PH: 70000 } },

  // ── STATE QUOTA (85%) — KEY STATES ──
  // Rajasthan State
  { name: "JLN Medical College, Ajmer (State Quota)", state: "RJ", type: "Government", quota: "State", seats: 120, fees: "~₹15,000/yr", cutoff: { UR: 8000, OBC: 20000, SC: 30000, ST: 40000, EWS: 13000, PH: 45000 } },
  { name: "SP Medical College, Bikaner (State Quota)", state: "RJ", type: "Government", quota: "State", seats: 100, fees: "~₹15,000/yr", cutoff: { UR: 10000, OBC: 25000, SC: 38000, ST: 55000, EWS: 16000, PH: 60000 } },
  // Maharashtra State
  { name: "Byramjee Jeejeebhoy Govt. MC, Pune (State Quota)", state: "MH", type: "Government", quota: "State", seats: 120, fees: "~₹30,000/yr", cutoff: { UR: 5000, OBC: 12000, SC: 22000, ST: 35000, EWS: 8000, PH: 38000 } },
  { name: "Government Medical College, Nagpur (State Quota)", state: "MH", type: "Government", quota: "State", seats: 150, fees: "~₹30,000/yr", cutoff: { UR: 7000, OBC: 16000, SC: 28000, ST: 45000, EWS: 11000, PH: 50000 } },
  { name: "GMC Aurangabad (State Quota)", state: "MH", type: "Government", quota: "State", seats: 100, fees: "~₹30,000/yr", cutoff: { UR: 10000, OBC: 22000, SC: 38000, ST: 58000, EWS: 16000, PH: 63000 } },
  // Uttar Pradesh State
  { name: "SN Medical College, Agra (State Quota)", state: "UP", type: "Government", quota: "State", seats: 120, fees: "~₹15,000/yr", cutoff: { UR: 10000, OBC: 22000, SC: 38000, ST: 58000, EWS: 16000, PH: 63000 } },
  { name: "Lala Lajpat Rai Memorial MC, Meerut (State Quota)", state: "UP", type: "Government", quota: "State", seats: 100, fees: "~₹15,000/yr", cutoff: { UR: 12000, OBC: 26000, SC: 44000, ST: 66000, EWS: 19000, PH: 70000 } },
  { name: "Moti Lal Nehru MC, Allahabad (State Quota)", state: "UP", type: "Government", quota: "State", seats: 150, fees: "~₹15,000/yr", cutoff: { UR: 9000, OBC: 20000, SC: 35000, ST: 52000, EWS: 15000, PH: 56000 } },
  // Karnataka State
  { name: "Kempegowda Institute of Medical Sciences (KIMS), Bangalore", state: "KA", type: "Private", quota: "State", seats: 150, fees: "~₹8L/yr", cutoff: { UR: 20000, OBC: 25000, SC: 28000, ST: 32000, EWS: 22000, PH: 35000 } },
  { name: "MS Ramaiah Medical College, Bangalore", state: "KA", type: "Private", quota: "State", seats: 150, fees: "~₹12L/yr", cutoff: { UR: 15000, OBC: 20000, SC: 25000, ST: 30000, EWS: 18000, PH: 33000 } },
  { name: "RV Medical College, Bangalore", state: "KA", type: "Private", quota: "State", seats: 100, fees: "~₹10L/yr", cutoff: { UR: 25000, OBC: 30000, SC: 35000, ST: 42000, EWS: 28000, PH: 46000 } },
  // Tamil Nadu State
  { name: "Thanjavur Medical College (State Quota)", state: "TN", type: "Government", quota: "State", seats: 150, fees: "~₹15,000/yr", cutoff: { UR: 20000, OBC: 40000, SC: 65000, ST: 90000, EWS: 30000, PH: 95000 } },
  { name: "PSG Institute of Medical Sciences, Coimbatore", state: "TN", type: "Deemed", quota: "State", seats: 150, fees: "~₹12L/yr", cutoff: { UR: 30000, OBC: 35000, SC: 40000, ST: 48000, EWS: 32000, PH: 52000 } },
  { name: "Sri Moogambigai Inst. of Medical Sciences, Chennai", state: "TN", type: "Private", quota: "State", seats: 100, fees: "~₹8L/yr", cutoff: { UR: 70000, OBC: 80000, SC: 90000, ST: 100000, EWS: 75000, PH: 105000 } },
  // Gujarat State
  { name: "BJ Medical College, Ahmedabad (State Quota)", state: "GJ", type: "Government", quota: "State", seats: 150, fees: "~₹20,000/yr", cutoff: { UR: 4000, OBC: 9000, SC: 18000, ST: 30000, EWS: 6500, PH: 33000 } },
  { name: "Govt Medical College, Surat (State Quota)", state: "GJ", type: "Government", quota: "State", seats: 100, fees: "~₹20,000/yr", cutoff: { UR: 7000, OBC: 15000, SC: 28000, ST: 45000, EWS: 11000, PH: 49000 } },
  { name: "MP Shah Medical College, Jamnagar (State Quota)", state: "GJ", type: "Government", quota: "State", seats: 100, fees: "~₹20,000/yr", cutoff: { UR: 8000, OBC: 17000, SC: 30000, ST: 48000, EWS: 13000, PH: 52000 } },
  // Punjab/Haryana State
  { name: "Govt Medical College, Amritsar (State Quota)", state: "PB", type: "Government", quota: "State", seats: 100, fees: "~₹25,000/yr", cutoff: { UR: 8000, OBC: 17000, SC: 30000, ST: 48000, EWS: 13000, PH: 52000 } },
  { name: "SGRD Inst. of Medical Sciences, Amritsar", state: "PB", type: "Deemed", quota: "State", seats: 100, fees: "~₹15L/yr", cutoff: { UR: 30000, OBC: 30000, SC: 30000, ST: 30000, EWS: 30000, PH: 30000 } },
  // Andhra Pradesh State
  { name: "Sri Venkateswara Medical College (SVIMS), Tirupati", state: "AP", type: "Government", quota: "State", seats: 100, fees: "~₹20,000/yr", cutoff: { UR: 7000, OBC: 15000, SC: 28000, ST: 45000, EWS: 11000, PH: 49000 } },
  { name: "NTR University Affiliated Colleges, AP", state: "AP", type: "Government", quota: "State", seats: 150, fees: "~₹20,000/yr", cutoff: { UR: 10000, OBC: 22000, SC: 38000, ST: 58000, EWS: 16000, PH: 63000 } },
  // West Bengal State
  { name: "RG Kar Medical College, Kolkata (State Quota)", state: "WB", type: "Government", quota: "State", seats: 150, fees: "~₹15,000/yr", cutoff: { UR: 8000, OBC: 17000, SC: 30000, ST: 48000, EWS: 13000, PH: 52000 } },
  { name: "Burdwan Medical College (State Quota)", state: "WB", type: "Government", quota: "State", seats: 100, fees: "~₹15,000/yr", cutoff: { UR: 12000, OBC: 26000, SC: 44000, ST: 66000, EWS: 19000, PH: 70000 } },
  // Madhya Pradesh State
  { name: "Netaji Subhash Chandra Bose MC, Jabalpur (State)", state: "MP", type: "Government", quota: "State", seats: 100, fees: "~₹15,000/yr", cutoff: { UR: 8000, OBC: 18000, SC: 30000, ST: 45000, EWS: 13000, PH: 50000 } },
  { name: "SS Medical College, Rewa (State Quota)", state: "MP", type: "Government", quota: "State", seats: 100, fees: "~₹15,000/yr", cutoff: { UR: 12000, OBC: 26000, SC: 44000, ST: 66000, EWS: 19000, PH: 70000 } },
  // Chhattisgarh State
  { name: "Chhattisgarh Inst. of Medical Sciences (CIMS), Bilaspur", state: "CG", type: "Government", quota: "State", seats: 100, fees: "~₹12,000/yr", cutoff: { UR: 10000, OBC: 22000, SC: 38000, ST: 55000, EWS: 16000, PH: 60000 } },
  // Jharkhand State
  { name: "Mahatma Gandhi Memorial MC, Jamshedpur (State)", state: "JH", type: "Government", quota: "State", seats: 100, fees: "~₹12,000/yr", cutoff: { UR: 10000, OBC: 22000, SC: 38000, ST: 55000, EWS: 16000, PH: 60000 } },
  // Northeast
  { name: "Assam Medical College, Dibrugarh (State Quota)", state: "AS", type: "Government", quota: "State", seats: 100, fees: "~₹10,000/yr", cutoff: { UR: 15000, OBC: 32000, SC: 50000, ST: 70000, EWS: 24000, PH: 75000 } },
  { name: "Gauhati Medical College, Guwahati (State Quota)", state: "AS", type: "Government", quota: "State", seats: 150, fees: "~₹10,000/yr", cutoff: { UR: 10000, OBC: 22000, SC: 38000, ST: 55000, EWS: 16000, PH: 60000 } },
  { name: "Regional Institute of Medical Sciences (RIMS), Imphal", state: "MN", type: "Central", quota: "AIQ", seats: 100, fees: "~₹10,000/yr", cutoff: { UR: 12000, OBC: 26000, SC: 44000, ST: 60000, EWS: 19000, PH: 65000 } },
  // J&K
  { name: "GMC Srinagar (State Quota)", state: "JK", type: "Government", quota: "State", seats: 100, fees: "~₹10,000/yr", cutoff: { UR: 12000, OBC: 26000, SC: 44000, ST: 60000, EWS: 19000, PH: 65000 } },
  { name: "GMC Jammu (State Quota)", state: "JK", type: "Government", quota: "State", seats: 100, fees: "~₹10,000/yr", cutoff: { UR: 14000, OBC: 30000, SC: 50000, ST: 70000, EWS: 22000, PH: 75000 } },
  // Himachal Pradesh State
  { name: "Dr. RPDGMC, Kangra (State Quota)", state: "HP", type: "Government", quota: "State", seats: 100, fees: "~₹12,000/yr", cutoff: { UR: 12000, OBC: 26000, SC: 44000, ST: 62000, EWS: 19000, PH: 67000 } },
  // Uttarakhand State
  { name: "HIHT University (HiMS), Dehradun", state: "UK", type: "Deemed", quota: "State", seats: 100, fees: "~₹14L/yr", cutoff: { UR: 40000, OBC: 40000, SC: 40000, ST: 40000, EWS: 40000, PH: 40000 } },
  { name: "Shri Guru Ram Rai Inst. of Medical Sciences, Dehradun", state: "UK", type: "Deemed", quota: "State", seats: 100, fees: "~₹12L/yr", cutoff: { UR: 50000, OBC: 50000, SC: 50000, ST: 50000, EWS: 50000, PH: 50000 } },
  // Private (Various States)
  { name: "Jawaharlal Nehru Medical College, Belagavi (KLE)", state: "KA", type: "Private", quota: "State", seats: 150, fees: "~₹9L/yr", cutoff: { UR: 18000, OBC: 24000, SC: 30000, ST: 38000, EWS: 21000, PH: 42000 } },
  { name: "Vydehi Institute of Medical Sciences, Bangalore", state: "KA", type: "Private", quota: "State", seats: 150, fees: "~₹8L/yr", cutoff: { UR: 30000, OBC: 36000, SC: 42000, ST: 50000, EWS: 33000, PH: 55000 } },
  { name: "Sree Balaji Medical College, Chennai", state: "TN", type: "Private", quota: "State", seats: 150, fees: "~₹10L/yr", cutoff: { UR: 35000, OBC: 42000, SC: 50000, ST: 60000, EWS: 38000, PH: 65000 } },
  { name: "Chettinad Health City, Kelambakkam", state: "TN", type: "Private", quota: "State", seats: 100, fees: "~₹10L/yr", cutoff: { UR: 40000, OBC: 48000, SC: 56000, ST: 67000, EWS: 43000, PH: 72000 } },
  { name: "DY Patil Medical College, Pune", state: "MH", type: "Deemed", quota: "State", seats: 150, fees: "~₹18L/yr", cutoff: { UR: 25000, OBC: 25000, SC: 25000, ST: 25000, EWS: 25000, PH: 25000 } },
  { name: "MGM Medical College, Navi Mumbai", state: "MH", type: "Private", quota: "State", seats: 150, fees: "~₹8L/yr", cutoff: { UR: 20000, OBC: 28000, SC: 38000, ST: 50000, EWS: 24000, PH: 55000 } },
  { name: "Dr. DY Patil Medical College, Navi Mumbai", state: "MH", type: "Private", quota: "State", seats: 100, fees: "~₹10L/yr", cutoff: { UR: 30000, OBC: 38000, SC: 48000, ST: 60000, EWS: 34000, PH: 65000 } },
  { name: "ESIC MC & PGIMSR, Bangalore", state: "KA", type: "Central", quota: "AIQ", seats: 100, fees: "~₹5,000/yr", cutoff: { UR: 4000, OBC: 9000, SC: 18000, ST: 30000, EWS: 6500, PH: 33000 } },
  { name: "ESIC MC & PGIMSR, Hyderabad", state: "TG", type: "Central", quota: "AIQ", seats: 100, fees: "~₹5,000/yr", cutoff: { UR: 5000, OBC: 11000, SC: 22000, ST: 35000, EWS: 8000, PH: 38000 } },
  { name: "ESIC MC, Faridabad", state: "HR", type: "Central", quota: "AIQ", seats: 100, fees: "~₹5,000/yr", cutoff: { UR: 6000, OBC: 13000, SC: 26000, ST: 42000, EWS: 9500, PH: 46000 } },
  { name: "AFMC, Pune", state: "MH", type: "Central", quota: "AIQ", seats: 150, fees: "Govt Funded", cutoff: { UR: 1200, OBC: 2500, SC: 6000, ST: 10000, EWS: 2000, PH: 12000 } },

  // ── MORE GOVERNMENT COLLEGES (AIQ) ──
  { name: "Govt Medical College, Amritsar (AIQ)", state: "PB", type: "Government", quota: "AIQ", seats: 60, fees: "~₹25,000/yr", cutoff: { UR: 8000, OBC: 17000, SC: 32000, ST: 50000, EWS: 13000, PH: 55000 } },
  { name: "Govt Medical College, Patiala (AIQ)", state: "PB", type: "Government", quota: "AIQ", seats: 60, fees: "~₹25,000/yr", cutoff: { UR: 9000, OBC: 19000, SC: 35000, ST: 54000, EWS: 14500, PH: 59000 } },
  { name: "Govt Medical College, Kottayam (AIQ)", state: "KL", type: "Government", quota: "AIQ", seats: 30, fees: "~₹10,000/yr", cutoff: { UR: 10000, OBC: 22000, SC: 38000, ST: 58000, EWS: 16000, PH: 63000 } },
  { name: "Thiruvananthapuram MC (AIQ)", state: "KL", type: "Government", quota: "AIQ", seats: 30, fees: "~₹10,000/yr", cutoff: { UR: 3000, OBC: 6500, SC: 14000, ST: 23000, EWS: 5000, PH: 25000 } },
  { name: "Govt Medical College, Nagpur (AIQ)", state: "MH", type: "Government", quota: "AIQ", seats: 30, fees: "~₹30,000/yr", cutoff: { UR: 7000, OBC: 16000, SC: 30000, ST: 48000, EWS: 11000, PH: 52000 } },
  { name: "Topiwala National MC (Nair), Mumbai (AIQ)", state: "MH", type: "Government", quota: "AIQ", seats: 30, fees: "~₹30,000/yr", cutoff: { UR: 2000, OBC: 4500, SC: 10000, ST: 17000, EWS: 3200, PH: 19000 } },
  { name: "Lokmanya Tilak MC, Sion (AIQ)", state: "MH", type: "Government", quota: "AIQ", seats: 30, fees: "~₹30,000/yr", cutoff: { UR: 1800, OBC: 4000, SC: 9000, ST: 15000, EWS: 2900, PH: 17000 } },
  { name: "Pt. JNM Medical College, Raipur (AIQ)", state: "CG", type: "Government", quota: "AIQ", seats: 25, fees: "~₹12,000/yr", cutoff: { UR: 6000, OBC: 13000, SC: 26000, ST: 42000, EWS: 9500, PH: 46000 } },
  { name: "IGMC, Shimla (AIQ)", state: "HP", type: "Government", quota: "AIQ", seats: 23, fees: "~₹12,000/yr", cutoff: { UR: 5500, OBC: 11000, SC: 24000, ST: 38000, EWS: 9000, PH: 42000 } },
  { name: "Dr. RPGMC, Tanda, Kangra (AIQ)", state: "HP", type: "Government", quota: "AIQ", seats: 23, fees: "~₹12,000/yr", cutoff: { UR: 12000, OBC: 26000, SC: 44000, ST: 62000, EWS: 19000, PH: 67000 } },
  { name: "Maharaja Agrasen Medical College, Agroha (AIQ)", state: "HR", type: "Government", quota: "AIQ", seats: 25, fees: "~₹15,000/yr", cutoff: { UR: 15000, OBC: 32000, SC: 54000, ST: 76000, EWS: 24000, PH: 82000 } },
  { name: "GMC Haldwani, Uttarakhand (AIQ)", state: "UK", type: "Government", quota: "AIQ", seats: 23, fees: "~₹12,000/yr", cutoff: { UR: 14000, OBC: 30000, SC: 50000, ST: 70000, EWS: 22000, PH: 75000 } },
  { name: "Veer Surendra Sai Inst. of Medical Sciences, Sambalpur (AIQ)", state: "OD", type: "Government", quota: "AIQ", seats: 23, fees: "~₹10,000/yr", cutoff: { UR: 9000, OBC: 19000, SC: 35000, ST: 54000, EWS: 14500, PH: 59000 } },
  { name: "Silchar Medical College, Assam (AIQ)", state: "AS", type: "Government", quota: "AIQ", seats: 23, fees: "~₹10,000/yr", cutoff: { UR: 16000, OBC: 34000, SC: 55000, ST: 78000, EWS: 26000, PH: 83000 } },
  { name: "Jorhat Medical College, Assam (AIQ)", state: "AS", type: "Government", quota: "AIQ", seats: 23, fees: "~₹10,000/yr", cutoff: { UR: 18000, OBC: 38000, SC: 60000, ST: 85000, EWS: 29000, PH: 90000 } },
  { name: "Tezpur Medical College, Assam (AIQ)", state: "AS", type: "Government", quota: "AIQ", seats: 23, fees: "~₹10,000/yr", cutoff: { UR: 22000, OBC: 46000, SC: 72000, ST: 100000, EWS: 35000, PH: 105000 } },
  { name: "Agartala Govt Medical College, Tripura (AIQ)", state: "TR", type: "Government", quota: "AIQ", seats: 23, fees: "~₹10,000/yr", cutoff: { UR: 20000, OBC: 42000, SC: 66000, ST: 93000, EWS: 32000, PH: 98000 } },
  { name: "Mizoram Institute of Medical Education, Aizawl (AIQ)", state: "MZ", type: "Government", quota: "AIQ", seats: 50, fees: "~₹10,000/yr", cutoff: { UR: 25000, OBC: 52000, SC: 80000, ST: 110000, EWS: 40000, PH: 115000 } },
  { name: "Nagaland Institute of Medical Sciences, Kohima", state: "NL", type: "Government", quota: "AIQ", seats: 50, fees: "~₹10,000/yr", cutoff: { UR: 30000, OBC: 62000, SC: 95000, ST: 130000, EWS: 48000, PH: 135000 } },
  { name: "Sikkim Manipal Institute of Medical Sciences, Gangtok", state: "SK", type: "Deemed", quota: "AIQ", seats: 100, fees: "~₹12L/yr", cutoff: { UR: 45000, OBC: 45000, SC: 45000, ST: 45000, EWS: 45000, PH: 45000 } },
  { name: "Govt Medical College, Srinagar (AIQ)", state: "JK", type: "Government", quota: "AIQ", seats: 25, fees: "~₹10,000/yr", cutoff: { UR: 12000, OBC: 26000, SC: 44000, ST: 62000, EWS: 19000, PH: 67000 } },
  { name: "Govt Medical College, Jammu (AIQ)", state: "JK", type: "Government", quota: "AIQ", seats: 25, fees: "~₹10,000/yr", cutoff: { UR: 14000, OBC: 30000, SC: 50000, ST: 70000, EWS: 22000, PH: 75000 } },
  { name: "SNM Medical College, Leh (Ladakh)", state: "JK", type: "Government", quota: "AIQ", seats: 50, fees: "~₹10,000/yr", cutoff: { UR: 50000, OBC: 80000, SC: 110000, ST: 140000, EWS: 65000, PH: 145000 } },
  { name: "SKIMS, Soura, Srinagar", state: "JK", type: "Government", quota: "AIQ", seats: 50, fees: "~₹15,000/yr", cutoff: { UR: 10000, OBC: 22000, SC: 38000, ST: 56000, EWS: 16000, PH: 61000 } },

  // ── MORE DEEMED ──
  { name: "Mahatma Gandhi MC & RI, Pondicherry (MGMCRI)", state: "TN", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹14L/yr", cutoff: { UR: 45000, OBC: 45000, SC: 45000, ST: 45000, EWS: 45000, PH: 45000 } },
  { name: "Vinayaka Missions Medical College, Salem", state: "TN", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹10L/yr", cutoff: { UR: 65000, OBC: 65000, SC: 65000, ST: 65000, EWS: 65000, PH: 65000 } },
  { name: "ACS Medical College, Chennai", state: "TN", type: "Deemed", quota: "AIQ", seats: 100, fees: "~₹12L/yr", cutoff: { UR: 70000, OBC: 70000, SC: 70000, ST: 70000, EWS: 70000, PH: 70000 } },
  { name: "Bharath Institute of Higher Education (BIHER), Chennai", state: "TN", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹12L/yr", cutoff: { UR: 75000, OBC: 75000, SC: 75000, ST: 75000, EWS: 75000, PH: 75000 } },
  { name: "Sri Lakshmi Narayana Inst. of Medical Sciences, Pondicherry", state: "TN", type: "Deemed", quota: "AIQ", seats: 100, fees: "~₹11L/yr", cutoff: { UR: 80000, OBC: 80000, SC: 80000, ST: 80000, EWS: 80000, PH: 80000 } },
  { name: "Rajah Muthiah Medical College (ANNAMALAI UNIV), Chidambaram", state: "TN", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹9L/yr", cutoff: { UR: 60000, OBC: 60000, SC: 60000, ST: 60000, EWS: 60000, PH: 60000 } },
  { name: "Chettinad Academy of Research & Education (CARE), Kelambakkam", state: "TN", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹15L/yr", cutoff: { UR: 35000, OBC: 35000, SC: 35000, ST: 35000, EWS: 35000, PH: 35000 } },
  { name: "DY Patil Medical College, Navi Mumbai (Deemed)", state: "MH", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹18L/yr", cutoff: { UR: 25000, OBC: 25000, SC: 25000, ST: 25000, EWS: 25000, PH: 25000 } },
  { name: "DY Patil Medical College, Kolhapur", state: "MH", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹16L/yr", cutoff: { UR: 40000, OBC: 40000, SC: 40000, ST: 40000, EWS: 40000, PH: 40000 } },
  { name: "Krishna Institute of Medical Sciences, Karad", state: "MH", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹13L/yr", cutoff: { UR: 50000, OBC: 50000, SC: 50000, ST: 50000, EWS: 50000, PH: 50000 } },
  { name: "Pravara Institute of Medical Sciences, Loni", state: "MH", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹12L/yr", cutoff: { UR: 55000, OBC: 55000, SC: 55000, ST: 55000, EWS: 55000, PH: 55000 } },
  { name: "Jawaharlal Nehru Medical College (DMIMS), Wardha", state: "MH", type: "Deemed", quota: "AIQ", seats: 100, fees: "~₹10L/yr", cutoff: { UR: 60000, OBC: 60000, SC: 60000, ST: 60000, EWS: 60000, PH: 60000 } },
  { name: "Bharati Vidyapeeth MC, Pune (Deemed)", state: "MH", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹14L/yr", cutoff: { UR: 45000, OBC: 45000, SC: 45000, ST: 45000, EWS: 45000, PH: 45000 } },
  { name: "MGM Institute of Health Sciences, Navi Mumbai", state: "MH", type: "Deemed", quota: "AIQ", seats: 100, fees: "~₹12L/yr", cutoff: { UR: 55000, OBC: 55000, SC: 55000, ST: 55000, EWS: 55000, PH: 55000 } },
  { name: "Mahatma Gandhi MC, Jaipur (Deemed)", state: "RJ", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹12L/yr", cutoff: { UR: 50000, OBC: 50000, SC: 50000, ST: 50000, EWS: 50000, PH: 50000 } },
  { name: "NIMS University, Jaipur", state: "RJ", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹10L/yr", cutoff: { UR: 70000, OBC: 70000, SC: 70000, ST: 70000, EWS: 70000, PH: 70000 } },
  { name: "Geetanjali Medical College, Udaipur", state: "RJ", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹14L/yr", cutoff: { UR: 45000, OBC: 45000, SC: 45000, ST: 45000, EWS: 45000, PH: 45000 } },
  { name: "Pacific Medical College, Udaipur", state: "RJ", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹10L/yr", cutoff: { UR: 75000, OBC: 75000, SC: 75000, ST: 75000, EWS: 75000, PH: 75000 } },
  { name: "Shri Guru Ram Rai Inst. of Medical Sciences, Pilibhit Bypass", state: "UP", type: "Deemed", quota: "AIQ", seats: 100, fees: "~₹12L/yr", cutoff: { UR: 65000, OBC: 65000, SC: 65000, ST: 65000, EWS: 65000, PH: 65000 } },
  { name: "Era's Lucknow Medical College (ELMC)", state: "UP", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹11L/yr", cutoff: { UR: 70000, OBC: 70000, SC: 70000, ST: 70000, EWS: 70000, PH: 70000 } },
  { name: "Integral Institute of Medical Sciences, Lucknow", state: "UP", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹9L/yr", cutoff: { UR: 80000, OBC: 80000, SC: 80000, ST: 80000, EWS: 80000, PH: 80000 } },
  { name: "Sri Balaji Action Medical Institute, Delhi", state: "DL", type: "Deemed", quota: "AIQ", seats: 100, fees: "~₹14L/yr", cutoff: { UR: 35000, OBC: 35000, SC: 35000, ST: 35000, EWS: 35000, PH: 35000 } },
  { name: "Santosh Medical College, Ghaziabad", state: "UP", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹12L/yr", cutoff: { UR: 55000, OBC: 55000, SC: 55000, ST: 55000, EWS: 55000, PH: 55000 } },
  { name: "MM Institute of Medical Sciences, Mullana (Ambala)", state: "HR", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹12L/yr", cutoff: { UR: 55000, OBC: 55000, SC: 55000, ST: 55000, EWS: 55000, PH: 55000 } },
  { name: "Adesh Institute of Medical Sciences, Bathinda", state: "PB", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹12L/yr", cutoff: { UR: 58000, OBC: 58000, SC: 58000, ST: 58000, EWS: 58000, PH: 58000 } },
  { name: "Sri Guru Gobind Singh Tricentenary Univ. (SGT), Gurugram", state: "HR", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹10L/yr", cutoff: { UR: 70000, OBC: 70000, SC: 70000, ST: 70000, EWS: 70000, PH: 70000 } },
  { name: "Manav Rachna International Inst. of Research, Faridabad", state: "HR", type: "Deemed", quota: "AIQ", seats: 100, fees: "~₹10L/yr", cutoff: { UR: 80000, OBC: 80000, SC: 80000, ST: 80000, EWS: 80000, PH: 80000 } },
  { name: "Shri Atal Bihari Vajpayee Govt. MC, Vidisha (MP)", state: "MP", type: "Government", quota: "AIQ", seats: 100, fees: "~₹15,000/yr", cutoff: { UR: 14000, OBC: 30000, SC: 50000, ST: 70000, EWS: 22000, PH: 75000 } },
  { name: "Bundelkhand Medical College, Sagar (MP)", state: "MP", type: "Government", quota: "AIQ", seats: 100, fees: "~₹15,000/yr", cutoff: { UR: 16000, OBC: 34000, SC: 56000, ST: 79000, EWS: 26000, PH: 84000 } },
  { name: "Chirayu Medical College, Bhopal", state: "MP", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹12L/yr", cutoff: { UR: 60000, OBC: 60000, SC: 60000, ST: 60000, EWS: 60000, PH: 60000 } },
  { name: "Index Medical College, Indore", state: "MP", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹10L/yr", cutoff: { UR: 75000, OBC: 75000, SC: 75000, ST: 75000, EWS: 75000, PH: 75000 } },
  { name: "LN Medical College, Bhopal", state: "MP", type: "Private", quota: "State", seats: 100, fees: "~₹8L/yr", cutoff: { UR: 80000, OBC: 85000, SC: 90000, ST: 100000, EWS: 82000, PH: 105000 } },
  { name: "Aurangabad Medical College (MH State Quota)", state: "MH", type: "Private", quota: "State", seats: 100, fees: "~₹8L/yr", cutoff: { UR: 45000, OBC: 52000, SC: 60000, ST: 70000, EWS: 48000, PH: 75000 } },
  { name: "Jawaharlal Nehru MC, Belgaum (KLE Deemed)", state: "KA", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹16L/yr", cutoff: { UR: 30000, OBC: 30000, SC: 30000, ST: 30000, EWS: 30000, PH: 30000 } },
  { name: "JJM Medical College, Davangere (Deemed)", state: "KA", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹12L/yr", cutoff: { UR: 55000, OBC: 55000, SC: 55000, ST: 55000, EWS: 55000, PH: 55000 } },
  { name: "BGS Global Institute of Medical Sciences, Bangalore", state: "KA", type: "Deemed", quota: "AIQ", seats: 100, fees: "~₹14L/yr", cutoff: { UR: 50000, OBC: 50000, SC: 50000, ST: 50000, EWS: 50000, PH: 50000 } },
  { name: "AJ Institute of Medical Sciences, Mangalore", state: "KA", type: "Deemed", quota: "AIQ", seats: 100, fees: "~₹13L/yr", cutoff: { UR: 60000, OBC: 60000, SC: 60000, ST: 60000, EWS: 60000, PH: 60000 } },
  { name: "Father Muller Medical College, Mangalore", state: "KA", type: "Deemed", quota: "AIQ", seats: 100, fees: "~₹10L/yr", cutoff: { UR: 40000, OBC: 40000, SC: 40000, ST: 40000, EWS: 40000, PH: 40000 } },
  { name: "KS Hegde Medical Academy (NITTE), Mangalore", state: "KA", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹13L/yr", cutoff: { UR: 35000, OBC: 35000, SC: 35000, ST: 35000, EWS: 35000, PH: 35000 } },
  { name: "Navodaya Medical College, Raichur", state: "KA", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹10L/yr", cutoff: { UR: 75000, OBC: 75000, SC: 75000, ST: 75000, EWS: 75000, PH: 75000 } },
  { name: "SS Institute of Medical Sciences, Davangere", state: "KA", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹12L/yr", cutoff: { UR: 65000, OBC: 65000, SC: 65000, ST: 65000, EWS: 65000, PH: 65000 } },
  { name: "Kanachur Institute of Medical Sciences, Mangalore", state: "KA", type: "Deemed", quota: "AIQ", seats: 100, fees: "~₹10L/yr", cutoff: { UR: 80000, OBC: 80000, SC: 80000, ST: 80000, EWS: 80000, PH: 80000 } },
  { name: "Amrita Institute of Medical Sciences, Kochi", state: "KL", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹18L/yr", cutoff: { UR: 5000, OBC: 5000, SC: 5000, ST: 5000, EWS: 5000, PH: 5000 } },
  { name: "Pushpagiri Institute of Medical Sciences, Tiruvalla", state: "KL", type: "Deemed", quota: "AIQ", seats: 100, fees: "~₹14L/yr", cutoff: { UR: 30000, OBC: 30000, SC: 30000, ST: 30000, EWS: 30000, PH: 30000 } },
  { name: "SUT Academy of Medical Sciences, Trivandrum", state: "KL", type: "Deemed", quota: "AIQ", seats: 100, fees: "~₹12L/yr", cutoff: { UR: 50000, OBC: 50000, SC: 50000, ST: 50000, EWS: 50000, PH: 50000 } },
  { name: "Believers Church Medical College, Thiruvalla", state: "KL", type: "Deemed", quota: "AIQ", seats: 100, fees: "~₹15L/yr", cutoff: { UR: 35000, OBC: 35000, SC: 35000, ST: 35000, EWS: 35000, PH: 35000 } },
  { name: "Jubilee Mission MC, Thrissur", state: "KL", type: "Deemed", quota: "AIQ", seats: 100, fees: "~₹12L/yr", cutoff: { UR: 45000, OBC: 45000, SC: 45000, ST: 45000, EWS: 45000, PH: 45000 } },

  // ── MORE STATE QUOTA ──
  // Haryana State Quota
  { name: "SHKM Govt Medical College, Nalhar (HR State)", state: "HR", type: "Government", quota: "State", seats: 100, fees: "~₹15,000/yr", cutoff: { UR: 14000, OBC: 30000, SC: 50000, ST: 70000, EWS: 22000, PH: 75000 } },
  { name: "BPS Govt Medical College for Women, Sonipat (HR State)", state: "HR", type: "Government", quota: "State", seats: 100, fees: "~₹15,000/yr", cutoff: { UR: 12000, OBC: 26000, SC: 44000, ST: 62000, EWS: 19000, PH: 67000 } },
  // Uttarakhand State Quota
  { name: "Govt Doon Medical College, Dehradun (UK State)", state: "UK", type: "Government", quota: "State", seats: 100, fees: "~₹12,000/yr", cutoff: { UR: 12000, OBC: 26000, SC: 44000, ST: 62000, EWS: 19000, PH: 67000 } },
  // Bihar State Quota
  { name: "Nalanda Medical College, Patna (BR State)", state: "BR", type: "Government", quota: "State", seats: 100, fees: "~₹10,000/yr", cutoff: { UR: 10000, OBC: 22000, SC: 38000, ST: 56000, EWS: 16000, PH: 61000 } },
  { name: "Anugrah Narayan Magadh Medical College (BR State)", state: "BR", type: "Government", quota: "State", seats: 100, fees: "~₹10,000/yr", cutoff: { UR: 14000, OBC: 30000, SC: 50000, ST: 70000, EWS: 22000, PH: 75000 } },
  { name: "Shri Krishna Medical College, Muzaffarpur (BR State)", state: "BR", type: "Government", quota: "State", seats: 100, fees: "~₹10,000/yr", cutoff: { UR: 12000, OBC: 26000, SC: 44000, ST: 62000, EWS: 19000, PH: 67000 } },
  // Jharkhand State Quota
  { name: "Rajendra Institute of Medical Sciences (RIMS), Ranchi (State)", state: "JH", type: "Government", quota: "State", seats: 80, fees: "~₹12,000/yr", cutoff: { UR: 8000, OBC: 17000, SC: 30000, ST: 45000, EWS: 13000, PH: 49000 } },
  { name: "Patliputra Medical College, Dhanbad (JH State)", state: "JH", type: "Government", quota: "State", seats: 100, fees: "~₹12,000/yr", cutoff: { UR: 14000, OBC: 30000, SC: 50000, ST: 70000, EWS: 22000, PH: 75000 } },
  // Odisha State Quota
  { name: "Hi-Tech Medical College, Bhubaneswar (OD State)", state: "OD", type: "Private", quota: "State", seats: 150, fees: "~₹8L/yr", cutoff: { UR: 40000, OBC: 48000, SC: 57000, ST: 68000, EWS: 44000, PH: 73000 } },
  { name: "Sum Hospital (SUMS), Bhubaneswar (OD State)", state: "OD", type: "Deemed", quota: "State", seats: 150, fees: "~₹15L/yr", cutoff: { UR: 30000, OBC: 30000, SC: 30000, ST: 30000, EWS: 30000, PH: 30000 } },
  // West Bengal State Quota
  { name: "Bankura Sammilani Medical College (WB State)", state: "WB", type: "Government", quota: "State", seats: 100, fees: "~₹15,000/yr", cutoff: { UR: 16000, OBC: 34000, SC: 56000, ST: 79000, EWS: 26000, PH: 84000 } },
  { name: "Midnapore Medical College (WB State)", state: "WB", type: "Government", quota: "State", seats: 100, fees: "~₹15,000/yr", cutoff: { UR: 18000, OBC: 38000, SC: 60000, ST: 84000, EWS: 29000, PH: 89000 } },
  { name: "North Bengal Medical College, Siliguri (WB State)", state: "WB", type: "Government", quota: "State", seats: 100, fees: "~₹15,000/yr", cutoff: { UR: 14000, OBC: 30000, SC: 50000, ST: 70000, EWS: 22000, PH: 75000 } },
  // Gujarat State Quota
  { name: "Govt Medical College, Bhavnagar (GJ State)", state: "GJ", type: "Government", quota: "State", seats: 100, fees: "~₹20,000/yr", cutoff: { UR: 10000, OBC: 22000, SC: 38000, ST: 56000, EWS: 16000, PH: 61000 } },
  { name: "Govt Medical College, Vadodara (GJ State)", state: "GJ", type: "Government", quota: "State", seats: 100, fees: "~₹20,000/yr", cutoff: { UR: 6000, OBC: 13000, SC: 26000, ST: 42000, EWS: 9500, PH: 46000 } },
  { name: "PDU Govt Medical College, Rajkot (GJ State)", state: "GJ", type: "Government", quota: "State", seats: 100, fees: "~₹20,000/yr", cutoff: { UR: 8000, OBC: 17000, SC: 30000, ST: 48000, EWS: 13000, PH: 52000 } },
  // Telangana State Quota
  { name: "Kakatiya Medical College, Warangal (TG State)", state: "TG", type: "Government", quota: "State", seats: 150, fees: "~₹20,000/yr", cutoff: { UR: 9000, OBC: 19000, SC: 35000, ST: 54000, EWS: 14500, PH: 59000 } },
  { name: "Govt Medical College, Mahabubnagar (TG State)", state: "TG", type: "Government", quota: "State", seats: 100, fees: "~₹20,000/yr", cutoff: { UR: 15000, OBC: 32000, SC: 54000, ST: 76000, EWS: 24000, PH: 82000 } },
  // Andhra Pradesh State Quota
  { name: "Dr. YSR Govt. MC, Ongole (AP State)", state: "AP", type: "Government", quota: "State", seats: 100, fees: "~₹20,000/yr", cutoff: { UR: 12000, OBC: 26000, SC: 44000, ST: 62000, EWS: 19000, PH: 67000 } },
  { name: "Rangaraya Medical College, Kakinada (AP State)", state: "AP", type: "Government", quota: "State", seats: 150, fees: "~₹20,000/yr", cutoff: { UR: 10000, OBC: 22000, SC: 38000, ST: 56000, EWS: 16000, PH: 61000 } },
  // Karnataka Additional State Quota
  { name: "Sapthagiri Inst. of Medical Sciences, Bangalore (KA State)", state: "KA", type: "Private", quota: "State", seats: 150, fees: "~₹7L/yr", cutoff: { UR: 45000, OBC: 52000, SC: 60000, ST: 70000, EWS: 48000, PH: 75000 } },
  { name: "Sri Devaraj Urs Medical College, Kolar (KA State)", state: "KA", type: "Deemed", quota: "State", seats: 100, fees: "~₹12L/yr", cutoff: { UR: 40000, OBC: 40000, SC: 40000, ST: 40000, EWS: 40000, PH: 40000 } },
  { name: "Adichunchanagiri Inst. of Medical Sciences, BG Nagar (KA)", state: "KA", type: "Deemed", quota: "AIQ", seats: 150, fees: "~₹12L/yr", cutoff: { UR: 55000, OBC: 55000, SC: 55000, ST: 55000, EWS: 55000, PH: 55000 } },
  { name: "SDM College of Medical Sciences, Dharwad", state: "KA", type: "Deemed", quota: "AIQ", seats: 100, fees: "~₹14L/yr", cutoff: { UR: 30000, OBC: 30000, SC: 30000, ST: 30000, EWS: 30000, PH: 30000 } },
  // Punjab/Delhi Private State
  { name: "Dayanand Medical College, Ludhiana (PB State)", state: "PB", type: "Deemed", quota: "State", seats: 100, fees: "~₹15L/yr", cutoff: { UR: 25000, OBC: 25000, SC: 25000, ST: 25000, EWS: 25000, PH: 25000 } },
  { name: "Christian Medical College, Ludhiana (PB State)", state: "PB", type: "Deemed", quota: "State", seats: 100, fees: "~₹12L/yr", cutoff: { UR: 20000, OBC: 20000, SC: 20000, ST: 20000, EWS: 20000, PH: 20000 } },
  // CMC Vellore
  { name: "Christian Medical College (CMC), Vellore", state: "TN", type: "Deemed", quota: "AIQ", seats: 100, fees: "~₹2L/yr", cutoff: { UR: 2500, OBC: 2500, SC: 2500, ST: 2500, EWS: 2500, PH: 2500 } },
  // Extra NE + Remote state
  { name: "NEIGRIHMS, Shillong", state: "ML", type: "Central", quota: "AIQ", seats: 50, fees: "~₹5,000/yr", cutoff: { UR: 8000, OBC: 17000, SC: 30000, ST: 45000, EWS: 13000, PH: 49000 } },
  { name: "RIMS, Imphal, Manipur (AIQ)", state: "MN", type: "Central", quota: "AIQ", seats: 50, fees: "~₹5,000/yr", cutoff: { UR: 12000, OBC: 26000, SC: 44000, ST: 60000, EWS: 19000, PH: 65000 } },
];
