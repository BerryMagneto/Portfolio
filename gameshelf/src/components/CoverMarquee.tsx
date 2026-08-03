export default function CoverMarquee({ covers }: { covers: string[] }) {
  if (covers.length === 0) {
    return <div className="absolute inset-0 bg-shelf-bg" />;
  }

  const rows = [
    covers.slice(0, 25),
    covers.slice(25, 50),
    covers.slice(50, 75),
    covers.slice(75, 100),
  ];

  const rowAnimations = [
    "marquee-left",
    "marquee-right",
    "marquee-left-slow",
    "marquee-right-slow",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-shelf-bg/85 z-10" />
      <div className="absolute inset-0 flex flex-col opacity-40 -rotate-2 scale-110">
        {rows.map((row, i) => (
          <div key={i} className="flex-1 overflow-hidden">
            <div className={`marquee-track h-full ${rowAnimations[i]}`}>
              {[...row, ...row].map((url, j) => (
                <img
                  key={j}
                  src={url}
                  alt=""
                  className="h-full w-40 object-cover mx-1.5 shrink-0 rounded-md"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}