
import { NextRequest, NextResponse } from 'next/server'





export function middleware(req: NextRequest) {

    const hostname = req.headers.get('host') || ''

    if (hostname.startsWith('monitoring.')) {



        if (req.nextUrl.pathname === '/observability') {
            return NextResponse.next()
        }

        return NextResponse.rewrite(new URL('/observability', req.url))
    }




    return NextResponse.next()
}

export const config = {
    matcher: '/((?!_next|favicon.ico|api).*)',
}
