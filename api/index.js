// api/index.ts
import express from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  familyMembers;
  healthConditions;
  riskAssessments;
  recommendations;
  healthPassports;
  chatMessages;
  currentUserId;
  currentFamilyMemberId;
  currentRiskAssessmentId;
  currentRecommendationId;
  currentHealthPassportId;
  currentChatMessageId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.familyMembers = /* @__PURE__ */ new Map();
    this.riskAssessments = /* @__PURE__ */ new Map();
    this.recommendations = /* @__PURE__ */ new Map();
    this.healthPassports = /* @__PURE__ */ new Map();
    this.chatMessages = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentFamilyMemberId = 1;
    this.currentRiskAssessmentId = 1;
    this.currentRecommendationId = 1;
    this.currentHealthPassportId = 1;
    this.currentChatMessageId = 1;
    this.healthConditions = [
      { id: 1, name: "Diabetes Type 2", category: "Metabolic", heritabilityFactor: 70, description: "Type 2 diabetes mellitus" },
      { id: 2, name: "Heart Disease", category: "Cardiovascular", heritabilityFactor: 50, description: "Coronary heart disease" },
      { id: 3, name: "Breast Cancer", category: "Cancer", heritabilityFactor: 25, description: "Breast cancer" },
      { id: 4, name: "Colon Cancer", category: "Cancer", heritabilityFactor: 35, description: "Colorectal cancer" },
      { id: 5, name: "Alzheimer's Disease", category: "Neurological", heritabilityFactor: 60, description: "Alzheimer's disease and dementia" },
      { id: 6, name: "High Blood Pressure", category: "Cardiovascular", heritabilityFactor: 40, description: "Hypertension" },
      { id: 7, name: "Stroke", category: "Cardiovascular", heritabilityFactor: 45, description: "Cerebrovascular accident" },
      { id: 8, name: "Osteoporosis", category: "Musculoskeletal", heritabilityFactor: 60, description: "Bone density loss" }
    ];
  }
  // User operations
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByEmail(email) {
    return Array.from(this.users.values()).find((user) => user.email === email);
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = {
      ...insertUser,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.users.set(id, user);
    return user;
  }
  async updateUser(id, updates) {
    const user = this.users.get(id);
    if (!user) return void 0;
    const updatedUser = {
      ...user,
      ...updates,
      lifestyle: updates.lifestyle ? {
        smokingStatus: updates.lifestyle.smokingStatus,
        exerciseLevel: updates.lifestyle.exerciseLevel,
        dietType: updates.lifestyle.dietType,
        stressLevel: updates.lifestyle.stressLevel,
        sleepQuality: updates.lifestyle.sleepQuality
      } : user.lifestyle
    };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  // Family member operations
  async getFamilyMembers(userId) {
    return Array.from(this.familyMembers.values()).filter((member) => member.userId === userId);
  }
  async getFamilyMember(id) {
    return this.familyMembers.get(id);
  }
  async createFamilyMember(insertMember) {
    const id = this.currentFamilyMemberId++;
    const member = {
      ...insertMember,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.familyMembers.set(id, member);
    return member;
  }
  async updateFamilyMember(id, updates) {
    const member = this.familyMembers.get(id);
    if (!member) return void 0;
    const updatedMember = { ...member, ...updates };
    this.familyMembers.set(id, updatedMember);
    return updatedMember;
  }
  async deleteFamilyMember(id) {
    return this.familyMembers.delete(id);
  }
  // Health conditions
  async getHealthConditions() {
    return this.healthConditions;
  }
  // Risk assessments
  async getRiskAssessments(userId) {
    return Array.from(this.riskAssessments.values()).filter((assessment) => assessment.userId === userId);
  }
  async createRiskAssessment(insertAssessment) {
    const id = this.currentRiskAssessmentId++;
    const assessment = {
      ...insertAssessment,
      id,
      lastUpdated: /* @__PURE__ */ new Date()
    };
    this.riskAssessments.set(id, assessment);
    return assessment;
  }
  async updateRiskAssessments(userId, assessments) {
    Array.from(this.riskAssessments.entries()).forEach(([id, assessment]) => {
      if (assessment.userId === userId) {
        this.riskAssessments.delete(id);
      }
    });
    const newAssessments = [];
    for (const assessment of assessments) {
      const newAssessment = await this.createRiskAssessment(assessment);
      newAssessments.push(newAssessment);
    }
    return newAssessments;
  }
  // Recommendations
  async getRecommendations(userId) {
    return Array.from(this.recommendations.values()).filter((rec) => rec.userId === userId);
  }
  async createRecommendation(insertRecommendation) {
    const id = this.currentRecommendationId++;
    const recommendation = {
      ...insertRecommendation,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.recommendations.set(id, recommendation);
    return recommendation;
  }
  async updateRecommendation(id, updates) {
    const recommendation = this.recommendations.get(id);
    if (!recommendation) return void 0;
    const updatedRecommendation = { ...recommendation, ...updates };
    this.recommendations.set(id, updatedRecommendation);
    return updatedRecommendation;
  }
  // Health passports
  async getHealthPassport(userId) {
    return Array.from(this.healthPassports.values()).find((passport) => passport.userId === userId);
  }
  async createHealthPassport(insertPassport) {
    const id = this.currentHealthPassportId++;
    const passport = {
      ...insertPassport,
      id,
      lastGenerated: /* @__PURE__ */ new Date()
    };
    this.healthPassports.set(id, passport);
    return passport;
  }
  async getHealthPassportByPassportId(passportId) {
    return Array.from(this.healthPassports.values()).find((passport) => passport.passportId === passportId);
  }
  // Chat messages
  async getChatMessages(userId) {
    return Array.from(this.chatMessages.values()).filter((msg) => msg.userId === userId);
  }
  async createChatMessage(insertMessage) {
    const id = this.currentChatMessageId++;
    const message = {
      ...insertMessage,
      id,
      timestamp: /* @__PURE__ */ new Date()
    };
    this.chatMessages.set(id, message);
    return message;
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  age: text("age").notNull(),
  gender: text("gender").notNull(),
  language: text("language").default("en"),
  medicalConditions: text("medical_conditions").array().default([]),
  lifestyle: jsonb("lifestyle").$type(),
  createdAt: timestamp("created_at").defaultNow()
});
var familyMembers = pgTable("family_members", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  relation: text("relation").notNull(),
  age: integer("age"),
  gender: text("gender"),
  medicalConditions: text("medical_conditions").array().default([]),
  lifestyle: jsonb("lifestyle").$type(),
  diagnosisAges: jsonb("diagnosis_ages").$type().default({}),
  isDeceased: boolean("is_deceased").default(false),
  createdAt: timestamp("created_at").defaultNow()
});
var healthConditions = pgTable("health_conditions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  subcategory: text("subcategory"),
  icd10Code: text("icd10_code"),
  // International Classification of Diseases codes
  heritabilityFactor: integer("heritability_factor").notNull(),
  // 0-100
  inheritancePattern: text("inheritance_pattern"),
  // "polygenic", "mendelian", "multifactorial"
  genderPrevalence: jsonb("gender_prevalence").$type(),
  typicalOnsetAge: jsonb("typical_onset_age").$type(),
  description: text("description"),
  preventionRecommendations: text("prevention_recommendations").array().default([]),
  screeningGuidelines: text("screening_guidelines").array().default([])
});
var riskAssessments = pgTable("risk_assessments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  condition: text("condition").notNull(),
  riskScore: integer("risk_score").notNull(),
  // 0-100
  riskLevel: text("risk_level").notNull(),
  // "low", "medium", "high"
  factors: jsonb("factors").$type(),
  reasoning: text("reasoning"),
  lastUpdated: timestamp("last_updated").defaultNow()
});
var recommendations = pgTable("recommendations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  type: text("type").notNull(),
  // "lifestyle", "screening", "consultation"
  title: text("title").notNull(),
  description: text("description").notNull(),
  priority: text("priority").notNull(),
  // "high", "medium", "low"
  category: text("category").notNull(),
  dueDate: text("due_date"),
  completed: boolean("completed").default(false),
  relatedCondition: text("related_condition"),
  createdAt: timestamp("created_at").defaultNow()
});
var healthPassports = pgTable("health_passports", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  passportId: text("passport_id").notNull().unique(),
  qrCode: text("qr_code"),
  shareableLink: text("shareable_link"),
  lastGenerated: timestamp("last_generated").defaultNow()
});
var chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  message: text("message").notNull(),
  response: text("response").notNull(),
  timestamp: timestamp("timestamp").defaultNow()
});
var insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true
});
var insertFamilyMemberSchema = createInsertSchema(familyMembers).omit({
  id: true,
  createdAt: true
});
var insertRiskAssessmentSchema = createInsertSchema(riskAssessments).omit({
  id: true,
  lastUpdated: true
});
var insertRecommendationSchema = createInsertSchema(recommendations).omit({
  id: true,
  createdAt: true
});
var insertHealthPassportSchema = createInsertSchema(healthPassports).omit({
  id: true,
  lastGenerated: true
});
var insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  timestamp: true
});

