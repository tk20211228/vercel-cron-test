"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useTransition } from "react";
import { toast } from "sonner";

interface SubmitButtonProps {
  onSubmit: () => Promise<string | void>;
}

export default function SubmitButton({ onSubmit }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      const result = await onSubmit().catch((error) => {
        toast.error(error.message); // エラー時の通知
      });
      if (result) {
        toast.success(result); // resultが文字列の場合のみ表示
      } // 成功時の通知
    });
  };
  return (
    <Button disabled={pending || isPending} onClick={handleClick}>
      {pending || isPending ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          実行中...
        </>
      ) : (
        "API実行"
      )}
    </Button>
  );
}
