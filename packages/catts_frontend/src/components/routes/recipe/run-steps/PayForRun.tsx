import { CHAIN_CONFIG } from "@/config";
import EthTxLink from "@/components/EthTxLink";
import { LoaderCircle } from "lucide-react";
import { RunStatus } from "@/run/types/run-status.type";
import { formatEther } from "viem/utils";
import useCreateRunContext from "@/run/hooks/useCreateRunContext";
import { useRunStatus } from "@/run/hooks/useRunStatus";

export function PayForRunInner() {
  const { runInProgress, errorMessage } = useCreateRunContext();
  const runStatus = useRunStatus(runInProgress);

  if (!runInProgress) return null;

  return (
    <>
      {runStatus === RunStatus.PaymentPending && !errorMessage && (
        <div className="flex justify-between w-full">
          <div>Waiting for payment …</div>
          <div>
            <LoaderCircle className="w-5 h-5 animate-spin" />
          </div>
        </div>
      )}

      {runStatus >= RunStatus.PaymentRegistered && (
        <div className="flex justify-between w-full">
          <div className="text-sm text-foreground/50">Payment tx</div>
          <EthTxLink
            chainId={Number(runInProgress.chain_id)}
            tx={runInProgress.payment_transaction_hash[0]}
          />
        </div>
      )}

      {runStatus === RunStatus.PaymentRegistered && !errorMessage && (
        <div className="flex justify-between w-full">
          <div>Waiting for confirmations...</div>
          <div>
            <LoaderCircle className="w-5 h-5 animate-spin" />
          </div>
        </div>
      )}

      {runStatus >= RunStatus.PaymentVerified && (
        <div className="flex justify-between w-full">
          <div>Payment confirmed</div>
          <div>✅</div>
        </div>
      )}

      {(runStatus === RunStatus.PaymentPending ||
        runStatus === RunStatus.PaymentRegistered) &&
        errorMessage && (
          <div className="flex justify-between w-full">
            <div>Error: {errorMessage}</div>
            <div>🔴</div>
          </div>
        )}
    </>
  );
}

export default function PayForRun() {
  const { runInProgress } = useCreateRunContext();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="items-center justify-center hidden w-8 h-8 text-xl font-bold rounded-full md:flex bg-primary text-primary-foreground">
          2
        </div>
        Pay for run
      </div>
      {runInProgress && (
        <div className="flex flex-col gap-2 pl-10">
          <div className="flex justify-between w-full">
            <div className="text-sm text-foreground/50">Transaction fee</div>
            <div className="text-sm text-foreground/50">
              {formatEther(runInProgress.user_fee[0] as bigint)}{" "}
              {CHAIN_CONFIG[Number(runInProgress?.chain_id)].nativeTokenName}
            </div>
          </div>
          <PayForRunInner />
        </div>
      )}
    </div>
  );
}