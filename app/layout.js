import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
import "react-day-picker/dist/style.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

/**
 * Metadata for the Agile Board application.
 * @type {Object}
 * @property {string} title - The title of the web application.
 * @property {string} description - A brief description of the web application.
 */
export const metadata = {
  title: "Agile board",
  description: "",
};

/**
 * RootLayout component that wraps the entire application.
 * It includes global providers and layout components such as the header, footer, and theme.
 *
 * @param {Object} props - Props for the RootLayout component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The RootLayout component.
 */
export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      /**
       * Configuration for Clerk's appearance and theme customization.
       * @property {Object} appearance - Customizes the appearance of Clerk components.
       * @property {Object} baseTheme - The base theme for Clerk components.
       * @property {Object} variables - Theme variables for primary colors, backgrounds, and inputs.
       * @property {Object} elements - Custom class names for styling Clerk elements.
       */
      appearance={{
        baseTheme: shadesOfPurple,
        variables: {
          colorPrimary: "#3b82f6",
          colorBackground: "#1a202c",
          colorInputBackground: "#2D3748",
          colorInputText: "#F3F4F6",
        },
        elements: {
          formButtonPrimary: "bg-purple-600 hover:bg-purple-700 text-white",
          card: "bg-gray-800",
          headerTitle: "text-blue-400",
          headerSubtitle: "text-gray-400",
        },
      }}
    >
      <html lang="en">
        <body className={`${inter.className} animated-dark-blue-gradient`}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />
            <footer className="bg-gray-900 py-12">
              <div className="container mx-auto px-4 text-center text-gray-200">
                <p>Made with 💗 by Sumit Raghav</p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
