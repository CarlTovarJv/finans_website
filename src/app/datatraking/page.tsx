import EditIncomeDialog from "./components/EditIncomeDialog";
import EditSaleDialog from "./components/EditSaleDialog";
import EditExpenseDialog from "./components/EditExpenseDialog";
import EditProfitDialog from "./components/EditProfitDialog";
import EditDebtDialog from "./components/EditDebtDialog";

export default function DataTrackingPage() {
  return (
    <main className="p-10">

      <h1 className="text-4xl font-bold mb-10">
        Data Tracking
      </h1>

      <div className="flex flex-wrap gap-5">

        <EditIncomeDialog />

        <EditSaleDialog />

        <EditExpenseDialog />

        <EditProfitDialog />

        <EditDebtDialog />

      </div>

    </main>
  );
}