import { Client} from "../types"

export default function ClientInput({ client, onClick }: { client: Client, onClick?: () => void }) {
    const formatCurrency = (value: any) => {
        const number = Number(value) || 0
        return number.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 2
        })
    }

    return (
        <div
            onClick={onClick}
            className="bg-yellow-50 p-6 rounded-xl shadow-md space-y-3">
            <h2 className="text-xl font-bold text-slate-800">
                Nombre: {(client.nombre || "").toUpperCase()} {(client.paterno || "").toUpperCase()} {(client.materno || "").toUpperCase()}
            </h2>

            <div className="flex gap-4">
                <div className="w-1/2 text-slate-600">
                    <strong>Crédito Infonavit:</strong> {formatCurrency(client.infonavit)}
                </div>
                <div className="w-1/2 text-slate-600">
                    <strong>Adeudos:</strong> {formatCurrency(client.adeudo)}
                </div>
            </div>

        </div>
    )
}