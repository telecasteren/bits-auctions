const createBarChart = (data) => {
  const chartContainer = document.createElement("div");
  chartContainer.className = "chart-container";
  chartContainer.style.cssText = `
    width: 100%;
    height: 350px;
    position: relative;
    padding: 20px;
    background: transparent;
  `;

  const maxValue = Math.max(...data.map((d) => d.desktop));

  const chartWrapper = document.createElement("div");
  chartWrapper.style.cssText = `
    display: flex;
    align-items: end;
    justify-content: space-around;
    height: 280px;
    position: relative;
    gap: 8px;
    padding: 0 20px;
  `;

  const baseline = document.createElement("div");
  baseline.style.cssText = `
    position: absolute;
    bottom: 30px;
    left: 20px;
    right: 20px;
    height: 1px;
    background: hsl(var(--border));
    z-index: 1;
  `;

  data.forEach((item, index) => {
    const barContainer = document.createElement("div");
    barContainer.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      max-width: 60px;
    `;

    const bar = document.createElement("div");
    const height = (item.desktop / maxValue) * 240;
    bar.style.cssText = `
      width: 100%;
      height: ${height}px;
      background: hsl(var(--chart-1));
      border-radius: 8px 8px 0 0;
      transition: opacity 0.2s;
      margin-bottom: 10px;
      position: relative;
    `;

    bar.addEventListener("mouseenter", () => {
      bar.style.opacity = "0.8";
      // Show tooltip when hovering bar
      const tooltip = document.createElement("div");
      tooltip.style.cssText = `
        position: absolute;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        background: hsl(var(--popover));
        border: 1px solid hsl(var(--border));
        border-radius: 6px;
        padding: 4px 8px;
        font-size: 12px;
        white-space: nowrap;
        z-index: 10;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
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
    label.style.cssText = `
      font-size: 12px;
      color: hsl(var(--muted-foreground));
      text-align: center;
      margin-top: 8px;
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
