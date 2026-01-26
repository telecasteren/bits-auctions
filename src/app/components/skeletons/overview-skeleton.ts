export const OverviewSkeleton = () => {
  const wrapper = document.createElement("div");
  wrapper.className = "flex flex-col gap-6 max-w-[1000px] mx-auto p-6";

  const title = document.createElement("div");
  title.className =
    "w-40 h-10 rounded-md bg-gray-300 dark:bg-gray-800 animate-pulse mb-2";

  const tagline = document.createElement("div");
  tagline.className =
    "w-64 h-6 rounded-md bg-gray-300 dark:bg-gray-800 animate-pulse mb-4";

  const chart = document.createElement("div");
  chart.className =
    "w-full h-64 rounded-md bg-gray-300 dark:bg-gray-800 animate-pulse";

  wrapper.appendChild(title);
  wrapper.appendChild(tagline);
  wrapper.appendChild(chart);

  return wrapper;
};
