import { ExternalBlob } from "@/backend";
import { useActor } from "@/hooks/useActor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useWritingEntries() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["writingEntries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listWritingEntries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useResearchPapers() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["researchPapers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listResearchPapers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddResearchPaper() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      description,
      tags,
      file,
      onProgress,
    }: {
      title: string;
      description: string;
      tags: string[];
      file: File;
      onProgress: (pct: number) => void;
    }) => {
      if (!actor) throw new Error("Not connected");
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress(onProgress);
      return actor.addResearchPaper(title, description, tags, blob);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["researchPapers"] }),
  });
}

export function useDeleteResearchPaper() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteResearchPaper(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["researchPapers"] }),
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}
