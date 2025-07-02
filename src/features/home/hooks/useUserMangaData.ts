import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { fetchUserMangaQuery } from "../../../api/user/user.queries";
import { IUserMangaData } from "../../../api/user/user.types";

export const useUserData = () => {
  const [username, setUsername] = useLocalStorage<string | null>(
    "username",
    null
  );
  const [inputValue, setInputValue] = useState(username ?? "");
  const [data, setData] = useState<IUserMangaData[] | null>(null);

  const query = useQuery({
    queryKey: ["userData", username],
    queryFn: fetchUserMangaQuery(username!),
    enabled: !!username,
  });

  useEffect(() => {
    if (!query.data) return;

    const sorted = [...query.data].sort((a, b) => {
      if (!a.sourceLastChapterDate) return 1;
      if (!b.sourceLastChapterDate) return -1;

      return (
        new Date(b.sourceLastChapterDate).getTime() -
        new Date(a.sourceLastChapterDate).getTime()
      );
    });

    setData(sorted);
  }, [query.data]);

  return {
    username,
    setUsername,
    inputValue,
    setInputValue,
    userData: data,
    query,
  };
};
