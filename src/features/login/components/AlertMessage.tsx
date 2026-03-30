import { Alert, AlertDescription, AlertTitle } from "@/shared/components/ui/alert"
import { Terminal } from "lucide-react"

interface IProps {
    message: string;
    type: string;
}

export function AlertMessage({ message, type }: IProps) {
    if (type === "success") {
        return (
            <Alert className="border-green-500 bg-green-50">
                <Terminal className="h-4 w-4" color="green" />
                <AlertTitle className="text-green-500">Aviso</AlertTitle>
                <AlertDescription className="text-green-600">
                    {message}
                </AlertDescription>
            </Alert>
        )
    }
    return (
        <Alert className="border-red-500 bg-red-50">
            <Terminal className="h-4 w-4" color="red" />
            <AlertTitle className="text-red-500">Aviso</AlertTitle>
            <AlertDescription className="text-red-600">
                {message}
            </AlertDescription>
        </Alert>
    )
}
