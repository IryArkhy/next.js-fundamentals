/** api/user */

import { headers } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export const GET = (req: NextRequest) => {
  return NextResponse.json({ data: { message: 'hello' } })
}
export const POST = async (req: NextRequest) => {
  const data = await req.json()
  const authHeaders = (await headers()).get('Authorization')

  return NextResponse.json({ data, authHeaders })
}
export const PATCH = () => {}
