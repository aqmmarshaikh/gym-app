// Mock Data Generator for Fitness Corner Gym Demo Mode

export interface Coach {
  id: string;
  name: string;
  username: string;
  password?: string;
  phone: string;
  experience: string;
  specialization: string;
  languages: string[];
  status: "Active" | "Inactive" | "Suspended";
  photoUrl: string;
  joiningDate: string;
  email?: string;
}

export interface Member {
  code: string;
  name: string;
  gender: "Male" | "Female" | "Other";
  age: number;
  height: number; // in cm
  weight: number; // in kg
  joiningWeight: number; // in kg
  targetWeight: number; // in kg
  bmi: number;
  bodyFat: number;
  goal: string;
  experience: "Beginner" | "Intermediate" | "Advanced";
  joiningDate: string;
  durationMonths: number;
  expiryDate: string;
  attendanceRate: number;
  assignedCoachId: string;
  phone: string;
  address: string;
  preferredTiming: string;
  medicalNotes: string;
  emergencyContact: string;
  photoUrl: string;
  status: "Active" | "Fee Due" | "Expired" | "Blocked" | "Left";
  bloodGroup: string;
  occupation: string;
  dob: string;
}

export interface Machine {
  id: string;
  name: string;
  category: "Strength" | "Cardio" | "Functional" | "Recovery";
  status: "Available" | "Unavailable" | "Maintenance";
  targetMuscle: string;
  imageUrl: string;
  purchaseDate: string;
  maintenanceDate: string;
  notes: string;
  isActive?: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  imageUrl: string;
  machineRequired: string; // Machine Name or "None"
  targetMuscle: "Chest" | "Back" | "Legs" | "Shoulders" | "Arms" | "Abs" | "Cardio" | "Full Body";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  instructions: string[];
  coachTips: string;
  commonMistakes: string;
  replacementExercise: string;
  estimatedCalories: number;
}

export interface WorkoutExercise {
  id: string;
  name: string;
  sets: number;
  reps: string; // e.g. "12", "10-12", "Till Failure"
  restTime: string; // e.g. "60s"
  targetMuscle: string;
  machineRequired: string; // Machine Name or "None"
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  coachNote?: string;
}

export interface DailyWorkout {
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  focus: string; // e.g. "Chest", "Rest"
  exercises: WorkoutExercise[];
}

export interface WorkoutCategory {
  id: string;
  name: string;
  description: string;
  dailyWorkouts: DailyWorkout[];
}

export interface AttendanceRecord {
  id: string;
  memberCode: string;
  date: string; // YYYY-MM-DD
  status: "Present" | "Absent" | "Holiday" | "Late Entry";
  time?: string; // HH:MM AM/PM
}

export interface FeeRecord {
  id: string;
  memberCode: string;
  paymentDate: string;
  amount: number;
  durationMonths: number;
  expiryDate: string;
  remarks: string;
  status: "Paid" | "Pending" | "Overdue";
}

export interface Transformation {
  id: string;
  name: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  weightBefore: number;
  weightAfter: number;
  durationWeeks: number;
  goal: string;
  story: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  profileImageUrl: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  priority: "High" | "Medium" | "Low";
  target: "Everyone" | "Coaches" | "Members" | "WeightLoss" | "Women";
  createdAt: string;
}

export interface Notification {
  id: string;
  memberCode: string;
  title: string;
  message: string;
  type: "workout" | "diet" | "fee" | "attendance" | "general";
  read: boolean;
  createdAt: string;
}

export interface MemberProgress {
  id: string;
  memberCode: string;
  date: string;
  weight: number;
  chest?: number;
  waist?: number;
  hip?: number;
  neck?: number;
  shoulder?: number;
  leftArm?: number;
  rightArm?: number;
  leftForearm?: number;
  rightForearm?: number;
  leftThigh?: number;
  rightThigh?: number;
  leftCalf?: number;
  rightCalf?: number;
  bmi: number;
  bodyFat: number;
  photos: string[];
}

export interface AuditLog {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
  device: string;
}

// Data generator helpers
const firstNames = ["Avan", "Deepak", "Aarav", "Meera", "Asha", "Ammar", "Dev", "Raj", "Pooja", "Vikram", "Sneha", "Karan", "Nisha", "Aditya", "Rohan", "Anjali", "Kabir", "Neha", "Rahul", "Priya", "Sunita", "Harsh", "Simran", "Amit", "Tanvi", "Siddharth", "Reema", "Manish", "Kriti", "Vijay"];
const lastNames = ["Patel", "Shah", "Mehta", "Sharma", "Joshi", "Verma", "Gupta", "Kumar", "Singh", "Reddy", "Nair", "Das", "Rao", "Choudhury", "Bose", "Mishra", "Pillai", "Yadav", "Trivedi", "Soni"];
const goals = [
  "Weight Loss", "Weight Gain", "Muscle Building", "Bodybuilding", "Strength",
  "Powerlifting", "Six Pack", "General Fitness", "Cardio", "Women's Fitness",
  "Senior Fitness", "HIIT", "Functional Training", "Custom"
];
const timings = ["06:00 AM - 08:00 AM", "08:00 AM - 10:00 AM", "10:00 AM - 12:00 PM", "04:00 PM - 06:00 PM", "06:00 PM - 08:00 PM", "08:00 PM - 10:00 PM"];
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const medicalConditionsList = ["None", "Mild Asthma", "Lower Back Pain", "Hypertension (Controlled)", "Knee Injury Recovery", "Slight Scoliosis", "Type 2 Diabetes (Managed)"];
const occupations = ["Software Engineer", "Business Owner", "Student", "Teacher", "Doctor", "Designer", "Homemaker", "Accountant", "Architect", "Consultant"];

