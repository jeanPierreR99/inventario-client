import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { Network } from "lucide-react";

interface Props {
  ips: string[];
}

const ModalIpAvailable = ({ ips }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 transition-colors shadow-md"
        >
          <Network className="w-4 h-4" />
          Ver IPs disponibles
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md rounded-2xl shadow-2xl border border-cyan-100 bg-white/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold text-gray-800">
            Direcciones IP disponibles
            <span className="block text-sm text-gray-500 font-normal mt-1">
              Total: {ips.length}
            </span>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[320px] mt-3 rounded-lg border border-gray-200 p-2">
          {ips.length > 0 ? (
            <ul className="space-y-2">
              {ips.map((ip, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gradient-to-r from-cyan-50 to-white border border-cyan-100 text-cyan-700 font-medium px-3 py-2 rounded-xl shadow-sm hover:shadow-md hover:from-cyan-100 transition-all duration-200"
                >
                  <span className="font-mono text-sm tracking-wide">{ip}</span>
                  <Badge
                    variant="secondary"
                    className="bg-cyan-100 text-cyan-700 font-semibold px-2 py-0.5 rounded-md text-xs"
                  >
                    Libre
                  </Badge>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-gray-500">
              <Network className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-center">No hay IPs disponibles.</p>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ModalIpAvailable;
