// Diagrams for "Android app startup time: TTID, TTFD, and what to change".
import { Arrow, Diagram, Label } from "@/components/blog/diagrams/kit";

export function StartupClocksTimeline() {
  const id = "startup-clocks";
  const [start, first, full] = [40, 270, 560];
  return (
    <Diagram
      id={id}
      height={290}
      title="A cold start timeline with three moments: process start, first frame, and the reportFullyDrawn call. Time to initial display runs from process start to the first frame and appears as the Displayed Logcat line. Time to full display runs from process start to reportFullyDrawn and appears as the Fully drawn line. Main-thread work before the first frame is a candidate to remove, defer, or move. Work between the first frame and fully drawn is a candidate to start earlier, run in parallel, or shrink."
    >
      <Label x={(start + full) / 2} y={30} tone="fg" size={15} weight={600}>TTFD · until the app is usable</Label>
      <Arrow diagram={id} d={`M${start} 44 H${full}`} head={false} />
      <path d={`M${start} 38 V50 M${full} 38 V50`} strokeWidth={1.5} className="stroke-muted-foreground/60" />

      <Label x={(start + first) / 2} y={80} tone="fg" size={15} weight={600}>TTID · until the first frame</Label>
      <Arrow diagram={id} d={`M${start} 94 H${first}`} head={false} />
      <path d={`M${start} 88 V100 M${first} 88 V100`} strokeWidth={1.5} className="stroke-muted-foreground/60" />

      <path d={`M${first} 100 V148 M${full} 50 V148`} strokeWidth={1} strokeDasharray="3 5" className="stroke-muted-foreground/40" />
      <Arrow diagram={id} d="M20 150 H620" />
      <circle cx={start} cy={150} r={5} className="fill-foreground" />
      <circle cx={first} cy={150} r={5} className="fill-accent" />
      <circle cx={full} cy={150} r={5} className="fill-accent" />

      <Label x={start} y={178} anchor="start" tone="fg" size={14} weight={600}>process start</Label>
      <Label x={first} y={178} tone="fg" size={14} weight={600}>first frame</Label>
      <Label x={first} y={197} size={13}>Logcat: Displayed</Label>
      <Label x={full} y={178} anchor="end" tone="fg" size={14} weight={600}>reportFullyDrawn()</Label>
      <Label x={full} y={197} anchor="end" size={13}>Logcat: Fully drawn</Label>

      <Label x={(start + first) / 2} y={238} tone="fg" size={14} weight={600}>Before the first frame</Label>
      <Label x={(start + first) / 2} y={258} size={13}>remove, defer, or move</Label>
      <Label x={(first + full) / 2 + 10} y={238} tone="fg" size={14} weight={600}>Before fully drawn</Label>
      <Label x={(first + full) / 2 + 10} y={258} size={13}>start earlier, run in parallel, or shrink</Label>
    </Diagram>
  );
}
