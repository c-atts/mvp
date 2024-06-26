import Button from "../../../components/ui/Button";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { isChainIdSupported } from "../../../wagmi/is-chain-id-supported";
import { useAccount } from "wagmi";
import useRunContext from "../../../context/useRunContext";
import { useSiweIdentity } from "ic-use-siwe-identity";

export default function InitRun() {
  const { identity } = useSiweIdentity();
  const { chainId } = useAccount();
  const {
    isSimulationOk: isSelectedRecipeValid,
    useCreateRun: useInitRun,
    selectedRecipe,
    initPayAndCreateAttestation,
  } = useRunContext();

  const handleClick = () => {
    initPayAndCreateAttestation();
  };

  const disabled =
    !identity ||
    !isChainIdSupported(chainId) ||
    !selectedRecipe ||
    !isSelectedRecipeValid ||
    useInitRun.isPending;

  const buttonHidden = useInitRun.data != null && "Ok" in useInitRun.data;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2>Run recipe</h2>
        <p>
          Once you have simulated to verify the run will produce an attestation,
          you can go ahead an run the recipe. Creating an attestation takes ca 1
          minute and costs ca $0.2 depending on chain.
        </p>
      </div>
      {!buttonHidden && (
        <div>
          <Button
            className="mb-4"
            disabled={disabled}
            icon={useInitRun.isPending ? faCircleNotch : undefined}
            onClick={handleClick}
            spin={useInitRun.isPending}
          >
            Run
          </Button>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="items-center justify-center hidden w-8 h-8 text-xl font-bold rounded-full md:flex bg-zinc-300 text-zinc-800">
            1
          </div>
          Initialise run
        </div>
        <div className="pl-10">
          {useInitRun.data && "Err" in useInitRun.data && (
            <div className="flex justify-between w-full">
              <div>Error: {useInitRun.data.Err.message}</div>
              <div>🔴</div>
            </div>
          )}
          {useInitRun.data && "Ok" in useInitRun.data && (
            <div className="flex justify-between w-full">
              <div>Initialised</div>
              <div>✅</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
