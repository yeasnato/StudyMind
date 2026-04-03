import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GrainSpotlight from "@/components/GrainSpotlight";

export const metadata: Metadata = {
  title: "StudyMind AI — Study Smarter",
  description: "AI-powered study tools: note summarizer and quiz generator powered by Claude.",
  keywords: ["study", "AI", "quiz", "summarizer", "notes", "learning"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <GrainSpotlight />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
