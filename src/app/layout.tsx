import type { Metadata } from "next";
import localFont from "next/font/local";
import { Playfair_Display, Nunito, Montserrat, Lora, Poppins, Raleway, Roboto_Mono  } from "next/font/google";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const geistPlayfair = Playfair_Display({
  weight: ['400', '800'],
  variable: "--font-geist-playfair",
  subsets: ["latin"]
});

const geistRobotoMono = Roboto_Mono({
  weight: ['400'],
  variable: "--font-geist-roboto-mono",
  subsets: ["latin"]
});

const geistRaleway = Raleway({
  weight: ['400', '500', '900', '800'],
  variable: "--font-geist-raleway",
  subsets: ["latin"]
});

const geistPoppins = Poppins({
  weight: ['400', '800'],
  variable: "--font-geist-poppins",
  subsets: ["latin"]
});

const geistLora = Lora({
  weight: ["400", "500"],
  variable: "--font-geist-lora",
  subsets: ["latin"]
})

const geistMontserrat = Montserrat({
  variable: "--font-giest-montserrat",
  weight: ["100", "400"],
  subsets: ["latin"]

})

const geistNunito = Nunito({
  weight: ['200', '500'],
  variable: "--font-geist-nunito",
  subsets: ["latin"]
});


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Convert your PDF to audio clips",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${geistPlayfair.variable} 
          ${geistNunito.variable} 
          ${geistMontserrat.variable}
          ${geistLora.variable}
          ${geistPoppins.variable}
          ${geistRaleway.variable}
          ${geistRobotoMono.variable} 
          antialiased`
        }
      >
        {children}
      </body>
    </html>
  );
}
