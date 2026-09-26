export const projectsData = [
  {
    id: "proj-1",
    name: "Enterprise Cloud Migration",
    client: "Acme Technologies",
    status: "In Progress",
    owner: "B. Venkat Sreekar",
    startDate: "2026-09-01",
    endDate: "2026-12-15",
    totalHours: 320,
    finalCost: 530332,
  },
  {
    id: "proj-2",
    name: "Customer Support Chatbot",
    client: "FinServe Global",
    status: "Completed",
    owner: "Priya Sharma",
    startDate: "2026-06-10",
    endDate: "2026-08-30",
    totalHours: 180,
    finalCost: 285400,
  },
  {
    id: "proj-3",
    name: "Supply Chain Analytics Dashboard",
    client: "LogiTrans Logistics",
    status: "On Hold",
    owner: "Rahul Verma",
    startDate: "2026-10-01",
    endDate: "2027-01-20",
    totalHours: 95,
    finalCost: 0, // Should display "Not estimated"
  },
  {
    id: "proj-4",
    name: "Healthcare Mobile App",
    client: "MediCare Plus",
    status: "Planning",
    owner: "Ananya Iyer",
    startDate: "2026-11-05",
    endDate: "2027-04-30",
    totalHours: 450,
    finalCost: null, // Should display "Not estimated"
  },
  {
    id: "proj-5",
    name: "AI Document Parser",
    client: "LegalMind Corp",
    status: "Review Pending", // Unseen status to test fallback badge
    owner: "Vikram Malhotra",
    startDate: "2026-09-15",
    endDate: "2026-11-30",
    totalHours: 140,
    finalCost: undefined, // Should display "Not estimated"
  },
  {
    id: "proj-6",
    name: "E-Commerce Payment Gateway",
    client: "ShopNest India",
    status: "In Progress",
    owner: "Deepak Patel",
    startDate: "2026-08-20",
    endDate: "2026-10-25",
    totalHours: 260,
    finalCost: 1482950, // Large amount with Indian lakh formatting: Rs 14,82,950
  },
];