// shared/risk-engine.ts
var FIRST_DEGREE_RELATIONS = [
  "father",
  "mother",
  "brother",
  "sister",
  "son",
  "daughter"
];
var SECOND_DEGREE_RELATIONS = [
  "grandfather",
  "grandmother",
  "uncle",
  "aunt",
  "nephew",
  "niece",
  "half-brother",
  "half-sister",
  "grandson",
  "granddaughter"
];
var THIRD_DEGREE_RELATIONS = [
  "great-grandfather",
  "great-grandmother",
  "great-uncle",
  "great-aunt",
  "first-cousin",
  "great-nephew",
  "great-niece",
  "great-grandson",
  "great-granddaughter"
];
var CONDITION_WEIGHTS = {
  "Diabetes Type 2": {
    heritability: 0.72,
    firstDegree: 40,
    secondDegree: 20,
    thirdDegree: 8,
    ageOfOnsetMultiplier: {
      "early": 1.5,
      // Before age 45
      "typical": 1,
      // Age 45-65
      "late": 0.7
      // After age 65
    },
    genderSpecificRisk: {
      "male": 1.1,
      "female": 1
    }
  },
  "Heart Disease": {
    heritability: 0.57,
    firstDegree: 35,
    secondDegree: 18,
    thirdDegree: 7,
    ageOfOnsetMultiplier: {
      "early": 2,
      // Before age 50
      "typical": 1,
      // Age 50-70
      "late": 0.6
      // After age 70
    },
    genderSpecificRisk: {
      "male": 1.2,
      "female": 1
    }
  },
  "Breast Cancer": {
    heritability: 0.31,
    firstDegree: 45,
    secondDegree: 22,
    thirdDegree: 9,
    ageOfOnsetMultiplier: {
      "early": 2.5,
      // Before age 40
      "typical": 1,
      // Age 40-60
      "late": 0.5
      // After age 60
    },
    genderSpecificRisk: {
      "male": 0.1,
      "female": 1
    }
  },
  "Colon Cancer": {
    heritability: 0.45,
    firstDegree: 38,
    secondDegree: 19,
    thirdDegree: 8,
    ageOfOnsetMultiplier: {
      "early": 2.2,
      // Before age 45
      "typical": 1,
      // Age 45-70
      "late": 0.6
      // After age 70
    },
    genderSpecificRisk: {
      "male": 1.1,
      "female": 1
    }
  },
  "Alzheimer's Disease": {
    heritability: 0.79,
    firstDegree: 42,
    secondDegree: 21,
    thirdDegree: 8,
    ageOfOnsetMultiplier: {
      "early": 3,
      // Before age 65
      "typical": 1,
      // Age 65-80
      "late": 0.7
      // After age 80
    },
    genderSpecificRisk: {
      "male": 0.8,
      "female": 1
    }
  },
  "Hypertension": {
    heritability: 0.68,
    firstDegree: 30,
    secondDegree: 15,
    thirdDegree: 6,
    ageOfOnsetMultiplier: {
      "early": 1.8,
      "typical": 1,
      "late": 0.8
    },
    genderSpecificRisk: {
      "male": 1.1,
      "female": 1
    }
  },
  "Stroke": {
    heritability: 0.38,
    firstDegree: 32,
    secondDegree: 16,
    thirdDegree: 6,
    ageOfOnsetMultiplier: {
      "early": 2.5,
      "typical": 1,
      "late": 0.7
    },
    genderSpecificRisk: {
      "male": 1.15,
      "female": 1
    }
  },
  "Osteoporosis": {
    heritability: 0.85,
    firstDegree: 28,
    secondDegree: 14,
    thirdDegree: 5,
    ageOfOnsetMultiplier: {
      "early": 1.8,
      "typical": 1,
      "late": 1.2
    },
    genderSpecificRisk: {
      "male": 0.3,
      "female": 1
    }
  },
  "Depression": {
    heritability: 0.4,
    firstDegree: 25,
    secondDegree: 12,
    thirdDegree: 4,
    ageOfOnsetMultiplier: {
      "early": 1.5,
      "typical": 1,
      "late": 0.8
    },
    genderSpecificRisk: {
      "male": 0.7,
      "female": 1
    }
  },
  "Asthma": {
    heritability: 0.65,
    firstDegree: 35,
    secondDegree: 18,
    thirdDegree: 7,
    ageOfOnsetMultiplier: {
      "early": 1.3,
      "typical": 1,
      "late": 0.6
    },
    genderSpecificRisk: {
      "male": 1.1,
      "female": 1
    }
  }
};
function getRelationshipDegree(relation) {
  const lowerRelation = relation.toLowerCase();
  if (FIRST_DEGREE_RELATIONS.includes(lowerRelation)) return 1;
  if (SECOND_DEGREE_RELATIONS.includes(lowerRelation)) return 2;
  if (THIRD_DEGREE_RELATIONS.includes(lowerRelation)) return 3;
  return 4;
}
function classifyAgeOfOnset(condition, diagnosisAge) {
  const weights = CONDITION_WEIGHTS[condition];
  if (!weights) return "typical";
  switch (condition) {
    case "Diabetes Type 2":
      if (diagnosisAge < 45) return "early";
      if (diagnosisAge > 65) return "late";
      return "typical";
    case "Heart Disease":
      if (diagnosisAge < 50) return "early";
      if (diagnosisAge > 70) return "late";
      return "typical";
    case "Breast Cancer":
      if (diagnosisAge < 40) return "early";
      if (diagnosisAge > 60) return "late";
      return "typical";
    case "Colon Cancer":
      if (diagnosisAge < 45) return "early";
      if (diagnosisAge > 70) return "late";
      return "typical";
    case "Alzheimer's Disease":
      if (diagnosisAge < 65) return "early";
      if (diagnosisAge > 80) return "late";
      return "typical";
    default:
      return "typical";
  }
}
function standardizeMedicalCondition(condition) {
  const normalized = condition.trim();
  const standardizations = {
    "diabetes": "Diabetes Type 2",
    "diabetes type ii": "Diabetes Type 2",
    "diabetes mellitus": "Diabetes Type 2",
    "heart attack": "Heart Disease",
    "myocardial infarction": "Heart Disease",
    "high blood pressure": "Hypertension",
    "depression": "Depression",
    "alzheimer": "Alzheimer's Disease",
    "alzheimers": "Alzheimer's Disease",
    "breast ca": "Breast Cancer",
    "colon ca": "Colon Cancer",
    "stroke": "Stroke",
    "cva": "Stroke",
    "cerebrovascular accident": "Stroke"
  };
  const lowerNormalized = normalized.toLowerCase();
  return standardizations[lowerNormalized] || normalized;
}
function calculateConsanguinityRisk(familyMembers2, condition) {
  let consanguinityScore = 0;
  const paternalSide = familyMembers2.filter(
    (member) => ["father", "grandfather", "uncle"].includes(member.relation.toLowerCase()) && member.medicalConditions?.includes(condition)
  );
  const maternalSide = familyMembers2.filter(
    (member) => ["mother", "grandmother", "aunt"].includes(member.relation.toLowerCase()) && member.medicalConditions?.includes(condition)
  );
  if (paternalSide.length > 0 && maternalSide.length > 0) {
    consanguinityScore += 25;
  }
  const earlyOnsetRelatives = familyMembers2.filter((member) => {
    if (!member.medicalConditions?.includes(condition)) return false;
    if (!member.diagnosisAges || !member.diagnosisAges[condition]) return false;
    const diagnosisAge = member.diagnosisAges[condition];
    const onsetCategory = classifyAgeOfOnset(condition, diagnosisAge);
    return onsetCategory === "early";
  });
  if (earlyOnsetRelatives.length >= 2) {
    consanguinityScore += 20;
  }
  return Math.min(consanguinityScore, 50);
}
function calculateFamilyHistoryScore(condition, familyMembers2, userGender) {
  const weights = CONDITION_WEIGHTS[condition];
  if (!weights) return 0;
  const affectedMembers = familyMembers2.filter(
    (member) => member.medicalConditions?.includes(condition)
  );
  if (affectedMembers.length === 0) return 0;
  let score = 0;
  for (const member of affectedMembers) {
    const degree = getRelationshipDegree(member.relation);
    let memberScore = 0;
    switch (degree) {
      case 1:
        memberScore = weights.firstDegree;
        break;
      case 2:
        memberScore = weights.secondDegree;
        break;
      case 3:
        memberScore = weights.thirdDegree || 5;
        break;
      default:
        memberScore = 2;
    }
    if (member.diagnosisAges && member.diagnosisAges[condition]) {
      const diagnosisAge = member.diagnosisAges[condition];
      const onsetCategory = classifyAgeOfOnset(condition, diagnosisAge);
      const multiplier = weights.ageOfOnsetMultiplier?.[onsetCategory] || 1;
      memberScore *= multiplier;
    }
    if (userGender && weights.genderSpecificRisk) {
      const genderMultiplier = weights.genderSpecificRisk[userGender] || 1;
      memberScore *= genderMultiplier;
    }
    if (degree === 1 && affectedMembers.filter((m) => getRelationshipDegree(m.relation) === 1).length > 1) {
      memberScore *= 1.2;
    }
    score += memberScore;
  }
  const consanguinityRisk = calculateConsanguinityRisk(familyMembers2, condition);
  score += consanguinityRisk;
  score *= weights.heritability;
  return Math.min(score, 100);
}

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.patch("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertUserSchema.partial().parse(req.body);
      const user = await storage.updateUser(id, updates);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid update data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/users/:userId/family-members", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const familyMembers2 = await storage.getFamilyMembers(userId);
      res.json(familyMembers2);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/users/:userId/family-members", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const memberData = insertFamilyMemberSchema.parse({
        ...req.body,
        userId
      });
      const member = await storage.createFamilyMember(memberData);
      res.status(201).json(member);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid family member data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.patch("/api/family-members/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertFamilyMemberSchema.partial().parse(req.body);
      const member = await storage.updateFamilyMember(id, updates);
      if (!member) {
        return res.status(404).json({ message: "Family member not found" });
      }
      res.json(member);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid update data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.delete("/api/family-members/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteFamilyMember(id);
      if (!deleted) {
        return res.status(404).json({ message: "Family member not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/health-conditions", async (req, res) => {
    try {
      const conditions = await storage.getHealthConditions();
      res.json(conditions);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/users/:userId/risk-assessments", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const assessments = await storage.getRiskAssessments(userId);
      res.json(assessments);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/users/:userId/calculate-risks", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const user = await storage.getUser(userId);
      const familyMembers2 = await storage.getFamilyMembers(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const riskCalculations = calculateGeneticRisks(user, familyMembers2);
      const assessments = await storage.updateRiskAssessments(userId, riskCalculations);
      res.json(assessments);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/users/:userId/recommendations", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const recommendations2 = await storage.getRecommendations(userId);
      res.json(recommendations2);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/users/:userId/generate-recommendations", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const riskAssessments2 = await storage.getRiskAssessments(userId);
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const recommendations2 = generateHealthRecommendations(user, riskAssessments2);
      const savedRecommendations = [];
      for (const rec of recommendations2) {
        const saved = await storage.createRecommendation(rec);
        savedRecommendations.push(saved);
      }
      res.json(savedRecommendations);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.patch("/api/recommendations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertRecommendationSchema.partial().parse(req.body);
      const recommendation = await storage.updateRecommendation(id, updates);
      if (!recommendation) {
        return res.status(404).json({ message: "Recommendation not found" });
      }
      res.json(recommendation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid update data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/users/:userId/health-passport", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const passport = await storage.getHealthPassport(userId);
      res.json(passport);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/users/:userId/health-passport", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const passportId = `GG-${userId}-${Date.now()}`;
      const passportData = insertHealthPassportSchema.parse({
        userId,
        passportId,
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`${process.env.REPLIT_DOMAINS || "localhost:5000"}/passport/${passportId}`)}`,
        shareableLink: `${process.env.REPLIT_DOMAINS || "localhost:5000"}/passport/${passportId}`
      });
      const passport = await storage.createHealthPassport(passportData);
      res.status(201).json(passport);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid passport data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/passport/:passportId", async (req, res) => {
    try {
      const passportId = req.params.passportId;
      const passport = await storage.getHealthPassportByPassportId(passportId);
      if (!passport) {
        return res.status(404).json({ message: "Health passport not found" });
      }
      const user = await storage.getUser(passport.userId);
      const familyMembers2 = await storage.getFamilyMembers(passport.userId);
      const riskAssessments2 = await storage.getRiskAssessments(passport.userId);
      const recommendations2 = await storage.getRecommendations(passport.userId);
      res.json({
        passport,
        user,
        familyMembers: familyMembers2,
        riskAssessments: riskAssessments2,
        recommendations: recommendations2
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/users/:userId/chat-messages", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const messages = await storage.getChatMessages(userId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/users/:userId/chat", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const { message } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ message: "Message is required" });
      }
      const response = generateAIResponse(message, userId);
      const chatMessage = await storage.createChatMessage({
        userId,
        message,
        response
      });
      res.json(chatMessage);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}
function calculateGeneticRisks(user, familyMembers2) {
  const conditions = [
    "Diabetes Type 2",
    "Heart Disease",
    "Breast Cancer",
    "Colon Cancer",
    "Alzheimer's Disease",
    "Hypertension",
    "Stroke",
    "Osteoporosis",
    "Depression",
    "Asthma"
  ];
  const assessments = [];
  const standardizedFamilyMembers = familyMembers2.map((member) => ({
    ...member,
    medicalConditions: member.medicalConditions?.map(
      (condition) => standardizeMedicalCondition(condition)
    ) || []
  }));
  for (const condition of conditions) {
    let riskScore = 0;
    let familyHistoryFactor = 0;
    let lifestyleFactor = 0;
    let environmentalFactor = 0;
    let ageFactor = 0;
    familyHistoryFactor = calculateFamilyHistoryScore(condition, standardizedFamilyMembers, user.gender);
    if (user.lifestyle) {
      if (condition === "Diabetes Type 2") {
        if (user.lifestyle.exerciseLevel === "low") lifestyleFactor += 20;
        if (user.lifestyle.smokingStatus === "current") lifestyleFactor += 15;
        if (user.lifestyle.dietType === "processed") lifestyleFactor += 25;
      } else if (condition === "Heart Disease") {
        if (user.lifestyle.smokingStatus === "current") lifestyleFactor += 30;
        if (user.lifestyle.exerciseLevel === "low") lifestyleFactor += 20;
      } else if (condition === "Breast Cancer" && user.gender === "female") {
        const age2 = parseInt(user.age.split("-")[0]);
        if (age2 > 40) ageFactor += 15;
        if (age2 > 50) ageFactor += 10;
      }
    }
    environmentalFactor = 10;
    const age = parseInt(user.age.split("-")[0]);
    if (condition === "Alzheimer's Disease" && age > 60) {
      ageFactor += 25;
    }
    riskScore = Math.min(100, familyHistoryFactor + lifestyleFactor + environmentalFactor + ageFactor);
    let riskLevel = "low";
    if (riskScore >= 70) riskLevel = "high";
    else if (riskScore >= 40) riskLevel = "medium";
    let reasoning = `Risk assessment based on: `;
    const factors = [];
    if (familyHistoryFactor > 0) {
      const affectedCount = familyMembers2.filter(
        (member) => member.medicalConditions?.includes(condition)
      ).length;
      factors.push(`family history (${affectedCount} affected relative${affectedCount > 1 ? "s" : ""})`);
    }
    if (lifestyleFactor > 0) factors.push(`lifestyle factors`);
    if (ageFactor > 0) factors.push(`age-related factors`);
    reasoning += factors.join(", ");
    assessments.push({
      userId: user.id,
      condition,
      riskScore,
      riskLevel,
      factors: {
        familyHistory: familyHistoryFactor,
        lifestyle: lifestyleFactor,
        environmental: environmentalFactor,
        age: ageFactor
      },
      reasoning
    });
  }
  return assessments;
}
function generateHealthRecommendations(user, riskAssessments2) {
  const recommendations2 = [];
  for (const assessment of riskAssessments2) {
    if (assessment.riskLevel === "high") {
      if (assessment.condition === "Diabetes Type 2") {
        recommendations2.push({
          userId: user.id,
          type: "screening",
          title: "Schedule diabetes screening",
          description: "Get HbA1c and glucose tolerance tests due to high family history",
          priority: "high",
          category: "Preventive Care",
          dueDate: "Next 30 days",
          relatedCondition: assessment.condition
        });
        recommendations2.push({
          userId: user.id,
          type: "consultation",
          title: "Endocrinologist consultation",
          description: "Discuss diabetes prevention strategies and metabolic health",
          priority: "medium",
          category: "Specialist Care",
          dueDate: "Next 60 days",
          relatedCondition: assessment.condition
        });
      }
      if (assessment.condition === "Breast Cancer" && user.gender === "female") {
        recommendations2.push({
          userId: user.id,
          type: "consultation",
          title: "Genetic counseling consultation",
          description: "Discuss BRCA testing due to family cancer history",
          priority: "high",
          category: "Genetic Testing",
          dueDate: "Next 60 days",
          relatedCondition: assessment.condition
        });
        recommendations2.push({
          userId: user.id,
          type: "screening",
          title: "Enhanced breast cancer screening",
          description: "Annual mammography and consider MRI screening",
          priority: "high",
          category: "Cancer Screening",
          dueDate: "Annually",
          relatedCondition: assessment.condition
        });
      }
    }
    if (assessment.riskLevel === "medium") {
      recommendations2.push({
        userId: user.id,
        type: "lifestyle",
        title: `${assessment.condition} prevention plan`,
        description: `Lifestyle modifications to reduce your ${assessment.condition.toLowerCase()} risk`,
        priority: "medium",
        category: "Lifestyle",
        dueDate: "Ongoing",
        relatedCondition: assessment.condition
      });
    }
  }
  if (user.lifestyle?.exerciseLevel === "low") {
    recommendations2.push({
      userId: user.id,
      type: "lifestyle",
      title: "Increase physical activity",
      description: "Add 150 minutes of moderate cardio weekly and strength training 2x per week",
      priority: "medium",
      category: "Exercise",
      dueDate: "Ongoing",
      relatedCondition: null
    });
  }
  if (user.lifestyle?.smokingStatus === "current") {
    recommendations2.push({
      userId: user.id,
      type: "lifestyle",
      title: "Smoking cessation program",
      description: "Join a smoking cessation program to significantly reduce health risks",
      priority: "high",
      category: "Lifestyle",
      dueDate: "Immediate",
      relatedCondition: null
    });
  }
  return recommendations2;
}
function generateAIResponse(message, userId) {
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes("diabetes") || lowerMessage.includes("blood sugar")) {
    return "Based on your family history, you have an elevated risk for diabetes. I recommend regular monitoring with HbA1c tests every 6 months, maintaining a healthy diet low in refined sugars, and staying physically active. Would you like specific dietary recommendations?";
  }
  if (lowerMessage.includes("cancer") || lowerMessage.includes("breast")) {
    return "Your family history of cancer suggests genetic counseling would be beneficial. Early detection through regular screening is crucial. I recommend discussing BRCA testing with a genetic counselor and maintaining annual mammograms. Shall I help you find local genetic counselors?";
  }
  if (lowerMessage.includes("exercise") || lowerMessage.includes("workout")) {
    return "Regular exercise is one of the best ways to reduce genetic disease risks. I recommend 150 minutes of moderate cardio weekly plus strength training 2x per week. Start gradually and consider consulting a fitness professional for a personalized plan.";
  }
  if (lowerMessage.includes("diet") || lowerMessage.includes("nutrition")) {
    return "A healthy diet can significantly impact your genetic risk profile. Focus on whole foods, lean proteins, high-fiber vegetables, and limit processed foods. For diabetes prevention, particularly watch refined sugar intake. Would you like me to suggest specific meal planning resources?";
  }
  if (lowerMessage.includes("screening") || lowerMessage.includes("test")) {
    return "Based on your risk profile, here are your recommended screenings: Diabetes screening every 6 months, cardiovascular check every 2 years, cancer screenings as appropriate for your age and risk factors. Shall I provide more details on any specific screening?";
  }
  if (lowerMessage.includes("family") || lowerMessage.includes("relatives")) {
    return "Your family medical history is a key factor in your risk assessment. The more detailed information you can provide about relatives' health conditions and age of diagnosis, the more accurate your risk predictions will be. Consider reaching out to family members to gather more health history.";
  }
  const defaultResponses = [
    "I'm here to help with your health questions. You can ask me about your genetic risks, lifestyle recommendations, screening schedules, or any health concerns you might have.",
    "Based on your health profile, I can provide personalized advice about risk reduction strategies. What specific aspect of your health would you like to discuss?",
    "I can help explain your risk assessments, suggest lifestyle modifications, or provide information about recommended screenings. What would you like to know more about?"
  ];
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// api/index.ts
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
await registerRoutes(app);
var index_default = app;
export {
  index_default as default
};
