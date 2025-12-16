const createBarChart = (data: { month: string; desktop: number }[]) => {
  const isMobile = window.innerWidth <= 640;
  const filteredMonths = isMobile ? data.slice(-6) : data;
  const maxValue = Math.max(...filteredMonths.map((d) => d.desktop));

  const chartContainer = document.createElement("div");
  chartContainer.className =
    "chart-container w-full h-[350px] p-5 relative p-5 bg-transparent";

  const chartWrapper = document.createElement("div");
  chartWrapper.className = `
    flex items-end justify-around h-[280px] relative gap-2 px-5
    sm:gap-4 sm:px-8
  `;

  const baseline = document.createElement("div");
  baseline.className = `
    absolute bottom-[30px] left-5 right-5 h-[1px] bg-[hsl(var(--border))] z-10
  `;

  filteredMonths.forEach((item) => {
    const barContainer = document.createElement("div");
    barContainer.className = `
      flex flex-col items-center flex-1 max-w-[60px]
      sm:max-w-[40px]
    `;

    const bar = document.createElement("div");
    const height = (item.desktop / maxValue) * 240;
    bar.className = `
      w-full bg-[hsl(var(--chart-1))] rounded-t-lg transition-opacity duration-200 mb-2 relative
      hover:opacity-80
    `;
    bar.style.height = `${height}px`;

    bar.addEventListener("mouseenter", () => {
      bar.style.opacity = "0.8";
      // Show tooltip when hovering bar
      const tooltip = document.createElement("div");
      tooltip.className = `
        absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-[hsl(var(--popover))] border border-[hsl(var(--border))]
        rounded-md px-2 py-1 text-xs whitespace-nowrap z-10 shadow-md
      `;

      tooltip.textContent = item.desktop.toString();
      bar.appendChild(tooltip);
    });

    bar.addEventListener("mouseleave", () => {
      bar.style.opacity = "1";
      const tooltip = bar.querySelector("div");
      if (tooltip) tooltip.remove();
    });

    const label = document.createElement("div");
    label.className = `
      text-xs text-[hsl(var(--muted-foreground))] text-center mt-2
      sm:text-[10px]
    `;
    label.textContent = item.month.slice(0, 3);

    barContainer.appendChild(bar);
    barContainer.appendChild(label);
    chartWrapper.appendChild(barContainer);
  });

  chartWrapper.appendChild(baseline);
  chartContainer.appendChild(chartWrapper);

  return chartContainer;
};

export default createBarChart;
