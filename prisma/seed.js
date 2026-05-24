const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  await prisma.contract.deleteMany();
  await prisma.performance.deleteMany();
  await prisma.outreach.deleteMany();
  await prisma.pipeline.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.partner.deleteMany();

  const partner1 = await prisma.partner.create({
    data: {
      name: 'TechNews Media',
      type: 'MEDIA',
      email: 'partnerships@technewsmedia.com',
      phone: '+1-555-0100',
      website: 'https://technewsmedia.com',
      description: 'Leading tech news publication with 2M+ monthly readers',
      status: 'ACTIVE',
      rating: 5,
      yearsActive: 8,
    },
  });

  const partner2 = await prisma.partner.create({
    data: {
      name: 'Alex Chen - Tech Influencer',
      type: 'KOL',
      email: 'alex@example.com',
      phone: '+1-555-0101',
      website: 'https://alexchen.dev',
      description: 'AI and ML influencer with 500K followers on Twitter',
      status: 'ACTIVE',
      rating: 4,
      yearsActive: 5,
    },
  });

  const partner3 = await prisma.partner.create({
    data: {
      name: 'Tech Community Hub',
      type: 'COMMUNITY',
      email: 'hello@techcommunityhub.org',
      phone: '+1-555-0102',
      website: 'https://techcommunityhub.org',
      description: 'Active developer community with 50K+ members',
      status: 'ACTIVE',
      rating: 4,
      yearsActive: 3,
    },
  });

  const contact1 = await prisma.contact.create({
    data: {
      partnerId: partner1.id,
      firstName: 'Sarah',
      lastName: 'Johnson',
      title: 'Partnership Manager',
      email: 'sarah.johnson@technewsmedia.com',
      phone: '+1-555-0110',
      social: '@sarahjtech',
      notes: 'Primary contact for sponsorship deals',
      lastOutreach: new Date('2025-05-20'),
    },
  });

  const contact2 = await prisma.contact.create({
    data: {
      partnerId: partner2.id,
      firstName: 'Alex',
      lastName: 'Chen',
      title: 'Content Creator',
      email: 'alex@example.com',
      social: '@alexchen',
      notes: 'Focuses on AI content',
      lastOutreach: new Date('2025-05-15'),
    },
  });

  const pipeline1 = await prisma.pipeline.create({
    data: {
      partnerId: partner1.id,
      dealName: 'Product Launch Sponsorship',
      dealValue: 50000,
      currency: 'USD',
      stage: 'NEGOTIATING_TERMS',
      winProbability: 75,
      expectedCloseDate: new Date('2025-06-30'),
      description: 'Full page ad + featured article for Q3 launch',
    },
  });

  const pipeline2 = await prisma.pipeline.create({
    data: {
      partnerId: partner2.id,
      dealName: 'Sponsored Content Series',
      dealValue: 15000,
      currency: 'USD',
      stage: 'PROPOSAL_SENT',
      winProbability: 60,
      expectedCloseDate: new Date('2025-07-15'),
      description: '5-part AI tutorial series with brand integration',
    },
  });

  const pipeline3 = await prisma.pipeline.create({
    data: {
      partnerId: partner3.id,
      dealName: 'Community Hackathon Sponsor',
      dealValue: 25000,
      currency: 'USD',
      stage: 'INITIAL_CONTACT',
      winProbability: 40,
      expectedCloseDate: new Date('2025-08-30'),
      description: 'Sponsor annual hackathon event',
    },
  });

  const pipeline4 = await prisma.pipeline.create({
    data: {
      partnerId: partner1.id,
      dealName: 'Newsletter Feature',
      dealValue: 8000,
      currency: 'USD',
      stage: 'CLOSED_WON',
      winProbability: 100,
      description: 'Featured in weekly newsletter for 4 weeks',
    },
  });

  await prisma.outreach.create({
    data: {
      partnerId: partner1.id,
      contactId: contact1.id,
      outreachType: 'EMAIL',
      subject: 'Partnership Opportunity - Product Launch',
      message: 'Hi Sarah, we have an exciting sponsorship opportunity...',
      status: 'RESPONDED',
      sentAt: new Date('2025-05-18'),
      responseAt: new Date('2025-05-19'),
      responseNotes: 'Interested, wants more details on timeline',
    },
  });

  await prisma.outreach.create({
    data: {
      partnerId: partner2.id,
      contactId: contact2.id,
      outreachType: 'SOCIAL_MEDIA',
      subject: 'DM: Content collaboration idea',
      message: 'Love your AI content! Want to collaborate?',
      status: 'PENDING',
      sentAt: new Date('2025-05-22'),
    },
  });

  await prisma.performance.create({
    data: {
      partnerId: partner1.id,
      totalReach: 2000000,
      engagement: 3.5,
      clicks: 45000,
      conversions: 1200,
      roi: 320,
      monthlyData: {
        '2025-04': { reach: 1800000, engagement: 3.2, conversions: 1000 },
        '2025-05': { reach: 2000000, engagement: 3.5, conversions: 1200 },
      },
    },
  });

  await prisma.performance.create({
    data: {
      partnerId: partner2.id,
      totalReach: 500000,
      engagement: 8.2,
      clicks: 28000,
      conversions: 450,
      roi: 580,
    },
  });

  await prisma.contract.create({
    data: {
      partnerId: partner1.id,
      contractName: 'Media Partnership Agreement 2025',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-12-31'),
      renewalDate: new Date('2025-11-01'),
      terms: 'Exclusive partnership, minimum 12 sponsored posts per year',
      deliverables: 'Sponsored articles, newsletter features, social mentions',
      paymentTerms: 'Net 30, invoiced monthly',
      status: 'ACTIVE',
    },
  });

  await prisma.contract.create({
    data: {
      partnerId: partner2.id,
      contractName: 'Influencer Collaboration 2025',
      startDate: new Date('2025-03-01'),
      endDate: new Date('2025-12-31'),
      terms: 'Content collaboration with brand mentions',
      deliverables: '4 technical content pieces + 8 social posts',
      paymentTerms: 'Per-piece basis',
      status: 'ACTIVE',
    },
  });

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });