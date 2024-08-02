// app/utils/api.ts

import axios from 'axios';

import { RiShieldKeyholeLine, RiDatabase2Line, RiFlowChart, RiLockLine, RiAlarmWarningLine, RiPercentLine } from "react-icons/ri";


const API_BASE_URL = 'https://your-api-base-url.com';
const API_TOKEN = 'your-api-token';

// Toggle between local and online mode
const USE_LOCAL_DATA = true;

// Simulated delay for local data
const SIMULATED_DELAY = 1000;

export interface DailyCheckIn {
  day: string;
  checkedIn: boolean;
}

export interface Module {
  id: number;
  title: string;
  chapter_cnt: number;
  chapters: string[];
  icon: React.ComponentType<{ size: number; style: React.CSSProperties }>;
}

export interface StudyPath {
  label: string;
  id: string;
}

const localDailyCheckIns: DailyCheckIn[] = [
  { day: "Mon", checkedIn: true },
  { day: "Tue", checkedIn: true },
  { day: "Wed", checkedIn: true },
  { day: "Thu", checkedIn: true },
  { day: "Fri", checkedIn: false },
];

const localModules: Module[] = [
  {
    id: 1,
    title: "Advanced Indexing Strategies",
    chapter_cnt: 4,
    chapters: [
      "Indexing with B-trees",
      "Hash Indexes Usage",
      "Full-Text Indexing Techniques",
      "Indexing in Distributed Databases",
    ],
    icon: RiShieldKeyholeLine,
  },
  {
    id: 2,
    title: "Big Data Handling",
    chapter_cnt: 4,
    chapters: [
      "Indexing with B-trees",
      "Hash Indexes Usage",
      "Full-Text Indexing Techniques",
      "Indexing in Distributed Databases",
    ],
    icon: RiDatabase2Line,
  },
  {
    id: 3,
    title: "Data Modeling",
    chapter_cnt: 4,
    chapters: [
      "Indexing with B-trees",
      "Hash Indexes Usage",
      "Full-Text Indexing Techniques",
      "Indexing in Distributed Databases",
    ],
    icon: RiFlowChart,
  },
  {
    id: 4,
    title: "Network Security",
    chapter_cnt: 4,
    chapters: [
      "Indexing with B-trees",
      "Hash Indexes Usage",
      "Full-Text Indexing Techniques",
      "Indexing in Distributed Databases",
    ],
    icon: RiLockLine,
  },
  {
    id: 5,
    title: "Logging, Monitoring, and Alerting Systems",
    chapter_cnt: 4,
    chapters: [
      "Indexing with B-trees",
      "Hash Indexes Usage",
      "Full-Text Indexing Techniques",
      "Indexing in Distributed Databases",
    ],
    icon: RiAlarmWarningLine,
  },
  {
    id: 6,
    title: "Probability Theory",
    chapter_cnt: 4,
    chapters: [
      "Indexing with B-trees",
      "Hash Indexes Usage",
      "Full-Text Indexing Techniques",
      "Indexing in Distributed Databases",
    ],
    icon: RiPercentLine,
  },
];

const localStudyPaths: StudyPath[] = [
  {
    label: "Backend Study Path",
    id: "#F0F8FF",
  },
  {
    label: "Frontend Study Path",
    id: "#FAEBD7",
  },
  {
    label: "System design interview",
    id: "#00FFFF",
  },
];

export const fetchDailyCheckIns = async (email: string): Promise<DailyCheckIn[]> => {
  if (USE_LOCAL_DATA) {
    function randomizeCheckIns(checkIns: DailyCheckIn[]): DailyCheckIn[] {
      return checkIns.map(checkIn => ({
        ...checkIn,
        checkedIn: Math.random() < 0.5
      }));
    }
    const randomizedCheckIns = randomizeCheckIns(localDailyCheckIns);

    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
    return randomizedCheckIns;
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/daily-check-ins`, {
      params: { email },
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching daily check-ins:', error);
    throw error;
  }
};

export const fetchStudyPaths = async (email: string): Promise<StudyPath[]> => {
  if (USE_LOCAL_DATA) {
    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
    return localStudyPaths;
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/study-paths`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching study paths:', error);
    throw error;
  }
}

export const fetchStudyPathModules = async (email: string, studypath_id: string): Promise<Module[]> => {
  if (USE_LOCAL_DATA) {
    function createRandomSublist<T>(localModules: T[]): T[] {
      // Create a copy of the original array to avoid modifying it
      const shuffled = [...localModules];

      // Shuffle the array
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      // Generate a random sublist size between 1 and the length of the array
      const sublistSize = Math.floor(Math.random() * localModules.length) + 1;

      // Return the first 'sublistSize' elements
      return shuffled.slice(0, sublistSize);
    }

    const randomizedModules = createRandomSublist(localModules);
    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
    return randomizedModules;
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/modules`, {
      params: { email },
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching modules:', error);
    throw error;
  }
};