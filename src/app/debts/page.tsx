import { getDebts } from "./actions/debts";
import Debts from "./component/debts";

export default async function DebtsPage() {
  const initialDebts = await getDebts();
  return <Debts initialDebts={initialDebts} />;
}