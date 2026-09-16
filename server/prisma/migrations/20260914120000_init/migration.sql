CREATE TYPE "LeadStatus" AS ENUM ('new', 'contacted', 'meeting', 'proposal', 'won', 'lost');

CREATE TABLE "leads" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "company" VARCHAR(160) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "phone" VARCHAR(40),
    "industry" VARCHAR(100) NOT NULL,
    "business_description" TEXT,
    "problem_description" TEXT NOT NULL,
    "budget_range" VARCHAR(40),
    "status" "LeadStatus" NOT NULL DEFAULT 'new',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);
