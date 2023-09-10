import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';

import { getURL } from '@/libs/helpers';


export async function POST(
  request: Request
) {
  const { price, quantity = 1, metadata = {} } = await request.json();

  
}
