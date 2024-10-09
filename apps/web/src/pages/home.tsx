import React from "react";

import { useThumbnailScores } from "@/api"

export const Home = () => {
  const { data } = useThumbnailScores();

  console.log(data);

  return <div>Home</div>;
}
