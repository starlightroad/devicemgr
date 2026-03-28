import "@/lib/config/env";

import usersJSON from "@/lib/data/users.json";

import { auth } from "@/lib/auth";

const usersSeed = async () => {
  try {
    const insertedUsers = await Promise.all(
      usersJSON.map(async (user) => {
        const data = await auth.api.signUpEmail({
          body: {
            name: user.name,
            email: user.email,
            password: user.password,
          },
        });

        return {
          name: data.user.name,
          email: data.user.email,
        };
      }),
    );

    const usersCount = insertedUsers.length;

    console.info(`✅ Seeded ${usersCount} user${usersCount === 1 ? "" : "s"}.`);
  } catch (error) {
    console.error("🔥 Failed to seed users:", error);
  }
};

export default usersSeed;
