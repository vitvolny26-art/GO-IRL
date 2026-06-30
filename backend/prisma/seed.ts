import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create demo user (organizer)
  const vitUser = await prisma.user.upsert({
    where: { telegramId: 123456789n },
    update: {},
    create: {
      telegramId: 123456789n,
      firstName: 'Vit',
      lastName: 'Volny',
      username: 'vitvolny26',
      profileImage: null,
    },
  });

  console.log(`✓ Created organizer: ${vitUser.firstName} (ID: ${vitUser.id})`);

  // Create ONE real activity: Beach Volleyball in Olomouc
  const volleyballActivity = await prisma.activity.upsert({
    where: { id: 'volleyball-olomouc-demo' },
    update: {},
    create: {
      id: 'volleyball-olomouc-demo',
      title: '🏐 Beach Volleyball',
      description: 'Let\'s meet and play volleyball. No experience needed. All skill levels welcome!',
      type: 'sport.volleyball',
      latitude: 49.5902,
      longitude: 17.2519,
      startTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow at 18:00
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000), // +2 hours
      maxParticipants: 12,
      status: 'published',
      createdById: vitUser.id,
    },
  });

  console.log(`✓ Created activity: ${volleyballActivity.title}`);

  // Add Vit as a participant
  await prisma.activityParticipant.upsert({
    where: {
      activityId_userId: {
        activityId: volleyballActivity.id,
        userId: vitUser.id,
      },
    },
    update: {},
    create: {
      activityId: volleyballActivity.id,
      userId: vitUser.id,
    },
  });

  console.log(`✓ Added organizer as participant`);

  console.log('\n✅ Database seeded successfully!');
  console.log('\n🏐 Real Activity Details:');
  console.log(`   📍 Location: Olomouc, Czech Republic`);
  console.log(`   🕐 Time: Tomorrow at 18:00`);
  console.log(`   👥 Participants: 1/12`);
  console.log(`   📝 Activity ID: ${volleyballActivity.id}`);
  console.log('\n🚀 First real meeting is ready to happen!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
