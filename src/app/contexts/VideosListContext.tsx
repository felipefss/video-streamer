'use client';

import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';

interface ProviderProps {
  children: ReactNode;
}

interface Video {
  $id: string;
  name: string;
  video_id: string;
  video_length: number;
}

interface ContextProps {
  listOfVideos: Video[];
}

const VideosListContext = createContext({} as ContextProps);

export function VideosListProvider({ children }: ProviderProps) {
  const [listOfVideos, setListOfVideos] = useState<Video[]>([]);

  useEffect(() => {
    fetch('/api/videos')
      .then((response) => response.json())
      .then((data) => {
        setListOfVideos(data.documents);
      });
  }, []);

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
