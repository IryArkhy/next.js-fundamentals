import { db } from '@/db'
import { getSession } from './auth'
import { eq } from 'drizzle-orm'
import { cache } from 'react'
import { issues, users } from '@/db/schema'
// import { mockDelay } from './utils'

/**
 * DAL is data access layer - a utility functions that are used to fetch data
 * for the server-side components.
 * They don't cross the network barrier so don't confuse with server functions/server actions.
 */
export const getCurrentUser = async () => {
  const session = await getSession()

  if (!session) {
    return null
  }

  try {
    const [result] = await db
      .select()
      .from(users)
      .where(eq(users.id, session.userId))

    return result || null
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    })

    return user
  } catch (error) {
    console.log(error)
    return null
  }
}
