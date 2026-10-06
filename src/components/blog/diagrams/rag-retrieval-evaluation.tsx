// Diagrams for "RAG retrieval evaluation".
import { Arrow, Box, Diagram, Label } from "@/components/blog/diagrams/kit";

export function RagTriageTree() {
  const id = "rag-retrieval-evaluation-triage";
  return (
    <Diagram
      id={id}
      height={424}
      title="Diagnosis order for a wrong answer. Print the prompt. If the right passage was there, it is a generation problem. If not, and the fact is not in the corpus, it is a corpus gap. If the fact exists, check its rank in a wide retrieval: a low rank is a ranking problem, and absent means chunking, vocabulary or filters."
    >
      <Box x={16} y={12} w={270} h={48} title="Print the prompt" size="sm" />
      <Arrow diagram={id} d="M151 60 V100" />
      <Box x={16} y={100} w={270} h={48} title="Right passage in prompt?" size="sm" />
      <Box x={16} y={188} w={270} h={48} title="Fact in the corpus?" size="sm" />
      <Box x={16} y={276} w={270} h={48} title="Rank in a wide search?" size="sm" />

      <Arrow diagram={id} d="M151 148 V188" />
      <Label x={161} y={174} anchor="start" size={13}>no</Label>
      <Arrow diagram={id} d="M151 236 V276" />
      <Label x={161} y={262} anchor="start" size={13}>yes</Label>
      <Arrow diagram={id} d="M151 324 V388 H358" tone="warn" />
      <Label x={161} y={352} anchor="start" size={13}>absent</Label>

      <Arrow diagram={id} d="M286 124 H358" tone="warn" />
      <Label x={322} y={116} size={13}>yes</Label>
      <Arrow diagram={id} d="M286 212 H358" tone="warn" />
      <Label x={322} y={204} size={13}>no</Label>
      <Arrow diagram={id} d="M286 300 H358" tone="warn" />
      <Label x={322} y={292} size={13}>low rank</Label>

      <Box x={360} y={100} w={264} h={48} title="Generation problem" sub="order, chunk count, wording" tone="warn" size="sm" />
      <Box x={360} y={188} w={264} h={48} title="Corpus gap" sub="fix content and abstention" tone="warn" size="sm" />
      <Box x={360} y={276} w={264} h={48} title="Ranking" sub="rerank, hybrid search" tone="warn" size="sm" />
      <Box x={360} y={364} w={264} h={48} title="Retriever never finds it" sub="chunking, vocabulary, filters" tone="warn" size="sm" />
    </Diagram>
  );
}

export function RagWideToSendFunnel() {
  const id = "rag-retrieval-evaluation-funnel";
  const xs = [16, 176, 336, 496];
  return (
    <Diagram
      id={id}
      height={276}
      title="Retrieve a wide candidate set of 50, rerank, send the best 5 to the model. If the top score is below a threshold, abstain instead of generating. Recall at 50 versus recall at 5 shows whether the problem is the retriever or the ranking."
    >
      <Label x={80} y={32} size={13}>recall at 50</Label>
      <Label x={400} y={32} size={13}>recall at 5</Label>
      <Box x={xs[0]} y={44} w={128} h={56} title="Retrieve" sub="k = 50" size="sm" />
      <Box x={xs[1]} y={44} w={128} h={56} title="Rerank" sub="best handful" size="sm" />
      <Box x={xs[2]} y={44} w={128} h={56} title="Send" sub="k = 5" size="sm" />
      <Box x={xs[3]} y={44} w={128} h={56} title="Model" size="sm" />
      <Arrow diagram={id} d="M144 72 H174" />
      <Arrow diagram={id} d="M304 72 H334" />
      <Arrow diagram={id} d="M464 72 H494" />

      <Arrow diagram={id} d="M240 100 V150" tone="accent" />
      <Label x={252} y={130} anchor="start" size={13}>top score below threshold</Label>
      <Box x={140} y={150} w={200} h={52} title="Abstain" sub="no source found" tone="accent" size="sm" />

      <Label x={16} y={236} anchor="start" tone="fg">High at 50, low at 5: ranking. Rerank or go hybrid.</Label>
      <Label x={16} y={260} anchor="start" tone="fg">Low at 50: chunking, filters, vocabulary, or missing document.</Label>
    </Diagram>
  );
}
