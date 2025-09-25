/** api/issue */

import { db } from '@/db'
import { issues } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const param = await params

    const issue = await db.query.issues.findFirst({
      where: eq(issues.id, parseInt(param.id)),
    })

    return NextResponse.json({ data: { issue } })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'nah', code: 500 })
  }
}

export const POST = async (req: NextRequest) => {
  const data = await req.json()
  const authHeaders = (await headers()).get('Authorization')

  return NextResponse.json({ data, authHeaders })
}

export const PATCH = () => {}
