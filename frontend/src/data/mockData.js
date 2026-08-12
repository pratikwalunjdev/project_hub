export const stats = [
  { label: 'Total Projects', value: '12', change: '+20%', icon: 'folder' },
  { label: 'Total Visitors', value: '2.45K', change: '+32%', icon: 'eye' },
  { label: 'Page Views', value: '8.75K', change: '+28%', icon: 'trending-up' },
  { label: 'Avg. Visit Duration', value: '2m 45s', change: '+15%', icon: 'smile' },
]

export const categories = ['Productivity', 'E-commerce', 'Education', 'Finance', 'Portfolio']

export const technologyList = ['React', 'Spring Boot', 'Django', 'MySQL', 'Firebase', 'Node.js', 'Tailwind']

export const projects = [
  {
    id: 1,
    name: 'ZenithOS',
    description: 'All-in-one productivity platform to manage tasks, habits, notes and more.',
    tags: ['Web App', 'Productivity'],
    category: 'Productivity',
    technologies: ['React', 'Node.js', 'MySQL'],
    status: 'Published',
    date: 'May 20, 2025',
    liveUrl: 'https://zenithos.example.com',
    repoUrl: 'https://github.com/pratikwalunj/zenithos',
    color: 'bg-violet-600',
  },
  {
    id: 2,
    name: 'ShopEase',
    description: 'Modern e-commerce platform with seamless user experience.',
    tags: ['Web App', 'E-commerce'],
    category: 'E-commerce',
    technologies: ['React', 'Spring Boot', 'MySQL'],
    status: 'Published',
    date: 'May 10, 2025',
    liveUrl: 'https://shopease.example.com',
    repoUrl: 'https://github.com/pratikwalunj/shopease',
    color: 'bg-sky-600',
  },
  {
    id: 3,
    name: 'StudySync',
    description: 'AI-powered study assistant for students and educators.',
    tags: ['Web App', 'Education'],
    category: 'Education',
    technologies: ['React', 'Django'],
    status: 'Published',
    date: 'Apr 28, 2025',
    liveUrl: 'https://studysync.example.com',
    repoUrl: 'https://github.com/pratikwalunj/studysync',
    color: 'bg-emerald-600',
  },
  {
    id: 4,
    name: 'FinTrack',
    description: 'Personal finance tracker to manage income, expenses.',
    tags: ['Web App', 'Finance'],
    category: 'Finance',
    technologies: ['React', 'Firebase'],
    status: 'Published',
    date: 'Apr 15, 2025',
    liveUrl: 'https://fintrack.example.com',
    repoUrl: 'https://github.com/pratikwalunj/fintrack',
    color: 'bg-orange-600',
  },
  {
    id: 5,
    name: 'DevBlog',
    description: 'My personal developer blog built with modern tech.',
    tags: ['Blog', 'Portfolio'],
    category: 'Portfolio',
    technologies: ['React', 'Tailwind'],
    status: 'Published',
    date: 'Apr 05, 2025',
    liveUrl: 'https://devblog.example.com',
    repoUrl: 'https://github.com/pratikwalunj/devblog',
    color: 'bg-fuchsia-600',
  },
  {
    id: 6,
    name: 'More Projects',
    description: 'Exciting projects coming soon...',
    tags: ['Coming Soon'],
    category: 'Portfolio',
    technologies: [],
    status: 'Draft',
    date: 'Mar 30, 2025',
    liveUrl: null,
    repoUrl: null,
    color: 'bg-neutral-700',
  },
]

export const visitorsSeries = [
  { day: 'May 1', visitors: 900 },
  { day: 'May 8', visitors: 1400 },
  { day: 'May 15', visitors: 1200 },
  { day: 'May 22', visitors: 2450 },
  { day: 'May 29', visitors: 2100 },
]

export const techStack = [
  { name: 'React', value: 9, color: '#7c3aed' },
  { name: 'Spring Boot', value: 6, color: '#10b981' },
  { name: 'Django', value: 5, color: '#0ea5e9' },
  { name: 'MySQL', value: 4, color: '#f59e0b' },
  { name: 'Firebase', value: 2, color: '#d946ef' },
  { name: 'Others', value: 2, color: '#6b7280' },
]

export const referrers = [
  { source: 'Direct', visits: 980, color: '#7c3aed' },
  { source: 'Google', visits: 720, color: '#0ea5e9' },
  { source: 'GitHub', visits: 410, color: '#10b981' },
  { source: 'LinkedIn', visits: 240, color: '#f59e0b' },
  { source: 'Twitter / X', visits: 100, color: '#d946ef' },
]

export const topProjectsByViews = [
  { name: 'ZenithOS', views: 2840 },
  { name: 'ShopEase', views: 2210 },
  { name: 'StudySync', views: 1650 },
  { name: 'FinTrack', views: 1120 },
  { name: 'DevBlog', views: 930 },
]

export const visitorLogs = [
  { id: 1, page: '/projects/zenithos', location: 'Mumbai, IN', device: 'Desktop', referrer: 'Google', duration: '3m 12s', time: '2026-08-12 09:14' },
  { id: 2, page: '/', location: 'Pune, IN', device: 'Mobile', referrer: 'Direct', duration: '1m 05s', time: '2026-08-12 08:52' },
  { id: 3, page: '/projects/shopease', location: 'Bengaluru, IN', device: 'Desktop', referrer: 'GitHub', duration: '4m 40s', time: '2026-08-12 08:20' },
  { id: 4, page: '/projects/studysync', location: 'Delhi, IN', device: 'Tablet', referrer: 'LinkedIn', duration: '2m 18s', time: '2026-08-11 21:47' },
  { id: 5, page: '/projects/fintrack', location: 'New York, US', device: 'Desktop', referrer: 'Twitter / X', duration: '0m 45s', time: '2026-08-11 19:03' },
  { id: 6, page: '/', location: 'London, UK', device: 'Mobile', referrer: 'Google', duration: '1m 58s', time: '2026-08-11 15:31' },
  { id: 7, page: '/projects/devblog', location: 'Pune, IN', device: 'Desktop', referrer: 'Direct', duration: '5m 02s', time: '2026-08-11 12:09' },
]

export const messages = [
  {
    id: 1,
    name: 'Ananya Sharma',
    email: 'ananya.sharma@example.com',
    subject: 'Collaboration on StudySync',
    body: "Hi Pratik, I came across StudySync and loved the concept. Would you be open to a quick chat about a possible collaboration for a college project?",
    time: '2026-08-12 10:02',
    read: false,
  },
  {
    id: 2,
    name: 'Rohit Mehta',
    email: 'rohit.mehta@example.com',
    subject: 'Bug report on ShopEase demo',
    body: 'The checkout page seems to throw an error when the cart is empty. Thought you’d want to know!',
    time: '2026-08-11 22:40',
    read: false,
  },
  {
    id: 3,
    name: 'Sara Iyer',
    email: 'sara.iyer@example.com',
    subject: 'Freelance opportunity',
    body: 'We’re looking for a frontend developer for a 2-month contract. Your portfolio looks like a great fit — let me know if you’re interested.',
    time: '2026-08-10 14:15',
    read: true,
  },
  {
    id: 4,
    name: 'Devansh Patel',
    email: 'devansh.patel@example.com',
    subject: 'Great work on ZenithOS!',
    body: 'Just wanted to say the UI on ZenithOS is really clean. Did you use a component library or build it from scratch?',
    time: '2026-08-09 09:27',
    read: true,
  },
]
