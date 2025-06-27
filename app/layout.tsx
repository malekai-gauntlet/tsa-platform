import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./app.css";

// Amplify configuration at root level
import { Amplify } from "aws-amplify";

// Configure Amplify as early as possible in the application lifecycle
let amplifyConfigured = false;
try {
  const outputs = require("../amplify_outputs.json");
  Amplify.configure(outputs);
  amplifyConfigured = true;
} catch (error) {
  console.warn("amplify_outputs.json not found. Backend resources may not be deployed yet.");
  // Configure with minimal setup to prevent errors
  Amplify.configure({});
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TSA Dashboard",
  description: "Transportation Security Administration Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
