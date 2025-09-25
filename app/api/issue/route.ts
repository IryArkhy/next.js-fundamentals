import { db } from '@/db'
import { issues } from '@/db/schema'
import { getCurrentUser } from '@/lib/dal'
import { NextRequest, NextResponse } from 'next/server'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (req: NextRequest) => {
  try {
    const issues = await db.query.issues.findMany({})

    return NextResponse.json({ data: { issues } })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error: 'nah', code: 500 })
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const currentUser = await getCurrentUser()
    const payload = await req.json()

    const [newIssue] = await db
      .insert(issues)
      .values({ userId: currentUser?.id, ...payload })
      .returning()

    return NextResponse.json({ data: { newIssue } })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error: 'nah', code: 500 })
  }
}