// Generating 5 Coaches
export const coaches: Coach[] = [
  {
    id: "coach1",
    name: "Vikram Malhotra",
    username: "strength_coach",
    password: "Password@123",
    phone: "+91 98765 43210",
    experience: "8 Years",
    specialization: "Strength & Powerlifting",
    languages: ["English", "Hindi", "Gujarati"],
    status: "Active",
    photoUrl: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=150&auto=format&fit=crop&q=80",
    joiningDate: "2024-01-15"
  },
  {
    id: "coach2",
    name: "Sneha Patel",
    username: "cardio_coach",
    password: "Password@123",
    phone: "+91 98765 43211",
    experience: "5 Years",
    specialization: "Cardio & HIIT",
    languages: ["English", "Gujarati"],
    status: "Active",
    photoUrl: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=150&auto=format&fit=crop&q=80",
    joiningDate: "2024-05-10"
  },
  {
    id: "coach3",
    name: "Rajesh Sharma",
    username: "weightloss_coach",
    password: "Password@123",
    phone: "+91 98765 43212",
    experience: "10 Years",
    specialization: "Weight Loss & Nutrition",
    languages: ["English", "Hindi"],
    status: "Active",
    photoUrl: "https://images.unsplash.com/photo-1605296867304-46d5465a25f1?w=150&auto=format&fit=crop&q=80",
    joiningDate: "2023-08-01"
  },
  {
    id: "coach4",
    name: "Anjali Mehta",
    username: "womens_coach",
    password: "Password@123",
    phone: "+91 98765 43213",
    experience: "6 Years",
    specialization: "Women's Fitness & Mobility",
    languages: ["English", "Hindi", "Gujarati"],
    status: "Active",
    photoUrl: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=150&auto=format&fit=crop&q=80",
    joiningDate: "2024-11-20"
  },
  {
    id: "coach5",
    name: "Karan Johar",
    username: "bodybuilding_coach",
    password: "Password@123",
    phone: "+91 98765 43214",
    experience: "12 Years",
    specialization: "Bodybuilding & Muscle Gain",
    languages: ["English", "Hindi"],
    status: "Active",
    photoUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=150&auto=format&fit=crop&q=80",
    joiningDate: "2023-01-10"
  },
  {
    id: "coach6",
    name: "Demo Coach",
    username: "coach",
    email: "coach123@gmail.com",
    password: "Coach@123",
    phone: "+91 98765 00000",
    experience: "1 Year",
    specialization: "General Coaching",
    languages: ["English", "Hindi"],
    status: "Active",
    photoUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=150&auto=format&fit=crop&q=80",
    joiningDate: "2026-07-02"
  }
];

