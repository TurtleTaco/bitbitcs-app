// app/utils/api.ts

import axios from 'axios';
import { getAuth } from 'firebase/auth';

import { RiShieldKeyholeLine, RiDatabase2Line, RiFlowChart, RiLockLine, RiAlarmWarningLine, RiPercentLine } from "react-icons/ri";


const API_BASE_URL = 'https://your-api-base-url.com';
// const API_TOKEN = 'your-api-token';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    console.log('Token:', token);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});



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

export const fetchDailyCheckIns = async (): Promise<DailyCheckIn[]> => {
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
    const response = await api.get('/daily-check-ins');
    return response.data;
  } catch (error) {
    console.error('Error fetching daily check-ins:', error);
    throw error;
  }
};

export const fetchStudyPaths = async (): Promise<StudyPath[]> => {
  if (USE_LOCAL_DATA) {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      console.log('Token:', token);
    }

    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
    return localStudyPaths;
  }

  try {
    const response = await api.get('/study-paths');
    return response.data;
  } catch (error) {
    console.error('Error fetching study paths:', error);
    throw error;
  }
}

export const fetchStudyPathModules = async (studypath_id: string): Promise<Module[]> => {
  if (USE_LOCAL_DATA) {
    function createRandomSublist<T>(localModules: T[]): T[] {
      const shuffled = [...localModules];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      const sublistSize = Math.floor(Math.random() * localModules.length) + 1;
      return shuffled.slice(0, sublistSize);
    }

    const randomizedModules = createRandomSublist(localModules);
    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
    return randomizedModules;
  }

  try {
    const response = await api.get('/modules', {
      params: { studypath_id }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching modules:', error);
    throw error;
  }
};