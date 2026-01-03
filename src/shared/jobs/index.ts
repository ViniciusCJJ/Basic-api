import cron from 'node-cron';
import { container } from 'tsyringe';
import { SyncBlockedUsersJob } from './SyncBlockedUsersJob';

const runSyncBlockedUsers = async (): Promise<void> => {
  const job = container.resolve(SyncBlockedUsersJob);
  try {
    await job.run();
  } catch (error) {
    console.error('Failed to sync blocked users cache', error);
  }
};

runSyncBlockedUsers();

const blockedUsersJob = cron.schedule('*/15 * * * *', runSyncBlockedUsers, {});

export { blockedUsersJob };