// Generate 100 Members
export const members: Member[] = [];
const generateMembers = () => {
  if (members.length > 0) return;
  
  // Custom seed data to make sure Ammar is in there as FCG1001
  members.push({
    code: "FCG1001",
    name: "Ammar Patel",
    gender: "Male",
    age: 26,
    height: 178,
    weight: 78.5,
    joiningWeight: 85.0,
    targetWeight: 72.0,
    bmi: 24.8,
    bodyFat: 18.5,
    goal: "Weight Loss",
    experience: "Intermediate",
    joiningDate: "2026-03-01",
    durationMonths: 6,
    expiryDate: "2026-09-01",
    attendanceRate: 92,
    assignedCoachId: "coach3", // Weight Loss Coach
    phone: "+91 99887 76655",
    address: "Satellite, Ahmedabad, Gujarat",
    preferredTiming: "06:00 AM - 08:00 AM",
    medicalNotes: "Slight knee soreness during heavy squats.",
    emergencyContact: "Farhan Patel (Father) - +91 99887 76600",
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    status: "Active",
    bloodGroup: "O+",
    occupation: "Software Developer",
    dob: "2000-05-12"
  });

  // Now generate remaining 99 members
  const statuses: Member["status"][] = [];
  // 70 Active, 10 Fee Due, 5 Expired, 5 Blocked, 10 Left Gym (already have 1 active Ammar)
  for (let i = 0; i < 69; i++) statuses.push("Active");
  for (let i = 0; i < 10; i++) statuses.push("Fee Due");
  for (let i = 0; i < 5; i++) statuses.push("Expired");
  for (let i = 0; i < 5; i++) statuses.push("Blocked");
  for (let i = 0; i < 10; i++) statuses.push("Left");

  // Shuffle statuses slightly to distribute
  statuses.sort(() => Math.random() - 0.5);

  for (let i = 2; i <= 100; i++) {
    const code = `FCG${1000 + i}`;
    const gender = Math.random() > 0.4 ? "Male" : "Female" as Member["gender"];
    const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
    const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${fn} ${ln}`;
    const age = Math.floor(Math.random() * 35) + 18;
    const height = gender === "Male" ? Math.floor(Math.random() * 25) + 165 : Math.floor(Math.random() * 20) + 152;
    const weight = gender === "Male" ? Math.floor(Math.random() * 40) + 65 : Math.floor(Math.random() * 30) + 48;
    const joiningWeight = weight + (Math.random() > 0.5 ? Math.floor(Math.random() * 8) + 1 : -Math.floor(Math.random() * 8) - 1);
    const targetWeight = weight + (Math.random() > 0.5 ? -Math.floor(Math.random() * 10) - 2 : Math.floor(Math.random() * 8) + 2);
    const bmi = parseFloat((weight / ((height / 100) * (height / 100))).toFixed(1));
    const bodyFat = gender === "Male" ? Math.floor(Math.random() * 15) + 10 : Math.floor(Math.random() * 18) + 18;
    const goal = goals[Math.floor(Math.random() * goals.length)];
    const experience = ["Beginner", "Intermediate", "Advanced"][Math.floor(Math.random() * 3)] as Member["experience"];
    
    // Dates
    const year = 2026;
    const month = Math.floor(Math.random() * 6) + 1; // Jan to Jun
    const day = Math.floor(Math.random() * 28) + 1;
    const joiningDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const durationMonths = [1, 3, 6, 12][Math.floor(Math.random() * 4)];
    
    const expiryMonth = (month + durationMonths);
    const expiryYear = expiryMonth > 12 ? year + 1 : year;
    const expM = expiryMonth > 12 ? expiryMonth - 12 : expiryMonth;
    const expiryDate = `${expiryYear}-${expM.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
    const status = statuses[i - 2];
    const attendanceRate = status === "Active" ? Math.floor(Math.random() * 30) + 65 : status === "Left" ? 0 : Math.floor(Math.random() * 40) + 20;
    
    // Assign coach based on goal/specialization
    let assignedCoachId = "coach1"; // default
    if (goal.includes("Strength") || goal.includes("Powerlifting")) assignedCoachId = "coach1";
    else if (goal.includes("Cardio") || goal.includes("HIIT")) assignedCoachId = "coach2";
    else if (goal.includes("Loss") || goal.includes("Diet")) assignedCoachId = "coach3";
    else if (gender === "Female" && Math.random() > 0.4) assignedCoachId = "coach4";
    else if (goal.includes("Bodybuilding") || goal.includes("Muscle") || goal.includes("Gain")) assignedCoachId = "coach5";
    else assignedCoachId = coaches[Math.floor(Math.random() * coaches.length)].id;

    const phone = `+91 ${Math.floor(Math.random() * 90000) + 10000} ${Math.floor(Math.random() * 90000) + 10000}`;
    const address = `${["C.G. Road", "Vastrapur", "Prahladnagar", "Bodakdev", "Bopal", "Ghatlodia"][Math.floor(Math.random() * 6)]}, Ahmedabad`;
    const preferredTiming = timings[Math.floor(Math.random() * timings.length)];
    const medicalNotes = medicalConditionsList[Math.floor(Math.random() * medicalConditionsList.length)];
    const emergencyContact = `Family Contact - +91 ${Math.floor(Math.random() * 90000) + 10000} ${Math.floor(Math.random() * 90000) + 10000}`;
    
    // Photo selection
    const malePhotos = [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80"
    ];
    const femalePhotos = [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    ];
    const photoUrl = gender === "Male" 
      ? malePhotos[Math.floor(Math.random() * malePhotos.length)] 
      : femalePhotos[Math.floor(Math.random() * femalePhotos.length)];

    const bloodGroup = bloodGroups[Math.floor(Math.random() * bloodGroups.length)];
    const occupation = occupations[Math.floor(Math.random() * occupations.length)];
    const dob = `${year - age}-06-15`;

    members.push({
      code,
      name,
      gender,
      age,
      height,
      weight,
      joiningWeight,
      targetWeight,
      bmi,
      bodyFat,
      goal,
      experience,
      joiningDate,
      durationMonths,
      expiryDate,
      attendanceRate,
      assignedCoachId,
      phone,
      address,
      preferredTiming,
      medicalNotes,
      emergencyContact,
      photoUrl,
      status,
      bloodGroup,
      occupation,
      dob
    });
  }
};
generateMembers();

// Create 45 Gym Machines
export const machines: Machine[] = [
  { id: "m1", name: "Dumbbell Rack (2.5kg - 50kg)", category: "Strength", status: "Available", targetMuscle: "Full Body", imageUrl: "https://images.unsplash.com/photo-1637666062717-1c6bcfa4a4df?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-01-01", maintenanceDate: "2026-06-01", notes: "All dumbbells in good condition." },
  { id: "m2", name: "Incline Bench Press Station", category: "Strength", status: "Available", targetMuscle: "Chest", imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-01-05", maintenanceDate: "2026-05-15", notes: "Upholstery cleaned." },
  { id: "m3", name: "Flat Bench Press Station", category: "Strength", status: "Available", targetMuscle: "Chest", imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-01-05", maintenanceDate: "2026-05-15", notes: "" },
  { id: "m4", name: "Decline Bench Press Station", category: "Strength", status: "Available", targetMuscle: "Chest", imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-01-05", maintenanceDate: "2026-05-15", notes: "" },
  { id: "m5", name: "Cable Crossover Machine", category: "Strength", status: "Available", targetMuscle: "Chest", imageUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-02-12", maintenanceDate: "2026-06-10", notes: "Pulleys lubricated." },
  { id: "m6", name: "Pec Deck Fly Machine", category: "Strength", status: "Available", targetMuscle: "Chest", imageUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-02-15", maintenanceDate: "2026-04-20", notes: "" },
  { id: "m7", name: "Treadmill Pro-Series 1", category: "Cardio", status: "Available", targetMuscle: "Cardio", imageUrl: "https://images.unsplash.com/photo-1578762560072-46cf15e00fb4?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-01-10", maintenanceDate: "2026-06-25", notes: "Software updated." },
  { id: "m8", name: "Treadmill Pro-Series 2", category: "Cardio", status: "Available", targetMuscle: "Cardio", imageUrl: "https://images.unsplash.com/photo-1578762560072-46cf15e00fb4?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-01-10", maintenanceDate: "2026-06-25", notes: "" },
  { id: "m9", name: "Treadmill Pro-Series 3", category: "Cardio", status: "Maintenance", targetMuscle: "Cardio", imageUrl: "https://images.unsplash.com/photo-1578762560072-46cf15e00fb4?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-01-10", maintenanceDate: "2026-07-01", notes: "Belt being replaced. Belt slipping. ETA July 5." },
  { id: "m10", name: "Elliptical Trainer 1", category: "Cardio", status: "Available", targetMuscle: "Cardio", imageUrl: "https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-01-12", maintenanceDate: "2026-05-18", notes: "" },
  { id: "m11", name: "Elliptical Trainer 2", category: "Cardio", status: "Available", targetMuscle: "Cardio", imageUrl: "https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-01-12", maintenanceDate: "2026-05-18", notes: "" },
  { id: "m12", name: "Spin Bike 1", category: "Cardio", status: "Available", targetMuscle: "Cardio", imageUrl: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-03-01", maintenanceDate: "2026-06-15", notes: "" },
  { id: "m13", name: "Spin Bike 2", category: "Cardio", status: "Available", targetMuscle: "Cardio", imageUrl: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-03-01", maintenanceDate: "2026-06-15", notes: "" },
  { id: "m14", name: "Spin Bike 3", category: "Cardio", status: "Unavailable", targetMuscle: "Cardio", imageUrl: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-03-01", maintenanceDate: "2026-07-02", notes: "Pedal thread stripped. Waiting for parts." },
  { id: "m15", name: "Rowing Machine", category: "Cardio", status: "Available", targetMuscle: "Cardio", imageUrl: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-04-10", maintenanceDate: "2026-05-20", notes: "" },
  { id: "m16", name: "Smith Machine", category: "Strength", status: "Available", targetMuscle: "Full Body", imageUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-01-20", maintenanceDate: "2026-06-12", notes: "" },
  { id: "m17", name: "Leg Press Machine (45 degree)", category: "Strength", status: "Available", targetMuscle: "Legs", imageUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-01-22", maintenanceDate: "2026-06-18", notes: "" },
  { id: "m18", name: "Hack Squat Machine", category: "Strength", status: "Maintenance", targetMuscle: "Legs", imageUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-05-15", maintenanceDate: "2026-06-30", notes: "Roller bearings worn. Locked for safety." },
  { id: "m19", name: "Leg Extension Machine", category: "Strength", status: "Available", targetMuscle: "Legs", imageUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-01-25", maintenanceDate: "2026-05-10", notes: "" },
  { id: "m20", name: "Lying Leg Curl Machine", category: "Strength", status: "Available", targetMuscle: "Legs", imageUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-01-25", maintenanceDate: "2026-05-10", notes: "" },
  { id: "m21", name: "Seated Calf Raise Machine", category: "Strength", status: "Available", targetMuscle: "Legs", imageUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-02-05", maintenanceDate: "2026-04-15", notes: "" },
  { id: "m22", name: "Lat Pulldown Station 1", category: "Strength", status: "Available", targetMuscle: "Back", imageUrl: "https://images.unsplash.com/photo-1623874514711-0f321305f318?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-01-15", maintenanceDate: "2026-06-05", notes: "" },
  { id: "m23", name: "Lat Pulldown Station 2", category: "Strength", status: "Available", targetMuscle: "Back", imageUrl: "https://images.unsplash.com/photo-1623874514711-0f321305f318?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-01-15", maintenanceDate: "2026-06-05", notes: "" },
  { id: "m24", name: "Seated Cable Row Station", category: "Strength", status: "Available", targetMuscle: "Back", imageUrl: "https://images.unsplash.com/photo-1623874514711-0f321305f318?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-01-18", maintenanceDate: "2026-06-08", notes: "" },
  { id: "m25", name: "T-Bar Row Machine", category: "Strength", status: "Available", targetMuscle: "Back", imageUrl: "https://images.unsplash.com/photo-1623874514711-0f321305f318?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-02-28", maintenanceDate: "2026-04-12", notes: "" },
  { id: "m26", name: "Power Cage / Squat Rack 1", category: "Strength", status: "Available", targetMuscle: "Legs", imageUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-01-08", maintenanceDate: "2026-06-15", notes: "" },
  { id: "m27", name: "Power Cage / Squat Rack 2", category: "Strength", status: "Available", targetMuscle: "Legs", imageUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-01-08", maintenanceDate: "2026-06-15", notes: "" },
  { id: "m28", name: "Olympic Deadlift Platform", category: "Strength", status: "Available", targetMuscle: "Full Body", imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-01-10", maintenanceDate: "2026-06-20", notes: "Rubber tiles checked." },
  { id: "m29", name: "Assisted Pull-up / Dip Station", category: "Strength", status: "Available", targetMuscle: "Full Body", imageUrl: "https://images.unsplash.com/photo-1623874514711-0f321305f318?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-02-10", maintenanceDate: "2026-05-14", notes: "" },
  { id: "m30", name: "Preacher Curl Bench Station", category: "Strength", status: "Available", targetMuscle: "Arms", imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-01-30", maintenanceDate: "2026-04-18", notes: "" },
  { id: "m31", name: "Tricep Pushdown Machine", category: "Strength", status: "Available", targetMuscle: "Arms", imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-02-18", maintenanceDate: "2026-05-22", notes: "" },
  { id: "m32", name: "Seated Shoulder Press Machine", category: "Strength", status: "Available", targetMuscle: "Shoulders", imageUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-02-01", maintenanceDate: "2026-05-02", notes: "" },
  { id: "m33", name: "Lateral Raise Machine", category: "Strength", status: "Available", targetMuscle: "Shoulders", imageUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-03-10", maintenanceDate: "2026-05-10", notes: "" },
  { id: "m34", name: "Kettlebell Set (4kg - 32kg)", category: "Functional", status: "Available", targetMuscle: "Full Body", imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-01-10", maintenanceDate: "2026-06-01", notes: "" },
  { id: "m35", name: "Battle Ropes Station", category: "Functional", status: "Available", targetMuscle: "Full Body", imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-04-15", maintenanceDate: "2026-05-01", notes: "" },
  { id: "m36", name: "Plyo Box Set (3-in-1 Soft Box)", category: "Functional", status: "Available", targetMuscle: "Legs", imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-05-01", maintenanceDate: "2026-05-01", notes: "" },
  { id: "m37", name: "TRX Suspension Trainer", category: "Functional", status: "Available", targetMuscle: "Full Body", imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-03-15", maintenanceDate: "2026-05-01", notes: "" },
  { id: "m38", name: "Stairmaster / StepMill", category: "Cardio", status: "Available", targetMuscle: "Cardio", imageUrl: "https://images.unsplash.com/photo-1578762560072-46cf15e00fb4?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-06-01", maintenanceDate: "2026-06-01", notes: "" },
  { id: "m39", name: "Air Bike (Assault Bike)", category: "Cardio", status: "Available", targetMuscle: "Cardio", imageUrl: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-06-05", maintenanceDate: "2026-06-05", notes: "" },
  { id: "m40", name: "Roman Chair / Back Extension", category: "Strength", status: "Available", targetMuscle: "Back", imageUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-01-30", maintenanceDate: "2026-04-10", notes: "" },
  { id: "m41", name: "AB Coaster / Abdominal Machine", category: "Strength", status: "Available", targetMuscle: "Abs", imageUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-02-20", maintenanceDate: "2026-04-10", notes: "" },
  { id: "m42", name: "Punching Bag & Boxing Zone", category: "Functional", status: "Available", targetMuscle: "Full Body", imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&auto=format&fit=crop&q=60", purchaseDate: "2024-07-01", maintenanceDate: "2026-06-01", notes: "" }
];

// Generate 250+ exercises in an library programmatically
export const exerciseLibrary: Exercise[] = [];

const muscleGroups: Exercise["targetMuscle"][] = ["Chest", "Back", "Legs", "Shoulders", "Arms", "Abs", "Cardio", "Full Body"];
const exerciseTemplates: { [key: string]: { name: string; machine: string; instructions: string[]; tips: string; mistake: string; repEx: string }[] } = {
  "Chest": [
    { name: "Incline Bench Press", machine: "Incline Bench Press Station", instructions: ["Unrack barbell", "Lower bar to upper chest", "Push bar up locked"], tips: "Keep shoulder blades squeezed together.", mistake: "Bouncing the bar off your chest.", repEx: "Dumbbell Incline Press" },
    { name: "Flat Bench Press", machine: "Flat Bench Press Station", instructions: ["Lay flat on bench", "Lower bar to mid chest", "Press upwards"], tips: "Drive feet into the floor.", mistake: "Flaring elbows out 90 degrees.", repEx: "Flat Dumbbell Press" },
    { name: "Decline Bench Press", machine: "Decline Bench Press Station", instructions: ["Secure feet in rollers", "Lower bar to lower chest", "Press up"], tips: "Focus on lower pec squeeze.", mistake: "Arching back excessively.", repEx: "Decline Dumbbell Press" },
    { name: "Cable Crossover Fly", machine: "Cable Crossover Machine", instructions: ["Grab pulleys", "Bring hands together in front", "Return under control"], tips: "Keep a slight bend in your elbows.", mistake: "Using too much body momentum.", repEx: "Pec Deck Fly" },
    { name: "Pec Deck Chest Fly", machine: "Pec Deck Fly Machine", instructions: ["Sit tall on pad", "Squeeze handles together", "Control path back"], tips: "Align seat so handles are at chest height.", mistake: "Letting weights slam on stack.", repEx: "Cable Fly" },
    { name: "Dumbbell Pullover", machine: "Dumbbell Rack (2.5kg - 50kg)", instructions: ["Lie across flat bench", "Extend dumbbell overhead", "Lower behind head, pull back"], tips: "Keep core tight throughout.", mistake: "Bending elbows too much.", repEx: "Cable Pullover" }
  ],
  "Back": [
    { name: "Lat Pulldown (Wide Grip)", machine: "Lat Pulldown Station 1", instructions: ["Sit at station", "Pull bar to collarbone", "Release slowly"], tips: "Lead the movement with your elbows.", mistake: "Leaning back too far.", repEx: "Assisted Pull-ups" },
    { name: "Seated Cable Row", machine: "Seated Cable Row Station", instructions: ["Place feet on plates", "Pull handle to abdomen", "Stretch back"], tips: "Keep your spine neutral.", mistake: "Shrugging shoulders up.", repEx: "Dumbbell Single Arm Row" },
    { name: "T-Bar Row", machine: "T-Bar Row Machine", instructions: ["Stand on platform", "Hinge at hips, pull bar", "Lower slowly"], tips: "Squeeze lats at the top.", mistake: "Rounding lower back.", repEx: "Seated Cable Row" },
    { name: "Barbell Deadlift", machine: "Olympic Deadlift Platform", instructions: ["Stand feet hip-width", "Hinge, grip bar", "Stand tall locking hips"], tips: "Keep bar close to shins.", mistake: "Rounding spine.", repEx: "Smith Machine Deadlift" },
    { name: "Assisted Pull-up", machine: "Assisted Pull-up / Dip Station", instructions: ["Place knees on pad", "Pull chest to bar", "Lower to full extension"], tips: "Focus on pulling shoulders down.", mistake: "Dropping down too fast.", repEx: "Lat Pulldown" },
    { name: "Roman Chair Extension", machine: "Roman Chair / Back Extension", instructions: ["Secure ankles", "Hinge from hips", "Raise torso to straight line"], tips: "Squeeze glutes at peak.", mistake: "Hyperextending spine.", repEx: "Good Mornings" }
  ],
  "Legs": [
    { name: "Barbell Back Squat", machine: "Power Cage / Squat Rack 1", instructions: ["Rack barbell on upper traps", "Sit back, hips below knees", "Drive up to stand"], tips: "Keep knees in line with toes.", mistake: "Heels lifting off floor.", repEx: "Leg Press" },
    { name: "Leg Press (45 Degree)", machine: "Leg Press Machine (45 degree)", instructions: ["Sit, place feet on sled", "Lower sled towards chest", "Push up, don't lock knees"], tips: "Push through your heels.", mistake: "Locking knees completely.", repEx: "Hack Squat" },
    { name: "Hack Squat", machine: "Hack Squat Machine", instructions: ["Place shoulders under pads", "Lower hips down", "Press back to top"], tips: "Maintain flat back on pad.", mistake: "Half reps.", repEx: "Leg Press" },
    { name: "Leg Extension", machine: "Leg Extension Machine", instructions: ["Sit, shins behind roller", "Extend legs fully", "Return slowly"], tips: "Squeeze quads at top lock.", mistake: "Swinging legs dynamically.", repEx: "Goblet Squats" },
    { name: "Lying Leg Curl", machine: "Lying Leg Curl Machine", instructions: ["Lie face down", "Curl roller to glutes", "Return under control"], tips: "Keep hips pressed into pad.", mistake: "Arching lower back.", repEx: "Romanian Deadlift" },
    { name: "Seated Calf Raise", machine: "Seated Calf Raise Machine", instructions: ["Sit, pads on thighs", "Drop heels, press up on toes", "Hold peak squeeze"], tips: "Get a full stretch at bottom.", mistake: "Bouncing weights.", repEx: "Standing Calf Raise" }
  ],
  "Shoulders": [
    { name: "Seated Shoulder Press", machine: "Seated Shoulder Press Machine", instructions: ["Adjust seat, grip handles", "Press overhead", "Lower to ear level"], tips: "Keep core engaged.", mistake: "Arching lower back.", repEx: "Dumbbell Overhead Press" },
    { name: "Machine Lateral Raise", machine: "Lateral Raise Machine", instructions: ["Sit, elbows against pads", "Raise arms to parallel", "Lower slowly"], tips: "Lead with your elbows.", mistake: "Using wrist strength.", repEx: "Dumbbell Side Lateral Raise" },
    { name: "Dumbbell Shoulder Press", machine: "Dumbbell Rack (2.5kg - 50kg)", instructions: ["Sit on high back bench", "Press dumbbells overhead", "Lower to shoulder height"], tips: "Control the path.", mistake: "Letting dumbbells click at top.", repEx: "Barbell Military Press" },
    { name: "Dumbbell Side Lateral Raise", machine: "Dumbbell Rack (2.5kg - 50kg)", instructions: ["Stand, arms at sides", "Raise out to shoulder level", "Control path down"], tips: "Pour imaginary water at top.", mistake: "Swinging hips.", repEx: "Cable Lateral Raise" },
    { name: "Face Pulls", machine: "Cable Crossover Machine", instructions: ["Rope attachment high", "Pull to nose, flare elbows", "Return slowly"], tips: "Squeeze rear delts.", mistake: "Pulling with biceps.", repEx: "Reverse Pec Deck Fly" }
  ],
  "Arms": [
    { name: "Preacher EZ Bar Curl", machine: "Preacher Curl Bench Station", instructions: ["Rest arms on pad", "Curl EZ bar to face", "Lower to slight bend"], tips: "Keep armpits glued to pad.", mistake: "Lifting hips off bench.", repEx: "Dumbbell Hammer Curl" },
    { name: "Cable Tricep Pushdown", machine: "Tricep Pushdown Machine", instructions: ["Grip bar/rope", "Extend arms down locked", "Bring hands back to chest"], tips: "Keep elbows tucked in sides.", mistake: "Moving elbows back and forth.", repEx: "Overhead Dumbbell Extension" },
    { name: "Dumbbell Bicep Curl", machine: "Dumbbell Rack (2.5kg - 50kg)", instructions: ["Hold weights at side", "Curl up, rotating palms up", "Lower under control"], tips: "Squeeze biceps at peak.", mistake: "Swinging elbows forward.", repEx: "EZ Bar Bicep Curl" },
    { name: "Dumbbell Hammer Curl", machine: "Dumbbell Rack (2.5kg - 50kg)", instructions: ["Hold weights neutral grip", "Curl up keeping neutral", "Lower slowly"], tips: "Hits brachialis muscle.", mistake: "Using body swing.", repEx: "Preacher Curl" },
    { name: "Tricep Overhead Extension", machine: "Dumbbell Rack (2.5kg - 50kg)", instructions: ["Sit, hold dumbbell overhead", "Lower behind head", "Press back up"], tips: "Point elbows forward.", mistake: "Flaring elbows wide.", repEx: "Cable Overhead Extension" }
  ],
  "Abs": [
    { name: "Cable Ab Crunch", machine: "Cable Crossover Machine", instructions: ["Kneel, hold rope behind neck", "Crunch down pulling ribs to hips", "Return slowly"], tips: "Focus on spinal flexion.", mistake: "Pulling with arms.", repEx: "Floor Crunches" },
    { name: "Machine Ab Crunch", machine: "AB Coaster / Abdominal Machine", instructions: ["Secure knees", "Pull knees up using abs", "Lower under control"], tips: "Keep lower abs engaged.", mistake: "Swinging legs fast.", repEx: "Hanging Leg Raises" },
    { name: "Hanging Leg Raise", machine: "Assisted Pull-up / Dip Station", instructions: ["Hang from handles", "Raise legs to parallel", "Lower without swing"], tips: "Don't swing your torso.", mistake: "Using hip flexors only.", repEx: "Lying Leg Raises" }
  ],
  "Cardio": [
    { name: "Incline Treadmill Walk", machine: "Treadmill Pro-Series 1", instructions: ["Set incline to 8-12%", "Set speed to 4.5-6 km/h", "Walk maintaining posture"], tips: "Do not hold onto handrails.", mistake: "Hunching forward.", repEx: "Elliptical Trainer" },
    { name: "Elliptical Cardio", machine: "Elliptical Trainer 1", instructions: ["Step on pedals", "Select resistance level", "Pedal smoothly"], tips: "Keep heels flat.", mistake: "Relying purely on arms.", repEx: "Spin Bike Workout" },
    { name: "Slam-Spin Cycling", machine: "Spin Bike 1", instructions: ["Adjust seat height", "Pedal fast intervals", "Increase resistance"], tips: "Keep core tight.", mistake: "Seat height too low.", repEx: "Treadmill Run" },
    { name: "Stair Climber Interval", machine: "Stairmaster / StepMill", instructions: ["Set step speed", "Climb with straight back", "Use full foot contact"], tips: "Drive through heels.", mistake: "Leaning heavily on handles.", repEx: "Elliptical Trainer" }
  ],
  "Full Body": [
    { name: "Kettlebell Swing", machine: "Kettlebell Set (4kg - 32kg)", instructions: ["Hinge hips, grip handle", "Swing between legs", "Snap hips forward to eye level"], tips: "It is a hip hinge, not a squat.", mistake: "Using shoulder raise strength.", repEx: "Dumbbell Thrusters" },
    { name: "Battle Rope Slams", machine: "Battle Ropes Station", instructions: ["Half squat stance", "Raise ropes overhead", "Slam down hard"], tips: "Coordinate with hip drive.", mistake: "Standing too stiffly.", repEx: "Burpees" },
    { name: "TRX Bodyweight Rows", machine: "TRX Suspension Trainer", instructions: ["Lean back, hold handles", "Keep body in straight plank", "Pull chest to hands"], tips: "Squeeze shoulder blades.", mistake: "Sagging hips.", repEx: "Barbell Rows" },
    { name: "Boxing Bag Heavy Combos", machine: "Punching Bag & Boxing Zone", instructions: ["Get in boxing stance", "Throw jab-cross-hook", "Keep hands up to guard"], tips: "Pivot hips with punches.", mistake: "Dropping guard.", repEx: "Battle Ropes" }
  ]
};

const difficulties: Exercise["difficulty"][] = ["Beginner", "Intermediate", "Advanced"];

const populateExerciseLibrary = () => {
  if (exerciseLibrary.length > 0) return;
  
  let idCounter = 1;
  
  // Create 250+ exercises by duplicating the templates with slight variations
  // (e.g. Level variations, weight focus, tempo variations, single/double arm)
  // to ensure we have a massive realistic library.
  muscleGroups.forEach((muscle) => {
    const templates = exerciseTemplates[muscle] || [];
    
    // Create base templates
    templates.forEach((t) => {
      exerciseLibrary.push({
        id: `ex${idCounter++}`,
        name: t.name,
        imageUrl: `https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=150&auto=format&fit=crop&q=80`,
        machineRequired: t.machine,
        targetMuscle: muscle,
        difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
        instructions: t.instructions,
        coachTips: t.tips,
        commonMistakes: t.mistake,
        replacementExercise: t.repEx,
        estimatedCalories: Math.floor(Math.random() * 80) + 40
      });
    });

    // Create variations to bulk up to 250+
    for (let v = 1; v <= 25; v++) {
      templates.forEach((t) => {
        const difficulty = difficulties[v % 3];
        const suffix = ["(Volume Plan)", "(Tempo 4-0-1-0)", "(Unilateral)", "(Isometric Hold)", "(Peak Contrast)"][v % 5];
        
        exerciseLibrary.push({
          id: `ex${idCounter++}`,
          name: `${t.name} ${suffix}`,
          imageUrl: `https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=150&auto=format&fit=crop&q=80`,
          machineRequired: t.machine,
          targetMuscle: muscle,
          difficulty,
          instructions: [...t.instructions, `Variation focus: Keep tempo focused on time under tension.`],
          coachTips: `${t.tips} Focus on the ${difficulty} target variation.`,
          commonMistakes: t.mistake,
          replacementExercise: t.name,
          estimatedCalories: Math.floor(Math.random() * 90) + 30
        });
      });
    }
  });

  // Limit to exactly 260 exercises to satisfy "250+ exercises" requirement
  exerciseLibrary.length = Math.min(exerciseLibrary.length, 260);
};
populateExerciseLibrary();

// Generate 20 Transformations
export const transformations: Transformation[] = Array.from({ length: 20 }).map((_, index) => {
  const firstNamesList = ["Aarav", "Pooja", "Vikram", "Sneha", "Karan", "Nisha", "Aditya", "Rohan", "Anjali", "Kabir", "Neha", "Rahul", "Priya", "Sunita", "Harsh", "Simran", "Amit", "Tanvi", "Siddharth", "Reema"];
  const name = firstNamesList[index % firstNamesList.length] + " " + lastNames[index % lastNames.length];
  const weightBefore = Math.floor(Math.random() * 30) + 85;
  const weightAfter = weightBefore - (Math.floor(Math.random() * 15) + 8);
  const durationWeeks = [12, 16, 24][index % 3];
  const goal = ["Fat Loss", "Lean Muscle", "Muscle Gain", "Body Transformation"][index % 4];
  
  return {
    id: `trans_${index + 1}`,
    name,
    beforeImageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&auto=format&fit=crop&q=60",
    afterImageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&auto=format&fit=crop&q=60",
    weightBefore,
    weightAfter,
    durationWeeks,
    goal,
    story: `Joined Fitness Corner Gym with the goal of ${goal.toLowerCase()}. Under structured coaching and strict diet plans, lost ${weightBefore - weightAfter} kg. Consistency and discipline made it possible!`
  };
});

// Generate 20 Testimonials
export const testimonials: Testimonial[] = Array.from({ length: 20 }).map((_, index) => {
  const commentList = [
    "Amazing gym! Highly qualified trainers and premium luxury machines.",
    "Best gym in Ahmedabad. Clean, dark atmosphere feels very focus-driven.",
    "The workout & diet engine on the app makes it so easy to follow daily schedules.",
    "Coach Vikram helped me hit my personal deadlift record. Highly recommended!",
    "Love the premium PWA interface. Scanning attendance QR is super smooth.",
    "Great community, professional environment, clean changing rooms.",
    "I've tried many gyms, but the equipment here is top tier. Zero clutter.",
    "Affordable prices and world-class guidance.",
    "Ammar's transformation story inspired me to join. Fitness Corner Gym is the best!",
    "Clean water, great sound system, luxury black-gold design. 5/5 stars."
  ];

  const firstNamesList = ["Avan", "Deepak", "Aarav", "Meera", "Asha", "Dev", "Raj", "Pooja", "Vikram", "Sneha"];
  const name = firstNamesList[index % firstNamesList.length] + " " + lastNames[index % lastNames.length];
  const rating = Math.random() > 0.3 ? 5 : 4;
  const date = `2026-06-${(index + 1).toString().padStart(2, '0')}`;
  
  return {
    id: `test_${index + 1}`,
    name,
    rating,
    comment: commentList[index % commentList.length],
    date,
    profileImageUrl: `https://images.unsplash.com/photo-${1500000000000 + index * 100000}?w=100&auto=format&fit=crop&q=80`
  };
});

// Generate 60 Gallery Image URLs in different categories
export const gallery: { id: string; category: string; imageUrl: string; title: string }[] = Array.from({ length: 60 }).map((_, index) => {
  const categories = ["Gym", "Machines", "Transformations", "Events", "Coaches", "Members"];
  const category = categories[index % categories.length];
  
  const urls: { [key: string]: string[] } = {
    "Gym": [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&auto=format&fit=crop&q=80"
    ],
    "Machines": [
      "https://images.unsplash.com/photo-1570530202809-54b423f7ecdb?w=500&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=500&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1637666062717-1c6bcfa4a4df?w=500&auto=format&fit=crop&q=80"
    ],
    "Transformations": [
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=80"
    ],
    "Events": [
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500&auto=format&fit=crop&q=80"
    ],
    "Coaches": [
      "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=500&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=500&auto=format&fit=crop&q=80"
    ],
    "Members": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=500&auto=format&fit=crop&q=80"
    ]
  };

  const pool = urls[category] || urls["Gym"];
  const imageUrl = pool[index % pool.length];

  return {
    id: `gal_${index + 1}`,
    category,
    imageUrl,
    title: `${category} Shoot #${Math.floor(index / 6) + 1}`
  };
});

// Generate 90 days of attendance for each member
export const attendanceRecords: AttendanceRecord[] = [];

// Populate attendance records (programmatic)
// To keep memory usage and serialization within bounds, we generate attendance logs 
// on-the-fly or populate a core history of last 90 days. We'll populate a set of records 
// for the first 10 members in detail, and mock analytics overall stats.
export const populateAttendanceLogs = () => {
  if (attendanceRecords.length > 0) return;
  
  const today = new Date();
  for (let d = 0; d < 90; d++) {
    const current = new Date();
    current.setDate(today.getDate() - d);
    const dateStr = current.toISOString().split("T")[0];
    
    // Gym is closed on Sundays (Holiday)
    const isSunday = current.getDay() === 0;
    
    // For FCG1001 to FCG1010
    for (let m = 1; m <= 10; m++) {
      const code = `FCG${1000 + m}`;
      const member = members.find((x) => x.code === code);
      if (!member || member.status === "Left") continue;

      if (isSunday) {
        attendanceRecords.push({
          id: `att_${code}_${dateStr}`,
          memberCode: code,
          date: dateStr,
          status: "Holiday"
        });
        continue;
      }

      // Member attends based on their rate
      const rand = Math.random() * 100;
      if (rand <= (member.attendanceRate || 80)) {
        const isLate = Math.random() > 0.85;
        const status = isLate ? "Late Entry" as const : "Present" as const;
        const hour = isLate ? 8 : [6, 7][Math.floor(Math.random() * 2)];
        const min = Math.floor(Math.random() * 60).toString().padStart(2, '0');
        const ampm = "AM";
        
        attendanceRecords.push({
          id: `att_${code}_${dateStr}`,
          memberCode: code,
          date: dateStr,
          status,
          time: `${hour}:${min} ${ampm}`
        });
      } else {
        attendanceRecords.push({
          id: `att_${code}_${dateStr}`,
          memberCode: code,
          date: dateStr,
          status: "Absent"
        });
      }
    }
  }
};
populateAttendanceLogs();

// Announcements
export const announcements: Announcement[] = [
  { id: "a1", title: "Sunday Seminar on Nutrition", message: "Join Coach Rajesh this Sunday at 10:00 AM for an exclusive seminar on High Protein Diet Planning and Fat Loss.", priority: "High", target: "Everyone", createdAt: "2026-07-01" },
  { id: "a2", title: "New Dumbbell Racks Installed", message: "We have added a brand new commercial dumbbell rack from 2.5kg up to 50kg in the strength section.", priority: "Medium", target: "Everyone", createdAt: "2026-06-28" },
  { id: "a3", title: "Gym Timings on Independence Day", message: "Please note the gym will remain open only in the morning shift (6:00 AM to 12:00 PM) on August 15th.", priority: "High", target: "Everyone", createdAt: "2026-06-25" }
];

// Master Diet Plan Builder Templates
export const dietPlans = {
  "Weight Loss": {
    calories: 1600, protein: 120, carbs: 150, fat: 40, water: 3.5,
    breakfast: { meal: "Oats with Scoop Whey & Berries", calories: 400, protein: 30, carbs: 45, fat: 8, alternate: "Egg White Omelet with Whole Wheat Toast" },
    snack: { meal: "Apple with 10 Almonds", calories: 150, protein: 3, carbs: 20, fat: 7, alternate: "Cucumber slices with Hummus" },
    lunch: { meal: "Grilled Chicken Salad or Tofu with Broccoli & Brown Rice", calories: 450, protein: 35, carbs: 40, fat: 12, alternate: "Paneer Bhurji with 1 Roti and Salad" },
    eveningSnack: { meal: "Green Tea & Roasted Chana", calories: 150, protein: 7, carbs: 25, fat: 2, alternate: "Boiled Egg whites (3)" },
    dinner: { meal: "Baked Fish or Soy chunks with mixed vegetables sauté", calories: 350, protein: 35, carbs: 15, fat: 9, alternate: "Dal Soup with Sautéed Mushroom" },
    beforeSleep: { meal: "Warm Milk with Cinnamon", calories: 100, protein: 5, carbs: 5, fat: 2, alternate: "Chamomile Tea" }
  },
  "Muscle Gain": {
    calories: 2800, protein: 180, carbs: 350, fat: 75, water: 4.5,
    breakfast: { meal: "4 Whole Eggs, 3 Toast, Banana Shake", calories: 750, protein: 45, carbs: 90, fat: 22, alternate: "Paneer Sandwiches & Fruit Bowl" },
    snack: { meal: "Peanut Butter Sandwich & Apple", calories: 400, protein: 15, carbs: 48, fat: 18, alternate: "Greek Yogurt with Mixed Nuts" },
    lunch: { meal: "Chicken Breast (200g) with Rice & Dal", calories: 750, protein: 55, carbs: 100, fat: 15, alternate: "Soya Chunks Biryani with Curd" },
    eveningSnack: { meal: "Whey Protein, Handful of Cashews, 2 Bananas", calories: 450, protein: 30, carbs: 60, fat: 10, alternate: "Paneer Wrap" },
    dinner: { meal: "Lean Beef or Paneer Sautéed, Sweet Potato & Broccoli", calories: 350, protein: 30, carbs: 40, fat: 8, alternate: "Chicken Pasta" },
    beforeSleep: { meal: "Casein Shake or Paneer (100g)", calories: 100, protein: 15, carbs: 2, fat: 2, alternate: "Boiled Eggs" }
  }
};

// Workout Categories list
export const workoutCategories: WorkoutCategory[] = [];

export const generateWorkoutCategories = () => {
  if (workoutCategories.length > 0) return;

  const categoryNames = [
    "Weight Loss", "Weight Gain", "Muscle Building", "Strength", "Bodybuilding", 
    "Powerlifting", "General Fitness", "Six Pack", "Women's Fitness", "Senior Fitness", 
    "Cardio", "HIIT", "Functional Training", "Beginner", "Intermediate", "Advanced", "Custom"
  ];

  const focusMap: { [key: string]: string } = {
    Monday: "Chest & Triceps Focus",
    Tuesday: "Back & Biceps Focus",
    Wednesday: "Leg Focus (Quads/Hamstrings)",
    Thursday: "Shoulder & Traps Focus",
    Friday: "Arms & Core Focus",
    Saturday: "HIIT & Cardio Conditioning",
    Sunday: "Rest & Active Recovery"
  };

  // Helper to get exercises for a focus
  const getExercisesForDay = (day: string, catName: string): WorkoutExercise[] => {
    if (day === "Sunday") return [];

    // Let's create some standard exercises based on target muscles
    const list: WorkoutExercise[] = [];
    
    if (day === "Monday") {
      list.push({
        id: `we_${catName}_mon_1`,
        name: "Flat Bench Press",
        sets: 4,
        reps: "10-12",
        restTime: "90s",
        targetMuscle: "Chest",
        machineRequired: "Flat Bench Press Station",
        difficulty: "Intermediate",
        coachNote: "Focus on controlled descent and explosive press."
      });
      list.push({
        id: `we_${catName}_mon_2`,
        name: "Pec Deck Chest Fly",
        sets: 3,
        reps: "12-15",
        restTime: "60s",
        targetMuscle: "Chest",
        machineRequired: "Pec Deck Fly Machine",
        difficulty: "Beginner",
        coachNote: "Squeeze the chest at the peak contraction."
      });
      list.push({
        id: `we_${catName}_mon_3`,
        name: "Cable Crossover Fly",
        sets: 3,
        reps: "15",
        restTime: "60s",
        targetMuscle: "Chest",
        machineRequired: "Cable Crossover Machine",
        difficulty: "Intermediate",
        coachNote: "Focus on the inner chest stretch."
      });
    } else if (day === "Tuesday") {
      list.push({
        id: `we_${catName}_tue_1`,
        name: "Lat Pulldown (Wide Grip)",
        sets: 4,
        reps: "10-12",
        restTime: "90s",
        targetMuscle: "Back",
        machineRequired: "Lat Pulldown Station 1",
        difficulty: "Beginner",
        coachNote: "Pull using your elbows, squeeze lats at bottom."
      });
      list.push({
        id: `we_${catName}_tue_2`,
        name: "Seated Cable Row",
        sets: 3,
        reps: "12",
        restTime: "60s",
        targetMuscle: "Back",
        machineRequired: "Seated Cable Row Station",
        difficulty: "Intermediate",
        coachNote: "Keep torso upright and squeeze shoulder blades."
      });
    } else if (day === "Wednesday") {
      list.push({
        id: `we_${catName}_wed_1`,
        name: "Leg Press (45 Degree)",
        sets: 4,
        reps: "10-12",
        restTime: "90s",
        targetMuscle: "Legs",
        machineRequired: "Leg Press Machine (45 degree)",
        difficulty: "Intermediate",
        coachNote: "Keep feet flat and press through your heels."
      });
      list.push({
        id: `we_${catName}_wed_2`,
        name: "Leg Extension",
        sets: 3,
        reps: "12-15",
        restTime: "60s",
        targetMuscle: "Legs",
        machineRequired: "Leg Extension Machine",
        difficulty: "Beginner",
        coachNote: "Control the weight on the way down."
      });
      list.push({
        id: `we_${catName}_wed_3`,
        name: "Hack Squat",
        sets: 3,
        reps: "10",
        restTime: "90s",
        targetMuscle: "Legs",
        machineRequired: "Hack Squat Machine",
        difficulty: "Advanced",
        coachNote: "Go deep, maintain flat back against pads."
      });
    } else if (day === "Thursday") {
      list.push({
        id: `we_${catName}_thu_1`,
        name: "Dumbbell Shoulder Press",
        sets: 4,
        reps: "10-12",
        restTime: "90s",
        targetMuscle: "Shoulders",
        machineRequired: "Dumbbell Rack (2.5kg - 50kg)",
        difficulty: "Intermediate",
        coachNote: "Do not arch lower back when pressing."
      });
    } else if (day === "Friday") {
      list.push({
        id: `we_${catName}_fri_1`,
        name: "Dumbbell Bicep Curl",
        sets: 3,
        reps: "12",
        restTime: "60s",
        targetMuscle: "Arms",
        machineRequired: "Dumbbell Rack (2.5kg - 50kg)",
        difficulty: "Beginner",
        coachNote: "Keep elbows tucked in close to torso."
      });
      list.push({
        id: `we_${catName}_fri_2`,
        name: "Tricep Rope Pushdown",
        sets: 3,
        reps: "12-15",
        restTime: "60s",
        targetMuscle: "Arms",
        machineRequired: "Cable Crossover Machine",
        difficulty: "Beginner",
        coachNote: "Flare rope outward at the bottom of the rep."
      });
    } else if (day === "Saturday") {
      list.push({
        id: `we_${catName}_sat_1`,
        name: "Incline Treadmill Walk",
        sets: 1,
        reps: "20 Mins",
        restTime: "0s",
        targetMuscle: "Cardio",
        machineRequired: "Treadmill Pro-Series 1",
        difficulty: "Beginner",
        coachNote: "Maintain steady pace, do not hold handrails."
      });
      list.push({
        id: `we_${catName}_sat_2`,
        name: "Kettlebell Swing",
        sets: 3,
        reps: "15",
        restTime: "60s",
        targetMuscle: "Full Body",
        machineRequired: "Kettlebell Set (4kg - 32kg)",
        difficulty: "Intermediate",
        coachNote: "Hinge from the hips, squeeze glutes at top."
      });
    }

    // Adjust reps/sets slightly based on category name for realistic differences
    if (catName.includes("Strength") || catName.includes("Powerlifting")) {
      list.forEach(ex => {
        ex.sets = 5;
        ex.reps = "5";
        ex.restTime = "120s";
        ex.difficulty = "Advanced";
      });
    } else if (catName.includes("Cardio") || catName.includes("HIIT") || catName.includes("Loss")) {
      list.forEach(ex => {
        ex.sets = 3;
        ex.reps = "15-20";
        ex.restTime = "45s";
        ex.difficulty = "Beginner";
      });
    }

    return list;
  };

  const days: DailyWorkout["day"][] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  categoryNames.forEach((name, index) => {
    const dailyWorkouts: DailyWorkout[] = days.map((day) => {
      const focus = day === "Sunday" ? "Rest" : focusMap[day];
      const exercises = getExercisesForDay(day, name);
      return { day, focus, exercises };
    });

    workoutCategories.push({
      id: `cat_${index + 1}`,
      name,
      description: `${name} weekly workout planning template.`,
      dailyWorkouts
    });
  });
};

generateWorkoutCategories();
