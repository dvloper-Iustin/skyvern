import { HelpTooltip } from "@/components/HelpTooltip";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { getClient } from "@/api/AxiosClient";
import { useQuery } from "@tanstack/react-query";
import { useCredentialGetter } from "@/hooks/useCredentialGetter";
import { ModelsResponse } from "@/api/types";
import { WorkflowModel } from "@/routes/workflows/types/workflowTypes";

type Props = {
  className?: string;
  clearable?: boolean;
  value: WorkflowModel | null;
  // --
  onChange: (value: WorkflowModel | null) => void;
};

function ModelSelector({
  clearable = true,
  value,
  onChange,
  className,
}: Props) {
  const credentialGetter = useCredentialGetter();

  const { data: availableModels } = useQuery<ModelsResponse>({
    queryKey: ["models"],
    queryFn: async () => {
      const client = await getClient(credentialGetter);
      return client.get("/models").then((res) => res.data);
    },
  });

  const models = availableModels?.models ?? [];

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        <Label className="text-xs font-normal text-slate-300">Model</Label>
        <HelpTooltip content="The LLM model to use for this block" />
      </div>
      <div className="relative flex items-center">
        <Select
          value={value?.model ?? ""}
          onValueChange={(v) => {
            onChange({ model: v });
          }}
        >
          <SelectTrigger
            className={(className || "") + (value && clearable ? " pr-10" : "")}
          >
            <SelectValue placeholder="Skyvern Optimized" />
          </SelectTrigger>
          <SelectContent>
            {models.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {value && clearable && (
          <>
            <div
              className="pointer-events-none absolute right-8 top-1/2 h-5 w-px -translate-y-1/2 bg-slate-200 opacity-70 dark:bg-slate-700"
              aria-hidden="true"
            />
            <button
              type="button"
              aria-label="Clear selection"
              className="absolute right-0 z-10 flex h-9 w-8 items-center justify-center text-slate-400 hover:text-red-500 focus:outline-none"
              onClick={() => onChange(null)}
              tabIndex={0}
            >
              ×
            </button>
          </>
        )}
      </div>
    </div>
  );
}

ModelSelector.displayName = "ModelSelector";

export { ModelSelector };
