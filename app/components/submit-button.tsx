"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useTransition } from "react";
import { toast } from "sonner";

interface SubmitButtonProps {
  onSubmit: () => Promise<string | void>;
}

export default function SubmitButton() {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      try {
        // 環境に応じたベースURLの構築
        const protocol = window.location.protocol;
        const host = window.location.host;
        const baseUrl = `${protocol}//${host}`;

        const res = await fetch(`${baseUrl}/api/`, {
          method: "GET",
        });

        console.log(res);

        if (!res.ok) {
          throw new Error("APIリクエストに失敗しました");
        }

        toast.success("APIリクエストが成功しました");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "エラーが発生しました"
        );
      }
    });
  };
  return (
    <Button disabled={isPending} onClick={handleClick}>
      {isPending ? (
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
