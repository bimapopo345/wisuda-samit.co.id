import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Get logo URL from query parameter or use default
    const logoUrl = searchParams.get('logo') || '/logo-thumbnail.png';
    
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1e3c72',
            background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
            padding: '80px',
          }}
        >
          {/* Logo container with safe area */}
          <div
            style={{
              width: '100%',
              height: '70%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={logoUrl}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: '15px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              }}
            />
          </div>
          
          {/* Text overlay */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '40px',
            }}
          >
            <div
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '20px',
                textAlign: 'center',
              }}
            >
              第9回サミットの卒業式
            </div>
            <div
              style={{
                fontSize: '36px',
                color: 'white',
                letterSpacing: '4px',
                textAlign: 'center',
              }}
            >
              WISUDA LPK SAMIT
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.log(`Error: ${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}