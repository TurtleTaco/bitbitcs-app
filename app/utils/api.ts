// app/utils/api.ts

import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { useQuery, useMutation, QueryClient } from 'react-query';

import { RiShieldKeyholeLine, RiDatabase2Line, RiFlowChart, RiLockLine, RiAlarmWarningLine, RiPercentLine } from "react-icons/ri";


const API_BASE_URL = 'https://bitbitdive.uc.r.appspot.com';
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

// Create a new QueryClient instance
export const queryClient = new QueryClient();

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

export interface CourseOutline {
  course_outline: {
    fields: Field[];
  };
}

interface Field {
  title: string;
  modules: FieldModule[];
}

export interface FieldModule {
  title: string;
  description: string;
  chapters: Chapter[];
  // fundamental, comprehensive, extensive, emerging
  categorization: string;
}

export interface Chapter {
  title: string;
  description: string;
  discussion_points: DiscussionPoint[];
}

interface DiscussionPoint {
  title: string;
  subtopic_titles: string[];
}

// Study Goal interface
export interface StudyGoalPlan {
  id: string;
  title: string;
  user_id: string;
  modules: StudyGoalModule[];
}

export interface StudyGoalModule {
  title: string;
  description: string;
  chapters: StudyGoalChapter[];
}

export interface StudyGoalChapter {
  title: string;
  description: string;
  discussion_points: StudyGoalDiscussionPoint[];
}

export interface StudyGoalDiscussionPoint {
  title: string;
  subtopics: StudyGoalSubtopic[];
}

export interface StudyGoalSubtopic {
  title: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'; // Add other possible statuses if needed
}

// Study plan interfaces
export interface StudyPlanResponse {
  study_plans: StudyPlan[];
}

export interface StudyPlan {
  id: string;
  title: string;
  user_id: string;
  study_plan_chapters: StudyPlanChapter[];
}

export interface StudyPlanChapter {
  module_name: string;
  chapter_name: string;
  discussion_points: StudyPlanDiscussionPoint[];
}

export interface StudyPlanDiscussionPoint {
  title: string;
  subtopics: StudyPlanSubtopic[];
}

export interface StudyPlanSubtopic {
  title: string;
  status: StudyPlanSubtopicStatus;
}

export type StudyPlanSubtopicStatus = "NOT_STARTED" | string; // Add other possible status values if known

// React Query hooks

export const useCourseOutline = () => {
  return useQuery({
    queryKey: ['courseOutline'],
    queryFn: async () => {
      const response = await api.get<CourseOutline>('/course-outline');
      return response.data;
    },
  });
};

export const useCreateStudyPlan = () => {
  return useMutation({
    mutationFn: async (goalObject: any) => {
      await api.post('/study-plans', goalObject);
    },
    onSuccess: () => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ['studyPlan'] });
    },
  });
};

export const useGetStudyPlan = () => {
  return useQuery<StudyPlanResponse>({
    queryKey: ['studyPlan'],
    queryFn: async () => {
      const response = await api.get<StudyPlanResponse>('/study-plans');
      return response.data;
    },
  });
};

export const useDailyCheckIns = () => {
  return useQuery({
    queryKey: ['dailyCheckIns'],
    queryFn: async () => {
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
      const response = await api.get<DailyCheckIn[]>('/daily-check-ins');
      return response.data;
    },
  });
};

export const useStudyPathModules = (studypath_id: string) => {
  return useQuery({
    queryKey: ['studyPathModules', studypath_id],
    queryFn: async () => {
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
      const response = await api.get<Module[]>('/modules', {
        params: { studypath_id },
      });
      return response.data;
    },
  });
};

export const useFetchSubtopicContent = (dp_title: string, subtopic_title: string) => {
  return useQuery({
    queryKey: ['subtopicContent', dp_title, subtopic_title],
    queryFn: async () => {
      // Fetch subtopic content here
      const response = await api.get(`/discussion_point/${dp_title}/subtopics/${subtopic_title}`);
      return response.data;
    },
  });
}





// Lagacy function to fetch course outline with pure axios
export const fetchCourseOutline = async (): Promise<CourseOutline> => {
  try {
    const response = await api.get<CourseOutline>('/course-outline');
    return response.data;
  } catch (error) {
    console.error('Error fetching course outline:', error);
    throw error;
  }
};

// Function to get and create goal
export const createGoal = async (goalObject: any): Promise<void> => {
  try {
    await api.post('/study-plans', goalObject);
  } catch (error) {
    console.error('Error creating study plan:', error);
    throw error;
  }
};

export const getStudyPlan = async (): Promise<any> => {
  try {
    const response = await api.get('/study-plans');
    return response.data;
  } catch (error) {
    console.error('Error fetching study plan:', error);
    throw error;
  }
}


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