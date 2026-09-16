import { prisma } from '../db/prisma.js';

export async function createLead(lead) {
  return prisma.lead.create({ data: lead });
}

export async function listLeads() {
  return prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function findLeadById(id) {
  return prisma.lead.findUnique({ where: { id: Number(id) } });
}

export async function updateLeadStatus(id, status) {
  return prisma.lead.updateMany({
    where: { id: Number(id) },
    data: { status },
  }).then(async (result) => (
    result.count ? findLeadById(id) : null
  ));
}
