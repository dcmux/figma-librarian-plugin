import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export function ToastTest() {
  const { toast } = useToast();

  const showToast = () => {
    toast({
      title: "Tip: How to Use This Prompt",
      description: "Copy this prompt and paste it into ChatGPT to get started.",
      variant: "default",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Toast Test</h1>
      <Button onClick={showToast}>Show Tip Toast</Button>
    </div>
  );
}
