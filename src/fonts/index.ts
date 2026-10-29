import { Poppins } from "next/font/google";

/** Only the weights the design uses (400 normal, 500 medium, 600 semibold, 700 bold). */
export const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
