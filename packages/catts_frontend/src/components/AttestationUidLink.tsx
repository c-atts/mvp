import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { shortenEthAddress } from "../eth/utils/shortenEthAddress";
import { twMerge } from "tailwind-merge";
import { getEasConfig } from "../eas/getEasConfig";

export default function AttestationUidLink({
  uid,
  chainId,
  className,
}: {
  uid?: string;
  chainId: number;
  className?: string;
}) {
  const easConfig = getEasConfig(chainId);
  if (!uid) return null;

  className = twMerge(
    "text-sm text-cyan-600 border-b-2 border-cyan-600 hover:border-opacity-100  border-opacity-0",
    className,
  );

  return (
    <a
      className="no-underline"
      href={`${easConfig?.explorerUrl}/attestation/view/${uid}`}
      rel="noreferrer"
      target="_blank"
    >
      <div className={className}>
        <div className="flex items-center justify-center w-full gap-2 whitespace-nowrap">
          <FontAwesomeIcon className="w-3 h-3" icon={faEthereum} />
          {shortenEthAddress(uid)}
        </div>
      </div>
    </a>
  );
}
