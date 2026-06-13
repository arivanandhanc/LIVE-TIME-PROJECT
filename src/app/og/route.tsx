import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

export const runtime = 'edge';

export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get('title') || SITE.tagline).slice(0, 90);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #ffffff 0%, #eaeef4 100%)',
          padding: '70px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 32, color: '#426089', fontWeight: 700 }}>
          🕒 &nbsp;{SITE.name}
        </div>
        <div style={{ display: 'flex', fontSize: 64, fontWeight: 800, color: '#1d2635', lineHeight: 1.15, maxWidth: '900px' }}>
          {title}
        </div>
        <div style={{ display: 'flex', fontSize: 30, color: '#557aa4' }}>{SITE.tagline}</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
