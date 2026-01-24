export const SingleListingSkeleton = () => {
  const wrapper = document.createElement("div");
  wrapper.className = "flex flex-col gap-6 max-w-[1000px] mx-auto p-6";

  const mediaGallery = document.createElement("div");
  mediaGallery.className =
    "w-full h-64 rounded-md bg-gray-800 animate-pulse mb-4";

  const details = document.createElement("div");
  details.className = "flex flex-col md:flex-row gap-6 w-full";

  const textSection = document.createElement("div");
  textSection.className = "flex-1 flex flex-col gap-2";

  const title = document.createElement("div");
  title.className = "w-60 h-8 rounded-md bg-gray-800 animate-pulse mb-2";

  const desc = document.createElement("div");
  desc.className = "w-80 h-6 rounded-md bg-gray-800 animate-pulse mb-2";

  const seller = document.createElement("div");
  seller.className = "w-40 h-6 rounded-md bg-gray-800 animate-pulse mb-2";

  const hr = document.createElement("div");
  hr.className = "h-[1px] w-full bg-gray-800 my-4";

  const actionCenter = document.createElement("div");
  actionCenter.className = "flex flex-col gap-2 items-end";

  const status = document.createElement("div");
  status.className = "w-24 h-6 rounded-md bg-gray-800 animate-pulse";

  const bidBtn = document.createElement("div");
  bidBtn.className = "w-32 h-10 rounded-md bg-gray-800 animate-pulse";

  wrapper.appendChild(mediaGallery);
  textSection.appendChild(title);
  textSection.appendChild(desc);
  textSection.appendChild(seller);
  details.appendChild(textSection);
  wrapper.appendChild(hr);
  actionCenter.appendChild(status);
  actionCenter.appendChild(bidBtn);
  details.appendChild(actionCenter);
  wrapper.appendChild(details);

  return wrapper;
};
