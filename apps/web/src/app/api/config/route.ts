import { getConfig } from '@/utils/config';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const config = getConfig();
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get config' },
      { status: 500 }
    );
  }
}
