export type PortfolioProject = {
  id?: string
  title: string
  year: string
  description: string
  image: string
  technologies: string[]
  link?: string
  features?: string[]
  challenges?: string
  solution?: string
  published?: boolean
  sortOrder?: number
}

export const DEFAULT_HERO_IMAGE = "/laptop.jpeg.jpg"

export const DEFAULT_PROJECTS: PortfolioProject[] = [
  {
    title: "ElectRIC",
    year: "2024",
    description:
      "Designed and developed a full-featured e-commerce platform for electronic goods with product catalog, shopping cart, and payment integration to enhance customer experience.",
    image: "/electric.png",
    technologies: [
      "Laravel",
      "PHP",
      "MySQL",
      "JavaScript",
      "Tailwind CSS",
      "Bootstrap",
    ],
    features: [
      "Product catalog with advanced filtering",
      "Shopping cart and wishlist functionality",
      "Secure payment gateway integration",
      "Admin dashboard for inventory management",
      "Order tracking system",
    ],
    challenges:
      "Building a scalable e-commerce platform with complex product variations and inventory management.",
    solution:
      "Implemented a flexible product attribute system and optimized database queries for better performance.",
  },
  {
    title: "Florist",
    year: "2024",
    description:
      "Designed and developed a responsive online florist shop with beautiful product gallery and integrated order management system to streamline flower delivery services.",
    image: "/forist.png",
    technologies: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap"],
  },
  {
    title: "SIAKAD",
    year: "2024 - 2025",
    description:
      "Designed and developed an academic information system to manage student data, course schedules, and grades with role-based access control for different user types.",
    image: "/Siakad.png",
    technologies: ["Laravel", "JavaScript", "MySQL", "Git", "Tailwind CSS"],
  },
  {
    title: "System Information Nongsa Bakau Serip Village ",
    year: "2025",
    description:
      "Designed and developed a village information system that digitizes community data, manages local news, and improves public service delivery for better community engagement.",
    image: "/Desa.png",
    technologies: ["Laravel", "PHP", "MySQL", "Figma", "JavaScript"],
  },
  {
    title: "Aplikasi Uang Kas - Wangkas",
    year: "2025",
    description:
      "Developed a comprehensive school cash management system that tracks student fee payments, generates financial reports, and manages class treasury funds. Features automated payment reminders, transaction history, and role-based access for teachers and administrators.",
    image: "/uangkas.png",
    technologies: [
      "Laravel",
      "PHP",
      "MySQL",
      "JavaScript",
      "Bootstrap",
      "Blade",
    ],
  },
  {
    title: "Gor Centaury",
    year: "2025",
    description:
      "Developed an online futsal field booking system for Gor Centaury, enabling users to check availability, reserve time slots, and manage bookings efficiently. The platform streamlines the reservation process and improves customer experience.",
    image: "/booking-futsal.png",
    technologies: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap"],
    link: "https://gorcentury.online",
  },
]
