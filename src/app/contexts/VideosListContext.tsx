'use client';

import { ReactNode, createContext, useContext, useMemo, useState } from 'react';

interface ProviderProps {
  children: ReactNode;
}

interface Video {
  id: string;
  title: string;
  size: string;
}

interface ContextProps {
  listOfVideos: Video[];
}

const VideosListContext = createContext({} as ContextProps);

export function VideosListProvider({ children }: ProviderProps) {
  const [listOfVideos, setListOfVideos] = useState<Video[]>([]);

  const value = useMemo(
    () => ({
      listOfVideos,
    }),
    [listOfVideos]
  );

  return <VideosListContext.Provider value={value}>{children}</VideosListContext.Provider>;
}

export function useVideosListContext() {
  const context = useContext(VideosListContext);

  if (!context) {
    throw new Error('VideosListContext not provided!');
  }

  return context;
}
