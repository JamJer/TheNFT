import { chainType } from "../../Payloads";

export interface CreateEasyQuery {
  chain: chainType;
  description: string;
  mint_to_address: string;
  name: string;
}
