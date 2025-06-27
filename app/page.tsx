"use client";

import { signOut } from "aws-amplify/auth";
import "@/app/app.css";
import "@aws-amplify/ui-react/styles.css";
import Link from "next/link";

export default function App() {
  const handleSignOut = async () => {
    try {
      await signOut();
      // AuthWrapper will handle the redirect to login
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="main-dashboard">
      <main>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1>Texas Sports Academy Platform</h1>
          <button 
            onClick={handleSignOut}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Sign Out
          </button>
        </div>
        
        <div style={{ marginBottom: '30px' }}>
          <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '20px' }}>
            Welcome to the Texas Sports Academy management platform. Access your coaching tools and resources below.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <Link 
            href="/map" 
            style={{
              display: 'block',
              padding: '20px',
              backgroundColor: '#2563eb',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '12px',
              fontWeight: '500',
              textAlign: 'center',
              transition: 'transform 0.2s'
            }}
          >
            🗺️ View TSA Districts Map
          </Link>

          <Link 
            href="/coach" 
            style={{
              display: 'block',
              padding: '20px',
              backgroundColor: '#059669',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '12px',
              fontWeight: '500',
              textAlign: 'center',
              transition: 'transform 0.2s'
            }}
          >
            👨‍🏫 Coach Dashboard
          </Link>
        </div>

        <div style={{ 
          padding: '20px', 
          backgroundColor: '#f3f4f6', 
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#374151', marginBottom: '10px' }}>Platform Status</h3>
          <p style={{ color: '#6b7280', margin: 0 }}>
            🥳 TSA Platform successfully hosted and ready for use.
          </p>
        </div>

      </main>
    </div>
  );
}
