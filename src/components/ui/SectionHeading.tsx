/** Shared section heading — ek jaisa text design, har section me same. */
export default function SectionHeading({
  index,
  eyebrow,
  title,
  sub,
  align = "left",
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <div className={centered ? "text-center" : "text-left"}>
      <div className="section-eyebrow">
        {index} // {eyebrow}
      </div>
      <h2 className="section-title">{title}</h2>
      {sub && <p className={`section-sub${centered ? " mx-auto" : ""}`}>{sub}</p>}
    </div>
  );
}
