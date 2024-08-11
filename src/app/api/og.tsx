// pages/api/og.tsx
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
    runtime: 'edge',
};

export default function handler(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const sport = searchParams.get('sport') || 'Unknown Sport';
        const compatibility = searchParams.get('compatibility') || '0';

        return new ImageResponse(
            (
                <div
                    style={{
                        backgroundColor: '#0081C8',
                        backgroundSize: '150px 150px',
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        textAlign: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        flexWrap: 'nowrap',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            justifyItems: 'center',
                        }}
                    >
                        <img
                            alt="Olympic Rings"
                            height={200}
                            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 480'%3E%3Cpath fill='%23fff' d='M0 0h640v480H0z'/%3E%3Cg stroke-width='1.7'%3E%3Ccircle cx='180' cy='170' r='50' fill='none' stroke='%23006bb6'/%3E%3Ccircle cx='260' cy='170' r='50' fill='none' stroke='%23ffa500'/%3E%3Ccircle cx='340' cy='170' r='50' fill='none' stroke='%23000'/%3E%3Ccircle cx='220' cy='220' r='50' fill='none' stroke='%2007a857'/%3E%3Ccircle cx='300' cy='220' r='50' fill='none' stroke='%23e03c31'/%3E%3C/g%3E%3C/svg%3E"
                            style={{ margin: '0 30px' }}
                        />
                    </div>
                    <div
                        style={{
                            fontSize: 60,
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            color: 'white',
                            marginTop: 30,
                            padding: '0 120px',
                            lineHeight: 1.4,
                            whiteSpace: 'pre-wrap',
                        }}
                    >
                        Olympic Body Type Match
                    </div>
                    <div
                        style={{
                            fontSize: 40,
                            fontStyle: 'normal',
                            color: '#FCB131',
                            marginTop: 24,
                            padding: '0 120px',
                            lineHeight: 1.4,
                            whiteSpace: 'pre-wrap',
                        }}
                    >
                        {sport}
                    </div>
                    <div
                        style={{
                            fontSize: 30,
                            fontStyle: 'normal',
                            color: 'white',
                            marginTop: 10,
                            padding: '0 120px',
                            lineHeight: 1.4,
                            whiteSpace: 'pre-wrap',
                        }}
                    >
                        {compatibility}% Compatible
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}