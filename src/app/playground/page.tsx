import Playground from "@/components/playground/Playground";
import CodeTerminal from "@/components/playground/CodeTerminal";
export default function Page() {
  return (
    <div className="pt-14">
      <Playground />
      <CodeTerminal />
    </div>
  );
}
