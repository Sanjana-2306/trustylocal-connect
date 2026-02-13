import { calculateTrustScore, getTrustLevel, canAppearInSearch } from "./trust-engine";

export type UserRole = "customer" | "worker" | "admin";
export type WorkerStatus = "Pending" | "Active" | "Suspended";
export type JobStatus = "pending" | "in_progress" | "completed" | "cancelled";
export type EscrowStatus = "processing" | "held" | "released" | "refunded";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Worker {
  id: string;
  user_id: string;
  name: string;
  email: string;
  lat: number;
  lng: number;
  trust_score: number;
  trust_level: string;
  status: WorkerStatus;
  completed_jobs: number;
  four_plus_ratings: number;
  repeat_customers: number;
  complaints: number;
  severe_complaints: number;
  skills: string[];
  hourly_rate: number;
  visible: boolean;
  joined: string;
}

export interface Job {
  id: string;
  customer_name: string;
  worker_name: string;
  status: JobStatus;
  escrow_status: EscrowStatus;
  amount: number;
  description: string;
  created_at: string;
}

export interface Complaint {
  id: string;
  worker_name: string;
  severity: "low" | "medium" | "severe";
  description: string;
  status: "open" | "resolved" | "escalated";
  created_at: string;
}

export interface Rating {
  id: string;
  worker_name: string;
  customer_name: string;
  rating: number;
  feedback: string;
  created_at: string;
}

function makeWorker(
  id: string, name: string, lat: number, lng: number,
  completed: number, fourPlus: number, repeat: number,
  complaints: number, severe: number, skills: string[],
  rate: number, status: WorkerStatus, joined: string
): Worker {
  const score = calculateTrustScore({ completed_jobs: completed, four_plus_ratings: fourPlus, repeat_customers: repeat, complaints, severe_complaints: severe });
  return {
    id, user_id: `u-${id}`, name, email: `${name.toLowerCase().replace(/\s/g, '.')}@email.com`,
    lat, lng, trust_score: score, trust_level: getTrustLevel(score), status,
    completed_jobs: completed, four_plus_ratings: fourPlus, repeat_customers: repeat,
    complaints, severe_complaints: severe, skills, hourly_rate: rate,
    visible: canAppearInSearch(score), joined,
  };
}

export const mockWorkers: Worker[] = [
  makeWorker("w1", "Rajesh Kumar", 13.0827, 80.2707, 5, 4, 2, 0, 0, ["Plumbing", "Electrical"], 25, "Active", "2024-01-15"),
  makeWorker("w2", "Priya Sharma", 13.0850, 80.2750, 3, 3, 1, 0, 0, ["Cleaning", "Cooking"], 20, "Active", "2024-02-20"),
  makeWorker("w3", "Amit Patel", 13.0800, 80.2680, 2, 2, 0, 0, 0, ["Carpentry", "Painting"], 30, "Active", "2024-03-10"),
  makeWorker("w4", "Deepa Nair", 13.0870, 80.2730, 1, 1, 0, 1, 0, ["Gardening", "Cleaning"], 18, "Active", "2024-04-05"),
  makeWorker("w5", "Vikram Singh", 13.0790, 80.2760, 0, 0, 0, 0, 0, ["Electrical"], 22, "Pending", "2024-05-01"),
  makeWorker("w6", "Sunita Devi", 13.0860, 80.2690, 4, 3, 3, 0, 0, ["Cooking", "Childcare"], 20, "Active", "2023-11-20"),
  makeWorker("w7", "Ravi Verma", 13.0810, 80.2720, 0, 0, 0, 3, 0, ["Plumbing"], 15, "Suspended", "2024-01-01"),
  makeWorker("w8", "Ananya Reddy", 13.0840, 80.2740, 6, 5, 2, 0, 0, ["Electrical", "AC Repair"], 35, "Active", "2023-09-15"),
];

export const mockJobs: Job[] = [
  { id: "j1", customer_name: "Arjun M.", worker_name: "Rajesh Kumar", status: "completed", escrow_status: "released", amount: 150, description: "Fix kitchen sink pipe", created_at: "2024-06-01" },
  { id: "j2", customer_name: "Meera S.", worker_name: "Priya Sharma", status: "in_progress", escrow_status: "held", amount: 80, description: "Deep clean 2BHK apartment", created_at: "2024-06-10" },
  { id: "j3", customer_name: "Karthik R.", worker_name: "Amit Patel", status: "pending", escrow_status: "processing", amount: 200, description: "Repaint living room walls", created_at: "2024-06-15" },
  { id: "j4", customer_name: "Divya K.", worker_name: "Ananya Reddy", status: "completed", escrow_status: "released", amount: 300, description: "AC installation and service", created_at: "2024-06-05" },
  { id: "j5", customer_name: "Suresh P.", worker_name: "Rajesh Kumar", status: "completed", escrow_status: "released", amount: 120, description: "Electrical wiring repair", created_at: "2024-05-28" },
];

export const mockComplaints: Complaint[] = [
  { id: "c1", worker_name: "Ravi Verma", severity: "severe", description: "Worker was rude and left work incomplete", status: "escalated", created_at: "2024-06-12" },
  { id: "c2", worker_name: "Deepa Nair", severity: "low", description: "Arrived 30 minutes late", status: "resolved", created_at: "2024-06-08" },
  { id: "c3", worker_name: "Ravi Verma", severity: "medium", description: "Quality of work was below expectations", status: "open", created_at: "2024-06-14" },
];

export const mockRatings: Rating[] = [
  { id: "r1", worker_name: "Rajesh Kumar", customer_name: "Arjun M.", rating: 5, feedback: "Excellent plumbing work. Very professional.", created_at: "2024-06-02" },
  { id: "r2", worker_name: "Priya Sharma", customer_name: "Meera S.", rating: 4, feedback: "Good cleaning, very thorough.", created_at: "2024-06-11" },
  { id: "r3", worker_name: "Ananya Reddy", customer_name: "Divya K.", rating: 5, feedback: "Best AC service ever. Highly recommend.", created_at: "2024-06-06" },
  { id: "r4", worker_name: "Amit Patel", customer_name: "Karthik R.", rating: 4, feedback: "Nice painting work, clean finish.", created_at: "2024-06-16" },
];

export const mockAdminStats = {
  totalWorkers: mockWorkers.length,
  activeWorkers: mockWorkers.filter(w => w.status === "Active").length,
  suspendedWorkers: mockWorkers.filter(w => w.status === "Suspended").length,
  pendingWorkers: mockWorkers.filter(w => w.status === "Pending").length,
  avgTrustScore: Math.round(mockWorkers.reduce((s, w) => s + w.trust_score, 0) / mockWorkers.length),
  totalJobs: mockJobs.length,
  completedJobs: mockJobs.filter(j => j.status === "completed").length,
  totalComplaints: mockComplaints.length,
  openComplaints: mockComplaints.filter(c => c.status === "open").length,
};
