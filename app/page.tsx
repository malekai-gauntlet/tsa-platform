"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { signOut } from "aws-amplify/auth";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import "@aws-amplify/ui-react/styles.css";
import Link from "next/link";
import { AUTH_CONFIG } from "@/lib/constants/auth";

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

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
          <h1>TSA Platform</h1>
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
        
        <div style={{ marginBottom: '20px' }}>
          <Link 
            href="/map" 
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#2563eb',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '500',
              marginRight: '10px'
            }}
          >
            🗺️ View TSA Districts Map
          </Link>
        </div>

        <h2>Management Tasks</h2>
        <button onClick={createTodo}>+ new task</button>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.content}</li>
          ))}
        </ul>
        <div>
          🥳 TSA Platform successfully hosted.
          <br />
          <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
            Review next steps of this tutorial.
          </a>
        </div>
      </main>
    </div>
  );
}
